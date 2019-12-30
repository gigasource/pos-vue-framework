
<script>
  import { reactive , computed} from '@vue/composition-api';
  import { getSelection3, makeListSelectable2 } from '../GList/listSelectFactory';
  import SelectableComponent from '../GCombobox/SelectableComponent';

  export default {
    name: 'NewSelect',
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
        default: () => ({
          closeOnClick: true,
          closeOnContentClick: false,
          maxHeight: 300,
          offsetY: true,
          offsetOverflow: true,
          top: false,
        })
      },
      eager: Boolean,
      //item textfieldValue props
      chips: Boolean,
      smallChips: Boolean,
      deletableChips: Boolean,
      items: Array,
      itemText: [String, Function, Array],
      itemValue: [String, Function, Array],
      value: null,
      genTextFieldFn: Function,
      genListFn: Function,
      appendIcon: {
        type: String,
        default: ''
      },
      appendSvg: Boolean,
      required: Boolean,
      returnObject: Boolean,
    },
    setup: function (props, context) {
      function genSelect(){
        return <selectable-component {...{
          props:{
            ...props,
            value: props.value,
            component: 'select',
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
        genSelect
			}
    },
		render(){
      return this.genSelect()
		}
  }
</script>
<style scoped lang="scss">
	.select::v-deep {
		span {
			margin: 3px
		}

		.g-tf-append__inner .g-icon:last-child {
			transition: transform 0.4s;
		}

		input {
			flex-shrink: 1;
			flex-basis: 0;
		}

		.input {
			display: flex;
		}
	}

	.select__active::v-deep {
		.g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
		}
	}
</style>
