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
  template: `<g-toolbar>
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const bottom = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar bottom>
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const dense = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar dense>
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const short = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar short>
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const prominent = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar prominent>
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const customHeight = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar height="100">
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const flat = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar flat>
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const extended = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar extended>
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
    <template v-slot:extension>
      <span>Extension</span>    
    </template>
   </g-toolbar>`
});

export const extendedWithHeight = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar extended extensionHeight="100">
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
    <template v-slot:extension>
      <span>Extension</span>    
    </template>
   </g-toolbar>`
});

export const background = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"> 
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const colorCss = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar color="#ff4452"> 
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const colorClass = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar color="red accent 2"> 
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});


export const gradient = () => ({
  components: {GToolbar, GBtn, GSpacer},
  data () {
    return {
      grad: text('Gradient', 'indigo, purple darken 2'),
    }
  },
  template: `<g-toolbar :gradient="grad"> 
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const elevation = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar elevation="10"> 
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const roundBorder = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar :tile="false"> 
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <span>Title</span>
    <g-spacer></g-spacer>
    <g-btn icon flat><i class="material-icons">search</i></g-btn>
    <g-btn icon flat><i class="material-icons">favorite</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});

export const collapse = () => ({
  components: {GToolbar, GBtn, GSpacer},
  template: `<g-toolbar collapse> 
    <g-btn icon flat><i class="material-icons">menu</i></g-btn>
    <g-btn icon flat><i class="material-icons">more_vert</i></g-btn>
   </g-toolbar>`
});