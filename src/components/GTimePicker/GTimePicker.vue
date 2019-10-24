<script>
  import _ from 'lodash'
  import { computed } from '@vue/composition-api'
  import GPicker from '../GPicker/GPicker'
  import GTimePickerUtil, { HourConvention, HourConventionValidator, getFormattedHours } from './logic/GTimePickerUtil'
  import { computedHandStyle, getSelectedIndex, calcFaceNumberPosition } from './logic/GTimePickerUIHelper';
  // TODO: bring to general util fils
  import { pad } from '../GDatePicker/logic/utils';
  import { setBackgroundColor } from '../../mixins/colorable';

  const MINIMUM_WIDTH = 300
  const DEFAULT_COLOR = 'rgb(145, 107, 219)'

  export default {
    name: 'GTimePicker',
    components: { GPicker },
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

      color: {
        type: String,
        default: DEFAULT_COLOR
      },
      headerColor: {
        type: String,
        default: DEFAULT_COLOR
      },

      landscape: Boolean,
      // Predefined width for date picker
      width: {
        type: [Number, String],
        default: 290,
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

      // Title
      const titleRenderFn = (function () {
        const cptTitleClass = computed(() => ({
          'g-time-picker__title': true,
          'g-time-picker__title--landscape': props.landscape
        }))
        const cptTitleTimeClass = computed(() => ({
          'g-time-picker__title__time': true,
          'g-time-picker__title__time--landscape': props.landscape
        }))
        const cptTitleHourClass = computed(() => ({
          'g-time-picker__title__time__number': true,
          'g-time-picker__title__time__number--active': state.activeTimePicker.hour
        }))
        const cptTitleMinuteClass = computed(() => ({
          'g-time-picker__title__time__number': true,
          'g-time-picker__title__time__number--active': state.activeTimePicker.minute
        }))
        const cptTitleSecondClass = computed(() => ({
          'g-time-picker__title__time__number': true,
          'g-time-picker__title__time__number--active': state.activeTimePicker.second
        }))
        const cptAMClass = computed(() => ({
          'g-time-picker__title__period__value': true,
          'g-time-picker__title__period__value--active': state.activePeriodPicker.AM,
          'g-time-picker__title__period__value--readonly': props.readonly,
        }))
        const cptPMClass = computed(() => ({
          'g-time-picker__title__period__value': true,
          'g-time-picker__title__period__value--active': state.activePeriodPicker.PM,
          'g-time-picker__title__period__value--readonly': props.readonly,
        }))

        // render fn
        function renderSeparator() {
          return <span class="g-time-picker__title__time__separator">:</span>
        }

        function renderSecondIfUseSeconds() {
          return props.useSeconds ? [
            renderSeparator(),
            <span class={cptTitleSecondClass.value} vOn:click_stop={showSecondsPicker}>
              {pad(state.selectedTime.seconds)}
            </span>
          ] : undefined
        }

        function renderPeriodIfShowPeriod() {
          return state.showPeriod
              ? <div class="g-time-picker__title__period">
                <div class={cptAMClass.value} vOn:click_stop={showAMPicker}>AM</div>
                <div class={cptPMClass.value} vOn:click_stop={showPMPicker}>PM</div>
              </div>
              : undefined
        }

        return () => (
            <div class={cptTitleClass.value}>
              <div class={cptTitleTimeClass.value}>
                <span class={cptTitleHourClass.value} vOn:click_stop={showHoursPicker}>
                  {pad(getFormattedHours(state.selectedTime.hours, props))}
                </span>
                {renderSeparator()}
                <span class={cptTitleMinuteClass.value} vOn:click_stop={showMinutesPicker}>
                  {pad(state.selectedTime.minutes)}
                </span>
                {renderSecondIfUseSeconds()}
              </div>
              {renderPeriodIfShowPeriod()}
            </div>
        )
      })()

      // Clock
      const cptHandStyle = computedHandStyle(props, state)
      const cptHandColorOptions = computed(() => setBackgroundColor(props.color || DEFAULT_COLOR, {}))

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
        if (props.disabled || props.readonly) {
          return
        }

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

      function getColorObject(timeModel) {
        return timeModel.selected ? setBackgroundColor(props.color || DEFAULT_COLOR, {}) : {}
      }

      function renderHourNumber(hour) {
        let hourColor = getColorObject(hour)
        return <span
            class={[hour.class, hourColor.class, { 'g-time-picker__clock__inner__number--selectable': !props.disabled && !props.readonly }]}
            style={[hour.style, hourColor.style]}
            vOn:click_stop={() => {
              hour.select()
              showMinutesPicker()
            }}>
          <span>{hour.value}</span>
        </span>
      }

      function hourRenderFn() {
        if (state.activeTimePicker.hour) {
          addNumberClass(hoursModel.value)
          let outter = hoursModel.value.filter((_, index) => index < 12)
          let inner = hoursModel.value.filter((_, index) => index >= 12)
          let hourElements = []
          // 0 -> 11
          hourElements.push(calcFaceNumberPosition(outter, 1).map(renderHourNumber))
          // 12 -> 23
          hourElements.push(calcFaceNumberPosition(inner, 0.6).map(renderHourNumber))

          return hourElements
        }

        return undefined
      }

      function minuteRenderFn() {
        if (state.activeTimePicker.minute) {
          return calcFaceNumberPosition(addNumberClass(minutesModel.value)).map((minute, index) => {
            if (index % 5 !== 0) {
              return undefined
            }
            let color = getColorObject(minute)
            return <span class={[minute.class, color.class]} style={[minute.style, color.style]}>
              <span>{minute.value}</span>
            </span>
          })
        }

        return undefined
      }

      function secondRenderFn() {
        if (props.useSeconds && state.activeTimePicker.second) {
          return calcFaceNumberPosition(addNumberClass(secondsModel.value)).map((second, index) => {
                if (index % 5 !== 0) {
                  return undefined
                }
                let color = getColorObject(second)
                return <span class={[second.class, color.class]}
                             style={[second.style, color.style]}>
                  <span>{second.value}</span>
                </span>

              }
          )
        }

        return undefined
      }

      function clockRenderFn() {
        return (
            <div class="g-time-picker__clock" vOn:click_stop={onClockClicked} vOn:wheel={wheelHandle}>
              <div class="g-time-picker__clock__inner">
                <div class={['g-time-picker__clock__inner__hand', cptHandColorOptions.value.class]}
                     style={[cptHandStyle.value, cptHandColorOptions.value.style]}></div>
                {hourRenderFn()}
                {minuteRenderFn()}
                {secondRenderFn()}
              </div>
            </div>
        )
      }

      return function GTimePickerRenderFn() {
        return (
            <g-picker
                disabled={props.disabled}
                landscape={props.landscape}
                width={props.width && props.width >= 300 ? props.width : MINIMUM_WIDTH}
                color={props.headerColor || props.color || DEFAULT_COLOR}>
              <template slot="title">
                {titleRenderFn()}
              </template>
              <div key={state.activePicker}>
                {clockRenderFn()}
              </div>
              <template slot="actions">
                <slot/>
              </template>
            </g-picker>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-time-picker {
    &__title {
      $inactiveOpacity: 0.6;
      $activeOpacity: 1;

      display: flex;
      justify-content: center;
      line-height: 1;
      color: #FFFFFF;

      &--landscape {
        flex-direction: column;
        align-items: center;
        height: 100%;
      }

      &__time {
        font-family: "Roboto", sans-serif;
        font-size: 50px;

        &--landscape {
          font-size: 30px;
        }

        &__number {
          opacity: $inactiveOpacity;

          &--active {
            opacity: $activeOpacity;
          }
        }
      }

      &__period {
        font-size: 16px;
        padding: 8px 5px;

        &__value {
          opacity: $inactiveOpacity;

          &--active {
            opacity: $activeOpacity;
          }

          &--readonly {
            pointer-events: none;
          }
        }
      }
    }

    &__clock {
      $clockBgColor: #f7e6e6;
      $clockSize: 270px;
      $clockPadding: 25px;
      $clockInnerSize: $clockSize - 2 * $clockPadding;
      $handStartSize: 10px;
      $handEndSize: 8px;
      $handColor: rgb(145, 107, 219);

      width: $clockSize;
      height: $clockSize;
      border-radius: 100%;
      background-color: $clockBgColor;
      margin: 15px auto;

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
          border: 1px solid $handColor;
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
