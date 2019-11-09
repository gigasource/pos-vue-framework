<script>
  import _ from 'lodash';
  import { computed } from '@vue/composition-api';
  import GRow from '../GLayout/GRow';
  import GCol from '../GLayout/GCol';
  import GCard from '../GCard/GCard';
  import { GCardActions } from '../GCard/GCardFunctionalComponent';
  import GSpacer from '../GLayout/GSpacer';

  export default {
    name: 'GGridSelect',
    components: { GSpacer, GCard, GCardActions, GCol, GRow },
    props: {
      items: [Array, Object],
      multiple: Boolean,
      itemImage: {
        type: String,
        default: 'image'
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
      value: {
        type: [Array, Object, String, Number]
      },
      selectFirst: Boolean,
      cols: {
        type: [Number, String],
        default: 3
      }
    },
    setup(props, context) {
      const internalValue = computed(({
        get() {
          if (props.multiple && !Array.isArray(props.value)) {
            return props.value ? [props.value] : [];
          }
          return props.value
        },
        set(value) {
          context.emit('input', value)
        }
      }))

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
          if (_.includes(internalValue.value, returnItem)) {
            internalValue.value.splice(internalValue.value.indexOf(returnItem), 1);
          } else {
            internalValue.value.push(returnItem);
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
        const data = {
          on: {
            click: (e) => {
              e.stopPropagation()
              toggleSelect(item)
            }
          }
        }
        return <g-col cols={props.cols}>
          {context.slots.default
            ? context.slots.default({
              toggleSelect, item, index
            })
            : //fallback
            <g-card {...data}>
              <g-card-actions>
                <g-spacer/>
                <span>{item[props.itemText] || item}</span>
              </g-card-actions>
            </g-card>
          }
        </g-col>
      }

      const genSelectedItem = (item, index) => {
        const data = {
          on: {
            click: (e) => {
              e.stopPropagation()
              toggleSelect(item)
            }
          }
        }

        return <g-col cols={props.cols}>
          {context.slots.selected
            ? context.slots.selected({
              toggleSelect, item, index
            })
            : //fallback
            <g-card {...data}>
              <g-card-actions>
                <g-spacer/>
                <span>{item[props.itemText] || item}</span>
              </g-card-actions>
            </g-card>
          }
        </g-col>
      }

      return () => <g-row align-items="start">
        {options.value.map((item, index) => isSelected(item) ? genSelectedItem(item, index) : genItem(item, index))}
      </g-row>
    }
  }
</script>

<style scoped>

</style>