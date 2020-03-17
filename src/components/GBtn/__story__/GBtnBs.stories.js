import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GBtnBs from '../GBtnBs';

export default {
  title: 'GButtonNew',
  decorators: [withKnobs],
};


export const someUseCases = () => ({
  components: {GBtnBs},
  props: {
    text: { default: text('Text', 'Clear')},
    textColor: { default: text('Text Color', 'red')},
    icon: { default: text('Icon', 'delete')},
    backgroundColor: { default: text('Background Color', 'primary')},
    borderColor: {default: text('Border Color', 'primary')},
    elevation: {default: number('Elevation', 2, {min: 0, max: 24})},
    gridArea: {default: text('Grid Area', '2/2/3/3')}
  },
  template: `<div style="padding: 8px">
      <p>Button only text:</p>
      <g-btn-bs>{{text}}</g-btn-bs>
      <p>Button only text with text color:</p>
      <g-btn-bs :text-color="textColor">{{text}}</g-btn-bs>
      <p>Button text + icon:</p>
      <g-btn-bs :icon="icon">{{text}}</g-btn-bs>
      <p>Button text + icon with text color:</p>
      <g-btn-bs :text-color="textColor" :icon="icon">{{text}}</g-btn-bs>
      <p>Button text with background:</p>
      <g-btn-bs :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button text + icon with background color:</p>
      <g-btn-bs :icon="icon" :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button text + icon with background & text color:</p>
      <g-btn-bs :icon="icon" :background-color="backgroundColor" :text-color="textColor">{{text}}</g-btn-bs>
      <p>Button outlined:</p>
      <g-btn-bs :border-color="borderColor">{{text}}</g-btn-bs>
      <p>Button outlined with icon:</p>
      <g-btn-bs :icon="icon" :border-color="borderColor">{{text}}</g-btn-bs>
      <p>Button dashed outlined with icon:</p>
      <g-btn-bs dashed :icon="icon" :border-color="borderColor">{{text}}</g-btn-bs>
      <p>Button with elevation (box-shadow): </p>
      <g-btn-bs :elevation="elevation">{{text}}</g-btn-bs>
      <p>Button with rounded corner:</p>
      <g-btn-bs rounded :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button with uppercase:</p>
      <g-btn-bs uppercase :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button vertical direction:</p>
      <g-btn-bs vertical :icon="icon" :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button block (fill width container)</p>
      <g-btn-bs block :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button disabled</p>
      <g-btn-bs disabled :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button small</p>
      <g-btn-bs small :icon="icon" :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button normal</p>
      <g-btn-bs :icon="icon" :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button large</p>
      <g-btn-bs large :icon="icon" :background-color="backgroundColor">{{text}}</g-btn-bs>
      <p>Button with gradient</p>
      <g-btn-bs text-color="white" gradient="#0D48A2 18.59%, #1988D0 94.54%" gradient-angle="90deg">+ Add new</g-btn-bs>
      <p>Button in grid</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; border: 1px solid black;">
        <g-btn-bs :grid-area="gridArea" :background-color="backgroundColor">Button</g-btn-bs>
      </div>
</div>
`
})

export const playground = () => ({
  components: {GBtnBs},
  props: {
    text: { default: text('Text', 'Clear')},
    icon: { default: text('Icon', 'delete')},
    iconAfter: { default: text('Icon After', '')},
    iconSize: { default: text('Icon Size', '')},
    textColor: { default: text('Text Color', 'red')},
    backgroundColor: { default: text('Background Color', 'primary')},
    borderColor: {default: text('Border Color', '')},
    dashed: {default: boolean('Dashed', false)},
    elevation: {default: number('Elevation', 0, {min: 0, max: 24})},
    large: {default: boolean('Large', false)},
    small: {default: boolean('Small', false)},
    dense: {default: boolean('Dense', false)},
    disabled: {default: boolean('Disabled', false)},
    readonly: {default: boolean('Readonly', false)},
    vertical: {default: boolean('Vertical', false)},
    nowrap: {default: boolean('No wrap text', false)},
    uppercase: {default: boolean('Uppercase text', false)},
    block: {default: boolean('Fill width', false)},
    rounded: {default: boolean('Rounded', false)},
    borderRadius: {default: text('Border radius', '')},
    gradient: {default: text('Gradient', '')},
    gradientAngle: {default: text('Gradient Angle', '45deg')}
  },
  template: `<g-btn-bs :icon="icon" :icon-after="iconAfter" :icon-size="iconSize"
                       :text-color="textColor" :background-color="backgroundColor" :border-color="borderColor" :dashed="dashed"
                       :small="small" :large="large" :dense="dense"
                       :elevation="elevation" :disabled="disabled" :readonly="readonly"
                       :vertical="vertical" :block="block"
                       :nowrap="nowrap" :uppercase="uppercase"
                       :border-radius="borderRadius" :rounded="rounded"
                       >
                      {{text}}
            </g-btn-bs>`
})
