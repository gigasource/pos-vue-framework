<script>
  import { computed, onMounted, reactive, ref, watch, provide } from '@vue/composition-api';
  import groupable from '../../mixins/groupable';
  import getVModel from '../../mixins/getVModel';
  import GStepperContents from './GStepperContent';
  import { GStepperHeader } from './GStepperFunctionalComponent';
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
      const content = ref([]);
      const isReverse = ref(false);

      const classes = computed(() => ({
        'g-stepper': true,
        'g-stepper__alt-labels': props.altLabels,
        'g-stepper__vertical': props.vertical,
        'g-stepper__editable': props.editable,
        'g-stepper__non-linear': props.nonLinear,
      }));

      const internalData = reactive({ steps: props.steps, step: model });

      onMounted(() => {
        model.value = props.value || internalData.steps[0];
      });

      const completes = ref([]);
      for (let step of props.steps) {
        completes.value.push(false);
      }

      const model = getVModel(props, context);
      const { toggleItem, isActiveItem } = groupable({ mandatory: true, multiple: false }, model);

      watch(() => model.value, (newVal, oldVal) => {
        const oldIndex = props.steps.findIndex(s => s === oldVal);
        completes.value[oldIndex] = true
      }, { lazy: true, flush: 'pre' });

      let isCompleted = function (index) {
        return props.nonLinear ? completes.value[index] : Number(index) < props.steps.findIndex((i) => i === model.value);
      };

      function genStepSlot(index) {
        return context.slots.step ? context.slots.step() : `Step ${index + 1}`
      }

      function genStep(step, index) {
        const nodeData = {
          props: {
            complete: isCompleted(index),
            editable: props.editable,

            index: index,
            isActive: isActiveItem(step),
            step: step
          },
          on: {
            click: toggleItem
          }
        };

        return <g-stepper-step {...nodeData}>
          {genStepSlot(index)}
        </g-stepper-step>
      }

      function genDivider() {
        return context.slots.divider ? context.slots.divider() : <g-divider/>
      }

      function genHeader() {
        return context.slots.header ? context.slots.header({ isCompleted, isActiveItem, toggle: toggleItem }) : <g-stepper-header ref="header">
          {props.steps.map((step, index) => ([
            genStep(step, index),
            index !== props.steps.length - 1 ? genDivider() : null
          ]))}
        </g-stepper-header>
      }

      function genStepper() {
        return <div class={classes.value}>
          {genHeader()}
          {context.slots.default()}
        </div>
      }

      function genContent() {
        return context.slots.default && context.slots.default()
      }

      function genVerticalStepper() {
        return <div class={classes.value} style="display: block">
          {props.steps.map((step, index) => ([
            genStep(step, index),
            isActiveItem(step) && genContent()
          ]))}
        </div>
      }

      return {
        genStepper,
        genVerticalStepper
      }
    }, render() {
      return this.vertical ? this.genVerticalStepper() : this.genStepper();
    }
  }
</script>

<style scoped>

</style>
