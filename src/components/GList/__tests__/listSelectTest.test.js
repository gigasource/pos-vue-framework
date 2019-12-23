import { computed, reactive, ref } from "@vue/composition-api";
// testing
import Vue from "vue/dist/vue.common.js";
import { makeListSelectable } from "../groupableForList";
import _ from "lodash";
import GList from "../GList";

const testComp = props => ({
  template: "<div/>",
  props: Object.assign(
    {
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
        default: "",
        type: String
      },
      itemText: {
        default: "",
        type: String
      },
      returnObject: {
        default: true,
        type: Boolean
      },
      items: {
        type: Array,
        default: () => []
      }
    },
    props
  ),
  setup(props, context) {
    const { toggleItem, isActiveItem, internalValue } = makeListSelectable(
      props,
      context
    );

    return {
      internalValue,
      toggleItem,
      isActiveItem
    };
  }
});

describe("test", function() {
  it("single, returnObject", async function() {
    const items = [{ a: 1 }];
    const vm = new Vue(
      testComp({
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
      })
    ).$mount();
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.internalValue).toEqual({ a: 1 });
  });

  it("single, returnObject, no itemValue, mandatory", async function() {
    const items = [{ a: 1 }];
    const vm = new Vue(
      testComp({
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
      })
    ).$mount();

    vm.toggleItem(items[0]);
    vm.toggleItem(items[0]);
    //vm.toggleItem('c');
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.internalValue).toEqual({ a: 1 });
  });
  it("single, returnObject, no itemValue, with init value", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];
    const vm = new Vue(
      testComp({
        multiple: {
          default: false,
          type: Boolean
        },
        value: {
          type: [Array, Object, String, Number, Boolean],
          default: () => {
            return { a: 1 };
          }
        },
        itemText: {
          default: "a",
          type: String
        },
        items: {
          type: Array,
          default: () => items
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual({ a: 1 });
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.internalValue).toEqual(null);
  });
  it("single, returnObject,  with itemValue with init value", async function() {
    const items = [{ a: 1, b: 2 }, { a: 1, b: 2 }];
    const vm = new Vue(
      testComp({
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
          default: "a"
        },
        items: {
          type: Array,
          default: () => items
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual({ a: 1, b: 2 });
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.internalValue).toEqual(null);
  });
  it("single, returnObject,  with itemValue", async function() {
    const items = [{ a: 1, b: 2 }];
    const vm = new Vue(
      testComp({
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
          default: "a"
        },
        items: {
          type: Array,
          default: () => items
        }
      })
    ).$mount();
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.isActiveItem(items[0])).toEqual(true);
    expect(vm.internalValue).toEqual({ a: 1, b: 2 });
  });
  it("single, with itemValue", async function() {
    const items = [{ a: 1, b: 2 }, { a: 1, b: 1 }, { a: 1, b: 3 }];
    const vm = new Vue(
      testComp({
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
          default: "a"
        },
        items: {
          type: Array,
          default: () => items
        }
      })
    ).$mount();

    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.isActiveItem(items[0])).toEqual(true);
    expect(vm.internalValue).toEqual(1);
  });
  it("single, with itemValue and init value", async function() {
    const items = [{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 1, b: 3 }];
    const vm = new Vue(
      testComp({
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
          default: "a"
        },
        itemText: {
          type: String,
          default: "a"
        },
        items: {
          type: Array,
          default: () => items
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual(2);
    expect(vm.isActiveItem(items[1], 1)).toEqual(true);
    vm.toggleItem(items[0], 0);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.isActiveItem(items[0], 0)).toEqual(true);
  });
  it("single, no itemValue, no returnObject with init value ", async function() {
    const items = [{ a: 1, b: 2 }, { a: 1, b: 1 }, { a: 1, b: 3 }];
    const vm = new Vue(
      testComp({
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
          default: "b"
        },
        items: {
          type: Array,
          default: () => items
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual(0);
    //expect(vm.isActiveItem(items[0])).toEqual(true)

    vm.toggleItem(items[0]);
    vm.toggleItem(items[1]);
    (await vm.$nextTick()) && (await vm.$nextTick());

    expect(vm.internalValue).toEqual(1);
    expect(vm.isActiveItem(items[1])).toEqual(true);
  });
  it("single, primitive array", async function() {
    const items = ["f", 3, 5, 7];
    const vm = new Vue(
      testComp({
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
          default: () => "f"
        },
        itemValue: {
          type: String,
          default: ""
        },
        items: {
          type: Array,
          default: () => items
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual("f");
    expect(vm.isActiveItem(items[0])).toEqual(true);

    vm.toggleItem(items[0]);
    vm.toggleItem(items[1]);
    (await vm.$nextTick()) && (await vm.$nextTick());

    expect(vm.internalValue).toEqual(3);
    expect(vm.isActiveItem(items[1])).toEqual(true);
  });

  it("multiple, returnObject", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        itemText: {
          type: String,
          default: "a"
        },
        allowDuplicates: {
          default: false,
          type: Boolean
        }
      })
    ).$mount();
    vm.toggleItem(items[2]);
    vm.toggleItem(items[1]);
    vm.toggleItem(items[2]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.isActiveItem(items[0])).toEqual(false);
    // expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual([{ a: 2 }]);
  });
  it("multiple, returnObject with init value", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        itemText: {
          type: String,
          default: "a"
        },
        value: {
          type: [Array, Object, String, Number, Boolean],
          default: () => {
            return { a: 1 };
          }
        },
        allowDuplicates: {
          default: false,
          type: Boolean
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual([{ a: 1 }]);
    expect(vm.isActiveItem(items[0], 0)).toEqual(true);
    vm.toggleItem(items[0], 0);
    vm.toggleItem(items[1], 1);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.isActiveItem(items[0], 0)).toEqual(false);
    expect(vm.isActiveItem(items[1], 1)).toEqual(true);
    //expect(vm.internalValue).toEqual([ {a : 2}])
  });
  it("multiple, returnObject, allowDuplicates", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        itemText: {
          type: String,
          default: "a"
        },
        allowDuplicates: {
          default: true,
          type: Boolean
        }
      })
    ).$mount();
    vm.toggleItem(items[0]);
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.isActiveItem(items[0])).toEqual(true);
    expect(vm.isActiveItem(items[1])).toEqual(true);
    expect(vm.internalValue).toEqual([{ a: 1 }, { a: 2 }, { a: 1 }]);
  });
  it("multiple, returnObject, with itemValue, init value", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        itemText: {
          type: String,
          default: "a"
        },
        itemValue: {
          type: String,
          default: "a"
        },
        value: {
          type: [Array, Object, String, Number, Boolean],
          default: () => [1, 2]
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual([{ a: 1 }, { a: 2 }]);
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    vm.toggleItem(items[2]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.isActiveItem(items[0])).toEqual(false);
    expect(vm.isActiveItem(items[1])).toEqual(false);
    expect(vm.isActiveItem(items[2])).toEqual(true);
    expect(vm.internalValue).toEqual([{ a: 3 }]);
  });
  it("multiple,  itemValue", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        returnObject: {
          default: false,
          type: Boolean
        },
        itemValue: {
          type: String,
          default: "a"
        },
        itemText: {
          type: String,
          default: "a"
        },
        value: {
          type: [Array, Object, String, Number, Boolean],
          default: () => []
        }
      })
    ).$mount();

    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual([2]);
  });
  it("multiple,  itemValue, allowDuplicates", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        returnObject: {
          default: false,
          type: Boolean
        },
        allowDuplicates: {
          default: true,
          type: Boolean
        },
        itemValue: {
          type: String,
          default: "a"
        },
        value: {
          type: [Array, Object, String, Number, Boolean],
          default: () => []
        }
      })
    ).$mount();

    vm.toggleItem(items[1], 1);
    vm.toggleItem(items[0], 0);
    vm.toggleItem(items[0], 0);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.isActiveItem(items[0], 0)).toEqual(true);
    expect(vm.internalValue).toEqual([2, 1, 1]);
  });
  it("multiple,  itemValue with init value", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        returnObject: {
          default: false,
          type: Boolean
        },
        itemValue: {
          type: String,
          default: "a"
        },
        itemText: {
          type: String,
          default: "a"
        },
        value: {
          type: [Array, Object, String, Number, Boolean],
          default: () => [1, 2]
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual([1, 2]);
    expect(vm.isActiveItem(items[0])).toEqual(true);
    // //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    // expect(vm.isActiveItem(items[2], 2)).toEqual(false)
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual([1]);
  });
  it("multiple,  no itemValue no returnObject", async function() {
    const items = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        returnObject: {
          default: false,
          type: Boolean
        },
        itemValue: {
          type: String,
          default: ""
        },
        itemText: {
          type: String,
          default: "a"
        },
        value: {
          type: [Array, Object, String, Number, Boolean],
          default: () => [1, 2]
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual([1, 2]);
    expect(vm.isActiveItem(items[0])).toEqual(false);
    expect(vm.isActiveItem(items[1])).toEqual(true);
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual([2, 0]);
  });
  it("multiple,  primitive array", async function() {
    const items = ["a", "v", "g", "f"];
    const vm = new Vue(
      testComp({
        items: {
          type: Array,
          default: () => items
        },
        returnObject: {
          default: false,
          type: Boolean
        },
        itemValue: {
          type: String,
          default: ""
        },
        itemText: {
          type: String,
          default: ""
        },
        value: {
          type: [Array, Object, String, Number, Boolean],
          default: () => ["d", "a"]
        }
      })
    ).$mount();
    expect(vm.internalValue).toEqual(["d", "a"]);
    expect(vm.isActiveItem(items[0])).toEqual(true);
    expect(vm.isActiveItem(items[1])).toEqual(false);
    vm.toggleItem(items[1]);
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    //expect(vm.isActiveItem(items[1], 1)).toEqual(true)
    expect(vm.internalValue).toEqual(["d", "v"]);
  });

  //todo: multi layer component
  const testComp2 = props => ({
    template:
      '<g-list :items="items" :multiple="multiple" selectable :itemText="itemText" :itemValue="itemValue" :returnObject="returnObject" v-model="test"></g-list>',
    component: { GList },
    props: Object.assign(
      {
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
          default: "",
          type: String
        },
        itemText: {
          default: "",
          type: String
        },
        returnObject: {
          default: true,
          type: Boolean
        },
        items: {
          type: Array,
          default: () => []
        }
      },
      props
    ),
    setup(props, context) {
      const { toggleItem, isActiveItem, internalValue } = makeListSelectable(
        props,
        context
      );
      const test = ref();

      return {
        test,
        internalValue,
        toggleItem,
        isActiveItem
      };
    }
  });
  it("single, returnObject", async function() {
    const items = [{ a: 1 }];
    const test = ref(null);
    const vm = new Vue(
      testComp2({
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
        }
      })
    ).$mount();
    vm.toggleItem(items[0]);
    (await vm.$nextTick()) && (await vm.$nextTick());
    expect(vm.internalValue).toEqual({ a: 1 });
  });

  //process.env.NODE_ENV = 'test2';
  function log() {
    if (process.env.NODE_ENV === "test") console.log(arguments);
  }

  const parentVmFactory = attrs =>
    new Vue({
      components: {
        child: {
          props: {
            mandatory: Boolean,
            allowDuplicates: Boolean,
            multiple: Boolean,
            returnObject: Boolean,
            externalValueNormalize: null,
            filter: {
              type: Function
            },
            freeItemAllow: Boolean,
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
                  if (typeof this.items[0] === "object" && this.returnObject) {
                    return "objectArrayReturnObject";
                  }
                  if (typeof this.items[0] === "object") {
                    return "objectArrayReturnValue";
                  }
                  return "primitiveArray";
                } else {
                  if (this.isPrimitiveArray) return "primitiveArray";
                  if (this.returnObject) return "objectArrayReturnObject";
                  return "objectArrayReturnValue";
                }
              }
            },
            value: {
              type: null,
              default() {
                this.$on("input", val => (this.value = val));
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
            const itemTextFn = computed(() => {
              if (props.itemType === "primitiveArray") return i => i;
              return typeof props.itemText === "function"
                ? props.itemText
                : item => item[props.itemText];
            });

            const itemValueFn = computed(() => {
              if (props.itemType === "primitiveArray") return i => i;
              return typeof props.itemValue === "function"
                ? props.itemValue
                : item => item[props.itemValue];
            });

            const searchText = ref("");
            const searchFn = computed(() => {
              if (_.isEmpty(searchText)) return items => items;
              //todo: search logic
              return items => {
                if (props.filter) {
                  return items.filter(item => {
                    return props.filter(
                      itemTextFn.value(item),
                      searchText.value
                    );
                  });
                }
                const searchStartsWith = items.filter(item => {
                  return itemTextFn
                    .value(item)
                    .toString()
                    .toLowerCase()
                    .startsWith(searchText.value);
                });

                const searchIncludes = items
                  .filter(i => !searchStartsWith.includes(i))
                  .filter(item => {
                    return itemTextFn
                      .value(item)
                      .toString()
                      .toLowerCase()
                      .includes(searchText.value);
                  });

                return searchStartsWith.concat(searchIncludes);
              };
            });

            //props.value = 1;
            //todo : filterByValue
            const valueNormalize = computed(() => {
              let convert;
              if (props.itemType !== "objectArrayReturnValue") {
                convert = function convert(val) {
                  return props.items.find(item => {
                    if (props.itemType === "primitiveArray") {
                      return _.isEqual(item, val);
                    }
                    const _val = _.clone(_.omit(val, ["elm", "isRootInsert"]));
                    const _item = _.clone(
                      _.omit(item, ["elm", "isRootInsert"])
                    );
                    return _.isEqual(_item, _val);
                  });
                };
              } else {
                // [{a: 1}, {a: 2}]
                // 1
                convert = function convert(val) {
                  return props.items.find(
                    item => itemValueFn.value(item) === val
                  );
                };
              }

              //in case combobox
              let _convert = convert;
              if (props.freeItemAllow) {
                //todo: test
                _convert = function(value) {
                  const _valueNormalize = convert(value);
                  if (_valueNormalize) return _valueNormalize;
                  if (props.itemType !== "objectArrayReturnValue") return value;
                  if (typeof props.itemValue === "string")
                    return { [props.itemValue]: value };
                  //2.arg: reverse
                  return props.itemValue(value, true);
                };
              }

              let result;
              if (props.multiple) {
                result = props.value.map(_convert);
              } else {
                result = _convert(props.value);
              }
              log("valueNormalize = ", result);
              context.emit("update:externalValueNormalize", result);
              return result;
            });

            const convertNormalizeToReal = computed(() => {
              if (props.itemType !== "objectArrayReturnValue") {
                return item => item;
              }
              return itemValueFn.value;
            });

            const filterByValue = computed(() => {
              if (props.allowDuplicates) return () => true;
              if (!props.multiple) {
                return item => valueNormalize.value !== item;
              }
              return item => !valueNormalize.value.includes(item);
            });

            const selectList = computed(() => {
              return searchFn.value(props.items.filter(filterByValue.value));
            });

            function emitValue(val) {
              log("emit value: ", JSON.stringify(val));
              context.emit("input", val);
            }

            function toggle(item) {
              if (!props.multiple) {
                if (valueNormalize.value === item) {
                  if (!props.mandatory) {
                    return emitValue(undefined);
                  }
                }

                return emitValue(convertNormalizeToReal.value(item));
              }

              //multiple
              if (
                valueNormalize.value.includes(item) &&
                !props.allowDuplicates
              ) {
                let _value = [...valueNormalize.value];
                if (props.mandatory && _value.length === 1) {
                } else {
                  _value.splice(_value.indexOf(item), 1);
                  return emitValue(_value);
                }
              } else {
                return emitValue(
                  [...valueNormalize.value, item].map(
                    convertNormalizeToReal.value
                  )
                );
              }
            }

            return {
              valueNormalize,
              filterByValue,
              selectList,
              toggle,
              searchText,
              searchFn
            };
          }
        }
      },
      data() {
        return {
          externalValueNormalize: null,
          ...attrs
        };
      },
      render(h) {
        //return <child vModel={this.parentValue}/>
        return (
          <child
            {...{
              props: this.$data,
              on: {
                "update:externalValueNormalize": val => {
                  log("update:externalValueNormalize");
                  this.externalValueNormalize = val;
                }
              }
            }}
            ref={"child"}
            vOn:input={val => (this.value = val)}
          />
        );
      },
      mounted() {
        this.child = this.$refs.child;
      }
    }).$mount();
  //new test
  function expectJson(obj) {
    return expect(JSON.stringify(obj));
  }
  it("value normalize in case object array single", async function() {
    const parentVm = parentVmFactory({
      itemText: "value",
      value: 2,
      items: [{ value: 1 }, { value: 2 }]
    });

    expect(parentVm.child.valueNormalize).toBe({ value: 2 });

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
      ]
    `);

    expect(parentVm.child.filterByValue.toString()).toMatchInlineSnapshot(
      `"item => valueNormalize.value !== item"`
    );
  });
  it("value normalize in case object array init obj single", async function() {
    const parentVm = parentVmFactory({
      itemValue: "value",
      value: { value: 1 },
      items: [{ value: 1 }, { value: 2 }]
    });

    expect(parentVm.child.valueNormalize).toBe({ value: 2 });

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 2,
        },
      ]
    `);

    expect(parentVm.child.filterByValue.toString()).toMatchInlineSnapshot(
      `"item => valueNormalize.value !== item"`
    );
  });

  it("value normalize in case object array multiple", async function() {
    const parentVm = parentVmFactory({
      itemText: "text",
      value: [1, 2],
      items: [{ value: 1 }, { value: 2 }],
      multiple: true
    });

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 2,
        },
      ]
    `);
  });

  it("value normalize in case object array returnObject single", async function() {
    const parentVm = parentVmFactory({
      itemText: "text",
      value: { value: 2 },
      items: [{ value: 1 }, { value: 2 }],
      returnObject: true
      //multiple: true
    });

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Object {
        "value": 2,
      }
    `);

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
      ]
    `);
  });

  it("value normalize in case object array returnObject multiple", async function() {
    const parentVm = parentVmFactory({
      itemText: "text",
      value: [{ value: 1 }, { value: 2 }],
      items: [{ value: 1 }, { value: 2 }, { value: 3 }],
      returnObject: true,
      allowDuplicates: true,
      multiple: true
    });

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 2,
        },
      ]
    `);

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 2,
        },
        Object {
          "value": 3,
        },
      ]
    `);
  });

  it("toggle in case object array returnObject single", async function() {
    const parentVm = parentVmFactory({
      itemText: "value",
      value: { value: 1 },
      items: [{ value: 1 }, { value: 2 }, { value: 3 }],
      returnObject: true
    });

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Object {
        "value": 1,
      }
    `);
    parentVm.child.toggle(parentVm.child.items[0]);


    await parentVm.$nextTick();
    await parentVm.$nextTick();

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`undefined`);

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 2,
        },
        Object {
          "value": 3,
        },
      ]
    `);
  });

  it("toggle in case object array returnValue single", async function() {
    const parentVm = parentVmFactory({
      itemText: "text",
      value: 1,
      items: [{ value: 1 }, { value: 2 }, { value: 3 }]
      //returnObject: false
    });

    parentVm.child.toggle(parentVm.child.items[1]);

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Object {
        "value": 1,
      }
    `);

    await parentVm.$nextTick();
    await parentVm.$nextTick();

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Object {
        "value": 2,
      }
    `);

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 3,
        },
      ]
    `);
  });

  it("toggle in case object array returnValue multiple", async function() {
    const parentVm = parentVmFactory({
      itemText: "text",
      //multiple: true,
      value: 1,
      items: [{ value: 1 }, { value: 2 }, { value: 3 }]
      //mandatory: true
      //returnObject: false
    });

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Object {
        "value": 1,
      }
    `);

    parentVm.child.toggle(parentVm.child.items[0]);

    await parentVm.$nextTick();
    await parentVm.$nextTick();

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`undefined`);

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 2,
        },
        Object {
          "value": 3,
        },
      ]
    `);
  });

  it("toggle in case object array returnValue multiple allowDuplicates", async function() {
    const parentVm = parentVmFactory({
      itemText: "text",
      multiple: true,
      value: [1, 1],
      items: [{ value: 1 }, { value: 2 }, { value: 3 }],
      allowDuplicates: true
      //returnObject: false
    });

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 1,
        },
      ]
    `);

    parentVm.child.toggle(parentVm.child.items[0]);

    await parentVm.$nextTick();
    await parentVm.$nextTick();

    expect(parentVm.child.value).toMatchInlineSnapshot(`
      Array [
        1,
        1,
        1,
      ]
    `);

    expect(parentVm.child.valueNormalize).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 1,
        },
        Object {
          "value": 1,
        },
      ]
    `);

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        Object {
          "value": 1,
        },
        Object {
          "value": 2,
        },
        Object {
          "value": 3,
        },
      ]
    `);
  });

  it("search in case object array returnValue multiple allowDuplicates", async function() {
    const parentVm = parentVmFactory({
      itemText: "text",
      //value: [1, 1],
      //filter: (text, searchText) => text.endsWith(`t${searchText}`),
      value: "_test1",
      items: ["_test1", "test2", "test3"]
      //returnObject: false
    });

    parentVm.child.searchText = "te";

    await parentVm.$nextTick();
    await parentVm.$nextTick();
    console.log("expect");

    expect(parentVm.child.searchFn(parentVm.child.items))
      .toMatchInlineSnapshot(`
      Array [
        "test2",
        "test3",
        "_test1",
      ]
    `);

    expect(parentVm.child.selectList).toMatchInlineSnapshot(`
      Array [
        "test2",
        "test3",
      ]
    `);

    expect(parentVm.externalValueNormalize).toMatchInlineSnapshot(`"_test1"`);
  });
});
