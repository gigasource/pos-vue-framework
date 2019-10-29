<template>
  <div :class="classes" @click="click" :toggle="click" :step="step" :complete="complete">
    <span class="g-stepper__step__step">
      <g-icon v-if="complete && editable">create</g-icon>
      <g-icon v-if="hasError">warning</g-icon>
      <g-icon v-if="complete && !editable">done</g-icon>
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
      step: null,
    }, setup(props, context) {
      //reactive data
      let isActive = ref(false);
      let isInactive = ref(true);
      // let register = inject('register');
      // let unregister = inject('unregister');
      // let stepClick = inject('stepClick');

      let classes = computed(() => ({
        'g-stepper__step': true,
        'g-stepper__step__active': isActive.value,
        'g-stepper__step__editable': props.editable,
        'g-stepper__step__inactive': isInactive.value,
        'g-stepper__step__error error--text': hasError.value,
        'g-stepper__step__complete': props.complete,

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
