// https://en.wikipedia.org/wiki/12-hour_clock
//

import { computed } from '@vue/composition-api'

// Hour convention
export const HourConvention = { _12HRS: '12', _24HRS: '24' }
export const HourConventionValidator = (convention) => Object.values(HourConvention).indexOf(convention) >= 0

// Period
export const Period = { AM: 'AM', PM: 'PM' }
export const PeriodValidator = (period) => Object.values(Period).indexOf(`${period}`.toUpperCase()) >= 0

// Selecting times
export const SelectingTime = { Hour: 'HOUR', Minute: 'MINUTE' }
export const SelectingTimeValidator = (selecting) => Object.values(SelectingTime).indexOf(`${selecting}`.toUpperCase()) >= 0

/**
 *
 * @param props
 * @returns {Ref<any>}
 * @private
 */
export const _cptIs12HourConvention = (props) => computed(() => props.hourConvention === HourConvention._12HRS)

/**
 * Return formatted hour depend on hour convention
 * @param props
 * @param is12HourConvention
 * @returns {Ref<any>}
 * @private
 */
export const _cptGetHour = (props, is12HourConvention) => computed(() => {
  if (props.hour < 0 || props.hour > 23) {
    throw `Invalid props.hours ${props.hour}`
  }
  let hour = 0
  if (props.hour) {
    if (is12HourConvention.value) {
      if (props.hour <= 12) {
        hour = props.hour
      } else {
        hour = props.hour - 12
      }
    } else {
      hour = props.hour
    }
  }

  return (hour < 10) ? `0${hour}` : `${hour}`
})

/**
 * Return formatted minute
 * @param props
 * @returns {Ref<any>}
 */
export const _cptGetMinute = (props) => computed(() => {
  // noinspection EqualityComparisonWithCoercionJS
  if (props.minute == undefined)
    return '00'

  if (props.minute < 0 || props.minute > 59)
    throw `Invalid minute: ${props.minute}`

  return (props.minute < 10) ? `0${props.minute}` : `${props.minute}`
})

/**
 *
 * @param props
 * @param context
 * @param value
 * @returns {Ref<any>}
 * @private
 */
export const _cptGetTimeModel = (props, context, value) => computed(() => {
  const active = computed(() => props.selecting === value)
  return {
    active: active.value,
    events: {
      click: (e) => {
        if (active || props.readonly) {
          // current time element has been selected, no need to select it again
          // in case readonly, do not emit event
        } else {
          e.stopPropagation()
          context.emit('update:selecting', value)
        }
      }
    }
  }
})

/**
 *
 * @param props
 * @param context
 * @param cptIs12HourConvention
 * @returns {{hourEvent: Ref<any>, minuteActive: Ref<any>, minuteEvent: Ref<any>, hourActive: Ref<any>}}
 */
export function getTitleTimeDataModels(props, context, cptIs12HourConvention) {
  const { active: hourActive, events: hourEvent } = _cptGetTimeModel(props, context, SelectingTime.Hour)
  const hourContent = _cptGetHour(props, cptIs12HourConvention)

  const { active: minuteActive, events: minuteEvent } = _cptGetTimeModel(props, context, SelectingTime.Minute)
  const minuteContent = _cptGetMinute(props)

  return {
    hourActive,
    hourContent,
    hourEvent,
    //
    minuteActive,
    minuteContent,
    minuteEvent,
  }
}

/**
 *
 * @param props
 * @param context
 * @param value
 * @returns {{active: Ref<any>, events: Ref<any>}}
 * @private
 */
export function _getPeriodDataModel(props, context, value) {
  return {
    active: computed(() => props.period === value).value,
    events: {
      click: (e) => {
        if (active || props.readonly) {
          // current time element has been selected, no need to select it again
          // in case readonly, do not emit event
        } else {
          e.stopPropagation()
          context.emit('update:period', value)
        }
      }
    }
  }
}

export function getTitleAmPmDataModel(props, context) {
  const showAmPm = computed(() => _cptIs12HourConvention(props))
  const { active: amActive, events: amEvent } = _getPeriodDataModel(props, context, Period.AM)
  const { active: pmActive, events: pmEvent } = _getPeriodDataModel(props, context, Period.PM)

  return {
    showAmPm,
    amActive, amEvent,
    pmActive, pmEvent
  }
}


export default function(props, context) {
  return {

  }
}
