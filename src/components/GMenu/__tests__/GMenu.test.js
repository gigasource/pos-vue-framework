import Vue from 'vue/dist/vue.common.js'
import VueCompositionApi from '@vue/composition-api'
// init plugin first
Vue.use(VueCompositionApi)

const createElement = require('../../../tests/setup').createElement
// import component here
import GMenu from '../GMenu';

describe('Menu', () => {
  it('should render default and activator slots', () => {
    const vm = new Vue({
      template: `
        <div data-app>
          <g-menu v-model="showMenu">
            <template v-slot:activator="{toggleContent}">
              <button @click="toggleContent">Activator</button>
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
    expect(vm.$children[0].$scopedSlots.default).toBeTruthy()
    expect(vm.$children[0].$scopedSlots.activator).toBeTruthy()
  })

  //fixme: test fails when run as file
  it('should attach content to root dom', function () {
    const vm = new Vue({
      template: `
        <div data-app>
          <div>
            <g-menu v-model="showMenu">
              <template v-slot:activator="{toggleContent}">
                <button @click="toggleContent">Activator</button>
              </template>
              <div>content</div>
            </g-menu>
          </div>
        </div>
      `,
      components: { GMenu },
      data() {
        return {
          showMenu: false
        }
      }
    }).$mount(createElement());
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
    expect(vm.$el.querySelector('.menu-content')).toBe(null)
  });

  it('should activate on click', function () {
    const vm = new Vue({
      template: `
        <div>
          <div data-app>
            <g-menu v-model="showMenu">
              <template v-slot:activator="{toggleContent}">
                <button @click="toggleContent">Activator</button>
              </template>
              <div>content</div>
            </g-menu>
          </div>
        </div>
      `,
      components: { GMenu },
      data() {
        return {
          showMenu: false
        }
      }
    }).$mount(createElement());
    vm.$nextTick(() => {
      // expect(vm.$el.outerHTML).toMatchSnapshot()
      const button = vm.$el.querySelector('button')
      button.click()
      expect(vm.showMenu).toBe(true)
    })
  });
})
