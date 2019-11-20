import {computed, reactive, ref} from '@vue/composition-api';
import groupable, {makeSelectable} from '../groupable';

// testing
import Vue from 'vue/dist/vue.common.js'

const testComp = (props) => ({
  template: '<div/>',
  props: Object.assign({
    multiple: {
      default: true,
      type: Boolean
    },
    mandatory: Boolean,
    value: {
      type: [Array, Object, String, Number, Boolean],
      default: () => null
    },
    itemValue: {
      default: null,
      type: String
    },
    items: {
      type: Array,
      default: () => []
    }
  }, props),
  setup(props, context) {
    const {toggleItem, isActiveItem, internalValue} = makeSelectable(props, context);

    return {
      internalValue,
      toggleItem,
      isActiveItem
    }
  }
})

describe('test', function () {
  it('single', async function () {
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => null
      }
    })).$mount();

    vm.toggleItem('a');
    vm.toggleItem('b');
    vm.toggleItem('c');
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual('c')
  })

  it('single, mandatory', async function () {
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => null
      },
      mandatory: {
        type: Boolean,
        default: true
      }
    })).$mount();

    vm.toggleItem('a');
    vm.toggleItem('a');
    //vm.toggleItem('c');
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual('a')
  })

  it('multiple', async function () {
    const vm = new Vue(testComp()).$mount();
    const arr = [{a: 1}, {a: 2}]
    vm.toggleItem(arr[0]);
    vm.toggleItem(arr[1]);
    vm.toggleItem(arr[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual([{a: 2}])
  })

  it('multiple, mandatory', async function () {
    const vm = new Vue(testComp({
      mandatory: {
        type: Boolean,
        default: true
      }
    })).$mount();
    const arr = [{a: 1}, {a: 2}]
    vm.toggleItem(arr[0]);
    //vm.toggleItem(arr[1]);
    vm.toggleItem(arr[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual([{a: 1}])
  })

  it('return only value, single, without init value', async function () {
    const arr = [{a: 1, b: 1}, {a: 2, b: 1}, {a: 3, b: 1}];
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => null
      },
      itemValue: {
        default: 'a',
        type: String
      },
      items: {
        default: () => arr,
        type: Array
      }
    })).$mount();

    vm.$on('input', value => vm.value = value)

    vm.toggleItem(arr[0]);
    //vm.toggleItem('b');
    //vm.toggleItem('c');
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.value).toEqual(1)
  })

  it('return only value, single , with init value', async function () {
    const arr = [{a: 1, b: 1}, {a: 2, b: 1}, {a: 3, b: 1}];
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => 2
      },
      itemValue: {
        default: 'a',
        type: String
      },
      items: {
        default: () => arr,
        type: Array
      }
    })).$mount();

    vm.$on('input', value => vm.value = value)

    vm.toggleItem(arr[0]);
    //vm.toggleItem('b');
    //vm.toggleItem('c');
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.value).toEqual(1)
  })

  it('return only value, multiple , without init value', async function () {
    const arr = [{a: 1, b: 1}, {a: 2, b: 1}, {a: 3, b: 1}];
    const vm = new Vue(testComp({
      multiple: {
        default: true,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => null
      },
      itemValue: {
        default: 'a',
        type: String
      },
      items: {
        default: () => arr,
        type: Array
      }
    })).$mount();

    vm.$on('input', value => vm.value = value)

    vm.toggleItem(arr[0]);
    //vm.toggleItem('b');
    //vm.toggleItem('c');
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.value).toEqual([1])
  })

  it('return only value, multiple , with init value', async function () {
    const arr = [{a: 1, b: 1}, {a: 2, b: 1}, {a: 3, b: 1}];
    const vm = new Vue(testComp({
      multiple: {
        default: true,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => 2
      },
      itemValue: {
        default: 'a',
        type: String
      },
      items: {
        default: () => arr,
        type: Array
      }
    })).$mount();

    vm.$on('input', value => vm.value = value)

    vm.toggleItem(arr[0]);
    //vm.toggleItem('b');
    //vm.toggleItem('c');
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.value).toEqual([2, 1])
  })

})
