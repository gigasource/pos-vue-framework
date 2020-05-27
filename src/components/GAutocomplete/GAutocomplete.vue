<script>
  import componentsFactory from '../GCombobox/selectComponentHOC';

  const Autocomplete = componentsFactory('autocomplete', 'GAutocomplete')
  export default Autocomplete;
</script>
<style scoped lang="scss">
  @import "../GCombobox/selectComponent";

	.g-autocomplete__active ::v-deep .g-icon.g-icon__arrow:last-child {
			transform: rotateZ(180deg);
	}

  .g-autocomplete ::v-deep {
    .bs-tf-wrapper {
      .input {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        flex: 1;
      }

      input {
        flex: 1;
      }
    }

    .g-icon__arrow {
      transition: transform 0.4s;
    }
  }
</style>
