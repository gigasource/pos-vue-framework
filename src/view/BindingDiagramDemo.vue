<template>
 <g-binding-diagram v-model="treeData">

 </g-binding-diagram>
</template>
<script>
	import { ref, computed } from '@vue/composition-api'
  import GBindingDiagram from '../components/GBindingDiagram/GBindingDiagram';
  export default {
    name: 'BindingDiagramDemo',
    components: { GBindingDiagram },
    setup (props, context) {
      const treeData = ref({
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
              },
              "emits": {
                "input": ''
              },
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
			return {
        treeData
			}
		}
  }
</script>
<style scoped>
</style>