import { text, withKnobs, boolean, number, color , select, radios, array, date, button } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'

import GDatePicker from '../GDatePicker'
import { reactive } from '@vue/composition-api';

//
export default {
  title: 'GDatePicker',
  decorators: [withKnobs],
}

export const SingleValueDatePicker = () => ({
  components: { GDatePicker },
  props: {
    max: { default: text('max', '2019-10-19') },
    min: { default: text('min', '2019-10-10') },
    value: { default: text('value', '2019-10-15') },
    color: { default: text('color', '#66BB6A') },
    headerColor: { default: text('headerColor', '#1867c0') },
    fullWidth: { default: boolean('fullWidth', false) },
    width: { default: number('width', 300) },
    noTitle: { default: boolean('noTitle', false )},
    landscape: { default: boolean('landscape', false)},
    firstDayOfWeek: { default: number('firstDayOfWeek', 0, { max: 7, min: 0, step: 1}) },
    showWeek: { default: boolean('showWeek', false)},
    showCurrent: { default: boolean('showCurrent', false) },
    type: { default: select('type', { date: 'date', month: 'month' }, 'date')},
    disabled: { default: boolean('disabled', false) },
    readonly: { default: boolean('readonly', false)},
    scrollable: { default: boolean('scrollable', false)},
  },
  setup(props) {
    return () =>
      <g-date-picker
        max={props.max}
        min={props.min}
        vModel={props.value}
        color={props.color}
        header-color={props.headerColor}
        full-width={props.fullWidth}
        width={props.width}
        no-title={props.noTitle}
        landscape={props.landscape}
        first-day-of-week={props.firstDayOfWeek}
        show-week={props.showWeek}
        show-current={props.showCurrent}
        type={props.type}
        disabled={props.disabled}
        readonly={props.readonly}
        scrollable={props.scrollable}
      />
  }
})

export const MultipleValueDatePicker = () => ({
  components: { GDatePicker },
  props: {
    max: { default: text('max', '2019-10-25') },
    min: { default: text('min', '2019-10-10') },
    value: { default: array('value', ['2019-10-15', '2019-10-19']) },
    color: { default: text('color', '#66BB6A') },
    headerColor: { default: text('headerColor', '#1867c0') },
    fullWidth: { default: boolean('fullWidth', false) },
    width: { default: number('width', 300) },
    noTitle: { default: boolean('noTitle', false )},
    landscape: { default: boolean('landscape', false)},
    firstDayOfWeek: { default: number('firstDayOfWeek', 0, { max: 7, min: 0, step: 1}) },
    showWeek: { default: boolean('showWeek', false)},
    showCurrent: { default: boolean('showCurrent', false) },
    type: { default: select('type', { date: 'date', month: 'month' }, 'date')},
    disabled: { default: boolean('disabled', false) },
    readonly: { default: boolean('readonly', false)},
    scrollable: { default: boolean('scrollable', false)},
    range: { default: boolean('range', false )},
    multiple: { default: boolean('multiple', false) }
  },
  setup(props) {
    return () =>
        <g-date-picker
            max={props.max}
            min={props.min}
            vModel={props.value}
            color={props.color}
            header-color={props.headerColor}
            full-width={props.fullWidth}
            width={props.width}
            no-title={props.noTitle}
            landscape={props.landscape}
            first-day-of-week={props.firstDayOfWeek}
            show-week={props.showWeek}
            show-current={props.showCurrent}
            type={props.type}
            disabled={props.disabled}
            readonly={props.readonly}
            scrollable={props.scrollable}
            multiple
        />
  }
})


export const RangeValueDatePicker = () => ({
  components: { GDatePicker },
  props: {
    max: { default: text('max', '2019-10-25') },
    min: { default: text('min', '2019-10-10') },
    value: { default: array('value', ['2019-10-15', '2019-10-19']) },
    color: { default: text('color', '#66BB6A') },
    headerColor: { default: text('headerColor', '#1867c0') },
    fullWidth: { default: boolean('fullWidth', false) },
    width: { default: number('width', 300) },
    noTitle: { default: boolean('noTitle', false )},
    landscape: { default: boolean('landscape', false)},
    firstDayOfWeek: { default: number('firstDayOfWeek', 0, { max: 7, min: 0, step: 1}) },
    showWeek: { default: boolean('showWeek', false)},
    showCurrent: { default: boolean('showCurrent', false) },
    type: { default: select('type', { date: 'date', month: 'month' }, 'date')},
    disabled: { default: boolean('disabled', false) },
    readonly: { default: boolean('readonly', false)},
    scrollable: { default: boolean('scrollable', false)},
    range: { default: boolean('range', false )},
    multiple: { default: boolean('multiple', false) }
  },
  setup(props) {
    return () =>
        <g-date-picker
            max={props.max}
            min={props.min}
            vModel={props.value}
            color={props.color}
            header-color={props.headerColor}
            full-width={props.fullWidth}
            width={props.width}
            no-title={props.noTitle}
            landscape={props.landscape}
            first-day-of-week={props.firstDayOfWeek}
            show-week={props.showWeek}
            show-current={props.showCurrent}
            type={props.type}
            disabled={props.disabled}
            readonly={props.readonly}
            scrollable={props.scrollable}
            range
        />
  }
})
