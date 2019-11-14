<script>
  import {computed, ref, onMounted, onUpdated} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';
  import {setTextColor} from '../../mixins/colorable';
  //import { Fragment } from 'vue-fragment'

  export default {
    name: "GIconJSX",
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

      const icon = computed(() => context.slots.default ? context.slots.default()[0].text.trim() : '')

      const iconColor = computed(() => setTextColor(props.color, {}))

      const iconClass = computed(() => ({
        ...iconColor.value.class,
        'g-icon': true,
        'g-icon__dense': props.dense,
        'g-icon__disabled': props.disabled,
        'g-icon__left': props.left,
        'g-icon__right': props.right,
        'g-icon__link': !!context.listeners.click,
      }))

      const iconStyle = computed(() => ({
        ...iconColor.value.style,
        'font-size': getSize(props),
      }))

      function genFontAwesomeIcon() {
        iconClass.value[icon.value] = true
        return <i class={iconClass.value}
                  style={iconStyle.value}
                  vOn:click={onClick}/>
      }

      function genMaterialIcon() {
        let iconType = 'material-icons'
        const delimiterIndex = icon.value.indexOf('-')
        const isMdiIcon = !(delimiterIndex <= -1)
        if (isMdiIcon) {
          iconType = icon.value.slice(0, delimiterIndex)
          iconClass.value[icon.value] = true
        }

        iconClass.value[iconType] = true
        return <i class={iconClass.value}
                  style={iconStyle.value}
                  vOn:click={onClick}>{!isMdiIcon ? icon.value : ''}</i>
      }

      function genSvgIcon() {
        iconClass.value['g-icon__svg'] = true
        iconStyle.value['width'] = getSize(props)
        iconStyle.value['height'] = getSize(props)
        return <svg class={iconClass.value}
                    style={iconStyle.value}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    vOn:click={onClick}>
          <path d={icon.value}/>
        </svg>
      }

      function genCustomSvgIcon() {
        iconStyle.value['width'] = getSize(props)
        iconStyle.value['height'] = getSize(props)
        return <img class={iconClass.value}
                    style={iconStyle.value}
                    src={icon.value}
                    alt="Can't load icon"
                    vOn:click={onClick}/>
      }

      function genIcon() {
        return isFontAwesome5(icon.value) ? genFontAwesomeIcon()
            : isSvgPath(icon.value) ? genSvgIcon()
                : isCustomSvgIcon(icon.value) ? genCustomSvgIcon()
                    : genMaterialIcon()
      }

      return {
        genIcon
      }
    },

    render() {
      return this.genIcon()
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