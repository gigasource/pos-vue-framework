<script>
  import _ from 'lodash'
  import { generateGridCSS } from './logic/GGridGeneratorUtil'
  import detachable from '../../mixins/detachable'
  import { onMounted, onUpdated, ref, computed, watch, createElement as h } from '@vue/composition-api'

  let gridLayoutInstanceCounter = 0

  let slotDefault = null

  export default {
    name: 'GGridLayout',
    components: {},
    props: {
      layout: Object
    },
    setup(props, context) {

      const { attachToParent } = detachable(props, context)

      // attribute will be used to identify whether an element in slot
      // is a target of grid layout
      const identityAttr = 'area'

      // a unique uid for scoped stylesheet of grid layout instance
      const uid = 'data-g-grid-layout-' + (gridLayoutInstanceCounter++)

      const updateSlot = () => {
        // move style out
        context.refs.el.parentNode.appendChild(context.refs.gridLayoutStyle)

        //
        const defaultSlot = context.refs.el
        const areaNodes = defaultSlot.querySelectorAll(`[${identityAttr}]`)
        _.each(areaNodes, areaNode => {
          // attach attr
          areaNode.setAttribute(uid, '')
          // add class
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
          vNode = h('div',
              { attrs: { [uid]: '', class: model.name } },
              _.map(model.subAreas, processLayout)
          )
        }

        return vNode
      }

      return {
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

      return <div ref="el" class="g-grid-layout">
        <style ref="gridLayoutStyle" type="text/css">
          {generateGridCSS(this.layout, this.uid)}
        </style>
        {this.processLayout(this.layout)}
      </div>
    }
  }
</script>
