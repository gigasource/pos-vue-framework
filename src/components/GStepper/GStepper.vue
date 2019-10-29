<template>
  <div :class="classes">
    <g-stepper-header>
      <template v-for="(step, index) in steps">
        <g-stepper-step @click="toggleItem" :step="step" :disabled="step" :editable="step.editable" :complete="step.complete">
          <slot name="step">Step {{index + 1}}</slot>
        </g-stepper-step>
        <g-divider v-if="index !== steps.length-1"></g-divider>
      </template>
    </g-stepper-header>
    <slot></slot>
  </div>
</template>

<script>
  import { computed, ref } from '@vue/composition-api';
  import groupable from '../../mixins/groupable';
  import getVModel from '../../mixins/getVModel';
  import GStepperContents from './GStepperContent';
  import GStepperHeader from './GStepperHeader';
  import GStepperStep from './GStepperStep';
  import GDivider from '../GLayout/GDivider';
  import GStepperContent from './GStepperContents';
  import GSpacer from '../GLayout/GSpacer';
  import GCard from '../GCard/GCard';

  export default {
    name: 'GStepper',
    components: { GCard, GSpacer, GStepperContent, GDivider, GStepperStep, GStepperHeader, GStepperContents },
    props: {
      altLabels: Boolean,
      nonLinear: Boolean,
      steps: Array,
      vertical: Boolean,
      value: [Number, String, Boolean, Object],
      contents: Array
    },
    setup(props, context) {

      let isBooted = ref(false);
      let content = ref([]);
      let isReverse = ref(false);

      // provide('vertical', props.vertical);
      // provide('stepClick', stepClick);
      // provide('register', register);
      // provide('unregister', unregister);

      let classes = computed(() => ({
        'g-stepper': true,
        'g-stepper__is-booted': isBooted.value,
        'g-stepper__vertical': props.vertical,
        'g-stepper__alt-labels': props.altLabels,
        'g-stepper__non-linear': props.nonLinear,
      }));

      //let internalLazyValue = ref([]);

      // //TODO: CURRENTLY NOT THE SAME AS VUETIFY
      // onMounted(() => {
      //   internalLazyValue.value = props.value || (steps.value[0]) || 1;
      //   updateView()
      // });

      // //model
      // let internalValue = computed({
      //   get: () => {
      //     return internalLazyValue
      //   },
      //   set: (val) => {
      //     if (val === internalLazyValue) {
      //       return
      //     }
      //
      //     internalLazyValue = val;
      //     context.emit('input', val);
      //   }
      // });
      //
      // watch(internalValue, (val, oldVal) => {
      //   isReverse.value = Number(val) < Number(oldVal);
      //   oldVal && (isBooted.value = true);
      //   updateView()
      // });

      // function register(item) {
      //   if (item.$options.name === 'v-stepper-step') {
      //     steps.value.push(item)
      //   } else if (item.$options.name === 'v-stepper-content') {
      //     item.isVertical = props.vertical;
      //     content.value.push(item)
      //   }
      // };
      //
      // function unregister(item) {
      //   if (item.$options.name === 'v-stepper-step') {
      //     steps.value = steps.value.filter((i) => i !== item)
      //   } else if (item.$options.name === 'v-stepper-content') {
      //     (item).isVertical = props.vertical;
      //     content.value = content.value.filter((i) => i !== item)
      //   }
      // };


      // function stepClick(step) {
      //   context.root.$nextTick(() => (internalValue.value = step))
      // };

      // function updateView() {
      //   for (let index = steps.value.length; --index >= 0;) {
      //     steps.value[index].toggle(internalValue);
      //   }
      //   for (let index = content.value.length; --index >= 0;) {
      //     content.value[index].toggle(internalValue, isReverse.value);
      //   }
      // };

      const { model } = getVModel(props, context);
      const { toggleItem, isActiveItem } = groupable({ mandatory: true, multiple: false }, model);

      return {
        classes,
        isBooted,
        content,
        isReverse,
        //internalLazyValue,
        model,
        toggleItem,
        isActiveItem
      }
    }
  }
</script>

<style scoped>

</style>
