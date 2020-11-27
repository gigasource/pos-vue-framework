// https://en.wikipedia.org/wiki/12-hour_clock
//
import { computed, reactive, watch } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as _ from 'lodash';
import { pad } from '../../GDatePicker/logic/utils';
dayjs.extend(customParseFormat)

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
  if (props.use24Hours) {
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
export function getAdjustTimeMethods({state, setHours, setMinutes, setSeconds, use24Hours}) {
  const maxHours = use24Hours ? 24 : 12

  function adjustHours(offset) {
    let newHours = state.selectedTime.hours + offset
    while (newHours < 0) newHours += maxHours
    while (newHours >= maxHours) newHours -= maxHours
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

export const _12HourTimeRegex = /^(?<hours>1[0-2]|0?[0-9]):(?<minutes>[0-5][0-9])(:(?<seconds>[0-5][0-9]))? ?(?<meridiems>[AaPp][Mm])$/i
export const _24HourTimeRegex = /^(?<hours>2[0-3]|[0-1]?[0-9]):(?<minutes>[0-5][0-9])(:(?<seconds>[0-5][0-9]))?$/i

export default function (props, context) {
  let timeFormatStr = props.use24Hours ? 'HH:mm' : 'hh:mm'
  if (props.useSeconds) timeFormatStr += ":ss"
  if (!props.use24Hours) timeFormatStr += ' A'

  const state = reactive({
    // indicate whether hour, minutes, second view will be shown
    // if you want to show all components (hour, minute, second), just ignore this value
    activeTimePicker: ActiveTimePicker.hour,
    // indicate whether AM or PM is active
    activePeriodPicker: undefined,
    // storing selected time elements
    selectedTime: { hours: 0, minutes: 0, seconds: 0 },
    // indicate whether period (AM/PM) should be show
    showPeriod: !props.use24Hours,
  })

  watch(() => props.value, (newVal) => {
    let timeRegex = props.use24Hours ? _24HourTimeRegex : _12HourTimeRegex
    let timeRegexResult
    const newValue = !newVal ? '' : String(newVal).trim()
    if (newValue) timeRegexResult = timeRegex.exec(newVal)
    if (!timeRegexResult) {
      if (newValue) console.warn('Invalid time value ', newVal, timeRegex)
      timeRegexResult = timeRegex.exec(dayjs().format(timeFormatStr))
    }
    let timeObj = timeRegexResult.groups
    let { hours, minutes, seconds } = timeObj
    let activePeriod
    if (!props.use24Hours) {
      let { meridiems } =  timeObj
      if (meridiems[0].toLowerCase() === 'a')
        activePeriod = ActivePeriodPicker.AM
      else
        activePeriod = ActivePeriodPicker.PM
    }
    state.selectedTime = { hours: Number(hours), minutes: Number(minutes), seconds: Number(seconds || '0') }
    state.activePeriodPicker = activePeriod
  })

  function emitInput() {
    let hours = pad(getFormattedHours(state.selectedTime.hours, props))
    let minutes = pad(state.selectedTime.minutes)
    let seconds = props.useSeconds ? `:${pad(state.selectedTime.seconds || 0)}` : ''
    let meridiems = props.use24Hours ? '' : state.activePeriodPicker === ActivePeriodPicker.AM ? ' AM' : ' PM'
    context.emit('input', `${hours}:${minutes}${seconds}${meridiems}`)
  }

  const { showHoursPicker, showMinutesPicker, showSecondsPicker } = getShowTimePickerMethods(state)
  const { showAMPicker, showPMPicker } = getShowPeriodPickerMethods(state, context, emitInput)
  const { setHours, setMinutes, setSeconds } = getSetTimeMethods(props, state, context, emitInput)
  const { adjustHours, adjustMinutes, adjustSeconds } = getAdjustTimeMethods({state, setHours, setMinutes, setSeconds, use24Hours: props.use24Hours})

  const hoursModel = computed(() => {
    return (!props.use24Hours ? range0_11 : range0_23).map(hours => ({
      value: getFormattedHours(hours, props),
      selected: hours === Number(state.selectedTime.hours),
      select: () => setHours(hours)
    }))
  })

  const minutesModel = computed(() => {
    return range0_59.map(minutes => ({
      value: minutes,
      selected: minutes === Number(state.selectedTime.minutes),
      select: () => setMinutes(minutes)
    }))
  })

  // seconds model
  const secondsModel = computed(() => {
    return range0_59.map(seconds => ({
      value: seconds,
      selected: seconds === Number(state.selectedTime.seconds),
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
