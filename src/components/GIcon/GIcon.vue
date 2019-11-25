<script>
  import { computed } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';
  import { setTextColor } from '../../mixins/colorable';

  export default {
    name: 'GIcon',
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
      svg: Boolean,
    },
    setup: function (props, context) {
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

      function genSvgIcon(svgName, iconClass, iconStyle) {
        iconClass['g-icon__svg'] = true
        iconClass[svgName] = true
        iconStyle['width'] = getSize(props)
        iconStyle['height'] = getSize(props)

        return <div class={iconClass}
                    style={iconStyle}
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

        if (props.svg) return genSvgIcon(icon, iconClass, iconStyle)
        if (isFontAwesome5(icon)) return genFontAwesomeIcon(icon, iconClass, iconStyle)
        return genMaterialIcon(icon, iconClass, iconStyle)
      }

      return {
        genIcon
      }
    },

    render() {
      const icon = this.$slots.default ? this.$slots.default[0].text.trim() : ''
      return this.genIcon(icon)
    }
  }

  function isFontAwesome5(icon) {
    return ['fas', 'far', 'fal', 'fab'].some(val => icon.includes(val))
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
