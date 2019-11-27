<script>
    import _ from 'lodash'
    import {getExpansionModel} from './GExpansionFactory';
    import {provide} from '@vue/composition-api';
    import GSectionsHeader from './GSectionsHeader';
    import GSectionsItem from './GSectionsItem';
    import {reactive, ref} from '@vue/composition-api';

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
            //console.log(context.parent.$children[0].$slots.default)
            const headerNodes = _.filter(context.parent.$children[0].$slots.default, node => node.tag && node.tag.indexOf('GSectionsHeader') > -1)
            const itemNodes = _.filter(context.parent.$children[0].$slots.default, node => node.tag && node.tag.indexOf('GSectionsItem') > -1)

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

            const sections = ref(_.zip(headerNodes, itemNodes))

            const {onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop} = getDndEventHandler(props, context, sections.value)

            const genContentSlotDefault = () => {
                //return _.compact(_.flatten(_.zip(headerNodes, itemNodes)))
                return sections.value.map((section, index) => {
                    return <div
                        vOn:dragstart={(e) => onDragStart(e, index)}
                        vOn:dragenter={(e) => onDragEnter(e, index)}
                        vOn:dragover={onDragOver}
                        vOn:dragleave={(e) => onDragLeave(e, index)}
                        vOn:drop={(e) => onDrop(e, index)}
                        draggable="true">
                        {section}
                    </div>
                })
            }


            const genContentItemHeader = () => {
                const headerNodes = []
                const itemNodes = []

                props.itemHeaders.map((header, index) => {
                    headerNodes.push(
                        <g-sections-header item={index + 1} header-text={header}/>
                    )
                    itemNodes.push(
                        <g-sections-item item={index + 1}>
                            {context.slots[header] ? context.slots[header]() : undefined}
                        </g-sections-item>
                    )
                })

                return _.compact(_.flatten(_.zip(headerNodes, itemNodes)))
            }

            const genSections = () => {
                return <div class='g-sections'>
                    {context.slots.default ? genContentSlotDefault() : props.itemHeaders ? genContentItemHeader() : undefined}
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

        function onDragStart(e, index) {
            //console.log(e.target.childNodes)
            source = sections[index]
            sourceIndex = index
            e.target.classList.add('.dragging')
            e.target.addEventListener('dragend', onDragEnd)
            e.dataTransfer.setData('sourceHTML', e.target.innerHTML)
        }

        function onDragEnter(e, index) {
            e.preventDefault()
            previousIndex = currentIndex
            currentIndex = index
            //console.log(previousIndex + ' , ' + currentIndex)
            //if (currentIndex > sourceIndex) sections[currentIndex - 1] = sections[currentIndex]
            sections[previousIndex] = sections[currentIndex]
            sections[index] = source
						sections.splice()
            //sections[index-1] = sections[index]
            //todo swap innerHTML ?
        }

        function onDragLeave(e, index) {
            e.preventDefault()
        }

        function onDragOver(e) {
            e.preventDefault()
        }

        function onDragEnd(e) {
            e.target.classList.remove('.dragging')
        }

        function onDrop(e, index) {
            console.log('drop')
            //let ground = sections[index]
            //sections[index] = sections[sourceIndex]
            sections[index] = source
						sections.splice()
            source = null
            sourceIndex = null
            currentIndex = null
            previousIndex = null
            //source.innerHTML = e.currentTarget.innerHTML
            //e.currentTarget.innerHTML = e.dataTransfer.getData('sourceHTML')
        }

        return {onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop}
    }

</script>

<style lang="scss" scoped>
	.g-sections {
		//display: flex;
		//flex-wrap: wrap;
		//justify-content: center;
		list-style-type: none;
		padding: 0;
		z-index: 1;

		> * {
			cursor: auto;
		}

		> *:last-child {
			border-bottom: 1px solid #E0E0E0;
		}
	}
</style>
