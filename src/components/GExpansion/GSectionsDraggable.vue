<script>
    import _ from 'lodash'
    import {getExpansionModel} from './GExpansionFactory';
    import {provide} from '@vue/composition-api';
    import GSectionsHeader from './GSectionsHeader';
    import GSectionsItem from './GSectionsItem';
    import {ref} from '@vue/composition-api';

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
        },
        setup(props, context) {
            const {model, toggleItem, isActiveItem} = getExpansionModel(props, context)

            provide('toggleItem', toggleItem)
            provide('isActiveItem', isActiveItem)

            let headerNodes = []
            let itemNodes = []

            if (!props.itemHeaders) {
                headerNodes = _.filter(context.parent.$children[0].$slots.default, node => node.tag && node.tag.indexOf('GSectionsHeader') > -1)
                itemNodes = _.filter(context.parent.$children[0].$slots.default, node => node.tag && node.tag.indexOf('GSectionsItem') > -1)

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
                props.itemHeaders.map((header, index) => {
                    headerNodes.push(
                        <g-sections-header item={index + 1}
                                           header-text={header}/>
                    )
                    itemNodes.push(
                        <g-sections-item item={index + 1}>
                            {context.slots[header] ? context.slots[header]() : undefined}
                        </g-sections-item>
                    )
                })
            }

            const sections = ref(_.zip(headerNodes, itemNodes))
            const {onDragStart, onDragEnter, onDragOver, onDragLeave, onDragEnd, onDrop} = getDndEventHandler(props, context, sections.value)

            const genContent = () => {
                //return _.compact(_.flatten(_.zip(headerNodes, itemNodes)))
                return sections.value.map((section, index) => {
                    return <div
                        class={['g-sections-element', {'g-sections-element__active': isActiveItem(section[0].componentOptions.propsData.item)}]}
                        vOn:dragstart={(e) => onDragStart(e, index)}
                        vOn:dragenter={(e) => onDragEnter(e, index)}
                        vOn:dragover={onDragOver}
                        vOn:dragleave={(e) => onDragLeave(e, index)}
                        vOn:dragen={onDragEnd}
                        vOn:drop={(e) => onDrop(e, index)}
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

            return {
                genSections
            }
        },

        render() {
            return this.genSections()
        }
    }

    function getDndEventHandler(props, context, sections) {

        let source = null
        let sourceIndex = null
        let currentIndex = null
        let previousIndex = null

        let previousTarget = null
        let currentTarget = null

        function onDragStart(e, index) {
            source = sections[index]
            sourceIndex = index
            e.target.addEventListener('dragend', onDragEnd)
            e.dataTransfer.setData('sourceHTML', e.target.innerHTML)
        }

        function onDragEnter(e, index) {
            previousTarget = currentTarget
            if (previousTarget) previousTarget.classList.remove('entering')
            currentTarget = e.currentTarget
            currentTarget.classList.add('entering')

            e.preventDefault()
            previousIndex = currentIndex
            currentIndex = index
            sections[previousIndex] = sections[currentIndex]
            sections[index] = source
            sections.splice()
        }

        function onDragLeave(e, index) {
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

        function onDrop(e, index) {
            currentTarget.classList.remove('entering')
            sections[index] = source
            sections.splice()
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
		//display: flex;
		//flex-wrap: wrap;
		//justify-content: center;
		list-style-type: none;
		padding: 0;
		//z-index: -1;

		> * {
			cursor: auto;
		}

		> *:last-child {
			border-bottom: 1px solid #E0E0E0;
		}

		.entering {
			opacity: 0;
		}
	}
</style>
