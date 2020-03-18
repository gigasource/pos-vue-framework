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
  template: `<g-text-field-bs :label="label"/>`
})

export const prependIcon = () => ({
  components: {GTextFieldBs},
  props: {
    prependIcon: { default: text('Prepend Icon', 'search')},
  },
  template: `<g-text-field-bs :prepend-icon="prependIcon"/>`
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
    prependIcon: { default: text('Prepend Icon', 'search')},
    color: { default: text('Border Color', '#1976D2')}
  },
  template: `<div>
      With prop rounded 
      <g-text-field-bs rounded :border-color="color" :placeholder="placeholder" :prepend-icon="prependIcon"/>
      OR with class 'bs-tf__rounded'
      <g-text-field-bs class="bs-tf__rounded" :border-color="color" :placeholder="placeholder" :prepend-icon="prependIcon"/>
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
