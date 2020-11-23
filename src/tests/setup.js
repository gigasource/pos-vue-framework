const jsdom = require('jsdom')

export function createElement() {
  if (document) {
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    return elem
  }
}

export function setInputValue(input, value) {
  input.value = value;
  let event = new Event('input', { bubbles: true });
  input.dispatchEvent(event);
}
import Vue from 'vue/dist/vue.common.js'
