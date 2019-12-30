import { computed, ref, watch } from '@vue/composition-api';
import Vue from 'vue/dist/vue.common.js';
import { getSelection2, getSelectionText, makeListSelectable2 } from '../listSelectFactory';

const parentVmFactory = attrs =>
  new Vue({
    components: {
      child: {
        props: {
          mandatory: Boolean,
          allowDuplicates: Boolean,
          multiple: Boolean,
          returnObject: Boolean,

          filter: {
            type: Function
          },
          component: String,
          items: {
            type: Array,
            default: () => []
          },
          itemText: {
            default: () => item => item.text
          },
          itemValue: {
            default: () => item => item.value
          },
          isPrimitiveArray: Boolean,
          itemType: {
            default() {
              if (this.items.length > 0) {
                if (typeof this.items[0] === 'object' && this.returnObject) {
                  return 'objectArrayReturnObject';
                }
                if (typeof this.items[0] === 'object') {
                  return 'objectArrayReturnValue';
                }
                return 'primitiveArray';
              } else {
                if (this.isPrimitiveArray) return 'primitiveArray';
                if (this.returnObject) return 'objectArrayReturnObject';
                return 'objectArrayReturnValue';
              }
            }
          },
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
        render() {
          return <div>{this.value}</div>;
        },
        setup(props, context) {
          const {
            getText,
            getValue,
            listType,
            normalisedList,
            selectableList,
            normalisedValue,
            toggleItem,
            isActiveItem,
          } = makeListSelectable2(props, context);
          const valRef = ref(props.value)
          watch(() => props.value, () => valRef.value = props.value)
          //const formattedSelection = getSelection3(props, valRef, listType, getText, getValue)
          const formattedSelection = getSelection2(props, context,  normalisedValue, listType, getText, getValue)
          const selectionTexts = getSelectionText(props, formattedSelection)
          const selectionString = computed(() => props.multiple ? selectionTexts.value.join(', ') : selectionTexts.value.toString())
          const searchText = ref('');
          return {
            getText,
            getValue,
            listType,
            normalisedList,
            selectableList,
            normalisedValue,
            toggleItem,
            isActiveItem,
            formattedSelection,
            selectionTexts,
            selectionString
          };
        }
      }
    },
    data() {
      return {
        externalValueNormalize: null,
        selection: null,
        ...attrs,
      };
    },
    render(h) {
      //return <child vModel={this.parentValue}/>
      return (
        <child
          {...{
            props: this.$data,
            on: {
              'update:externalNormalisedValue': val => {
                console.log('update:externalNormalisedValue', val);
                this.externalValueNormalize = val;
              },
              'update:selection': val => {
                console.log('update:selection', val);
                this.selection = val;
              }
            }
          }}
          ref={'child'}
          vOn:input={val => (this.value = val)}
        />
      );
    },
    mounted() {
      this.child = this.$refs.child;
    }
  }).$mount();
describe('test', function () {
  it('single, primitive', async function () {
    const parentVm = parentVmFactory({
      itemText: 'value',
      itemValue: 'value',
      value: 1,
      items: [0, 1, 2, 3, 3, 6, 6]
    });
    //expect(parentVm.child.valueNormalize).toBe({value: 2});
    expect(parentVm.child.normalisedList).toEqual([0, 1, 2, 3, 6])
    expect(parentVm.child.normalisedValue).toEqual(1)
    expect(parentVm.child.formattedSelection).toEqual(1)
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[1])).toBe(true)
    expect(parentVm.child.selectableList).toEqual([0, 1, 2, 3, 6])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[0])).toBe(true)
    expect(parentVm.child.normalisedValue).toEqual(0)
    expect(parentVm.externalValueNormalize).toEqual(0)
    expect(parentVm.child.selectionString).toEqual('0')

  });
  it('single, primitive, mandatory', async function () {
    const parentVm = parentVmFactory({
      mandatory: true,
      itemText: 'value',
      itemValue: 'value',
      value: 1,
      items: [1, 2, 3, 3, 6, 6]
    });
    //expect(parentVm.child.valueNormalize).toBe({value: 2});
    expect(parentVm.child.normalisedList).toEqual([1, 2, 3, 6])
    expect(parentVm.child.normalisedValue).toEqual(1)
    expect(parentVm.externalValueNormalize).toEqual(1)
    expect(parentVm.child.selectableList).toEqual([1, 2, 3, 6])
    parentVm.child.toggleItem(parentVm.child.items[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual(1)
    expect(parentVm.externalValueNormalize).toEqual(1)


  });
  it('multiple, primitive', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: 'value',
      itemValue: 'value',
      value: [2],
      items: [1, 2, 3, 3, 6, 6]
    });
    //expect(parentVm.child.valueNormalize).toBe({value: 2});
    expect(parentVm.child.normalisedList).toEqual([1, 2, 3, 6])
    expect(parentVm.child.normalisedValue).toEqual([2])
    expect(parentVm.child.selectableList).toEqual([1, 3, 6])
    parentVm.child.toggleItem(parentVm.child.items[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([2, 1])
    expect(parentVm.child.selectionString).toEqual('2, 1')


  });
  it('multiple, primitive, allowDuplicates', async function () {
    const parentVm = parentVmFactory({
      allowDuplicates: true,
      multiple: true,
      itemText: 'value',
      itemValue: 'value',
      value: [2],
      items: [0,1, 2, 3, 3, 6, 6]
    });
    //expect(parentVm.child.valueNormalize).toBe({value: 2});
    expect(parentVm.child.normalisedList).toEqual([0,1, 2, 3, 6])
    expect(parentVm.child.normalisedValue).toEqual([2])
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[2])).toBe(true)
    expect(parentVm.child.selectableList).toEqual([0,1, 2, 3, 6])
    parentVm.child.toggleItem(parentVm.child.items[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([2, 0])
    expect(parentVm.child.selectionString).toEqual('2, 0')
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[0])).toBe(true)
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[0])).toBe(true)
  });
  it('multiple, primitive, mandatory', async function () {
    const parentVm = parentVmFactory({
      mandatory: true,
      multiple: true,
      itemText: 'value',
      itemValue: 'value',
      value: [1],
      items: [1, 2, 3, 3, 6, 6]
    });
    expect(parentVm.child.normalisedList).toEqual([1, 2, 3, 6])
    expect(parentVm.child.normalisedValue).toEqual([1])
    expect(parentVm.child.selectableList).toEqual([2, 3, 6])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([1, 2])
  });

  it('single returnObject ', async function () {
    const parentVm = parentVmFactory({
      itemText: 'a',
      itemValue: '',
      returnObject: true,
      value: { a: 0 },
      items: [{ a: 0 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual({ a: 0 })
    expect(parentVm.externalValueNormalize).toEqual({ a: 0 })
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[0])).toBe(true)
    expect(parentVm.child.selectionString).toEqual('0')
    expect(parentVm.child.normalisedList).toEqual([{ a: 0 }, { a: 2 }, { a: 3 }, { a: 6 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 0 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[1])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual({ a: 2 })
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[0])).toBe(false)
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[1])).toBe(true)



  });
  it('single returnObject init value is value ', async function () {
    const parentVm = parentVmFactory({
      itemText: 'value',
      itemValue: 'a',
      returnObject: true,
      value: 1,
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual({ a: 1 })
    expect(parentVm.child.normalisedList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.items[2])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual({ a: 3 })
    expect(parentVm.child.selectableList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    expect(parentVm.child.selectionString).toEqual('3')


  });
  it('single not returnObject itemValue', async function () {
    const parentVm = parentVmFactory({
      itemText: 'a',
      itemValue: 'a',
      returnObject: false,
      value: 1,
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual({ a: 1 })
    expect(parentVm.child.selectableList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[2])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual({ a: 3 })

    expect(parentVm.child.value).toEqual(3)


  });
  it('single not returnObject itemText', async function () {
    const parentVm = parentVmFactory({
      itemText: 'a',
      itemValue: '',
      returnObject: false,
      value: 1,
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual({ a: 1 })
    expect(parentVm.child.selectableList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[2])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual({ a: 3 })
    expect(parentVm.child.selectionString).toEqual('3')
    expect(parentVm.child.value).toEqual(3)


  });
  it('single not returnObject itemValue itemText', async function () {
    const parentVm = parentVmFactory({
      itemText: 'a',
      itemValue: 'b',
      returnObject: false,
      value: 1,
      items: [{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 3, b: 7 }, { a: 3, b: 7 }, { a: 6, b: 8 }, { a: 6, b: 8 }]
    });
    expect(parentVm.child.normalisedValue).toEqual({ a: 2, b: 1 })
    expect(parentVm.child.value).toEqual(1)
    expect(parentVm.child.formattedSelection).toEqual({text: 2, value: 1})
    expect(parentVm.child.selectionString).toEqual('2')
    expect(parentVm.child.selectableList).toEqual([{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 3, b: 7 },{ a: 6, b: 8 },])
    parentVm.child.toggleItem(parentVm.child.selectableList[2])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual({ a: 3, b: 7 })
    expect(parentVm.child.value).toEqual(7)
    expect(parentVm.child.selectionString).toEqual('3')



  });

  it('multiple returnObject ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: '',
      itemValue: '',
      returnObject: true,
      value: [{ a: 1 }],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }])


  });
  it('multiple returnObject allowDuplicates', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      allowDuplicates: true,
      itemText: '',
      itemValue: '',
      returnObject: true,
      value: [{ a: 1 }],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 1 }])


  });
  it('multiple returnObject init value is value ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: '',
      itemValue: 'a',
      returnObject: true,
      value: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }])
    expect(parentVm.child.selectionString).toEqual('1, 2, 3')


  });
  it('multiple returnObject init value is value allowDuplicates', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      allowDuplicates: true,
      itemText: '',
      itemValue: 'a',
      returnObject: true,
      value: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 1 }])
    expect(parentVm.child.selectionString).toEqual('1, 2, 1')


  });
  it('multiple not returnObject itemValue ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: '',
      itemValue: 'a',
      value: [{ a: 1 }],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }])
    expect(parentVm.child.selectionString).toEqual('1, 2')


  });
  it('multiple not returnObject init value is value itemValue ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: '',
      itemValue: 'a',
      value: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 },])
    expect(parentVm.child.selectableList).toEqual([{ a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 3 },])
    expect(parentVm.child.value).toEqual([1, 2, 3])
    expect(parentVm.child.selectionString).toEqual('1, 2, 3')

  });
  it('multiple not returnObject init value is value itemValue allowDuplicates ', async function () {
    const parentVm = parentVmFactory({
      allowDuplicates: true,
      multiple: true,
      itemText: '',
      itemValue: 'a',
      value: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 },])
    expect(parentVm.child.selectableList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 1 }])
    expect(parentVm.child.value).toEqual([1, 2, 1])
    expect(parentVm.child.selectionString).toEqual('1, 2, 1')
  });
  it('multiple not returnObject itemText ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: 'a',
      itemValue: '',
      value: [{ a: 1 }],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }])
    expect(parentVm.child.value).toEqual([1, 2])
    expect(parentVm.child.selectionString).toEqual('1, 2')


  });
  it('multiple not returnObject init value is primitive itemText ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: 'a',
      itemValue: '',
      value: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 },])
    expect(parentVm.child.selectableList).toEqual([{ a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 3 },])
    expect(parentVm.child.value).toEqual([1, 2, 3])
    expect(parentVm.child.selectionString).toEqual('1, 2, 3')

  });
  it('multiple not returnObject init value is primitive itemText allowDuplicates ', async function () {
    const parentVm = parentVmFactory({
      allowDuplicates: true,
      multiple: true,
      itemText: 'a',
      itemValue: '',
      value: [1, 2],
      items: [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }, { a: 3, b: 3 }, { a: 6, b: 6 }, { a: 6, b: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }, { a: 6, b: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 1, b: 1 }])
    expect(parentVm.child.value).toEqual([1, 2, 1])
    expect(parentVm.child.selectionString).toEqual('1, 2, 1')
  });
  it('multiple not returnObject itemValue itemText ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: 'b',
      itemValue: 'a',
      value: [{ a: 1, b: 1 }],
      items: [{ a: 1, b: 1 }, { a: 3, b: 2 }, { a: 3, b: 3 }, { a: 3, b: 3 }, { a: 6, b: 6 }, { a: 6, b: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1, b: 1 }])
    expect(parentVm.child.selectableList).toEqual([{ a: 3, b: 2 }, { a: 3, b: 3 }, { a: 6, b: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableList[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual([{ a: 1, b: 1 }, { a: 3, b: 2 }])
    expect(parentVm.child.value).toEqual([1, 3])
    expect(parentVm.child.selectionString).toEqual('1, 2')


  });
//todo: test getSelection
  //todo: combobox test:
  it('single, primitive, combobox', async function () {
    const parentVm = parentVmFactory({
      itemText: 'value',
      itemValue: 'value',
      value: 1,
      items: [1, 2, 3, 3, 6, 6],
      component: 'combobox'
    });
    //expect(parentVm.child.valueNormalize).toBe({value: 2});
    expect(parentVm.child.normalisedList).toEqual([1, 2, 3, 6])
    expect(parentVm.child.normalisedValue).toEqual(1)
    expect(parentVm.child.formattedSelection).toEqual(1)
    expect(parentVm.child.isActiveItem(parentVm.child.selectableList[0])).toBe(true)
    expect(parentVm.child.selectableList).toEqual([1, 2, 3, 6])
    parentVm.child.toggleItem(7)
    await parentVm.$nextTick();
    await parentVm.$nextTick();

    expect(parentVm.child.normalisedValue).toEqual(7)
    expect(parentVm.externalValueNormalize).toEqual(7)
    expect(parentVm.child.selectionString).toEqual('7')

  });
  it('single not returnObject itemText, combobox', async function () {
    const parentVm = parentVmFactory({
      component:'combobox',
      itemText: 'a',
      itemValue: 'a',
      returnObject: false,
      value: 9,
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expect(parentVm.child.normalisedValue).toEqual(9)
    expect(parentVm.child.selectableList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(7)
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalisedValue).toEqual(7)
    expect(parentVm.externalValueNormalize).toEqual(7)
    expect(parentVm.child.selectionString).toEqual('7')
    expect(parentVm.child.value).toEqual(7)


  });

});
