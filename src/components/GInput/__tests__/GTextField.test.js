import plugin from '@vue/composition-api';
import GTextFieldFunctional from '../GTextFieldFunctional';
import { createLocalVue, mount } from '@vue/test-utils';

describe('GTextField', function () {
  const localVue = createLocalVue()
  localVue.use(plugin)

  it('should render test', function (done) {
    let wrapper = mount({
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
    }, { localVue });

    wrapper.vm.testValue = 'test'
    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toMatchSnapshot();
      done();
    })
  });
});
