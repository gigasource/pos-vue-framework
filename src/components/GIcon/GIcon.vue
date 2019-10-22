<template>
    <span>
        <i v-if="_tag.i" :class="iconClass" :style="iconStyle"
           :aria-hidden="attributes.ariaHidden"
           :role="attributes.role">{{content}}</i>
        <svg v-if="_tag.svg" :class="iconClass" :style="iconStyle"
             :aria-hidden="attributes.ariaHidden"
             :role="attributes.role"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
            <path :d="icon"></path>
        </svg>
        <slot v-if="_tag.slot"></slot>
    </span>
</template>

<script>
  import {computed} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';
  import {setBackgroundColor} from "../../mixins/colorable";

  export default {
    name: "GIcon",

    props: {
      dense: Boolean,
      disabled: Boolean,
      left: Boolean,
      right: Boolean,
      size: [Number, String],
      xSmall: Boolean,
      small: Boolean,
      medium: Boolean,
      large: Boolean,
      xLarge: Boolean,
      color: [String],
      tag: {
        type: String,
        required: false,
        default: 'i',
      },
    },

    setup(props, context) {
      let self = context.parent.$children[context.parent.$children.length - 1]
      let icon = self.$slots.default[0].text
      let _tag = {
        i: true,
        svg: false,
        slot: true
      }
      let content = ''


      function iconTemplate() {
        let data = {
          class: {},
          style: {}
        }

        if (!isSvgPath(icon)) { //render Font icons: Material Icon(default), Font Awesome 5
          let materialIcon = icon
          let iconType = 'material-icons'
          const delimiterIndex = icon.indexOf('-')
          const isMaterialIcon = delimiterIndex <= -1

          if (isMaterialIcon) {
            content = materialIcon
          } else {
            iconType = icon.slice(0, delimiterIndex)
            if (isFontAwesome5(iconType)) iconType = ''
          }

          data.class[iconType] = true
          data.class[icon] = !isMaterialIcon
          data.style['fontSize'] = getSize(props)
        }

        if (isSvgPath(icon)) {
          _tag.svg = true
          _tag.i = false

          data.class['g-icon__svg'] = true
          data.style['fontSize'] = getSize(props)
          data.style['width'] = getSize(props)
          data.style['height'] = getSize(props)
        }

        _tag.slot = false

        return data
      }


      let color = setBackgroundColor(props.color, {})
      let data = iconTemplate()
      let classObj = data.class
      let styleObj = data.style

      let iconClass = computed(() => {
        return {
          ...classObj,
          ...color.class,
          'g-icon': true,
          'g-icon__dense': props.dense,
          'g-icon__disabled': props.disabled,
          'g-icon__left': props.left,
          'g-icon__right': props.right,
          'g-icon__link': !!self.$listeners.click
        }
      })


      let iconStyle = computed(() => {
        return {
          ...styleObj,
          ...color.style
        }
      })


      let attributes = computed(() => {
        return {
          ariaHidden: !!self.$listeners.click,
          role: self.$listeners.click ? 'button' : null
        }
      })

      return {
        iconClass,
        iconStyle,
        attributes,
        _tag,
        content,
        icon,
      }
    }
  }

  function isFontAwesome5(icon) {
    return ['fas', 'far', 'fal', 'fab'].some(val => icon.includes(val))
  }

  function isSvgPath(icon) {
    return (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(icon) && /[\dz]$/i.test(icon) && icon.length > 4)
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
