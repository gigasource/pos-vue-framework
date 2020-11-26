import { DnDStore, getListeners, getNamespace, removeEventHandlers, traverseDir } from './DnDCommon';

let handlers = {}

function mounted(el, binding, vnode) {
  const vNodeListeners = getListeners(vnode)

  const isFileDrop = binding.modifiers.file

  const isDropAllowed = () => {
    if (isFileDrop) return true
    const dropNamespace = getNamespace(binding);
    const { namespace } = DnDStore.transferredData[DnDStore.dragInProgressKey]
    return !namespace || !dropNamespace || namespace === dropNamespace
  }

  const getHandler = async (e, vNodeEvent, isDropEvent = false) => {
    e.preventDefault()

    let fileList = []
    if (isFileDrop && isDropEvent) {
      const dropItems = e.dataTransfer.items
      const entries = []
      for (let i = 0; i < dropItems.length; i++) {
        entries.push(dropItems[i].webkitGetAsEntry())
      }
      for (const entry of entries) {
        await traverseDir(entry, fileList)
      }
    } else {
      fileList = (e.dataTransfer.files.length && e.dataTransfer.files) || e.dataTransfer.items
    }

    const dragData = isFileDrop
      ? fileList
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
    drop: async e => {
      e.stopPropagation()
      await getHandler(e, 'drag-drop', true)
    }
  }

  el.addEventListener('dragenter', handlers.dragenter)
  el.addEventListener('dragover', handlers.dragover)
  el.addEventListener('dragleave', handlers.dragleave)
  el.addEventListener('drop', handlers.drop)
  el._eventListeners = handlers
}

function unmounted(el) {
  removeEventHandlers(el)
}

const Droppable = { mounted, unmounted };
export default Droppable
