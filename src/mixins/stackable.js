import { getZIndex } from '../utils/helpers';
import { ref } from '@vue/composition-api'

export default function stackable(props, context) {
  const stackMinZIndex = ref(400);

  function getMaxZIndex(exclude) {
    //const base = context.refs.el;
    const activeElementsZIndexes = [stackMinZIndex.value];

    const activeElements = [
      ...document.getElementsByClassName('g-dialog-wrapper__active'),
    ];

    for (let index = 0; index < activeElements.length; index++) {
      if (exclude !== activeElements[index]) {
        activeElementsZIndexes.push(getZIndex(activeElements[index]))
      }
    }

    return Math.max(...activeElementsZIndexes);
  }

  return {
    getMaxZIndex,
  }
}
