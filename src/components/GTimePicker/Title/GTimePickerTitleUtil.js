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
 * @type {{UPDATE_SELECTING: string}}
 */
export const EVENT_NAMES = {
  UPDATE_SELECTING: 'update:selecting',
  UPDATE_PERIOD: 'update:period'
}

export function _is12HourConvention(props) {
  return props.hourConvention === HourConvention._12HRS
}

/**
 *
 * @param props
 * @returns {Ref<any>}
 */
export const _getHour = (props) => {
  return computed(() => {
    if (props.hour < 0 || props.hour > 23)
      throw `Invalid props.hours ${props.hour}`

    let hour = '--'
    if (props.hour) {

      if (_is12HourConvention(props)) {
        if (props.hour <= 12)
          hour = props.hour
        else
          hour = props.hour - 12
      } else {
        hour = props.hour
      }
    }
    return (hour < 10) ? `0${hour}` : `${hour}`
  })
}

/**
 *
 * @param props
 * @returns {Ref<any>}
 */
export const _getMinute = (props) => {
  return computed(() => {
    if (props.minute < 0 || props.minute > 59)
      throw `Invalid minute: ${props.minute}`

    return props.minute == null ? '--' : (props.minute < 10) ? `0${props.minute}` : `${props.minute}`
  })
}

/**
 *
 * @param props
 * @param context
 * @param value
 * @returns {{active: Ref<any>, events: Ref<any>}}
 * @private
 */
export function _getTimeModel(props, context, value) {
  const active =computed(() => props.selecting === value)
  return {
    active,
    events: computed(() => {
      return {
        click: (e) => {
          if (active || props.readonly) {
            // current time element has been selected, no need to select it again
            // in case readonly, do not emit event
          } else {
            e.stopPropagation()
            context.emit(EVENT_NAMES.UPDATE_SELECTING, value)
          }
        }
      }
    })
  }
}

/**
 *
 * @param props
 * @param context
 * @returns {{hourEvent: Ref<any>, minuteActive: Ref<any>, minuteEvent: Ref<any>, hourActive: Ref<any>}}
 */
export function getTitleTimeDataModels(props, context) {
  const { active: hourActive, events: hourEvent } = _getTimeModel(props, context, SelectingTime.Hour)
  const hourContent = _getHour(props)

  const { active: minuteActive, events: minuteEvent } = _getTimeModel(props, context, SelectingTime.Minute)
  const minuteContent = _getMinute(props)

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
  const active = computed(() => props.period === value)
  return {
    active,
    events: computed(() => {
      return {
        click: (e) => {
          if (active || props.readonly) {
            // current time element has been selected, no need to select it again
            // in case readonly, do not emit event
          } else {
            e.stopPropagation()
            context.emit(EVENT_NAMES.UPDATE_PERIOD, value)
          }
        }
      }
    })
  }
}

export function getTitleAmPmDataModel(props, context) {
  const showAmPm = computed(() => _is12HourConvention(props))
  const { active: amActive, events: amEvent } = _getPeriodDataModel(props, context, Period.AM)
  const { active: pmActive, events: pmEvent } = _getPeriodDataModel(props, context, Period.PM)

  return {
    showAmPm,
    amActive, amEvent,
    pmActive, pmEvent
  }
}
