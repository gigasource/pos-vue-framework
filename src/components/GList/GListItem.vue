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
			value: [String, Number, Object]
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
					'g-list-item__active': isActiveItem(props.value),
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
			const add = inject('add')
			const {isItemAdded, index} = add(props.value)
			const isActiveItem = inject('isActiveItem')
			const selectable = inject('selectable')
			const inListEvents = inject('getListEvents')
			const internalValue = ref(null)
			const singleItemEvents = () => {
				return {
					click: () => {
						context.emit('singleItemClick')
					},
				}
			}
			const listItemEvents = selectable ? inListEvents : singleItemEvents

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
