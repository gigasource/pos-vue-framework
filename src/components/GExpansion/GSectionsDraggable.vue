<script>
  import _ from 'lodash'
  import {getExpansionModel} from './GExpansionFactory';
  import {provide} from '@vue/composition-api';
  import GSectionsHeader from './GSectionsHeader';
  import GSectionsItem from './GSectionsItem';

  export default {
    name: 'GSectionsDraggable',
    components: {GSectionsHeader, GSectionsItem},
    props: {
      mandatory: Boolean,
      multiple: Boolean,
      value: null,

      itemHeaders: {
        type: Array
      },
      order: {
        type: Array,
        default: () => [],
      }
    },
    setup(props, context) {
      const {model, toggleItem, isActiveItem} = getExpansionModel(props, context)

      provide('toggleItem', toggleItem)
      provide('isActiveItem', isActiveItem)

      const orderArray = props.order;
      const {onDragStart, onDragEnter, onDragOver, onDragLeave, onDragEnd, onDrop} = getDndEventHandler(orderArray, context)

      return {
        onDragStart, onDragEnter, onDragOver, onDragLeave, onDragEnd, onDrop,
        isActiveItem,
        orderArray,
      }
    },

    render(h) {
      let headerNodes = []
      let itemNodes = []

      if (!this.itemHeaders) {
        headerNodes = _.filter(this.$slots.default, node => node.tag && node.tag.indexOf('GSectionsHeader') > -1)
        itemNodes = _.filter(this.$slots.default, node => node.tag && node.tag.indexOf('GSectionsItem') > -1)

        for (let i = 0; i < itemNodes.length; i++) {
          if (headerNodes[i]) {
            itemNodes[i].componentOptions.propsData.item = i + 1
            headerNodes[i].componentOptions.propsData.item = i + 1
          } else {
            itemNodes[i].componentOptions.propsData.item = i + 1
            headerNodes.push(
                <g-sections-header item={i + 1}
                                   header-text={itemNodes[i].componentOptions.propsData.header}/>
            )
          }
        }
      } else {
        this.itemHeaders.map((header, index) => {
          headerNodes.push(
              <g-sections-header item={index + 1}
                                 header-text={header}/>
          )
          itemNodes.push(
              <g-sections-item item={index + 1}>
                {this.$slots[header] ? this.$slots[header]() : undefined}
              </g-sections-item>
          )
        })
      }

      const sections = _.zip(headerNodes, itemNodes)
      let sectionsClone = []

      for (let i = 0; i < sections.length; i++) {
        sectionsClone.push(sections[this.orderArray[i]])
      }

      const genContent = () => {
        return sectionsClone.map((section, index) => {
          return <div
              class={['g-sections-element', {'g-sections-element__active': this.isActiveItem(section[0].componentOptions.propsData.item)}]}
              vOn:dragstart={(e) => this.onDragStart(e, this.order[index])}
              vOn:dragenter={(e) => this.onDragEnter(e, this.order[index], this.isActiveItem(section[0].componentOptions.propsData.item))}
              vOn:dragover={this.onDragOver}
              vOn:dragleave={this.onDragLeave}
              vOn:dragend={this.onDragEnd}
              vOn:drop={this.onDrop}
              draggable="false">
            {section}
          </div>
        })
      }

      const genSections = () => {
        return <div class="g-sections">
          {genContent()}
        </div>
      }
      return genSections();
    }
  }

  function getDndEventHandler(order, context) {
    // index in order array
    let source = null
    let sourceIndex = null
    let previousIndex = null
    let currentIndex = null
    let orderClone = null

    // target in view
    let previousTarget = null
    let currentTarget = null

    function onDragStart(e, indexSection) {
      sourceIndex = indexSection
      currentIndex = indexSection
      currentTarget = e.currentTarget
      setTimeout(() => {
        currentTarget.classList.add('entering')
      }, 0)
    }

    function onDragEnter(e, indexSection, active) {
      if (indexSection === sourceIndex) return //prevent re trigger enter when swap section
      e.preventDefault()
      previousTarget = currentTarget
      if (previousTarget) previousTarget.classList.remove('entering')
      currentTarget = e.currentTarget
      currentTarget.classList.add('entering')


      previousIndex = currentIndex
      currentIndex = indexSection
      orderClone = order.slice()
      if (previousIndex || previousIndex === 0) {
        order[orderClone.indexOf(sourceIndex)] = indexSection
        order[orderClone.indexOf(currentIndex)] = sourceIndex
      }
      active ? setTimeout(() => order.splice(), 200) : order.splice()
    }

    function onDragLeave(e) {
      e.preventDefault()
    }

    function onDragOver(e) {
      e.preventDefault()

    }

    function onDragEnd(e) {
      currentTarget.classList.remove('entering')

      source = null
      sourceIndex = null
      currentIndex = null
      previousIndex = null

      e.target.setAttribute("draggable", false)
    }

    function onDrop(e) {
      e.preventDefault()
      currentTarget.classList.remove('entering')

      source = null
      sourceIndex = null
      currentIndex = null
      previousIndex = null
    }

    return {onDragStart, onDragEnter, onDragOver, onDragLeave, onDragEnd, onDrop}
  }

</script>

<style lang="scss" scoped>
	.g-sections {
		list-style-type: none;
		padding: 0;

		> * {
			cursor: auto;
		}

		> *:last-child {
			border-bottom: 1px solid #E0E0E0;
		}

		&-element {
			transition: 0.3s;
		}
	}

	.entering {
		opacity: 0;
	}
</style>
