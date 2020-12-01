<script>
  import GIcon from '../../GIcon/GIcon';
  import { enterPressed } from '../../../utils/keyboardHelper';
  import { reactive, computed, ref, getCurrentInstance } from 'vue';
  import { getScopeIdRender } from '../../../utils/helpers';

  export default {
    name: 'GEditViewInput',
    components: { GIcon },
    props: {
      modelValue: {
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
    events: ['update:modelValue', 'click'],
    setup(props, context) {
      const currentInstance = getCurrentInstance()
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
        if (e.target === currentInstance.refs[refIdComponentWrapper].value)
          context.emit('click')
      }
      function onSwitchStateClicked() {
        currentInstance.refs[refIdInput].focus()
        state.showEditMode = true
      }
      function showSwitch() {
        state.showSwitch = true
      }
      function hideSwitch() {
        state.showSwitch = false
        state.showEditMode = false
        currentInstance.refs[refIdInput].blur()
      }

      function vOnKeyUp(e) {
        if (enterPressed(e)) {
          context.emit('update:modelValue', e.target.value)
          currentInstance.refs[refIdInput].blur()
          state.showSwitch = false
        } else if (props.reactive) {
          context.emit('update:modelValue', e.target.value)
        }
      }

      const cptViewStyle = computed(() => {
        return state.showEditMode ? null : {
          'pointer-events': 'none'
        }
      })

      function renderFn() {
        return <div
            ref={refIdComponentWrapper}
            class="g-edit-view-input"
            style={cptEditViewInputWidth.value}
            onClick={onComponentClicked}
            onMouseenter={showSwitch}
            onMouseleave={hideSwitch}>
          <div style="width: 16px; line-height: 16px">
            <span
                v-show={state.showSwitch}
                onClick={onSwitchStateClicked}>
              <g-icon small>edit</g-icon>
            </span>
          </div>

          <input
              ref={refIdInput}
              style={cptViewStyle.value}
              value={props.modelValue}
              onKeyup={vOnKeyUp}
          />
        </div>
      }
      
      return {
        state,
        renderWithScope: getScopeIdRender()(renderFn)
      }
    },
    render() {
      return this.renderWithScope()
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
