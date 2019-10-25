<template>
	<a :class="classes" @click="toggle">
		<slot></slot>
	</a>
</template>

<script>
	import { computed, inject } from '@vue/composition-api'
	import { isEqual } from 'lodash'

  export default {
    name: 'GTab',
    props: {
      disabled: Boolean,
      value: {
        required: false
      },
      item: null,
      // isActive: Boolean,
			activeClass: {
        type: String,
				default: 'g-tab__active'
			}
    },
    setup(props) {
      const model = inject('model', null);
			const isActive = computed(() => (model && isEqual(model.value, props.item)));

      const classes = computed(() => ({
				'g-tab': true,
				'waves-effect': true,
        [props.activeClass]: isActive.value,
				'g-tab__disabled': props.disabled || props.item.disabled
			}));


      function toggle() {
        if (props.disabled) return;
        model.value = props.item;
      }

			return {
        classes,
				toggle
			}
    },
  }
</script>

<style scoped>

</style>