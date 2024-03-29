import {boolean, text, number, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GFileInput from '../GFileInput';
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

export const validateFileInput = () => ({
  components: {GFileInput, GIcon, GChip},
  data: () => ({
    rules: [
      value => !value || value.name.slice(-3) === 'txt' || 'File type should be txt!',
    ],
    test: '',
    rules2: [
      value => value.length === 0 || value.reduce((totalSize, file) => totalSize + file.size, 0) < 200000 || 'Total file size must be smaller than 200KB!',
    ],
    test2: [],
  }),
  props: {
    showSize: {default: boolean('show size', true)},
    counter: {default: boolean('counter', true)},
  },
  template: `<div>
               <g-file-input :rules="rules" v-model="test" :show-size="showSize" :counter="counter"/>
               <g-file-input :rules="rules2" v-model="test2" :show-size="showSize" :counter="counter" multiple />
             </div>`,
})

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
  data(props) {
    return {
      test: props.multiple ? [] : '',
    }
  },
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
                           
                           v-model="test"
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
  }),
  props: {
    multiple: {default: boolean('multiple', true)},
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
  template: `<div><g-file-input :multiple="multiple"
                           :accept="accept"
                           :show-size="showSize"
                           :counter="counter"
                           :chips="chips"
                           :smallChips="smallChips"
                           
                           
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
                             <template v-slot:selection="{text,index}">
                               <g-chip small  gradient="red, yellow, green, blue" label>{{text}}</g-chip>
                             </template>
                           </g-file-input>
                           <g-file-input :multiple="multiple"
                           :accept="accept"
                           :show-size="showSize"
                           :counter="counter"
                           :chips="chips"
                           :smallChips="smallChips"
                           
                           
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
                             <template v-slot:selection="{text,index}">
                               <g-chip v-if="index%2===0" small  gradient="red, yellow, green, blue" label>{{text}}</g-chip>
                               <p v-if="index%2===1">{{text}}</p>
                             </template>
                           </g-file-input>
                           <g-file-input :multiple="multiple"
                           :accept="accept"
                           :show-size="showSize"
                           :counter="counter"
                           :chips="chips"
                           :smallChips="smallChips"
                           
                           
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
                             <template v-slot:selection="{text,index,amount}">
                               <g-chip v-if="index<2" small  gradient="red, yellow, green, blue" label>{{text}}</g-chip>
                               <span v-else-if="index === 2">+ {{amount - 2}} files</span>
                             </template>
                           </g-file-input></div>`,
});