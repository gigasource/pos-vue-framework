<script>
  import _ from 'lodash'
  import GTimePickerUtil, { HourConvention, HourConventionValidator, getFormattedHours } from './logic/GTimePickerUtil'
  import { computedHandStyle, getSelectedIndex, calcFaceNumberPosition } from './logic/GTimePickerUIHelper';

  export default {
    name: 'GTimePicker',
    props: {
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

      // ROADMAP
      // events: [Function, Array], // (() => [] || []) of { hour: Number, minute: Number, second: Number, eventName: String, eventContent: String] }
      // allowedHours: [Function, Array],
      // allowedMinutes: [Function, Array],
      // allowedSeconds: [Function, Array],
    },
    setup(props, context) {
      const {
        state,
        //
        hoursModel,
        minutesModel,
        secondsModel,
        //
        adjustHours,
        adjustMinutes,
        adjustSeconds,
        //
        showHoursPicker,
        showMinutesPicker,
        showSecondsPicker,
        //
        showAMPicker,
        showPMPicker,
      } = GTimePickerUtil(props, context)

      const cptHandStyle = computedHandStyle(props, state)

      // Title
      const titleRenderFn = (function () {
        function pad(value) {
          return value < 10 ? `0${value}` : `${value}`
        }

        const getNumberClass = function(active) {
          return {
            'g-time-picker__title__number': true,
            'g-time-picker__title__number--active': active
          }
        }

        function renderSecond() {
          return props.useSeconds ? [
            <span>:</span>,
            <div class={getNumberClass(state.activeTimePicker.second)} vOn:click_stop={showSecondsPicker}>
              {pad(state.selectedTime.seconds)}
            </div>
          ] : undefined
        }

        function renderPeriod() {
          return state.showPeriod
              ? <div>
                <div class={{ 'g-time-picker__title__period--active': state.activePeriodPicker.AM }} vOn:click_stop={showAMPicker}>AM</div>
                <div class={{ 'g-time-picker__title__period--active': state.activePeriodPicker.PM }} vOn:click_stop={showPMPicker}>PM</div>
              </div>
              : undefined
        }

        return () => (
            <div class="g-time-picker__title">
              <div class={getNumberClass(state.activeTimePicker.hour)} vOn:click_stop={showHoursPicker}>
                {pad(getFormattedHours(state.selectedTime.hours, props))}
              </div>
              <span>:</span>
              <div class={getNumberClass(state.activeTimePicker.minute)} vOn:click_stop={showMinutesPicker}>
                {pad(state.selectedTime.minutes)}
              </div>
              {renderSecond()}
              {renderPeriod()}
            </div>
        )

      })()

      // Clock
      function wheelHandle(e) {
        e.preventDefault()
        e.stopPropagation()

        if (props.disabled || props.readonly || !props.scrollable) {
          return
        }

        let changeValue = e.deltaY
        if (changeValue > 0) {
          changeValue = 1
        } else if (changeValue < 0) {
          changeValue = -1
        }

        let changeFn = (state.activeTimePicker.hour
            ? adjustHours
            : state.activeTimePicker.minute
                ? adjustMinutes
                : adjustSeconds)

        changeFn(changeValue)
      }
      function onClockClicked(e) {
        const selectedIndex = getSelectedIndex(e.target.getBoundingClientRect(), { x: e.offsetX, y: e.offsetY })
        if (selectedIndex !== -1) {
          if (state.activeTimePicker.minute) {
            minutesModel.value[selectedIndex].select()
            if (props.useSeconds) {
              showSecondsPicker()
            }
          } else if (state.activeTimePicker.second) {
            secondsModel.value[selectedIndex].select()
          }
        }
      }
      function addNumberClass(numbers) {
        _.each(numbers, (el) => {
          el.class = {
            ...el.class,
            'g-time-picker__clock__inner__number': true,
            'g-time-picker__clock__inner__number--selected': el.selected,
            'g-time-picker__clock__inner__number--readonly': props.readonly,
            'g-time-picker__clock__inner__number--disabled': props.disabled
          }
        })
        return numbers
      }
      function hourRenderFn() {
        if (state.activeTimePicker.hour) {
          let hourElements = []
          // 0 -> 11
          hourElements.push(calcFaceNumberPosition(addNumberClass(hoursModel.value.filter((_, index) => index < 12)), 1).map(hour =>
                  <span
                      class={[hour.class, 'g-time-picker__clock__inner__number--selectable']}
                      style={hour.style}
                      vOn:click_stop={() => {
                        hour.select()
                        showMinutesPicker()
                      }}>
                    <span>{hour.value}</span>
                  </span>
              )
          )
          // 12 -> 23
          hourElements.push(calcFaceNumberPosition(addNumberClass(hoursModel.value.filter((_, index) => index >= 12)), 0.6).map(hour =>
                  <span
                      class={[hour.class, 'g-time-picker__clock__inner__number--selectable']}
                      style={hour.style}
                      vOn:click_stop={() => {
                        hour.select()
                        showMinutesPicker()
                      }}>
                    <span>{hour.value}</span>
                  </span>
              )
          )

          return hourElements
        }

        return undefined
      }
      function minuteRenderFn() {
        if (state.activeTimePicker.minute) {
          return calcFaceNumberPosition(addNumberClass(minutesModel.value)).map((minute, index) =>
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
          return calcFaceNumberPosition(addNumberClass(secondsModel.value)).map((second, index) =>
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
            <div class="g-time-picker__clock" vOn:click_stop={onClockClicked} vOn:wheel={wheelHandle}>
              <div class="g-time-picker__clock__inner">
                <div class="g-time-picker__clock__inner__hand" style={cptHandStyle.value}></div>
                {hourRenderFn()}
                {minuteRenderFn()}
                {secondRenderFn()}
              </div>
            </div>
        )
      }

      //
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
  $clockBgColor: #ddd;
  $clockSize: 270px;
  $clockPadding: 25px;
  $handColor: #000;

  .g-time-picker {
    &__title {
      height: 70px;

      &__number {
        display: inline-block;
      }
    }

    &__clock {
      width: $clockSize;
      height: $clockSize;
      border-radius: 100%;
      background-color: $clockBgColor;

      $clockInnerSize: $clockSize - 2 * $clockPadding;
      $handStartSize: 10px;
      $handEndSize: 8px;

      &__inner {
        width: $clockInnerSize;
        height: $clockInnerSize;
        top: $clockPadding;
        left: $clockPadding;
        position: relative;
        pointer-events: none;

        &__hand {
          position: absolute;
          left: calc(50% - 1px);
          width: 2px;
          border: 1px solid #000;
          -webkit-transform-origin: center bottom;
          transform-origin: center bottom;

          &::before {
            position: absolute;
            border-radius: 100%;
            border-width: 2px;
            border-style: solid;
            border-color: inherit;
            content: '';
            top: -4px;
            left: 50%;
            width: $handStartSize;
            height: $handStartSize;
            background: transparent;
            transform: translate(-50%, -50%);
          }

          &::after {
            content: "";
            position: absolute;
            height: 8px;
            width: 8px;
            top: 100%;
            left: 50%;
            border-radius: 100%;
            border-style: solid;
            border-color: inherit;
            background-color: inherit;
            transform: translate(-50%, -50%);
          }
        }

        $itemSize: 40px;

        &__number {
          position: absolute;
          /*border: 1px solid red;*/
          border-radius: 50%;
          transform: translate(-50%, -50%);
          width: $itemSize;
          height: $itemSize;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;

          &--disabled {
            pointer-events: none;
            color: #888;
          }

          &--readonly {
            pointer-events: none;
          }

          &--selected {
            background-color: $handColor;
            color: #fff;
          }

          &--selectable {
            pointer-events: all;
          }
        }
      }
    }
  }

</style>
