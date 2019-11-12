<script>
  import _ from 'lodash'
  import Fragment from 'vue-fragment'
  import { generateGridCSS } from './logic/GGridGeneratorUtil'
  import { onMounted, onUpdated } from '@vue/composition-api'

  let gridLayoutInstanceCounter = 0

  export default {
    name: 'GGridLayout',
    components: { Fragment },
    props: {
      layout: Object,
      displayPreviewColor: Boolean
    },
    setup(props, context) {
      // vue template ref id
      const refIdGridLayoutStyle = 'refIdGridLayoutStyle'
      const refIdWrapperElement = 'el'

      // attribute will be used to identify whether an element in slot
      // is a target of grid layout
      const identityAttr = 'area'

      // a unique uid for scoped stylesheet of grid layout instance
      const uid = 'data-g-grid-layout-' + (gridLayoutInstanceCounter++)

      const updateSlot = () => {
        // move style out
        // context.refs[refIdWrapperElement].parentNode.appendChild(context.refs[refIdGridLayoutStyle])


        const defaultSlot = context.refs[refIdWrapperElement]
        const areaNodes = defaultSlot.querySelectorAll(`[${identityAttr}]`)
        _.each(areaNodes, areaNode => {
          areaNode.classList.add(areaNode.getAttribute(identityAttr))
        })
      }

      onMounted(() => updateSlot())
      onUpdated(() => updateSlot())

      function generatedCss() {
        return generateGridCSS(props.layout, uid)
      }

      // try to find pre-defined VNode in default slot of gridLayout
      function _findVnodeInSlot(name) {
        return _.find(context.slots.default(), slot => {
          return slot && slot.data && slot.data.attrs && slot.data.attrs[identityAttr] === name
        })
      }

      function processLayout(model) {
        // find a pre-defined Vnode in default slot, if default slot doesn't include current name
        // then add new div wrapper
        let vNode = _findVnodeInSlot(model.name)
        if (!vNode) {
          // assign model class to vnode
          const attrs = { class: model.name }
          let refWrapper = {}
          let styleEl = null
          // assign uid if model is root node
          if (!model.parent) {
            attrs[uid] = ''
            refWrapper = { ref : refIdWrapperElement}
            styleEl = <style ref={this.refIdGridLayoutStyle} type="text/css">
              {generateGridCSS(this.layout, this.uid, {
                showBackgroundColor: this.displayPreviewColor
              })}
            </style>
          }

          vNode = <div {...{ attrs }} {...refWrapper}>
            {styleEl}
            {_.map(model.subAreas, processLayout)}
          </div>
        }

        return vNode
      }

      return {
        refIdWrapperElement,
        refIdGridLayoutStyle,

        uid,
        processLayout,
        generatedCss
      }
    },
    render(h) { // DON'T delete h param in render method, it's will break the code
      return this.processLayout(this.layout)
    }
  }
</script>
