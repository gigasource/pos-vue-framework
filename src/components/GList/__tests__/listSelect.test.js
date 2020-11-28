import { computed, createApp, h, ref, reactive, getCurrentInstance, watch } from 'vue';
import { getSelectionText, makeListSelectable } from '../listSelectFactory';
import _ from 'lodash'

const expectTest = (value) => {
  let _value = value
  if (_.isArray(value) && _.isObject(value[0])) {
    if (_.isObject(value[0])) _value = value.map(item => _.pick(item, ['a', 'b']))
  }
  if (!_.isArray(value) && typeof value === 'object') _value = _.omit(value, ['elm', 'isRootInsert', '__ob__'])
  return expect(_value)
}

const parentVmFactory = attrs => {
  document.getElementsByTagName('html')[0].innerHTML = ''
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  return createApp({
    components: {
      child: {
        props: {
          normalize: Function,
          mandatory: Boolean,
          allowDuplicates: Boolean,
          multiple: Boolean,
          returnObject: Boolean,
          filter: {
            type: Function
          },
          inCombobox: Boolean,
          items: {
            type: Array,
            default: () => [] // Vue.observable([])
          },
          itemText: {
            default: () => item => item.text
          },
          itemValue: {
            default: () => item => item.value
          },
          isPrimitiveArray: Boolean,
          modelValue: {
            type: null,
            default: () => {
              return attrs.multiple ? [] : null
            }
          }
        },
        emits: ['update:modelValue', 'update:selectedValue', 'update:externalNormalizedValue'],
        render() {
          return <div></div>;
        },
        setup(props, context) {
          const {
            getText,
            getValue,
            listType,
            normalizedList,
            selectableValues,
            normalizedValue,
            toggleItem,
            addValueFromInput,
            isActiveItem,
          } = makeListSelectable(props, context);
          const selectionTexts = getSelectionText(props, normalizedValue, listType, getText, getValue)
          const selectionString = computed(() => selectionTexts.value.join(', '))
          return {
            myProps: props,
            getText,
            getValue,
            listType,
            normalizedList,
            selectableValues,
            normalizedValue,
            toggleItem,
            addValueFromInput,
            isActiveItem,
            selectionTexts,
            selectionString
          };
        }
      }
    },
    data() {
      return {
        'externalValueNormalize': null,
        'selection': null,
        ...attrs,
      };
    },

    render() {
      return (
          <child
              {...{
                ...this.$data,
                inCombobox: this.$data.component === 'combobox'
              }}
              ref='child'
              onUpdate:externalNormalizedValue={val => {
                console.log('update:externalNormalisedValue', val);
                this.externalValueNormalize = val;
              }}
              onUpdate:selection={val => {
                console.log('update:selection', val);
                this.selection = val;
              }}
              onUpdate:modelValue={val => {
                console.log('update:modelValue', val)
                this.modelValue = val
              }}
          />
      );
    },
    mounted() {
      this.child = this.$refs.child;
    }
  }).mount(el);
}


describe('test', function () {
  it('single, primitive', async function () {
    const parentVm = parentVmFactory({
      itemText: 'value',
      itemValue: 'value',
      modelValue: 1,
      items: [0, 1, 2, 3, 3, 6, 6]
    });
    //expectTest(parentVm.child.valueNormalize).toBe({value: 2});
    expectTest(parentVm.child.normalizedList).toEqual([0, 1, 2, 3, 6])
    expectTest(parentVm.child.normalizedValue).toEqual(1)
    expectTest(parentVm.child.isActiveItem(parentVm.child.selectableValues[1])).toBe(true)
    expectTest(parentVm.child.selectableValues).toEqual([0, 1, 2, 3, 6])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.isActiveItem(parentVm.child.selectableValues[0])).toBe(true)
    expectTest(parentVm.child.normalizedValue).toEqual(0)
    expectTest(parentVm.child.selectionString).toEqual('0')

  });
  it('single, primitive, mandatory', async function () {
    const parentVm = parentVmFactory({
      mandatory: true,
      itemText: 'value',
      itemValue: 'value',
      modelValue: 1,
      items: [1, 2, 3, 3, 6, 6]
    });
    //expectTest(parentVm.child.valueNormalize).toBe({value: 2});
    expectTest(parentVm.child.normalizedList).toEqual([1, 2, 3, 6])
    expectTest(parentVm.child.normalizedValue).toEqual(1)
    expectTest(parentVm.child.selectableValues).toEqual([1, 2, 3, 6])
    parentVm.child.toggleItem(parentVm.child.items[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual(1)
  });
  it('multiple, primitive', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: 'value',
      itemValue: 'value',
      modelValue: [2],
      items: [1, 2, 3, 3, 6, 6]
    });
    //expectTest(parentVm.child.valueNormalize).toBe({value: 2});
    expectTest(parentVm.child.normalizedList).toEqual([1, 2, 3, 6])
    expectTest(parentVm.child.normalizedValue).toEqual([2])
    expectTest(parentVm.child.selectableValues).toEqual([1, 3, 6])
    parentVm.child.toggleItem(parentVm.child.items[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([2, 1])
    expectTest(parentVm.child.selectionString).toEqual('2, 1')


  });
  it('multiple, primitive, allowDuplicates', async function () {
    const parentVm = parentVmFactory({
      allowDuplicates: true,
      multiple: true,
      itemText: 'value',
      itemValue: 'value',
      modelValue: [2],
      items: [0, 1, 2, 3, 3, 6, 6]
    });
    //expectTest(parentVm.child.valueNormalize).toBe({value: 2});
    expectTest(parentVm.child.normalizedList).toEqual([0, 1, 2, 3, 6])
    expectTest(parentVm.child.normalizedValue).toEqual([2])
    expectTest(parentVm.child.isActiveItem(parentVm.child.selectableValues[2])).toBe(true)
    expectTest(parentVm.child.selectableValues).toEqual([0, 1, 2, 3, 6])
    parentVm.child.toggleItem(parentVm.child.items[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([2, 0])
    expectTest(parentVm.child.selectionString).toEqual('2, 0')
    expectTest(parentVm.child.isActiveItem(parentVm.child.selectableValues[0])).toBe(true)
    expectTest(parentVm.child.isActiveItem(parentVm.child.selectableValues[0])).toBe(true)
  });
  it('multiple, primitive, mandatory', async function () {
    const parentVm = parentVmFactory({
      mandatory: true,
      multiple: true,
      itemText: 'value',
      itemValue: 'value',
      modelValue: [1],
      items: [1, 2, 3, 3, 6, 6]
    });
    expectTest(parentVm.child.normalizedList).toEqual([1, 2, 3, 6])
    expectTest(parentVm.child.normalizedValue).toEqual([1])
    expectTest(parentVm.child.selectableValues).toEqual([2, 3, 6])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([1, 2])
  });

  it('single returnObject ', async function () {
    const parentVm = parentVmFactory({
      itemText: 'a',
      itemValue: '',
      returnObject: true,
      modelValue: { a: 0 },
      items: [{ a: 0 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 0 })
    //expectTest(parentVm.child.isActiveItem(parentVm.child.selectableValues[0])).toBe(true)
    expectTest(parentVm.child.selectionString).toEqual('0')
    expectTest(parentVm.child.normalizedList).toEqual([{ a: 0 }, { a: 2 }, { a: 3 }, { a: 6 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 0 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[1])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 2 })
    expectTest(parentVm.child.isActiveItem(parentVm.child.selectableValues[0])).toBe(false)

  });
  it('single returnObject init value is value ', async function () {
    const parentVm = parentVmFactory({
      itemText: 'value',
      itemValue: 'a',
      returnObject: true,
      modelValue: 1,
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 1 })
    expectTest(parentVm.child.normalizedList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.items[2])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 3 })
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    expectTest(parentVm.child.selectionString).toEqual('3')


  });
  it('single not returnObject itemValue', async function () {
    const parentVm = parentVmFactory({
      itemText: 'a',
      itemValue: 'a',
      returnObject: false,
      modelValue: 1,
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 1 })
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[2])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 3 })

    expectTest(parentVm.child.modelValue).toEqual(3)


  });
  it('single not returnObject itemText', async function () {
    const parentVm = parentVmFactory({
      itemText: 'a',
      itemValue: '',
      returnObject: false,
      modelValue: 1,
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 1 })
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[2])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 3 })
    expectTest(parentVm.child.selectionString).toEqual('3')
    expectTest(parentVm.child.modelValue).toEqual(3)


  });
  it('single not returnObject itemValue itemText', async function () {
    const parentVm = parentVmFactory({
      itemText: 'a',
      itemValue: 'b',
      returnObject: false,
      modelValue: 1,
      items: [{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 3, b: 7 }, { a: 3, b: 7 }, { a: 6, b: 8 }, { a: 6, b: 8 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 2, b: 1 })
    expectTest(parentVm.child.modelValue).toEqual(1)
    expectTest(parentVm.child.selectionString).toEqual('2')
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 3, b: 7 }, { a: 6, b: 8 },])
    parentVm.child.toggleItem(parentVm.child.selectableValues[2])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 3, b: 7 })
    expectTest(parentVm.child.modelValue).toEqual(7)
    expectTest(parentVm.child.selectionString).toEqual('3')


  });

  it('multiple returnObject ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: '',
      itemValue: '',
      returnObject: true,
      modelValue: [{ a: 1 }],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }])


  });
  it('multiple returnObject allowDuplicates', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      allowDuplicates: true,
      itemText: '',
      itemValue: '',
      returnObject: true,
      modelValue: [{ a: 1 }],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 1 }])


  });
  it('multiple returnObject init value is value ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: '',
      itemValue: 'a',
      returnObject: true,
      modelValue: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }])
    expectTest(parentVm.child.selectionString).toEqual('1, 2, 3')


  });
  it('multiple returnObject init value is value allowDuplicates', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      allowDuplicates: true,
      itemText: '',
      itemValue: 'a',
      returnObject: true,
      modelValue: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 1 }])
    expectTest(parentVm.child.selectionString).toEqual('1, 2, 1')


  });
  it('multiple not returnObject itemValue ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: '',
      itemValue: 'a',
      modelValue: [{ a: 1 }],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }])
    expectTest(parentVm.child.modelValue).toEqual([{ a: 1 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }])
    expectTest(parentVm.child.selectionString).toEqual('1, 2')


  });
  it('multiple not returnObject init value is value itemValue ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: '',
      itemValue: 'a',
      modelValue: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 },])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 3 },])
    expectTest(parentVm.child.modelValue).toEqual([1, 2, 3])
    expectTest(parentVm.child.selectionString).toEqual('1, 2, 3')

  });
  it('multiple not returnObject init value is value itemValue allowDuplicates ', async function () {
    const parentVm = parentVmFactory({
      allowDuplicates: true,
      multiple: true,
      itemText: '',
      itemValue: 'a',
      modelValue: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 },])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 1 }])
    expectTest(parentVm.child.modelValue).toEqual([1, 2, 1])
    expectTest(parentVm.child.selectionString).toEqual('1, 2, 1')
  });
  it('multiple not returnObject itemText ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: 'a',
      itemValue: '',
      modelValue: [{ a: 1 }],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }])
    expectTest(parentVm.child.modelValue).toEqual([1, 2])
    expectTest(parentVm.child.selectionString).toEqual('1, 2')


  });
  it('multiple not returnObject init value is primitive itemText ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: 'a',
      itemValue: '',
      modelValue: [1, 2],
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 },])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1 }, { a: 2 }, { a: 3 },])
    expectTest(parentVm.child.modelValue).toEqual([1, 2, 3])
    expectTest(parentVm.child.selectionString).toEqual('1, 2, 3')

  });
  it('multiple not returnObject init value is primitive itemText allowDuplicates ', async function () {
    const parentVm = parentVmFactory({
      allowDuplicates: true,
      multiple: true,
      itemText: 'a',
      itemValue: '',
      modelValue: [1, 2],
      items: [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }, { a: 3, b: 3 }, { a: 6, b: 6 }, { a: 6, b: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }, { a: 6, b: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 1, b: 1 }])
    expectTest(parentVm.child.modelValue).toEqual([1, 2, 1])
    expectTest(parentVm.child.selectionString).toEqual('1, 2, 1')
  });
  it('multiple not returnObject itemValue itemText ', async function () {
    const parentVm = parentVmFactory({
      multiple: true,
      itemText: 'b',
      itemValue: 'a',
      modelValue: [{ a: 1, b: 1 }],
      items: [{ a: 1, b: 1 }, { a: 3, b: 2 }, { a: 3, b: 3 }, { a: 3, b: 3 }, { a: 6, b: 6 }, { a: 6, b: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1, b: 1 }])
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 3, b: 2 }, { a: 3, b: 3 }, { a: 6, b: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1, b: 1 }, { a: 3, b: 2 }])
    expectTest(parentVm.child.modelValue).toEqual([1, 3])
    expectTest(parentVm.child.selectionString).toEqual('1, 2')


  });
//todo: test getSelection
  //todo: combobox test:
  it('single, primitive, combobox', async function () {
    const parentVm = parentVmFactory({
      itemText: 'value',
      itemValue: 'value',
      modelValue: 1,
      items: [1, 2, 3, 3, 6, 6],
      component: 'combobox'
    });
    //expectTest(parentVm.child.valueNormalize).toBe({value: 2});
    expectTest(parentVm.child.normalizedList).toEqual([1, 2, 3, 6])
    expectTest(parentVm.child.selectionTexts).toEqual([1])
    expectTest(parentVm.child.isActiveItem(parentVm.child.selectableValues[0])).toBe(true)
    expectTest(parentVm.child.selectableValues).toEqual([1, 2, 3, 6])
    parentVm.child.toggleItem(7)
    await parentVm.$nextTick();
    await parentVm.$nextTick();

    expectTest(parentVm.child.normalizedValue).toEqual(7)
    expectTest(parentVm.child.selectionString).toEqual('7')

  });
  it('single not returnObject itemText, combobox', async function () {
    const parentVm = parentVmFactory({
      component: 'combobox',
      itemText: 'b',
      itemValue: 'a',
      returnObject: false,
      modelValue: 1,
      items: [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 3, b: 4 }, { a: 6, b: 7 }, { a: 6, b: 7 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 1, b: 2 })
    expectTest(parentVm.child.selectionTexts).toEqual([2])
    expectTest(parentVm.child.selectionString).toEqual('2')
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 6, b: 7 }])
    parentVm.child.toggleItem(5)
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual(5)
    expectTest(parentVm.child.selectionString).toEqual('5')
    expectTest(parentVm.child.modelValue).toEqual(5)


  });
  it('single returnObject itemValue itemText, combobox', async function () {
    const parentVm = parentVmFactory({
      component: 'combobox',
      itemText: 'a',
      itemValue: 'a',
      returnObject: true,
      modelValue: 9,
      items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 6 }, { a: 6 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual(9)
    expectTest(parentVm.child.selectionTexts).toEqual([9])
    expectTest(parentVm.child.selectionString).toEqual('9')
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 6 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0])
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 1 })
    expectTest(parentVm.child.selectionString).toEqual('1')


  });

  it('multiple returnObject, combobox', async function () {
    const parentVm = parentVmFactory({
      component: 'combobox',
      multiple: true,
      itemText: 'b',
      itemValue: 'a',
      returnObject: true,
      modelValue: [1],
      items: [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 3, b: 4 }, { a: 6, b: 7 }, { a: 6, b: 7 }]
    });
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1, b: 2 }])
    expectTest(parentVm.child.selectionTexts).toEqual([2])
    expectTest(parentVm.child.selectionString).toEqual('2')
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 2, b: 3 }, { a: 3, b: 4 }, { a: 6, b: 7 }])
    parentVm.child.toggleItem(2)
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual([{ a: 1, b: 2 }, { a: 2, b: 3 }])
    expectTest(parentVm.child.selectionString).toEqual('2, 3')


  });

  it('single returnObject combobox normalize', async function () {
    const parentVm = parentVmFactory({
      normalize: (value, items) =>
        items.find(i => value && i.b.toString() === value.toString()),
      component: 'combobox',
      multiple: false,
      itemText: 'a',
      itemValue: 'b',
      returnObject: true,
      modelValue: () => 1,
      items: [{ a: 1, b: () => 1 }, { a: 2, b: () => 2 }, { a: 3, b: () => 3 }]
    });
    expectTest(parentVm.child.normalizedValue.b.toString()).toEqual(
      `() => 1`
    );
    parentVm.child.toggleItem(() => 2);
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue.b.toString()).toEqual(
      '() => 2'
    );
  });

  it('single returnObject combobox normalize when value is not in items', async function () {
    const parentVm = parentVmFactory({
      normalize: (value, items) => {
        const found = items.find(i => value && i.b.toString() === value.toString());
        if (found) return found;
        return value;
      },
      component: 'combobox',
      multiple: false,
      itemText: 'a',
      itemValue: 'b',
      returnObject: true,
      modelValue: { a: 1, b: () => 1 },
      items: [{ a: 1, b: () => 1 }, { a: 2, b: () => 2 }, { a: 3, b: () => 3 }]
    });
    expectTest(parentVm.child.normalizedValue.b.toString()).toEqual(
      `() => 1`
    );
  });

  it('single returnValue combobox normalize when value is not in items', async function () {
    const parentVm = parentVmFactory({
      normalize: (value, items, isFromInput) => {
        // value from input
        if (isFromInput) return { a: value, b: eval(`() => ${value}`) };
        // value in items
        const found = items.find(i => value && i.b.toString() === value.toString());
        if (found) return found;
        // value from v-model but not in items
        return { a: value(), b: value };
      },
      component: 'combobox',
      multiple: false,
      itemText: 'a',
      itemValue: 'b',
      returnObject: false,
      modelValue: () => 4,
      items: [{ a: 1, b: () => 1 }, { a: 2, b: () => 2 }, { a: 3, b: () => 3 }]
    });
    expectTest(parentVm.child.normalizedValue.b.toString()).toEqual(
      `() => 4`
    );
    //parentVm.child.toggleItem('5');
    parentVm.child.toggleItem(parentVm.child.selectableValues[0]);
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue.b.toString()).toEqual(
      '() => 1'
    );
    expectTest(parentVm.child.selectionString).toEqual(
      '1'
    );
  });

  it('multiple returnValue combobox normalize when value is not in items', async function () {
    const parentVm = parentVmFactory({
      normalize: (value, items, isFromInput) => {
        if (isFromInput) return { a: value, b: eval(`() => ${value}`) };
        const found = items.find(i => value && i.b.toString() === value.toString());
        if (found) return found;
        return { a: value(), b: value };
      },
      component: 'combobox',
      multiple: true,
      itemText: 'a',
      itemValue: 'b',
      returnObject: false,
      modelValue: [() => 4],
      items: [{ a: 1, b: () => 1 }, { a: 2, b: () => 2 }, { a: 3, b: () => 3 }]
    });
    expect(parentVm.child.normalizedValue[0].b.toString()).toEqual(
      `() => 4`
    );
    //parentVm.child.toggleItem('5');
    parentVm.child.addValueFromInput('1');
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expect(parentVm.child.normalizedValue[1].b.toString()).toEqual(
      '() => 1'
    );
    expect(parentVm.child.selectionString).toEqual(
      '4, 1'
    );
  });
  //todo: case items is empty by beginning


  it('single returnValue combobox items empty in beginning', async function () {
    const parentVm = parentVmFactory({
      component: 'combobox',
      multiple: false,
      itemText: 'a',
      itemValue: 'b',
      returnObject: false,
      modelValue: null,
      items: []
    });
    expectTest(parentVm.child.normalizedValue).toEqual(undefined);
    parentVm.items = [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 3, b: 4 }, { a: 6, b: 7 }, { a: 6, b: 7 }]
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.selectableValues).toEqual([{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 6, b: 7 }])
    parentVm.child.toggleItem(parentVm.child.selectableValues[0]);
    await parentVm.$nextTick();
    await parentVm.$nextTick();
    expectTest(parentVm.child.normalizedValue).toEqual({ a: 1, b: 2 });
    expectTest(parentVm.child.selectionString).toEqual('1');

  });
});
