<script>
  import componentsFactory from '../GCombobox/selectComponentHOC';

  const Select = componentsFactory('select', 'GSelect')
  export default Select;
</script>
<style scoped lang="scss">
	.g-select::v-deep {
		span {
			margin: 3px
		}
		.g-tf-append__inner .g-icon:last-child {
			transition: transform 0.4s;
		}
		.g-tf-affix{
			padding: 0 6px 4px 6px;
		}

		input {
			flex-shrink: 1;
			flex-basis: 0;
		}

		.input {
			display: flex;
		}
	}

	.g-select__active::v-deep {
		.g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
		}
	}
</style>
