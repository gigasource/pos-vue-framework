import {boolean, number, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'
import {mask} from 'vue-the-mask'


//
export default {
  title: 'GTextField',
  decorators: [withKnobs],
}

export const TextFieldPlayGround = () => ({
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
                          <template v-slot:prependOuter>
                          </template>
                          <template v-slot:appendInner>
                          <g-icon>{{appendInnerIcon}}</g-icon>
                          </template>
                          <template v-slot:appendOuter>
                          </template>
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
    filled: {default: boolean('filled', false)},
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
                           :suffix="suffix">
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
            @click:appendOuter="sendMessage"
            @click:prependOuter="changeIcon"
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
                 <template v-slot:appendOuter>
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
                            prependIcon="person"
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
export const TextFieldBoostrap = () => ({
  components: {GTextFieldBs},
  directives: {mask},
  props: {
    required: {default: boolean('required', false)},
    clearable: {default: boolean('clearable', true)}
  },
  data() {
    return {
      rules: {
        max: value => value.length < 3 || 'Exceeded'
      },
    }
  },
  template:
    `<g-text-field-bs label="test"
								 placeholder="demo placeholder"
								 hint="test hint"
								 :required="required"
								 :clearable="clearable"
								 :rules="[rules.max]">
      <template #prependContent>
        Prepend
      </template>
      <template v-slot:prepend="{onClick}">
        <div class="bs-tf-input-prepend" @click="onClick">
          <span class="bs-tf-input-text">
            Prepend 2
          </span>
        </div>
      </template>
    
      <template #appendContent>
        Append
      </template>
      <template v-slot:append="{onClick}">
        <div class="bs-tf-input-prepend" @click="onClick">
          <span class="bs-tf-input-text">
            Append 2
          </span>
        </div>
      </template>
    </g-text-field-bs>`


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
// testing
import Vue from 'vue/dist/vue.common.js'
import GTextField from '../GTextField';
import GIcon from '../../GIcon/GIcon';
import GContainer from '../../GLayout/GContainer';
import GCol from '../../GLayout/GCol';
import GRow from '../../GLayout/GRow';
import GTextFieldBs from '../GTextFieldBs';

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
