import _ from 'lodash';

export const DnDStore = {
  dragInProgressKey: '',
  transferredData: {}
}

export function getListeners (vnode) {
  if (vnode.data && vnode.data.on) {
    return vnode.data.on;
  }

  if (vnode.componentOptions) {
    return vnode.componentOptions.listeners
  }
  return {}
}

export function getNamespace(binding) {
  const namespace = binding.arg
  if (!namespace || typeof namespace !== 'string') return null
  return namespace
}

export function removeEventHandlers(el) {
  if (!el || !el._eventListeners) return
  _.forOwn(el._eventListeners, (handler, event) => {
    el.removeEventListener(event, handler)
  })
}

async function* getFileEntries(directoryEntry) {
  const reader = directoryEntry.createReader();
  const getEntries = () => new Promise((resolve, reject) => {
    reader.readEntries(resolve, reject);
  });

  let entries = []
  do {
    entries = await getEntries();
    for (const entry of entries) {
      yield entry
    }
  } while (entries.length > 0);
}

function convertToFile(entry) {
  return new Promise((resolve, reject) => {
    entry.file(resolve, reject);
  });
}

export async function traverseDir(entry, list) {
  const { fullPath, isDirectory, name } = entry
  const file = { fullPath, isDirectory, name }
  if (entry.isFile) {
    const fileData = await convertToFile(entry)
    Object.assign(file, {file: fileData})
  }
  list.push(file)
  if (entry.isDirectory) {
    for await (const e of getFileEntries(entry))
      await traverseDir(e, list);
  }
}
