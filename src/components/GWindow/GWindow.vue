<template>
	<div>
		<slot>
			<template v-for="item in items">
				<g-window-item v-show="isActiveWindow(item)">
					<slot name="item" :item="item"></slot>
				</g-window-item>
			</template>
		</slot>
	</div>
</template>

<script>
  import GWindowItem from '../GWindow/GWindowItem';
  import getVModel from '../../mixins/getVModel';

  export default {
    name: 'GWindow',
    components: { GWindowItem },
    props: {
      items: Array,
      value: null
    },
		setup(props, context) {
      const model = getVModel(props, context);
      const isActiveWindow = (window) => model.value === window;

      return {
        model,
				isActiveWindow
			}
		}
  }
</script>

<style scoped>

</style>