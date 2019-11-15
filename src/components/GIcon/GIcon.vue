<script>
  import {computed} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';
  import {setTextColor} from '../../mixins/colorable';

  export default {
    name: "GIcon",
    props: {
      value: String,
      dense: Boolean,
      disabled: Boolean,
      left: Boolean,
      right: Boolean,
      color: [String],
      size: [Number, String],
      xSmall: Boolean,
      small: Boolean,
      medium: Boolean,
      large: Boolean,
      xLarge: Boolean,
    },
    setup(props, context) {
      const onClick = (event) => {
        context.emit('click', event);
      }

      const iconColor = computed(() => setTextColor(props.color))

      function genFontAwesomeIcon(icon, iconClass, iconStyle) {
        iconClass[icon] = true
        return <i class={iconClass}
                  style={iconStyle}
                  vOn:click={onClick}/>
      }

      function genMaterialIcon(icon, iconClass, iconStyle) {
        let iconType = 'material-icons'
        const delimiterIndex = icon.indexOf('-')
        const isMdiIcon = !(delimiterIndex <= -1)
        if (isMdiIcon) {
          iconType = icon.slice(0, delimiterIndex)
          iconClass[icon] = true
        }

        iconClass[iconType] = true
        return <i class={iconClass}
                  style={iconStyle}
                  vOn:click={onClick}>{!isMdiIcon ? icon : ''}</i>
      }

      function genSvgIcon(icon, iconClass, iconStyle) {
        iconClass['g-icon__svg'] = true
        iconStyle['width'] = getSize(props)
        iconStyle['height'] = getSize(props)
        return <svg class={iconClass}
                    style={iconStyle}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    vOn:click={onClick}>
          <path d={icon} fill={props.color}/>
        </svg>
      }

      function genCustomSvgIcon(icon, iconClass, iconStyle) {
        iconStyle['width'] = getSize(props)
        iconStyle['height'] = getSize(props)
        return <img class={iconClass}
                    style={iconStyle}
                    src={icon}
                    alt="Can't load icon"
                    vOn:click={onClick}/>
      }

      function genIcon(icon) {
        const iconClass = {
          ...iconColor.value.class,
          'g-icon': true,
          'g-icon__dense': props.dense,
          'g-icon__disabled': props.disabled,
          'g-icon__left': props.left,
          'g-icon__right': props.right,
          'g-icon__link': !!context.listeners.click,
        }

        const iconStyle = {
          ...iconColor.value.style,
          'font-size': getSize(props),
        }

        return isFontAwesome5(icon) ? genFontAwesomeIcon(icon, iconClass, iconStyle)
            : isSvgPath(icon) ? genSvgIcon(icon, iconClass, iconStyle)
                : isCustomSvgIcon(icon) ? genCustomSvgIcon(icon, iconClass, iconStyle)
                    : genMaterialIcon(icon, iconClass, iconStyle)
      }

      return {
        genIcon
      }
    },

    render() {
      const icon = this.$slots.default && this.$slots.default[0] ? this.$slots.default[0].text.trim() : ''
      return this.genIcon(icon)
    }
  }

  function isFontAwesome5(icon) {
    return ['fas', 'far', 'fal', 'fab'].some(val => icon.includes(val))
  }

  function isSvgPath(icon) {
    return (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(icon) && /[\dz]$/i.test(icon) && icon.length > 4)
  }

  function isCustomSvgIcon(icon) {
    return icon.slice(-3) === 'svg'
  }

  function getSize(props) {
    if (props.xSmall) return '12px'
    if (props.small) return '16px'
    if (props.medium) return '28px'
    if (props.large) return '36px'
    if (props.xLarge) return '40px'
    if (props.size) return convertToUnit(props.size)
    return '24px'
  }
</script>

<style scoped lang="scss">
  @import "GIcon";
</style>