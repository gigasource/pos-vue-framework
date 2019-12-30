
<script>
  import SelectableComponent from './SelectableComponent';
  import {ref} from '@vue/composition-api'
  import { getInternalValue } from '../../utils/helpers';
  export default {
    name: 'NewCombobox',
    components: { SelectableComponent },
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
          shaped: Boolean,
          dense: Boolean
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
        appendIcon: String,
        prependIcon: String,
        prependInnerIcon: String,
        appendInnerIcon: String,
        clearIcon: {
          type: String,
          default: 'clear'
        },
        clearIconColor: String,
        rules: Array,
        type: {
          type: String,
          default: 'text'
        }

      },

      //list props
      searchable: {
        type: Boolean,
        default: true
      },
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
      items: {
        type: Array,
        default: () => []
      },
      itemText: {
        type: [String, Array, Function],
        default: 'text'
      },
      itemValue: {
        type: [String, Array, Function],
        default: 'value'
      },
      value: null,
      returnObject: Boolean,
      searchText: String,
    },
    setup: function (props, context) {

      function genCombobox(){
				return <selectable-component {...{
				  props:{
				    ...props,
						value: props.value,
						component: 'combobox',
          },
					on:{
				    input: (e) => {
							context.emit('input', e)
				    }
          },
					scopedSlots:{
				    'no-data': () => context.slots['no-data'] && context.slots['no-data']()
          }
				}}
				/>
			}

      return {
        genCombobox
			}
    },
		render(){
      return this.genCombobox()
		}
  }
</script>
<style scoped lang="scss" >
	.combobox ::v-deep {
		span {
			margin: 3px
		}

		.g-tf-append__inner .g-icon:last-child {
			transition: transform 0.4s;
		}

		.input {
			display: flex;
			flex-wrap: wrap;
		}

		.g-tf-input {
			flex-wrap: wrap;
			display: flex;
			flex: 1;
		}

		input {
			flex-shrink: 0;
			flex-basis: auto;
			cursor: text;
		}
	}

	.combobox__active {
		::v-deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
		}
	}
</style>
