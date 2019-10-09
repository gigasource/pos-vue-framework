<template>
	<div v-if="isActive"
			class="g-snack">
		<div class="g-snack-wrapper">
			<div class="g-snack-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import { computed, createElement as h, onMounted, reactive, ref, watch } from '@vue/composition-api';

  export default {
    name: 'GSnackbar',
		props: {
      value: Boolean,

      timeout: {
        type: Number,
        default: 6000,
      },

			top: Boolean,
			bottom: Boolean,
			left: Boolean,
			right: Boolean,

			color: String,
		},
		setup(props, context) {
      const { model: isActive } = getVModel(props, context);

      return {
        isActive
      }
		}
  }
</script>

<style scoped>

</style>