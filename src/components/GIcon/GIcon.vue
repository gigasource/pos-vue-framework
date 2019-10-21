<template>
    <div>
        <i v-if="_tag.i" :class="iconClass" :style="iconStyle" :aria-hidden="attributes.ariaHidden" :role="attributes.role">{{content}}</i>
        <svg v-if="_tag.svg" :class="iconClass" :style="iconStyle" :aria-hidden="attributes.ariaHidden" :role="attributes.role"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
            <path :d="icon" :fill="props.color"></path>
        </svg>
        <component v-if="_tag.component" :is="_component" :class="iconClass" :style="iconStyle" :aria-hidden="attributes.ariaHidden" :role="attributes.role">
        </component>
        <slot v-if="con"></slot>
    </div>
</template>

<script>
  import {computed, createElement as h, onMounted, reactive, ref, watch} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';

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
        iconStyle['color'] = props.color
        //self.$slots.default[0].text = ''   // Problem!!! Must delete slot node in template or content in component
        con = false
      }

      if (typeof icon === 'string' && isSvgPath(icon)) {
        _tag.svg = true
        _tag.i = false

        iconClass['g-icon--svg'] = true
        let _fontSize = getSize(props)
        iconStyle['fontSize'] = _fontSize
        iconStyle['width'] = _fontSize
        iconStyle['height'] = _fontSize
        con = false
      }

      let _component = {}
      if (typeof icon !== 'string') {
        _tag.component = true
        _tag.i = false

        iconClass['v-icon--is-component'] = true
        let _fontSize = getSize(props)
        iconStyle['fontSize'] = _fontSize
        iconStyle['height'] = _fontSize

        _component = icon.component
        // data.props = icon.props
        // data.nativeOn = data.on
        con = false
      }

      console.log(self)
      iconClass['g-icon'] = true
      iconClass['g-icon--dense'] = props.dense
      iconClass['g-icon--disabled'] = props.disabled
      iconClass['g-icon--left'] = props.left
      iconClass['g-icon--right'] = props.right
      iconClass['g-icon--link'] = self.$listeners.click
      let attributes = {
        ariaHidden: self.$listeners.click,
        role: self.$listeners.click ? 'button' : null
      }
      return {
        props,
        iconClass,
        iconStyle,
        attributes,
        _tag,
        content,
        icon,
        con,
        _component,

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

  function getObjectValueByPath(obj, path, fallback) {
    if (obj == null || !path || typeof path !== 'string') return fallback
    if (obj[path] !== undefined) return obj[path]
    path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    path = path.replace(/^\./, '') // strip a leading dot
    return getNestedValue(obj, path.split('.'), fallback)
  }

  function getNestedValue(obj, path, fallback) {
    const last = path.length - 1

    if (last < 0) return obj === undefined ? fallback : obj

    for (let i = 0; i < last; i++) {
      if (obj == null) {
        return fallback
      }
      obj = obj[path[i]]
    }

    if (obj == null) return fallback

    return obj[path[last]] === undefined ? fallback : obj[path[last]]
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

<style scoped>
</style>
