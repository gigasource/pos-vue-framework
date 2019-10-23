import { text, withKnobs, boolean, number } from '@storybook/addon-knobs';
import GToolbar from '../GToolbar';
import GBtn from '../../GBtn/GBtn';
import GSpacer from '../../GLayout/GSpacer';

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
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
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
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
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
  template: `<g-toolbar :extended="extended" :height="height">
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
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
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
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
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
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
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer/>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});
