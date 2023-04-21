<script>
  import componentsFactory from '../GCombobox/selectComponentHOC';

  const Select = componentsFactory('select', 'GSelect')
  export default Select;
</script>
<style scoped lang="scss">
  @import "../GCombobox/selectComponent";

	.g-select:deep {
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
	}

	.g-select__active:deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
	}
</style>
