<template>
  <div :class="classes">
    <div v-if="vertical" style="display: flex;">
      <g-stepper-header ref="header" style="display: flex; flex-direction: column; flex:0 1 0;">
        <template v-for="(step, index) in steps">
          <g-stepper-step @click="toggleItem" :step="step" :disabled="step" :editable="step.editable" :isActive="isActiveItem(step)" :isInactive="isInactive(step)" :complete="isCompleted(index)">
            <slot name="step">Step {{index + 1}}</slot>
          </g-stepper-step>
          <g-divider v-if="index !== steps.length-1" vertical></g-divider>
        </template>
      </g-stepper-header>
      <slot></slot>
    </div>
    <div v-else style="display: flex; flex-direction: column;">
      <g-stepper-header ref="header">
        <template v-for="(step, index) in steps">
          <g-stepper-step @click="toggleItem" :step="step" :disabled="step" :editable="step.editable" :isActive="isActiveItem(step)" :isInactive="isInactive(step)" :complete="isCompleted(index)">
            <slot name="step">Step {{index + 1}}</slot>
          </g-stepper-step>
          <g-divider v-if="index !== steps.length-1"></g-divider>
        </template>
      </g-stepper-header>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { computed, onMounted, reactive, ref, watch } from '@vue/composition-api';
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

      let classes = computed(() => ({
        'g-stepper': true,
        'g-stepper__is-booted': isBooted.value,
        'g-stepper__vertical': props.vertical,
        'g-stepper__alt-labels': props.altLabels,
        'g-stepper__non-linear': props.nonLinear,
      }));

      let internalData = reactive({ steps: props.steps, step: model });

      // //TODO: CURRENTLY NOT THE SAME AS VUETIFY
      onMounted(() => {
        model.value = props.value || internalData.steps[0];
      });

      watch(() => internalData.step, (val, oldVal) => {
        oldVal && (isBooted.value = true);
      });


      let isCompleted = function (index) {
        return Number(index) < props.steps.findIndex((i) => i === model.value);
      };

      let isInactive = function (step) {
        return props.steps.findIndex((i) => i === model.value) < props.steps.findIndex((i) => i === step);
      };

      const { model } = getVModel(props, context);
      const { toggleItem, isActiveItem } = groupable({ mandatory: true, multiple: false }, model);

      return {
        classes,
        isBooted,
        content,
        isReverse,
        model,
        toggleItem,
        isActiveItem,
        isInactive,
        isCompleted,
      }
    }
  }
</script>

<style scoped>

</style>
