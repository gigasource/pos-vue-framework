<script>
  import _ from 'lodash'
  import { computed } from '@vue/composition-api'
  import GTimePickerUtil, { HourConvention, HourConventionValidator, getFormattedHours } from './logic/GTimePickerUtil'


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
        //  activePicker: 'hour' || 'minute' || 'seconds'
        //
        //  // @neededInView
        //  // boolean value indicate whether AM/PM label will be show.
        //  // This value will be computed from props.hourConvention. True if 12Hour, false if 24Hour
        //  // This value co-existence with changePeriodToAM and onPMClicked event handler
        //  showPeriod: true || false,
        // }
        state,
        // hour models: [{ selected: Boolean, allowed: Boolean }]
        hours,
        // minute models: [{ selected: Boolean, allowed: Boolean }]
        minutes,
        // second models: [{ selected: Boolean, allowed: Boolean }]
        seconds,
        // function to change value non-click: scroll, touch, wheel
        changeHour,
        changeMinute,
        changeSecond,

        // function to change value by clicked
        // event handler when
        showHoursPicker,
        showMinutesPicker,
        showSecondsPicker,

        //
        showAMPicker,
        showPMPicker
      } = GTimePickerUtil(props, context)

      // temp method
      function pad(value) {
        return value < 10 ? `0${value}` : `${value}`
      }

      function titleRenderFn() {
        return (
            <div class="g-time-picker__title">
              <div
                  class={[
                    'g-time-picker__title__time-element',
                    { 'g-time-picker__title__time-element--active': state.activeTimePicker.hour }
                  ]}
                  vOn:click_stop={showHoursPicker}>{pad(getFormattedHours(state.selectedTime.hours, props))}</div>
              <span>:</span>
              <div class="g-time-picker__title__time-element"
                   vOn:click_stop={showMinutesPicker}>{pad(state.selectedTime.minutes)}</div>
              {
                props.useSeconds ? [
                  <span>:</span>,
                  <div class="g-time-picker__title__time-element"
                       vOn:click_stop={showSecondsPicker}>{pad(state.selectedTime.seconds)}</div>
                ] : undefined
              }
              {
                state.showPeriod
                    ? <div>
                      <div class={{ 'g-time-picker__title__period--active': state.activePeriodPicker.AM }} vOn:click_stop={showAMPicker}>AM</div>
                      <div class={{ 'g-time-picker__title__period--active': state.activePeriodPicker.PM }} vOn:click_stop={showPMPicker}>PM</div>
                    </div>
                    : undefined
              }
            </div>
        )
      }

      function addClass(timeElements) {
        _.each(timeElements, (el, index) => {
          el.class = {
            ...el.class,
            'g-time-picker__clock__inner__item': true,
            'g-time-picker__clock__inner__item--selected': el.selected,
            'g-time-picker__clock__inner__item--readonly': props.readonly,
            'g-time-picker__clock__inner__item--disabled': props.disabled || !el.allowed
          }
        })
        return timeElements
      }

      function calculatePosition(timeElements) {
        let anglePerStep = 2 * Math.PI / timeElements.length
        let angle = Math.PI / 2

        // TODO: 24 Hours, bring 12 -> 23 hours to inner circle
        _.each(timeElements, (el, index) => {
          el.style = {
            ...el.style,
            top: `${50 * (1 - Math.sin(angle + index * anglePerStep))}%`, // sin
            left: `${50 * (1 - Math.cos(angle + index * anglePerStep))}%` // cos
          }
        })
        return timeElements
      }

      // Clock
      function onClockClicked(e) {
        // clock width, height
        const { width, height } = e.target.getBoundingClientRect()
        // center clock point
        const center = { x: width /2, y: height/ 2 }
        // position mouse down
        const clickedPos = { x: e.offsetX, y: e.offsetY }

        // ignore if user click outside clock
        const distance = Math.sqrt(Math.pow( clickedPos.x - center.x, 2 ) + Math.pow(clickedPos.y - center.y, 2))
        if (distance > width / 2)
          return

        // TODO: verify
        let radians
        // Part I
        if (clickedPos.x > center.x && clickedPos.y < center.y) {
          radians = Math.asin((clickedPos.x - center.x) / distance)
        } else if (clickedPos.x >= center.x && clickedPos.y >= center.y) {
          // Part II
          radians = 0.5 * Math.PI + Math.asin((clickedPos.y - center.y)/distance)
        } else if (clickedPos.x < center.x && clickedPos.y > center.y) {
          // Part III
          radians = Math.PI + Math.asin((center.x - clickedPos.x) / distance)
        } else {
          // Part IV
          radians = 1.5 * Math.PI + Math.asin((center.y - clickedPos.y)/distance)
        }

        const alpha = radians * 180 / Math.PI
        const tickValue = Math.round(alpha / 6)

        if (state.activeTimePicker.minute) {
          minutes.value[tickValue].select()
          if (props.useSeconds)
            showSecondsPicker()
        } else if (state.activeTimePicker.second) {
          seconds.value[tickValue].select()
        }
      }

      // [0, 11]
      const range12 = [...Array(12).keys()]
      // [12, 23]
      const range24 = [...Array(24).keys()].splice(12, 12)
      // [0, 59]
      const range60 = [...Array(60).keys()]

      //
      const cptTickStyle = computed(() => {
        let degree = 0
        if (state.activeTimePicker.hour) {
          // 12 hours
          // 30 = 360 / 12
          degree = range12.indexOf(state.selectedTime.hours) * 30
          if (degree < 0)
            degree = range24.indexOf(state.selectedTime.hours) * 30
        }
        else if (state.activeTimePicker.minute) {
          degree = range60.indexOf(state.selectedTime.minutes) * 6
        }// 360 / 60
        else if (state.activeTimePicker.second) {
          degree = range60.indexOf(state.selectedTime.seconds) * 6
        }

        return { 'transform': `rotate(${degree}deg)` }
      })


      function hourRenderFn() {
        if (state.activeTimePicker.hour) {
          return calculatePosition(addClass(hours.value)).map(hour =>
              <span
                  class={[hour.class, 'g-time-picker__clock__inner__item--selectable']}
                  style={hour.style}
                  vOn:click_stop={() => {
                    hour.select()
                    showMinutesPicker()
                  }}>
                <span>{hour.value}</span>
              </span>
          )
        }

        return undefined
      }

      function minuteRenderFn() {
        if (state.activeTimePicker.minute) {
          return calculatePosition(addClass(minutes.value)).map((minute, index) =>
                index % 5 === 0
                    ? <span class={minute.class} style={minute.style}>
                        <span>{minute.value}</span>
                      </span>
                    : undefined)
        }

        return undefined
      }

      function secondRenderFn() {
        if (props.useSeconds && state.activeTimePicker.second) {
          return calculatePosition(addClass(seconds.value)).map((second, index) =>
              index % 5 === 0
                  ? <span class={second.class}
                          style={second.style}>
                    <span>{second.value}</span>
                  </span>
                  : undefined
          )
        }

        return undefined
      }

      function clockRenderFn() {
        return (
            <div class="g-time-picker__clock" vOn:click_stop={onClockClicked}>
              <div class="g-time-picker__clock__inner">
                <div class="g-time-picker__clock__inner__tick" style={cptTickStyle.value}></div>
                { hourRenderFn() }
                { minuteRenderFn() }
                { secondRenderFn() }
              </div>
            </div>
        )
      }

      return function GTimePickerRenderFn() {
        return (
            <div class={{ 'g-time-picker--disabled': props.disabled }}>
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
        display: inline-block;
      }
    }

    $clockSize: 270px;
    $clockPadding: 25px;

    &__clock {
      width: $clockSize;
      height: $clockSize;
      padding: $clockPadding;
      border-radius: 100%;
      background-color: #ddd;

      $clockInnerSize: $clockSize - 2 * $clockPadding;

      &__inner {
        width: $clockInnerSize;
        height: $clockInnerSize;
        position: relative;
        pointer-events: none;

        &__tick {
          position: absolute;
          left: 50%;
          height: 50%;
          width: 2px;
          border: 1px solid #00acc1;
          transform-origin: center bottom;

          &::before {
            position: absolute;
            border-radius: 100%;
            content: '';
            top: 100%;
            width: 16px;
            height: 16px;
            background-color: #00acc1;
            transform: translate(-50%, -50%);
          }

          &::after {
            position: absolute;
            border-radius: 100%;
            content: '';
            top: 0%;
            width: 8px;
            height: 8px;
            background-color: #00acc1;
            transform: translate(-50%, -50%);
          }
        }

        $itemSize: 40px;

        &__item {
          position: absolute;
          /*border: 1px solid red;*/
          border-radius: 100%;
          transform: translate(-50%, -50%);
          width: $itemSize;
          height: $itemSize;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;

          &--disabled {

          }

          &--readonly {

          }

          &--selected {
            background-color: #00acc1;
          }

          &--selectable {
            pointer-events: all;
          }
        }
      }
    }
  }

</style>
