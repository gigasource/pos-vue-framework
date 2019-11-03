<template>
	<i v-if="activeTags.i" :class="iconClass" :style="iconStyle"
		 :aria-hidden="attributes.ariaHidden"
		 :role="attributes.role" @click="onClick">{{materialIconName}}</i>
	<svg v-else-if="activeTags.svg" :class="iconClass" :style="iconStyle"
			 :aria-hidden="attributes.ariaHidden"
			 :role="attributes.role"
			 xmlns="http://www.w3.org/2000/svg"
			 viewBox="0 0 24 24" @click="onClick">
		<path :d="icon"></path>
	</svg>
	<img v-else-if="activeTags.img" :src="icon" alt="Can't load icon" :class="iconClass" :style="iconStyle" @click="onClick"/>
	<span v-else-if="activeTags.slot" @click="onClick">
		<slot></slot>
	</span>
</template>

<script>
  import { computed, ref, onMounted, onUpdated } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';
  import { setBackgroundColor } from '../../mixins/colorable';
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'GIcon',
    components: { Fragment },
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
        icon.value = context.slots.default()[0].text.trim()
      }

      onMounted(() => getIcon())
      onUpdated(() => getIcon())

      function renderFontAwesomeIcon(nodeData) {
        nodeData.class[icon.value] = true
        nodeData.bgStyle['fontSize'] = getSize(props)
      }

      function renderMaterialIcon(nodeData) {
        let iconType = 'material-icons'
        const delimiterIndex = icon.value.indexOf('-')
        const isNotMdiIcon = delimiterIndex <= -1

        if (isNotMdiIcon) {
          nodeData.materialIcon = icon.value
        } else {
          iconType = icon.value.slice(0, delimiterIndex)
        }

        nodeData.class[iconType] = true
        nodeData.class[icon.value] = !isNotMdiIcon
        nodeData.bgStyle['fontSize'] = getSize(props)
      }

      function renderSvgIcon(nodeData) {
        nodeData.tag.svg = true
        nodeData.tag.i = false

        nodeData.class['g-icon__svg'] = true
        nodeData.bgStyle['fontSize'] = getSize(props)
        nodeData.bgStyle['width'] = getSize(props)
        nodeData.bgStyle['height'] = getSize(props)
      }

      function renderCustomSvgIcon(nodeData) {
        nodeData.tag.img = true
        nodeData.tag.i = false
        nodeData.bgStyle['fontSize'] = getSize(props) * 2
        nodeData.bgStyle['width'] = getSize(props) * 2
        nodeData.bgStyle['height'] = getSize(props) * 2
      }

      let nodeData = computed(() => {
        let _nodeData = {
          tag: {
            i: true,
            svg: false,
            img: false,
            slot: true
          },
          class: {},
          bgStyle: {},
          materialIcon: ''
        }

        if (isFontAwesome5(icon.value)) {
          renderFontAwesomeIcon(_nodeData)
        } else if (isSvgPath(icon.value)) {
          renderSvgIcon(_nodeData)
        } else if (isCustomSvgIcon(icon.value)) {
          renderCustomSvgIcon(_nodeData)
        } else {
          renderMaterialIcon(_nodeData)
        }
        _nodeData.tag.slot = false
        return _nodeData
      })

      const materialIconName = computed(() => {
        return nodeData.value.materialIcon
      })

      let activeTags = computed(() => ({
        ...nodeData.value.tag
      }))

      let iconColor = computed(() => setBackgroundColor(props.color, {}))

      let iconClass = computed(() => ({
        ...nodeData.value.class,
        ...iconColor.value.class,
        'g-icon': true,
        'g-icon__dense': props.dense,
        'g-icon__disabled': props.disabled,
        'g-icon__left': props.left,
        'g-icon__right': props.right,
        'g-icon__link': !!context.listeners.click
      }))

      let iconStyle = computed(() => ({
        ...nodeData.value.bgStyle,
        ...iconColor.value.bgStyle
      }))

      // accessibility attrs
      let attributes = computed(() => ({
        ariaHidden: !!context.listeners.click,
        role: context.listeners.click ? 'button' : null
      }))

			let onClick = (event) => {
				context.emit('click', event);
			}

      return {
        iconClass,
        iconStyle,
        attributes,
        activeTags,
        icon,
        materialIconName,
				onClick,
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
