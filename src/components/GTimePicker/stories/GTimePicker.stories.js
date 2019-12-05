import { boolean, text, withKnobs, select, array, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GTimePicker from '../GTimePicker'
import GTimePickerInput from '../GTimePickerInput'
import _ from 'lodash'

//
export default {
  title: 'GTimePicker',
  decorators: [withKnobs],
}

export const Index = () => ({
  components: { GTimePicker },
  props: {
    disabled: {
      type: Boolean,
      default: boolean('disabled', false)
    },
    readonly: {
      type: Boolean,
      default: boolean('readonly', false)
    },
    scrollable: {
      type: Boolean,
      default: boolean('scrollable', false),
    },
    useSeconds: {
      type: Boolean,
      default: boolean('useSeconds', false)
    },
    value: {
      type: String,
      default: text('value', '15:18:30')
    },
    width: { default: number('width', 300) },
    landscape: { default: boolean('landscape', false) },
    // color
    titleBgColor: {
      type: String,
      default: text('titleBgColor', null)
    },
    titleTextColor: {
      type: String,
      default: text('titleTextColor', null),
    },
    // clock
    clockWrapperColor: {
      type: String,
      default: text('clockWrapperColor', null)
    },
    clockFaceColor: {
      type: String,
      default: text('clockFaceColor', null)
    },
    clockNumberColor: {
      type: String,
      default: text('clockNumberColor', null)
    },
    clockSelectedNumberColor: {
      type: String,
      default: text('clockSelectedNumberColor', null)
    },
    clockHandColor: {
      type: String,
      default: text('clockHandColor', null)
    }
  },
  setup(props) {
    return () => (
        <div style="display: flex;">
          <div>
            <h4>12 Hours</h4>
            <g-time-picker
                disabled={props.disabled}
                readonly={props.readonly}
                scrollable={props.scrollable}
                useSeconds={props.useSeconds}
                value={props.value}
                color={props.color}
                header-color={props.headerColor}
                width={props.width}
                landscape={props.landscape}

                titleBgColor={props.titleBgColor}
                titleTextColor={props.titleTextColor}
                clockWrapperColor={props.clockWrapperColor}
                clockFaceColor={props.clockFaceColor}
                clockNumberColor={props.clockNumberColor}
                clockSelectedNumberColor={props.clockSelectedNumberColor}
                clockHandColor={props.clockHandColor}
                vOn:input={action('input')}
            >
            </g-time-picker>
          </div>
          <div>
            <h4>24 Hours</h4>
            <g-time-picker
                disabled={props.disabled}
                readonly={props.readonly}
                scrollable={props.scrollable}
                useSeconds={props.useSeconds}
                value={props.value}
                use24Hours
                color={props.color}
                header-color={props.headerColor}
                width={props.width}
                landscape={props.landscape}

                titleBgColor={props.titleBgColor}
                titleTextColor={props.titleTextColor}
                clockWrapperColor={props.clockWrapperColor}
                clockFaceColor={props.clockFaceColor}
                clockNumberColor={props.clockNumberColor}
                clockSelectedNumberColor={props.clockSelectedNumberColor}
                clockHandColor={props.clockHandColor}
                vOn:update_period={action('period')}
                vOn:input={action('input')}
            >
            </g-time-picker>
          </div>
        </div>
    )
  }
})

export const gTimePickerInput = () => ({
  components: { GTimePicker, GTimePickerInput },
  props: {
    // time picker
    disabled: { type: Boolean, default: boolean('disabled', false) },
    readonly: { type: Boolean, default: boolean('readonly', false) },
    scrollable: { type: Boolean, default: boolean('scrollable', false), },
    useSeconds: { type: Boolean, default: boolean('useSeconds', false) },
    value: { type: String, default: text('value', null) },
    landscape: { default: boolean('landscape', false) },
    titleBgColor: { type: String, default: text('titleBgColor', null) },
    titleTextColor: { type: String, default: text('titleTextColor', null), },
    clockWrapperColor: { type: String, default: text('clockWrapperColor', null) },
    clockFaceColor: { type: String, default: text('clockFaceColor', null) },
    clockNumberColor: { type: String, default: text('clockNumberColor', null) },
    clockSelectedNumberColor: { type: String, default: text('clockSelectedNumberColor', null) },
    clockHandColor: { type: String, default: text('clockHandColor', null) },
    // g-text-field
    label: { default: text('Input label', 'Label') },
    filled: { default: boolean('filled', false) },
    solo: { default: boolean('solo', false) },
    outlined: { default: boolean('outlined', false) },
    flat: { default: boolean('flat', false) },
    dense: { default: boolean('dense', false) },
    rounded: { default: boolean('rounded', false) },
    shaped: { default: boolean('shaped', false) },
    required: { default: boolean('required', false)},
  },
  setup(props) {
    return () => <div>
      <g-time-picker-input {...{
        props: _.pick(props, ['disabled', 'readonly', 'scrollable', 'useSeconds', 'value', 'landscape', 'titleBgColor',
          'titleTextColor', 'clockWrapperColor', 'clockFaceColor', 'clockNumberColor', 'clockSelectedNumberColor', 'clockHandColor',
          'label', 'filled', 'solo', 'outlined', 'flat', 'dense', 'rounded', 'shaped', ''])
      }}/>
      <g-time-picker-input use24Hours {...{
        props: _.pick(props, ['disabled', 'readonly', 'scrollable', 'useSeconds', 'value', 'landscape', 'titleBgColor',
          'titleTextColor', 'clockWrapperColor', 'clockFaceColor', 'clockNumberColor', 'clockSelectedNumberColor', 'clockHandColor',
          'label', 'filled', 'solo', 'outlined', 'flat', 'dense', 'rounded', 'shaped', ''])
      }}/>
    </div>
  }
})
