import colorList from '../style/_colors.scss';
import { isCssColor } from '../mixins/colorable';
import _ from 'lodash'

export const colors = Object.freeze(_.pickBy(colorList, (val, key) => !key.startsWith('gradient-')));
export const gradientColors = Object.freeze(_.pickBy(colorList, (val, key) => key.startsWith('gradient-')));

export function linearGradient(colorArr, angle = 45) {
  if(!colorArr) {
    return
  }

  if(typeof colorArr === 'string') {
    colorArr = colorArr.split(',')
  }

  if(!!Number(+angle)) {
    angle = `${Number(angle)}deg`
  }

  return colorArr.length > 0 && colorArr.reduce((acc, curVal, index, arr) => {
    if(!isCssColor(curVal)) {
      curVal = colors[curVal.trim().split(' ').join('-')];
    }
    if (index === arr.length - 1) {
      curVal = `${curVal})`;
    }
    return `${acc}, ${curVal}`;
  }, `linear-gradient(${angle}`);
}

export function getCssColor(color) {
  if(!color || isCssColor(color)) {
    return color
  }
  return colors[color.trim().split(' ').join('-')]
}

/**
 * Create random color
 * @returns {string}
 * @private
 */
export function generateRandomCssColor(opacity = '50%') {
  return `hsl(${Math.round(Math.random() * 360)}, 100%, 50%, ${opacity})`
}
