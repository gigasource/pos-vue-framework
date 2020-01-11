<script>
  import GTextField from '../GInput/GTextField';
  import GRow from '../GLayout/GRow'
  import { ref } from '@vue/composition-api';

  export default {
    name: 'GCssCustomizerInputGroup',
    components: { GTextField, GRow },
    props: {
      width: String,
      prepend: String,
      value: {
        type: Array,
        default() {
          return []
        }
      }
    },
    setup: function (props, context) {
      const internalValue = ref(props.value)
      const emitValue = (val, index) => {
        internalValue.value[index] = parseInt(val) || val
        context.emit('input', internalValue)

      }
      const genInputGroup = () => <g-row style={{ width: props.width }}>
        {props.value.map((item, index) => <g-text-field svg={true} value={item} prependInnerIcon={index === 0 ? props.prepend : null}
                                                        vOn:change={value => emitValue(value, index)}
                                                        vOn:input={value => emitValue(value, index)}
                                                        vOn:click={() => context.emit('click', index)}
          />
        )}
      </g-row>

      return {
        genInputGroup
      }
    },
    render() {
      return this.genInputGroup()
    }
  }
</script>
<style scoped lang="scss">

	.g-row::v-deep {
		flex-wrap: nowrap;

		.g-tf-wrapper {
			width: auto;
			padding: 2px 1px 2px 1px;
		}

		.g-tf-wrapper:first-child {
			padding: 2px 1px 2px 2px;
		}

		.g-tf-wrapper:last-child {
			padding: 2px 2px 2px 1px;
		}

		&:hover {
			.g-tf-wrapper {
				padding: 1px 0.5px 1px 0.5px;
				border-top: 1px solid #BDBDBD;;
				border-bottom: 1px solid #BDBDBD;;
				border-right: 0.5px solid #BDBDBD;
				border-left: 0.5px solid #BDBDBD;
			}

			.g-tf-wrapper:first-child {
				padding: 1px 0.5px 1px 1px;
				border-left: 1px solid #BDBDBD;
				border-radius: 4px 0 0 4px;
			}

			.g-tf-wrapper:last-child {
				padding: 1px 1px 1px 0.5px;
				border-right: 1px solid #BDBDBD;
				border-radius: 0 4px 4px 0;
			}

		}


		.g-tf-wrapper {
			margin: 0
		}

		.g-tf::before, .g-tf::after {
			display: none;

		}

		.g-tf-wrapper:not(.g-tf__filled):not(.g-tf__outlined) .g-tf-prepend__inner ~ .inputGroup {
			padding: 0;
		}

		.g-tf-affix {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 22px;
			color: rgba(0, 0, 0, 0.54);
			padding: 3px 6px 0 6px;
		}

		.g-tf-prepend__inner {
			width: 22px;
			padding: 0 6px;
		}

		input {
			background-color: white;
			padding: 0 0 0 8px;

			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 22px;
			color: #424242;
		}

		::placeholder {
			color: #424242
		}

	}


</style>
