<script>
  import _ from 'lodash'
  import { fromJSON } from './logic/modelParser'
  import { onMounted, onUpdated, reactive, watch} from '@vue/composition-api'
  import GridModel from './logic/GridModel';
  import GDialog from '../GDialog/GDialog'
  import GBtn from '../GBtn/GBtn'

  let gridLayoutInstanceCounter = 0

  export default {
    name: 'GGridLayout',
    components: { GDialog, GBtn },
    props: {
      // layout object generated by grid generator
      layout: Object,
      // boolean value indicate that backgroundColor of grid generator will be applied for grid layout
      displayPreviewColor: Boolean,
      // Allow un-named area render
      passThrough: {
        type: Boolean,
        default: false
      },
    },
    setup(props, context) {
      let state = reactive({
        layout: fromJSON(props.layout)
      })

      watch(() => props.layout, () => {
        state.layout = fromJSON(props.layout)
      })

      // a unique uid for scoped stylesheet of grid layout instance
      const uid = 'gl-' + (gridLayoutInstanceCounter++)
      // vue template ref id
      const refIdWrapperElement = 'el'
      // css generate
      const cssClassPrefix = uid + '-'
      const getAreaClass = name => `${name} ${cssClassPrefix}${name}`
      const addAreaClassForPredefinedArea = () => {
        // assign class for pre-defined area
        const wrapperEl = context.refs[refIdWrapperElement]
        _.each(wrapperEl.querySelectorAll(`[area]`), areaDomNode => {
          const areaName = areaDomNode.getAttribute('area')
          // in case default slot contains multiple element which have the same area value, these areas will be wrapped
          // in a div. The wrapper div will have class value is the value of duplicated area name to get styling of grid generator
          // and we don't want to add class to these area in this case
          const parentClassList = areaDomNode.parentNode.classList

          if (!parentClassList.contains(areaName)) {
            areaDomNode.classList.add(areaName)
          }

          if (!parentClassList.contains(`${cssClassPrefix}${areaName}`)) {
            areaDomNode.classList.add(`${cssClassPrefix}${areaName}`)
          }

          // now we wipe out all area attribute
          areaDomNode.removeAttribute('area')
        })

        if (props.displayPreviewColor)
          __showPreviewAreaName()
        else
          __removePreviewArea()
      }

      // TODO: Using view reactive instead
      const __previewAreaNameClassSignature = uid + '____PREVIEW'
      const __createAreaNameElement = (name) => {
        const el = document.createElement('span')
        el.style = 'position: absolute; top:0; left:0; text-decoration: underline; font-size: 12px'
        el.classList.add(__previewAreaNameClassSignature)
        el.innerText = name
        return el
      }
      const __getAreaName = classList => _.find(classList, clsName => clsName.startsWith(cssClassPrefix)).substr(cssClassPrefix.length)
      const __showPreviewAreaName = () => {
        const wrapperEl = context.refs[refIdWrapperElement]
        const areaEls = [...wrapperEl.querySelectorAll(`[class*="${cssClassPrefix}"]`)]
        _.each(areaEls, areaDomNode => {
          if (areaDomNode.childNodes.length == 0) {
            areaDomNode.style += areaDomNode.style + '; position: relative; '
            areaDomNode.appendChild(__createAreaNameElement(__getAreaName(areaDomNode.classList)))
          }
        })
      }
      const __removePreviewArea = () => {
        const wrapperEl = context.refs[refIdWrapperElement]
        const areaEls = [...wrapperEl.querySelectorAll(`[class="${__previewAreaNameClassSignature}"]`)]
        _.each(areaEls, el => el.parentNode.removeChild(el))
      }

      // vnode collection
      let namedSlotVNodes = null // vnode which created by scopedSlots
      let namedAreaVNodes = null // vnode which define area attribute

      // get named slots vnode function
      function extractNamedSlotVnodeFn() {
        namedSlotVNodes = {}
        // get all vue 1.0 slots
        _.each(_.keys(context.slots), slotName => {
          if (slotName !== 'default') {
            namedSlotVNodes[slotName] = context.slots[slotName]()
          }
        })
      }

      // get named area vNodes
      function extractNamedAreaVNodes() {
        namedAreaVNodes = {}
        if (context.slots.default != null) {
          _.each(context.slots.default(), vnode => {
            if (vnode && vnode.data && vnode.data.attrs && vnode.data.attrs['area']) {
              if (namedAreaVNodes[vnode.data.attrs['area']]) {
                namedAreaVNodes[vnode.data.attrs['area']].push(vnode)
              } else {
                namedAreaVNodes[vnode.data.attrs['area']] = [vnode]
              }
            }
          })
        }
      }

      // get pass through vNodes
      function getPassThroughVNodes() {
        function _getDeclaredArea(model) {
          let areaNames = [model.name]
          if (model instanceof GridModel) {
            _.each(model.subAreas, area => areaNames.push(..._getDeclaredArea(area)))
          }
          return areaNames
        }

        let declaredNames = _getDeclaredArea(state.layout)
        if (context.slots.default != null) {
          return _.filter(context.slots.default(), slot => {
            if (slot == null) {
              return false
            } else if (!slot.data) {
              return true
            } else if (slot.data.scopedSlots) {
              return false
            } else if (!slot.data.attrs) {
              return true
            } else if (slot.data.attrs['area'] == null || declaredNames.indexOf(slot.data.attrs['area']) === -1) {
              return true
            } else {
              return false // ?? :D ??
            }
          })
        } else {
          return []
        }
      }

      /**
       * try to find pre-declared VNode in default slot of gridLayout
       * @param name
       * @returns {Array} of node
       * [] if no node found
       * [Node] if only one node found: unique area or named slots
       * [Node1, Node2, ...] if multiple area have the same name
       * @private
       */
      function _findDeclaredVNodes(name) {
        // no duplicated named slots => return array
        // assume that slot name and area name are not duplicate
        if (_.has(namedSlotVNodes, name)) {
          return namedSlotVNodes[name]
        } else if (_.has(namedAreaVNodes, name)) {
          return namedAreaVNodes[name]
        } else {
          return []
        }
      }

      function attachAreaAttribute(vNode, name) {
        // try to attach area into slot vnode which is not clear text vnode and not wrap in div
        if (!vNode) return
        if (!vNode.data) vNode.data = {}
        if (!vNode.data.attrs) vNode.data.attrs = {}
        vNode.data.attrs.area = name
      }

      function processLayout(model) {
        const cssClassName = getAreaClass(model.name)
        let vNode = _findDeclaredVNodes(model.name)
        if (vNode.length > 1) {
          if (model.wrapInDiv) {
            vNode = <div key={model.name} class={`${cssClassPrefix}${model.name}`}>{vNode}</div>
          } else if (_.has(namedSlotVNodes, model.name)) {
            // check for v-slot only
            // get vnode which is not clear text
            vNode = _.filter(vNode, node => node.tag)
            // then to attach area into slot vnode which is not wrap in div
            _.each(vNode, node => attachAreaAttribute(node, model.name))
          }
        } else if (vNode.length === 1) {
          // single slot with area name or scopedSlot
          if (model.wrapInDiv) {
            vNode = <div key={model.name} class={`${cssClassPrefix}${model.name}`}>{vNode[0]}</div>
          } else if (!vNode[0].tag) {
            // do not render clear text node
            vNode = null
          } else if (_.has(namedSlotVNodes, model.name)) {
            // try to attach area into slot vnode which is not clear text vnode and not wrap in div
            attachAreaAttribute(vNode[0], model.name)
          } else {
            // area vNode, no wrap in div, not clear text vNode
            vNode = vNode[0]
          }
        } else if (!model._parent) {
          // root node -> attach grid-layout attribute id, reference, style, editor dialog, passThrough vNode
          const styleVNode = (
              <style type="text/css">
                {model.genCss('', { showBackgroundColor: props.displayPreviewColor, prefix: cssClassPrefix })}
              </style>
          )
          const passThroughVNodes = props.passThrough ? getPassThroughVNodes() : null

          vNode = <div
              class={cssClassName}
              ref={refIdWrapperElement}>
            {styleVNode}
            {passThroughVNodes}
            {_.map(model.subAreas, processLayout)}
          </div>
        } else {
          // an area which was declared in layout but not exist in grid template
          // will be rendered as a empty div
          vNode = <div class={cssClassName} key={model.name}>
            {_.map(model.subAreas, processLayout)}
          </div>
        }
        return vNode
      }

      onMounted(() => addAreaClassForPredefinedArea())
      onUpdated(() => addAreaClassForPredefinedArea())

      return () => {
        // run every time render function execute because of v-if
        extractNamedSlotVnodeFn()
        extractNamedAreaVNodes()
        return processLayout(state.layout)
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
