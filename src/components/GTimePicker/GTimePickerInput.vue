<script>
  import GTextField from '../GInput/GTextField'
  import GTimePicker from './GTimePicker'
  import GMenu from '../GMenu/GMenu'
  import { reactive, computed } from '@vue/composition-api';
  import { HourConvention, HourConventionValidator, getFormattedHours } from './logic/GTimePickerUtil';
  import dayjs from 'dayjs';

  GMenu.components['GTextField'] = GTextField

  export default {
    name: 'GTimePickerInput',
    components: { GMenu, GTimePicker, GTextField },
    props: {
      label: String,
      // state
      disabled: Boolean,
      readonly: Boolean,
      scrollable: Boolean,
      useSeconds: Boolean,
      // values
      value: String,
      // convention
      hourConvention: {
        type: String,
        default: HourConvention._12HRS,
        validator: HourConventionValidator
      },
      landscape: Boolean,
      // Predefined width for date picker
      width: {
        type: [Number, String],
        default: 290,
      },
      // coloring
      // title
      titleBgColor: String,
      titleTextColor: String,
      // clock
      clockWrapperColor: String,
      clockFaceColor: String,
      clockNumberColor: String,
      clockSelectedNumberColor: String,
      clockHandColor: String
    },
    setup(props, context) {
      // get initial time
      let initialTime;
      if (props.value) initialTime = props.value
      else if (props.useSeconds) initialTime = dayjs().format('HH:mm:ss')
      else initialTime = dayjs().format('HH:mm')

      // get period if any
      let initialPeriod;
      if (props.hourConvention === HourConvention._24HRS)
        initialPeriod = ''
      else if (initialTime < '12')
        initialPeriod = 'AM'
      else
        initialPeriod = 'PM'

      const state = reactive({
        showMenu: false,
        value: initialTime,
        period: initialPeriod,
      })

      const cptTimeValue = computed(() => {
        const hour = getFormattedHours(parseInt(state.value.substr(0, 2)), props)
        return `${hour}${state.value.substr(2)} ${state.period}`
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

      const refIdTimePicker = 'time_picker'
      const renderTimePickerInput = () => {
        return <g-menu
            contentFillWidth={false}
            closeOnClick
            maxWidth={300}
            minWidth={300}
            nudgeBottom={10}
            scopedSlots={{
              activator: gMenuScope =>
                  <g-text-field
                      label={props.label}
                      prependIcon="access_time"
                      value={cptTimeValue.value}
                      vOn:click={e => {
                        context.refs[refIdTimePicker].showHoursPicker()
                        gMenuScope.toggleContent(e)
                      }}/>
            }}
            value={state.showMenu}
            vOn:input={v => state.showMenu = v}>
          <g-time-picker
              ref={refIdTimePicker}
              vShow={state.showMenu}
              clockHandColor={props.clockHandColor}
              clockFaceColor={props.clockFaceColor}
              clockNumberColor={props.clockNumberColor}
              clockSelectedNumberColor={props.clockSelectedNumberColor}
              clockWrapperColor={props.clockWrapperColor}
              disabled={props.disabled}
              hourConvention={props.hourConvention}
              landscape={props.landscape}
              readonly={props.readonly}
              scrollable={props.scrollable}
              titleBgColor={props.titleBgColor}
              titleTextColor={props.titleTextColor}
              timeSelected={() => state.showMenu = false}
              useSeconds={props.useSeconds}
              value={state.value}
              width={props.width}
              vOn:input={updateInput}
              vOn:updateperiod={updatePeriod}
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
