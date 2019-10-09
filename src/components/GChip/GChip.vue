<template>
	<div :class="classes" :style="styles">
		<slot name="default">{{text}}</slot>
	</div>
</template>

<script>
  export default {
    name: 'GChip',
    props: {
      active: { type: Boolean, default: true },
      append: Boolean,
      close: Boolean,
      closeIcon: { type: String, default: `$delete` },
      color: String,
      disabled: Boolean,
      draggable: Boolean,
      filter: Boolean,
      filterIcon: { type: String, default: `$complete` },
      href: [String, Object],
      inputValue: null,
      label: Boolean,
      large: Boolean,
      link: Boolean,
      outlined: Boolean,
      pill: Boolean,
      replace: Boolean,
      ripple: Boolean,
      small: Boolean,
      target: String,
      textColor: String,
      value: null,
      xLarge: Boolean,
      xSmall: Boolean
    },
    setup(props, context) {
      let classes = computed(() => {
        let _classes = {
          'g-chip': true,
				};
        return _classes;
      });

      let styles = computed(() => {
        let _styles = {};
        return _styles;
      });

      return {
        classes,
        styles
      }
    }
  }
</script>

<style scoped>

</style>
