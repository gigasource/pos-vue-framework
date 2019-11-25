<script>
  import { computed, reactive } from '@vue/composition-api'
  import GMenu from '../GMenu/GMenu'
  import GDatePicker from '../GDatePicker/GDatePicker'
  import GTextField from '../GInput/GTextField'
  import dayjs from 'dayjs';
  import _ from 'lodash'
  import GBtn from '../GBtn/GBtn'

  GMenu.components['GTextField'] = GTextField
  GDatePicker.components['GBtn'] = GBtn

  export default {
    name: 'GDatePickerInput',
    components: { GMenu, GDatePicker, GTextField, GBtn },
    props: {
      // A predicate function which validate date value and return true if input date is valid, otherwise false
      allowedDates: [Function, null],
      // Date value in ISO format 'YYYY-MM-dd' indicate the maximum selectable date boundary
      max: String,
      // Date value in ISO format 'YYYY-MM-dd' indicate the minimum selectable date boundary
      min: String,
      // events in calendar
      events: {
        type: [Array, Function, Object],
        default: () => null,
      },
      // Default value of date-picker
      value: [Array, String],


      //// Groups: Color
      // Color for picker-header and selected date
      // if both color and headerColor present, headerColor will be used for header
      color: String,
      // Range color define the color of range
      rangeColor: String,
      // color of events
      eventColor: {
        type: [Array, Function, Object, String],
        default: () => 'warning',
      },
      // Color for picker-header
      headerColor: String,

      //// Groups: Size
      // indicate whether picker will be shown in fullWidth
      // if both fullWidth and width value is present, width will be ignored
      fullWidth: Boolean,
      // Predefined width for date picker
      width: {
        type: [Number, String],
        default: 290,
      },


      //// Groups: Format functions for customize date picker content
      // Function formatting the day in date picker table
      dayFormat: [Function, null],
      // Function formatting month in the months table
      monthFormat: Function,
      // Function formatting week day
      weekdayFormat: Function,
      // Function formatting the tableDate in the day/month table header
      headerDateFormat: Function,
      // Function formatting currently selected date in the picker title
      titleDateFormat: Function,


      //// Groups: Visibility
      // Boolean value indicate that whether picker's title will be shown or not
      noTitle: Boolean,
      // Boolean value indicate that whether picker will be shown in landscape or portrait mode
      landscape: Boolean,
      // Represent the first day of week will be shown in calendar
      // 0 mean Sunday, 1 mean Monday, 2 mean Tuesday, etc
      // Default is Sunday
      firstDayOfWeek: {
        type: [String, Number],
        default: 0,
      },
      // A boolean value indicate that whether picker should show week or not
      // Week value will be added at the first column of calendar table
      showWeek: Boolean,
      // A boolean value indicate that whether picker is enable to show _currentDateMonth date/month or not
      showCurrent: [Boolean, String],
      // Date picker type
      type: {
        type: String,
        default: 'date',
        validator: (type) => ['date', 'month'].includes(type),
      },

      //// Groups: Behavior
      // A boolean value indicate that whether date picker is enable for interact
      disabled: Boolean,
      // A boolean value indicate that whether picker is enable for change or not
      readonly: Boolean,
      // A boolean value indicate that whether picker is enable for scroll or not
      scrollable: Boolean,
      // A boolean value indicate that whether picker allow range select or not
      range: Boolean,
      // Boolean value indicate that whether picker allow multiple select or not
      multiple: Boolean,
    },
    setup(props, context) {
      let dateFormat
      if (props.type === 'date') {
        dateFormat = 'YYYY-MM-dd'
      } else {
        dateFormat = 'YYYY-MM'
      }

      let initialDateValue
      if (!props.multiple && !props.range) {
        if (props.value) {
          initialDateValue = props.value
        } else {
          initialDateValue = dayjs().format(dateFormat)
        }
      } else {
        if (props.value) {
          initialDateValue = props.value
        } else {
          initialDateValue = []
        }
      }

      console.log(initialDateValue)

      const state = reactive({
        value: initialDateValue,
        showMenu: false,
      })

      let tempValue = _.cloneDeep(initialDateValue)

      const cptTextFieldValue = computed(() => {
        if (props.multiple) {
          return state.value.join(', ')
        } else if (props.range) {
          return state.value.join(' ~ ')
        } else {
          return state.value
        }
      })

      return () => {
        return <g-menu
            contentFillWidth={false}
            closeOnClick
            minWidth={300}
            nudgeBottom={10}
            scopedSlots={{
              activator: gMenuScope =>
                  <g-text-field
                      label={props.label}
                      prependIcon="access_time"
                      value={cptTextFieldValue.value}
                      vOn:click={e => {
                        tempValue = _.cloneDeep(initialDateValue)
                        gMenuScope.toggleContent(e)
                      }}/>
            }}
            value={state.showMenu}
            vOn:input={v => state.showMenu = v}>
          <g-date-picker
              vShow={state.showMenu}
              allowedDates={props.allowedDates}
              max={props.max}
              min={props.min}
              events={props.events}
              value={tempValue}
              vOn:input={v => tempValue = v}
              color={props.color}
              rangeColor={props.rangeColor}
              eventColor={props.eventColor}
              headerColor={props.headerColor}
              fullWidth={props.fullWidth}
              width={props.width}
              dayFormat={props.dayFormat}
              monthFormat={props.monthFormat}
              weekdayFormat={props.weekdayFormat}
              headerDateFormat={props.headerDateFormat}
              titleDateFormat={props.titleDateFormat}
              noTitle={props.noTitle}
              landscape={props.landscape}
              firstDayOfWeek={props.firstDayOfWeek}
              showWeek={props.showWeek}
              showCurrent={props.showCurrent}
              type={props.type}
              disabled={props.disabled}
              readonly={props.readonly}
              scrollable={props.scrollable}
              range={props.range}
              multiple={props.multiple}>
            <div style="display: flex; flex-direction: row-reverse; padding: 0 10px 15px 10px;">
              <g-btn vOn:click={e => {
                state.value = tempValue
                state.showMenu = false
              }}>OK</g-btn>&nbsp;
              <g-btn vOn:click={e => {
                state.showMenu = false
              }}>Cancel
              </g-btn>
            </div>
          </g-date-picker>
        </g-menu>
      }
    }
  }
</script>
<style scoped>
</style>
