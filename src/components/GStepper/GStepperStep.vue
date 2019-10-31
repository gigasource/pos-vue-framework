<template>
  <div :class="classes" @click="click" :complete="complete">
    <span class="g-stepper-step-icon">
      <g-icon v-if="complete && editable">create</g-icon>
      <g-icon v-else-if="hasError">warning</g-icon>
      <g-icon v-else-if="complete && !editable">done</g-icon>
    </span>
    <slot></slot>
  </div>
</template>

<script>
  import { computed, ref } from '@vue/composition-api';
  import GIcon from '../GIcon/GIcon';

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
        default: 'create',
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
      isInactive: Boolean,
      step: null,
    }, setup(props, context) {

      let classes = computed(() => ({
        'g-stepper-step': true,
        'g-stepper-step__active': props.isActive,
        'g-stepper-step__editable': props.editable,
        'g-stepper-step__inactive': props.isInactive,
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

      return {
        classes,
        click,
        hasError
      }
    }
  }
</script>

<style scoped>

</style>
