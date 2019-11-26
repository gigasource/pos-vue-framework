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

            const {onDragStart, onDragEnter, onDragOver, onDrop} = getDndEventHandler(props, context, sections)

            const genContentSlotDefault = () => {
                //return _.compact(_.flatten(_.zip(headerNodes, itemNodes)))
                return sections.value.map((section, index) => {
                    return <div
                        vOn:dragstart={(e) => onDragStart(e, index)}
                        vOn:dragenter={(e) => onDragEnter(e, index)}
                        vOn:dragover={onDragOver}
                        vOn:drop={(e)=>onDrop(e,index)}
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
            console.log('re-render')
            return this.genSections()
        }
    }

    function getDndEventHandler(props, context, sections) {

        let source = null

        function onDragStart(e,index) {
            //console.log(e.target.childNodes)
            source = index
            e.target.classList.add('.dragging')
            e.target.addEventListener('dragend', onDragEnd)
            e.dataTransfer.setData('sourceHTML', e.target.innerHTML)
        }

        function onDragEnter(e, index) {
            console.log('enter')
            e.preventDefault()
						//sections.value[index-1] = sections.value[index]
            //todo swap innerHTML ?
        }

        function onDragOver(e) {
            e.preventDefault()
        }

        function onDragEnd(e) {
            e.target.classList.remove('.dragging')
        }

        function onDrop(e, index) {
            console.log('drop')
            let ground = sections.value[index]
            sections.value[index] = sections.value[source]
						sections.value[source] = ground
            //sections.value[0] = sections.value[1]
            //sections.value[1] = x
            //console.log(sections.value)
            //source.innerHTML = e.currentTarget.innerHTML
            //e.currentTarget.innerHTML = e.dataTransfer.getData('sourceHTML')
        }

        return {onDragStart, onDragEnter, onDragOver, onDrop}
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
