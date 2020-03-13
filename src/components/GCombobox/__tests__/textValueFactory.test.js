import Vue from 'vue/dist/vue.common.js';
import _ from 'lodash';
import { getSelectionText, makeListSelectable } from '../../GList/listSelectFactory';
import textValueFactory from '../textValueFactory';

const expectTest = (value) => {
  let _value = value
  if (_.isArray(value) && _.isObject(value[0])) {
    if (_.isObject(value[0])) _value = value.map(item => _.pick(item, ['a', 'b']))
  }
  if (!_.isArray(value) && typeof value === 'object') _value = _.omit(value, ['elm', 'isRootInsert', '__ob__'])
  return expect(_value)
}

const parentVmFactory = attrs =>
  new Vue({
    components: {
      child: {
        props: {
          chips: Boolean,
          normalize: Function,
          mandatory: Boolean,
          allowDuplicates: Boolean,
          multiple: Boolean,
          returnObject: Boolean,
          component: String,
          filter: {
            type: Function
          },
          inCombobox: Boolean,
          items: {
            type: Array,
            default: () => Vue.observable([])
          },
          itemText: {
            default: () => item => item.text
          },
          itemValue: {
            default: () => item => item.value
          },
          isPrimitiveArray: Boolean,
          value: {
            type: null,
            default() {
              this.$on('input', val => (this.value = val));
              if (this.multiple) {
                return Vue.observable([]);
              }
              return Vue.observable(null);
            }
          }
        },
        setup(props, context) {
          const {
            getText,
            getValue,
            listType,
            normalizedValue: selectedValue,
            toggleItem,
            addValueFromInput,
          } = makeListSelectable(props, context)

          const selectionTexts = getSelectionText(props, selectedValue, listType, getText, getValue)

          const {
            tfValue,
            updateValue,
            searchText
          } = textValueFactory(props, context, selectionTexts, addValueFromInput)

          return {
            tfValue,
            searchText,
            toggleItem,
            updateValue
          }
        },
        render() {
          return <div>this.value</div>
        }
      }
    },
    data() {
      return {
        ...attrs
      }
    },
    mounted() {
      this.child = this.$refs.child
    },
    render() {
      return <child ref={'child'} {...{
        props: {
          ...this.$data,
        },
        on: {
          input: e => this.value = e
        }
      }}/>
    }
  }).$mount()

describe('textValue test', function () {
  // single
  it('should change tfValue when value changes', async function () {
    const parentVm = parentVmFactory({
      value: 1,
      items: [0, 1, 2, 3, 4, 5, 6]
    })
    expectTest(parentVm.child.tfValue).toEqual('1')
    parentVm.child.toggleItem(parentVm.child.items[2])
    await parentVm.$nextTick()
    expectTest(parentVm.child.tfValue).toEqual('2')

  });
  it('should display searchText when input value changes', async function () {
    const parentVm = parentVmFactory({
      value: 1,
      items: [0, 1, 2, 3, 4, 5, 6]
    })

    parentVm.child.tfValue = '3'
    await parentVm.$nextTick()
    expectTest(parentVm.child.searchText).toEqual('3')
  });
  it('should display new value', async function () {
    const parentVm = parentVmFactory({
      value: 1,
      items: [0, 1, 2, 3, 4, 5],
      component: 'combobox'
    })

    parentVm.child.tfValue = '3'
    await parentVm.$nextTick()
    expectTest(parentVm.child.searchText).toEqual('3')

    parentVm.child.tfValue = 'new'
    parentVm.child.updateValue()
    await parentVm.$nextTick()
    expectTest(parentVm.value).toEqual('new')
    expectTest(parentVm.child.searchText).toEqual('new')
    expectTest(parentVm.child.tfValue).toEqual('new')
  });
  it('should delete searchText when display chips', async function () {
    const parentVm = parentVmFactory({
      value: 1,
      items: [0, 1, 2, 3, 4, 5, 6],
      chips: true,
      component: 'combobox'
    })

    parentVm.child.toggleItem(parentVm.child.items[2])
    await parentVm.$nextTick()
    expectTest(parentVm.child.searchText).toEqual('')

    parentVm.child.tfValue = 'new'
    parentVm.child.updateValue()
    await parentVm.$nextTick()
    expectTest(parentVm.value).toEqual('new')
    expectTest(parentVm.child.searchText).toEqual('')
    expectTest(parentVm.child.tfValue).toEqual('')
  });

  //todo tests for props.multiple
  //multiple
  it('should not display tfValue', async function () {
    const parentVm = parentVmFactory({
      value: [2, 3, 4],
      items: [0, 1, 2, 3, 4, 5, 6],
      chips: true,
      component: 'combobox',
      multiple: true
    })

    await parentVm.$nextTick()
    expectTest(parentVm.child.tfValue).toEqual('')
  });
  it('should not display tfValue when toggling value', async function () {
    const parentVm = parentVmFactory({
      value: [],
      items: [0, 1, 2, 3, 4, 5, 6],
      chips: true,
      component: 'combobox',
      multiple: true
    })

    parentVm.child.toggleItem(parentVm.child.items[3])
    await parentVm.$nextTick()
    parentVm.child.tfValue = 'new'
    expectTest(parentVm.child.searchText).toEqual('new')
    parentVm.child.updateValue()
    await parentVm.$nextTick()

    expectTest(parentVm.value).toEqual([3, 'new'])
    expectTest(parentVm.child.searchText).toEqual('')
    expectTest(parentVm.child.tfValue).toEqual('')
  });
})