<script>
  // Consider:
  // Allow the user input value directly without showing time picker dialog
  // Support g-text-field props

  import GTextField from '../GInput/GTextField'
  import GTimePicker from './GTimePicker'
  import GMenu from '../GMenu/GMenu'
  import {reactive, watch, nextTick, ref} from 'vue';
  import _ from 'lodash'

  GMenu.components['GTextField'] = GTextField

  export default {
    name: 'GTimePickerInput',
    components: { GMenu, GTimePicker, GTextField },
    props: {
      // common props
      ...{
        disabled: Boolean,
        readonly: Boolean,
      },

      // g-text-field-props
      ...{
        label: String,
        required: Boolean,
        filled: Boolean,
        outlined: Boolean,
        solo: Boolean,
        shaped: Boolean,
        rounded: Boolean,
        flat: Boolean,
        dense: Boolean,
        clearable: Boolean,
        showIcon: Boolean,
        prependIcon: String,
        prependInnerIcon: String,
        appendIcon: String,
        appendInnerIcon: String
      },

      // time picker props
      ...{
        use24Hours: Boolean,
        value: String,
        useSeconds: Boolean,
        scrollable: Boolean,
        landscape: Boolean,
        titleBgColor: String,
        titleTextColor: String,
        clockWrapperColor: String,
        clockFaceColor: String,
        clockNumberColor: String,
        clockSelectedNumberColor: String,
        clockHandColor: String
      }
    },
    emits: ['input'],
    setup(props, context) {
      const state = reactive({
        showMenu: false,
        value: props.value || '',
      })

      watch(() => props.value, newVal => {
        state.value = newVal ? String(newVal).trim() : ''
      })

      const updateInput = (value) => {
        state.value = value
        context.emit('input', value)
      }
      
      const time_picker = ref(null)
      const refIdTimePicker = 'time_picker'
      const openTimePickerDialog = (e, clickHandler) => {
        clickHandler(e)
        nextTick(() => {
          time_picker.value && time_picker.value.showHoursPicker()
        })
      }
      
      const closeTimePickerDialog = () => state.showMenu = false
      const renderTimePickerInput = () => {
        return <g-menu
            value={state.showMenu}
            onInput={v => state.showMenu = v}
            contentFillWidth={false}
            minWidth={300}
            nudgeBottom={10}
            scopedSlots={{
              activator: ({on}) =>
                  <g-text-field
                      {...{
                        props: {
                          ..._.pick(props, [
                            'disabled', 'readonly', 'required', 'clearable',
                            'label', 'prependIcon', 'prependInnerIcon', 'appendIcon', 'appendInnerIcon',
                            'filled', 'outlined', 'solo', 'shaped', 'rounded', 'flat', 'dense'
                          ]),
                          value: state.value,
                          ...props.showIcon && { prependIcon: 'access_time' },
                        }
                      }}
                      onClick={e => openTimePickerDialog(e, on.click)}
                      onInput={e => e.trim() && updateInput(e)}
                  />
            }}>
          <g-time-picker
              ref={refIdTimePicker}
              {...{
                props: {
                  ..._.pick(props, [
                    'disabled', 'readonly',
                    'use24Hours', 'useSeconds',
                    'landscape', 'scrollable',
                    'clockHandColor', 'clockFaceColor', 'clockNumberColor', 'clockSelectedNumberColor', 'titleTextColor', 'titleBgColor', 'clockWrapperColor',
                  ]),
                  value: state.value
                }
              }}
              onInput={updateInput}
              onTimeselected={closeTimePickerDialog}
          />
        </g-menu>
      }

      return {
        time_picker,
        state,
        renderTimePickerInput
      }
    },
    
    render() {
      return this.renderTimePickerInput()
    }
  }
</script>
