<template>
	<div :class="classes" :style="totalHeightStyles">
		<div class="g-toolbar-background" :style="totalHeightStyles">
			<div :style="backgroundStyles"></div>
		</div>
		<div class="g-toolbar-content" :style="contentStyles">
			<slot></slot>
		</div>
		<div v-if="extended" class="g-toolbar-extension" :style="extensionStyles" ref="extension">
			<slot name="extension"></slot>
		</div>
	</div>
</template>

<script>
	import { computed, nextTick, ref } from 'vue';
  import { convertToUnit } from '../../utils/helpers';
  import { isCssColor } from '../../mixins/colorable';
  import { linearGradient } from '../../utils/colors';

  export default {
    name: 'GToolbar',
    props: {
      absolute: Boolean,
      bottom: Boolean,
      collapse: Boolean,
      color: {
        type: String,
				default: 'white'
			},
			gradient: String,
			gradientAngle: {
        type: [String, Number],
				default: 45
			},
      dense: Boolean,
      elevation: {
        type: [String, Number],
        default: 4
      },
      extended: Boolean,
      extensionHeight: {
        type: [String, Number],
				default: 'auto'
      },
      sticky: Boolean,
      flat: Boolean,
      floating: Boolean,
      prominent: Boolean,
      short: Boolean,
      src: String,
      tile: {
        type: Boolean,
        default: true
      },
      height: String,
			filled: Boolean,
    },
    setup(props) {
      const extension = ref(null)

      const classes = computed(() => ({
        'g-toolbar': true,
        ['elevation-' + (props.flat ? '0' : props.elevation)]: true,
        'g-toolbar__absolute': props.absolute,
        'g-toolbar__bottom': props.bottom,
        'g-toolbar__dense': props.dense,
        'g-toolbar__prominent': props.prominent,
        'g-toolbar__floating': props.floating,
        'g-toolbar__tile': props.tile,
        'g-toolbar__collapse': props.collapse,
        'g-toolbar__filled': props.filled,
        'g-toolbar__sticky': props.sticky,
				['bg-'+props.color.split(' ').join('-')]: props.color && !isCssColor(props.color),
      }));

      const contentHeight = computed(() => {
        if (props.height) return props.height;
        if (props.prominent && props.dense) return 96;
        if (props.prominent && props.short) return 112;
        if (props.prominent) return 128;
        if (props.dense) return 48;
        if (props.short) return 56;
        return 64
      });

			const computedExtensionHeight = computed(() => {
				nextTick(() => {
					if (extension.value) {
						if (!isNaN(parseInt(props.extensionHeight))) return props.extensionHeight
						return extension.offsetHeight
					}
					return 0
				})
			})

      const totalHeight = computed(() => {
        let contentHeightString = !isNaN(contentHeight.value) ? `${contentHeight.value}px` : contentHeight.value
        return `calc(${contentHeightString} + ${props.extended ? parseInt(computedExtensionHeight.value) : '0px'})`
      });

      const contentStyles = computed(() => ({
        'height': convertToUnit(contentHeight.value)
      }));

      const totalHeightStyles = computed(() => ({
        'height': convertToUnit(totalHeight.value)
      }));

      const extensionStyles = computed(() => ({
        'height': convertToUnit(computedExtensionHeight.value)
      }));

      const backgroundStyles = computed(() => ({
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'z-index': '-1',
        'width': '100%',
        'height': convertToUnit(totalHeight.value),
				... props.src && {
          'background-image': 'url("' + props.src + '")',
          'background-position': 'center center',
          'background-size': 'cover',
				},
				... isCssColor(props.color) && {
          'background-color': [props.color]
				},
				... props.gradient && {
          'background-image': [linearGradient(props.gradient.split(','), props.gradientAngle)]
				}
      }));

      return {
        classes,
        contentStyles,
        totalHeightStyles,
        extensionStyles,
        backgroundStyles,
				computedExtensionHeight,
        extension
      }
    }
  }
</script>

<style scoped lang="scss">
	@import "GToolbar";
</style>
