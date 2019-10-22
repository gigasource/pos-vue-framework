import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GIcon from '../GIcon';
import GBtn from "../../GButton/GButton";

export default {
  title: 'GIcon',
  decorators: [withKnobs],
};

export const iconBasic = () => ({
  components: {GIcon},
  template: `<g-icon>fas fa-cat</g-icon>`,
})

export const iconTypeSizeAndColor = () => ({
  components: {GIcon},
  props: {
    color1: {default: text('color1', 'blue')},
    color2: {default: text('color2', 'red')},
    color3: {default: text('color3', 'green')},
    color4: {default: text('color4', 'orange')},
  },
  template: `<div>
<div><g-icon :color="color1">fas fa-cat</g-icon><g-icon medium :color="color2">fas fa-cat</g-icon><g-icon large :color="color3">fas fa-cat</g-icon><g-icon xLarge :color="color4">fas fa-cat</g-icon></div>
<div><g-icon :color="color1">home</g-icon><g-icon medium :color="color2">home</g-icon><g-icon large :color="color3">home</g-icon><g-icon xLarge :color="color4">home</g-icon></div>
<div><g-icon :color="color1">mdi-domain</g-icon><g-icon medium :color="color2">mdi-domain</g-icon><g-icon large :color="color3">mdi-domain</g-icon><g-icon xLarge :color="color4">mdi-domain</g-icon></div>
</div>`,
})

export const icon = () => ({
  components: {GIcon,GBtn},
  method: {
    foo() {
      //do nothing
    }
  },
  props: {
    dense: {default: boolean('dense', false)},
    disabled: {default: boolean('disabled', false)},
    left: {default: boolean('left', false)},
    right: {default: boolean('right', false)}
  },
  template: `<div><g-icon @click="foo" dense disabled color="pink">fas fa-cat</g-icon>
                   <div><g-btn>Cancel<g-icon right color="brown">fas fa-car</g-icon></g-btn></div></div><script>

 }
</script>`,
})


// import Vue from 'vue/dist/vue.common.js'

