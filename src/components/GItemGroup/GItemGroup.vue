<template>
	<g-layout>
		<slot :toggle="toggleItem" :active="isActiveItem">
			<template v-for="(item, index) in items">
				<g-item :item="item" :is-active="isActiveItem(item)" @toggle="toggleItem" :key="index">
					<slot name="item" :item="item" :index="index" :toggle="toggleItem" :active="isActiveItem(item)"></slot>
				</g-item>
			</template>
		</slot>
	</g-layout>
</template>

<script>
  import GItem from '@/components/GItemGroup/GItem';
  import _ from 'lodash';
  import GLayout from '@/components/GLayout/GLayout';
  import vModel from '@/components/common/vModel';
  import { computed } from '@vue/composition-api';
  import groupable from '@/components/GItemGroup/groupable';

  export default {
    name: 'GItemGroup',
    components: { GLayout, GItem },
    props: {
      mandatory: Boolean,
      multiple: Boolean,
      //todo: return item/index
      returnItem: Boolean,
      value: null,
      items: Array
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

			const { toggleItem, isActiveItem } = groupable(props, model);

      return {
        toggleItem,
        isActiveItem
      }
    }
  }
</script>

<style scoped>

</style>