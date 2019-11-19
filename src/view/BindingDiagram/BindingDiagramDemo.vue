<template>
	<g-grid-layout :layout="bindingDiagramLayout" class="container">
		<div area="diagram" style="width: 100%; height: 100%; background-color: #00695c"></div>
		<div area="treeview">
			<binding-diagram-tree-view item-text="content" item-children="children" :data="treeData" :expand-level="2"></binding-diagram-tree-view>
		</div>
	</g-grid-layout>
</template>
<script>
	import bindingDiagramLayout from './bindingDiagramLayout'
	import BindingDiagramTreeView from './BindingDiagramTreeView';
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';
  import { ref } from '@vue/composition-api';

  export default {
    name: 'BindingDiagramDemo',
    components: { BindingDiagramTreeView, GGridLayout },
    props: {},
		setup (props, context) {
			const treeData = ref({
        content: 'root',
        children: [
          {
            content: 'parent',
            children: [
              {
                content: 'child'
              }
            ]
          }
        ]
      })

      return {
			  treeData,
        bindingDiagramLayout,
			}
		},
  }
</script>
<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100%;
	}
</style>