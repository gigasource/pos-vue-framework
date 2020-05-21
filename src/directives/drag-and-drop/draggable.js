import { DnDStore, getListeners, getNamespace, removeEventHandlers } from './DnDCommon';

let handlers = {}

function inserted(el, binding, vnode) {
  const allowedDragEffects = ['none', 'copy', 'move', 'link', 'copyMove', 'copyLink', 'linkMove', 'all']
  const dragEffect = binding.modifiers && allowedDragEffects.includes(binding.modifiers) ? binding.modifiers : 'all'
  const dragData = binding.value // event handlers
  const vNodeListeners = getListeners(vnode)

  el.setAttribute('draggable', true)

  if (binding.modifiers && binding.modifiers.move) {
    el.style.cursor = 'move';
  }

  const transferKey = +new Date() + ''

  handlers = {
    dragstart: e => {
      DnDStore.dragInProgressKey = transferKey

      DnDStore.transferredData[transferKey] = {
        dragData,
        onDropCallback: null,
        namespace: getNamespace(binding)
      }

      e.dataTransfer.setData('text/plain', transferKey)
      e.dataTransfer.effectAllowed = dragEffect
      e.dataTransfer.dropEffect = dragEffect
      //todo set drag image

      if (vNodeListeners['drag-start']) vNodeListeners['drag-start'](dragData, e)
    },
    drag: e => {
      const { dragData } = DnDStore.transferredData[transferKey]

      if (vNodeListeners['dragging']) vNodeListeners['dragging'](dragData, e)
    },
    dragend: (e) => {
      // cancelled drop, todo put in userspace?
      // if (e.dataTransfer.dropEffect === 'none') return

      DnDStore.dragInProgressKey = ''

      if (DnDStore.transferredData[transferKey]) {
        const callback = DnDStore.transferredData[transferKey].onDropCallback
        if (callback && typeof callback === 'function') callback()
        delete DnDStore.transferredData[transferKey]
      }

      if (vNodeListeners['drag-end']) vNodeListeners['drag-end'](dragData, e)
    }
  }

  el.addEventListener('dragstart', handlers.dragstart)
  el.addEventListener('drag', handlers.drag)
  el.addEventListener('dragend', handlers.dragend)
  el._eventListeners = handlers
}

function unbind(el) {
  removeEventHandlers(el)
}

const Draggable = { inserted, unbind }
export default Draggable
