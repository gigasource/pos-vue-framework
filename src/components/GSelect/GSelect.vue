<script>
  import GTextField from "../GInput/GTextField";
  import GMenu from "../GMenu/GMenu"
  import {computed, reactive, ref} from "@vue/composition-api";
  import {getList, getSelections} from "./GSelectFactory";
  import GChip from "../GChip/GChip";
  import GIcon from "../GIcon/GIcon";
  import GList from "../GList/GList";
  import _ from "lodash"
  import GListItem from "../GList/GListItem";
  import {GListItemContent, GListItemText} from "../GList/GListFunctionalComponent";
  import {keyCodes} from "../../utils/helpers";
  import {makeListSelectable} from "../GList/groupableForList";

  export default {
    name: "GSelect",
    components: {GListItem, GList, GIcon, GChip, GTextField, GMenu, GListItemContent, GListItemText},
    props: {
      //select props
      width: [String, Number],
      //text field's props
      ...{
        //textfield style
        ...{
          filled: Boolean,
          solo: Boolean,
          outlined: Boolean,
          flat: Boolean,
          rounded: Boolean,
          shaped: Boolean
        },
        //textfield parts
        clearable: Boolean,
        hint: String,
        persistent: Boolean,
        counter: {
          type: [Boolean, Number, String],
          default: false
        },
        placeholder: String,
        label: String,
        prefix: String,
        suffix: String,
        rules: Array,
        type: {
          type: String,
          default: 'text'
        }
      },

      //list props
      searchable: Boolean,
      multiple: Boolean,
      allowDuplicates: Boolean,
      //menu props
      menuProps: {
        type: Object,
        default: () => ({})
      },
      eager: Boolean,
      //item textfieldValue props
      chips: Boolean,
      smallChips: Boolean,
      deletableChips: Boolean,
      items: Array,
      itemText: {
        type: String,
        default: ''
      },
      itemValue: {
        type: String,
        default: ''
      },
      value: null,
      genTextFieldFn: Function,
      genListFn: Function,
      showSearchField: {
        type: Boolean,
        default: true
      },
      appendIcon: {
        type: String,
        default: 'arrow_drop_down'
      },
      appendSvg: Boolean,
      required: Boolean,
      returnObject: Boolean,
    },
    setup: function (props, context) {
      function createItemFn(prop) {
        return typeof prop === 'function'
            ? prop
            : item => {
              if (!_.isObject(item)) return item

              if (_.isArray(prop)) {
                const key = prop.find(Object.keys(item).includes)
                return item[key]
              } else {
                return item[prop]
              }
            }
      }

      const itemTextFn = computed(() => createItemFn(props.itemText))
      const itemValueFn = computed(() => createItemFn(props.itemValue))

      const state = reactive({
        searchText: '',
        fieldItem: null
      })
      //list selections

      const {internalValue: selectedValue} = makeListSelectable(props, context)

      const fieldItem = getSelections(props, selectedValue)
      const selectionTexts = computed(() => {
        if (props.multiple) {
          return fieldItem.value.map(item => {
            return item ? (itemTextFn.value(item) || itemValueFn.value(item) || item) : ''
          })
        }
        return fieldItem.value || fieldItem.value === 0 ? itemTextFn.value(fieldItem.value) ||
            itemValueFn.value(fieldItem.value) ||
            fieldItem.value.toString() : ''
      })

      //gen SearchText
      const searchFocused = ref(false)
      const onInputClick = () => {
        searchFocused.value = true
      }

      function genSearchTextField() {
        if (props.searchable && props.showSearchField) {
          return <GTextField placeholder="Search"
                             vOn:input={e => state.searchText = e}
                             value={state.searchText}
                             clearable
                             ref="searchText"
                             autofocus={searchFocused.value}
                             vOn:keydown={(e) => onInputKeyDown(e)}
                             style="margin-bottom: 0; background-color: transparent"/>
        }
      }

      //genList

      const showOptions = ref(false)
      const options = getList(props, selectedValue, state)
      const genList = (typeof props.genListFn === 'function' && props.genListFn)
          || function (showOptions) {
            return <GList
                {...{
                  props: {
                    items: options.value,
                    itemText: props.itemText,
                    itemValue: props.itemValue,
                    returnObject: props.returnObject,
                    mandatory: true,
                    allowDuplicates: props.allowDuplicates,
                    multiple: props.multiple,
                    inMenu: true,
                    selectable: true,
                    value: selectedValue.value,
                  },
                  on: {
                    'click:item': () => showOptions.value = props.multiple,
                    input: e => selectedValue.value = e,
                  },
                  scopedSlots: {
                    content: () => context.slots.item && context.slots.item()
                  }
                }}
                ref="list"
            />
          }


      //gen Text field
      function onInputKeyDown(e) {
        if (e.keyCode === keyCodes.down) {
          context.refs.list.$el.getElementsByClassName('g-list-item')[0].focus()
        }
      }

      function onChipCloseClick(index = null) {
        if (props.multiple) {
          selectedValue.value.splice(index, 1);
        } else {
          selectedValue.value = null
        }
      }

      const deleteItemColor = ref('#1d1d1d')
      const genMultiSelectionsSlot = () => {
        if (props.chips || props.allowDuplicates) {
          return selectionTexts.value.map((item, index) => <GChip small={props.smallChips}
                                                                  close={props.deletableChips}
                                                                  vOn:close={() => onChipCloseClick(index)}>{item}
          </GChip>)
        }
        return selectionTexts.value.map(function (item, index) {
          if (index === selectionTexts.value.length - 1) return <div
              style={{'color': deleteItemColor.value, 'padding-right': '5px'}}>{item}</div>
          return <div style={{'padding-right': '5px'}}>{item + ', '} </div>
        })
      }

      const genSingleSelectionSlot = () => {
        if (props.chips && selectionTexts.value) {
          return <GChip small={props.smallChips}
                        close={props.deletableChips}
                        vOn:close={() => onChipCloseClick()}>{selectionTexts.value}</GChip>
        }
        return selectionTexts.value
      }
      const getTextFieldScopedSlots = {
        'append-inner': ({iconColor}) =>
            <GIcon color={iconColor} svg={props.appendSvg}>{props.appendIcon}</GIcon>,
        'input-slot': ({inputErrStyles}) =>
            <div class="g-tf-input selections" style={[{'color': '#1d1d1d'}, inputErrStyles]}>
              {selectionTexts.value.length === 0 ?
                  <div style="color : rgba(0, 0, 0, 0.32)">{props.placeholder}</div> : null}
              {props.multiple ? genMultiSelectionsSlot() : genSingleSelectionSlot()}
            </div>
      }

      function clearSelection() {
        selectedValue.value = props.multiple ? [] : ''
        state.searchText = ''
      }

      const tfValue = computed(() => {
        if (props.multiple) return selectionTexts.value.join(', ')
        return selectionTexts.value
      })

      const genTextField = (typeof props.genTextFieldFn === 'function' && props.genTextFieldFn) || function (toggleContent) {
        return (
            <GTextField
                {...{
                  props: {
                    ..._.pick(props, ['filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
                      'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
                      'rules', 'type', 'disabled', 'readOnly', 'required']),
                    value: tfValue.value
                  },
                  on: {
                    'click:clearIcon': () => clearSelection(),
                    click: [toggleContent, onInputClick],
                    keydown: (e) => {
                      onInputKeyDown(e)
                    },
                  },
                  scopedSlots: {...getTextFieldScopedSlots}
                }}
            />
        )
      }

      //gen menu
      function genMenu(showOptions) {
        const nudgeBottom = computed(() => !!props.hint ? '22px' : '2px')

        const defaultMenuProps = {
          closeOnClick: true,
          closeOnContentClick: false,
          maxHeight: 300,
          offsetY: true,
          offsetOverflow: true,
          top: false,
        }

        return <g-menu {...{
          props: {
            ...Object.assign(defaultMenuProps, props.menuProps),
            nudgeBottom: nudgeBottom.value,
            value: showOptions.value,
            eager: props.eager,
          },
          scopedSlots: {
            activator: ({toggleContent}) => genTextField(toggleContent)
          },
          on: {
            input: e => showOptions.value = e,
          }
        }}
        >
          <template slot="default">
            {genSearchTextField()}
            {context.slots['prepend-item'] && context.slots['prepend-item']()}
            {genList(showOptions)}
            {context.slots['append-item'] && context.slots['append-item']()}
          </template>
        </g-menu>
      }

      function genSelect() {
        return <div class={{"g-select ": true, 'g-select__active': showOptions.value}}>
          {genMenu(showOptions)}
        </div>
      }

      return {
        genSelect,
        options,
        state,
        selectedValue,
        selectionTexts,
        showOptions,
        fieldItem
      }
    },
    render() {
      return this.genSelect()
    }
  }
</script>
<style scoped lang="scss">
  .g-select::v-deep {
    span {
      margin: 3px
    }

    .g-tf-append__inner .g-icon:last-child {
      transition: transform 0.4s;
    }

    .g-tf-input {
      display: flex;
    }

    .input {
      display: flex;
    }

    input {
      flex-shrink: 1;
      flex-grow: 1;
      flex-basis: 0;
    }

  }

  .g-select__active::v-deep {
    .g-tf-append__inner .g-icon:last-child {
      transition: transform 0.4s;
      transform: rotateZ(180deg);
    }
  }

</style>
