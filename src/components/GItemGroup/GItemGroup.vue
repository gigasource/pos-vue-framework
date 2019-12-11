<template>
	<g-row class="g-item-group">
		<slot :toggle="toggleItem" :active="isActiveItem">
			<template v-for="(item, index) in items">
				<g-item :item="item" :is-active="isActiveItem(item)" @toggle="toggleItem" :key="index">
					<slot name="item" :item="item" :index="index" :toggle="toggleItem" :active="isActiveItem(item)"></slot>
				</g-item>
			</template>
		</slot>
	</g-row>
</template>

<script>
  import GItem from '../GItemGroup/GItem';
  import GLayout from '../GLayout/GLayout';
  import { computed } from '@vue/composition-api';
  import groupable from '../../mixins/groupable';

  export default {
    name: 'GItemGroup',
    components: { GLayout, GItem },
    props: {
      mandatory: Boolean,
      multiple: Boolean,
      //todo: return item/index
			returnObject: {
      	type: Boolean,
				default: true
			},
      value: null,
      items: Array
    },
    setup(props, context) {
      const model = computed({
        get: () => {
          if (props.value !== undefined) {
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

			const { toggleItem, isActiveItem } = groupable(props, model);

      return {
        toggleItem,
        isActiveItem
      }
    }
  }
</script>

<style scoped lang="scss">
	@import "GItemGroup";
</style>
