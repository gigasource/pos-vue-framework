<script>
  import componentsFactory from './selectComponentHOC';

  const Combobox = componentsFactory('combobox', 'GCombobox')
  export default Combobox;
</script>
<style scoped lang="scss">
	.g-combobox ::v-deep {
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
		.g-tf-affix{
			padding: 0 6px 4px 6px;
		}
		.g-tf-input {
			flex-wrap: wrap;
			display: flex;
			flex: 1;
			padding: 0 0 4px 0;
		}

		input {
			flex-shrink: 0;
			flex-basis: auto;
			cursor: text;
		}
	}

	.g-combobox__active {
		::v-deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
		}
	}
</style>
