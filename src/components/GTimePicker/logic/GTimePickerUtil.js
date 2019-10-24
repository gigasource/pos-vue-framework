// https://en.wikipedia.org/wiki/12-hour_clock
//

import { computed, reactive } from '@vue/composition-api'

// Hour convention
export const HourConvention = { _12HRS: '12', _24HRS: '24' }
export const HourConventionValidator = (convention) => Object.values(HourConvention).indexOf(convention) >= 0

// pre-defined active time picker
const ActiveTimePicker = {
  hour: { hour: true, minute: false, second: false },
  minute: { hour: false, minute: true, second: false },
  second: { hour: false, minute: false, second: true }
}

// pre-defined active period picker
const ActivePeriodPicker = {
  AM: { AM: true, PM: false },
  PM: { AM: false, PM: true }
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
 * @returns {{showMinutesPicker: (function(): (ActiveTimePicker.minute|{hour, minute, second})), showSecondsPicker: (function(): (ActiveTimePicker.second|{hour, minute, second})), showHoursPicker: (function(): (ActiveTimePicker.hour|{hour, minute, second}))}}
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
 * @returns {{showAMPicker: (function(): (ActivePeriodPicker.AM|{AM, PM})), showPMPicker: (function(): (ActivePeriodPicker.PM|{AM, PM}))}}
 */
function getShowPeriodPickerMethods(state) {
  return {
    showAMPicker: () => state.activePeriodPicker = ActivePeriodPicker.AM,
    showPMPicker: () => state.activePeriodPicker = ActivePeriodPicker.PM
  }
}

/**
 * Return functions which change time picker value
 * @param state
 * @param context
 */
function getSetTimeMethods(state, context) {
  function emitInput() {
    context.emit('input', `${state.selectedTime.hours}:${state.selectedTime.minutes}:${state.selectedTime.seconds}`)
  }

  // events
  function setHours(hours) {
    state.selectedTime.hours = hours
    context.emit('update:hours', hours)
    emitInput()
  }

  function setMinutes(minutes) {
    state.selectedTime.minutes = minutes
    context.emit('update:minutes', minutes)
    emitInput()
  }

  function setSeconds(seconds) {
    state.selectedTime.seconds = seconds
    context.emit('update:seconds', seconds)
    emitInput()
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

export default function (props, context) {
  const cptIs12HoursConvention = computed(() => props.hourConvention === HourConvention._12HRS)

  // try to parsing initial time
  let initialTime = { hours: 0, minutes: 0, seconds: 0 }
  let timeParts = props.value.split(':')
  if (timeParts.length >= 1) initialTime.hours = parseInt(timeParts[0]) % 12
  if (timeParts.length >= 2) initialTime.minutes = parseInt(timeParts[1])
  if (timeParts.length >= 3) initialTime.seconds = parseInt(timeParts[2])

  const state = reactive({
    // indicate whether hour, minutes, second view will be shown
    // if you want to show all components (hour, minute, second), just ignore this value
    activeTimePicker: ActiveTimePicker.hour,
    // indicate whether AM or PM is active
    activePeriodPicker: ActivePeriodPicker.AM,
    // storing selected time elements
    selectedTime: initialTime,
    // indicate whether period (AM/PM) should be show
    showPeriod: cptIs12HoursConvention.value,
  })

  const { showHoursPicker, showMinutesPicker, showSecondsPicker } = getShowTimePickerMethods(state)
  const { showAMPicker, showPMPicker } = getShowPeriodPickerMethods(state)
  const { setHours, setMinutes, setSeconds } = getSetTimeMethods(state, context)
  const { adjustHours, adjustMinutes, adjustSeconds } = getAdjustTimeMethods({state, setHours, setMinutes, setSeconds, cptIs12HoursConvention})

  const hoursModel = computed(() => {
    return (cptIs12HoursConvention.value ? range0_11 : range0_23).map(hours => ({
      value: getFormattedHours(hours, props),
      selected: hours === state.selectedTime.hours,
      select: () => setHours(hours)
    }))
  })

  const minutesModel = computed(() => {
    return range0_59.map(minutes => ({
      value: minutes,
      selected: minutes === state.selectedTime.minutes,
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
