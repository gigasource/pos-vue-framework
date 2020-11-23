<template>
  <div :class="classes"
       :style="styles"
       v-ripple="ripple"
       @click="onclick"
       @mouseleave="onmouseleave"
       @mouseenter="onmouseenter"
       @mousedown="onmousedown"
       @mouseup="onmouseup">
    <g-icon v-if="checkIconAvailable(icon)" :svg="checkSvgIcon(icon)" :size="_iconSize"
            :class="vertical ? 'mb-2' : 'mr-2'">
      {{icon}}
    </g-icon>
    <slot></slot>
    <g-icon v-if="checkIconAvailable(iconAfter)" :svg="checkSvgIcon(iconAfter)" :size="_iconSize"
            :class="vertical ? 'mt-2' : 'ml-2'">
      {{iconAfter}}
    </g-icon>
  </div>
</template>

<script>
  import {computed} from 'vue'
  import {convertToUnit} from '../../utils/helpers';
  import {linearGradient, getHslColor, getCssColor} from '../../utils/colors';
  import Ripple from '../../directives/ripple/ripple';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: "GBtnBs",
    components: {GIcon},
    directives: {
      Ripple
    },
    props: {
      ripple: {type: Boolean, default: true},
      icon: [Boolean, String],
      iconAfter: [Boolean, String],
      iconSize: [Number, String],
      dashed: Boolean,
      rounded: Boolean,
      uppercase: Boolean,
      nowrap: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      vertical: Boolean,
      block: Boolean,
      dense: Boolean,
      small: Boolean,
      large: Boolean,
      textColor: String,
      backgroundColor: String,
      borderColor: String,
      borderRadius: [Number, String],
      gradient: String,
      gradientAngle: {type: String, default: '45deg'},
      gridArea: String,
      elevation: [Number, String],
      height: [String, Number],
      minHeight: [String, Number],
      maxHeight: [String, Number],
      width: [String, Number],
      minWidth: [String, Number],
      maxWidth: [String, Number],
    },
    setup(props, context) {
      const classes = computed(() => ({
        'g-btn-bs': true,
        'g-btn-bs__dashed': props.dashed,
        'g-btn-bs__rounded': props.rounded,
        'g-btn-bs__uppercase': props.uppercase,
        'g-btn-bs__nowrap': props.nowrap,
        'g-btn-bs__disabled': props.disabled,
        'g-btn-bs__readonly': props.readonly,
        'g-btn-bs__vertical': props.vertical,
        'g-btn-bs__block': props.block,
        'g-btn-bs__dense': props.dense,
        'g-btn-bs__small': props.small && !props.large,
        'g-btn-bs__large': props.large && !props.small,
        [`elevation-${props.elevation}`]: props.elevation
      }))

      const styles = computed(() => {
        let _styles = {
          ...props.width && { width: convertToUnit(props.width) },
          ...props.height && { height: convertToUnit(props.height) },
          ...props.maxWidth && { maxWidth: convertToUnit(props.maxWidth) },
          ...props.maxHeight && { maxHeight: convertToUnit(props.maxHeight) },
          ...props.minWidth && { minWidth: convertToUnit(props.minWidth) },
          ...props.minHeight && { minHeight: convertToUnit(props.minHeight) },
        }
        if (props.borderColor) {
          _styles['border-color'] = getCssColor(props.borderColor)
          if (!props.textColor) {
            _styles['color'] = getCssColor(props.borderColor)
          }
          if (!props.backgroundColor) {
            _styles['background-color'] = '#FFFFFF'
          }
        }
        if (props.backgroundColor) {
          _styles['background-color'] = getCssColor(props.backgroundColor)
          const {l, a} = getHslColor(getCssColor(props.backgroundColor))
          if (l < 65 && a > 0.65) {
            _styles['color'] = '#FFFFFF' //set Text Color to white if lightness of background < 65 & opacity > 0.65 (threshold of 65 can change if necessary)
          }
        }
        if (props.elevation && !props.backgroundColor) {
          _styles['background-color'] = '#FFFFFF'
        }
        if (props.textColor) {
          _styles['color'] = getCssColor(props.textColor)
        }

        if (props.gradient) {
          _styles['background'] = linearGradient(props.gradient && props.gradient.split(','), props.gradientAngle);
        }

        if (props.borderRadius) {
          const corners = typeof props.borderRadius === 'string' ? props.borderRadius.split(' ') : [props.borderRadius]
          _styles['border-radius'] = corners.map(c => convertToUnit(c)).join(' ')
        }

        if (props.gridArea) {
          _styles['grid-area'] = props.gridArea
        }

        return _styles
      })

      const onclick = e => context.emit('click', e)
      const onmouseleave = e => context.emit('mouseleave', e)
      const onmouseenter = e => context.emit('mouseenter', e)
      const onmouseup = e => context.emit('mouseup', e)
      const onmousedown = e => context.emit('mousedown', e)

      const checkIconAvailable = icon => {
        return icon && typeof icon === 'string'
      }

      const checkSvgIcon = icon => {
        if (icon && typeof icon === 'string') {
          return _.startsWith(icon, 'icon')
        }
        return false
      }

      const _iconSize = computed(() => {
        if (props.iconSize)
          return props.iconSize
        else if (props.small && !props.large) {
          return 16
        } else if (props.large && !props.small) {
          return 28
        } else
          return 24
      })

      return {
        classes,
        styles,
        onclick,
        onmouseenter,
        onmouseleave,
        onmousedown,
        onmouseup,
        checkIconAvailable,
        checkSvgIcon,
        _iconSize,
      }
    }
  }
</script>

<style scoped lang="scss">
  .g-btn-bs {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    user-select: none;
    cursor: pointer;
    padding: 5px 10px;
    margin: 0 8px;
    line-height: 24px;
    border-radius: 4px;
    border: 1px solid transparent;

    & > .g-icon {
      color: inherit;
    }

    &__dashed {
      border-style: dashed;
    }

    &__rounded {
      border-radius: 9999px;
    }

    &__uppercase {
      text-transform: uppercase;
    }

    &__nowrap {
      white-space: nowrap;
    }

    &__disabled {
      opacity: 0.54;
    }

    &__disabled,
    &__readonly {
      pointer-events: none;
    }

    &__vertical {
      flex-direction: column;
    }

    &__block {
      display: flex;
    }

    &__small {
      font-size: 14px;
      line-height: 16px;
      padding: 4px 8px;
    }

    &__large {
      font-size: 18px;
      line-height: 28px;
      padding: 8px 12px;
    }

    &__dense {
      line-height: 0.9;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
</style>
