import { createElement } from '../../../tests/setup'

const Vue = require('vue/dist/vue.common.js')
import plugin from '@vue/composition-api'

Vue.use(plugin)

// Import your components after all of above import
import GDialog from '../GDialog';

describe('Dialog', () => {
  afterEach(() => {
    // clear document body after each test to prevent content slots from
    // mounting on the first div with [data-app] attr
    document.body.innerHTML = ''
  })
  describe('Single Dialog', () => {

    function build(template) {
      return new Vue({
        template: template,
        components: { GDialog },
        data() {
          return {
            dialog: false
          }
        }
      }).$mount(createElement());
    }

    it('Should render default and activator slots', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog">
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);

      expect(vm.$el.outerHTML).toMatchSnapshot();
      expect(vm.$children[0].$scopedSlots.default).toBeTruthy();
      expect(vm.$children[0].$scopedSlots.activator).toBeTruthy();
    })

    it('Should attach wrapper and overlay to root', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog">
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);
      expect(vm.$el.outerHTML).toMatchSnapshot();
      expect(vm.$el.firstChild.className).toBe('dialog-wrapper');
      expect(vm.$el.firstChild.nextSibling.className).toBe('overlay');
    })

    it('Should not render overlay if hide-overlay is set', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog" hide-overlay>
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);
      expect(vm.$el.outerHTML).toMatchSnapshot();
      expect(vm.$el.querySelector('.overlay')).toBe(null);
    })

    it('Dialog content should have __scrollable class if scrollable is set', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog" scrollable>
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);
      expect(vm.$el.outerHTML).toMatchSnapshot();
      expect(vm.$el.firstChild.firstChild.className).toBe('dialog-content dialog-content__scrollable');
    })

    it('Dialog content should have __fullscreen class if fullscreen is set', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog" fullscreen>
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);
      expect(vm.$el.outerHTML).toMatchSnapshot();
      expect(vm.$el.firstChild.firstChild.className).toBe('dialog-content dialog-content__fullscreen');
    })

    it('Should activate on click', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog">
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);

      const button = vm.$el.querySelector('button');
      const overlay = vm.$el.querySelector('.overlay');
      button.click();
      expect(vm.dialog).toBe(true);
      vm.$nextTick(() => {
        expect(vm.$el.outerHTML).toMatchSnapshot();
        expect(vm.$el.firstChild.className).toBe('dialog-wrapper dialog-wrapper__active');
      })
    })

    it('Should close when press ESC', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog">
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);
      const button = vm.$el.querySelector('button');
      const wrapper = vm.$el.querySelector('.dialog-wrapper');
      const mouseClick = new MouseEvent('click');
      button.dispatchEvent(mouseClick);
      expect(vm.dialog).toBe(true);

      vm.$nextTick(() => {
        const keypress = new KeyboardEvent('keydown', { key: 'Escape' });
        wrapper.dispatchEvent(keypress);
        expect(vm.dialog).toBe(false);
        vm.$nextTick(() => {
          expect(vm.$el.outerHTML).toMatchSnapshot();
        });
      })
    })

    it('Should not render on mounted if lazy is set. Should render when activated', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog" lazy>
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);
      expect(vm.$el.outerHTML).toMatchSnapshot();
      expect(vm.$el.querySelector('.dialog-wrapper')).toBe(null);
      expect(vm.$el.querySelector('.overlay')).toBe(null);

      const button = vm.$el.querySelector('button');
      button.click();
      expect(vm.dialog).toBe(true);
      vm.$nextTick(() => {
        vm.$nextTick(() => {
          expect(vm.$el.outerHTML).toMatchSnapshot();
          expect(vm.$el.firstChild.className).toBe('dialog-wrapper dialog-wrapper__active');
          expect(vm.$el.firstChild.nextSibling.className).toBe('overlay overlay__active');
        })
      })
    })

    it('Should remove all when destroy', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog">
            <template v-slot:activator="{ toggleDialog }">
              <button @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
        </div>`

      const vm = build(template);

      const button = vm.$el.querySelector('button');
      button.click();
      expect(vm.dialog).toBe(true);
      vm.$nextTick(() => {
        vm.$destroy()
        expect(vm.$el.outerHTML).toMatchSnapshot();
        expect(vm.$el.querySelector('.dialog-wrapper')).toBe(null);
        expect(vm.$el.querySelector('.overlay')).toBe(null);
        expect(vm.$el.querySelector('button')).toBe(null);
      })
    })
  })
  describe('Nested Dialog', () => {
    it('Nested dialog should have higher zIndex than outer dialog', () => {
      const template = `
        <div data-app>
          <g-dialog v-model="dialog1">
            <template v-slot:activator="{ toggleDialog }">
              <button id="button1" @click="toggleDialog">Dialog</button>
            </template>
            <div>content</div>
          </g-dialog>
          <g-dialog v-model="dialog2">
            <template v-slot:activator="{ toggleDialog }">
              <button id="button2" @click="toggleDialog">Dialog</button>
            </template>
            <div>
              <button id="buttonNested" @click="dialog1 = true">Open Dialog 1</button>
            </div>
          </g-dialog>
        </div>`

      const vm = new Vue({
        template: template,
        components: { GDialog },
        data() {
          return {
            dialog1: false,
            dialog2: false
          }
        }
      }).$mount(createElement());

      const dialogAll = vm.$el.querySelectorAll('.dialog-wrapper');
      const dialog1 = dialogAll['1'];
      const dialog2 = dialogAll['0'];
      const button1 = vm.$el.querySelector('#button1');
      const button2 = vm.$el.querySelector('#button2');
      const buttonNested = vm.$el.querySelector('#buttonNested');

      button2.click();
      expect(vm.dialog2).toBe(true);
      vm.$nextTick(() => {
        buttonNested.click();
        expect(vm.dialog1).toBe(true);
        vm.$nextTick(() => {
          expect(vm.$el.outerHTML).toMatchSnapshot();

          // Dialog1 is the nested dialog, Dialog2 is the outer dialog
          expect(dialog1.style.zIndex > dialog2.style.zIndex).toBe(true);
        })
      })
    })
  })
})