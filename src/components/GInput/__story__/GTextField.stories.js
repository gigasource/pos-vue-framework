import {boolean, number, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'
import {mask} from 'vue-the-mask'


//
export default {
  title: 'GTextField',
  decorators: [withKnobs],
}
export const TextFieldPlayGroundFull = () => ({
  components: {GTextField, GIcon},
  data() {
    return {
      text1: '',
      rules: {

        required: value => !!value || 'Required',
        counter: value => value.length > 4 || 'Min 5 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      },
      mask: 'XXXX-XXXX',
    }
  },
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', true)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    dense: {default: boolean('dense', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', true)},
    clearable: {default: boolean('clearable', false)},
    hint: {default: text('hint', 'Hint')},
    persistent: {default: boolean('persistent', false)},
    counter: {type: [String, Number], default: number('counter', 25)},
    prefix: {default: text('prefix', '')},
    suffix: {default: text('suffix', '')},
    type: {default: text('type', 'text')},
    prependIcon: {default: text('prepend Icon', 'person')},
    appendIcon: {default: text('append Icon', 'check')},
    prependInnerIcon: {default: text('prepend Inner Icon', 'mdi-glasses')},
    appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
    error: {default: text('error', '')}
  },
  template: `<g-text-field :label="label"
                           :clearable="clearable"
                           :filled="filled"
                           :solo="solo"
                           :outlined="outlined"
                           :flat="flat"
                           :dense="dense"
                           :rounded="rounded"
                           :shaped="shaped"
                           :hint="hint"
                           :persistent="persistent"
                           :counter="counter"
                           :placeholder="placeholder"
                           :prefix="prefix"
                           :suffix="suffix"
                           :type="type"
                           :prepend-icon="prependIcon"
                           :append-icon="appendIcon"
                           :prepend-inner-icon="prependInnerIcon"
                           :append-inner-icon="appendInnerIcon"
                           :error="error"
                           v-model="text1">
                          <template v-slot:prepend-outer>
                          </template>
                          <template v-slot:append-inner>
                          <g-icon>{{appendInnerIcon}}</g-icon>
                          </template>
                          <template v-slot:append-outer>
                          asdas
                          </template>
              </g-text-field>`,
});
export const TextFieldPlayGroundLite = () => ({
  components: {GTextField, GIcon},
  data() {
    return {
      text1: '',
      rules: {

        required: value => !!value || 'Required',
        counter: value => value.length > 4 || 'Min 5 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      },
      mask: 'XXXX-XXXX',
    }
  },
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', true)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    dense: {default: boolean('dense', true)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    clearable: {default: boolean('clearable', false)},
    hint: {default: text('hint', 'Hint')},
    persistent: {default: boolean('persistent', false)},
    counter: {type: [String, Number], default: number('counter', 25)},
    prefix: {default: text('prefix', 'prefix')},
    suffix: {default: text('suffix', '')},
    type: {default: text('type', 'text')},
    prependIcon: {default: text('prepend Icon', '')},
    appendIcon: {default: text('append Icon', '')},
    prependInnerIcon: {default: text('prepend Inner Icon', 'mdi-glasses')},
    appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
  },
  template: `<g-text-field :label="label"
                           :clearable="clearable"
                           :filled="filled"
                           :solo="solo"
                           :outlined="outlined"
                           :flat="flat"
                           :dense="dense"
                           :rounded="rounded"
                           :shaped="shaped"
                           :hint="hint"
                           :persistent="persistent"
                           :counter="counter"
                           :placeholder="placeholder"
                           :prefix="prefix"
                           :suffix="suffix"
                           :type="type"
                           :prepend-icon="prependIcon"
                           :append-icon="appendIcon"
                           :prepend-inner-icon="prependInnerIcon"
                           :append-inner-icon="appendInnerIcon"
                           v-model="text1"
                           :rules="[rules.required, rules.counter]">
                          
                         
              </g-text-field>`,
});
export const TextFieldShapedAndRounded = () => ({
  components: {GTextField, GContainer, GRow, GCol},
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', false)},
  },
  template: `
<g-container>
<g-row>
<g-col><g-text-field :label="label" :placeholder="placeholder" outlined shaped :filled="filled" /></g-col>
<g-col><g-text-field :label="label" :placeholder="placeholder" outlined rounded :filled="filled" /></g-col>
</g-row>
</g-container>
`,
});


export const TextFieldDisableandReadonly = () => ({
  components: {GTextField, GContainer, GRow, GCol},
  template: `
          <g-container>
            <g-row>
               <g-col>Regular Disabled <g-text-field  label="label" placeholder="placeholder" disabled /></g-col>
              <g-col>Regular Read only <g-text-field  label="label" placeholder="placeholder" readOnly /></g-col>
            </g-row>
            <g-row>
              <g-col>Solo Disabled <g-text-field solo label="label" placeholder="placeholder" disabled /></g-col>
              <g-col>Solo Read only <g-text-field solo label="label" placeholder="placeholder" readOnly /></g-col>
            </g-row>
            <g-row>
              <g-col>Filled Disabled <g-text-field filled label="label" placeholder="placeholder" disabled /></g-col>
              <g-col>Filled Read only <g-text-field filled label="label" placeholder="placeholder" readOnly /></g-col>
            </g-row>
            <g-row>
              <g-col>Outlined Disabled <g-text-field outlined  label="label" placeholder="placeholder" disabled /></g-col>
              <g-col>Outlined Read only <g-text-field outlined label="label" placeholder="placeholder" readOnly /></g-col>
            </g-row>
          </g-container>
`,
});
export const TextFieldDense = () => ({
  components: {GTextField, GIcon, GContainer, GCol, GRow},
  setup() {
    return () => (
      <g-container>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            <g-text-field label="Normal" placeholder="placeholder"/>
          </g-col>
          <g-col>
            <g-text-field label="Dense" placeholder="placeholder" dense/>
          </g-col>
        </g-row>
        <g-row>
          <g-col>
            <g-text-field label="Normal" placeholder="placeholder" filled/>
          </g-col>
          <g-col>
            <g-text-field label="Dense" placeholder="placeholder" dense filled/>
          </g-col>
        </g-row>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            <g-text-field label="Normal" placeholder="placeholder" solo/>
          </g-col>
          <g-col>
            <g-text-field label="Dense" placeholder="placeholder" dense solo/>
          </g-col>
        </g-row>
        <g-row>
          <g-col>
            <g-text-field label="Normal" outlined/>
          </g-col>
          <g-col>
            <g-text-field label="Dense" placeholder="placeholder" dense outlined/>
          </g-col>
        </g-row>
      </g-container>

    )
  },
});
export const TextFieldIcon = () => ({
  components: {GTextField, GIcon, GContainer, GCol, GRow},
  setup() {
    return () => (
      <g-container>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            <g-text-field label="prepend outer" prependIcon="person"/>
          </g-col>
          <g-col>
            <g-text-field label="prepend outer" solo prependIcon="person"/>
          </g-col>
        </g-row>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            <g-text-field label="prepend inner" prependInnerIcon="person"/>
          </g-col>
          <g-col>
            <g-text-field label="prepend inner" solo prependInnerIcon="person"/>
          </g-col>
        </g-row>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            <g-text-field label="append outer" appendIcon="person"/>
          </g-col>
          <g-col>
            <g-text-field label="append outer" solo appendIcon="person"/>
          </g-col>
        </g-row>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            <g-text-field label="append inner" appendInnerIcon="person"/>
          </g-col>
          <g-col>
            <g-text-field label="append inner" solo appendInnerIcon="person"/>
          </g-col>
        </g-row>
      </g-container>

    )
  },
});
export const TextFieldClearable = () => ({
  components: {GTextField, GIcon, GContainer, GCol, GRow},
  setup() {
    return () => (
      <g-container>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            <g-text-field label="Clearable" clearable value="Blahblah"/>
          </g-col>
          <g-col>
            <g-text-field solo label="Clearable" clearable value="Blahblah"/>
          </g-col>
        </g-row>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            <g-text-field filled label="Clearable" clearable value="Blahblah"/>
          </g-col>
          <g-col>
            <g-text-field outlined label="Clearable" clearable value="Blahblah"/>
          </g-col>
        </g-row>

      </g-container>

    )
  },
});
//todo:solo, filled, outlined
export const TextFieldStyles = () => ({
  components: {GTextField, GIcon, GContainer, GCol, GRow},
  setup() {
    return () => (
      <g-container>
        <g-row
          class="bg-grey-lighten-5">
          <g-col>
            Regular
            <g-text-field type="week" label="Regular"/>
          </g-col>
          <g-col>
            Solo
            <g-text-field label="Solo" solo value="Blahblah"/>
          </g-col>
        </g-row>
        <g-row>
          <g-col>
            Filled
            <g-text-field label="Filled" filled value="Blahblah"/>
          </g-col>
          <g-col>
            Outlined
            <g-text-field label="Outlined" outlined value="Blahblah"/>
          </g-col>
        </g-row>


      </g-container>
    )
  },
});
//todo: counter
export const TextFieldCounter = () => ({
  components: {GTextField, GIcon},
  data() {
    return {
      text1: '',
      rules: {
        required: value => !!value || 'Required',
        counter: value => value.length > 4 || 'Min 5 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      },
    }
  },
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', false)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    clearable: {default: boolean('clearable', false)},
  },
  template: `<g-text-field :label="label"
                           :clearable="clearable"
                           :filled="filled"
                           :solo="solo"
                           :outlined="outlined"
                           :flat="flat"
                           :rounded="rounded"
                           :shaped="shaped"
                           counter="5"
                           v-model="text1"
                           :rules="[rules.required, rules.counter]">
              </g-text-field>`,
});
//todo:password
export const TextFieldPasswordType = () => ({
  components: {GTextField, GIcon, GContainer, GCol, GRow},
  setup() {
    return () => (
      <g-container>
        <g-text-field type='password' label='Password'/>
      </g-container>
    )
  },
});
//todo:mask
export const TextFieldUsingMask = () => ({
  components: {GTextField, GContainer},
  directives: {mask},
  data() {
    return {
      text2: '',
      mask: 'XXXX-XXXX',
    }
  },
  template:
    `<g-container>
        mask: 'XXXX-XXXX',
        <g-text-field label="Mask" v-model="text2" v-mask="mask" />
      </g-container>`


});
//todo: hint
export const TextFieldHint = () => ({
  components: {GTextField, GIcon},
  props: {
    hint: {default: text('hint', 'Why so serious')},
    persistent: {default: boolean('persistent', false)},
  },
  template: `<g-text-field label="Hint"
                           :hint="hint"
                           :persistent="persistent">
              </g-text-field>`,
});
export const TextFieldCustomHint = () => ({
  components: {GTextField, GContainer, GRow, GCol, GIcon},
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', false)},
  },
  template: `
<g-container>
<g-text-field :label="label" :placeholder="placeholder" outlined shaped :filled="filled" >
<template v-slot:hint>
<g-icon small>mdi-ninja</g-icon>
<p style="padding-left: 2px">Ninja appears when input focused</p>
</template>
</g-text-field>

</g-container>
`,
});
export const TextFieldRequired = () => ({
  components: {GTextField, GIcon},
  data() {
    return {
      text: ''
    }
  },
  props: {
    hint: {default: text('hint', 'Input is required!')},
    persistent: {default: boolean('persistent', false)},
    required: {default: boolean('required', true)},
  },
  template: `<g-text-field label="Label"
:required="required"
                           v-model="text"
                           :hint="hint"
                           :persistent="persistent">
              </g-text-field>`,
});
//todo: prefix, suffix

export const TextFieldPrefixAndSuffix = () => ({
  components: {GTextField, GIcon},
  props: {
    label: {default: text('label', 'Label')},
    filled: {default: boolean('filled', true)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    prefix: {default: text('prefix', '$')},
    suffix: {default: text('suffix', ':)')},
  },
  template: `<g-text-field :label="label"
                           :filled="filled"
                           :solo="solo"
                           :outlined="outlined"
                           :flat="flat"
                           :rounded="rounded"
                           :shaped="shaped"
                           :prefix="prefix"
                           :suffix="suffix"
                           appendIcon="check"
                           >
              </g-text-field>`,
});
//todo: icon event, icon slot
export const TextFieldIconEvent = () => ({
  components: {GTextField},
  props: {},
  data: () => ({
    message: "Click icon to fire icon's events",
    marker: true,
    iconIndex: 0,
    icons: [
      'mdi-emoticon',
      'mdi-emoticon-cool',
      'mdi-emoticon-dead',
      'mdi-emoticon-excited',
      'mdi-emoticon-happy',
      'mdi-emoticon-neutral',
      'mdi-emoticon-sad',
      'mdi-emoticon-tongue',
    ],
  }),

  computed: {
    icon() {
      return this.icons[this.iconIndex]
    },
  },

  methods: {
    toggleMarker() {
      this.marker = !this.marker
    },
    sendMessage() {
      this.resetIcon()
      this.clearMessage()
    },
    clearMessage() {
      this.message = ''
    },
    resetIcon() {
      this.iconIndex = 0
    },
    changeIcon() {
      console.log('icon changed')
      this.iconIndex === this.icons.length - 1
        ? this.iconIndex = 0
        : this.iconIndex++
    },
  },
  template: `
<g-text-field  v-model="message"
            :append-inner-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
            :append-icon="message ? 'mdi-send' : 'mdi-microphone'"
            :prepend-icon="icon"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="Message"
            type="text"
            @click:append="toggleMarker"
            @click:append-outer="sendMessage"
            @click:prepend-outer="changeIcon"
            @click:clear="clearMessage">
              </g-text-field>`,
});
//todo: label slot
export const TextFieldLabelSlot = () => ({
  components: {GTextField, GContainer, GIcon},
  template: `
              <g-container>
                <g-text-field >
                 <template v-slot:label>
                 Label
                 <g-icon>check</g-icon>
                </template>
                </g-text-field>
              </g-container>
`,
});

export const TextFieldAppendSlot = () => ({
  components: {GTextField, GContainer, GIcon},
  template: `
              <g-container>
                <g-text-field >
                 <template v-slot:append-outer>
                 <div class="g-tf-append__outer">
                 <g-icon>check</g-icon>
                 </div>
                </template>
                </g-text-field>
              </g-container>
`,
});
export const TextFieldTypes = () => ({
  components: {GTextField, GContainer, GIcon},
  props: {
    type: {default: text('type', 'text')},
  }
  ,
  template: `
              <g-container>
                <g-text-field label="Label" :type="type" >
                </g-text-field>
                <div>{{type}}</div>
              </g-container>
`,
});
//todo: validate
export const TextFieldValidate = () => ({
  components: {GTextField, GIcon},
  data() {
    return {
      text1: '',
      rules: {
        required: value => !!value || 'Required',
        counter: value => value.length > 4 || 'Min 5 characters',
        max: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      },
    }
  },
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', false)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    clearable: {default: boolean('clearable', false)},
  },
  template: `<g-text-field :label="label"
                            prependInnerIcon="person"
                           :clearable="clearable"
                           :filled="filled"
                           :solo="solo"
                           :outlined="outlined"
                           :flat="flat"
                           :rounded="rounded"
                           :shaped="shaped"
                           counter="5"
                           v-model="text1"
                           :rules="[rules.required, rules.counter, rules.max]">
              </g-text-field>`,
});

export const AllInputTypes = () => ({
  components: {GTextField, GRow, GCol},
  data() {
    return {}
  },
  props: {},
  template:
    `<template>
        <g-row>
          <g-col xs3>
            <g-text-field type="date" label="date"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="datetime-local" label="datetime-local"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="email" label="email"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="month" label="month"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="number" label="number"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="password" label="password"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="range" label="range"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="search" label="search"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="tel" label="tel"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="text" label="text"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="time" label="time"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="url" label="url"></g-text-field>
          </g-col>
          <g-col xs3>
            <g-text-field type="week" label="week"></g-text-field>
          </g-col>
        </g-row>
      </template>`
});

export const textFieldBorderHover = () => ({
  components: {GTextField, GIcon},
  props: {
    dense: { default: boolean('Dense', true)}
  },
  data() {
    return {
      value: '100px',
      value2: '',
      value3: '90deg'
    }
  },
  template: `<div> Hover the inputs to show their border
      <p>Having prefix</p>
      <g-text-field prefix="W" :dense="dense" class="g-tf__border-hover" v-model="value"/>
      <p>Having prepend icon</p>
      <g-text-field prependInnerIcon="edit" :dense="dense" class="g-tf__border-hover" v-model="value"/>
      <p>Having label</p>
      <g-text-field label="Width" :dense="dense" class="g-tf__border-hover" v-model="value2" />
      <p>Disabled</p>
      <g-text-field :dense="dense" class="g-tf__border-hover" disabled/>
      <g-text-field dense class="g-tf__border-hover" v-model="value3" prependInnerIcon="icon-pns-rotation@16"/>
</div>`
})

// testing
import Vue from 'vue/dist/vue.common.js'
import GTextField from '../GTextField';
import GIcon from '../../GIcon/GIcon';
import GContainer from '../../GLayout/GContainer';
import GCol from '../../GLayout/GCol';
import GRow from '../../GLayout/GRow';
import GTextFieldBs from '../GTextFieldBs';
import GList from '../../GList/GList';
import { DefaultChip } from '../../GChip/__story__/GChip.stories';
export const TextField = (props, text1) => ({
  components: {GTextField, GIcon},
  data() {
    return {
      text1: text1,
      rules: {

        required: value => !!value || 'Required',
        counter: value => value.length > 4 || 'Min 5 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      },
      mask: 'XXXX-XXXX',
    }
  },
  props: props,
  template: `<g-text-field :label="label"
                           :clearable="clearable"
                           :filled="filled"
                           :solo="solo"
                           :outlined="outlined"
                           :flat="flat"
                           :dense="dense"
                           :rounded="rounded"
                           :shaped="shaped"
                           :hint="hint"
                           :persistent="persistent"
                           :counter="counter"
                           :placeholder="placeholder"
                           :prefix="prefix"
                           :suffix="suffix"
                           :type="type"
                           :prepend-icon="prependIcon"
                           :append-icon="appendIcon"
                           :prepend-inner-icon="prependInnerIcon"
                           :append-inner-icon="appendInnerIcon"
                           v-model="text1"
                           :rules="[rules.required, rules.counter]">
              </g-text-field>`,
});
describe('render lite input test:', function () {
  it('should render full textfield', function () {
    const props = {
      label: {default: text('Input label', 'Label')},
      placeholder: {default: text('Input placeholder', '')},
      filled: {default: boolean('filled', false)},
      solo: {default: boolean('solo', false)},
      outlined: {default: boolean('outlined', false)},
      flat: {default: boolean('flat', false)},
      dense: {default: boolean('dense', false)},
      rounded: {default: boolean('rounded', false)},
      shaped: {default: boolean('shaped', false)},
      clearable: {default: boolean('clearable', false)},
      hint: {default: text('hint', 'Hint')},
      persistent: {default: boolean('persistent', false)},
      counter: {type: [String, Number], default: number('counter', 25)},
      prefix: {default: text('prefix', '')},
      suffix: {default: text('suffix', '')},
      type: {default: text('type', 'text')},
      prependIcon: {default: text('prepend Icon', 'person')},
      appendIcon: {default: text('append Icon', 'mdi-bike')},
      prependInnerIcon: {default: text('prepend Inner Icon', 'mdi-glasses')},
      appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
    }
    const vm = new Vue(TextField(props, '')).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
  it('should render lite textfield with wrapper', function () {
    const props = {
      label: {default: text('Input label', 'Label')},
      placeholder: {default: text('Input placeholder', '')},
      filled: {default: boolean('filled', false)},
      solo: {default: boolean('solo', false)},
      outlined: {default: boolean('outlined', false)},
      flat: {default: boolean('flat', false)},
      dense: {default: boolean('dense', false)},
      rounded: {default: boolean('rounded', false)},
      shaped: {default: boolean('shaped', false)},
      clearable: {default: boolean('clearable', false)},
      hint: {default: text('hint', 'Hint')},
      persistent: {default: boolean('persistent', false)},
      counter: {type: [String, Number], default: number('counter', 25)},
      prefix: {default: text('prefix', '')},
      suffix: {default: text('suffix', '')},
      type: {default: text('type', 'text')},
      prependInnerIcon: {default: text('prepend Inner Icon', 'mdi-glasses')},
      appendIcon: {default: text('append Inner Icon', 'mdi-ninja')},
    }
    const vm = new Vue(TextField(props, '')).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });

  it('should render full textfield', function () {
    const vm = new Vue(TextFieldShapedAndRounded()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
  it('should render lite textfield without wrapper and validate wrong value', function () {
    const props = {
      label: {default: 'Label'},
      counter: {default: 10},
      placeholder: {default: 'Input placeholder'},
      hint: {default: text('hint', 'Hint')},
      prependInnerIcon: {default: text('prepend Inner Icon', '')},
      appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
    }
    const vm = new Vue(TextField(props, '1')).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
  it('should render lite textfield and not render label', function () {
    const props = {
      label: {default: 'Label'},
      solo: {default: true},
      counter: {default: 10},
      placeholder: {default: 'Input placeholder'},
      hint: {default: text('hint', 'Hint')},
      prependInnerIcon: {default: text('prepend Inner Icon', 'mdi-glasses')},
      appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
    }
    const vm = new Vue(TextField(props, '1')).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });

  it('should render full textfield outer slot', function () {
    const vm = new Vue({
      components: {GTextField, GIcon},
      props: {
        appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
      },
      template: `<g-text-field>
                          <template v-slot:prepend-outer>
                          </template>
                          <template v-slot:append-inner>
                          <g-icon>{{appendInnerIcon}}</g-icon>
                          </template>
                          <template v-slot:append-outer>
                          </template>
              </g-text-field>`,
    }).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
  it('should render lite textfield without wrapper inner slot', function () {
    const vm = new Vue({
      components: {GTextField, GIcon},
      props: {
        appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
      },
      template: `<g-text-field>
                          <template v-slot:append-inner>
                          <g-icon>{{appendInnerIcon}}</g-icon>
                          </template>
              </g-text-field>`,
    }).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
  it('should render lite textfield with wrapper append outer slot', function () {
    const vm = new Vue({
      components: {GTextField, GIcon},
      props: {
        appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
      },
      template: `<g-text-field>
                          <template v-slot:append-outer>
                          <g-icon>{{appendInnerIcon}}</g-icon>
                          </template>
              </g-text-field>`,
    }).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });

})
