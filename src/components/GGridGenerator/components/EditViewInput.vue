<script>
  import GIcon from '../../GIcon/GIcon';
  import { enterPressed } from '../../../utils/keyboardHelper';
  import { reactive, computed } from 'vue';

  export default {
    name: 'GEditViewInput',
    components: { GIcon },
    props: {
      value: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '150px'
      },
      // emit input immediately
      reactive: {
        type: Boolean,
        default: false
      }
    },
    setup(props, context) {
      const state = reactive({
        showSwitch: false,
        showEditMode: false
      })

      const cptEditViewInputWidth = computed(() => ({
        width: props.width
      }))

      const refIdComponentWrapper = 'wrapper'
      const refIdInput = 'input'

      function onComponentClicked(e) {
        if (e.target === context.refs[refIdComponentWrapper])
          context.emit('click')
      }
      function onSwitchStateClicked() {
        context.refs[refIdInput].focus()
        state.showEditMode = true
      }
      function showSwitch() {
        state.showSwitch = true
      }
      function hideSwitch() {
        state.showSwitch = false
        state.showEditMode = false
        context.refs[refIdInput].blur()
      }

      function vOnKeyUp(e) {
        if (enterPressed(e)) {
          context.emit('input', e.target.value)
          context.refs[refIdInput].blur()
          state.showSwitch = false
        } else if (props.reactive) {
          context.emit('input', e.target.value)
        }
      }

      const cptViewStyle = computed(() => {
        return state.showEditMode ? null : {
          'pointer-events': 'none'
        }
      })

      return function () {
        return <div
            ref={refIdComponentWrapper}
            class="g-edit-view-input"
            style={cptEditViewInputWidth.value}
            vOn:click={onComponentClicked}
            vOn:mouseenter={showSwitch}
            vOn:mouseleave={hideSwitch}>
          <div style="width: 16px; line-height: 16px">
            <span
                vShow={state.showSwitch}
                vOn:click={onSwitchStateClicked}>
              <g-icon small>edit</g-icon>
            </span>
          </div>

          <input
              ref={refIdInput}
              style={cptViewStyle.value}
              value={props.value}
              vOn:keyup={vOnKeyUp}
          />
        </div>
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-edit-view-input {
    display: flex;
    border-radius: 3px;
    justify-content: stretch;

    &:hover {
      cursor: pointer;
    }

    & > input {
      flex: 1;
      display: inline-block;
      user-select: none;
      border: 2px solid transparent;
      background-color: transparent;

      &:focus {
        outline: none;
      }
    }

    & > div > span {
      cursor: pointer;
    }
  }
</style>
