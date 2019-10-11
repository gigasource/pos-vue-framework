<template>
	<div>
		<div>
			<g-btn color="black" @click="addToast">
				TEST
			</g-btn>
			<g-btn v-for="(toast, index) in queue" color="black" @click="toast.snackbar = true" :key="index">
				TOAST {{index}}
			</g-btn>
		</div>
		<div class="g-notification-container">
			<g-snackbar v-for="(toast, index) in queue" v-model="toast.snackbar" timeout="20000" right :key="index">
				Toast {{index}}
				<g-btn flat color="pink" @click="toast.snackbar = false">
					Close
				</g-btn>
			</g-snackbar>
		</div>
	</div>
</template>

<script>
  import GBtn from '../GBtn/GBtn';
  import GSnackbar from '../GSnackbar/GSnackbar';
  import getVModel from '../../mixins/getVModel';
  import { computed, watch, ref, reactive } from '@vue/composition-api';

  export default {
    name: 'GNotification',
    components: { GSnackbar, GBtn },
		setup (props, context) {
      // const queue = [reactive({snackbar: false}), reactive({snackbar: false}), reactive({snackbar: false})];
			const queue = [ {snackbar: false}, {snackbar: false}, {snackbar: false} ];

			function addToast() {
			  queue.push({snackbar: true});
			}

      return {
        queue,
				addToast
			}
		}
  }
</script>

<style scoped>

</style>