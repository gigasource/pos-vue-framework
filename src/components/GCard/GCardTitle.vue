<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

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
          'g-card__title': true,
          'g-card__text__top': props.top,
          'g-card__text__left': props.left,
          'g-card__text__bottom': props.bottom,
          'g-card__text__right': props.right,
          'g-card__text__absolute': props.absolute,
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

<style scoped>

</style>
