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


// export const basic = () => ({
//   components: { GLayout, GContainer },
//   props: {
//     vertical: {
//       type: Boolean,
//       default: boolean('vertical', false)
//     },
//     noGutters: {
//       type: Boolean,
//       default: boolean('No Gutters', false)
//     },
//   },
//   template: `<g-container>
//     <g-layout :vertical="vertical" :no-gutters="noGutters">
//       <g-layout>
//         <div style="border: 1px solid black; padding: 8px; width: 100%">Column</div>
//       </g-layout>
//       <g-layout>
//         <div style="border: 1px solid black; padding: 8px; width: 100%">Column</div>
//       </g-layout>
//       <g-layout>
//         <div style="border: 1px solid black; padding: 8px; width: 100%">Column</div>
//       </g-layout>
//       <g-layout>
//         <div style="border: 1px solid black; padding: 8px; width: 100%">Column</div>
//       </g-layout>
//     </g-layout>
//   </g-container>`
// });
//
// export const alignment = () => ({
//   components: { GLayout, GContainer },
//   props: {
//     align: {
//       type: String,
//       default: select('Align Items', { center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, 'center')
//     },
//     justify: {
//       type: String,
//       default: select('Justify Content', { center: 'center', start: 'flex-start', end: 'flex-end', 'space-around': 'space-around', 'space-between': 'space-between' }, 'center')
//     },
//   },
//   template: `<g-container>
//     <g-layout :align-items="align" :justify-content="justify" style="height: 100px; background-color: #eeeeee">
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//       </g-layout>
//     </g-layout>
//   </g-container>`
// });
//
// export const flow = () => ({
//   components: { GLayout, GContainer },
//   props: {
//     vertical: {
//       type: Boolean,
//       default: boolean('vertical', false)
//     },
//     wrap: {
//       type: Boolean,
//       default: boolean('Wrap', false)
//     },
//     reverse: {
//       type: Boolean,
//       default: boolean('Reverse', false)
//     },
//   },
//   template: `<g-container>
//     <g-layout :vertical="vertical" :wrap="wrap" :reverse="reverse" style="height: 100px; width: 300px; background-color: #eeeeee; margin: 10%">
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//         <div style="border: 1px solid black; padding: 8px;">Column</div>
//       </g-layout>
//     </g-layout>
//   </g-container>`
// });
//
// export const col = () => ({
//   components: { GLayout, GContainer },
//   props: {
//     col: {
//       type: Number,
//       default: select('Col', { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12 }, 3)
//     },
//     noGutters: {
//       type: Boolean,
//       default: boolean('No gutters', false)
//     },
//     wrap: {
//       type: Boolean,
//       default: boolean('Wrap', true)
//     }
//   },
//   template: `<g-container>
//     <g-layout :wrap="wrap" :no-gutters="noGutters" style="background-color: #eeeeee">
//       <g-layout :col="col">
//         <div style="border: 1px solid black; width: 100%">Col-{{col}}</div>
//       </g-layout>
//       <g-layout :col="col">
//         <div style="border: 1px solid black; width: 100%">Col-{{col}}</div>
//       </g-layout>
//       <g-layout :col="col">
//         <div style="border: 1px solid black; width: 100%">Col-{{col}}</div>
//       </g-layout>
//       <g-layout :col="col">
//         <div style="border: 1px solid black; width: 100%">Col-{{col}}</div>
//       </g-layout>
//     </g-layout>
//   </g-container>`
// });
//
// export const row = () => ({
//   components: { GLayout, GContainer },
//   props: {
//     row: {
//       type: Number,
//       default: select('Col', { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12 }, 3)
//     },
//     noGutters: {
//       type: Boolean,
//       default: boolean('No gutters', false)
//     },
//     wrap: {
//       type: Boolean,
//       default: boolean('Wrap', true)
//     }
//   },
//   template: `<g-container>
//     <g-layout vertical :wrap="wrap" :no-gutters="noGutters" style="height: 500px; background-color: #eeeeee">
//       <g-layout :row="row">
//         <div style="border: 1px solid black; width: 100%">Row-{{row}}</div>
//       </g-layout>
//       <g-layout :row="row">
//         <div style="border: 1px solid black; width: 100%">Row-{{row}}</div>
//       </g-layout>
//       <g-layout :row="row">
//         <div style="border: 1px solid black; width: 100%">Row-{{row}}</div>
//       </g-layout>
//       <g-layout :row="row">
//         <div style="border: 1px solid black; width: 100%">Row-{{row}}</div>
//       </g-layout>
//     </g-layout>
//   </g-container>`
// });
//
// export const layoutInside = () => ({
//   components: { GLayout, GContainer },
//   props: {
//     align1: {
//       type: String,
//       default: select('Align Self 1', { center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, 'flex-start')
//     },
//     align2: {
//       type: String,
//       default: select('Align Self 2', { center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, 'center')
//     },
//     align3: {
//       type: String,
//       default: select('Align Self 3', { center: 'center', start: 'flex-start', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }, 'flex-end')
//     },
//     order1: {
//       type: Number,
//       default: number('Order 1', 1)
//     },
//     order2: {
//       type: Number,
//       default: number('Order 2', 2)
//     },
//     order3: {
//       type: Number,
//       default: number('Order 3', 3)
//     },
//   },
//   template: `<g-container>
//     <g-layout style="height: 100px; background-color: #eeeeee">
//       <g-layout :align-self="align1" :order="order1">
//         <div style="border: 1px solid black; padding: 8px; width: 100%">Column 1</div>
//       </g-layout>
//       <g-layout :align-self="align2" :order="order2">
//         <div style="border: 1px solid black; padding: 8px; width: 100%">Column 2</div>
//       </g-layout>
//       <g-layout :align-self="align3" :order="order3">
//         <div style="border: 1px solid black; padding: 8px; width: 100%">Column 3</div>
//       </g-layout>
//     </g-layout>
//   </g-container>`
// });

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