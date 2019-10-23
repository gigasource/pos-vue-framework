import { createElement, setInputValue } from '../../../tests/setup'

const Vue = require('vue/dist/vue.common.js')
import plugin from '@vue/composition-api'

Vue.use(plugin)

// Import your components after all of above import
import GTextFieldFunctional from '../GTextFieldFunctional';


describe('GTextField', function () {
  afterEach(() => {
    // clear document body after each test to prevent content slots from
    // mounting on the first div with [data-app] attr
    document.body.innerHTML = ''
  })

  it('validate test', async function (done) {
    let vm = new Vue({
      template: `<g-text-field-functional label="Has prefix"
                               filled
                               clearable
                               counter="25"
                               prefix="prefix"
                               persistent
                               v-model="testValue"
                               hint="This is persistent hint"
                               :rules="[rules.required, rules.counter]"
                              
      >
        <template v-slot:prepend-inner >
          <img src="../../../assets/delivery/avatar.svg" alt="avatar">
        </template>
        <template v-slot:prepend-outer >
          <img src="../../../assets/delivery/avatar.svg" alt="avatar">
        </template>
        <template v-slot:append-inner >
          <img src="../../../assets/delivery/avatar.svg" alt="avatar">
        </template>
        <template v-slot:append-outer >
          <img src="../../../assets/delivery/avatar.svg" alt="avatar">
        </template>
      </g-text-field-functional>`,
      components: { GTextFieldFunctional },
      data: () => {
        return {
          testValue: null,
          rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length > 4 || 'Min 5 characters',
            email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.'
            }
          }
        }
      }
    }).$mount();

    //vm.testValue = 'test';

    setInputValue(vm.$el.querySelector('input'), 'test');
    await vm.$nextTick() && await vm.$nextTick();

    expect(vm.$el.outerHTML).toMatchSnapshot();
    done();
  })
  it('should render wrapper', function () {
    let vm = new Vue({
      template:`<g-text-field-functional filled></g-text-field-functional>`,
      components:{ GTextFieldFunctional}
    }).$mount() ;
    expect(vm.$el.getElementsByClassName('tf__filled')).toBeTruthy()
  })
  it('should render hint, activate, deactivate hint', function () {
    let vm = new Vue({
      template:`<g-text-field-functional hint="Test hint"></g-text-field-functional>`,
      components:{ GTextFieldFunctional}
    }).$mount() ;
    const input = vm.$el.querySelector('input');
    expect(vm.$el.querySelector('.tf-hint')).toBeTruthy()
    input.click();
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.tf-hint__active')).toBeTruthy();
      input.blur();
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.tf-hint__active')).toBeFalsy()
      })
    });



  });
  ;
  it('should render label, transform label when input focused', function () {
    let vm = new Vue({
      template:`<g-text-field-functional label="Test label"></g-text-field-functional>`,
      components:{ GTextFieldFunctional}
    }).$mount() ;
    const input = vm.$el.querySelector('input');
    expect(input.getAttribute('label')).toBe('Test label');
    const label = vm.$el.querySelector('.tf-label');
    expect(label).toBeTruthy();
    input.click();
    vm.$nextTick(() => {
      expect(label.style).toContain('transform');
      input.blur();
      vm.$nextTick(() =>{
        expect(label.style).not.toContain('transform');
      })
    })
  });
  it('should render prefix, transform label align to prefix', function () {
    let vm = new Vue({
      template:`<g-text-field-functional label="Test label" prefix="Prefix"></g-text-field-functional>`,
      components:{ GTextFieldFunctional}
    }).$mount();
    const prefix = vm.$el.querySelector('.tf-affix');
    expect(prefix).toBeTruthy();
    expect(prefix.innerHTML).toBe('Prefix');
    expect(vm.$el.outerHTML).toMatchSnapshot();
    const label = vm.$el.querySelector('label');
    label.click();
    vm.$nextTick(() =>{
      expect(vm.$el.querySelector('.tf-hint__active')).toBeTruthy()
    })

  });
  ;
});
