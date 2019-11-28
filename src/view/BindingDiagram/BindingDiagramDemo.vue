<template>
	<g-grid-layout :layout="bindingDiagramLayout" class="container">
		<div area="diagram">
			<g-diagram v-for="(diagramData, index) in diagramsData" v-show="diagramData.localData.path === selectTreeActivePath" :key="index">
				<template v-slot:default="{ dragStart }">
					<g-binding-diagram-item-group :value="diagramData.localData" @dragStart="dragStart" top="20" left="20" @connected="connect" @disconnected="disconnect">

					</g-binding-diagram-item-group>
					<g-binding-diagram-item-group v-for="(group, index) in diagramData.foreignData" :value="group" @dragStart="dragStart" :top="20 + index*250" left="350" @connected="connect" @disconnected="disconnect" :key="index">

					</g-binding-diagram-item-group>
				</template>
			</g-diagram>
		</div>
		<div area="treeview" style="overflow: auto">
			<binding-diagram-tree-view v-model="selectTreeActivePath" :item-text="itemText" item-children="items" :data="treeData2" :expand-level="4"></binding-diagram-tree-view>
		</div>
		<div area="add" style="border-top: 1px solid gray; border-bottom: 1px solid gray; overflow: auto">
			<g-btn @click="addToDiagram">Add to Diagram</g-btn>
			<binding-diagram-tree-view v-model="addTreeActivePath" :item-text="itemText" item-children="items" :data="treeData2" :expand-level="4"></binding-diagram-tree-view>
		</div>
		<div area="preview">
			<g-binding-diagram-table :value="bindingConnections"/>
		</div>
	</g-grid-layout>
</template>
<script>
	import _ from 'lodash'
  import { ref, computed, watch } from '@vue/composition-api';
	import bindingDiagramLayout from './bindingDiagramLayout'
	import BindingDiagramTreeView from './BindingDiagramTreeView';
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';
  import GDiagram from '../../components/GConnector/GDiagram';
  import GBindingDiagramItemGroup from './GBindingDiagramItemGroup';
  import GBindingDiagramTable from './GBindingDiagramTable';
  import GBtn from '../../components/GBtn/GBtn';

  export default {
    name: 'BindingDiagramDemo',
    components: { GBtn, GBindingDiagramTable, GBindingDiagramItemGroup, GDiagram, BindingDiagramTreeView, GGridLayout },
    props: {},
		setup (props, context) {
			const treeData = ref({
        name: 'Root',
				items: [
          {
            type: 'prop',
            value: 'color'
          },
          {
            type: 'prop',
            value: 'width'
          },
          {
            type: 'emit',
            value: 'input'
          },
          {
            type: 'slot',
            value: 'header'
          }
				],
        children: [
          {
            name: 'Parent',
            items: [
              {
                type: 'prop',
                value: 'textColor'
              },
              {
                type: 'prop',
                value: 'minWidth'
              },
              {
                type: 'emit',
                value: 'change'
              },
              {
                type: 'slot',
                value: 'content'
              }
            ],
            children: [
              {
                name: 'Child',
                items: [
                  {
                    type: 'prop',
                    value: 'bgColor'
                  },
                  {
                    type: 'prop',
                    value: 'maxWidth'
                  },
                  {
                    type: 'emit',
                    value: 'toggle'
                  },
                  {
                    type: 'slot',
                    value: 'footer'
                  }
                ],
              }
            ]
          }
        ]
      })

			const treeData2 = ref({
        "events": [],
        "_id": "5caf587f9fe2377748da54a8",
        "__v": 0,
        "isProduction": true,
        "items": [
          {
            "choice": "view",
            "component": "VDialog",
            "binding": [],
            "slotScopes" : {
              "activator": {
                "data": {
                  "isActive": false,
                },
                "func": {
                  "toggleDialog": "() => isActive = !isActive"
                }
							},
							"default": {
                "data": {
                  "title": "Hello"
								}
							}
            },
            "items": [
              {
                "choice": "view",
                "slot": "activator",
                "component": "VBtn",
                "content": {
                  "props": {
                    "html": "open dialog",
                    "depressed": true,
                    "flat": false
                  },
                  "events": {}
                },
                "binding": [],
                "slotScopeBinding": []
              },
              {
                "choice": "view",
                "component": "VCard",
                "binding": [],
                "items": [
                  {
                    "choice": "view",
                    "component": "VCardTitle",
                    "binding": [],
                    "content": {
                      "props": {
                        "html": "FormDialog",
                        "primary-title": false,
                        "class": [
                          "headline"
                        ]
                      },
                      "events": {}
                    },
                    "items": [],
                    "slotScopeBinding": []
                  },
                  {
                    "choice": "view",
                    "component": "VCardText",
                    "binding": [],
                    "content": {
                      "props": {
                        "html": "test thu xem the nao"
                      },
                      "events": {}
                    },
                    "slotScopeBinding": []
                  },
                  {
                    "choice": "view",
                    "component": "VCardActions",
                    "binding": [],
                    "items": [
                      {
                        "choice": "view",
                        "component": "VBtn",
                        "content": {
                          "props": {
                            "html": "action test",
                            "flat": true,
                            "color": "blue"
                          }
                        },
                        "binding": [],
                        "slotScopeBinding": []
                      },
                      {
                        "choice": "view",
                        "component": "VBtn",
                        "content": {
                          "props": {
                            "html": "cancel",
                            "flat": true,
                            "color": "blue"
                          },
                          "events": {
                            "click": {
                              "_code_": "module.exports = function() {\n  let dialogVm = this.$parent;\n  while (!dialogVm.$vnode.tag.includes('v-dialog')) {\n    dialogVm = dialogVm.$parent;\n  } \n  dialogVm.isActive = false;\n}",
                              "_code_type_": "commonJs"
                            }
                          }
                        },
                        "binding": [
                          {
                            "type": "prop",
                            "local": "color",
                            "root": "color"
                          }
                        ],
                        "key": "undefined_copy",
                        "slotScopeBinding": []
                      },
                      {
                        "choice": "view",
                        "component": "VSpacer",
                        "binding": [],
                        "slotScopeBinding": [],
                        "clipboardType": "cut",
                        "content": {
                          "props": {},
                          "events": {}
                        }
                      }
                    ],
                    "slotScopeBinding": [],
                    "content": {
                      "props": {},
                      "events": {}
                    }
                  }
                ],
                "slotScopeBinding": []
              }
            ],
            "content": {
              "props": {
                "max-width": "40vw",
                "persistent": false
              }
            },
            "slotScopeBinding": []
          }
        ],
        "name": "MyDialog",
        "props": {
          "fields": [
            {
              "schemaType": "string",
              "key": "color",
              "type": "input",
              "addable": true
            },
            {
              "schemaType": "number",
              "key": "width",
              "default": "500"
            },
            {
              "schemaType": "boolean",
              "key": "lazy",
              "default": "false"
            }
          ]
        },
        "registerAsVueComponent": true,
        "renderToRoute": "mydialog",
        "id": "5caf587f9fe2377748da54a8"
      })

      const itemText = node => node['name'] ? node['name'] : node['component']

      const selectTreeActivePath = ref('')
      const addTreeActivePath = ref('')
      const diagramsData = ref([])
			const bindingConnections = ref([])

      function getPathName(path, treeData) {
        if (path === '') {
          return _.get(treeData, path + 'name')
        }
        return _.get(treeData, path + '.component')
      }

      function getPathProps(path, treeData) {
			  if (path === '' && _.get(treeData, path + 'props.fields')) {
			    return _.map(_.get(treeData, path + 'props.fields'), val => ({type: 'prop', key: val.key}))
				} else if (_.get(treeData, path + '.content.props')) {
			    return _.map(_.keys(_.get(treeData, path + '.content.props')), val => ({type: 'prop', key: val}))
				} else {
			    return []
				}
			}

			function getPathSlots(path, treeData) {
				if (path === '') return []
				else if (!_.get(treeData, path + '.items')) return []
				else {
          return _.map(_.uniq(_.map(_.get(treeData, path + '.items'), 'slot')), slot => ({type: 'slot', key: slot ? slot : 'default'}))
				}
			}

			function getSlotScopesItems(slotScope) {
			  return _.flatten(_.map(slotScope, (val, type) => _.map(_.keys(val), key => ({ type: type, key: key }))))
			}

			function getPathSlotScopes(path, treeData) {
			  if (_.get(treeData, path + '.slotScopes')) {
          return _.mapValues(_.get(treeData, path + '.slotScopes'), slotScope => getSlotScopesItems(slotScope))
				}
			  return {}
			}

      function getPathData(path, treeData) {
        return {
          path: path,
          name: getPathName(path, treeData),
          items: [
            ...getPathProps(path, treeData),
            ...getPathSlots(path, treeData)
          ],
          slotScopes: getPathSlotScopes(path, treeData)
        }
      }

			function getSlotScopes(slot, path, treeData) {

			}

			function isSelectedPath (path) {
			  for (let diagramData of diagramsData.value) {
			    if (diagramData.localData.path === path) return true
				}
			  return false
			}

      function isDiagramLocalPath (path, diagramData) {
        if (path === diagramData.localData.path) return true
				else return false
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

			watch(selectTreeActivePath, newVal => {
			  if (!isSelectedPath(newVal)) {
			    diagramsData.value.push({
						localData: getPathData(newVal, treeData2.value),
						foreignData: []
					})
				}
			})

			function addToDiagram() {
        for (let diagramData of diagramsData.value) {
          if (isDiagramLocalPath(selectTreeActivePath.value, diagramData) && !isDiagramPath(addTreeActivePath.value, diagramData)) {
						diagramData.foreignData.push(getPathData(addTreeActivePath.value, treeData2.value))
					}
        }
			}

			function connect (startVal, endVal) {
        bindingConnections.value.push({
          type: startVal.type,
          root: startVal.value,
          local: endVal.value
        })
      }

			function disconnect (startVal, endVal) {
			  bindingConnections.value.splice(bindingConnections.value.findIndex(connection => connection.type === startVal.type && connection.foreign === startVal.value && connection.local === endVal.value), 1)
			}

      return {
			  treeData,
				treeData2,
				itemText,
        selectTreeActivePath,
        addTreeActivePath,
        bindingDiagramLayout,
				getPathData,
				diagramsData,
				bindingConnections,
				addToDiagram,
				connect,
				disconnect
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