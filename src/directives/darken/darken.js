import {getHslColor} from '../../utils/colors';

const DURATION = 200

function isDarkenEnabled(value) {
  return typeof value === 'undefined' || !!value
}

function darken(e) {
  const el = e.currentTarget
  if (el) {
    let backgroundColor, border, boxShadow
    if (!el._darken.originalColor) {
      ({backgroundColor, border, boxShadow} = el.style);
      el._darken.originalColor = {
        backgroundColor, border, boxShadow
      }
    } else ({backgroundColor, border} = el._darken.originalColor)
    let {h, s, l, a} = getHslColor(backgroundColor)
    if (h === 0 && s === 0) {
      let hsla
      if (border)
        hsla = getHslColor(border)
      else
        hsla = {h: 0, s: 0, l: 0, a: 0}
      h = hsla.h
      s = hsla.s
      l = hsla.l
      a = hsla.a
    }
    el.style.background = `hsla(${h}, ${s - 5}%, ${l - 15}%, ${a})`
    el.style.borderColor = `hsla(${h + 2}, ${s - 10}%, ${l - 15}%, ${a})`
    el.style.boxShadow = `1px 0px 5px hsla(${h + 2}, ${s - 10}%, ${l - 15}%, ${a})`;

    if (el._darken.darkenTimer) clearTimeout(el._darken.darkenTimer)

    el._darken.darkenTimer = setTimeout(() => {
      if (!el._darken || !el._darken.originalColor) return
      el.style.backgroundColor = el._darken.originalColor.backgroundColor
      el.style.borderColor = el._darken.originalColor.borderColor
      el.style.boxShadow = el._darken.originalColor.boxShadow
      el._darken.darkenTimer = null
    }, el._darken.timeout || DURATION)
  }
}

function updateDarken(el, binding, wasEnabled) {
  const {value} = binding
  const enabled = isDarkenEnabled(value)

  el._darken = el._darken ?? {}
  if (typeof value === 'number') {
    el._darken.timeout = value
  }

  if (enabled && !wasEnabled) {
    el.addEventListener('touchstart', darken, {passive: true})
    el.addEventListener('mousedown', darken)
  } else if (!enabled) {
    removeListeners(el)
  }
}

function removeListeners(el) {
  el.removeEventListener('mousedown', darken)
  el.removeEventListener('touchstart', darken)
}

function mounted(el, binding) {
  updateDarken(el, binding, false)
}

function unmounted(el) {
  delete el._darken
  removeListeners(el)
}

function updated(el, binding) {
  if (binding.value === binding.oldValue) {
    return
  }

  const wasEnabled = isDarkenEnabled(binding.oldValue)
  updateDarken(el, binding, wasEnabled)
}

export const Darken = {
  mounted,
  unmounted,
  updated,
}

export default Darken
