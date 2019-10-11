<template>
	<transition name="g-snack-transition">
		<div v-if="isActive"
				 class="g-snack"
				 :class="snackClasses" :style="snackStyles">
			<div class="g-snack-wrapper"
					 :class="wrapperClasses"
					 :style="wrapperStyles">
				<div class="g-snack-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import { setBackgroundColor } from '../../mixins/colorable';
  import { computed, watch } from '@vue/composition-api';

  export default {
    name: 'GSnackbar',
		props: {
      value: Boolean,
      timeout: {
        type: [Number, String],
        default: 6000,
      },

			// Positioning
			...{
        absolute: Boolean,
				positionTop: [Number, String],
        positionLeft: [Number, String],
        positionBottom: [Number, String],
        positionRight: [Number, String],
        top: Boolean,
        bottom: Boolean,
        left: Boolean,
        right: Boolean,
      },

			// Styling
			color: String,
		},
		setup(props, context) {
      const { model: isActive } = getVModel(props, context);
      let activeTimeout;

			// Set close timeout
			watch(isActive, newVal => {
			  if (newVal) {
          clearTimeout(activeTimeout)
          if (props.timeout) {
            activeTimeout = setTimeout(() => {
              isActive.value = false
            }, props.timeout)
          }
				}
			});

			// Dynamic classes
			const snackClasses = computed(() => ({
        'g-snack__active': isActive.value,
				'g-snack__absolute': props.absolute,
        'g-snack__bottom': props.bottom || !props.top,
        'g-snack__left': props.left,
        'g-snack__right': props.right,
        'g-snack__top': props.top,
			}));

			const snackStyles = computed(() => ({
				top: props.positionTop,
        bottom: props.positionBottom,
			}))

			// Styling
			const colorOutput = computed(() => {
        return setBackgroundColor(props.color, {})
      })

			const wrapperClasses = computed(() => colorOutput.value.class);
			const wrapperStyles = computed(() => ({
				...colorOutput.value.style,
        marginLeft: props.positionLeft,
        marginRight: props.positionRight,
			}));

      return {
        isActive,
				snackClasses,
				wrapperClasses,
				wrapperStyles,
				snackStyles,
      }
		}
  }
</script>

<style scoped>

</style>