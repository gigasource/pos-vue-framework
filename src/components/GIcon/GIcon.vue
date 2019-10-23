<template>
    <span>
        <i v-if="_tagCondition.i" :class="iconClass" :style="iconStyle"
           :aria-hidden="attributes.ariaHidden"
           :role="attributes.role">{{materialIcon}}</i>
        <svg v-if="_tagCondition.svg" :class="iconClass" :style="iconStyle"
             :aria-hidden="attributes.ariaHidden"
             :role="attributes.role"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
            <path :d="icon"></path>
        </svg>
        <img v-if="_tagCondition.img" :src="icon" alt="Can't load icon" :class="iconClass" :style="iconStyle"/>
        <span v-show="_tagCondition.slot">
            <slot></slot>
        </span>
    </span>
</template>

<script>
  import {computed, ref, onMounted, onUpdated} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';
  import {setBackgroundColor} from "../../mixins/colorable";

  export default {
    name: "GIcon",

    props: {
      value: String,
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

      const icon = ref('')

      function getIcon() {
        icon.value = context.slots.default()[0].text
      }

      onMounted(() => {
        console.log('mounted')
        getIcon()
        //iconTemplate()
      })

      onUpdated(() => {
        console.log('updating')
        getIcon()
        //iconTemplate()
      })

      function iconTemplate() {
        let data = {
          tagCondition: {
            i: true,
            svg: false,
            img: false,
            slot: true
          },
          class: {},
          style: {},
          materialIcon: ''
        }

        if (!isSvgPath(icon.value) && !isCustomSvgIcon(icon.value)) { //render Font icons: Material Icon(default), Font Awesome 5
          let iconType = 'material-icons'
          const delimiterIndex = icon.value.indexOf('-')
          const isMaterialIcon = delimiterIndex <= -1

          if (isMaterialIcon) {
            data.materialIcon = icon.value
          } else {
            iconType = icon.value.slice(0, delimiterIndex)
            if (isFontAwesome5(iconType)) iconType = ''
          }

          data.class[iconType] = true
          data.class[icon.value] = !isMaterialIcon
          data.style['fontSize'] = getSize(props)
        }

        if (isSvgPath(icon.value)) {
          data.tagCondition.svg = true
          data.tagCondition.i = false

          data.class['g-icon__svg'] = true
          data.style['fontSize'] = getSize(props)
          data.style['width'] = getSize(props)
          data.style['height'] = getSize(props)
        }

        if (isCustomSvgIcon(icon.value)) {
          data.tagCondition.img = true
          data.tagCondition.i = false
          data.style['fontSize'] = getSize(props) * 2
          data.style['width'] = getSize(props) * 2
          data.style['height'] = getSize(props) * 2
        }

        data.tagCondition.slot = false

        return data
      }

      let data = computed(() => {
        return iconTemplate()
      })

      let materialIcon = computed(() => {
        return data.value.materialIcon
      })

      let _tagCondition = computed(() => {
        return {
          ...data.value.tagCondition
        }
      })

      let color = computed(() => {
        return setBackgroundColor(props.color, {})
      })

      let iconClass = computed(() => {
        return {
          ...data.value.class,
          ...color.value.class,
          'g-icon': true,
          'g-icon__dense': props.dense,
          'g-icon__disabled': props.disabled,
          'g-icon__left': props.left,
          'g-icon__right': props.right,
          'g-icon__link': !!context.listeners.click
        }
      })

      let iconStyle = computed(() => {
        return {
          ...data.value.style,
          ...color.value.style
        }
      })

      let attributes = computed(() => {
        return {
          ariaHidden: !!context.listeners.click,
          role: context.listeners.click ? 'button' : null
        }
      })

      return {
        iconClass,
        iconStyle,
        attributes,
        _tagCondition,
        icon,
        materialIcon,
      }
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
