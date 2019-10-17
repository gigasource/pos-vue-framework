import { createElement } from '../../../tests/setup'

const Vue = require('vue/dist/vue.common.js')
import plugin from '@vue/composition-api'

Vue.use(plugin)

import GNotification from '../GNotification';

describe('Notification Center', () => {
  afterEach(() => {
    // clear document body after each test to prevent content slots from
    // mounting on the first div with [data-app] attr
    document.body.innerHTML = ''
  })

  it('Should create Notification container when mounted', () => {
    const vm = new Vue({
      ...GNotification
    }).$mount(createElement())

    expect(vm.$el.outerHTML).toMatchSnapshot()
  })

  it('Should create a notification when calling notify method', async () => {
    const vm = new Vue({
      ...GNotification
    }).$mount(createElement())

    vm.notify('hello')
    await vm.$nextTick()
    expect(vm.$el.outerHTML).toMatchSnapshot()
  })

  it('Should clear all notification when calling clear method', async () => {
    const vm = new Vue({
      ...GNotification
    }).$mount(createElement())

    vm.notify('hello')
    vm.notify('hi')
    vm.notify('aloha')
    await vm.$nextTick()

    vm.clear()
    await vm.$nextTick()
    expect(vm.$el.outerHTML).toMatchSnapshot()
  })
})