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
    setup(props) {
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
        period: initialPeriod
      })

      const cptTimeValue = computed(() => {
        const hour = getFormattedHours(parseInt(state.value.substr(0, 2)), props)
        return `${hour}${state.value.substr(2)} ${state.period}`
      })

      return () => {
        return <g-menu
            contentFillWidth={false}
            closeOnClick
            maxWidth={320}
            minWidth={320}
            nudgeBottom={10}
            scopedSlots={{
              activator: gMenuScope =>
                  <g-text-field
                      label={props.label}
                      prependIcon="access_time"
                      value={cptTimeValue.value}
                      vOn:click={gMenuScope.toggleContent}/>
            }}
            value={state.showMenu}
            vOn:input={v => state.showMenu = v}>
          <g-time-picker
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
              vOn:input={v => {
                state.value = v.time
                state.period = v.period
              }}
              vOn:updateperiod={v => state.period = v}
              width={props.width}
          />
        </g-menu>
      }
    }
  }
</script>
<style scoped>
</style>
