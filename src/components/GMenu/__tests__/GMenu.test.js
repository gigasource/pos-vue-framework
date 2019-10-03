// import Vue from 'vue'
import { createElement } from '@vue/composition-api';
const Vue = require('vue/dist/vue.common.js')
const plugin = require('@vue/composition-api').default
// const {createElement} = require('@vue/composition-api')
Vue.use(plugin)

import GMenu from '../GMenu';
import GButton from '../../GButton/GButton';
import GListItem from '../../GList/GListItem';
import GList from '../../GList/GList';
// const GMenu =  require('../GMenu');

describe('Menu', () => {
  it('should render', () => {
    // const vm = new Vue({
    //   setup() {
    //     return () => createElement('div', ['test'])
    //   }
    // }).$mount()
    const vm0 = new Vue({
      template: `
        <div data-app>
          <g-menu v-model="showMenu" lazy open-on-hover open-delay="500" close-delay="500">
            <template v-slot:activator="{toggleContent}">
              <g-button @click="toggleContent" width="100px" height="50px">Activator</g-button>
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
    });
    const vm = vm0.$mount()
    // const wrapper = mountFunction()
    // expect(wrapper.html()).toMatchSnapshot()
    expect(vm.$el.outerHTML).toMatchSnapshot()
  })
})
