import {text, withKnobs, number} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'
import PosTextField from "../POSTextField";
import PosSelect from "../POSSelect";
import PosRangeSlider from "../POSRangeSlider";
import PosFileInputImage from "../POSFileInputImage";
import GIcon from "../../../components/GIcon/GIcon";

export default {
  title: 'POSInput',
  decorators: [withKnobs],
}

export const POSTextField = () => ({
  components: {PosTextField, GIcon},
  props: {},
  template: `<div><pos-text-field value=""
                               label="Name" 
                               placeholder="Dadd text">
                                 <template #prependContent>
                                   Prepend
                                 </template>
                                 <template v-slot:prepend="{onClick}">
                                   <g-icon color="red">mdi-pen</g-icon>
                                 </template>
                                 <template v-slot:append="{onClick}">
                                   <g-icon color="red">mdi-pen</g-icon>
                                 </template>
                                 <template #appendContent>
                                   Append
                                 </template>
                               </pos-text-field>
               </div>`
})

export const larger = () => ({
  components: {PosTextField, GIcon},
  props: {},
  template: `<div>
               <pos-text-field large label="Name">
                  <template v-slot:append="{onClick}">
                     <g-icon>mdi-pen</g-icon>
                  </template>
               </pos-text-field>
             </div>`
})

export const POSSelect = () => ({
  components: {PosSelect, GIcon},
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  props: {},
  template: `<div>
               <pos-select :items="items"
                           item-Text="text"
                           v-model="selected"
                           label="Person name"
                           clearable />
             </div>`
})


export const POSSlider = () => ({
  components: {PosRangeSlider},
  template: `<div>
               <pos-range-slider min="225" max="448"/>
             </div>`
})

export const POSFileInput = () => ({
  components: {PosFileInputImage},
  template: `<div>
               <pos-file-input-image/>
             </div>`
})
