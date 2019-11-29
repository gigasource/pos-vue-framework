<script>
  // Consider:
  // Allow the user input value directly without showing time picker dialog
  // Support g-text-field props

  import GTextField from '../GInput/GTextField'
  import GTimePicker from './GTimePicker'
  import GMenu from '../GMenu/GMenu'
  import { reactive, computed } from '@vue/composition-api';
  import { HourConvention, HourConventionValidator, getFormattedHours } from './logic/GTimePickerUtil';
  import dayjs from 'dayjs';
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
        dense: Boolean
      },

      // time picker props
      ...{
        hourConvention: {
          type: String,
          default: HourConvention._24HRS,
          validator: HourConventionValidator
        },
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
    setup(props, context) {
      // get initial time
      let initialTime;
      if (props.value) {
        initialTime = props.value
      } else if (props.useSeconds) {
        initialTime = dayjs().format('HH:mm:ss')
      } else {
        initialTime = dayjs().format('HH:mm')
      }

      // get period if any
      let initialPeriod;
      if (props.hourConvention === HourConvention._24HRS) {
        initialPeriod = ''
      } else if (initialTime < '12') {
        initialPeriod = 'AM'
      } else {
        initialPeriod = 'PM'
      }

      const state = reactive({
        showMenu: false,
        value: initialTime,
        period: initialPeriod,
      })

      const cptTimeValue = computed(() => {
        let hour = parseInt(state.value.substr(0, 2))
        hour = getFormattedHours(hour, props)
        const period = state.period ? ` ${state.period}` : ''
        return `${_.padStart(String(hour), 2, '0')}${state.value.substr(2)}${period}`
      })

      const updateInput = (timePickerOutput) => {
        state.value = timePickerOutput.time
        state.period = timePickerOutput.period
        context.emit('input', cptTimeValue.value)
      }

      const updatePeriod = (period) => {
        state.period = period
        context.emit('input', cptTimeValue.value)
      }

      const openTimePickerDialog = (e, menuScope) => {
        context.refs[refIdTimePicker].showHoursPicker()
        menuScope.toggleContent(e)
      }
      const closeTimePickerDialog = () => state.showMenu = false

      const refIdTimePicker = 'time_picker'
      const renderTimePickerInput = () => {
        return <g-menu
            value={state.showMenu} vOn:input={v => state.showMenu = v}
            closeOnClick
            contentFillWidth={false}
            minWidth={300} nudgeBottom={10}
            scopedSlots={{
              activator: gMenuScope =>
                  <g-text-field
                      {...{
                        props: {
                          ..._.pick(props, [
                            'disabled', 'readonly', 'required',
                            'label',
                            'filled', 'outlined', 'solo', 'shaped', 'rounded', 'flat', 'dense'
                          ]),
                          value: cptTimeValue.value,
                          prependIcon: "access_time"
                        }
                      }}
                      vOn:click={e => openTimePickerDialog(e, gMenuScope)}/>
            }}>
          <g-time-picker
              ref={refIdTimePicker}
              vShow={state.showMenu}
              {...{
                props: {
                  ..._.pick(props, [
                    'disabled', 'readonly',
                    'hourConvention', 'useSeconds',
                    'landscape', 'scrollable',
                    'clockHandColor', 'clockFaceColor', 'clockNumberColor', 'clockSelectedNumberColor', 'titleTextColor', 'titleBgColor', 'clockWrapperColor',
                  ]),
                  value: state.value
                }
              }}
              vOn:input={updateInput}
              vOn:updateperiod={updatePeriod}
              vOn:timeselected={closeTimePickerDialog}
          />
        </g-menu>
      }

      return {
        state,
        renderTimePickerInput
      }
    },
    render() {
      return this.renderTimePickerInput()
    }
  }
</script>
<style scoped>
</style>
