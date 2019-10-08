import { getZIndex } from '../utils/helpers';
import { ref } from '@vue/composition-api'

export default function stackable(props, context) {
  const stackMinZIndex = ref(200);

  function getMaxZIndex(exclude) {


    //const base = context.refs.el;

    const zis = [stackMinZIndex.value];

    const activeElements = [
      ...document.getElementsByClassName('dialog-wrapper__active'),
    ];

    for (let index = 0; index < activeElements.length; index++) {
      if (exclude !== activeElements[index]) {
        zis.push(getZIndex(activeElements[index]))
      }
    }

    return Math.max(...zis);
  }


  return {
    getMaxZIndex,

  }
}