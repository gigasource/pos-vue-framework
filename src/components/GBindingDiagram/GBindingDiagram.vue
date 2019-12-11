<template>
	<g-grid-layout :layout="GBindingDiagramLayout" class="container">
		<div area="diagram">
			<g-diagram v-for="(diagramData, index) in diagramsData" v-model="diagramData.localData.path === selectTreeActivePath" :key="index">
				<template v-slot:default="{ dragStart }">
					<g-binding-diagram-item-group :path="diagramData.localData.path"
																				:local-path="diagramData.localData.path"
																				:slot-scope-binding="diagramData.slotScopeBinding"
																				@dragStart="dragStart"
																				:top="diagramData.localPosition.top"
																				:left="diagramData.localPosition.left"
																				@connected="connect"
																				@disconnected="disconnect"
																				@edit="edit"
																				:key="'local' + diagramData.localData.path"/>

					<g-binding-diagram-item-group v-for="(item, index) in diagramData.foreignObjects"
																				:path="item.path"
																				:local-path="diagramData.localData.path"
																				:binding="item.path === '' ? diagramData.binding : []"
																				@dragStart="dragStart"
																				:top="item.top"
																				:left="item.left"
																				@connected="connect"
																				@disconnected="disconnect"
																				@edit="edit"
																				@removeGroup="(path, localPath) => removeGroup(path, localPath, index)"
																				:key="'foreign' + item.path"/>
				</template>
			</g-diagram>
		</div>
		<div area="treeview" class="g-binding-diagram-select">
			<div class="g-binding-diagram-select-title">
				Select
			</div>
			<div class="g-binding-diagram-select-tree">
				<g-binding-diagram-tree-view v-model="selectTree" :item-text="itemText" item-children="items" :data="treeData" :expand-level="4"/>
			</div>
		</div>
		<div area="add" class="g-binding-diagram-add">
			<div class="g-binding-diagram-add-title">
				Add
			</div>
			<div class="g-binding-diagram-add-tree">
				<g-btn class="g-binding-diagram-add-button" icon @click="addToDiagram">
					<g-icon size="20" class="text-blue">fas fa-plus-circle</g-icon>
				</g-btn>
				<g-binding-diagram-tree-view v-model="addTree" :item-text="itemText" item-children="items" :data="treeData" :expand-level="7" slotted/>
			</div>
		</div>
		<div area="preview" class="g-binding-diagram-preview">
			<div class="g-binding-diagram-preview-title">
				Preview
			</div>
			<div class="g-binding-diagram-preview-tables" v-for="(diagramData, index) in diagramsData" v-show="diagramData.localData.path === selectTreeActivePath" :key="index">
				Binding:
				<g-binding-diagram-table :value="diagramData.binding"/>
				SlotScopes Binding:
				<g-binding-diagram-table :value="diagramData.slotScopeBinding" slot-scope-binding/>
			</div>
		</div>
		<div area="edit" class="g-binding-diagram-edit">
			<g-binding-diagram-editor :path="editorPath">

			</g-binding-diagram-editor>
		</div>
		<div area="action" class="g-binding-diagram-action">
			<div class="g-binding-diagram-action-title">
				Action
			</div>
			<g-btn outlined @click="save">Save</g-btn>
			<g-btn outlined @click="close">Close</g-btn>
		</div>
	</g-grid-layout>
</template>
<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { ref, reactive, provide } from '@vue/composition-api';
  import GBindingDiagramFactory from './GBindingDiagramFactory';
	import GBindingDiagramLayout from './GBindingDiagramLayout'
	import GBindingDiagramTreeView from './GBindingDiagramTreeView';
  import GGridLayout from '../GGridGenerator/GGridLayout';
  import GDiagram from '../GConnector/GDiagram';
  import GBindingDiagramItemGroup from './GBindingDiagramItemGroup';
  import GBindingDiagramTable from './GBindingDiagramTable';
  import GBindingDiagramEditor from './GBindingDiagramEditor';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GBindingDiagram',
    components: { GIcon, GBtn, GBindingDiagramTable, GBindingDiagramEditor, GBindingDiagramItemGroup, GDiagram, GBindingDiagramTreeView, GGridLayout },
    props: {
      value: {
        type: Object
      }
		},
		setup (props, context) {
			const treeData = getInternalValue(props, context)

      const itemText = node => node['name'] ? node['name'] : node['component']

			const selectTree = treeData.value.metaData ? reactive(treeData.value.metaData.selectTree) : reactive({
        allPaths: [],
        activePath: '',
			})
      const addTree = treeData.value.metaData ? reactive(treeData.value.metaData.addTree) : reactive({
        allPaths: [],
        activePath: '',
      })
      const diagramsData = treeData.value.metaData ? ref(treeData.value.metaData.diagramsData) : ref([])
			const editorPath = ref('')

     	const {
        selectTreeActivePath,
        addTreeActivePath,
        getPathData,
        addToDiagram,
        removeGroup,
        connect,
        disconnect,
        edit,
        toggleItem,
        addItem,
        deleteItem,
        isProperAddPath,
        isConnectedPath,
        getPosition,
        updatePosition,
        getSlotPathFromKey,
        save,
        close
      } = GBindingDiagramFactory(props, context, treeData, selectTree, addTree, diagramsData, editorPath)

			provide('getPathData', getPathData)
			provide('toggleItem', toggleItem)
      provide('addItem', addItem)
      provide('deleteItem', deleteItem)
      provide('isProperAddPath', isProperAddPath)
      provide('isConnectedPath', isConnectedPath)
      provide('updatePosition', updatePosition)
      provide('getPosition', getPosition)
      provide('getSlotPathFromKey', getSlotPathFromKey)

      return {
				GBindingDiagramLayout,
			  treeData,
				itemText,
				selectTree,
				addTree,
				selectTreeActivePath,
				addTreeActivePath,
				diagramsData,
				addToDiagram,
				removeGroup,
				connect,
				disconnect,
				editorPath,
				edit,
				save,
				close,
			}
		},
  }
</script>
<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100%;

		::v-deep.g-diagram-container {
			box-shadow: none;
			background-color: #f0f0f0;
			border-top: 0;
			border-bottom: 0;
			border-left: 2px solid grey;
			border-right: 2px solid grey;
		}
	}

	.g-binding-diagram {

		&-select, &-add, &-preview, &-action {
			position: relative;
			padding: 0 10px;
			height: 100%;
			display: flex;
			flex-direction: column;
			flex: 1 1 100%;
			background-color: white;

			&-title {
				position: relative;
				overflow: hidden;
				font-size: 16px;
				color: grey;
				flex: 0 0 auto;


				&::after {
					content: "";
					width: 100%;
					height: 100%;
					border-top: 1px solid grey;
					position: absolute;
					transform: translateY(50%);
					margin-left: 10px
				}
			}

			&-tree {
				backface-visibility: hidden;
				flex: 1 1 auto;
				overflow-y: auto;
			}

			&-button {
				position: absolute;
				top: 16px;
			 	right: 12px;
			}

			&-tables {
				font-size: 14px;
				backface-visibility: hidden;
				flex: 1 1 auto;
				overflow-y: auto;
			}
		}

		&-edit {
			height: 100%;
			padding: 0 10px;
			background-color: white;
		}

		&-action {
			::v-deep.g-btn {
				margin: 5px 0;
			}
		}
	}

</style>