import { computed } from '@vue/composition-api'
import groupable from '../../mixins/groupable';
import _ from 'lodash'
import {getInternalValue} from "../../utils/helpers";

export function genHeaderFactory(itemHeader) {
  return computed(() => typeof itemHeader === 'function' ? itemHeader : item => item[itemHeader])
}

export function genContentFactory(itemContent) {
  return computed(() => typeof itemContent === 'function' ? itemContent : item => item[itemContent])
}

export const getExpansionModel = function (props, context) {
  const model = getInternalValue(props, context);

  const { toggleItem, isActiveItem } = groupable(props, model);

  return {
    model,
    toggleItem,
    isActiveItem
  }
}
