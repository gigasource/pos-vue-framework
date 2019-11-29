<script>
  import GTextField from '../GInput/GTextField';
  import GMenu from '../../components/GMenu/GMenu';
  import GColorPicker from './GColorPicker'
  import { reactive, watch } from '@vue/composition-api'

  GMenu.components['GTextField'] = GTextField

  export default {
    name: 'GColorPickerInput',
    components: { GMenu, GColorPicker },
    props: {
      label: String,
      disabled: Boolean,
      ...{
        filled: Boolean,
        outlined: Boolean,
        solo: Boolean,
        shaped: Boolean,
        rounded: Boolean,
        flat: Boolean,
        dense: Boolean
      },
      value: String
    },
    setup(props, context) {
      const state = reactive({
        value: props.value,
        showMenu: false
      })

      watch(() => props.value, () => state.value = props.value)

      function updateColor(color) {
        if (color.angle) {
          state.value = `linear-gradient(${color.angle}, ${color.colorStop1}, ${color.colorStop2})`
        } else if (color.value) {
          state.value = color.value
        } else {
          state.value = color
        }
        context.emit('input', state.value)
      }

      const previewStyle = {
        width: '30px',
        height: '20px',
        margin: '16px 0px 24px -30px',
        border: '1px solid #0003'
      }

      const gMenuScopedSlots = {
        activator: gMenuScope =>
            <div style='display: flex; align-items: center;'>
              <g-text-field
                  label={props.label}
                  value={state.value}
                  disabled={props.disabled}
                  prependIcon="fas fa-palette"
                  vOn:click={gMenuScope.toggleContent}
                  filled={props.filled}
                  outlined={props.outlined}
                  solo={props.solo}
                  shaped={props.shaped}
                  rounded={props.rounded}
                  flat={props.flat}
                  dense={props.dense}/>
              <span style={{ ...previewStyle, background: state.value }}></span>
            </div>
      }

      return () => {
        return <g-menu
            value={state.showMenu}
            vOn:input={v => state.showMenu = v}
            scopedSlots={gMenuScopedSlots}
            minWidth={320}
            maxWidth={320}
            contentFillWidth={false}
            closeOnClick>
          <g-color-picker vOn:color={updateColor}/>
        </g-menu>
      }
    }
  }
</script>
<style scoped>
</style>
