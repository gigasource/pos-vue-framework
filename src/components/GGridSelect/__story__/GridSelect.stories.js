import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import GCard from '../../GCard/GCard';
import GBtn from '../../GBtn/GBtn';
import GImg from '../../GImg/GImg';
import GSpacer from '../../GLayout/GSpacer';
import { GCardActions } from '../../GCard/GCardFunctionalComponent';
import GRow from '../../GLayout/GRow';
import GCol from '../../GLayout/GCol';
import GGridSelect from '../../GGridSelect/GGridSelect';

export default {
  title: 'Grid Select',
  decorators: [withKnobs]
}

export const buttons = () => ({
  components: { GGridSelect, GBtn },
  data: () => ({
    itemList: [
      {
        id: 1,
        name: 'item 1',
        text: 'subtitle1',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 2,
        name: 'item 2',
        text: 'subtitle2',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 3,
        name: 'item 3',
        text: 'subtitle3',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 4,
        name: 'item 4',
        text: 'subtitle4',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 5,
        name: 'item 5',
        text: 'subtitle5',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 6,
        name: 'item 6',
        text: 'subtitle6',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 7,
        name: 'item 7',
        text: 'subtitle7',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 8,
        name: 'item 8',
        text: 'subtitle8',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
    ],
    selectedList: [],
  }),
  props: {
    grid: {
      type: Boolean,
      default: boolean('show as grid', false)
    },
    multiple: {
      type: Boolean,
      default: boolean('multiple', true)
    },
    returnObject: {
      type: Boolean,
      default: boolean('return object', false)
    },
    itemText: {
      type: String,
      default: select('item text', {id: 'id', name: 'name', text: 'text', image: 'image'}, 'name')
    },
    itemValue: {
      type: String,
      default: select('item value', {id: 'id', name: 'name', text: 'text', image: 'image'}, 'id')
    }
  },
  template: `
  <div>
    <span>selected: {{selectedList}}</span>
      <g-grid-select :items="itemList"
                     :item-image="itemImage"
                     :item-text="itemText"
                     :item-value="itemValue"
                     :multiple="multiple"
                     :return-object="returnObject"
                     :grid="grid"
                     v-model="selectedList"
      >
        <template #default="{ toggleSelect, item, index }">
          <g-btn style="margin-right: 4px" @click="toggleSelect(item)">{{item.name}}</g-btn>
        </template>
        <template #selected="{ toggleSelect, item, index }">
          <g-btn style="margin-right: 4px"  @click="toggleSelect(item)" background-color="blue" text-color="white">{{item.name}}</g-btn>
        </template>
      </g-grid-select>
  </div>
  `
})

export const cardSelect = () => ({
  components: { GGridSelect, GCol, GRow, GSpacer, GImg, GCard, GCardActions },
  data: () => ({
    itemList: [
      {
        id: 1,
        name: 'item 1',
        text: 'subtitle1',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 2,
        name: 'item 2',
        text: 'subtitle2',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 3,
        name: 'item 3',
        text: 'subtitle3',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 4,
        name: 'item 4',
        text: 'subtitle4',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 5,
        name: 'item 5',
        text: 'subtitle5',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 6,
        name: 'item 6',
        text: 'subtitle6',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 7,
        name: 'item 7',
        text: 'subtitle7',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
      {
        id: 8,
        name: 'item 8',
        text: 'subtitle8',
        image: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      },
    ],
    selectedList: [],
  }),
  props: {
    multiple: {
      type: Boolean,
      default: boolean('multiple', true)
    },
    returnObject: {
      type: Boolean,
      default: boolean('return object', false)
    },
    itemText: {
      type: String,
      default: select('item text', {id: 'id', name: 'name', text: 'text', image: 'image'}, 'name')
    },
    itemValue: {
      type: String,
      default: select('item value', {id: 'id', name: 'name', text: 'text', image: 'image'}, 'id')
    }
  },
  template: `
  <div>
    <span>selected: {{selectedList}}</span>
    <g-row style="height: 300px">
      <g-grid-select :items="itemList"
                     :item-image="itemImage"
                     :item-text="itemText"
                     :item-value="itemValue"
                     :multiple="multiple"
                     :return-object="returnObject"
                     v-model="selectedList"
      >
        <template #default="{ toggleSelect, item, index }">
          <g-card @click.stop="toggleSelect(item)">
            <g-img :src="item.image" height="200"></g-img>
            <g-card-actions>
              <g-spacer></g-spacer>
              <span>{{ item[itemText] }}</span>
              <g-spacer></g-spacer>
            </g-card-actions>
          </g-card>
        </template>
        <template #selected="{ toggleSelect, item, index }">
          <g-card @click.stop="toggleSelect(item)" dark class="bg-blue text-white">
            <g-img :src="item.image" height="200"></g-img>
            <g-card-actions>
              <g-spacer></g-spacer>
              <span>{{ item[itemText] }}</span>
              <g-spacer></g-spacer>
            </g-card-actions>
          </g-card>
        </template>
      </g-grid-select>
    </g-row>
  </div>
  `
})