<template>
  <div :class="classes">
    <div class="g-chip-group__content">
      <template v-for="(item, index) in items" :key="index">
        <g-chip :value="item" :active="isActiveItem(item)" @click="toggleItem" :close="item.close" @close="toggleClose"
                :disabled="item.disabled" :filter="item.filter" :color="item.color" :text-color="item.textColor" v-show="!isClosed(item)">
          {{ item.text }}
        </g-chip>
      </template>
    </div>
  </div>
</template>

<script>
import { isNull, isUndefined } from 'lodash'
import { computed, ref } from 'vue';
import groupable from '../../mixins/groupable';
import GChip from '../GChip/GChip';

export default {
  name: 'GChipGroup',
  components: { GChip },
  props: {
    column: Boolean,
    mandatory: Boolean,
    multiple: Boolean,
    maxSelection: [Number, String],
    modelValue: null,
    items: Array
  },
  emits: ['update:modelValue', 'click:close', 'click'],
  setup(props, context) {

    const classes = computed(() => {
      return {
        'g-chip-group': true,
        'g-chip-group__column': props.column
      }
    });

    const model = computed({
      get: () => {
        if (props.multiple) {
          if (!Array.isArray(props.modelValue)) {
            if (isNull(props.modelValue) || isUndefined(props.modelValue)) {
              return []
            } else {
              props.modelValue = [props.modelValue]
              return props.modelValue
            }
          } else return props.modelValue
        } else {
          if (isNull(props.modelValue) || isUndefined(props.modelValue)) return null
          else return props.modelValue
        }
      },
      set: (value) => {
        context.emit('update:modelValue', value);
      }
    });

    const closedList = ref([])
    const isClosed = (item) => {
      return closedList.value.includes(item)
    }

    const { toggleItem, isActiveItem } = groupable(props, model);
    const toggleClose = (value) => {
      closedList.value.push(value)
      if (isActiveItem(value)) {
        toggleItem(value) // deactivate active chip to reduce number of selected chips
      }
    };
    return {
      toggleItem,
      toggleClose,
      isActiveItem,
      classes,
      isClosed
    }
  }
}
</script>

<style scoped lang="scss">
@import "GChipGroup";
</style>
