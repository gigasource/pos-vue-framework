<template>
    <span>
        <i v-if="_tag.i" :class="iconClass" :style="iconStyle" :aria-hidden="attributes.ariaHidden"
           :role="attributes.role">{{content}}</i>
        <svg v-if="_tag.svg" :class="iconClass" :style="iconStyle" :aria-hidden="attributes.ariaHidden"
             :role="attributes.role"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
            <path :d="icon"></path>
        </svg>
        <component v-if="_tag.component" :is="_component" :class="iconClass" :style="iconStyle"
                   :aria-hidden="attributes.ariaHidden" :role="attributes.role">
        </component>
        <slot v-if="con"></slot>
    </span>
</template>

<script>
  import {computed, reactive} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';
  import {setBackgroundColor} from "../../mixins/colorable";
  import {getObjectValueByPath} from "./helper";

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
      let iconClass = reactive({})
      let iconStyle = reactive({})
      let self = context.parent.$children[context.parent.$children.length - 1]
      let iconName = self.$slots.default[0].text
      let icon = remapInternalIcon(self, iconName)
      let _tag = {
        i: true,
        svg: false,
        component: false
      }
      let con = true

      let content = ''
      if (typeof icon === 'string' && !isSvgPath(icon)) { //render Font icons: Material Icon(default), Font Awesome 5
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

        iconClass[iconType] = true
        iconClass[icon] = !isMaterialIcon
        iconStyle['fontSize'] = getSize(props)
        let color = setBackgroundColor(props.color,{})
        iconClass = reactive({               //TO DO: group code to apply color function
          ...iconClass,
          ...color.class
        })
        iconStyle = reactive({
          ...iconStyle,
          ...color.style
        })
        //self.$slots.default[0].text = ''   // Problem!!! Must delete slot node in template or content in component
        con = false
      }

      if (typeof icon === 'string' && isSvgPath(icon)) {
        _tag.svg = true
        _tag.i = false

        iconClass['g-icon__svg'] = true
        let _fontSize = getSize(props)
        iconStyle['fontSize'] = _fontSize
        iconStyle['width'] = _fontSize
        iconStyle['height'] = _fontSize
        let color = setBackgroundColor(props.color,{})
        iconClass = reactive({
          ...iconClass,
          ...color.class
        })
        iconStyle = reactive({
          ...iconStyle,
          ...color.style
        })
        con = false
      }

      let _component = {}
      if (typeof icon !== 'string') {
        _tag.component = true
        _tag.i = false

        iconClass['v-icon__is-component'] = true
        let _fontSize = getSize(props)
        iconStyle['fontSize'] = _fontSize
        iconStyle['height'] = _fontSize
        let color = setBackgroundColor(props.color,{})
        iconClass = reactive({
          ...iconClass,
          ...color.class
        })
        iconStyle = reactive({
          ...iconStyle,
          ...color.style
        })

        _component = icon.component
        // data.props = icon.props
        // data.nativeOn = data.on
        con = false
      }

      console.log(self)
      iconClass['g-icon'] = true
      iconClass['g-icon__dense'] = props.dense
      iconClass['g-icon__disabled'] = props.disabled
      iconClass['g-icon__left'] = props.left
      iconClass['g-icon__right'] = props.right
      iconClass['g-icon__link'] = self.$listeners.click
      let attributes = {
        ariaHidden: !!self.$listeners.click,
        role: self.$listeners.click ? 'button' : null
      }
      return {
        iconClass,
        iconStyle,
        attributes,
        _tag,
        _component,
        content,
        icon,
        con,
      }
    }
  }

  function remapInternalIcon(vm, iconName) {
    if (!iconName.startsWith('$')) {
      return iconName
    }

    const iconPath = `$vuetify.icons.values.${iconName.split('$').pop().split('.').pop()}`

    return getObjectValueByPath(vm, iconPath, iconName)
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

  function applyColor() {

  }
</script>

<style scoped>
</style>
