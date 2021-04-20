<script>
  import _ from 'lodash';
  import { computed, ref } from 'vue';
  import GRow from '../GLayout/GRow';
  import GCol from '../GLayout/GCol';
  import GCard from '../GCard/GCard';
  import { GCardActions } from '../GCard/GCardFunctionalComponent';
  import GSpacer from '../GLayout/GSpacer';
  import { getInternalValue } from '../../mixins/getVModel';

  export default {
    name: 'GGridSelect',
    components: { GSpacer, GCard, GCardActions, GCol, GRow },
    props: {
      items: [Array, Object],
      multiple: Boolean,
      mandatory: Boolean,
      grid: {
        type: Boolean,
        default: true
      },
      itemText: {
        type: String,
        default: 'text'
      },
      itemValue: {
        type: String,
        default: 'value'
      },
      returnObject: Boolean,
      modelValue: {
        type: [Array, Object, String, Number]
      },
      selectFirst: Boolean,
      itemCols: {
        type: [Number, String],
        default: 3
      }
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      const internalValue = getInternalValue(props, context)
      const options = computed(() => {
        if (Array.isArray(props.items)) return props.items;
        return _.map(props.items, (v, k) => ({ text: k, value: v }));
      })

      function convertToReturnItem(originalItem) {
        return (props.returnObject || _.isNumber(originalItem) || _.isString(originalItem))
          ? originalItem
          : originalItem[props.itemValue]
      }

      function toggleSelect(originalItem) {
        const returnItem = convertToReturnItem(originalItem);
        if (props.multiple) {
          if (!internalValue.value) internalValue.value = []
          if (internalValue.value.length <= 1 && _.includes(internalValue.value, returnItem) && props.mandatory) return
          if (_.includes(internalValue.value, returnItem)) {
            internalValue.value.splice(internalValue.value.indexOf(returnItem), 1);
          } else {
            if (!internalValue.value || !Array.isArray(internalValue.value)) internalValue.value = ref([returnItem]).value
            else internalValue.value.push(returnItem);
          }
        } else {
          if (internalValue.value === returnItem && props.mandatory) return
          internalValue.value = internalValue.value === returnItem ? null : returnItem;
        }
      }

      function isSelected(originalItem) {
        const returnItem = convertToReturnItem(originalItem);
        if (props.multiple) {
          if (_.includes(internalValue.value, returnItem)) {
            return true;
          }
        }
        return internalValue.value === returnItem;
      }

      const genItem = (item, index) => {
        const defaultSlot = context.slots.default
          && context.slots.default({
            toggleSelect, item, index
          })
        return props.grid ? <g-col cols={props.itemCols}>{defaultSlot}</g-col> : defaultSlot
      }

      const genSelectedItem = (item, index) => {
        const selectedSlot = context.slots.selected
          && context.slots.selected({
            toggleSelect, item, index
          })
        return props.grid ? <g-col cols={props.itemCols}>{selectedSlot}</g-col> : selectedSlot
      }

      const genWrapper = () => <g-row align-items="start">
          {...options.value.map((item, index) =>
            isSelected(item)
              ? genSelectedItem(item, index)
              : genItem(item, index))}
        </g-row>

      return {
        genWrapper,
        internalValue,
        options
      }
    },
    render() {
      return this.genWrapper()
    }
  }
</script>

<style scoped>

</style>
