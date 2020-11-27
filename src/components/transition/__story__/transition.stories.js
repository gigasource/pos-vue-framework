import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import GSelect from '../../GSelect/GSelect'
import { GBounceDownAnimation, GExpandTransition } from "../transition";

export default {
  title: 'Effect',
  decorators: [withKnobs],
};


export const darken = () => ({
  props: {
    color: { default: text('Color', '#84ffff')}
  },
  template: `<div class="darken-effect" :style="[{'background-color': color, width: '100px', height: '100px', border: '1px solid transparent', cursor: 'pointer'}]"></div>`
})

export const waves = () => ({
  props: {
    color: { default: text('Color', '#84ffff')},
    wave: { default: text('Waves Color', 'orange')}
  },
  computed: {
    wavesColor() {
      return 'waves-' + this.wave
    }
  },
  template: `<div :class="['waves-effect', wavesColor]" :style="[{'background-color': color, width: '100px', height: '100px', border: '1px solid transparent', cursor: 'pointer'}]"></div>`
})

export const transition = () => ({
  props: {},
  data() {
    return {
      list: ['bounceDown', 'bounceUp', 'bounceRight', 'bounceLeft', 'fadeDown', 'fadeUp', 'fadeRight', 'fadeLeft', 'flipX', 'flipY', 'lightSpeedRight', 'lightSpeedLeft', 'rotate', 'rotateDownLeft', 'rotateDownRight', 'rotateUpLeft', 'rotateUpRight', 'roll', 'zoom', 'zoomUp', 'zoomDown', 'zoomLeft', 'zoomRight'],
      show: false,
      transition: null
    }
  },
  template: `<div>
    <div class="row-flex">
      <p class="mr-2">Choose transition: </p>
      <select v-model="transition" style="border: 1px solid black">
        <option disabled value="">Select an animation</option>
        <option v-for="(item, i) in list" :key="i" :value="item">{{item}}</option>
      </select>
      <button class="ml-2" @click="show = !show">Toggle</button>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 200px">
      <transition :name="transition">
        <p v-if="show">{{transition}}</p>
      </transition>
    </div>
</div>`
})

export const animation = () => ({
  props: {},
  data() {
    return {
      list: ['bounce', 'flash', 'flip', 'heartBeat', 'jello', 'rubberBand', 'shake', 'swing', 'tada', 'wobble'],
      show: false,
      animation: null
    }
  },
  template: `<div>
    <div class="row-flex">
      <p class="mr-2">Choose animation: </p>
      <select v-model="animation" style="border: 1px solid black">
        <option disabled value="">Select an animation</option>
        <option v-for="(item, i) in list" :key="i" :value="item">{{item}}</option>
      </select>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 200px">
      <p class="animated infinite" :class="animation">{{animation}}</p>
    </div>
</div>`
})

export const textComponent = () => ({
  components: {GExpandTransition, GBounceDownAnimation},
  props: {},
  data() {
    return {
      show: false
    }
  },
  template: `<div>
    <button @click="show = !show">Toggle</button>
    <g-bounce-down-animation>
      <p v-show="show" style="border: 1px solid red">Test Animation</p>
    </g-bounce-down-animation>
  </div>`
})
