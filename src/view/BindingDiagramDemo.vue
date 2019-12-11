<template>
	<div>
		<g-btn @click="openDiagram">Edit</g-btn>
		<g-btn @click="resetTreeData">Reset TreeData</g-btn>
		<g-btn @click="resetDiagramData">Reset DiagramData</g-btn>
		<g-dialog v-model="dialog" lazy fullscreen>
			<g-binding-diagram v-model="treeData" @close="closeDiagram" @save="saveData">

			</g-binding-diagram>
		</g-dialog>
	</div>
</template>
<script>
  import { ref } from '@vue/composition-api'
  import GBindingDiagram from '../components/GBindingDiagram/GBindingDiagram';
  import GDialog from '../components/GDialog/GDialog';
  import GBtn from '../components/GBtn/GBtn';

  export default {
    name: 'BindingDiagramDemo',
    components: { GBtn, GDialog, GBindingDiagram },
    setup (props, context) {
      const dialog = ref(false)

      const treeData = ref(undefined)

			function resetTreeData() {
        const treeData = {
          "events": [],
          "_id": "5caf587f9fe2377748da54a8",
          "__v": 0,
          "isProduction": true,
          "items": [
            {
              "choice": "view",
              "component": "VDialog",
              "binding": [],
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
                    "events": {},
                    "emits": {
                      "click": ''
                    },
                  },
                  "binding": [],
                  "slotScopeBinding": [
                    {
                      "type": 'emit',
                      "slotScope": "toggleDialog",
                      "local": "click"
                    }
                  ]
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
                            },
                            "emits": {
                              "click": ''
                            },
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
                            },
                            "emits": {
                              "click": ''
                            },
                          },
                          "binding": [
                            {
                              "type": "prop",
                              "local": "color",
                              "root": "color"
                            }
                          ],
                          "key": "undefined_copy",
                          "slotScopeBinding": [
                            {
                              "type": "prop",
                              "slotScope": "title",
                              "local": "html"
                            }
                          ]
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
                        "events": {},
                        "slotScopes" : {
                          "default": {
                            "func": {
                              "showAlert": ""
                            }
                          }
                        },
                      },
                    }
                  ],
                  "slotScopeBinding": [],
                  "content": {
                    "slotScopes" : {
                      "default": {
                        "data": {
                          "text": "abc"
                        }
                      }
                    },
                  }
                }
              ],
              "content": {
                "props": {
                  "max-width": "40vw",
                  "persistent": false
                },
                "emits": {
                  "input": ''
                },
                "slotScopes" : {
                  "activator": {
                    "data": {
                      "isActive": false,
                      "name": "close"
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
        }
        localStorage.setItem('treeData', JSON.stringify(treeData))
			}

			function resetDiagramData() {
        const treeData = JSON.parse(localStorage.getItem('treeData'))
        treeData.metaData = undefined
        localStorage.setItem('treeData', JSON.stringify(treeData))
			}

			function openDiagram() {
        treeData.value = JSON.parse(localStorage.getItem('treeData'))
				dialog.value = true
			}

			function closeDiagram() {
        localStorage.setItem('treeData', JSON.stringify(treeData.value))
				dialog.value = false
			}

			function saveData() {
        localStorage.setItem('treeData', JSON.stringify(treeData.value))
			}

			return {
        treeData,
				dialog,
				resetTreeData,
				resetDiagramData,
				openDiagram,
				closeDiagram,
				saveData
			}
		}
  }
</script>
<style scoped>
</style>