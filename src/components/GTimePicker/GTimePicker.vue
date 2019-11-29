<script>
  import _ from 'lodash'
  import { computed } from '@vue/composition-api'
  import GPicker from '../GPicker/GPicker'
  import GTimePickerUtil, { HourConvention, HourConventionValidator, getFormattedHours, ActiveTimePicker, ActivePeriodPicker } from './logic/GTimePickerUtil'
  import { computedHandStyle, getSelectedIndex, range0_23PositionStyle, range0_59PositionStyle } from './logic/GTimePickerUIHelper';
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
      }
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
      const cptTitleHourClassStyle = computed(() => (setTextColor(props.titleTextColor, {
        class: {
          'g-time-picker__title__time__number': true,
          'g-time-picker__title__time__number--active': state.activeTimePicker === ActiveTimePicker.hour
        }
      })))
      const cptTitleMinuteClassStyle = computed(() => (setTextColor(props.titleTextColor, {
        class: {
          'g-time-picker__title__time__number': true,
          'g-time-picker__title__time__number--active': state.activeTimePicker === ActiveTimePicker.minute
        }
      })))
      const cptTitleSecondClassStyle = computed(() => (setTextColor(props.titleTextColor, {
        class: {
          'g-time-picker__title__time__number': true,
          'g-time-picker__title__time__number--active': state.activeTimePicker === ActiveTimePicker.second
        }
      })))
      const cptAMClassStyle = computed(() => (setTextColor(props.titleTextColor, {
        class: {
          'g-time-picker__title__period__value': true,
          'g-time-picker__title__period__value--active': state.activePeriodPicker === ActivePeriodPicker.AM,
          'g-time-picker__title__period__value--readonly': props.readonly,
        }
      })))
      const cptPMClassStyle = computed(() => (setTextColor(props.titleTextColor, {
        class: {
          'g-time-picker__title__period__value': true,
          'g-time-picker__title__period__value--active': state.activePeriodPicker === ActivePeriodPicker.PM,
          'g-time-picker__title__period__value--readonly': props.readonly,
        }
      })))
      const cptSeparatorClassStyle = computed(() => setTextColor(props.titleTextColor), {
        class: {
          'g-time-picker__title__time__separator': true
        }
      })

      const renderTitle = () => (
          <div class={{ 'g-time-picker__title': true, 'g-time-picker__title--landscape': props.landscape }}>
            <div class={{ 'g-time-picker__title__time': true, 'g-time-picker__title__time--landscape': props.landscape }}>
              <span {...cptTitleHourClassStyle.value} vOn:click_stop={showHoursPicker}>
                {_.padStart(String(getFormattedHours(state.selectedTime.hours, props)), 2, '0')}
              </span>
              <span {...cptSeparatorClassStyle.value}>:</span>
              <span {...cptTitleMinuteClassStyle.value} vOn:click_stop={showMinutesPicker}>
                {_.padStart(state.selectedTime.minutes, 2, '0')}
              </span>
              {props.useSeconds && [
                <span {...cptSeparatorClassStyle.value}>:</span>,
                <span {...cptTitleSecondClassStyle.value} vOn:click_stop={showSecondsPicker}>
                  {_.padStart(state.selectedTime.seconds, 2, '0')}
                </span>
              ]}
            </div>
            {state.showPeriod && <div class="g-time-picker__title__period">
              <div {...cptAMClassStyle.value} vOn:click_stop={showAMPicker}>AM</div>
              <div {...cptPMClassStyle.value} vOn:click_stop={showPMPicker}>PM</div>
            </div>}
          </div>
      )

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

        let changeFn = (state.activeTimePicker === ActiveTimePicker.hour
            ? adjustHours
            : state.activeTimePicker === ActiveTimePicker.minute
                ? adjustMinutes
                : adjustSeconds)

        changeFn(changeValue)
      }

      function updateTime(e) {
        const { width, height, left, top } = e.target.getBoundingClientRect()
        const itemsLength = state.activeTimePicker === ActiveTimePicker.hour ? 12 : 60;
        let targetPos
        if (e instanceof TouchEvent) {
          if (e.touches.length === 0) {
            return
          }
          targetPos = { x: e.touches[0].clientX - left, y: e.touches[0].clientY - top }
        } else {
          targetPos = { x: e.clientX - left, y: e.clientY - top }
        }
        let index = getSelectedIndex({ width, height }, targetPos, itemsLength)
        if (index !== -1) {
          if (state.activeTimePicker === ActiveTimePicker.hour) {
            // 24 hours specified
            const { Ox, Oy } = { Ox: width / 2, Oy: height / 2 }
            const distance = Math.sqrt(Math.pow(targetPos.x - Ox, 2) + Math.pow(targetPos.y - Oy, 2))
            if ((distance < (width / 2 * 0.6)) && props.hourConvention === HourConvention._24HRS) {
              index += 12
            }
            hoursModel.value[index].select()
          } else if (state.activeTimePicker === ActiveTimePicker.minute) {
            minutesModel.value[index].select()
          } else if (state.activeTimePicker === ActiveTimePicker.second) {
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
        if (props.disabled || props.readonly) {
          return
        }

        if (mouseDownState) {
          touchMoved = true
          updateTime(e)
        }
      }

      function onMouseUp(e) {
        if (props.disabled || props.readonly) {
          return
        }

        // last update for mouse up, doesn't update when touchend because touchend doesn't contain position
        if (!(e instanceof TouchEvent)) {
          updateTime(e)
        }
        // touchend doesn't contain touch position => prevent time picker switch to another view (minutes, seconds) when touchmove is not call
        if (e instanceof TouchEvent && !touchMoved) {
          return
        }

        mouseDownState = false
        if (state.activeTimePicker === ActiveTimePicker.hour) {
          showMinutesPicker()
        } else if (state.activeTimePicker === ActiveTimePicker.minute && props.useSeconds) {
          showSecondsPicker()
        } else {
          context.emit('timeselected')
        }
      }

      function getNumberClassStyle(number, positionStyle) {
        let classStyle = {
          class: {
            'g-time-picker__clock__inner__number': true,
            'g-time-picker__clock__inner__number--selected': number.selected,
            'g-time-picker__clock__inner__number--readonly': props.readonly,
            'g-time-picker__clock__inner__number--disabled': props.disabled
          },
          style: {
            ...positionStyle
          }
        }

        // add color
        if (number.selected) {
          setBackgroundColor(props.clockHandColor, classStyle)
          setTextColor(props.clockSelectedNumberColor, classStyle)
        } else {
          setTextColor(props.clockNumberColor, classStyle)
        }

        return classStyle
      }

      function renderClock() {
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
                  {
                    state.activeTimePicker === ActiveTimePicker.hour && hoursModel.value.map((hour, index) =>
                      <span{...getNumberClassStyle(hour, range0_23PositionStyle[index])}>{hour.value}</span>)
                  }
                  {
                    state.activeTimePicker === ActiveTimePicker.minute && minutesModel.value.map((minute, index) => {
                      if (index % 5 === 0) {
                        return <span {...getNumberClassStyle(minute, range0_59PositionStyle[index])}>{minute.value}</span>
                      }
                    })
                  }
                  {
                    props.useSeconds && state.activeTimePicker === ActiveTimePicker.second && secondsModel.value.map((second, index) => {
                          if (index % 5 === 0) {
                            return <span {...getNumberClassStyle(second, range0_59PositionStyle[index])}>{second.value}</span>
                          }
                        }
                    )
                  }
                </div>
              </div>
            </div>
        )
      }

      function GTimePickerRenderFn() {
        return (
            <g-picker
                disabled={props.disabled}
                landscape={props.landscape}
                width={props.width && props.width >= MINIMUM_WIDTH ? props.width : MINIMUM_WIDTH}
                color={props.titleBgColor || DEFAULT_COLOR}>
              <template slot="title">
                {renderTitle()}
              </template>
              <div key={state.activePicker}>
                {renderClock()}
              </div>
              <template slot="actions">
                <slot/>
              </template>
            </g-picker>
        )
      }

      return {
        state,
        //
        showHoursPicker,
        showMinutesPicker,
        showSecondsPicker,
        showAMPicker,
        showPMPicker,
        GTimePickerRenderFn
      }
    },
    render() {
      return this.GTimePickerRenderFn()
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
