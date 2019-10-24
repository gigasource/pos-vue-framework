import { boolean, text, withKnobs, select, array, number } from '@storybook/addon-knobs';
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
    },
    color: { default: text('color', '#916') },
    headerColor: { default: text('headerColor', '#916') },
    width: { default: number('width', 300) },
    landscape: { default: boolean('landscape', false)},
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
                hourConvention={HourConvention._12HRS}
                color={props.color}
                header-color={props.headerColor}
                width={props.width}
                landscape={props.landscape}
                vOn:update_period={action('period')}
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
                hourConvention={HourConvention._24HRS}
                color={props.color}
                header-color={props.headerColor}
                width={props.width}
                landscape={props.landscape}
                vOn:update_period={action('period')}
                vOn:input={action('input')}
            >
            </g-time-picker>
          </div>
        </div>
    )
  }
})
