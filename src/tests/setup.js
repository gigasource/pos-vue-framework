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

import Vue from 'vue/dist/vue.common.js'
import VueCompositionApi from '@vue/composition-api'
// init plugin first
Vue.use(VueCompositionApi)
