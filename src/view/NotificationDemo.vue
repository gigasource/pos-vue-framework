<template>
	<div>
		<g-btn color="black" @click="test5">Toast 5s</g-btn>
		<g-btn color="black" @click="test10">Toast 10s</g-btn>
		<g-btn color="black" @click="test10000">Toast 10000s</g-btn>
		<g-btn color="black" @click="clear">Clear</g-btn>
	</div>
</template>

<script>
  import GNotification from '../components/GNotification/GNotification';
  import GBtn from '../components/GBtn/GBtn';
  export default {
    name: 'NotificationDemo',
    components: { GNotification, GBtn },
		data() {
      return {
        count: 1
			}
		},
		methods: {
      test5() {
        this.$notificationCenter.notify('Toast 5', {
          timeout: 5000,
				});
			},
      test10() {
        this.$notificationCenter.notify('Toast 10', {
          timeout: 10000,
					color: '#d91f11'
        });
      },
      test10000() {
        this.$notificationCenter.notify('Toast 10000', {
          timeout: 10000000,
					color: '#0ab',
        });
      },
			clear() {
        this.$notificationCenter.clear();
			}
		}
  }
</script>

<style scoped>

</style>