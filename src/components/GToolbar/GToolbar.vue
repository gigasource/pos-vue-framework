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
	import { computed, onMounted, ref } from '@vue/composition-api';
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
			fillHeight: Boolean,
    },
    setup(props, context) {
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
				['bg-'+props.color.split(' ').join('-')]: props.color && !isCssColor(props.color),
      }));

      const contentHeight = computed(() => {
        if (props.height) return parseInt(props.height);
        if (props.prominent && props.dense) return 96;
        if (props.prominent && props.short) return 112;
        if (props.prominent) return 128;
        if (props.dense) return 48;
        if (props.short) return 56;
        return 64
      });

			const computedExtensionHeight = computed(() => {
				context.root.$nextTick(() => {
					const extension = context.refs.extension
					if (extension) {
						if (!isNaN(parseInt(props.extensionHeight))) return props.extensionHeight
						return extension.offsetHeight
					}
					return 0
				})
			})

      const totalHeight = computed(() => {
        return contentHeight.value + (props.extended ? parseInt(computedExtensionHeight.value) : 0);
      });

      const contentStyles = computed(() => ({
        'height': props.fillHeight ? ('calc(100% - ' + convertToUnit(computedExtensionHeight.value ? computedExtensionHeight.value : 0) + ')') : convertToUnit(contentHeight.value)
      }));

      const totalHeightStyles = computed(() => ({
        'height': props.fillHeight ? '100%' : convertToUnit(totalHeight.value)
      }));

      const extensionStyles = computed(() => ({
        'height': props.fillHeight ? 'auto' : convertToUnit(computedExtensionHeight.value)
      }));

      const backgroundStyles = computed(() => ({
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'z-index': '-1',
        'width': '100%',
        'height': props.fillHeight ? '100%' : convertToUnit(totalHeight.value),
				... props.src && {
          'background-image': 'url("' + props.src + '")',
          'background-position': 'center center',
          'background-size': 'cover',
				},
				... isCssColor(props.color) && {
          'background-color': [props.color]
				},
				... props.gradient && {
          'background-image': [linearGradient(props.gradient.split(','))]
				}
      }));

      return {
        classes,
        contentStyles,
        totalHeightStyles,
        extensionStyles,
        backgroundStyles,
				computedExtensionHeight
      }
    }
  }
</script>

<style scoped lang="scss">
	@import "GToolbar";
</style>