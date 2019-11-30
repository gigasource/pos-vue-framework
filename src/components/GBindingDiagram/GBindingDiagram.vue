<template>
	<g-grid-layout :layout="bindingDiagramLayout" class="container">
		<div area="diagram">
			<g-diagram v-for="(diagramData, index) in diagramsData" v-model="diagramData.localData.path === selectTreeActivePath" :key="index">
				<template v-slot:default="{ dragStart }">
					<g-binding-diagram-item-group :value="diagramData.localData" @dragStart="dragStart" :top="20" :left="20" @connected="connect" @disconnected="disconnect" @edit="edit" :key="'local' + index">

					</g-binding-diagram-item-group>
					<g-binding-diagram-item-group v-for="(group, index) in diagramData.foreignData" :value="group" @dragStart="dragStart" :top="20 + index*250" left="350" @connected="connect" @disconnected="disconnect" @edit="edit" :key="index">

					</g-binding-diagram-item-group>
				</template>
			</g-diagram>
		</div>
		<div area="treeview" style="overflow: auto">
			<g-binding-diagram-tree-view v-model="selectTree" :item-text="itemText" item-children="items" :data="treeData" :expand-level="4"></g-binding-diagram-tree-view>
		</div>
		<div area="add" style="border-top: 1px solid gray; border-bottom: 1px solid gray; overflow: auto">
			<g-btn @click="addToDiagram">Add to Diagram</g-btn>
			<g-binding-diagram-tree-view v-model="addTree" :item-text="itemText" item-children="items" :data="treeData" :expand-level="7" slotted></g-binding-diagram-tree-view>
		</div>
		<div area="preview" style="overflow: auto">
			<div v-for="(diagramData, index) in diagramsData" v-show="diagramData.localData.path === selectTreeActivePath" :key="index">
				Binding:
				<g-binding-diagram-table :value="diagramData.binding"/>
				SlotScopes Binding:
				<g-binding-diagram-table :value="diagramData.slotScopeBinding" slot-scope-binding/>
			</div>
		</div>
		<div area="rightsidebar">
			<g-binding-diagram-editor v-model="editorData" @toggle="">

			</g-binding-diagram-editor>
		</div>
	</g-grid-layout>
</template>
<script>
	import _ from 'lodash'
  import { getInternalValue } from '../../mixins/getVModel';
  import { ref, reactive, computed, watch, provide, onMounted } from '@vue/composition-api';
	import bindingDiagramLayout from './bindingDiagramLayout'
	import GBindingDiagramTreeView from './GBindingDiagramTreeView';
  import GGridLayout from '../GGridGenerator/GGridLayout';
  import GDiagram from '../GConnector/GDiagram';
  import GBindingDiagramItemGroup from './GBindingDiagramItemGroup';
  import GBindingDiagramTable from './GBindingDiagramTable';
  import GBindingDiagramEditor from './GBindingDiagramEditor';
  import GBtn from '../GBtn/GBtn';

  export default {
    name: 'GBindingDiagram',
    components: { GBtn, GBindingDiagramTable, GBindingDiagramEditor, GBindingDiagramItemGroup, GDiagram, GBindingDiagramTreeView, GGridLayout },
    props: {
      value: {
        type: Object
      }
		},
		setup (props, context) {
			const treeData = getInternalValue(props, context)

      const itemText = node => node['name'] ? node['name'] : node['component']

			const selectTree = reactive({
				activePath: '',
				allPaths: []
			})
      const addTree = reactive({
        activePath: '',
        allPaths: []
      })
      const selectTreeActivePath = computed(() => selectTree.activePath)
      const addTreeActiveSlottedPath = computed(() => addTree.activePath)
      const diagramsData = ref([])
			const bindingConnections = ref([])
			const slotScopeBindingConnections = ref([])
			const editorData = ref({})

			// Init diagrams data
      onMounted(() => {
        const allSlotData = []

				for (let slottedPath of addTree.allPaths) {
				  const path = convertToPath(slottedPath)
				  if (isSlotPath(path)) {
				    allSlotData.push(initPathData(path, treeData.value))
					}
				}

        for (let path of selectTree.allPaths) {
          const slotsData = []
					for (let slotData of allSlotData) {
					  if (path === convertToNormalPath(slotData.path)) slotsData.push(slotData)
					}
          diagramsData.value.push({
						localData: initPathData(path, treeData.value),
						slotsData: slotsData,
						foreignData: [],
						binding: [],
						slotScopeBinding: []
					})
				}
			})

      const addTreeActivePath = computed(() => convertToPath(addTreeActiveSlottedPath.value))

      function getPathName(path, treeData) {
        if (path === '') {
          // Root
          return _.get(treeData, path + 'name')
        } else if (path.indexOf('slot') > -1) {
          // Slot path
          return _.get(treeData, path.replace(/\.slot\.\d/, '.component'))
				}
        return _.get(treeData, path + '.component')
      }

      function getSlotName(slotPath, treeData) {
        const slotGroups = _.groupBy(_.get(treeData, slotPath.replace(/\.slot\.\d/, '.items')), i => i.slot || 'default')
				const slotNames = _.map(slotGroups, (items, slot) => slot)
				return slotNames[slotPath[slotPath.length - 1]]
			}

      function getPathProps(path, treeData) {
			  if (path === '' && _.get(treeData, path + 'props.fields')) {
			    return _.map(_.get(treeData, path + 'props.fields'), val => ({type: 'prop', key: val.key, show: true}))
				} else if (_.get(treeData, path + '.content.props')) {
			    return _.map(_.keys(_.get(treeData, path + '.content.props')), val => ({type: 'prop', key: val, show: true}))
				} else {
			    return []
				}
			}

			function getPathEmits(path, treeData) {
        if (_.get(treeData, path + '.content.emits')) {
          return _.map(_.keys(_.get(treeData, path + '.content.emits')), val => ({type: 'emit', key: val, show: true}))
        } else {
          return []
        }
			}

			function getPathSlots(path, treeData) {
				if (path === '') return []
				else if (!_.get(treeData, path + '.items')) return []
				else {
          return _.map(_.uniq(_.map(_.get(treeData, path + '.items'), 'slot')), slot => ({type: 'slot', key: slot || 'default', show: true}))
				}
			}

			function getSlotScopesItems(slotScope) {
			  return _.flatten(_.map(slotScope, (val, type) => _.map(_.keys(val), key => ({ type: type, key: key, show: true}))))
			}

			function getPathSlotScopes(path, treeData) {
			  if (_.get(treeData, path + '.content.slotScopes')) {
          return _.mapValues(_.get(treeData, path + '.content.slotScopes'), slotScope => getSlotScopesItems(slotScope))
				}
			  return {}
			}

      function initPathData(path, treeData) {
			  // slot path
			  if (isSlotPath(path)) {
			    const slotScopes = getPathSlotScopes(convertToNormalPath(path), treeData)
					const slotName = getSlotName(path, treeData)
			    return {
			      path: path,
						name: getPathName(path, treeData) + ': ' + slotName,
						items: slotScopes[slotName] || [],
					}
				}

			  // normal path
        return {
          path: path,
          name: getPathName(path, treeData),
          items: [
            ...getPathProps(path, treeData),
						...getPathEmits(path, treeData),
            ...getPathSlots(path, treeData)
          ],
          slotScopes: getPathSlotScopes(path, treeData),
        }
      }


      function getPathData (path) {
			  for (let diagramData of diagramsData.value) {
			    if (path === diagramData.localData.path) return diagramData.localData
					if (isSlotPath(path) && convertToNormalPath(path) === diagramData.localData.path) {
            for (let slotData of diagramData.slotsData) {
              if (path === slotData.path) return slotData
						}
					}
				}
			}

      function convertToNormalPath (slotPath) {
			  return slotPath.replace(/\.slot\.\d/, '')
			}

			function convertToSlottedPath (path) {
			  for (let slottedPath of addTree.allPaths) {
			    if (convertToPath(slottedPath) === path) return slottedPath
				}
			}

			function convertToPath (slottedPath) {
			  return slottedPath.replace(/slot\.\d\./g, '')
			}

			function isRootPath (path) {
			  return path === ''
			}

      function isSlotPath (path) {
			  return path.indexOf('slot') > -1
			}

      function isProperSlotPath(slottedPath, path) {
        return convertToSlottedPath(path).indexOf(slottedPath) > -1
      }

			function isSelectedPath (path) {
			  for (let diagramData of diagramsData.value) {
			    if (diagramData.localData.path === path) return true
				}
			  return false
			}

      function isDiagramLocalPath (path, diagramData) {
        return path === diagramData.localData.path;
      }

			function isDiagramForeignPath (path, diagramData) {
				for (let item of diagramData.foreignData) {
				  if (path === item.path) return true
				}
				return false
			}

			function isDiagramPath (path, diagramData) {
			  return isDiagramLocalPath(path, diagramData) || isDiagramForeignPath(path, diagramData)
			}

			// watch(selectTreeActivePath, newVal => {
			//   if (!isSelectedPath(newVal)) {
			//     diagramsData.value.push(reactive({
			// 			localData: initPathData(newVal, treeData.value),
			// 			foreignData: [],
			// 			binding: [],
			// 			slotScopeBinding: []
			// 		}))
			// 	}
			// })

			function addToDiagram() {
        for (let diagramData of diagramsData.value) {
          if (isDiagramLocalPath(selectTreeActivePath.value, diagramData)) {
            if (((isRootPath(addTreeActivePath.value) || (isSlotPath(addTreeActivePath.value) && isProperSlotPath(addTreeActiveSlottedPath.value, selectTreeActivePath.value))) && !isDiagramPath(addTreeActivePath.value, diagramData))) {
              diagramData.foreignData.push(getPathData(addTreeActivePath.value, diagramsData.value))
            }
					}
        }
			}

			function connect (startVal, endVal) {
        for (let diagramData of diagramsData.value) {
          if (isDiagramLocalPath(selectTreeActivePath.value, diagramData)) {
            if (endVal.type === 'data' || endVal.type === 'func') {
              diagramData.slotScopeBinding.push({
                type: startVal.type,
                foreign: startVal.key,
                local: endVal.key
              })
            } else {
              diagramData.binding.push({
                type: startVal.type,
                foreign: startVal.key,
                local: endVal.key
              })
						}
          }
        }
      }

			function disconnect (startVal, endVal) {
        bindingConnections.value.splice(bindingConnections.value.findIndex(connection => connection.type === startVal.type && connection.foreign === startVal.value && connection.local === endVal.value), 1)
        for (let diagramData of diagramsData.value) {
          if (isDiagramLocalPath(selectTreeActivePath.value, diagramData)) {
            if (endVal.type === 'data' || endVal.type === 'func') {
              diagramData.slotScopeBinding.splice(diagramData.slotScopeBinding.findIndex(connection => connection.type === startVal.type && connection.foreign === startVal.value && connection.local === endVal.value), 1)
            } else {
              diagramData.binding.splice(diagramData.binding.findIndex(connection => connection.type === startVal.type && connection.foreign === startVal.value && connection.local === endVal.value), 1)
            }
          }
        }
      }

			function edit(value) {
			  editorData.value = value
			}

			function toggleItem(path, index) {
				const normalPath = convertToNormalPath(path)
        for (let diagramData of diagramsData.value) {
          if (normalPath === diagramData.localData.path) {
            diagramData.localData.items[index].show = !diagramData.localData.items[index].show
					}
				}
			}

			function addItem(path, newItem) {
        const normalPath = convertToNormalPath(path)
        for (let diagramData of diagramsData.value) {
          if (normalPath === diagramData.localData.path) {
            diagramData.localData.items.push(newItem)
          }
        }
			}

			provide('addItem', addItem)
			provide('toggleItem', toggleItem)

      return {
        bindingDiagramLayout,
			  treeData,
				itemText,
				selectTree,
				addTree,
				selectTreeActivePath,
				addTreeActivePath,
				diagramsData,
				addToDiagram,
				connect,
				disconnect,
				editorData,
				edit
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
			border-top: 0;
			border-bottom: 0;
		}
	}

	.binding-diagram {
		&-local {

		}
	}

</style>