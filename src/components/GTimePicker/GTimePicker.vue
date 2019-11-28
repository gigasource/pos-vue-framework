<script>
  import _ from 'lodash'
  import { computed } from '@vue/composition-api'
  import GPicker from '../GPicker/GPicker'
  import GTimePickerUtil, { HourConvention, HourConventionValidator, getFormattedHours } from './logic/GTimePickerUtil'
  import { computedHandStyle, getSelectedIndex, range0_23PositionStyle, range0_59PositionStyle } from './logic/GTimePickerUIHelper';
  import { pad } from '../GDatePicker/logic/utils';
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable';

  const MINIMUM_WIDTH = 300
  const DEFAULT_COLOR = 'rgb(98, 0, 237)'

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

      landscape: Boolean,
      // Predefined width for date picker
      width: {
        type: [Number, String],
        default: 290,
      },

      // coloring
      // title
      titleBgColor: {
        type: String,
        default: DEFAULT_COLOR,
      },
      titleTextColor: {
        type: String,
        default: '#fff',
      },
      // clock
      clockWrapperColor: {
        type: String,
        default: '#fff'
      },
      clockFaceColor: {
        type: String,
        default: '#eee'
      },
      clockNumberColor: {
        type: String,
        default: DEFAULT_COLOR
      },
      clockSelectedNumberColor: {
        type: String,
        default: '#fff'
      },
      clockHandColor: {
        type: String,
        default: DEFAULT_COLOR
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
        const cptTitleHourClassStyle = computed(() => (setTextColor(props.titleTextColor, {
          class: {
            'g-time-picker__title__time__number': true,
            'g-time-picker__title__time__number--active': state.activeTimePicker.hour
          }
        })))
        const cptTitleMinuteClassStyle = computed(() => (setTextColor(props.titleTextColor, {
          class: {
            'g-time-picker__title__time__number': true,
            'g-time-picker__title__time__number--active': state.activeTimePicker.minute
          }
        })))
        const cptTitleSecondClassStyle = computed(() => (setTextColor(props.titleTextColor, {
          class: {
            'g-time-picker__title__time__number': true,
            'g-time-picker__title__time__number--active': state.activeTimePicker.second
          }
        })))
        const cptAMClassStyle = computed(() => (setTextColor(props.titleTextColor, {
          class: {
            'g-time-picker__title__period__value': true,
            'g-time-picker__title__period__value--active': state.activePeriodPicker.AM,
            'g-time-picker__title__period__value--readonly': props.readonly,
          }
        })))
        const cptPMClassStyle = computed(() => (setTextColor(props.titleTextColor, {
          class: {
            'g-time-picker__title__period__value': true,
            'g-time-picker__title__period__value--active': state.activePeriodPicker.PM,
            'g-time-picker__title__period__value--readonly': props.readonly,
          }
        })))
        const cptSeparatorClassStyle = computed(() => setTextColor(props.titleTextColor), {
          class: {
            'g-time-picker__title__time__separator': true
          }
        })
        // render fn
        function renderSeparator() {
          return <span class={cptSeparatorClassStyle.value.class} style={cptSeparatorClassStyle.value.style}>:</span>
        }

        function renderSecondIfUseSeconds() {
          return props.useSeconds ? [
            renderSeparator(),
            <span class={cptTitleSecondClassStyle.value.class}
                  style={cptTitleSecondClassStyle.value.style}
                  vOn:click_stop={showSecondsPicker}>
              {pad(state.selectedTime.seconds)}
            </span>
          ] : undefined
        }

        function renderPeriodIfShowPeriod() {
          return state.showPeriod
              ? <div class="g-time-picker__title__period">
                  <div class={cptAMClassStyle.value.class}
                       style={cptAMClassStyle.value.style}
                       vOn:click_stop={showAMPicker}>AM</div>
                  <div class={cptPMClassStyle.value.class}
                       style={cptPMClassStyle.value.style}
                       vOn:click_stop={showPMPicker}>PM</div>
                </div>
              : undefined
        }

        return () => (
            <div class={cptTitleClass.value}>
              <div class={cptTitleTimeClass.value}>
                <span class={cptTitleHourClassStyle.value.class}
                      style={cptTitleHourClassStyle.value.style}
                      vOn:click_stop={showHoursPicker}>
                  {pad(getFormattedHours(state.selectedTime.hours, props))}
                </span>
                {renderSeparator()}
                <span class={cptTitleMinuteClassStyle.value.class}
                      style={cptTitleMinuteClassStyle.value.style}
                      vOn:click_stop={showMinutesPicker}>
                  {pad(state.selectedTime.minutes)}
                </span>
                {renderSecondIfUseSeconds()}
              </div>
              {renderPeriodIfShowPeriod()}
            </div>
        )
      })()

      // Clock
      const cptHandPositionAndRotateStyle = computedHandStyle(props, state)
      const cptHandColorStyle = computed(() => setBackgroundColor(props.clockHandColor, {}))
      const cptClockWrapperClassStyle = computed(() => setBackgroundColor(props.clockWrapperColor, {
        class: {
          'g-time-picker__clock-wrapper': true
        }
      }))
      const cptClockClassStyle = computed(() => setBackgroundColor(props.clockFaceColor, {
        class: {
          'g-time-picker__clock': true
        }
      }))

      function onWheel(e) {
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

      function updateTime(e) {
        const {width, height, left, top} = e.target.getBoundingClientRect()
        const itemsLength = state.activeTimePicker.hour ?  12: 60;
        let targetPos
        if (e instanceof TouchEvent) {
          if (e.touches.length === 0)
            return
          targetPos = { x: e.touches[0].clientX - left, y: e.touches[0].clientY - top }
        } else {
          targetPos = { x: e.clientX - left, y: e.clientY - top }
        }
        let index = getSelectedIndex({width, height}, targetPos, itemsLength)
        if (index !== -1) {
          if (state.activeTimePicker.hour) {
            // 24 hours specified
            const { Ox, Oy } = { Ox: width/2, Oy: height/2 }
            const distance = Math.sqrt(Math.pow(targetPos.x - Ox, 2) + Math.pow(targetPos.y - Oy, 2))
            if ((distance < (width / 2 * 0.6)) && props.hourConvention === HourConvention._24HRS)
              index += 12
            hoursModel.value[index].select()
          } else if (state.activeTimePicker.minute) {
            minutesModel.value[index].select()
          } else if (state.activeTimePicker.second) {
            secondsModel.value[index].select()
          }
        }
      }

      let mouseDownState = false
      let touchMoved = false
      function onMouseDown(e) {
        mouseDownState = true
        touchMoved = false
      }
      function onMouseMove(e) {
        if (mouseDownState) {
          touchMoved = true
          updateTime(e)
        }
      }
      function onMouseUp(e) {
        // last update for mouse up, doesn't update when touchend because touchend doesn't contain position
        if (!(e instanceof TouchEvent))
          updateTime(e)
        // touchend doesn't contain touch position => prevent time picker switch to another view (minutes, seconds) when touchmove is not call
        if (e instanceof TouchEvent && !touchMoved) {
          return
        }

        mouseDownState = false
        if (state.activeTimePicker.hour)
          showMinutesPicker()
        else if (state.activeTimePicker.minute && props.useSeconds)
          showSecondsPicker()
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

      function getNumberColorStyle(timeModel) {
        let classStyle = {}
        if (timeModel.selected) {
          setBackgroundColor(props.clockHandColor, classStyle)
          setTextColor(props.clockSelectedNumberColor, classStyle)
        } else {
          setTextColor(props.clockNumberColor, classStyle)
        }
        return classStyle
      }

      function hourRenderFn() {
        if (state.activeTimePicker.hour) {
          return addNumberClass(hoursModel.value).map((hour, index) => {
            let hourColor = getNumberColorStyle(hour)
            return <span vShow={state.activeTimePicker.hour}
                class={[hour.class, hourColor.class, ]}
                style={[hour.style, hourColor.style, range0_23PositionStyle[index]]}
                vOn:click_prevent_stop={(e) => {
                  hour.select()
                  showMinutesPicker()
                }}>
              <span>{hour.value}</span>
            </span>
          })
        }
        return undefined
      }

      function minuteRenderFn() {
        if (state.activeTimePicker.minute) {
          return addNumberClass(minutesModel.value).map((minute, index) => {
            if (index % 5 !== 0) {
              return undefined
            }
            let color = getNumberColorStyle(minute)
            return <span class={[minute.class, color.class]} style={[minute.style, color.style, range0_59PositionStyle[index]]}>
              <span>{minute.value}</span>
            </span>
          })
        }

        return undefined
      }

      function secondRenderFn() {
        if (props.useSeconds && state.activeTimePicker.second) {
          return addNumberClass(secondsModel.value).map((second, index) => {
                if (index % 5 !== 0) {
                  return undefined
                }
                let color = getNumberColorStyle(second)
                return <span class={[second.class, color.class]}
                             style={[second.style, color.style, range0_59PositionStyle[index]]}>
                  <span>{second.value}</span>
                </span>

              }
          )
        }

        return undefined
      }

      function clockRenderFn() {
        return (
            <div class={cptClockWrapperClassStyle.value.class} style={cptClockWrapperClassStyle.value.style}>
              <div class={cptClockClassStyle.value.class}
                   style={cptClockClassStyle.value.style}
                   vOn:wheel={onWheel}
                   vOn:mousemove={onMouseMove}
                   vOn:touchmove={onMouseMove}
                   vOn:mouseup={onMouseUp}
                   vOn:touchend={onMouseUp}
                   vOn:touchstart={onMouseDown}
                   vOn:mousedown={onMouseDown}>
                <div class="g-time-picker__clock__inner">
                  <div class={['g-time-picker__clock__inner__hand', cptHandColorStyle.value.class]}
                       style={[cptHandPositionAndRotateStyle.value, cptHandColorStyle.value.style]}></div>
                  {hourRenderFn()}
                  {minuteRenderFn()}
                  {secondRenderFn()}
                </div>
              </div>
            </div>
        )
      }

      return function GTimePickerRenderFn() {
        return (
            <g-picker
                disabled={props.disabled}
                landscape={props.landscape}
                width={props.width && props.width >= MINIMUM_WIDTH ? props.width : MINIMUM_WIDTH}
                color={props.titleBgColor || DEFAULT_COLOR}>
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
          cursor: pointer;

          &--active {
            opacity: $activeOpacity;
          }
        }

        &__separator {
          opacity: $inactiveOpacity;
        }
      }

      &__period {
        font-size: 16px;
        padding: 8px 5px;

        &__value {
          opacity: $inactiveOpacity;
          cursor: pointer;

          &--active {
            opacity: $activeOpacity;
          }

          &--readonly {
            pointer-events: none;
            cursor: default;
          }
        }
      }
    }

    &__clock-wrapper {
      width: 100%;
      height: 100%;
      padding: 15px;
    }


    &__clock {
      $clockSize: 270px;
      $clockPadding: 25px;
      $clockInnerSize: $clockSize - 2 * $clockPadding;
      $handStartSize: 10px;
      $handEndSize: 8px;
      $handColor: rgb(145, 107, 219);

      width: $clockSize;
      height: $clockSize;
      border-radius: 100%;

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
