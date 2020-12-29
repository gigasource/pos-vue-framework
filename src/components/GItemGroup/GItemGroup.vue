<template>
	<div class="g-item-group">
		<slot :toggle="toggleItem" :active="isActiveItem">
			<template v-for="(item, index) in items" :key="index">
				<g-item :item="item" :is-active="isActiveItem(item)" @toggle="toggleItem">
					<slot name="item" :item="item" :index="index" :toggle="toggleItem" :active="isActiveItem(item)"></slot>
				</g-item>
			</template>
		</slot>
	</div>
</template>

<script>
  import GItem from '../GItemGroup/GItem';
  import { computed } from 'vue';
  import groupable from '../../mixins/groupable';

  export default {
    name: 'GItemGroup',
    components: { GItem },
    props: {
      mandatory: Boolean,
      multiple: Boolean,
      //todo: return item/index
			returnObject: {
      	type: Boolean,
				default: true
			},
      modelValue: null,
      items: Array
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      const model = computed({
        get: () => {
          if (props.modelValue !== undefined) {
            if (props.multiple && !Array.isArray(props.modelValue)) {
              props.modelValue = [props.modelValue];
            }
            return props.modelValue;
          }
          return props.multiple ? [] : null;
        },
        set: (value) => {
          context.emit('update:modelValue', value);
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
  .g-item-group {
    display: flex;
  }
</style>
