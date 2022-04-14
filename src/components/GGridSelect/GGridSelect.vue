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
        type: [String, Function],
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
      },
      mergeSlots: {
        type: Boolean,
        default: false
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
        if (props.returnObject || _.isNumber(originalItem) || _.isString(originalItem)) return originalItem
        else {
          if (_.isString(props.itemValue)) return originalItem[props.itemValue]
          else return props.itemValue(originalItem) //if itemValue is a function; todo: add check function type here
        }
      }

      function toggleSelect(originalItem) {
        const returnItem = convertToReturnItem(originalItem);
        if (props.multiple) {
          if (!internalValue.value) internalValue.value = []
          if (internalValue.value.length <= 1 && _.includes(internalValue.value, returnItem) && props.mandatory) return
          if (_.includes(internalValue.value, returnItem)) {
            internalValue.value.splice(internalValue.value.indexOf(returnItem), 1);
            context.emit('update:modelValue', internalValue.value)
          } else {
            if (!internalValue.value || !Array.isArray(internalValue.value)) internalValue.value = ref([returnItem]).value
            else {
              internalValue.value.push(returnItem);
              context.emit('update:modelValue', internalValue.value)
            }
          }
        } else {
          if (internalValue.value === returnItem && props.mandatory) return
          internalValue.value = internalValue.value === returnItem ? null : returnItem;
        }
      }

      function isSameValue(obj, obj1) {
        if (typeof props.itemValue === 'string') return _.get(obj, props.itemValue) === _.get(obj1, props.itemValue)
        else return props.itemValue(obj) === props.itemValue(obj1)
      }

      function isSelected(originalItem) {
        const returnItem = convertToReturnItem(originalItem);
        if (props.multiple) {
          if (props.returnObject) return _.some(internalValue.value, i => isSameValue(i, returnItem))
          else return _.includes(internalValue.value, returnItem)
        } else {
          if (props.returnObject) {
            return isSameValue(returnItem, internalValue.value)
          } else return internalValue.value === returnItem;
        }
      }

      const genItem = (item, index) => {
        if (props.mergeSlots) {
          const defaultSlot = context.slots.default
            && context.slots.default({
              toggleSelect, item, index, isSelected: isSelected(item)
            })
          return props.grid ? <g-col cols={props.itemCols}>{defaultSlot}</g-col> : defaultSlot
        } else {
          const slot = isSelected(item) ? context.slots.selected : context.slots.default
          const itemVNode = slot && slot({toggleSelect, item, index})
          return props.grid ? <g-col cols={props.itemCols}>{itemVNode}</g-col> : itemVNode
        }
      }


      const genWrapper = () => <g-row align-items="start">
        {options.value.map((item, index) => genItem(item, index))}
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
