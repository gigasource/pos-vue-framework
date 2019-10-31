<template>
  <div :class="classes" @click="click">
    <div :style="iconStyles">
      <g-icon v-if="complete && editable">{{editIcon}}</g-icon>
      <g-icon v-else-if="hasError">{{errorIcon}}</g-icon>
      <g-icon v-else-if="complete && !editable">{{completeIcon}}</g-icon>
			<div v-else class="g-stepper-step-icon" :style="iconBackground">{{index + 1}}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  import { computed } from '@vue/composition-api';
  import GIcon from '../GIcon/GIcon';
  import { isCssColor } from '../../mixins/colorable';
  import { colors } from '../../utils/colors';

  export default {
    name: 'GStepperStep',
    components: { GIcon },
    props: {
      color: {
        type: String,
        default: '#1976d2',
      },
      complete: Boolean,
      completeIcon: {
        type: String,
        default: 'done',
      },
      editable: Boolean,
      editIcon: {
        type: String,
        default: 'mdi-pencil-circle',
      },
      errorIcon: {
        type: String,
        default: 'warning',
      },
      rules: {
        type: Array,
        default: () => [],
      },
      isActive: Boolean,
      step: null,
			index: Number,
    },
    setup(props, context) {

      let classes = computed(() => ({
        'g-stepper-step': true,
        'g-stepper-step__active': props.isActive,
        'g-stepper-step__error': hasError.value,
        'g-stepper-step__complete': props.complete,
      }));

      let hasError = computed(() => {
        return props.rules.some(validate => validate() !== true);
      });

      function click(e) {
        e.stopPropagation();
        context.emit('click', props.step);
      }

			const iconStyles = computed(() => ({
      	'color':!hasError.value && (isCssColor(props.color) ? props.color : colors[props.color.split(' ').join('-')]),
				'margin-right' : '4px'
			}))

      const iconBackground = computed(() => ({
        'background-color': props.isActive && !hasError.value && isCssColor(props.color) ? props.color : colors[props.color.split(' ').join('-')],
      }))

      return {
        classes,
        click,
        hasError,
        iconStyles,
        iconBackground,
      }
    }
  }
</script>

<style scoped>

</style>
