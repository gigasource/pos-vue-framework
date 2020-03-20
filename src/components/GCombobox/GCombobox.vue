<script>
  import componentsFactory from './selectComponentHOC';

  const Combobox = componentsFactory('combobox', 'GCombobox')
  export default Combobox;
</script>
<style scoped lang="scss">
  @import "./selectComponent";

	.g-combobox__active ::v-deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
	}
</style>
