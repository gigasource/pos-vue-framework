export function enterPressed(e) {
  return e.keyCode === 13
}

export function enterNotPressed(e) {
  return !enterPressed(e)
}
