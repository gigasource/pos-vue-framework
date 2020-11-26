<script>
  import GIcon from '../../GIcon/GIcon';
  import { enterPressed } from '../../../utils/keyboardHelper';
  import { reactive, computed, ref } from 'vue';
  import { getScopeIdRender } from '../../../utils/helpers';

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
    events: ['input, click'],
    setup(props, context) {
      const state = reactive({
        showSwitch: false,
        showEditMode: false
      })

      const cptEditViewInputWidth = computed(() => ({
        width: props.width
      }))

      const refIdComponentWrapper = 'wrapper'
      const wrapper = ref(null)
      
      const refIdInput = 'input'
      const input = ref(null)

      function onComponentClicked(e) {
        if (e.target === wrapper.value)
          context.emit('click')
      }
      function onSwitchStateClicked() {
        input.value.focus()
        state.showEditMode = true
      }
      function showSwitch() {
        state.showSwitch = true
      }
      function hideSwitch() {
        state.showSwitch = false
        state.showEditMode = false
        input.value.blur()
      }

      function vOnKeyUp(e) {
        if (enterPressed(e)) {
          context.emit('input', e.target.value)
          input.value.blur()
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
                vShow={state.showSwitch}
                onClick={onSwitchStateClicked}>
              <g-icon small>edit</g-icon>
            </span>
          </div>

          <input
              ref={refIdInput}
              style={cptViewStyle.value}
              value={props.value}
              onKeyup={vOnKeyUp}
          />
        </div>
      }
      
      return {
        wrapper,
        input,
        renderFn
      }
    },
    render() {
      return this.renderFn()
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
