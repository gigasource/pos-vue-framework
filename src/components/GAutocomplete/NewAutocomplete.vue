
<script>
  import SelectableComponent from '../GCombobox/SelectableComponent';
  export default {
    name: 'NewAutocomplete',
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
      items: { type: Array, default: () => [] },
      itemText: {
        type: String,
        default: 'text'
      },
      itemValue: {
        type: String,
      },
      value: null,
      filter: Function,
      noFilter: Boolean,
      returnObject: Boolean,
    },
    setup: function (props, context) {
      function genAutoComplete(){
        return <selectable-component {...{
          props:{
            ...props,
            value: props.value,
            component: 'autocomplete',
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
        genAutoComplete
			}
    },
		render() {
      return this.genAutoComplete()
		}
  }
</script>
<style scoped lang="scss" >
	.autocomplete ::v-deep {
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

	.autocomplete__active {
		::v-deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
		}
	}
</style>
