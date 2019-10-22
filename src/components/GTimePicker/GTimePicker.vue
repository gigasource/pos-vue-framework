<script>
  import { computed } from '@vue/composition-api'
  import GTimePickerUtil, {
    getTitleAmPmDataModel, getTitleTimeDataModels, HourConvention, HourConventionValidator,
  } from './logic/GTimePickerUtil'


  const defaulColor = {
    title: {
      background: '',
      activeElement: '',
      inActiveElement: '',
    },
    clock: {
      background: '',
      activeElement: '',
      inActiveElement: '',
    }
  }

  export default {
    name: 'GTimePicker',
    props: {
      // filter functions
      allowedHours: [Function, Array],
      allowedMinutes: [Function, Array],
      allowedSeconds: [Function, Array],

      // state
      disabled: Boolean,
      readonly: Boolean,
      scrollable: Boolean,
      useSeconds: Boolean,

      // values
      min: String,
      max: String,
      value: String,

      // ROADMAP
      // events: [Function, Array], // (() => [] || []) of { hour: Number, minute: Number, second: Number, eventName: String, eventContent: String] }

      // convention
      hourConvention: {
        type: String,
        default: HourConvention._12HRS,
        validator: HourConventionValidator
      },

      // customization
      // define title background color
      titleBackgroundColor: String,
      // define color of selected element (hour, minute, second, am, pm) in title
      titleColorActiveElement: String,
      // define color of inactive element
      titleColorInActiveElement: String,
      // define clock background color
      clockBackgroundColor: String,
      // define active element color
      clockColorActiveElement: String,
      // define inactive element color
      clockColorInActiveElement: String
    },
    setup(props, context) {
      const {
        // {
        //  // @ignorable
        //  // indicate whether hour, minutes, second view will be shown
        //  // if you want to show all components (hour, minute, second), just ignore this value
        //  selecting: 'hour' || 'minute' || 'seconds'
        //
        //  // @neededInView
        //  // boolean value indicate whether AM/PM label will be show.
        //  // This value will be computed from props.hourConvention. True if 12Hour, false if 24Hour
        //  // This value co-existence with onAMClicked and onPMClicked event handler
        //  showPeriod: true || false
        // }
        state,
        // hour models: [{ selected: Boolean, allowed: Boolean }]
        hours,
        // minute models: [{ selected: Boolean, allowed: Boolean }]
        minutes,
        // second models: [{ selected: Boolean, allowed: Boolean }]
        seconds,
        // function to change value non-click: used by scroll, touch, wheel
        changeHour,
        changeMinute,
        changeSecond,
        // function to change value by clicked
        // event handler when
        onTitleHourSelected,

        onAMClicked,
        onPMClicked,
        onHourSelected,
        onMinuteSelected,
        onSecondSelected
      } = GTimePickerUtil(props, context)

      // Title
      // const createPickerBtnData = (activeState, events, content) => {
      //   return {
      //     class: {
      //       'g-picker__title__btn': true,
      //       'g-picker__title__btn--active': activeState,
      //       'g-picker__title__btn--disabled': props.disabled
      //     },
      //     events,
      //     content
      //   }
      // }
      // const { showAmPm, amActive, amEvent, pmActive, pmEvent } = getTitleAmPmDataModel(props, context)
      // const amModel = computed(() => createPickerBtnData(amActive.value, amEvent.value, 'AM'))
      // const pmModel = computed(() => createPickerBtnData(pmActive.value, pmEvent.value, 'PM'))
      //
      // const { hourEvent, hourContent, hourActive, minuteEvent, minuteContent, minuteActive } = getTitleTimeDataModels(props, context)
      // const hourModel = computed(() => createPickerBtnData(hourActive.value, hourEvent.value, hourContent.value))
      // const minuteModel = computed(() => createPickerBtnData(minuteActive.value, minuteEvent.value, minuteContent.value))
      //
      // function titleRenderFn__() {
      //   return (
      //       <div class="g-time-picker-title">
      //         {showAmPm ?
      //             <div class="g-time-picker-title__ampm">
      //               <div class={amModel.class} vOn={amModel.events}>{amModel.content}</div>
      //               <div class={pmModel.class} vOn={pmModel.events}>{pmModel.content}</div>
      //             </div> : undefined
      //         }
      //         <div class="g-time-picker-title__time">
      //           <div class={hourModel.class} vOn={hourModel.events}>{hourModel.content}</div>
      //           <span>:</span>
      //           <div class={minuteModel.class} vOn={minuteModel.events}>{minuteModel.content}</div>
      //         </div>
      //       </div>
      //   )
      // }

      function titleRenderFn() {
        return (
            <div class="g-time-picker__title">
              <div
                  class={['g-time-picker__title__time-element', {'g-time-picker__title__time-element--selected': state.hourSelected }]}
                  vOn:click_stop={ () => onTitleHourSelected(state.hour) }
              > { state.hour }</div>
              <span>:</span>
              <div class="g-time-picker__title__time-element"> { state.minute }</div>
              {
                props.useSeconds ? [
                  <span>:</span>,
                  <div class="g-time-picker__title__time-element">{ state.second }</div>
                ] : undefined
              }
              {
                state.showPeriod
                    ? <div>
                        <div class={{'g-time-picker__title__period--active': state.AMSelected }} vOn:click_stop={ () => onAMClicked() }>AM</div>
                        <div class={{'g-time-picker__title__period--active': state.PMSelected }} vOn:click_stop={ () => onPMClicked() }>PM</div>
                      </div>
                    : undefined
              }
            </div>
        )
      }

      // Clock
      function clockRenderFn() {
        return (
            <div class="g-time-picker__clock">
              {(
                  state.hourSelected
                      ? <ul>
                        {
                          hours.value.map(hour =>
                              <li className={{
                                    'g-time-picker__clock__time-element--selected': hour.selected,
                                    'g-time-picker__clock__time-element--readonly': props.readonly,
                                    'g-time-picker__clock__time-element--disabled': props.disabled || !hour.allowed
                                  }}
                                  vOn:click_stop={() => onHourSelected(hour)}
                              >
                                {hour.value}
                              </li>
                          )
                        }
                      </ul>
                      : state.minuteSelected
                      ? <ul>
                        {
                          minutes.value.map(minute =>
                              <li class={{
                                    'g-time-picker__clock__time-element--selected': minute.selected,
                                    'g-time-picker__clock__time-element--readonly': props.readonly,
                                    'g-time-picker__clock__time-element--disabled': props.disabled || !minute.allowed
                                  }}
                                  vOn:click_stop={() => onMinuteSelected(minute)}
                              >
                                { minute.value }
                              </li>
                          )
                        }
                      </ul>
                      : props.useSeconds
                          ? <ul>
                            {
                              seconds.map(second =>
                                  <li class={{
                                        'g-time-picker__clock__time-element--selected': second.selected,
                                        'g-time-picker__clock__time-element--readonly': props.readonly,
                                        'g-time-picker__clock__time-element--disabled': props.disabled || !second.allowed
                                      }}
                                      vOn:click_stop={() => onSecondSelected(second)}
                                  >
                                    { second.value }
                                  </li>
                              )
                            }
                          </ul> : undefined
              )}
            </div>
        )
      }

      return function GTimePickerRenderFn() {
        return (
            <div class={ {'g-time-picker--disabled': props.disabled} }>
              {titleRenderFn()}
              {clockRenderFn()}
              <slot></slot>
            </div>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
 .g-time-picker {
   &__title {
     &__time-element {

     }
   }

   &__clock {
     &__time-element {

       &--disabled {

       }

       &--readonly {

       }

       &--selected {

       }
     }
   }
 }

</style>
