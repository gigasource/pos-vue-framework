<template>
	<div>
		<template v-for="items">
			<slot name="item">
				<g-item></g-item>
			</slot>
		</template>
	</div>
</template>

<script>
  import GItem from '@/components/GItemGroup/GItem';
  export default {
    name: 'GItemGroup',
    components: { GItem },
    props: {
      activeClass: {
        type: String,
				default: 'item--active' //todo: change to correct css class
			},
			mandatory: Boolean,
			multiple: Boolean,
			value: [String, Number, Boolean, Object, Array],
      items: Array
    },
		data() {
      return {
			}
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
		}
  }
</script>

<style scoped>

</style>