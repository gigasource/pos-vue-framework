<template>
	<div class="g-switch-wrapper">
		<label class="g-switch-container" :class="containerClasses" @click.prevent="activate">
			<input type="checkbox">
			<span class="g-switch" :class="classes" :style="styles">
				<span class="g-switch-track"></span>
				<span class="g-switch-thumb"></span>
			</span>
			<slot name="label">
				<span class="g-switch-label">{{label}}</span>
			</slot>
		</label>
	</div>
</template>

<script>
  import { computed, ref, watch } from '@vue/composition-api';
  import colorHandler from '../../mixins/colorHandler';

  export default {
    name: 'GSwitch',
    model: {
      prop: 'inputValue'
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
      value: null
    },
    setup(props, context) {
      const isSelectedArray = Array.isArray(props.inputValue);
      //value return when switch active
      const value = computed(() => (
        props.value
					? props.value
					: (props.inputValue && !isSelectedArray ? props.inputValue : true)
				));
      let isActive = ref(false);
      //set active state if inputValue is an array
      if (props.inputValue && isSelectedArray) {
        isActive.value = props.inputValue.some(v => v === value.value)
      } else if (props.inputValue === true
									|| props.inputValue === 'true'
									|| (props.inputValue === value.value)) { //switch on if inputValue correct
        isActive.value = true;
      }
			//define props color
      const { getColorType, convertColorClass } = colorHandler(props.color);
      const type = getColorType();
      const colorClass = convertColorClass('background');

      const classes = computed(() => ({
        [colorClass]: !!type && type === 'class',
        'g-switch__active': isActive.value,
        'g-switch__flat': props.flat,
        'g-switch__inset': props.inset
      }));

      const styles = computed(() => {
        const styles = {};
        if (type === 'style') {
          Object.assign(styles, { 'color': props.color });
        }
        return styles;
      });

      const containerClasses = computed(() => ({
        readonly: props.readonly,
				disabled: props.disabled,
			}));

      function activate() {
        isActive.value = !isActive.value;
        //check whether the switch is in multiple input or not
        if (isSelectedArray) {
          const arrValue = props.inputValue;
          const index = arrValue.findIndex(v => v === value.value);
          if (isActive.value && index === -1) {//on && not found
            arrValue.push(value.value);
          } else if (!isActive.value && index > -1) {//off & found
            arrValue.splice(index, 1);
          }
          context.emit('input', arrValue);
        } else {
          if (isActive.value) {//on
            context.emit('input', value.value);
          } else {//off
            context.emit('input', null);
          }
        }
      }

      return {
        classes,
        styles,
        containerClasses,
        isActive,
        activate
      }
    }
  }
</script>

<style scoped>

</style>