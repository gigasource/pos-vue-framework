import { computed } from '@vue/composition-api'
import { HourConvention } from './GTimePickerUtil';

// ---- Clicked target
//
/**
 * The angle will be started from 0y in clockwise
 * +-----------------+
 * |        |<->/    |
 * |   IV   |  /     |
 * |        |a/   I  |
 * |........|/.......|
 * |       O.        |
 * |        .        |
 * |  III   .    II  |
 * |        .        |
 * +-----------------+
 *
 * @param clockContainer the rectangle contain clock background
 * @param targetPos the position user clicked to clock container content
 */
function computeRadians(clockContainer, targetPos) {
  const { width, height } = clockContainer
  // the origin place in the center of clock container
  const { Ox, Oy } = { Ox: width/2, Oy: height/2 }
  const targetDistance = Math.sqrt(Math.pow(targetPos.x - Ox, 2) + Math.pow(targetPos.y - Oy, 2))
  // user clicked outside of clock zone
  if (targetDistance > width / 2)
    return false

  let radians
  if (targetPos.x >= Ox) {
    if (targetPos.y < Oy) {
      // Part I
      radians = Math.asin((targetPos.x - Ox) / targetDistance)
    } else {
      // Part II
      radians = 0.5 * Math.PI + Math.asin((targetPos.y - Oy)/targetDistance)
    }
  } else {
    if (targetPos.y >= Oy) {
      // Part III
      radians = Math.PI + Math.asin((Ox - targetPos.x) / targetDistance)
    } else {
      // Part IV
      radians = 1.5 * Math.PI + Math.asin((Oy - targetPos.y)/targetDistance)
    }
  }

  return radians
}

/**
 * Convert radians to angle
 * @param radian
 * @returns {number}
 */
function radiansToAngle(radian) {
  return radian * 180 / Math.PI
}

/**
 * get angle of target pos
 * @param clockContainer
 * @param targetPos
 * @returns {number}
 */
export function computeAngle(clockContainer, targetPos) {
  const angle = radiansToAngle(computeRadians(clockContainer, targetPos))
  return angle
}

/**
 * Get item's index at the position an user clicked
 * @param clockContainer the clock size
 * @param targetPos the position the user clicked to
 * @param itemsLength default 60 for minute second
 * @returns {number}
 * if the position is valid, return index of item,
 * otherwise, return -1 (if user click outside of clock circle
 */
export function getSelectedIndex(clockContainer, targetPos, itemsLength = 60) {
  // 60 minute, second will be display in a circle, each item own 360 / 6 angle
  const anglePerUnit = 360 / itemsLength
  const angle = computeAngle(clockContainer, targetPos)
  if (angle !== false) {
    let selectedItemIndex = Math.round(angle / anglePerUnit)
    // reset if selected index reach the boundary
    if (selectedItemIndex >= itemsLength)
      selectedItemIndex = 0
    return selectedItemIndex
  } else return -1
}


// ---- Hand
//
export function repositionFaceNumber(numbers, ratio = 1) {
  let anglePerStep = 2 * Math.PI / numbers.length
  let angle = Math.PI / 2
  _.each(numbers, (el, index) => {
    el.style = {
      ...el.style,
      top: `${50 * (1 - ratio * Math.sin(angle + index * anglePerStep))}%`,
      left: `${50 * (1 - ratio * Math.cos(angle + index * anglePerStep))}%`
    }
  })
  return numbers
}

export const computedHandStyle = (props, state) => {
  const cptHandHeightAndTop = _computedHandHeightAndTop(props, state);
  const cptHandTransform = _computedHandTransform(state)
  return computed(() => {
    return {
      ...cptHandHeightAndTop.value,
      ...cptHandTransform.value
    }
  })
}

const _computedHandHeightAndTop = (props, state) => {
  return computed(() => {
    if (   state.activeTimePicker.hour
        && props.hourConvention === HourConvention._24HRS
        && state.selectedTime.hours >= 12) {
        return {
          top: '20%',
          height: '30%'
        }
    } else {
      return {
        top: '0%',
        height: '50%'
      }
    }
  })
}

const _computedHandTransform = (state) => {
  // [0, 11]
  const range12 = [...Array(12).keys()]
  // [12, 23]
  const range12_24 = [...Array(24).keys()].splice(12, 12)
  // [0, 59]
  const range60 = [...Array(60).keys()]

  return computed(() => {
    let degree = 0
    if (state.activeTimePicker.hour) {
      // 12 hours
      // 30 = 360 / 12
      degree = range12.indexOf(state.selectedTime.hours) * 30
      if (degree < 0)
        degree = range12_24.indexOf(state.selectedTime.hours) * 30
    }
    else if (state.activeTimePicker.minute) {
      degree = range60.indexOf(state.selectedTime.minutes) * 6
    }// 360 / 60
    else if (state.activeTimePicker.second) {
      degree = range60.indexOf(state.selectedTime.seconds) * 6
    }

    return { 'transform': `rotate(${degree}deg)` }
  })
}
