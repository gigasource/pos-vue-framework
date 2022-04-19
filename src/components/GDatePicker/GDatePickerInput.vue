<script type="text/jsx">
  import { computed, reactive, watch } from 'vue'
  import GMenu from '../GMenu/GMenu'
  import GDatePicker from '../GDatePicker/GDatePicker'
  import GTextField from '../GInput/GTextField'
  import GChip from '../GChip/GChip'
  import dayjs from 'dayjs';
  import _ from 'lodash'
  import GBtn from '../GBtn/GBtn'
  import { getScopeIdRender } from '../../utils/helpers'

  // register components
  GTextField.components['GChip'] = GChip
  GMenu.components['GTextField'] = GTextField
  GDatePicker.components['GBtn'] = GBtn

  export default {
    name: 'GDatePickerInput',
    components: { GMenu, GDatePicker, GTextField, GBtn },
    props: {
      label: String,
      icon: {
        type: String,
        default: 'far fa-calendar'
      },

      // A predicate function which validate date value and return true if input date is valid, otherwise false
      allowedDates: [Function, null],
      // Date value in ISO format 'YYYY-MM-DD' indicate the maximum selectable date boundary
      max: String,
      // Date value in ISO format 'YYYY-MM-DD' indicate the minimum selectable date boundary
      min: String,
      // events in calendar
      events: {
        type: [Array, Function, Object],
        default: () => null,
      },
      // Default value of date-picker
      modelValue: [Array, String],


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
      virtualEvent: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      let dateFormat = props.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM'
      let initialDateValue

      if (props.multiple || props.range) {
        initialDateValue = props.modelValue ? copyValue(props.modelValue) : []
      } else {
        initialDateValue = props.modelValue ? props.modelValue : dayjs().format(dateFormat)
      }

      const state = reactive({
        value: initialDateValue,
        tempValue: _.cloneDeep(initialDateValue),
        showMenu: false,
      })

      watch(() => props.modelValue, newValue => {
        if (state.value !== newValue) {
          state.value = copyValue(newValue)
        }
      })

      function copyValue(val) {
        if (props.multiple || props.range) {
          if (Array.isArray(val))
            return val.map(v => v);
          throw new Error(`Expect an array, got ${typeof(val)}`);
        } else {
          return val;
        }
      }

      const cptTextFieldValue = computed(() => {
        if (props.multiple) {
          return state.value.join(', ')
        } else if (props.range) {
          return state.value.join(' -> ')
        } else {
          return state.value
        }
      })

      function renderMultipleDates() {
        return state.value.map((item, index) =>
            <GChip
                small={props.smallChips}
                close={props.deletableChips}
                onClose={() => onChipCloseClick(index)}>
              {item}
            </GChip>)
      }

      function renderSingleOrDateRanges() {
        return <span style="height: 32px; line-height: 32px; display: block;">{cptTextFieldValue.value}</span>
      }

      function gTextFieldInputVSlots() {
        return {
          'input-slot': ({ inputErrStyles }) =>
              <div style={[{ 'color': '#1d1d1d' }, inputErrStyles]}>
                { props.multiple ? renderMultipleDates() : renderSingleOrDateRanges()}
              </div>
        }
      }

      function gMenuActivatorSlots(slots) {
        if (slots.activator) return {
          activator: ({toggleContent}) => slots.activator({toggleContent, date: state.value})
        };
        return {
          activator: gMenuScope =>
              <g-text-field
                  class="g-date-picker__activator"
                  label={props.label}
                  prependIcon={props.icon}
                  modelValue={cptTextFieldValue.value}
                  virtualEvent={props.virtualEvent}
                  onClick={e => {
                    gMenuScope.toggleContent(e)
                    state.tempValue = copyValue(state.value)
                  }}
                  v-slots={gTextFieldInputVSlots()}/>
        }
      }

      function renderGDatePickerInput() {
        return <div>
          <g-menu
              contentFillWidth={false}
              minWidth={300}
              nudgeBottom={10}
              v-model={state.showMenu}
              v-slots={gMenuActivatorSlots(context.slots)}>
            <g-date-picker
                v-show={state.showMenu}
                {..._.pick(props, ['allowedDates', 'max', 'min', 'events', 'color', 'rangeColor', 'eventColor', 'headerColor', 'fullWidth',
                  'width', 'dayFormat', 'monthFormat', 'weekdayFormat', 'headerDateFormat', 'titleDateFormat', 'noTitle', 'landscape', 'firstDayOfWeek',
                  'showWeek', 'showCurrent', 'type', 'disabled', 'readonly', 'scrollable', 'range', 'multiple'
                ])}
                v-model={state.tempValue}>
              <div style="display: flex; flex-direction: row-reverse; padding: 0 10px 15px 10px;">
                <g-btn flat onClick={e => state.showMenu = false}>Cancel</g-btn>
                &nbsp;
                <g-btn flat onClick={e => {
                  state.value = copyValue(state.tempValue);
                  context.emit('update:modelValue', state.value);
                  state.showMenu = false
                }}>OK</g-btn>
              </div>
            </g-date-picker>
          </g-menu>
        </div>
      }
      return {
        state,
        renderWithScope: getScopeIdRender()(renderGDatePickerInput)
      }
    },
    render() {
      return this.renderWithScope()
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .g-date-picker__activator {
    .g-tf-input {
      visibility: hidden;
    }
  }

  ::v-deep {
    .g-menu--activator {
      span {
        margin: 3px
      }

      .g-tf-input {
        display: none;
      }
    }
  }
</style>
