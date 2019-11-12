<script>
  import GIcon from '../GIcon/GIcon';
  import { enterPressed } from '../../utils/keyboardHelper';
  import { reactive, computed } from '@vue/composition-api';

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
      }
    },
    setup(props, context) {
      const state = reactive({
        showSwitch: false,
        showEditMode: false
      })

      const editStyle = {
        display: 'inline-block',
        'box-sizing': 'border-box',
        'user-select': 'none',
        border: '2px solid transparent',
        backgroundColor: 'transparent',
        flex: 1
      }

      const viewStyle = {
        ...editStyle,
        padding: '1px',
        'pointer-events': 'none'
      }

      const cptEditViewInputStyle = computed(() => ({
        width: props.width
      }))

      return function () {
        return <div
            class="g-edit-view-input"
            style={ cptEditViewInputStyle.value }
            ref="el"
            vOn:click={(e) => {
              if (e.target === context.refs.el)
                context.emit('click')
            }}
            vOn:mouseenter={() => {
              state.showSwitch = true
            }}
            vOn:mouseleave={() => {
              state.showSwitch = false
              state.showEditMode = false
              context.refs.input.blur()
            }}>
          <div style="width: 16px; line-height: 16px">
            {
              <span vShow={state.showSwitch}
                    vOn:click={() => {
                      context.refs.input.focus()
                      state.showEditMode = true
                    }}>
                <g-icon small>edit</g-icon>
              </span>
            }
          </div>

          <input style={state.showEditMode ? editStyle : viewStyle}
                 value={props.value}
                 ref="input"
                 vOn:keypress={e => {
                   context.emit('input', e.target.value)
                   state.showEditMode = false

                   if (enterPressed(e)) {
                     context.refs.input.blur()
                     state.showSwitch = false
                   }
                 }}/>

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

      &:focus {
        outline: none;
      }
    }

    & > div > span {
      cursor: pointer;
    }
  }
</style>
