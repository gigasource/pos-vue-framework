import { computed } from '@vue/composition-api'

export function genHeaderFactory(itemHeader) {
  return computed(() => typeof itemHeader === 'function' ? itemHeader : item => item[itemHeader])
}

export function genContentFactory(itemContent) {
  return computed(() => typeof itemContent === 'function' ? itemContent : item => item[itemContent])
}
