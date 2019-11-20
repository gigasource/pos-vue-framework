export function enterPressed(e) {
  return e.keyCode === 13
}

export function enterNotPressed(e) {
  return !enterPressed(e)
}

export function shiftPressed(e) {
  return e.keyCode === 16 || e.shiftKey
}

export function ctrlPressed(e) {
  return e.keyCode === 17 || e.ctrlKey
}

export function metaPressed(e) {
  // meta left/window left: 91
  // meta right/window right: 92
  return e.keyCode === 91 || e.keyCode === 92 || e.metaKey
}

export function escapePressed(e) {
  return e.keyCode === 27
}
