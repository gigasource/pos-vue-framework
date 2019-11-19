import {text, withKnobs, number} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'
import PosTextField from "../POSTextField";
import PosTextFieldLarge from "../POSTextFieldLarge";
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
                                 <template #apendContent>
                                   Append
                                 </template>
                               </pos-text-field>
               </div>`
})

export const larger = () => ({
    components: {PosTextFieldLarge, GIcon},
    props: {},
    template: `<div><pos-text-field-large label="Name">
                                 <template #prependContent>
                                   Prepend
                                 </template>
                                 <template v-slot:prepend="{onClick}">
                                   <g-icon color="red">mdi-pen</g-icon>
                                 </template>
                                 <template v-slot:append="{onClick}">
                                   <g-icon>mdi-close</g-icon>
                                 </template>
                                 <template #apendContent>
                                   Append
                                 </template>
                               </pos-text-field-large>
               </div>`
})