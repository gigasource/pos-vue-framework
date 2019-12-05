import _ from 'lodash'
import { computed } from '@vue/composition-api'
import { range0_11, range12_23, range0_59 } from './GTimePickerUtil';
import { ActiveTimePicker } from './GTimePickerUtil';

// ---- Clicked target
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

  // if user click to the Origin, ignore
  if (targetDistance === 0)
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
function computeAngle(clockContainer, targetPos) {
  const radians = computeRadians(clockContainer, targetPos)
  if (radians === false)
    return false
  else
    return radiansToAngle(radians)
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
    let selectedItemIndex = Math.floor((angle + 0.5 * anglePerUnit) / anglePerUnit)
    // reset if selected index reach the boundary
    if (selectedItemIndex >= itemsLength)
      selectedItemIndex = 0
    return selectedItemIndex
  } else return -1
}


// Clock's number
export function _calcNumberPositionStyle(length, ratio = 1) {
  let anglePerStep = 2 * Math.PI / length
  let angle = Math.PI / 2
  let positionStyle = []
  for(let i=0; i<length; ++i) {
    positionStyle.push({
      top: `${50 * (1 - ratio * Math.sin(angle + i * anglePerStep))}%`,
      left: `${50 * (1 - ratio * Math.cos(angle + i * anglePerStep))}%`
    })
  }
  return positionStyle
}

// hour number position
export const range0_23PositionStyle = [..._calcNumberPositionStyle(range0_11.length), ..._calcNumberPositionStyle(range12_23.length, 0.6)]
// minute & second position
export const range0_59PositionStyle = _calcNumberPositionStyle(range0_59.length)

// ---- Clock's hand
const _computedHandHeightAndTop = (props, state) => {
  return computed(() => {
    if (   state.activeTimePicker === ActiveTimePicker.hour
        && props.use24Hours
        && state.selectedTime.hours >= 12)
    {
      // get short hand
      return {
        top: '20%',
        height: '30%'
      }
    } else {
      // get long hand
      return {
        top: '2%',
        height: '48%'
      }
    }
  })
}
const _computedHandTransform = (state) => {
  return computed(() => {
    let degree = 0
    if (state.activeTimePicker === ActiveTimePicker.hour) {
      // 12 hours
      // 30 = 360 / 12
      degree = _.findIndex(range0_11, hours => hours === Number(state.selectedTime.hours)) * 30
      if (degree < 0) {
        degree = _.findIndex(range12_23, hours => hours === Number(state.selectedTime.hours)) * 30
      }
    }
    else if (state.activeTimePicker === ActiveTimePicker.minute) {
      degree = _.findIndex(range0_59, minutes => minutes === Number(state.selectedTime.minutes)) * 6
    }// 360 / 60
    else if (state.activeTimePicker === ActiveTimePicker.second) {
      degree = _.findIndex(range0_59, seconds => seconds === Number(state.selectedTime.seconds)) * 6
    }

    return { 'transform': `rotate(${degree}deg)` }
  })
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
