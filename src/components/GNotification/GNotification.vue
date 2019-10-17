<template>
	<div class="g-notification-container" :class="containerClasses" :style="containerStyles">
		<transition-group name="g-notification-transition" tag="div">
			<div class="g-notification" v-for="notification in state.notificationQueue" :key="notification.id" :style="notification.styles">
				<div class="g-notification-content">
					<slot>
						{{ notification.message }}
					</slot>
					<slot name="button">
						<g-btn flat color="pink" @click="remove(notification)">Close</g-btn>
					</slot>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
	import uuidv4 from 'uuid/v4'
	import GBtn from '../GBtn/GBtn';
  import { reactive, computed } from '@vue/composition-api';

  export default {
    name: 'GNotificationCenter',
    components: { GBtn },
		props: {
      width: [Number, String],

			timeout: {
        type: [Number, String],
				default: 6000,
			},

			top: Boolean,
			left: Boolean,
			right: Boolean,
			bottom: Boolean,
			center: Boolean
		},
		setup(props, context) {
      const state = reactive({
				notificationQueue: []
			})

			const containerClasses = computed(() => ({
			  'g-notification-container__top': props.top || !props.bottom,
				'g-notification-container__left': props.left ,
        'g-notification-container__right': props.right || (!props.left && !props.center),
        'g-notification-container__bottom': props.bottom,
				'g-notification-container__center': props.center
			}))

			const containerStyles = computed(() => ({
				width: props.width
			}))

			function remove(notification) {
			  window.clearTimeout(notification.timeout);
        state.notificationQueue.splice(state.notificationQueue.indexOf(notification), 1);
			}

			function notify(message, options) {
			  const notification = reactive({
					message: message,
					id: uuidv4(),
					timeout: null,
					styles: {
					  backgroundColor: options.color
					}
				})
        state.notificationQueue.push(notification)
				notification.timeout = setTimeout(() => {
					remove(notification);
				}, options.timeout || props.timeout)
			}

			function clear() {
			  while (state.notificationQueue.length > 0) {
			    remove(state.notificationQueue[0]);
				}
			}

			return {
			  state,
				containerClasses,
				containerStyles,
				notify,
				remove,
				clear
			}
		}
  }
</script>

<style scoped>

</style>