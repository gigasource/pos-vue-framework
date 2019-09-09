import { storiesOf } from '@storybook/vue';
import GTextField from '../src/components/GInput/GTextField';

storiesOf('Textfield', module)
  .add('normal', () => ({
    components: {GTextField},
    data() {
      return {
        text: 'Test',
      }
    },
    template: '<g-text-field v-model="text"></g-text-field>'
  }))
  .add('with label', () => ({
    components: {GTextField},
    data() {
      return {
        label: 'Label',
        text: 'Test',
      }
    },
    template: '<g-text-field v-model="text" :label="label"></g-text-field>'
  }))
  .add('with append icon', () => ({
    components: {GTextField},
    data() {
      return {
        text: '',
      }
    },
    template: '<g-text-field v-model="text">' +
      '<template v-slot:append><img src="/config/filter.svg"></template>' +
      '</g-text-field>'
  }))
  .add('with placeholder', () => ({
    components: {GTextField},
    data() {
      return {
        text: '',
        placeholder: 'placeholder'
      }
    },
    template: '<g-text-field v-model="text" :placeholder="placeholder"></g-text-field>'
  }))
.add('with clearable', () => ({
  components: {GTextField},
  data() {
    return {
      text: '',
      placeholder: 'placeholder'
    }
  },
  template: '<g-text-field v-model="text" clearable></g-text-field>'
}));