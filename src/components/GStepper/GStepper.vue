<template>
  <div :class="classes">
    <g-stepper-header>
      <slot name="steps" :toggle="toggleItem" :active="isActiveItem"></slot>
    </g-stepper-header>
    <g-stepper-content v-model="model">
      <template v-slot:default="{isActive}">
        <slot name="content" :model="model"></slot>
      </template>
    </g-stepper-content>

  </div>
</template>

<script>
  import { computed, ref } from '@vue/composition-api';
  import groupable from '../../mixins/groupable';
  import getVModel from '../../mixins/getVModel';
  import GStepperContents from './GStepperContents';
  import GStepperHeader from './GStepperHeader';
  import GStepperStep from './GStepperStep';
  import GDivider from '../GLayout/GDivider';
  import GStepperContent from './GStepperContent';

  export default {
    name: 'GStepper',
    components: { GStepperContent, GDivider, GStepperStep, GStepperHeader, GStepperContents },
    props: {
      altLabels: Boolean,
      nonLinear: Boolean,
      steps: Number,
      vertical: Boolean,
      value: [Number, String, Boolean],
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
