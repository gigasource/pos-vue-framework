<template>
	<button :class="classes" :style="styles" @click="onClick">
		<slot>{{text}}</slot>
	</button>
</template>

<script>
  import { computed } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GBtn',
    props: {
      fabRadius: [String, Number],
      raised: Boolean,
      depressed: Boolean,
      disabled: Boolean,
			rounded: Boolean,
      flat: Boolean,
      fab: Boolean,
			tile: Boolean,
      icon: Boolean,
      outlined: Boolean,
      dashed: Boolean,
      width: [String, Number],
      height: [String, Number],
      color: String,
      backgroundColor: String,
      text: String
    },
    setup(props, context) {
      let classes = computed(() => {
        return {
          'g-btn': true,
					'waves-effect': true,
          'g-btn__raised': props.raised,
          'g-btn__flat': props.flat,
          'g-btn__tile': props.tile,
          'g-btn-fab': props.fab,
          'g-btn__depressed': props.depressed,
          'g-btn__disabled': props.disabled,
          'g-btn__rounded': props.rounded,
          'g-btn-icon': props.icon,
          'g-btn__outlined': props.outlined,
          'g-btn__dashed': props.dashed
        }
      });
      let styles = computed(() => {
        return {
					...props.fab && props.fabRadius ? { 'width': convertToUnit(props.fabRadius * 2), 'height': convertToUnit(props.fabRadius * 2)} : null,
          ...props.backgroundColor ? { 'background-color': props.backgroundColor} : null,
          ...props.color ? { 'color': props.color } : null,
          ...props.width ? { 'width': convertToUnit(props.width) } : null,
          ...props.height ? { 'height': convertToUnit(props.height) } : null,
          ...props.flat ? {
            'border-color': 'transparent',
            'background-color': 'transparent'
          } : null,
        }
      });

      let onClick = (event) => {
        context.emit('click', event);
      };

      return {
        classes,
        styles,
        onClick
      }
    }
  }
</script>

<style scoped>

</style>
