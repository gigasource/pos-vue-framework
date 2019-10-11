/**
 *
 * @param closeDelay {Number | String} Delay (in ms) after which tooltip closes (when open-on-hover prop is set to true)
 * @param openDelay {Number | String} Delay (in ms) after which tooltip opens (when open-on-hover prop is set to true)
 * @param state {Object} reactive({ isActive: boolean })
 * @returns {{runDelay: runDelay}}
 */
export default function delayable({ closeDelay, openDelay }, state) {
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
    cb = cb || (() => {
      state.isActive = { open: true, close:false } [type]
    })

    clearPendingTimeouts()
    if (type === 'open') runOpenDelay(cb)
    if (type === 'close') runCloseDelay(cb)
  }

  return {
    runDelay
  }
}
