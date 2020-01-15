<template>
	<div :class="classes" :style="styles" tabindex="0" v-if='isItemAdded' v-on="listItemEvents(value, index)">
		<slot></slot>
	</div>
</template>

<script>
  import { computed, inject, ref } from '@vue/composition-api';

  export default {
		name: 'GListItem',
		props: {
			height: String,
			disabled: Boolean,
			twoLine: Boolean,
			threeLine: Boolean,
			value: [String, Number, Object, Function],
			inList: Boolean,
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
					'g-list-item__two-line': props.twoLine,
					'g-list-item__three-line': props.threeLine,
					'g-list-item__active': props.inList ? isActiveItem(props.value) : false ,
				}
			});
			const styles = computed(() => {
				if (props.height) {
					return {
						'height': props.height
					}
				}
			});

			//handle listItem in List case
			const add = props.inList ? inject('add') : null
			const {isItemAdded, index} = props.inList? add(props.value):{ isItemAdded: true, index: 0}
			const isActiveItem = props.inList ? inject('isActiveItem') : null
			const selectable = props.inList ?  inject('selectable') : null
			const inListEvents = props.inList ? inject('getListEvents') : null
			const internalValue = ref(null)
			const singleItemEvents = () => {
				return {
					click: () => {
						context.emit('singleItemClick')
					},
				}
			}
			const listItemEvents = selectable && props.inList ? inListEvents : singleItemEvents

			return {
				index,
				classes,
				styles,
				listItemEvents,
				internalValue,
				isItemAdded,
				singleItemEvents
			}
		}
	}
</script>

<style scoped>

</style>
