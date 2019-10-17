import Vue from 'vue';
import GNotification from '../components/GNotification/GNotification';

export default {
  install(Vue, options) {
    const notificationCenter = new Vue({
      ...GNotification,
      propsData: options ? parseOptions(options) : {}
    })
    notificationCenter.$mount(document.body.appendChild(document.createElement('div')));

    Vue.prototype.$notificationCenter = notificationCenter;
  }
}

function parseOptions(options) {
  const propsData = {}

  if(options.position) {
    const position = options.position.split('-');
    for (let i = 0; i < position.length; i++) {
      propsData[position[i]] = true
    }
  }

  if (options.width) propsData['width'] = options.width

  return propsData;
}