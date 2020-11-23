<script>
  import getVModel from '../../mixins/getVModel';
  import GLayout from '../GLayout/GLayout';
  import { provide } from 'vue'

  export default {
    name: 'GStepperContents',
    props: {
      steps: Array,
      value: null
    },
    components: { GLayout },
    setup(props, context) {
      const model = getVModel(props, context);
      provide('model', model);

      function genStepperContents() {
        return <g-layout class="g-stepper-contents">
          {context.slots.default ? context.slots.default() : null}
        </g-layout>
      }

      return {
        genStepperContents,
      }
    }, render() {
        return this.genStepperContents();
    }
  }
</script>

<style scoped>

</style>
