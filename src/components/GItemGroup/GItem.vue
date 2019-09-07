<template>
	<div>
		<slot :active="isActive" :disabled="disabled" :toggle="toggle" :item="item" :class="itemClass"></slot>
	</div>
</template>

<script>
  export default {
    name: 'GItem',
    props: {
      activeClass: String,
      disabled: Boolean,
      value: {
        required: false
      },
			item: null,
      isActive: Boolean,
    },
    data: () => ({

    }),
		computed: {
      itemClass() {
        return {
          [this.activeClass]: this.isActive
				}
			}
		},
    methods: {
      toggle() {
        //todo: mandatory
        if (this.disabled) return;
        console.log('clicked');
        this.$emit('toggle', this.item);
      }
    }
  }
</script>

<style scoped>

</style>