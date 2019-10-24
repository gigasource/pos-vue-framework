import colorList from '../style/_colors.scss';
import { isCssColor } from '../mixins/colorable';

export const colors = Object.freeze(colorList);

export function linearGradient(colorArr, angle = 45) {
  if(!colorArr) {
    return
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