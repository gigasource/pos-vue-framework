import { text, withKnobs, boolean, number } from '@storybook/addon-knobs';
import GToolbar from '../GToolbar';
import GBtn from '../../GBtn/GBtn';
import GSpacer from '../../GLayout/GSpacer';
import GTextFieldFunctional from '../../GInput/GTextFieldFunctional';
import GMenu from '../../GMenu/GMenu';
import GList from '../../GList/GList';
import GListItem from '../../GList/GListItem';

export default {
  title: 'Toolbar',
  decorators: [withKnobs],
};

export const basic = () => ({
  components: {GToolbar, GBtn, GSpacer},
  props: {
    bottom: {
      type: Boolean,
      default: boolean('Bottom', false)
    },
    dense: {
      type: Boolean,
      default: boolean('Dense', false)
    },
    short: {
      type: Boolean,
      default: boolean('Short', false)
    },
    prominent: {
      type: Boolean,
      default: boolean('Prominent', false)
    },
    flat: {
      type: Boolean,
      default: boolean('Flat', false)
    },
    collapse: {
      type: Boolean,
      default: boolean('Collapse', false)
    },
    rounded: {
      type: Boolean,
      default: boolean('Rounded border', false)
    },
    elevation: {
      type: Number,
      default: number('Elevation', 4)
    }
  },
  template: `<g-toolbar :bottom="bottom" :dense="dense" :short="short" :prominent="prominent" :flat="flat" :collapse="collapse" :tile="!rounded" :elevation="elevation">
    <g-btn flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn flat><i class="material-icons">search</i></g-btn>
    <g-btn flat><i class="material-icons">favorite</i></g-btn>
    <g-btn flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const customHeight = () => ({
  components: {GToolbar, GBtn, GSpacer},
  props: {
    height: {
      type: Number,
      default: number('Custom height', 64)
    }
  },
  template: `<g-toolbar :height="height">
    <g-btn flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn flat><i class="material-icons">search</i></g-btn>
    <g-btn flat><i class="material-icons">favorite</i></g-btn>
    <g-btn flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const extension = () => ({
  components: {GToolbar, GBtn, GSpacer},
  props: {
    extended: {
      type: Boolean,
      default: boolean('Extended', true)
    },
    height: {
      type: Number,
      default: number('Extension height', 64)
    }
  },
  template: `<g-toolbar :extended="extended" :extensionHeight="height">
    <g-btn flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn flat><i class="material-icons">search</i></g-btn>
    <g-btn flat><i class="material-icons">favorite</i></g-btn>
    <g-btn flat><i class="material-icons">more_vert</i></g-btn>
    <template v-slot:extension>
      <span>Extension</span>    
    </template>
   </g-toolbar>`
});

export const image = () => ({
  components: {GToolbar, GBtn, GSpacer},
  props: {
    src: {
      type: String,
      default: text('src', 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg')
    }
  },
  template: `<g-toolbar :src="src"> 
    <g-btn flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn flat><i class="material-icons">search</i></g-btn>
    <g-btn flat><i class="material-icons">favorite</i></g-btn>
    <g-btn flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const color = () => ({
  components: {GToolbar, GBtn, GSpacer},
  props: {
    color: {
      type: String,
      default: text("Color", '#ff4452')
    }
  },
  template: `<g-toolbar :color="color"> 
    <g-btn flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn flat><i class="material-icons">search</i></g-btn>
    <g-btn flat><i class="material-icons">favorite</i></g-btn>
    <g-btn flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const gradient = () => ({
  components: {GToolbar, GBtn, GSpacer},
  props: {
    grad: {
      type: String,
      default: text('Gradient', 'indigo, purple darken 2')
    },
  },
  template: `<g-toolbar :gradient="grad"> 
    <g-btn flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn flat><i class="material-icons">search</i></g-btn>
    <g-btn flat><i class="material-icons">favorite</i></g-btn>
    <g-btn flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const materialize = () => ({
  components: { GToolbar, GSpacer, GBtn, GTextFieldFunctional, GMenu, GList, GListItem},
  data() {
    return {
      items1: [
        {title: 'Image 1', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Image 2', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Image 3', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Image 4', prepend: 'https://loremflickr.com/320/240'},
      ],
      items2: [
        {title: 'Notification 1', subtitle: '1 hour ago', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Notification 2', subtitle: '1 hour ago', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Notification 3', subtitle: '1 hour ago', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Notification 4', subtitle: '1 hour ago', prepend: 'https://loremflickr.com/320/240'},
      ],
      items3: [
        {title: 'Item 1', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Item 2', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Item 3', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Item 4', prepend: 'https://loremflickr.com/320/240'},
      ],
      showMenu1: false,
      showMenu2: false,
      showMenu3: false,
    }
  },
  props: {

  },
  template: `<div data-app><g-toolbar gradient="purple darken 1, deep orange accent 2">
      <g-text-field-functional placeholder="Explore materialize" solo class="w-50">
        <template v-slot:prepend-inner>
           <i class="material-icons">search</i>
        </template>    
      </g-text-field-functional>
      <g-spacer/>
      <g-menu v-model="showMenu1">
        <template v-slot:activator="{toggleContent}">
          <g-btn flat color="white" @click="toggleContent"><img alt style="width: 24px" src="https://loremflickr.com/320/240"/></g-btn>
        </template>
        <g-list :items="items1"/>
      </g-menu>
      <g-menu v-model="showMenu2">
        <template v-slot:activator="{toggleContent}">
          <g-btn flat color="white" @click="toggleContent"><i class="material-icons">notifications_none</i></g-btn>
        </template>
        <g-list :items="items2" subheader="Notifications"/>
      </g-menu>
      <g-menu v-model="showMenu3">
        <template v-slot:activator="{toggleContent}">
          <g-btn flat color="white" @click="toggleContent">
            <i class="material-icons">more_vert</i>
          </g-btn>
        </template>
        <g-list :items="items3" divider/>
      </g-menu>
    </g-toolbar></div>`
});