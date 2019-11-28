import { text, withKnobs, boolean, number, color , select, radios, array, date, button } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'

import GDatePickerInput from '../GDatePickerInput'
import { reactive } from '@vue/composition-api';

//
export default {
  title: 'GDatePickerInput',
  decorators: [withKnobs],
}

export const SingleValueDatePicker = () => ({
  components: { GDatePickerInput },
  props: {
    max: { default: text('max', '2030-10-19') },
    min: { default: text('min', '2019-10-10') },
    value: { default: text('value', '2019-10-15') },
    color: { default: text('color', null) },
    headerColor: { default: text('headerColor', null) },
    fullWidth: { default: boolean('fullWidth', false) },
    width: { default: number('width', 300) },
    noTitle: { default: boolean('noTitle', false )},
    landscape: { default: boolean('landscape', false)},
    firstDayOfWeek: { default: number('firstDayOfWeek', 0, { max: 7, min: 0, step: 1}) },
    showWeek: { default: boolean('showWeek', false)},
    showCurrent: { default: boolean('showCurrent', false) },
    disabled: { default: boolean('disabled', false) },
    readonly: { default: boolean('readonly', false)},
    scrollable: { default: boolean('scrollable', false)},
  },
  setup(props) {
    return () =>
      <g-date-picker-input
          label={'Due date'}
        max={props.max}
        min={props.min}
        value={props.value}
        color={props.color}
        header-color={props.headerColor}
        full-width={props.fullWidth}
        width={props.width}
        no-title={props.noTitle}
        landscape={props.landscape}
        first-day-of-week={props.firstDayOfWeek}
        show-week={props.showWeek}
        show-current={props.showCurrent}
        type='date'
        disabled={props.disabled}
        readonly={props.readonly}
        scrollable={props.scrollable}
      />
  }
})

export const MultipleValueDatePicker = () => ({
  components: { GDatePickerInput },
  props: {
    max: { default: text('max', '2030-10-25') },
    min: { default: text('min', '2019-10-10') },
    value: { default: array('value', ['2019-10-15', '2019-10-19']) },
    color: { default: text('color', null) },
    headerColor: { default: text('headerColor', null) },
    fullWidth: { default: boolean('fullWidth', false) },
    width: { default: number('width', 300) },
    noTitle: { default: boolean('noTitle', false )},
    landscape: { default: boolean('landscape', false)},
    firstDayOfWeek: { default: number('firstDayOfWeek', 0, { max: 7, min: 0, step: 1}) },
    showWeek: { default: boolean('showWeek', false)},
    showCurrent: { default: boolean('showCurrent', false) },
    disabled: { default: boolean('disabled', false) },
    readonly: { default: boolean('readonly', false)},
    scrollable: { default: boolean('scrollable', false)},
  },
  setup(props) {
    return () =>
        <g-date-picker-input
            label={'Due date'}
            max={props.max}
            min={props.min}
            value={props.value}
            color={props.color}
            header-color={props.headerColor}
            full-width={props.fullWidth}
            width={props.width}
            no-title={props.noTitle}
            landscape={props.landscape}
            first-day-of-week={props.firstDayOfWeek}
            show-week={props.showWeek}
            show-current={props.showCurrent}
            type='date'
            disabled={props.disabled}
            readonly={props.readonly}
            scrollable={props.scrollable}
            multiple
        />
  }
})


export const RangeValueDatePicker = () => ({
  components: { GDatePickerInput },
  props: {
    max: { default: text('max', '2030-10-25') },
    min: { default: text('min', '2019-10-10') },
    value: { default: array('value', ['2019-10-15', '2019-10-19']) },
    color: { default: text('color', null) },
    rangeColor: { default: text('rangeColor', null) },
    headerColor: { default: text('headerColor', null) },
    fullWidth: { default: boolean('fullWidth', false) },
    width: { default: number('width', 300) },
    noTitle: { default: boolean('noTitle', false )},
    landscape: { default: boolean('landscape', false)},
    firstDayOfWeek: { default: number('firstDayOfWeek', 0, { max: 7, min: 0, step: 1}) },
    showWeek: { default: boolean('showWeek', false)},
    showCurrent: { default: boolean('showCurrent', false) },
    disabled: { default: boolean('disabled', false) },
    readonly: { default: boolean('readonly', false)},
    scrollable: { default: boolean('scrollable', false)},
  },
  setup(props) {
    return () =>
        <g-date-picker-input
            label={'Due date'}
            max={props.max}
            min={props.min}
            value={props.value}
            color={props.color}
            range-color={props.rangeColor}
            header-color={props.headerColor}
            full-width={props.fullWidth}
            width={props.width}
            no-title={props.noTitle}
            landscape={props.landscape}
            first-day-of-week={props.firstDayOfWeek}
            show-week={props.showWeek}
            show-current={props.showCurrent}
            type='date'
            disabled={props.disabled}
            readonly={props.readonly}
            scrollable={props.scrollable}
            range
        />
  }
})

export const SingleValueMonthPicker = () => ({
  components: { GDatePickerInput },
  props: {
    value: { default: text('value', '2019-10') },
    color: { default: text('color', null) },
    headerColor: { default: text('headerColor', null) },
    fullWidth: { default: boolean('fullWidth', false) },
    width: { default: number('width', 300) },
    noTitle: { default: boolean('noTitle', false )},
    landscape: { default: boolean('landscape', false)},
    firstDayOfWeek: { default: number('firstDayOfWeek', 0, { max: 7, min: 0, step: 1}) },
    showWeek: { default: boolean('showWeek', false)},
    showCurrent: { default: boolean('showCurrent', false) },
    disabled: { default: boolean('disabled', false) },
    readonly: { default: boolean('readonly', false)},
    scrollable: { default: boolean('scrollable', false)},
  },
  setup(props) {
    return () =>
        <div>
          <g-date-picker-input
              label={'Due date'}
              value={props.value}
              color={props.color}
              header-color={props.headerColor}
              full-width={props.fullWidth}
              width={props.width}
              no-title={props.noTitle}
              landscape={props.landscape}
              first-day-of-week={props.firstDayOfWeek}
              show-week={props.showWeek}
              show-current={props.showCurrent}
              type='month'
              disabled={props.disabled}
              readonly={props.readonly}
              scrollable={props.scrollable}
          />
          <p>For some reason, min, max doesn't work well in storybook</p>
        </div>


  }
})

export const MultipleValueMonthPicker = () => ({
  components: { GDatePickerInput },
  props: {
    value: { default: array('value', ['2019-10', '2019-12']) },
    color: { default: text('color', null) },
    headerColor: { default: text('headerColor', null) },
    fullWidth: { default: boolean('fullWidth', false) },
    width: { default: number('width', 300) },
    noTitle: { default: boolean('noTitle', false )},
    landscape: { default: boolean('landscape', false)},
    firstDayOfWeek: { default: number('firstDayOfWeek', 0, { max: 7, min: 0, step: 1}) },
    showWeek: { default: boolean('showWeek', false)},
    showCurrent: { default: boolean('showCurrent', false) },
    disabled: { default: boolean('disabled', false) },
    readonly: { default: boolean('readonly', false)},
    scrollable: { default: boolean('scrollable', false)},
  },
  setup(props) {
    return () =>
        <div>
          <g-date-picker-input
              label={'Due date'}
              value={props.value}
              color={props.color}
              header-color={props.headerColor}
              full-width={props.fullWidth}
              width={props.width}
              no-title={props.noTitle}
              landscape={props.landscape}
              first-day-of-week={props.firstDayOfWeek}
              show-week={props.showWeek}
              show-current={props.showCurrent}
              type='month'
              disabled={props.disabled}
              readonly={props.readonly}
              scrollable={props.scrollable}
              multiple
          />
          <p>For some reason, min, max doesn't work well in storybook</p>
        </div>
  }
})
