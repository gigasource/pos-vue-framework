//todo: setup return function (even handler, slot generate) return props class (use getVModel)
// todo: lazy value, internalValue, common event handler, watcher

import {computed, createElement, ref, watch} from '@vue/composition-api';
import getVModel from '../../mixins/getVModel';
import _ from 'lodash';

const props = {
  label: String,
  disabled: Boolean,
  readOnly: Boolean,
  value: null,
  rules: Function,
  appendIcon: String,
  prependIcon: String,
  hasMouseDown: Boolean
}

export default function getGInput(props, context) {

  const state = {
    hasMouseDown: false,
  }
  // let lazyValue = ref(props.value);
  // let isValidInput = ref(false);

  //todo: internal value, watcher to validate content
  //event listen function
  function onClick(event) {
    context.emit('click', event)
  }

  function onMouseDown(event) {
    state.hasMouseDown = true
    context.emit('mousedown', event)
  }

  function onMouseUp(event) {
    if (state.hasMouseDown) {
      state.hasMouseDown = false
      context.emit('mouseup', event)
    }
  }

  function onChange(event) {
    context.emit('change', event)
  }

  // function onInput(event) {
  //   internalValue.value = event.target.value;
  // }

  const listeners = {
    onClick,
    onMouseDown,
    onMouseUp,
    onChange,
    // onInput,
  }

  //computed state
  const isDisabled = computed(() => props.disable)
  const hasLabel = computed(() => props.label || context.slots.label)
  // todo: move to field input mixin
  // let isLabelActive = computed()



  return {
    listeners,
    state,
    isDisabled,
    hasLabel,
    // isDirty,
    // isValidInput,
    // lazyValue
  }


}
