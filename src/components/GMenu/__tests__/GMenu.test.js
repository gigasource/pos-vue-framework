// import Vue from 'vue'
const Vue = require('vue/dist/vue.common.js')
const plugin = require('@vue/composition-api').default
Vue.use(plugin)

import GMenu from '../GMenu';
import GButton from '../../GButton/GButton';
import GListItem from '../../GList/GListItem';
import GList from '../../GList/GList';

describe('Menu', () => {
  it('should render default and activator slots', () => {
    const vm = new Vue({
      template: `
        <div data-app>
          <g-menu v-model="showMenu" lazy open-on-hover open-delay="500" close-delay="500">
            <template v-slot:activator="{toggleContent}">
              <g-button @click="toggleContent" width="100" height="50">Activator</g-button>
            </template>
            <g-list>
              <g-list-item v-for="i in 5" :key="i">
                <g-button>button {{i}}</g-button>
              </g-list-item>
            </g-list>
          </g-menu>
        </div>
      `,
      components: { GListItem, GList, GMenu, GButton },
      data() {
        return {
          showMenu: false
        }
      }
    }).$mount();
    expect(vm.$children[0].$scopedSlots.default).toBeTruthy()
    expect(vm.$children[0].$scopedSlots.activator).toBeTruthy()
  })

  //fixme: detachable cannot find root el
  it('should activate on click', function () {
    const vm = new Vue({
      template: `
        <div>
          <div data-app>
            <g-menu v-model="showMenu">
              <template v-slot:activator="{toggleContent}">
                <g-button @click="toggleContent">Activator</g-button>
              </template>
              <p>Content slot</p>
            </g-menu>
          </div>
        </div>
      `,
      components: { GListItem, GList, GMenu, GButton },
      data() {
        return {
          showMenu: false
        }
      }
    }).$mount();
    vm.$nextTick(() => {
      // expect(vm.$el.outerHTML).toMatchSnapshot()
      const button = vm.$el.querySelector('button')
      button.click()
      expect(vm.showMenu = true)
    })
  });



})
