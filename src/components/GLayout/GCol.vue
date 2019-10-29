<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
	import { computed } from '@vue/composition-api'

  export default {
    name: 'GCol',
    props: {
      alignSelf: String,
      justifySelf: String,
      cols: [Number, String],
      offset: [Number, String],
      order: [Number, String]
    },
    setup(props) {
      const classes = computed(() => ({
        'g-col': true,
        ['col-' + props.cols]: props.cols,
        ['offset-' + props.offset]: props.offset,
      }));

      const styles = computed(() => ({
        ...props.justifySelf && { 'justify-self': props.justifySelf },
        ...props.alignSelf && { 'align-self': props.alignSelf },
        ...props.order && { 'order': props.order }
      }));

      return {
        classes,
        styles
      }
    }
  }
</script>

<style scoped>

</style>