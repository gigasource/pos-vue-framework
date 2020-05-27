<script>
  import componentsFactory from '../GCombobox/selectComponentHOC';

  const Select = componentsFactory('select', 'GSelect')
  export default Select;
</script>
<style scoped lang="scss">
  @import "../GCombobox/selectComponent";

	.g-select::v-deep {
    .g-tf__border-hover.g-tf__dense {
      line-height: 21px;
    }

    input {
      flex: 0 1 0;
      width: 0;
    }

    .bs-tf-wrapper {
      .input {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        flex: 1;
      }
    }

    .g-icon__arrow {
      transition: transform 0.4s;
    }
	}

	.g-select__active ::v-deep .g-icon.g-icon__arrow:last-child {
			transform: rotateZ(180deg);
	}
</style>
