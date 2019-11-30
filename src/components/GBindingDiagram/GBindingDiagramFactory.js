export function isRootPath (path) {
  return path === ''
}

export function isSlotPath (path) {
  return path.indexOf('slot') > -1
}

export function convertToNormalPath (slotPath) {
  return slotPath.replace(/\.slot\.\d/, '')
}

export function convertToPath (slottedPath) {
  return slottedPath.replace(/slot\.\d\./g, '')
}