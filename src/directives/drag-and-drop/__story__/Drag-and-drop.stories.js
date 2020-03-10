import { withKnobs } from '@storybook/addon-knobs';
import { Draggable, Droppable } from '../draggable';
import { Fragment } from 'vue-fragment';
import Vue from 'vue'

export default {
  title: 'Drag and drop',
  decorators: [withKnobs]
}

export const defaultDnd = () => ({
  components: {
    Fragment
  },
  data() {
    return {
      dropData: '',
      dragData: {
        type: 'text/plain',
        content: 'This is drop content'
      }
    }
  },
  directives: {
    Draggable,
    Droppable
  },
  methods: {
    dragover(e) {
      this.dropData = 'drag-over!'
      e.target.style.outline = '5px solid red'
    },
    drop(e) {
      this.dropData = e.dataTransfer.getData('text/plain')
      e.target.style.outline = 'none'
    }
  },
  template: `
    <fragment>
      <div style="width: 600px; height: 300px; margin-bottom: 50px; background-color: aqua; color: black" v-draggable:[dragData]>
        Draggable
      </div>
      <div style="width: 800px; height: 400px; background-color: #37474f; color: white" v-droppable="{dragover, drop}">
        Drop zone
        <div>{{dropData}}</div>
      </div>
    </fragment>`
})

export const components = () => ({
  components: {
    simpleList
  },
  data() {
    return {
      dropData: '',
      items1: [
        { text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      items2: [
        { text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
    }
  },
  directives: {
    Draggable,
    Droppable
  },
  methods: {
    dragstart(item) {
      return e => {
        e.dataTransfer.setData('item', JSON.stringify(item))
      }
    },
    dragend(item) {
      return e => {

      }
    },
    dragover(e) {

    },
    drop(items) {
      return e => {
        const item = JSON.parse(e.dataTransfer.getData('item'))
        items.push(item)
      }
    }
  },
  template: `
    <div style="display: flex; height: 500px">
      <simple-list :items="items1" v-droppable="{drop: drop(items1), dragover}">
        <template #item="{item}">
          <div v-draggable="{dragstart: dragstart(item)}"
               style="border: 1px solid black; margin: 2px; padding: 2px">{{item.text}}
          </div>
        </template>
      </simple-list>
      <simple-list :items="items2" v-droppable="{drop: drop(items2), dragover}">
        <template #item="{item}">
          <div v-draggable="{dragstart: dragstart(item)}"
               style="border: 1px solid black; margin: 2px; padding: 2px">{{item.text}}</div>
        </template>
      </simple-list>
    </div>`
})

export const file = () => ({
  directives: {
    Draggable,
    Droppable
  },
  methods: {
    dragover(e) {
      e.dataTransfer.items.length && (this.dropData = 'Something dragged over!')
    },
    drop(e) {
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        this.dropData = `Files: [${Array.from(e.dataTransfer.files).map(f => f.name).join(', ')}]`
      } else this.dropData = `No files dropped!`
    }
  },
  data() {
     return {
       dropData: ''
     }
  },
  template: `
    <div>
      <div style="width: 800px; height: 400px; background-color: #37474f; color: white" v-droppable="{dragover, drop}">
        Drop zone
        <div>{{dropData}}</div>
      </div>
    </div>`
})

const simpleList = Vue.extend({
  props: {
    items: Array
  },
  template: `
    <div style="margin-right: 50px;">
      <slot>
        <template v-for="item in items">
          <slot name="item" :item="item">
            <li>{{item.text}}</li>
          </slot>
        </template>
      </slot>
    </div>
  `
})