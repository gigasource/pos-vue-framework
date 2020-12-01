<script>
  import { computed } from 'vue';
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
        default: 'edit',
      },
      error: Boolean,
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
        'waves-effect': true,
        'g-stepper-step__active': props.isActive,
        'g-stepper-step__error': props.error,
        'g-stepper-step__complete': props.complete,
      }));

      const iconStyles = computed(() => ({
        'color': !props.error && (isCssColor(props.color) ? props.color : colors[props.color.split(' ').join('-')]),
        'margin-right': '4px'
      }))

      const iconBackground = computed(() => ({
        'background-color': props.isActive && !props.error && isCssColor(props.color) ? props.color : colors[props.color.split(' ').join('-')],
      }))

      function genIcon() {

        if (props.error) {
          return <g-icon>{props.errorIcon}</g-icon>
        } else if (props.complete) {
          return <g-icon>{props.editable ? props.editIcon : props.completeIcon}</g-icon>
        }

        return <div style={iconBackground.value} class="g-stepper-step-icon">{props.index + 1}</div>
      }

      function genStepperStep() {
        return <div class={classes.value}>
          <div style={iconStyles.value}>{genIcon()}</div>
          {context.slots.default ? context.slots.default() : null}
        </div>
      }

      return {
        genStepperStep,
      }
    },
    render() {
      return this.genStepperStep()
    }
  }
</script>

<style scoped>

</style>
