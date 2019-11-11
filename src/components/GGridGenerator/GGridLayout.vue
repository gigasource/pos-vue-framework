<script>
  import _ from 'lodash'
  import { generateGridCSS } from './logic/GGridGeneratorUtil'
  import { onMounted, onUpdated, createElement as h } from '@vue/composition-api'

  let gridLayoutInstanceCounter = 0

  export default {
    name: 'GGridLayout',
    components: {},
    props: {
      layout: Object
    },
    setup(props, context) {
      // vue template ref id
      const gridLayoutStyleId = 'gridLayoutStyleId'
      const elRefId = 'el'

      // attribute will be used to identify whether an element in slot
      // is a target of grid layout
      const identityAttr = 'area'

      // a unique uid for scoped stylesheet of grid layout instance
      const uid = 'data-g-grid-layout-' + (gridLayoutInstanceCounter++)

      const updateSlot = () => {
        // move style out
        context.refs[elRefId].parentNode.appendChild(context.refs[gridLayoutStyleId])

        //
        const defaultSlot = context.refs[elRefId]
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

          // assign uid if model is root node
          if (!model.parent)
            attrs[uid] = ''

          vNode = h('div', {attrs}, _.map(model.subAreas, processLayout))
        }

        return vNode
      }

      return {
        elRefId,
        gridLayoutStyleId,

        uid,
        processLayout,
        generatedCss
      }
    },
    render(h, context) {
      // Vue re-use Vnode slot object
      // if (slotDefault == null) {
      //   slotDefault = this.$slots.default
      // } else {
      //   for(let i =0; i < slotDefault.length; ++i) {
      //     if (slotDefault[i] == this.$slots.default[i]) {
      //       console.log('equal')
      //     }
      //   }
      // }

      return <div ref={this.elRefId} class="g-grid-layout">
        <style ref={this.gridLayoutStyleId} type="text/css">
          {generateGridCSS(this.layout, this.uid)}
        </style>
        {this.processLayout(this.layout)}
      </div>
    }
  }
</script>
