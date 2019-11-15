<template>
	<div :class="classes" :style="styles" @click="onSelectItem" @keydown="onKeyDown">
		<slot></slot>
	</div>
</template>

<script>
  import { computed, ref } from '@vue/composition-api';
	import {getInternalValue} from "../../utils/helpers";

  export default {
    name: 'GListItem',
    props: {
			height: String,
			disabled: Boolean,
			selectable: Boolean,
      twoLine: Boolean,
      threeLine: Boolean,
			isSelected: Boolean,
		},
		setup(props, context) {
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
					'g-list-item__active': props.isSelected,
				}
			});
      const styles = computed(() => {
        if(props.height) {
          return {
            'height': props.height
					}
				}
			});
      const onSelectItem = () => {
        context.emit('singleItemClick')
			}
			const onKeyDown = (e) => {
      	context.emit('keydown', e)
			}

      return {
        classes,
				styles,
				onSelectItem,
				onKeyDown,
			}
		}
  }
</script>

<style scoped>

</style>
