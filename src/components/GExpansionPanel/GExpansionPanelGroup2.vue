<template>
	<div class="g-expansion-panel2-group">
		<slot :toggle="toggleItem" :isActive="isActiveItem">
			<g-expansion-panel2
					v-for="(item, index) in items"
					:key="index"
					@toggle="toggleItem(item)"
			>
			</g-expansion-panel2>
		</slot>
	</div>
</template>

<script>
  import GExpansionPanel2 from './GExpansionPanel2';
  import groupable from '../../mixins/groupable';
  import { Fragment } from 'vue-fragment'
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GExpansionPanelGroup2',
    components: { GExpansionPanel2, Fragment },
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