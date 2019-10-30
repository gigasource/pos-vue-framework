<template>
  <span :class="wrapClass">
    <slot></slot>
    <span v-show="show" :class="badgeSlotClass" :style="badgeSlotStyle"><slot name="badge"></slot></span>
  </span>
</template>

<script>
  import {computed} from '@vue/composition-api'
  import GIcon from "../GIcon/GIcon";
  import {setBackgroundColor} from "../../mixins/colorable";

  export default {
    name: "GBadge",
    components: {GIcon},
    model: {
      prop: 'show',
      event: 'change'
    },
    props: {
      // value: {
      //   default: null
      // },
      show: {type: Boolean, default: true},
      //style
      bottom: Boolean,
      left: Boolean,
      overlap: Boolean,
      color: {type: String, default: 'green'},
      //transition
      transition: String,
      mode: String,
      origin: String,
    },
    setup(props, context) {

      const wrapClass = computed(() => {
        return {
          'g-badge': true,
          'g-badge__bottom': props.bottom,
          'g-badge__left': props.left,
          'g-badge__overlap': props.overlap,
        }
      })

      const badgeSlotClass = computed(() => ({
        'g-badge--badge': true,
      }))

      const badgeSlotStyle = computed(() => ({
        'background-color': props.color
      }))

      return {
        wrapClass,
        badgeSlotClass,
        badgeSlotStyle
      }
    }
  }
</script>

<style scoped>

</style>
