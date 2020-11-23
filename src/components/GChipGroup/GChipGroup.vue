<template>
	<div :class="classes">
		<div class="g-chip-group__content">
			<template v-for="(item, index) in items" :key="index">
				<g-chip :value="item" :active="isActiveItem(item)" @click="toggleItem" :close="item.close"
								@click:close="toggleClose" :disabled="item.disabled" :filter="item.filter" :color="item.color" :text-color="item.textColor">
					<slot name="item" :value="item" :index="index" :click="toggleItem" :active="isActiveItem(item)" :close="item.close" :click:close="toggleClose" :disabled="item.disabled">
						{{item.text}}
					</slot>
				</g-chip>
			</template>
		</div>
	</div>
</template>

<script>
  import _ from 'lodash'
  import { computed, onMounted } from 'vue';
  import groupable from '../../mixins/groupable';
  import GChip from '../GChip/GChip';
  import GLayout from '../GLayout/GLayout';

  export default {
    name: 'GChipGroup',
    components: { GLayout, GChip },
    props: {
      column: Boolean,
      mandatory: Boolean,
      multiple: Boolean,
      maxSelection: [Number, String],
      value: null,
      items: Array
    },
    setup(props, context) {

      const classes = computed(() => {
        return {
          'g-chip-group': true,
          'g-chip-group__column': props.column
        }
      });

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
      const toggleClose = (value) => {
        context.emit('click:close', value);
      };
      return {
        toggleItem,
        toggleClose,
        isActiveItem,
        classes
      }
    }
  }
</script>

<style scoped lang="scss">
 @import "GChipGroup";
</style>
