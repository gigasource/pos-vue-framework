<template>
	<div class="g-item" :class="itemClass">
		<slot :active="isActive" :disabled="disabled" :toggle="toggle" :item="item" ></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GItem',
    props: {
      disabled: Boolean,
			item: null,
      isActive: Boolean,
      activeClass: {
        type: String,
				default: 'g-item__active'
			}
    },
		setup(props, {emit}) {
      const {disabled, activeClass, isActive, item} = props;
      const itemClass = computed(() => ({
				[activeClass]: isActive
			}));

			const toggle = () => {
        if (disabled) return;
        emit('toggle', item);
			};

			return {
			  itemClass,
				toggle
			}
		}
  }
</script>

<style scoped lang="scss">
 @import "GItemGroup";
</style>