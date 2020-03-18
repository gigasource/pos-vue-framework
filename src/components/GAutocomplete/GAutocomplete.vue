<script>
  import componentsFactory from '../GCombobox/selectComponentHOC';

  const Autocomplete = componentsFactory('autocomplete', 'GAutocomplete')
  export default Autocomplete;
</script>
<style scoped lang="scss">
  @import "../GCombobox/selectComponent";

	.g-autocomplete__active ::v-deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
	}
</style>
