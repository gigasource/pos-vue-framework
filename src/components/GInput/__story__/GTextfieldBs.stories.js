import {boolean, number, text, withKnobs} from '@storybook/addon-knobs';
import GTextFieldBs from "../GTextFieldBs";

export default {
  title: 'GTextfieldBS',
  decorators: [withKnobs],
}

export const basic = () => ({
  components: {GTextFieldBs},
  props: {
    label: { default: text('Label', 'Email')},
  },
  // template: `<g-text-field-bs :label="label"/>`
  template: `<div>
    Basic:
    <g-text-field-bs :label="label"/>
    With prepend text:
    <g-text-field-bs prefix="Email"/>
    With prepend icon:
    <g-text-field-bs prepend-icon="email"/>
    With prepend inner icon:
    <g-text-field-bs prepend-inner-icon="email"/>
    With append text:
    <g-text-field-bs :label="label" suffix="@gmail.com"/>
    With append icon:
    <g-text-field-bs :label="label" append-icon="edit"/>
    With append inner icon:
    <g-text-field-bs :label="label" append-inner-icon="edit"/>
    With label icon:
    <g-text-field-bs :label="label" label-icon="email"/>
</div>`
})

export const playground = () => ({
  components: {GTextFieldBs},
  props: {
    label: { default: text('Label', 'Label')},
    labelIcon: { default: text('Label Icon', '')},
    iconSize: { default: number('Label Icon Size', 16)},
    required: { default: boolean('Required', false)},
    placeholder: { default: text('Placeholder', '')},
    prefix: { default: text('Prefix', '')},
    prependIcon: { default: text('Prepend Icon', '')},
    prependInnerIcon: { default: text('Prepend inner Icon', '')},
    suffix: { default: text('Suffix', '')},
    appendIcon: { default: text('Append Icon', '')},
    appendInnerIcon: { default: text('Append inner Icon', '')},
    disabled: { default: boolean('Disabled', false)},
    readonly: { default: boolean('Readonly', false)},
    clearable: { default: boolean('Clearable', false)},
    small: { default: boolean('Small', false)},
    large: { default: boolean('Large', false)},
    borderColor: { default: text('Border Color', '')},
    hint: { default: text('Hint', '')}
  },
  template: `<g-text-field-bs :label="label" :label-icon="labelIcon" :icon-size="iconSize" 
                 :required="required" :placeholder="placeholder"
                 :prefix="prefix" :prepend-icon="prependIcon" :prepend-inner-icon="prependInnerIcon"
                 :suffix="suffix" :append-icon="appendIcon" :append-inner-icon="appendInnerIcon"
                 :disabled="disabled" :readonly="readonly" :clearable="clearable"
                 :small="small" :large="large" :border-color="borderColor" :hint="hint"/>`
})

export const solo = () => ({
  components: {GTextFieldBs},
  props: {
    label: { default: text('Label', 'Email')},
    rounded: { default: boolean('Rounded', false)}
  },
  template: `<div>
    With prop solo
    <g-text-field-bs solo :rounded="rounded" :label="label"/>
    OR with class 'bs-tf__solo'
    <g-text-field-bs class="bs-tf__solo" :rounded="rounded" :label="label"/>
</div>`
})

export const roundedAndColor = () => ({
  components: {GTextFieldBs},
  props: {
    placeholder: { default: text('Placeholder', 'Search...')},
    prependIcon: { default: text('Prepend Inner Icon', 'search')},
    color: { default: text('Border Color', '#1976D2')}
  },
  template: `<div>
      With prop rounded 
      <g-text-field-bs rounded :border-color="color" :placeholder="placeholder" :prepend-inner-icon="prependIcon"/>
      OR with class 'bs-tf__rounded'
      <g-text-field-bs class="bs-tf__rounded" :border-color="color" :placeholder="placeholder" :prepend-inner-icon="prependIcon"/>
</div>`
})

export const filled = () => ({
  components: {GTextFieldBs},
  template: `<div>
        With prop filled
        <div>
              <g-text-field-bs filled label="Email" label-icon="email" placeholder="Eg: youremail@gmail.com"/>
              <g-text-field-bs filled label="Password" label-icon="lock" placeholder="Enter password" type="password"/>
        </div>
        OR with class 'bs-tf__filled'
        <div>
              <g-text-field-bs class="bs-tf__filled" label="Email" label-icon="email" placeholder="Eg: youremail@gmail.com"/>
              <g-text-field-bs class="bs-tf__filled" label="Password" label-icon="lock" placeholder="Enter password" type="password"/>
        </div>
</div>`
})


export const filledBlur = () => ({
  components: {GTextFieldBs},
  template: ` <div style="padding: 24px;color: white; background: linear-gradient(180.04deg, #0D48A2 17.31%, #198AD1 99.98%), #4873FF;">
                <p>Filled blur option only work when inside an container with specific background (not white)</p>
                <p>With prop filled-blur</p>
                <div>
                  <g-text-field-bs filled-blur label="Email" label-icon="email" placeholder="Eg: youremail@gmail.com"/>
                  <g-text-field-bs filled-blur label="Password" label-icon="lock" placeholder="Enter password" type="password"/>
                </div>
                <p>OR with class 'bs-tf__filled--blur'</p>
                <div>
                  <g-text-field-bs class="bs-tf__filled--blur" label="Email" label-icon="email" placeholder="Eg: youremail@gmail.com"/>
                  <g-text-field-bs class="bs-tf__filled--blur" label="Password" label-icon="lock" placeholder="Enter password" type="password"/>
                </div>
              </div>`

})

export const pos = () => ({
  components: {GTextFieldBs},
  props: {
    label: { default: text('Label', 'Name')},
  },
  template: `<div>
      With class 'bs-tf__pos'
      <g-text-field-bs class="bs-tf__pos" :label="label"/>
</div>`
})


export const differentSize = () => ({
  components: {GTextFieldBs},
  template: `<div>
    <g-text-field-bs label="Small" small/>
    <g-text-field-bs label="Normal"/>
    <g-text-field-bs label="Large" large/>
</div>`
})

export const borderHover = () => ({
  components: {GTextFieldBs},
  props: {
    label: { default: text('Label', 'Label')},
    disabled: { default: boolean('Disabled', false)}
  },
  template: `<div>
      With class 'bs-tf__border-hover'. Hover input below to show it border
      <g-text-field-bs class="bs-tf__border-hover" :label="label" :disabled="disabled"/>
</div>`
})
