<template>
	<div>
		<slot>
			<template v-for="item in items">
				<g-window-item v-show="isActiveWindow(item)">
					<slot name="item">
					</slot>
				</g-window-item>
			</template>
		</slot>
	</div>
</template>

<script>
  import GWindowItem from '@/components/GWindow/GWindowItem';

  export default {
    name: 'GWindow',
    components: { GWindowItem },
    props: {
      items: Array,
      value: Number
    },
    methods: {
      isActiveWindow(window) {
				return this.items[this.value] === window;
      }
    }
  }
</script>

<style scoped>

</style>