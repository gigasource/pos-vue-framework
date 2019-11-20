<template>
	<g-grid-layout :layout="bindingDiagramLayout" class="container">
		<div area="diagram" style="width: 100%; height: 100%; border-left: 1px solid gray; border-right: 1px solid gray;">
			<g-diagram></g-diagram>
		</div>
		<div area="treeview">
			<binding-diagram-tree-view v-model="activePath" item-text="content" item-children="children" :data="treeData" :expand-level="2"></binding-diagram-tree-view>
		</div>
		<div area="add" style="width: 100%; height: 100%; border-top: 1px solid gray; border-bottom: 1px solid gray;">

		</div>
	</g-grid-layout>
</template>
<script>
	import _ from 'lodash'
	import bindingDiagramLayout from './bindingDiagramLayout'
	import BindingDiagramTreeView from './BindingDiagramTreeView';
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';
  import { ref } from '@vue/composition-api';
  import GDiagram from '../../components/GConnector/GDiagram';

  export default {
    name: 'BindingDiagramDemo',
    components: { GDiagram, BindingDiagramTreeView, GGridLayout },
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

			const activePath = ref('')

      return {
			  treeData,
				activePath,
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