import { text, withKnobs, boolean, number, color , select, radios, array, date, button } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'

import GDatePicker from '../GDatePicker'
import { reactive } from 'vue';

//
export default {
  title: 'GDatePicker',
  decorators: [withKnobs],
}

export const SingleValueDatePicker = () => ({
  components: { GDatePicker },
  props: {
    max: { default: text('max', '2030-10-19') },
    min: { default: text('min', '2019-10-10') },
    modelValue: { default: text('value', '2019-10-15') },
    color: { default: text('color', "") },
    headerColor: { default: text('headerColor', "") },
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
  template: `
    <g-date-picker
      :max="max"
      :min="min"
      v-model="modelValue"
      :color="color"
      :header-color="headerColor"
      :full-width="fullWidth"
      :width="width"
      :no-title="noTitle"
      :landscape="landscape"
      :first-day-of-week="firstDayOfWeek"
      :show-week="showWeek"
      :show-current="showCurrent"
      type='date'
      :disabled="disabled"
      :readonly="readonly"
      :scrollable="scrollable"
  />`
})

export const MultipleValueDatePicker = () => ({
  components: { GDatePicker },
  props: {
    max: { default: text('max', '2030-10-25') },
    min: { default: text('min', '2019-10-10') },
    modelValue: { default: array('value', ['2019-10-15', '2019-10-19']) },
    color: { default: text('color', '') },
    headerColor: { default: text('headerColor', '') },
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
  template: `<g-date-picker
        :max="max"
        :min="min"
        v-model="modelValue"
        :color="color"
        :header-color="headerColor"
        :full-width="fullWidth"
        :width="width"
        :no-title="noTitle"
        :landscape="landscape"
        :first-day-of-week="firstDayOfWeek"
        :show-week="showWeek"
        :show-current="showCurrent"
        type='date'
        :disabled="disabled"
        :readonly="readonly"
        :scrollable="scrollable"
        multiple
    />`
})


export const RangeValueDatePicker = () => ({
  components: { GDatePicker },
  props: {
    max: { default: text('max', '2030-10-25') },
    min: { default: text('min', '2019-10-10') },
    modelValue: { default: array('value', ['2019-10-15', '2019-10-19']) },
    color: { default: text('color', '') },
    rangeColor: { default: text('rangeColor', '') },
    headerColor: { default: text('headerColor', '') },
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
  template: `<g-date-picker
      :max="max"
      :min="min"
      v-model="modelValue"
      :color="color"
      :range-color="rangeColor"
      :header-color="headerColor"
      :full-width="fullWidth"
      :width="width"
      :no-title="noTitle"
      :landscape="landscape"
      :first-day-of-week="firstDayOfWeek"
      :show-week="showWeek"
      :show-current="showCurrent"
      type='date'
      :disabled="disabled"
      :readonly="readonly"
      :scrollable="scrollable"
      range
  />`
})

export const SingleValueMonthPicker = () => ({
  components: { GDatePicker },
  props: {
    modelValue: { default: text('value', '2019-10') },
    color: { default: text('color', '') },
    headerColor: { default: text('headerColor', '') },
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
  template: `<div>
    <g-date-picker
        v-model="modelValue"
        :color="color"
        :header-color="headerColor"
        :full-width="fullWidth"
        :width="width"
        :no-title="noTitle"
        :landscape="landscape"
        :first-day-of-week="firstDayOfWeek"
        :show-week="showWeek"
        :show-current="showCurrent"
        type='month'
        :disabled="disabled"
        :readonly="readonly"
        :scrollable="scrollable"
    />
    <p>For some reason, min, max doesn't work well in storybook</p>
  </div>`
})

export const MultipleValueMonthPicker = () => ({
  components: { GDatePicker },
  props: {
    modelValue: { default: array('value', ['2019-10', '2019-12']) },
    color: { default: text('color', '') },
    headerColor: { default: text('headerColor', '') },
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
  template: `<div>
    <g-date-picker
        v-model="modelValue"
        :color="color"
        :header-color="headerColor"
        :full-width="fullWidth"
        :width="width"
        :no-title="noTitle"
        :landscape="landscape"
        :first-day-of-week="firstDayOfWeek"
        :show-week="showWeek"
        :show-current="showCurrent"
        type='month'
        :disabled="disabled"
        :readonly="readonly"
        :scrollable="scrollable"
        multiple
    />
    <p>For some reason, min, max doesn't work well in storybook</p>
  </div>`
})
