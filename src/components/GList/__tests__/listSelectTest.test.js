import {computed, reactive, ref} from '@vue/composition-api';
// testing
import Vue from 'vue/dist/vue.common.js'
import {makeListSelectable} from "../groupableForList";
import _ from 'lodash'
import GList from "../GList";

const testComp = (props) => ({
  template: '<div/>',
  props: Object.assign({
    multiple: {
      default: true,
      type: Boolean
    },
    mandatory: Boolean,
    allowDuplicates: Boolean,
    value: {
      type: [Array, Object, String, Number, Boolean],
      default: () => null
    },
    itemValue: {
      default: '',
      type: String
    },
    itemText: {
      default: '',
      type: String
    },
    returnObject: {
      default: true,
      type: Boolean,
    },
    items: {
      type: Array,
      default: () => []
    }
  }, props),
  setup(props, context) {
    const {toggleItem, isActiveItem, internalValue} = makeListSelectable(props, context);

    return {
      internalValue,
      toggleItem,
      isActiveItem
    }
  }
})

describe('test', function () {
  it('single, returnObject', async function () {
    const items = [{a: 1}]
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => null
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual({a: 1})
  })

  it('single, returnObject, no itemValue, mandatory', async function () {
    const items = [{a: 1}]
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
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();

    vm.toggleItem(items[0]);
    vm.toggleItem(items[0]);
    //vm.toggleItem('c');
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual({a: 1})
  })
  it('single, returnObject, no itemValue, with init value', async function () {
    const items = [{a: 1}, {a: 2}, {a: 3}, {a: 1}]
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => {
          return {a: 1}
        }
      },
      itemText: {
        default: 'a',
        type: String
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();
    expect(vm.internalValue).toEqual({a: 1})
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual(null)
  })
  it('single, returnObject,  with itemValue with init value', async function () {
    const items = [{a: 1, b: 2}, {a: 1, b: 2}]
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => 1
      },
      itemValue: {
        type: String,
        default: 'a'
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();
    expect(vm.internalValue).toEqual({a: 1, b: 2})
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual(null)
  })
  it('single, returnObject,  with itemValue', async function () {
    const items = [{a: 1, b: 2}]
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
        type: String,
        default: 'a'
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.isActiveItem(items[0])).toEqual(true)
    expect(vm.internalValue).toEqual({a: 1, b: 2})
  })
  it('single, with itemValue', async function () {
    const items = [{a: 1, b: 2}, {a: 1, b: 1}, {a: 1, b: 3}]
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      returnObject: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => null
      },
      itemValue: {
        type: String,
        default: 'a'
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();

    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.isActiveItem(items[0])).toEqual(true)
    expect(vm.internalValue).toEqual(1)
  })
  it('single, with itemValue and init value', async function () {
    const items = [{a: 1, b: 2}, {a: 2, b: 1}, {a: 1, b: 3}]
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      returnObject: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => 2
      },
      itemValue: {
        type: String,
        default: 'a'
      },
      itemText: {
        type: String,
        default: 'a'
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();
    expect(vm.internalValue).toEqual(2)
    expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    vm.toggleItem(items[0], 0);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.isActiveItem(items[0], 0)).toEqual(true)

  })
  it('single, no itemValue, no returnObject with init value ', async function () {
    const items = [{a: 1, b: 2}, {a: 1, b: 1}, {a: 1, b: 3}]
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      returnObject: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => 0
      },
      itemText: {
        type: String,
        default: 'b'
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();
    expect(vm.internalValue).toEqual(0)
    //expect(vm.isActiveItem(items[0])).toEqual(true)

    vm.toggleItem(items[0]);
    vm.toggleItem(items[1]);
    await vm.$nextTick() && await vm.$nextTick();

    expect(vm.internalValue).toEqual(1)
    expect(vm.isActiveItem(items[1])).toEqual(true)

  })
  it('single, primitive array', async function () {
    const items = ['f', 3, 5, 7]
    const vm = new Vue(testComp({
      multiple: {
        default: false,
        type: Boolean
      },
      returnObject: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => 'f'
      },
      itemValue: {
        type: String,
        default: ''
      },
      items: {
        type: Array,
        default: () => items
      }
    })).$mount();
    expect(vm.internalValue).toEqual('f')
    expect(vm.isActiveItem(items[0])).toEqual(true)

    vm.toggleItem(items[0]);
    vm.toggleItem(items[1]);
    await vm.$nextTick() && await vm.$nextTick();

    expect(vm.internalValue).toEqual(3)
    expect(vm.isActiveItem(items[1])).toEqual(true)

  })


  it('multiple, returnObject', async function () {
    const items = [{a: 1}, {a: 2}, {a: 3}]
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          itemText: {
            type: String,
            default: 'a'
          },
          allowDuplicates: {
            default: false,
            type: Boolean,
          },
        }
    )).$mount();
    vm.toggleItem(items[2]);
    vm.toggleItem(items[1]);
    vm.toggleItem(items[2]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.isActiveItem(items[0])).toEqual(false)
    // expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual([{a: 2}])
  })
  it('multiple, returnObject with init value', async function () {
    const items = [{a: 1}, {a: 2}, {a: 3}]
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          itemText: {
            type: String,
            default: 'a'
          },
          value: {
            type: [Array, Object, String, Number, Boolean],
            default: () => {
              return {a: 1}
            }
          },
          allowDuplicates: {
            default: false,
            type: Boolean,
          },
        }
    )).$mount();
    expect(vm.internalValue).toEqual([{a: 1}])
    expect(vm.isActiveItem(items[0], 0)).toEqual(true)
    vm.toggleItem(items[0], 0);
    vm.toggleItem(items[1], 1);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.isActiveItem(items[0], 0)).toEqual(false)
    expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    //expect(vm.internalValue).toEqual([ {a : 2}])
  })
  it('multiple, returnObject, allowDuplicates', async function () {
    const items = [{a: 1}, {a: 2}, {a: 3}]
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          itemText: {
            type: String,
            default: 'a'
          },
          allowDuplicates: {
            default: true,
            type: Boolean,
          },
        }
    )).$mount();
    vm.toggleItem(items[0]);
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.isActiveItem(items[0])).toEqual(true)
    expect(vm.isActiveItem(items[1])).toEqual(true)
    expect(vm.internalValue).toEqual([{a: 1}, {a: 2}, {a: 1}])
  })
  it('multiple, returnObject, with itemValue, init value', async function () {
    const items = [{a: 1}, {a: 2}, {a: 3}]
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          itemText: {
            type: String,
            default: 'a'
          },
          itemValue: {
            type: String,
            default: 'a'
          },
          value: {
            type: [Array, Object, String, Number, Boolean],
            default: () => [1, 2]
          },
        }
    )).$mount();
    expect(vm.internalValue).toEqual([{a: 1}, {a: 2}])
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    vm.toggleItem(items[2]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.isActiveItem(items[0])).toEqual(false)
    expect(vm.isActiveItem(items[1])).toEqual(false)
    expect(vm.isActiveItem(items[2])).toEqual(true)
    expect(vm.internalValue).toEqual([{a: 3}])
  })
  it('multiple,  itemValue', async function () {
    const items = [{a: 1}, {a: 2}, {a: 3}]
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          returnObject: {
            default: false,
            type: Boolean,
          },
          itemValue: {
            type: String,
            default: 'a'
          },
          itemText: {
            type: String,
            default: 'a'
          },
          value: {
            type: [Array, Object, String, Number, Boolean],
            default: () => []
          },
        }
    )).$mount();

    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual([2])
  })
  it('multiple,  itemValue, allowDuplicates', async function () {
    const items = [{a: 1}, {a: 2}, {a: 3}]
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          returnObject: {
            default: false,
            type: Boolean,
          },
          allowDuplicates: {
            default: true,
            type: Boolean,
          },
          itemValue: {
            type: String,
            default: 'a'
          },
          value: {
            type: [Array, Object, String, Number, Boolean],
            default: () => []
          },
        }
    )).$mount();

    vm.toggleItem(items[1], 1);
    vm.toggleItem(items[0], 0);
    vm.toggleItem(items[0], 0);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.isActiveItem(items[0], 0)).toEqual(true)
    expect(vm.internalValue).toEqual([2, 1, 1])
  })
  it('multiple,  itemValue with init value', async function () {
    const items = [{a: 1}, {a: 2}, {a: 2}, {a: 3}]
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          returnObject: {
            default: false,
            type: Boolean,
          },
          itemValue: {
            type: String,
            default: 'a'
          },
          itemText: {
            type: String,
            default: 'a'
          },
          value: {
            type: [Array, Object, String, Number, Boolean],
            default: () => [1, 2]
          },
        }
    )).$mount();
    expect(vm.internalValue).toEqual([1, 2])
    expect(vm.isActiveItem(items[0])).toEqual(true)
    // //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    // expect(vm.isActiveItem(items[2], 2)).toEqual(false)
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual([1])
  })
  it('multiple,  no itemValue no returnObject', async function () {
    const items = [{a: 1}, {a: 2}, {a: 2}, {a: 3}]
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          returnObject: {
            default: false,
            type: Boolean,
          },
          itemValue: {
            type: String,
            default: ''
          },
          itemText: {
            type: String,
            default: 'a'
          },
          value: {
            type: [Array, Object, String, Number, Boolean],
            default: () => [1, 2]
          },
        }
    )).$mount();
    expect(vm.internalValue).toEqual([1, 2])
    expect(vm.isActiveItem(items[0])).toEqual(false)
    expect(vm.isActiveItem(items[1])).toEqual(true)
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual([2, 0])
  })
  it('multiple,  primitive array', async function () {
    const items = ['a', 'v', 'g', 'f']
    const vm = new Vue(testComp({
          items: {
            type: Array,
            default: () => items
          },
          returnObject: {
            default: false,
            type: Boolean,
          },
          itemValue: {
            type: String,
            default: ''
          },
          itemText: {
            type: String,
            default: ''
          },
          value: {
            type: [Array, Object, String, Number, Boolean],
            default: () => ['d','a']
          },
        }
    )).$mount();
    expect(vm.internalValue).toEqual(['d','a'])
    expect(vm.isActiveItem(items[0])).toEqual(true)
    expect(vm.isActiveItem(items[1])).toEqual(false)
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual(['d','v'])
  })

//todo: multi layer component
  const testComp2 = (props) => ({
    template: '<g-list :items="items" :multiple="multiple" selectable :itemText="itemText" :itemValue="itemValue" :returnObject="returnObject" v-model="test"></g-list>',
    component: {GList},
    props: Object.assign({
      multiple: {
        default: true,
        type: Boolean
      },
      mandatory: Boolean,
      allowDuplicates: Boolean,
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => null
      },
      itemValue: {
        default: '',
        type: String
      },
      itemText: {
        default: '',
        type: String
      },
      returnObject: {
        default: true,
        type: Boolean,
      },
      items: {
        type: Array,
        default: () => []
      }
    }, props),
    setup(props, context) {
      const {toggleItem, isActiveItem, internalValue} = makeListSelectable(props, context);
      const test = ref()

      return {
        test,
        internalValue,
        toggleItem,
        isActiveItem
      }
    }
  })
  it('single, returnObject', async function () {
    const items = [{a: 1}]
    const test = ref(null)
    const vm = new Vue(testComp2({
      multiple: {
        default: false,
        type: Boolean
      },
      value: {
        type: [Array, Object, String, Number, Boolean],
        default: () => test
      },
      items: {
        type: Array,
        default: () => items
      },
    },
        )).$mount();
    vm.toggleItem(items[0]);
    await vm.$nextTick() && await vm.$nextTick();
    expect(vm.internalValue).toEqual({a: 1})
  })


})
