import {boolean, number, withKnobs} from "@storybook/addon-knobs";
import GTable from "../GTable"

export default {
  title: 'GTable',
  decorators: [withKnobs]
}

export const basic = () => ({
  components: {GTable},
  props: {
    bordered: { default: boolean('Bordered', false)},
    dense: { default: boolean('Dense', false)},
    elevation: { default: number('Elevation', 0 , {min: 0, max: 24})},
    striped: { default: boolean('Stripped', false)},
    hover: { default: boolean('Hover', false)}
  },
  data() {
    return {
      headers: [
        { title: 'Dessert (100g serving)', value: 'name'},
        { title: 'Calories', value: 'calories' },
        { title: 'Fat (g)', value: 'fat' },
        { title: 'Carbs (g)', value: 'carbs' },
        { title: 'Protein (g)', value: 'protein' },
        { title: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
      ]
    }
  },
  template: `<g-table :headers="headers" :items="desserts" :bordered="bordered" :dense="dense" 
                      :elevation="elevation" :striped="striped" :hover="hover"/>`
})

export const borderByRow = () => ({
  components: {GTable},
  props: {
    dense: { default: boolean('Dense', false)},
  },
  data() {
    return {
      headers: [
        { title: 'Dessert (100g serving)', value: 'name'},
        { title: 'Calories', value: 'calories' },
        { title: 'Fat (g)', value: 'fat' },
        { title: 'Carbs (g)', value: 'carbs' },
        { title: 'Protein (g)', value: 'protein' },
        { title: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ]
    }
  },
  template: `<g-table :headers="headers" :items="desserts" :dense="dense" class="g-table__border--by-row"/>`
})

export const headerConfig = () => ({
  components: {GTable},
  data() {
    return {
      headers: [
        {title: 'Employee', value: 'employee', align: 'left', backgroundColor: '#E3F2FD', color: '#212121', borderColor: '#90CAF9'},
        {title: 'Clock in', value: 'cin', align: 'center', backgroundColor: '#E3F2FD', color: '#212121', borderColor: '#90CAF9'},
        {title: 'Clock out', value: 'cout', align: 'center', backgroundColor: '#E3F2FD', color: '#212121', borderColor: '#90CAF9'},
      ],
      items: [
        {employee: 'A', cin: '8:00', cout: '17:00'},
        {employee: 'B', cin: '8:00', cout: '17:00'},
        {employee: 'C', cin: '8:00', cout: '17:00'},
      ]
    }
  },
  template: `<g-table :items="items" :headers="headers" elevation="2"/>`
})


export const selectable = () => ({
  components: {GTable},
  data() {
    return {
      headers: [
        { title: 'Name', value: 'name' },
        { title: 'Position', value: 'position', align: 'center' },
      ],
      items: [
        { name: 'A', position: 1 },
        { name: 'B', position: 2 },
        { name: 'C', position: 3 },
        { name: 'D', position: 4 },
        { name: 'E', position: 5 },
      ],
      selectedItem: null
    }
  },
  methods: {
    select(item) {
      this.selectedItem = item
    }
  },
  template: `<div>
   <p>Selected item: {{selectedItem && selectedItem.name}}</p>
  <g-table :headers="headers" :items="items" selectable @click:item="select"/>
</div>
`
})

export const fixedHeader = () => ({
  components: {GTable},
  data() {
    return {
      headers: [
        { title: 'Dessert (100g serving)', value: 'name' },
        { title: 'Calories', value: 'calories' },
        { title: 'Fat (g)', value: 'fat' },
        { title: 'Carbs (g)', value: 'carbs' },
        { title: 'Protein (g)', value: 'protein' },
        { title: 'Iron (%)', value: 'iron' },
      ],
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ]
    }
  },
  template: `<div style="height: 360px">
  <g-table :items="items" :headers="headers" fixed-header/>
</div>`
})
