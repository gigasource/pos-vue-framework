// https://en.wikipedia.org/wiki/12-hour_clock
//

import { computed, reactive } from '@vue/composition-api'

// Hour convention
export const HourConvention = { _12HRS: '12', _24HRS: '24' }
export const HourConventionValidator = (convention) => Object.values(HourConvention).indexOf(convention) >= 0

// convert 0 to 12 in 12 hour convention
export const getFormattedHours = (hours, props) => {
  if (props.hourConvention === HourConvention._24HRS)
    return hours
  else if (hours === 0)
    return 12
  else
    return hours
}

export default function(props, context) {
  // pre-defined active time picker
  const ActiveTimePicker = {
    hour: { hour: true, minute: false, second: false },
    minute: { hour: false, minute: true, second: false },
    second: { hour: false, minute: false, second: true }
  }

  // pre-defined active period picker
  const ActivePeriodPicker = {
    AM: { AM: true, PM: false  },
    PM: { AM: false, PM: true }
  }

  const cptIs12HoursConvention = computed(() => props.hourConvention === HourConvention._12HRS)
  const MIN_HOUR = 0
  const cptMaxHour = computed(() => cptIs12HoursConvention.value ? 12 : 24)

  const MIN_MINUTES = 0
  const MAX_MINUTES = 60

  const MIN_SECONDS = 0
  const MAX_SECONDS = 60


  //
  const initialTime = (() => {
    let timeParts
    if (typeof props.value === 'string' && (timeParts = props.value.split(':')).length >= 3)
      return {
        hours: parseInt(timeParts[0]) % 12,
        minutes: parseInt(timeParts[1]),
        seconds: parseInt(timeParts[2])
      }
    else
      return {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
  })()

  const state = reactive({
    // indicate whether hour, minutes, second view will be shown
    // if you want to show all components (hour, minute, second), just ignore this value
    activeTimePicker: ActiveTimePicker.hour,
    // indicate whether period (AM/PM) should be show
    showPeriod: cptIs12HoursConvention.value,
    // indicate whether AM or PM is active
    activePeriodPicker: ActivePeriodPicker.AM,
    // storing selected time elements
    selectedTime: initialTime,
  })

  function emitInput(){
      context.emit(`${state.selectedTime.hours}:${state.selectedTime.minutes}:${state.selectedTime.seconds}`)
  }

  // hours model
  const isHourAllowedFn = computed(() => {
    if (typeof props.allowedHours === 'function')
      return hour => props.allowedHours(hour)
    else if (Array.isArray(props.allowedHours))
      return hour => props.allowedHours.indexOf(hour) >= 0
    else return () => true
  })
  const hours = computed(() => {
    return [...Array(cptMaxHour.value).keys()].map(hour => ({
      value: getFormattedHours(hour, props),
      selected: hour === state.selectedTime.hours,
      allowed: isHourAllowedFn.value(hour),
      select: () => selectHours(hour)
    }))
  })

  // minute models
  const isMinuteAllowedFn = computed(() => {
    if (typeof props.allowedMinutes === 'function')
      return hour => props.allowedMinutes(hour)
    else if (Array.isArray(props.allowedMinutes))
      return hour => props.allowedMinutes.indexOf(hour) >= 0
    else return () => true
  })
  const minutes = computed(() => {
    return [...Array(MAX_MINUTES).keys()].map(minute => ({
      value: minute,
      selected: minute === state.selectedTime.minutes,
      allowed: isMinuteAllowedFn.value(minute),
      select: () => selectMinutes(minute)
    }))
  })

  // seconds model
  const isSecondAllowedFn = computed(() => {
    if (typeof props.allowedSeconds === 'function')
      return hour => props.allowedSeconds(hour)
    else if (Array.isArray(props.allowedSeconds))
      return hour => props.allowedSeconds.indexOf(hour) >= 0
    else return () => true
  })
  const seconds = computed(() => {
    return [...Array(MAX_SECONDS).keys()].map(second => ({
      value: second,
      selected: second === state.selectedTime.seconds,
      allowed: isSecondAllowedFn.value(second),
      select: () => selectSeconds(second)
    }))
  })


  // function to change value non-click: scroll, touch, wheel
  const changeHour = (hourOffset) => {
    let newHours = state.selectedTime.hours + hourOffset
    // TODO: Change algorithm to increase performance
    while (newHours < MIN_HOUR)
      newHours += cptMaxHour
    selectHours(newHours)
  }
  const changeMinute = (minuteOffset) => {
    let newMinutes = state.selectedTime.minutes + minuteOffset
    // TODO: Change algorithm to increase performance
    while(newMinutes < MIN_MINUTES)
      newMinutes += MAX_MINUTES
    selectMinutes(newMinutes)
  }
  const changeSecond = (secondOffset) => {
    let newSeconds = state.selectedTime.seconds + secondOffset
    // TODO: Change algorithm to increase performance
    while(newSeconds < MIN_SECONDS)
      newSeconds += MAX_SECONDS
    selectSeconds(newSeconds)
  }

  // switch time picker
  const showHoursPicker = () => state.activeTimePicker = ActiveTimePicker.hour
  const showMinutesPicker = () => state.activeTimePicker = ActiveTimePicker.minute
  const showSecondsPicker = () => state.activeTimePicker = ActiveTimePicker.second

  // switch period picker
  const showAMPicker = () => state.activePeriodPicker = ActivePeriodPicker.AM
  const showPMPicker = () => state.activePeriodPicker = ActivePeriodPicker.PM

  // events
  const selectHours = (hours) => {
    state.selectedTime.hours = hours
    context.emit('update:hour', hours)
    emitInput()
  }

  const selectMinutes = (minutes) => {
    state.selectedTime.minutes = minutes
    context.emit('update:minute', minutes)
    emitInput()
  }

  const selectSeconds = (seconds) => {
    state.selectedTime.seconds = seconds
    context.emit('update:second', seconds)
    emitInput()
  }

  return {
    state,
    //
    hours,
    minutes,
    seconds,
    //
    changeHour,
    changeMinute,
    changeSecond,
    //
    showHoursPicker,
    showMinutesPicker,
    showSecondsPicker,
    //
    showAMPicker,
    showPMPicker,
  }
}
