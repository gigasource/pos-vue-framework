<template>
	<div :class="classes" :style="[toolbarHeightStyle]">
		<slot></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GToolbar',
    props: {
      top: {
        type: Boolean,
        default: false
      },
      tile: Boolean,
      height: String,
      dark: Boolean,
    },
    setup({ top, dark, tile, height }) {
      const classes = computed(() => {
        const defaultClasses = {
          'tool-bar': true,
        };
        return {
          top: top,
          bottom: !top,
          'bg-black': dark,
          'bg-lgray-5': !dark,
          'btrr-3': tile && !top,
          'btlr-3': tile && !top,
          'bbrr-3': tile && top,
          'bblr-3': tile && top,
          ...defaultClasses,
        }
      });

      const toolbarHeightStyle = computed(() => {
        if (height) {
          return {
            height
          }
        }
      });

      return {
        classes,
        toolbarHeightStyle
      }
    }
  }
</script>

<style scoped>

</style>