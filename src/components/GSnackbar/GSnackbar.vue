<template>
	<transition name="g-snack-transition">
		<div v-if="isActive"
				 class="g-snack"
				 :class="snackClasses">
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
  import { getInternalValue } from '../../mixins/getVModel';
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
        top: Boolean,
        bottom: Boolean,
        left: Boolean,
        right: Boolean,
      },

			// Styling
			color: String,
		},
		setup(props, context) {
      const isActive = getInternalValue(props, context);
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
        'g-snack__bottom': !props.top,
        'g-snack__left': props.left,
        'g-snack__right': props.right,
        'g-snack__top': props.top,
			}));

			// Styling
			const colorOutput = computed(() => {
        return setBackgroundColor(props.color, {})
      })

			const wrapperClasses = computed(() => colorOutput.value.class);
			const wrapperStyles = computed(() => colorOutput.value.style);

      return {
        isActive,
				snackClasses,
				wrapperClasses,
				wrapperStyles,
      }
		}
  }
</script>

<style scoped lang="scss">
	@import './_variables.scss';
	@import '../../style/elevation.scss';

	.g-snack {
		align-items: center;
		color: $snackbar-color;
		display: flex;
		font-size: 14px;
		left: 8px;
		pointer-events: none;
		position: fixed;
		right: 8px;
		text-align: left;
		z-index: 1000;
		transition-duration: .15s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		&__absolute {
			position: absolute
		}

		&__top {
			top: 8px
		}

		&__bottom {
			bottom: 8px
		}

		&-wrapper {
			align-items: center;
			background-color: $snackbar-background-color;
			border-radius: 4px;
			display: flex;
			margin: 0 auto;
			pointer-events: auto;
			transition: inherit;
			transition-property: opacity, transform;
			min-width: 100%;
			@include elevation(6)
		}

		&-content {
			align-items: center;
			display: flex;
			min-height: 48px;
			justify-content: space-between;
			overflow: hidden;
			padding: 8px 16px;
			width: 100%;

			::v-deep.g-btn {
				color: $snackbar-color;
				flex: 0 0 auto;
				height: auto;
				margin: 0 -8px 0 24px;
				min-width: auto;
				padding: 8px;
				width: auto;

				&::before {
					display: none;
				}
			}
		}
	}

	@media only screen and (min-width: 600px) {
		.g-snack {
			&-wrapper {
				min-width: 344px;
				max-width: 672px;

				.g-snack__left & {
					margin-left: 0;
				}

				.g-snack__right & {
					margin-right: 0;
				}
			}

			&__content .v-btn:first-of-type {
				margin-left: 42px;
			}
		}
	}

	.g-snack-transition {
		&-enter {
			.g-snack-wrapper {
				transform: scale(.8);
			}
		}

		&-enter, &-leave-to {
			.g-snack-wrapper {
				opacity: 0;
			}
		}
	}
</style>