import { DnDStore, getListeners, getNamespace, removeEventHandlers } from './DnDCommon';
let handlers = {}

function inserted(el, binding, vnode) {
  const vNodeListeners = getListeners(vnode)

  const isFileDrop = binding.modifiers.file

  const isDropAllowed = () => {
    if (isFileDrop) return true
    const dropNamespace = getNamespace(binding);
    const { namespace } = DnDStore.transferredData[DnDStore.dragInProgressKey]
    return !namespace || !dropNamespace || namespace === dropNamespace
  }

  const getHandler = (e, vNodeEvent, isDropEvent = false) => {
    e.preventDefault()

    const dragData = isFileDrop
      ? (e.dataTransfer.files.length && e.dataTransfer.files) || e.dataTransfer.items // default to dataTransfer items
      : DnDStore.transferredData[DnDStore.dragInProgressKey].dragData

    if (isDropEvent && !isFileDrop) {
      const transferKey = e.dataTransfer.getData('text/plain')
      const { dragData } = DnDStore.transferredData[transferKey]

      DnDStore.transferredData[transferKey].onDropCallback = () => {
        if (vNodeListeners[vNodeEvent]) vNodeListeners[vNodeEvent](dragData, e)
      }
    } else if (vNodeListeners[vNodeEvent]) vNodeListeners[vNodeEvent](dragData, e)
  }

  //events: dragenter, dragover, dragleave, drop
  handlers = {
    dragenter: e => getHandler(e, 'drag-enter'),
    dragover: e => {
      if (isDropAllowed()) {
        return getHandler(e, 'drag-over')
      }
    },
    dragleave: e => getHandler(e, 'drag-leave'),
    drop: e => {
      e.stopPropagation()
      getHandler(e, 'drag-drop', true)
    }
  }

  el.addEventListener('dragenter', handlers.dragenter)
  el.addEventListener('dragover', handlers.dragover)
  el.addEventListener('dragleave', handlers.dragleave)
  el.addEventListener('drop', handlers.drop)
  el._eventListeners = handlers
}

function unbind(el) {
  removeEventHandlers(el)
}

const Droppable = {inserted, unbind};
export default Droppable