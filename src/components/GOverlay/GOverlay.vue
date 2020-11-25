<template>
	<div class="overlay" :class="overlayClass" :style="overlayStyle">
		<div class="overlay-scrim" :style="scrimStyle"></div>
		<div v-if="value" class="overlay-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import { computed } from 'vue';

  export default {
    name: "GOverlay",
    props: {
      absolute: Boolean,
			modelValue: {
        type: Boolean,
        default: false
      },
      opacity: {
        type: [Number, String],
        default: 0.46
      },
      color: {
        type: String,
        default: '#212121',
      },
      zIndex: {
        type: [Number, String],
        default: 5,
      }
    },
		emits: ['update:modelValue'],
		setup(props, context) {
			const isActive = getVModel(props, context);

      const computedOpacity = computed(() => isActive.value ? props.opacity : 0);

      const overlayStyle = computed(() => ({
        zIndex: props.zIndex
      }));

      const overlayClass = computed(() => ({
        'overlay__active': isActive.value,
        'overlay__absolute': props.absolute
      }));

      const scrimStyle = computed(() => ({
				backgroundColor: props.color,
				opacity: computedOpacity.value
			}));

			return {
        overlayClass,
        overlayStyle,
				scrimStyle
			}
    }
  }
</script>

<style scoped lang="scss">
	@import "GOverlay";
</style>
