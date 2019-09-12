<template>
	<fragment>
		<slot :toggle="toggleItem" :isActive="isActiveItem">
			<g-expansion-panel
					v-for="(item, index) in items"
					:key="index"
					@toggle="toggleItem(item)"
			>
			</g-expansion-panel>
		</slot>
	</fragment>
</template>

<script>
  import GExpansionPanel from './GExpansionPanel';
  import groupable from '../GItemGroup/groupable';
  import { Fragment } from 'vue-fragment'
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GExpansionPanelGroup',
    components: { GExpansionPanel, Fragment },
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