<template>
	<div :class="classes">
		<slot name="header" :toggle="toggleItem" :is-active-item="isActiveItem" :is-completed="isCompleted">
			<g-stepper-header ref="header">
				<template v-for="(step, index) in steps">
					<g-stepper-step @click="toggleItem" :step="step" :index="index" :isActive="isActiveItem(step)" :complete="isCompleted(index)" :editable="editable">
						<slot name="step">Step {{index + 1}}</slot>
					</g-stepper-step>
					<g-divider :vertical="vertical" v-if="index !== steps.length-1"></g-divider>
				</template>
			</g-stepper-header>
		</slot>
		<slot></slot>
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
      contents: Array,
      editable: Boolean,
    },
    setup(props, context) {

      let content = ref([]);
      let isReverse = ref(false);

      let classes = computed(() => ({
        'g-stepper': true,
        'g-stepper__alt-labels': props.altLabels,
        'g-stepper__vertical': props.vertical,
        'g-stepper__editable': props.editable,
        'g-stepper__non-linear': props.nonLinear,
      }));

      let internalData = reactive({ steps: props.steps, step: model });

      // //TODO: CURRENTLY NOT THE SAME AS VUETIFY
      onMounted(() => {
        model.value = props.value || internalData.steps[0];
      });

      const completes = ref([]);
      for(let step of props.steps) {
        completes.value.push(false);
			}

      const { model } = getVModel(props, context);
      const { toggleItem, isActiveItem } = groupable({ mandatory: true, multiple: false }, model);

      watch(() => model.value, (newVal, oldVal) => {
        const oldIndex = props.steps.findIndex(s => s === oldVal)
        completes.value[oldIndex] = true
      }, {lazy:true, flush: 'pre'})

      let isCompleted = function (index) {
        return props.nonLinear ? completes.value[index] : Number(index) < props.steps.findIndex((i) => i === model.value);
      };

      return {
        classes,
        content,
        isReverse,
        model,
        toggleItem,
        isActiveItem,
        isCompleted,
      }
    }
  }
</script>

<style scoped>

</style>
