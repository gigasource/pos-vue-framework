import { boolean, text, withKnobs, select, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GTimePicker from '../GTimePicker'
import { HourConvention } from '../logic/GTimePickerUtil';

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
      default: boolean( 'scrollable', false),
    },
    useSeconds: {
      type: Boolean,
      default: boolean('useSeconds', false)
    },
    value: {
      type: String,
      default: text('value', '15:18:30')
    }
  },
  setup(props) {
    return () => (
        <div style='display: flex;'>
          <div style='padding: 20px;'>
            <h5>12 Hours Clock</h5>
            <g-time-picker
                disabled={props.disabled}
                readonly={props.readonly}
                scrollable={props.scrollable}
                useSeconds={props.useSeconds}
                value={props.value}
                hourConvention={HourConvention._12HRS}
                vOn:update_period={action('period')}
                vOn:input={action('input')}
            >
            </g-time-picker>
          </div>

          <div style='padding: 20px;'>
            <h5>24 Hours Clock</h5>
            <g-time-picker
                disabled={props.disabled}
                readonly={props.readonly}
                scrollable={props.scrollable}
                useSeconds={props.useSeconds}
                value={props.value}
                hourConvention={HourConvention._24HRS}
            >
            </g-time-picker>
          </div>
        </div>
    )
  }
})


export const Alloweds = () => ({
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
      default: boolean( 'scrollable', false),
    },
    useSeconds: {
      type: Boolean,
      default: boolean('useSeconds', false)
    },
    value: {
      type: String,
      default: text('value', '15:18:30')
    },
    allowedHours: {
      default: array('allowedHours', [0, 1, 2, 3, 4])
    }
  },
  setup(props) {
    return () => (
        <div style='display: flex;'>
          <div style='padding: 20px;'>
            <h5>12 Hours Clock</h5>
            <g-time-picker
                disabled={props.disabled}
                readonly={props.readonly}
                scrollable={props.scrollable}
                useSeconds={props.useSeconds}
                value={props.value}
                hourConvention={HourConvention._12HRS}
                allowedHours={props.allowedHours}
                vOn:update_period={action('period')}
                vOn:input={action('input')}
            >
            </g-time-picker>
          </div>

          <div style='padding: 20px;'>
            <h5>24 Hours Clock</h5>
            <g-time-picker
                disabled={props.disabled}
                readonly={props.readonly}
                scrollable={props.scrollable}
                useSeconds={props.useSeconds}
                value={props.value}
                hourConvention={HourConvention._24HRS}
            >
            </g-time-picker>
          </div>
        </div>
    )
  }
})
