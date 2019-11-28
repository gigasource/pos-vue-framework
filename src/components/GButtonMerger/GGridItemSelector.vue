<script>
  import _ from 'lodash';
  import { computed, ref } from '@vue/composition-api';
  import getVModel from '../../mixins/getVModel';

  export default {
    name: 'GGridItemSelectorNew',
    components: {},
    props: {
      template: {
        type: String,
        default: ''
      },
      itemText: {
        type: String,
        default: 'text'
      },
      rows: { type: [Number, String], default: '1fr 1fr' },
      cols: { type: [Number, String], default: '1fr 1fr 1fr 1fr' },
      itemValue: {
        type: String,
        default: 'value'
      },
      returnObject: Boolean,
      multiple: Boolean,
      value: {
        type: [Array, Object, String, Number]
      },
      items: {
        type: Array,
        default: () => []
      }
    },
    data: function () {
      return {
        selectedItems: []
      }
    }, setup(props, context) {
      const internalValue = getVModel(props, context);
      const options = computed(() => {
        if (Array.isArray(props.items)) {
          return props.items;
        }
        return _.map(props.items, (v, k) => ({ text: k, value: v }));
      });

      function convertToReturnItem(originalItem) {
        return (props.returnObject || _.isNumber(originalItem) || _.isString(originalItem))
          ? originalItem
          : originalItem[props.itemValue]
      }

      function toggleSelect(originalItem) {
        const returnItem = convertToReturnItem(originalItem);
        if (props.multiple) {
          if (_.includes(internalValue.value, returnItem)) {
            internalValue.value.splice(internalValue.value.indexOf(returnItem), 1);
          } else {
            if (!internalValue.value || !Array.isArray(internalValue.value)) {
              internalValue.value = ref([returnItem]).value
            } else {
              internalValue.value.push(returnItem);
            }
          }
        } else {
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
        return context.slots.default
          && context.slots.default({
            toggleSelect, item, index
          })
      };

      const genSelectedItem = (item, index) => {
        return context.slots.selected
          && context.slots.selected({
            toggleSelect, item, index
          })
      };

      function genWrapper() {
        return <div {...{ class: 'grid-item-selector', style: { gridTemplateRows: props.rows, gridTemplateColumns: props.cols } }}>
          {options.value.map((item, index) =>
            isSelected(item)
              ? genSelectedItem(item, index)
              : genItem(item, index))}
        </div>
      }

      return {
        genWrapper,
        internalValue,
        options
      }
    },
    render() {
      return this.genWrapper();
    }
  }
</script>

<style lang="scss" scoped>
  .grid-item-selector {
    display: grid;
    grid-gap: 4px;
    width: 100%;
    height: 100%;
    //grid-template-areas: "btn1 btn2 btn3 btn4" "btn5 btn6 btn7 btn8";
  }
</style>
