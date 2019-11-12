export function enterPressed(e) {
  return e.keyCode === 13
}

export function enterNotPressed(e) {
  return !enterPressed(e)
}

export function shiftPressed(e) {
  return e.shiftKey
}

export function ctrlPressed(e) {
  return e.ctrlKey
}

export function metaPressed(e) {
  return e.metaKey
}

export function escapePressed(e) {
  return e.keyCode === 27
}
