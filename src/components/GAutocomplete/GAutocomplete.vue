<script>
  import componentsFactory from '../GCombobox/selectComponentHOC';

  const Autocomplete = componentsFactory('autocomplete', 'GAutocomplete')
  export default Autocomplete;
</script>
<style scoped lang="scss">
  @import "../GCombobox/selectComponent";

	.g-autocomplete__active :deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
	}

  .g-autocomplete :deep {
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
  }
</style>
