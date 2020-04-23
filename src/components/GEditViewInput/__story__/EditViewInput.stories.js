import { text, withKnobs } from '@storybook/addon-knobs';
import GEditViewInput from '../GEditViewInput';

export default {
  title: 'GEditViewInput',
  decorators: [withKnobs],
};

export const basic = () => ({
  components: {GEditViewInput},
  data() {
    return {
      text: 'Demo text'
    }
  },
  template: `<g-edit-view-input v-model="text"/>`
})


export const usingSlot = () => ({
  components: {GEditViewInput},
  data() {
    return {
      text: 'Demo text'
    }
  },
  template: `<g-edit-view-input v-model="text">
    <template v-slot:action="{mode, switchToEditMode, applyChange, resetValue}">
      <div class="row-flex">
        <button v-if="mode !== 'edit'" @click="switchToEditMode()">
          Edit
        </button>
        <button v-if="mode === 'edit'" @click="applyChange()">
          Save
        </button>
        <button v-if="mode === 'edit'" @click="resetValue()">
          Reset
        </button>
      </div>
    </template>
</g-edit-view-input>`
})
