import _ from 'lodash'

function draggableInserted(el, binding) {
  const allowedDragEffects = ['none', 'copy', 'move', 'link', 'copyMove', 'copyLink', 'linkMove', 'all']
  const dragEffects = binding.modifiers && allowedDragEffects.includes(binding.modifiers) ? binding.modifiers :'all'
  const handlers = binding.value // event handlers
  let data = binding.arg || [] // transferred data as object {type, content} or array of such objects
  if (typeof data === 'object') data = [data]

  el.setAttribute('draggable', true)

  // events: dragstart, dragend
  if (handlers) {
    _.forOwn(handlers, (handler, event) => {
      el.addEventListener(event, e => {
        data.forEach(item => e.dataTransfer.setData(item.type, item.content))
        e.dataTransfer.effectAllowed = dragEffects
        handler(e)
      })
    })
  } else {
    el.addEventListener('dragstart', e => {
      data.forEach(item => e.dataTransfer.setData(item.type, item.content))
      e.dataTransfer.effectAllowed = dragEffects
    })
  }
  el._eventListeners = handlers

  //todo: drag custom image
}

function droppableInserted(el, binding) {
  // require handlers: ondrop, ondragover
  const handlers = binding.value

  //events: dragenter, dragover, dragleave, drop
  if (handlers) {
    _.forOwn(handlers, (handler, event) => {
      el.addEventListener(event, e => {
        // todo set drop effects, accept data types
        handler(e)
        e.preventDefault()
        e.dataTransfer.clearData()
      })
    })
  }

  el._eventListeners = handlers
}

function unbind(el) {
  if (!el._eventListeners) return
  _.forOwn(el._eventListeners, (handler, event) => {
    el.removeEventListener(event, handler)
  })
}

export const Draggable = {inserted: draggableInserted, unbind}
export const Droppable = {inserted: droppableInserted, unbind}