<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'GCardTitle',
    props: {
      absolute: Boolean,
      top: Boolean,
      left: Boolean,
      bottom: Boolean,
      right: Boolean,
      textColor: String
    },
    setup(props) {
      let classes = computed(() => {
        return {
          'g-card-title': true,
          'g-card-title__top': props.top,
          'g-card-title__left': props.left,
          'g-card-title__bottom': props.bottom,
          'g-card-title__right': props.right,
          'g-card-title__absolute': props.absolute,
        }
      });

      let styles = computed(() => {
        return {
          ...props.textColor && { color: props.textColor }
        }
      });

      return {
        classes,
				styles
      }
    }
  }
</script>
