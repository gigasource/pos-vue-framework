import Vue from 'vue/dist/vue.common.js'
// init plugin first

const createElement = require('../../../tests/setup').createElement
// import component here
import GMenu from '../GMenu';

describe('Menu', () => {
  const template = `
        <div data-app>
          <g-menu v-model="showMenu">
            <template v-slot:activator="{toggleContent}">
              <button @click="toggleContent">Activator</button>
            </template>
            <div>content</div>
          </g-menu>
        </div>`

  afterEach(() => {
    // clear document body after each test to prevent content slots from
    // mounting on the first div with [data-app] attr
    document.body.innerHTML = ''
  })

  it('should render default and activator slots', () => {
    const vm = new Vue({
      template,
      components: { GMenu },
      data() {
        return {
          showMenu: false
        }
      }
    }).$mount(createElement());
    expect(vm.$el.outerHTML).toMatchSnapshot()
    expect(vm.$children[0].$scopedSlots.default).toBeTruthy()
    expect(vm.$children[0].$scopedSlots.activator).toBeTruthy()
  })

  it('should attach content to root dom', function () {
    const vm = new Vue({
      template,
      components: { GMenu },
      data() {
        return {
          showMenu: false
        }
      }
    }).$mount(createElement());
    expect(vm.$el.outerHTML).toMatchSnapshot()
    expect(vm.$el.firstChild.className).toBe('menu-content')
  });

  it('should not mount content if lazy loading', function () {
    const vm = new Vue({
      template: `
        <div data-app>
          <g-menu v-model="showMenu" lazy>
            <template v-slot:activator="{toggleContent}">
              <button @click="toggleContent" width="100" height="50">Activator</button>
            </template>
            <div>content</div>
          </g-menu>
        </div>
      `,
      components: { GMenu },
      data() {
        return {
          showMenu: false
        }
      }
    }).$mount(createElement());
    expect(vm.$el.outerHTML).toMatchSnapshot()
    expect(vm.$el.querySelector('.menu-content')).toBe(null)
  });

  it('should activate on click', function () {
    const vm = new Vue({
      template,
      components: { GMenu },
      data() {
        return {
          showMenu: false
        }
      }
    }).$mount(createElement());
    vm.$nextTick(() => {
      expect(vm.$el.outerHTML).toMatchSnapshot()
      const button = vm.$el.querySelector('button')
      button.click()
      expect(vm.showMenu).toBe(true)
    })
  });
})
