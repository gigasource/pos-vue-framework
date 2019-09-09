<template>
	<div>
		<slot>
			<template v-for="item in items">
				<g-window-item v-show="isActiveWindow(item)">
					<slot name="item" :item="item">
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
      value: null
    },
		computed: {
      computedValue: {
        get() {
          return this.value;
				},
				set(value) {
          this.$emit('input', value);
				}
			}
		},
    methods: {
      isActiveWindow(window) {
        return this.value === window;
      }
    }
  }
</script>

<style scoped>

</style>