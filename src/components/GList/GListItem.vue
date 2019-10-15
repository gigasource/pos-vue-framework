<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GListItem',
    props: {
			height: String,
			disabled: Boolean,
			selectable: Boolean,
      twoLine: Boolean,
      threeLine: Boolean,
		},
		setup(props) {
      const classes = computed(() => {
        const defaultClasses = {
          'g-list-item': true,
					'waves-effect': true
				};
        return {
          ...defaultClasses,
					'g-list-item__disabled': props.disabled,
					'g-list-item__selectable': props.selectable,
          'g-list-item__two-line': props.twoLine,
          'g-list-item__three-line': props.threeLine,
				}
			});
      const styles = computed(() => {
        if(props.height) {
          return {
            'height': props.height
					}
				}
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