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

