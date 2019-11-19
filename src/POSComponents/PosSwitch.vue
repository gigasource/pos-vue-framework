<template>
	<div class="g-switch-wrapper" :class="containerClasses">
		<slot name="label">
			<p class="g-switch-label">{{label}}</p>
		</slot>
		<div class="g-switch-container" @click.prevent="toggle">
			<input type="checkbox">
			<span class="g-switch" :class="classes" :style="styles">
				<span class="g-switch-track"></span>
				<span class="g-switch-thumb"></span>
			</span>
		</div>
	</div>
</template>

<script>
  import { computed, ref, watch } from '@vue/composition-api';
  import colorHandler from '../utils/helpers';
  import { isEqual } from 'lodash';

  export default {
    name: 'PosSwitch',
    model: {
      prop: 'inputValue',
      event: 'change'
    },
    props: {
      label: String,
      color: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      inset: Boolean,
      flat: Boolean,
      //custom v-model
      inputValue: null,
      //native value
      value: null,
			dense: Boolean,
    },
    setup(props, context) {
      const internalValue = computed({
        get: () => props.inputValue,
        set: val => {
          context.emit('change', val)
        }
      });
      const isSelectedArray = Array.isArray(internalValue.value);
      //value return when switch active
      const trueValue = props.value ? props.value : true;
      let isActive = ref(false);
      watch(() => internalValue.value, (newVal) => {
        if (newVal && isSelectedArray) {
          isActive.value = newVal.some(v => v === trueValue);
        } else if (newVal === true || newVal === 'true' || (newVal === trueValue)) {
          isActive.value = true;
        } else {
          isActive.value = false;
        }
      });

      //define props color
      const { getColorType, convertColorClass } = colorHandler();
      const type = computed(() => getColorType(props.color));
      const colorClass = computed(() => convertColorClass(props.color, 'background'));

      const classes = computed(() => ({
        [colorClass.value]: !!type.value && type.value === 'class',
        'g-switch__active': isActive.value,
        'g-switch__flat': props.flat,
        'g-switch__inset': props.inset,
      }));

      const styles = computed(() => {
        const styles = {};
        if (type.value === 'style') {
          Object.assign(styles, { 'background-color': props.color });
        }
        return styles;
      });

      const containerClasses = computed(() => ({
        readonly: props.readonly,
        disabled: props.disabled,
        'g-switch__dense': props.dense
      }));

      function toggle() {
        isActive.value = !isActive.value;
        //check whether the switch is in multiple input or
        if (isSelectedArray) {
          const index = internalValue.value.findIndex(v => isEqual(v, trueValue));
          if (isActive.value && index === -1) {//on && not found
            internalValue.value.push(trueValue);
          } else if (!isActive.value && index > -1) {//off & found
            internalValue.value.splice(index, 1);
          }
        } else {
          if (isActive.value) {//on
            internalValue.value = trueValue;
          } else {//off
            internalValue.value = null;
          }
        }
      }

      return {
        classes,
        styles,
        containerClasses,
        isActive,
        toggle
      }
    }
  }
</script>

<style scoped lang="scss">
	.g-switch {
		background-color: #1271ff;

		&-wrapper {
			margin: 12px 4px;
		}

		&-container {
			position: relative;
			padding-left: 32px;
			cursor: pointer;
			user-select: none;
			-webkit-tap-highlight-color: transparent;
			font-family: "Muli", sans-serif;
			font-weight: 400;
			background-clip: content-box;
			font-size: 16px;
			display: inline-flex;
		}

		&-container input {
			opacity: 0;
			width: 0;
			height: 0;
			margin: 4px;
		}


		&-track {
			position: absolute;
			top: 4px;
			left: 0;
			width: 36px;
			height: 14px;
			background-color: #000;
			border-radius: 9999px;
			opacity: 0.38;
		}

		&-thumb {
			position: absolute;
			top: 1px;
			left: 0;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background-color: #F1F1F1;
			box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.2);
			transition: 0.5s;
		}

		&-thumb:before {
			content: '';
			position: absolute;
			top: -50%;
			left: -50%;
			width: 200%;
			height: 200%;
			border-radius: 50%;
			opacity: 0;
			z-index: -1;
		}

		&__active &-thumb {
			transform: translateX(80%);
		}

		&__active &-track,
		&__active &-thumb {
			background-color: inherit;
		}

		&:hover > &-thumb:before {
			opacity: 0.2;
			background-color: #878787;
		}

		&.g-switch__active:hover > &-thumb:before {
			opacity: 0.2;
			background-color: inherit;
		}

		&-label {
			margin-bottom: 8px;
			font-size: 13px;
			line-height: 16px;
		}

		&__flat &-thumb:before {
			display: none !important;
		}

		&__inset {
			.g-switch-track {
				top: -4px;
				left: -4px;
				height: 28px;
				width: 44px;
				opacity: 0.2;
			}

			.g-switch-thumb {
				top: 0;
			}

			.g-switch-thumb:before {
				display: none;
			}

			~ .g-switch-label {
				padding-top: 2px;
			}
		}

		&__dense {
			.g-switch-label {
				margin-bottom: 0;
			}
		}
	}
</style>