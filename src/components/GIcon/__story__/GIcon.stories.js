import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GIcon from '../GIcon';
import GBtn from "../../GBtn/GBtn";
import {mdiAccount} from '@mdi/js'
import customIcon from '../../../assets/home/avatar.svg';

export default {
  title: 'GIcon',
  decorators: [withKnobs],
};

export const basicIcon = () => ({
  components: {GIcon},
  props: {
    icon: {default: text('icon', 'fas fa-cat')},
    color: {default: text('color', '#DC143C')},
    xSmall: {default: boolean('xSmall', false)},
    small: {default: boolean('small', false)},
    medium: {default: boolean('medium', false)},
    large: {default: boolean('large', false)},
    xLarge: {default: boolean('xLarge', false)},
    disabled: {default: boolean('disabled', false)},
    dense: {default: boolean('dense', false)},
  },
  template: `<g-icon :color="color" :xSmall="xSmall" :small="small" :meidum="medium" :large="large" :xLarge="xLarge" :disabled="disabled" :dense="dense">{{icon}}</g-icon>`,
})

export const svgIcon = () => ({
  components: {GIcon},
  data: () => ({
    svgPath: mdiAccount
  }),
  props: {
    icon: {default: text('icon', 'fas fa-cat')},
    color: {default: text('color', '#DC143C')},
    xSmall: {default: boolean('xSmall', false)},
    small: {default: boolean('small', false)},
    medium: {default: boolean('medium', false)},
    large: {default: boolean('large', false)},
    xLarge: {default: boolean('xLarge', false)},
    disabled: {default: boolean('disabled', false)},
    dense: {default: boolean('dense', false)},
  },
  template: `<g-icon :color="color" :xSmall="xSmall" :small="small" :meidum="medium" :large="large" :xLarge="xLarge" :disabled="disabled" :dense="dense">{{svgPath}}</g-icon>`,
})

export const customSvgIcon = () => ({
  components: {GIcon},
  data: () => ({
    customIcon: customIcon
  }),
  template: `<g-icon size="100px">{{customIcon}}</g-icon>`,
})

export const sizeAndColor = () => ({
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

export const iconInButton = () => ({
  components: {GIcon, GBtn},
  props: {
    color: {default: text('color', 'brown')},
    dense: {default: boolean('dense', false)},
    disabled: {default: boolean('disabled', false)},
    left: {default: boolean('left', false)},
    right: {default: boolean('right', false)}
  },
  template: `<div><g-btn>Buy this <b>{{color}}</b>   car    <g-icon :right="right" :left="left" :color="color" :dense="dense" :disabled="disabled" >fas fa-car</g-icon></g-btn></div>`,
})


// import Vue from 'vue/dist/vue.common.js'

