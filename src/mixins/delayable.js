export default function delayable({ closeDelay, openDelay }) {
  let openTimeout = null
  let closeTimeout = null

  function clearPendingTimeouts() {
    clearTimeout(openTimeout)
    clearTimeout(closeTimeout)
  }

  function runOpenDelay(cb) {
    const delay = parseInt(openDelay)
    openTimeout = setTimeout(cb, delay)
  }

  function runCloseDelay(cb) {
    const delay = parseInt(closeDelay)
    closeTimeout = setTimeout(cb, delay)
  }

  function runDelay(type, cb) {
    clearPendingTimeouts()
    if (type === 'open') runOpenDelay(cb)
    if (type === 'close') runCloseDelay(cb)
  }

  return {
    runDelay
  }
}