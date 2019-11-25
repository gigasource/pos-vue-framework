<script>
  import GTextField from '../GInput/GTextField'
  import GTimePicker from './GTimePicker'
  import GMenu from '../GMenu/GMenu'
  import { reactive } from '@vue/composition-api';
  import { HourConvention, HourConventionValidator } from './logic/GTimePickerUtil';

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
      const state = reactive({
        showMenu: false,
        value: ''
      })

      return () => {
        return <g-menu
            value={state.showMenu}
            vOn:input={v => state.showMenu = v}
            scopedSlots={{
              activator: gMenuScope =>
                <g-text-field
                    label={props.label}
                    value={`${state.value}`}
                    prependIcon="access_time"
                    vOn:click={gMenuScope.toggleContent}/>
            }}
            minWidth={320}
            maxWidth={320}
            contentFillWidth={false}
            closeOnClick
            nudgeBottom={10}>
          <g-time-picker
              vShow={state.showMenu}
              disabled={props.disabled}
              readonly={props.readonly}
              scrollable={props.scrollable}
              useSeconds={props.useSeconds}
              value={state.value}
              vOn:input={v => { state.value = v }}
              hourConvention={props.hourConvention}
              landscape={props.landscape}
              width={props.width}
              titleBgColor={props.titleBgColor}
              titleTextColor={props.titleTextColor}
              clockWrapperColor={props.clockWrapperColor}
              clockFaceColor={props.clockFaceColor}
              clockNumberColor={props.clockNumberColor}
              clockSelectedNumberColor={props.clockSelectedNumberColor}
              clockHandColor={props.clockHandColor}
              timeSelected={() => state.showMenu = false}/>
        </g-menu>
      }
    }
  }
</script>
<style scoped>
</style>
