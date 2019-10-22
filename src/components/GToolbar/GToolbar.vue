<template>
	<div :class="classes" :style="totalHeightStyles">
		<div class="g-toolbar-background" :style="totalHeightStyles">
			<div :style="backgroundStyles"></div>
		</div>
		<div class="g-toolbar-content" :style="contentStyles">
			<slot></slot>
		</div>
		<div v-if="extension" class="g-toolbar-extension" :style="extensionStyles">
			<slot name="extension"></slot>
		</div>
	</div>
</template>

<script>
  import { computed, reactive } from '@vue/composition-api';
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
        default: 48
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
    },
    setup(props) {
      const extension = computed(() => !!props.extended);
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

      const totalHeight = computed(() => {
        return contentHeight.value + (props.extended ? parseInt(props.extensionHeight) : 0);
      });

      const contentStyles = reactive({
        'height': convertToUnit(contentHeight.value)
      });

      const totalHeightStyles = reactive({
        'height': convertToUnit(totalHeight.value)
      });

      const extensionStyles = computed(() => ({
        'height': convertToUnit(props.extensionHeight)
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
          'background-image': [linearGradient(props.gradient.split(','))]
				}
      }));

      return {
        extension,
        classes,
        contentStyles,
        totalHeightStyles,
        extensionStyles,
        backgroundStyles,
      }
    }
  }
</script>

<style scoped lang="scss">
	@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
	@import "GToolbar";
</style>