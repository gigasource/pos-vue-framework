import { createElement } from '../../../tests/setup'

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

  it('should render test', async function (done) {
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

    vm.testValue = 'test';
    await vm.$nextTick();
    await vm.$nextTick();
    expect(vm.$el.outerHTML).toMatchSnapshot();
    done();
  });
});
