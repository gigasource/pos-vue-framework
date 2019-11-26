import {withKnobs, boolean, number} from '@storybook/addon-knobs';
import GSectionsDraggable from "../GSectionsDraggable";
import GSectionsHeader from '../GSectionsHeader';
import GSectionsItem from '../GSectionsItem';
import PosTextField from "../../../POSComponents/POSInput/POSTextField";
import GIcon from "../../GIcon/GIcon";
import {ref, computed, watch} from '@vue/composition-api';

export default {
    title: 'GSectionsDnd',
    decorators: [withKnobs]
}

export const testGSectionsDnd = () => ({
    components: {GSectionsDraggable, GSectionsHeader, GSectionsItem, PosTextField, GIcon},
    props: {},
    data() {
        return {
            dragged: null,
        }
    },
    methods: {
        onDrop(e) {
            e.preventDefault();
            e.target.appendChild(this.dragged)
        },
        onDragStart(e) {
            this.dragged = e.target
        },
        onDragEnter(e) {
            e.preventDefault();
        },
        onDragOver(e) {
            e.preventDefault();
        }
    },
    setup() {
        const activeItem = ref(null)
        const items = ref([
            {title: 'Accordion 1'},
            {title: 'Accordion 2'},
            {title: 'Accordion 3'},
        ])

        return {
            items,
            activeItem,
        }
    },
    template: `
  <div style="width: 400px; border: 1px solid lightblue;">
    <g-sections-draggable v-model="activeItem">
      <g-sections-item v-for="(item, index) in items" :header="item.title" :key="index">
        <pos-text-field :label="'label '+(index+1)" />
        <pos-text-field />
        <pos-text-field />
      </g-sections-item>
    </g-sections-draggable>
    <div style="height: 200px; border: 1px solid lightblue; padding: 20px;" v-on:dragover="onDragOver" v-on:dragenter="onDragEnter" v-on:drop="onDrop"/>
    <div style="height: 200px; border: 1px solid mediumpurple; padding: 20px;" v-on:dragover="onDragOver" v-on:dragenter="onDragEnter" v-on:drop="onDrop">
      <div style="height: 100%; width: 100%; background-color: #00C853" draggable="true" v-on:dragstart="onDragStart"/>
    </div>
  </div>
`
})