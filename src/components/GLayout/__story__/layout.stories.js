import { withKnobs, boolean, select, number } from '@storybook/addon-knobs';
import GLayout from '../GLayout';
import GContainer from '../GContainer';
import GSpacer from '../GSpacer';
import GCard from '../../GCard/GCard';
import GRow from '../GRow';
import GCol from '../GCol';

export default {
  title: 'Layout',
  decorators: [withKnobs]
}

export const layoutWithRowCol = () => ({
  components: { GCol, GRow, GCard, GContainer },
  props: {
    align: {
      type: String,
      default: select('Align Items', { center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, 'center')
    },
    justify: {
      type: String,
      default: select('Justify Content', { center: 'center', start: 'flex-start', end: 'flex-end', 'space-around': 'space-around', 'space-between': 'space-between', 'space-evenly': 'space-evenly' }, 'center')
    },
    noGutters: {
      type: Boolean,
      default: boolean('No gutters', false)
    },
    nowrap: {
      type: Boolean,
      default: boolean('No wrap', false)
    },
    reverse: {
      type: Boolean,
      default: boolean('Reverse', false)
    },
    col: {
      type: Number,
      default: number('Cols', 2, {range: true, min: 1, max: 12, step: 1})
    },
    align1: {
      type: String,
      default: select('Align Self 1', {none: '', center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, '')
    },
    align2: {
      type: String,
      default: select('Align Self 2', {none: '',  center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, '')
    },
    align3: {
      type: String,
      default: select('Align Self 3', {none: '',  center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, '')
    },
    order1: {
      type: Number,
      default: number('Order 1', 1)
    },
    order2: {
      type: Number,
      default: number('Order 2', 2)
    },
    order3: {
      type: Number,
      default: number('Order 3', 3)
    },
  },
  template: `
    <g-row :align-items="align"
       :justify-content="justify"
       :no-gutters="noGutters"
       :nowrap="nowrap"
       :reverse="reverse"
       class="bg-grey-lighten-5"
       style="height: 300px;">
      <g-col :cols="col"
        :align-self="align1"
        :order="order1">
        <div style="height: 100%; border: 1px solid black;">
          Column 1 Col-{{col}}
        </div>
      </g-col>
      <g-col :cols="col"
        :align-self="align2"
        :order="order2">
        <div style="height: 100%; border: 1px solid black;">
          Column 2 Col-{{col}}
        </div>
      </g-col>
      <g-col :cols="col"
        :align-self="align3"
        :order="order3">
        <div style="height: 100%; border: 1px solid black;">
          Column 3 Col-{{col}}
        </div>  
      </g-col>
    </g-row>
  `
});

export const offsetColumn = () => ({
  components: { GRow, GCol},
  props: {
    offset: {
      type: Number,
      default: number('Offset', 2, {range: true, min: 0, max: 12, step: 1})
    },
    col: {
      type: Number,
      default: number('Cols', 2, {range: true, min: 1, max: 12, step: 1})
    },
    align: {
      type: String,
      default: select('Align Self', {none: '', center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, '')
    },
  },
  template: `
    <g-row no-gutters
      class="bg-grey-lighten-5"
      style="height: 100px;">
      <g-col :cols="col"
        :align-self="align"
        :offset="offset">
        <div style="border: 1px solid black;">
          Col-{{col}} Offset-{{offset}}
        </div>
      </g-col>
    </g-row>
  `
});

export const layoutWithBreakpoint = () => ({
  components: { GContainer, GCol, GRow },
  props: {
    xs1: {
      default: number('Col 1 xs', 6)
    },
    sm1: {
      default: number('Col 1 sm', 12)
    },
    md1: {
      default: number('Col 1 md', 8)
    },
    lg1: {
      default: number('Col 1 lg', 6)
    },
    xl1: {
      default: number('Col 1 xl', 4)
    },
    xs2: {
      default: number('Col 2 xs', 6)
    },
    sm2: {
      default: number('Col 2 sm', 12)
    },
    md2: {
      default: number('Col 2 md', 4)
    },
    lg2: {
      default: number('Col 2 lg', 6)
    },
    xl2: {
      default: number('Col 2 xl', 8)
    }
  },
  template: `<g-row no-gutters>
      <g-col :xs="xs1" :sm="sm1" :md="md1" :lg="lg1" :xl="xl1">
        <div style="border: 1px solid black; padding: 8px">
          xs={{xs1}} sm={{sm1}} md={{md1}} lg={{lg1}} xl={{xl1}}
        </div>
      </g-col>
      <g-col :xs="xs2" :sm="sm2" :md="md2" :lg="lg2" :xl="xl2">
        <div style="border: 1px solid black; padding: 8px">
          xs={{xs2}} sm={{sm2}} md={{md2}} lg={{lg2}} xl={{xl2}}
        </div>
      </g-col>
    </g-row>`
})

export const layoutWithAttributeAndOffsetBreakpoint = () => ({
  components: { GRow, GCol },
  template: `<g-row no-gutters>
     <g-col xs10 sm7 md4 lg1 xl2>
      <div style="border: 1px solid black; padding: 8px; height: 100%">
          xs10 sm8 md6 lg4 xl2
      </div>
      </g-col>  
      <g-col xs1 sm3 md5 lg7 xl5
            offset-xs="1" offset-sm="2" offset-md="3" offset-lg="4" offset-xl="5" >
        <div style="border: 1px solid black; padding: 8px; height: 100%">
            xs1 sm3 md5 lg7 xl9
        </div>
      </g-col>  
  </g-row>`
})

export const layoutOnlyBreakpoint = () => ({
  components: { GRow, GCol},
  template: `<g-row no-gutters>
  <g-col xs="10">
  <div style="border: 1px solid black; padding: 8px; height: 100%">
          10 cols in every breakpoints
      </div>
</g-col>
</g-row>`
});