<template>
	<div class="g-expansion-panel3-group">
		<slot :toggle="toggleItem" :isActive="isActiveItem">
			<g-expansion-panel3
					v-for="(item, index) in items"
					:key="index"
					:item="item"
					:is-active="isActiveItem(item)"
					@toggle="toggleItem">
			</g-expansion-panel3>
		</slot>
	</div>
</template>

<script>
  import GExpansionPanel3 from './GExpansionPanel3';
  import groupable from '../../mixins/groupable';
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GExpansionPanelGroup3',
    components: { GExpansionPanel3 },
    props: {
      items: Array,
			multiple: Boolean,
      value: null
    },
    setup(props, context) {
      const model = computed({
        get: () => {
          if (props.value) {
            if (props.multiple && !Array.isArray(props.value)) {
              props.value = [props.value];
            }
            return props.value;
          }
          return props.multiple ? [] : null;
        },
        set: (value) => {
          context.emit('input', value);
        }
      });

      const { toggleItem, isActiveItem } = groupable({ mandatory: false, multiple: props.multiple }, model);

			return {
			  model,
				toggleItem,
				isActiveItem
			}
    }
  }
</script>

<style scoped>

</style>