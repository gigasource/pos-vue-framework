<script>
  import componentsFactory from './selectComponentHOC';

  const Combobox = componentsFactory('combobox', 'GCombobox')
  export default Combobox;
</script>
<style scoped lang="scss">
	.g-combobox ::v-deep {
		.g-tf-append__inner .g-icon:last-child {
			transition: transform 0.4s;
		}

		.input {
			display: flex;
			flex-wrap: wrap;
      flex: 1;
		}

		.g-tf-input {
			flex-wrap: wrap;
			display: flex;
		}

		input {
			cursor: text;
      min-width: 48px;
      flex: 1;
		}

    .bs-tf-inner-input-group {
      padding-left: 12px;
      flex-wrap: wrap;

      .bs-tf-input {
        padding-left: 0;
        padding-right: 0;
        flex: 1 1 0;
      }
    }
	}

	.g-combobox__active {
		::v-deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
		}
	}
</style>
