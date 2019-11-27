import {withKnobs, boolean, number} from '@storybook/addon-knobs';
import draggableAccordion from "../DraggableAccordion";

export default {
    title: 'DraggableAccordion',
    decorators: [withKnobs]
}

export const DraggableAccordion = () => ({
    components: {draggableAccordion},
    template:`<div>
                <draggable-accordion />
              </div>`
})