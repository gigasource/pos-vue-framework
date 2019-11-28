import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GButtonMerger from '../GButtonMerger';
import GBtn from '../../GBtn/GBtn';

export default {
  title: 'GButtonMerger',
  decorators: [withKnobs],
};


export const GButtonMerge = () => ({
  components: { GButtonMerger, GBtn },
  props: {
    rows: { default: text('Grid row definition: ', '1fr 1fr 1fr 1fr') },
    cols: { default: text('Grid col definition: ', '1fr 1fr') },

  },
  methods: {
    onMerge() {
      this.$refs.merger.mergeButtons();
    },
    onSplit() {
      this.$refs.merger.splitButtons();
    }
  },
  data: () => ({
    itemData: [
      { row: [1, 2], col: [1, 2], text: 'BUTTON 1', value: 'BUTTON 1', area: 'btn1', style: { backgroundColor: 'red', textColor: 'white' } },
      { row: [1, 2], col: [2, 3], text: 'BUTTON 2', value: 'BUTTON 2', area: 'btn2', style: { backgroundColor: 'blue', textColor: 'white' } },
      { row: [1, 2], col: [3, 4], text: 'BUTTON 3', value: 'BUTTON 3', area: 'btn3', style: { backgroundColor: 'green', textColor: 'white' } },
      { row: [1, 2], col: [4, 5], text: 'BUTTON 4', value: 'BUTTON 4', area: 'btn4', style: { backgroundColor: 'yellow', textColor: 'white' } },
      { row: [2, 3], col: [1, 2], text: 'BUTTON 5', value: 'BUTTON 5', area: 'btn5', style: { backgroundColor: 'black', textColor: 'white' } },
      { row: [2, 3], col: [2, 3], text: 'BUTTON 6', value: 'BUTTON 6', area: 'btn6', style: { backgroundColor: 'brown', textColor: 'white' } },
      { row: [2, 3], col: [3, 4], text: 'BUTTON 7', value: 'BUTTON 7', area: 'btn7', style: { backgroundColor: 'pink', textColor: 'white' } },
      { row: [2, 3], col: [4, 5], text: 'BUTTON 8', value: 'BUTTON 8', area: 'btn8', style: { backgroundColor: 'orange', textColor: 'white' } },
    ]
  }),
  template: `
            <div style="width: 700px; height: 500px">
              <div>
                 <g-btn @click="onMerge" background-color="blue" text-color="white">Merge</g-btn>
                 <g-btn @click="onSplit" background-color="green" text-color="white">Split</g-btn>
              </div>            
              <g-button-merger :items="itemData" ref="merger">
<!--              for controller inside component-->
<!--                <template v-slot:controller="{onMerge, onSplit}">-->
<!--                  <div>-->
<!--                    <g-btn @click="onMerge" background-color="blue" text-color="white">Merge</g-btn>-->
<!--                    <g-btn @click="onSplit" background-color="green" text-color="white">Split</g-btn>-->
<!--                  </div>-->
<!--                </template>-->
              </g-button-merger>
            </div>
          `,
})
