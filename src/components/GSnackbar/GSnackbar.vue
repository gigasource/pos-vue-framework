<template>
	<transition name="g-snack-transition">
		<div v-if="isActive"
				 class="g-snack"
				 :class="snackClasses">
			<div class="g-snack-wrapper">
				<div class="g-snack-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
	import colorable from '../../mixins/colorable';
  import { computed, createElement as h, onMounted, reactive, ref, watch } from '@vue/composition-api';

  export default {
    name: 'GSnackbar',
		props: {
      value: Boolean,

      timeout: {
        type: Number,
        default: 6000,
      },

			absolute: Boolean,
			top: Boolean,
			bottom: Boolean,
			left: Boolean,
			right: Boolean,

			color: String,
		},
		setup(props, context) {
      const { model: isActive } = getVModel(props, context);

			const snackClasses = computed(() => ({
        'g-snack__active': isActive.value,
				'g-snack__absolute': props.absolute,
        'g-snack__bottom': props.bottom || !props.top,
        'g-snack__left': props.left,
        'g-snack__right': props.right,
        'g-snack__top': props.top,
			}));

      return {
        isActive,
				snackClasses
      }
		}
  }
</script>

<style scoped>

</style>