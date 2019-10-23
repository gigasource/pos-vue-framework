import { text, withKnobs, boolean, select } from '@storybook/addon-knobs';
import GLayout from '../GLayout';
import GContainer from '../GContainer';
import GSpacer from '../GSpacer';
import GCard from '../../GCard/GCard';


export default {
  title: 'Layout',
  decorators: [withKnobs]
}


export const basic = () => ({
  components: { GLayout, GContainer },
  props: {
    horizontal: {
      type: Boolean,
      default: boolean('Horizontal', false)
    },
    noGutters: {
      type: Boolean,
      default: boolean('No Gutters', false)
    },
  },
  template: `<g-container>
    <g-layout :horizontal="horizontal" :no-gutters="noGutters">
      <g-layout>
        <div style="border: 1px solid black; padding: 8px; width: 100%">Column</div>
      </g-layout>
      <g-layout>
        <div style="border: 1px solid black; padding: 8px; width: 100%">Column</div>
      </g-layout>
      <g-layout>
        <div style="border: 1px solid black; padding: 8px; width: 100%">Column</div>
      </g-layout>
      <g-layout>
        <div style="border: 1px solid black; padding: 8px; width: 100%">Column</div>
      </g-layout>
    </g-layout>
  </g-container>`
});

export const alignment = () => ({
  components: { GLayout, GContainer },
  props: {
    align: {
      type: String,
      default: select('Align Items', {center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch'}, 'center')
    },
    justify: {
      type: String,
      default: select('Justify Content', {center: 'center', start: 'flex-start', end: 'flex-end', 'space-around': 'space-around', 'space-between': 'space-between'} ,'center')
    },
  },
  template: `<g-container>
    <g-layout :align-items="align" :justify-content="justify" style="height: 100px; background-color: #eeeeee">
        <div style="border: 1px solid black; padding: 8px;">Column</div>
        <div style="border: 1px solid black; padding: 8px;">Column</div>
        <div style="border: 1px solid black; padding: 8px;">Column</div>
        <div style="border: 1px solid black; padding: 8px;">Column</div>
      </g-layout>
    </g-layout>
  </g-container>`
});

export const flow = () => ({
  components: { GLayout, GContainer },
  props: {
    horizontal: {
      type: Boolean,
      default: boolean('Horizontal', false)
    },
    wrap: {
      type: Boolean,
      default: boolean('Wrap', false)
    },
    reverse: {
      type: Boolean,
      default: boolean('Reverse', false)
    },
  },
  template: `<g-container>
    <g-layout :horizontal="horizontal" :wrap="wrap" :reverse="reverse" style="height: 100px; width: 300px; background-color: #eeeeee; margin: 10%">
        <div style="border: 1px solid black; padding: 8px;">Column</div>
        <div style="border: 1px solid black; padding: 8px;">Column</div>
        <div style="border: 1px solid black; padding: 8px;">Column</div>
        <div style="border: 1px solid black; padding: 8px;">Column</div>
        <div style="border: 1px solid black; padding: 8px;">Column</div>
      </g-layout>
    </g-layout>
  </g-container>`
});