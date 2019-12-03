import { text, withKnobs, boolean, number } from '@storybook/addon-knobs'
import _ from 'lodash'
import GTooltip from '../GTooltip'

//
export default {
  title: 'GTooltip',
  decorators: [withKnobs],
}

export const playground = () => ({
  components: { GTooltip },
  props: {
    /*position w window*/
    ...{
      // Indicate whether tooltip should be shown with absolute position
      absolute: {
        default: boolean('absolute', false)
      },
      // absolute left when absolute props is exist
      absoluteX: {
        type: [Number, String],
        default: number('absoluteX', 0)
      },
      // absolute top when absolute props is exist
      absoluteY: {
        type: [Number, String],
        default: number('absoluteY', 0)
      },
    },
    /*position w activator*/
    ...{
      // relative position of tooltip content with tooltip activator
      // automatically compute position, centering tooltip content
      // NOTE THAT: this value will be enabled if absolute props is not provided

      // tooltip shown below activator
      bottom: {
        type: Boolean,
        default: boolean('bottom', false)
      },
      // tooltip shown on the left of activator
      left: {
        type: Boolean,
        default: boolean('left', false)
      },
      // tooltip show on the right of activator
      right: {
        type: Boolean,
        default: boolean('right', false)
      },
      // tooltip show above of activator
      top: {
        type: Boolean,
        default: boolean('top', false)
      },

      // offset tooltip content with tooltip activator

      // NOTE THAT: the result will be computed:
      //  - if absolute props is not provided
      //  - after automatically position (bottom | left | right | top)
      nudgeBottom: {
        type: [Number, String],
        default: number('nudgeBottom', 0),
      },
      nudgeLeft: {
        type: [Number, String],
        default: number('nudgeLeft', 0),
      },
      nudgeRight: {
        type: [Number, String],
        default: number('nudgeRight', 0),
      },
      nudgeTop: {
        type: [Number, String],
        default: number('nudgeTop', 0),
      },
      nudgeWidth: {
        type: [Number, String],
        default: number('nudgeWidth', 0),
      },
    },
    /*position w overflow*/
    ...{
      allowOverflow: {
        type: Boolean,
        default: boolean('allowOverflow', false)
      },
      offsetOverflow: {
        type: Boolean,
        default: boolean('offsetOverflow', false)
      },
    },
    /*position w attached el*/
    // ...{
    //   attach: [Boolean, String, Object],
    //   offsetY: Boolean,
    //   offsetX: Boolean,
    // },
    /*maxWidth, minWidth*/
    ...{
      maxWidth: {
        type: [Number, String],
        default: text('maxWidth', 'auto'),
      },
      minWidth: {
        type: [Number, String],
        default: text('minWidth', null)
      },
    },
    /*behavior*/
    ...{
      // By default, the tooltip will be shown if user click to activator
      openOnHover: {
        type: Boolean,
        default: boolean('openOnHover', false),
      },
      // delay
      closeDelay: {
        type: [Number, String],
        default: text('closeDelay', '0'),
      },
      openDelay: {
        type: [Number, String],
        default: text('openDelay', '0'),
      },
    },
    /*look & feel*/
    ...{
      transition: {
        type: String,
        default: text('transition', '')
      },
      // background color of tooltip
      color: {
        type: String,
        default: text('color', '#616161')
      },
      // boolean value indicate whether tooltip should be shown in speech bubble style
      speechBubble: {
        type: Boolean,
        default: boolean('speechBubble', true)
      }
    },
  },
  setup(props) {
    console.log(props.speechBubble)
    return () => (
        <div app style='position: relative; padding: 300px;'>
          <g-tooltip
              {
                ...{
                  props: {
                    ..._.pick(props, [
                      'absolute', 'absoluteX', 'absoluteY',
                      'bottom', 'left', 'right', 'top',
                      'nudgeBottom', 'nudgeLeft', 'nudgeRight', 'nudgeTop', 'nudgeWidth',
                      'allowOverflow', 'offsetOverflow', 'maxWidth', 'minWidth', 'openOnHover', 'closeDelay', 'openDelay',
                      'transition', 'color', 'speechBubble'
                    ])
                  }}
              }
              scopedSlots={{
                activator: (activatorListeners) => {
                  return <button
                      vOn:click={activatorListeners.on.click || (() => {
                      })}
                      vOn:mouseenter={activatorListeners.on.mouseenter || (() => {
                      })}
                      vOn:mouseleave={activatorListeners.on.mouseleave || (() => {
                      })}
                      vOn:blur={activatorListeners.on.blur || (() => {
                      })}>
                    Hello there
                  </button>
                }
              }}>
            Tooltip content
          </g-tooltip>
        </div>
    )
  }
})
