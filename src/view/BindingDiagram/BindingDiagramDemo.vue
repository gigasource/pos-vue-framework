<template>
	<g-grid-layout :layout="bindingDiagramLayout" class="container">
		<div area="diagram" style="width: 80%; height: 80%; background-color: #00695c"></div>
		<div area="treeview" style="width: 100%; height: 100%; background-color: #0091ea"></div>
	</g-grid-layout>

</template>
<script>
	import bindingDiagramLayout from './bindingDiagramLayout'
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';

  export default {
    name: 'BindingDiagramDemo',
    components: { GGridLayout },
    props: {},
		setup (props, context) {

      return {
        bindingDiagramLayout
			}
		}
  }
</script>
<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100%;
	}
</style>