import _ from 'lodash';

export const DnDStore = {
  dragInProgressKey: '',
  transferredData: {}
}

export const getListeners = vnode => {
  if (vnode.data && vnode.data.on) {
    return vnode.data.on;
  }

  if (vnode.componentOptions) {
    return vnode.componentOptions.listeners
  }
  return {}
}

export const getNamespace = (binding) => {
  const namespace = binding.arg
  if (!namespace || typeof namespace !== 'string') return null
  return namespace
}

export const removeEventHandlers = (el) => {
  if (!el || !el._eventListeners) return
  _.forOwn(el._eventListeners, (handler, event) => {
    el.removeEventListener(event, handler)
  })
}
