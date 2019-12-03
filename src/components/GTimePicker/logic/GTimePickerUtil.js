// https://en.wikipedia.org/wiki/12-hour_clock
//
import { computed, reactive, watch } from '@vue/composition-api'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as _ from 'lodash';
import { pad } from '../../GDatePicker/logic/utils';
dayjs.extend(customParseFormat)

// Hour convention
export const HourConvention = { _12HRS: '12', _24HRS: '24' }
export const HourConventionValidator = (convention) => Object.values(HourConvention).indexOf(convention) >= 0

// pre-defined active time picker
export const ActiveTimePicker = {
  hour: 0,
  minute: 1,
  second: 2
}

// pre-defined active period picker
export const ActivePeriodPicker = {
  AM: 1,
  PM: 2
}

export const range0_11 = [...Array(12).keys()]
export const range0_23 = [...Array(24).keys()]
export const range12_23 = [...Array(24).keys()].splice(12, 12)
export const range0_59 = [...Array(60).keys()]

// convert 0 to 12 in 12 hour convention
export const getFormattedHours = (hours, props) => {
  if (props.hourConvention === HourConvention._24HRS) {
    return hours
  } else if (hours === 0) {
    return 12
  } else {
    return hours
  }
}


/**
 * Return function help switch timer picker
 * @param state
 */
function getShowTimePickerMethods(state) {
  return {
    showHoursPicker: () => state.activeTimePicker = ActiveTimePicker.hour,
    showMinutesPicker: () => state.activeTimePicker = ActiveTimePicker.minute,
    showSecondsPicker: () => state.activeTimePicker = ActiveTimePicker.second,
  }
}

/**
 * Return functions which help switch AM/PM
 * @param state
 * @param context
 * @returns {{showAMPicker: (function(): (ActivePeriodPicker.AM|{AM, PM})), showPMPicker: (function(): (ActivePeriodPicker.PM|{AM, PM}))}}
 */
function getShowPeriodPickerMethods(state, context, emitInput) {
  return {
    showAMPicker: () => {
      state.activePeriodPicker = ActivePeriodPicker.AM
      emitInput()
    },
    showPMPicker: () => {
      state.activePeriodPicker = ActivePeriodPicker.PM
      emitInput()
    }
  }
}

/**
 * Return functions which change time picker value
 * @param props
 * @param state
 * @param context
 * @param emitInput
 */
function getSetTimeMethods(props, state, context, emitInput) {
  // events
  function setHours(hours) {
    if (state.selectedTime.hours !== hours) {
      state.selectedTime.hours = hours
      emitInput()
    }
  }

  function setMinutes(minutes) {
    if (state.selectedTime.minutes !== minutes) {
      state.selectedTime.minutes = minutes
      emitInput()
    }
  }

  function setSeconds(seconds) {
    if (state.selectedTime.seconds !== seconds) {
      state.selectedTime.seconds = seconds
      emitInput()
    }
  }

  return { setHours, setMinutes, setSeconds }
}

// adjust current time
export function getAdjustTimeMethods({state, setHours, setMinutes, setSeconds, cptIs12HoursConvention}) {
  const cptMaxHour = computed(() => cptIs12HoursConvention.value ? 12 : 24)

  function adjustHours(offset) {
    let newHours = state.selectedTime.hours + offset
    while (newHours < 0) newHours += cptMaxHour.value
    while (newHours >= cptMaxHour.value) newHours -= cptMaxHour.value
    setHours(newHours)
  }

  function adjustMinutes(minuteOffset) {
    let newMinutes = state.selectedTime.minutes + minuteOffset
    while (newMinutes < 0) newMinutes += 60
    while (newMinutes >= 60) newMinutes -= 60
    setMinutes(newMinutes)
  }

  function adjustSeconds(secondOffset) {
    let newSeconds = state.selectedTime.seconds + secondOffset
    while (newSeconds < 0) newSeconds += 60
    while (newSeconds >= 60) newSeconds -= 60
    setSeconds(newSeconds)
  }

  return { adjustHours, adjustMinutes, adjustSeconds }
}

export const _12HourTimeRegex = /^(?<hours>1[0-2]|0?[1-9]):(?<minutes>[0-5][0-9])(:(?<seconds>[0-5][0-9]))? ?(?<meridiems>[AaPp][Mm])$/i
export const _24HourTimeRegex = /^(?<hours>2[0-3]|[0-1]?[1-9]):(?<minutes>[0-5][0-9])(:(?<seconds>[0-5][0-9]))?$/i

export default function (props, context) {
  const cptIs12HoursConvention = computed(() => props.hourConvention === HourConvention._12HRS)
  const cptTimeFormatStr = computed(() => {
    let timeFormatStr = ''
    timeFormatStr += props.hourConvention === HourConvention._24HRS ? 'HH' : 'hh'
    timeFormatStr += ':mm'
    props.useSeconds && (timeFormatStr += ":ss")
    props.hourConvention === HourConvention._12HRS && (timeFormatStr += ' A')
    return timeFormatStr
  })

  const state = reactive({
    // indicate whether hour, minutes, second view will be shown
    // if you want to show all components (hour, minute, second), just ignore this value
    activeTimePicker: ActiveTimePicker.hour,
    // indicate whether AM or PM is active
    activePeriodPicker: undefined,
    // storing selected time elements
    selectedTime: undefined,
    // indicate whether period (AM/PM) should be show
    showPeriod: cptIs12HoursConvention.value,
  })

  watch(() => props.value, () => {
    let timeRegex = props.hourConvention === HourConvention._12HRS ? _12HourTimeRegex : _24HourTimeRegex
    let timeRegexResult
    const newValue = props.value == null ? '' : String(props.value).trim()
    if (newValue)
      timeRegexResult = timeRegex.exec(props.value)
    if (!timeRegexResult) {
      console.warn('Invalid time value ', props.value, timeRegex)
      timeRegexResult = timeRegex.exec(dayjs().format(cptTimeFormatStr.value))
    }
    let timeObj = timeRegexResult.groups
    let { hours, minutes, seconds } = timeObj
    let activePeriod
    if (props.hourConvention === HourConvention._12HRS) {
      let { meridiems } =  timeObj
      if (meridiems[0].toLowerCase() === 'a')
        activePeriod = ActivePeriodPicker.AM
      else
        activePeriod = ActivePeriodPicker.PM
    }
    state.selectedTime = { hours: Number(hours), minutes: Number(minutes), seconds: Number(seconds) }
    state.activePeriodPicker = activePeriod
  })

  function emitInput() {
    let hours = pad(getFormattedHours(state.selectedTime.hours, props))
    let minutes = pad(state.selectedTime.minutes)
    let seconds = props.useSeconds ? `:${pad(state.selectedTime.seconds || 0)}` : ''
    let meridiems = props.hourConvention === HourConvention._12HRS ? state.activePeriodPicker === ActivePeriodPicker.AM ? ' AM' : ' PM' : ''
    context.emit('input', `${hours}:${minutes}${seconds}${meridiems}`)
  }

  const { showHoursPicker, showMinutesPicker, showSecondsPicker } = getShowTimePickerMethods(state)
  const { showAMPicker, showPMPicker } = getShowPeriodPickerMethods(state, context, emitInput)
  const { setHours, setMinutes, setSeconds } = getSetTimeMethods(props, state, context, emitInput)
  const { adjustHours, adjustMinutes, adjustSeconds } = getAdjustTimeMethods({state, setHours, setMinutes, setSeconds, cptIs12HoursConvention})

  const hoursModel = computed(() => {
    return (cptIs12HoursConvention.value ? range0_11 : range0_23).map(hours => ({
      value: getFormattedHours(hours, props),
      selected: hours == state.selectedTime.hours,
      select: () => setHours(hours)
    }))
  })

  const minutesModel = computed(() => {
    return range0_59.map(minutes => ({
      value: minutes,
      selected: minutes == state.selectedTime.minutes,
      select: () => setMinutes(minutes)
    }))
  })

  // seconds model
  const secondsModel = computed(() => {
    return range0_59.map(seconds => ({
      value: seconds,
      selected: seconds === state.selectedTime.seconds,
      select: () => setSeconds(seconds)
    }))
  })

  return {
    state,
    //
    hoursModel,
    minutesModel,
    secondsModel,
    //
    adjustHours,
    adjustMinutes,
    adjustSeconds,
    //
    showHoursPicker,
    showMinutesPicker,
    showSecondsPicker,
    //
    showAMPicker,
    showPMPicker,
  }
}
