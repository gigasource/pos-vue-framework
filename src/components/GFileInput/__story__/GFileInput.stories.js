import {boolean, text, number, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GFileInput from '../GFileInputJSX';
import GIcon from '../../GIcon/GIcon';
import GChip from "../../GChip/GChip";

export default {
  title: 'GFileInput',
  decorators: [withKnobs],
}

export const basicFileInput = () => ({
  components: {GFileInput, GIcon, GChip},
  template: `<g-file-input></g-file-input>`,
});

export const mainFeatureFileInput = () => ({
  components: {GFileInput, GIcon, GChip},
  props: {
    multiple: {default: boolean('multiple', false)},
    accept: {default: text('accept', 'image/*')},
    showSize: {default: boolean('show size', false)},
    counter: {default: boolean('counter', false)},
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},
    truncateLength: {default: number('truncate length', 22)},
  },
  template: `<g-file-input :multiple="multiple"
                           :accept="accept"
                           :show-size="showSize"
                           :counter="counter"
                           :chips="chips"
                           :smallChips="smallChips"
                           :truncate-length="truncateLength"
                           />`,
});

export const fullFeatureFileInput = () => ({
  components: {GFileInput, GIcon, GChip},
  data: () => ({
    rules: [
      value => value.length === 0 || value.slice(-3) === 'txt' || 'File type should be txt!',
    ],
  }),
  props: {
    multiple: {default: boolean('multiple', false)},
    accept: {default: text('accept', '')},
    showSize: {default: boolean('show size', false)},
    counter: {default: boolean('counter', false)},
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},

    prependIcon: {default: text('prepend-outer', 'person')},
    prependInnerIcon: {default: text('prepend-inner', 'mdi-camera')},
    appendIcon: {default: text('append-inner', 'check')},
    appendOuterIcon: {default: text('append-outer', 'home')},

    label: {default: text('label', '')},
    placeholder: {default: text('placeholder', 'placeholder')},
    hint: {default: text('hint', '')},

    filled: {default: boolean('filled', false)},
    outlined: {default: boolean('outlined', false)},
    solo: {default: boolean('solo', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    flat: {default: boolean('flat', false)},
  },
  template: `<g-file-input :multiple="multiple"
                           :accept="accept"
                           :show-size="showSize"
                           :counter="counter"
                           :chips="chips"
                           :smallChips="smallChips"
                           
                           :rules="rules"
                           :prependIcon="prependIcon"
                           :prependInnerIcon="prependInnerIcon"
                           :appendIcon="appendIcon"
                           :appendOuterIcon="appendOuterIcon"
                           :label="label"
                           :placeholder="placeholder"   
                           :hint="hint"
                           
                           :filled="filled"
                           :outlined="outlined"
                           :solo="solo"
                           :rounded="rounded"
                           :shaped="shaped"
                           :flat="flat"
                           />`,
});


export const slotSelection = () => ({
  components: {GFileInput, GIcon, GChip},
  data: () => ({
    rules: [
      value => value.length === 0 || value.slice(-3) === 'txt' || 'File type should be txt',
    ],
    files: [],
  }),
  props: {
    multiple: {default: boolean('multiple', false)},
    accept: {default: text('accept', '')},
    showSize: {default: boolean('show size', false)},
    counter: {default: boolean('counter', false)},
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},

    prependIcon: {default: text('prepend-outer', 'person')},
    prependInnerIcon: {default: text('prepend-inner', 'mdi-camera')},
    appendIcon: {default: text('append-inner', 'check')},
    appendOuterIcon: {default: text('append-outer', 'home')},

    label: {default: text('label', '')},
    placeholder: {default: text('placeholder', 'placeholder')},
    hint: {default: text('hint', '')},

    filled: {default: boolean('filled', false)},
    outlined: {default: boolean('outlined', false)},
    solo: {default: boolean('solo', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    flat: {default: boolean('flat', false)},
  },
  template: `<g-file-input :multiple="multiple"
                           :accept="accept"
                           :show-size="showSize"
                           :counter="counter"
                           :chips="chips"
                           :smallChips="smallChips"
                           
                           :rules="rules"
                           :prependIcon="prependIcon"
                           :prependInnerIcon="prependInnerIcon"
                           :appendIcon="appendIcon"
                           :appendOuterIcon="appendOuterIcon"
                           :label="label"
                           :placeholder="placeholder"   
                           :hint="hint"
                           
                           :filled="filled"
                           :outlined="outlined"
                           :solo="solo"
                           :rounded="rounded"
                           :shaped="shaped"
                           :flat="flat"
                           >
                             <template v-slot:selection="{text}">
                               <g-chip small  gradient="red, yellow, green, blue" label>{{text}}</g-chip>
                             </template>
                           </g-file-input>`,
});