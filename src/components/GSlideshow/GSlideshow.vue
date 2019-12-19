<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { transitionList, createSlideNode, setSrc, getTransition, clean } from './GSlideshowFactory';
  import { ref, computed, watch, onMounted, onBeforeUnmount } from '@vue/composition-api';

  export default {
    name: 'GSlideshow',
    props: {
      value: Array,
			defaultTransition: {
        type: String,
				default: 'slide'
			},
			transitionDuration: {
        type: Number,
				default: 1500,
			}
		},
    setup (props, context) {
			const model = getInternalValue(props, context)

			const nodeList = []
			let nodeFlag = false
			const count = ref(0)
			const nextCount = computed(() => count.value === maxCount.value ? 0 : count.value + 1)
			const maxCount = computed(() => model.value.length - 1)


			const currentItem = computed({get: () => model.value[count.value], set: val => count.value = val})
			const nextItem = computed(() => model.value[nextCount.value])

			let currentTimeout

			// Init slide nodes when mounted
      onMounted(() => {
        const container = context.refs.container

        const slideNode1 = createSlideNode()
        const slideNode2 = createSlideNode()

				currentItem.value && setSrc(currentItem.value, slideNode1)
				currentItem.value && setSrc(nextItem.value, slideNode2)

				slideNode2.container.style.display = 'none'

				container.appendChild(slideNode1.container)
        container.appendChild(slideNode2.container)

        nodeList.push(slideNode1, slideNode2)
        count.value = count.value === maxCount.value ? 0 : count.value + 1
      })

			//
      watch(() => model.value, () => {
        currentItem.value = 0
				clean(nodeList)
        clearTimeout(currentTimeout)
        nodeFlag = false
        context.root.$nextTick(() => {
					const firstItem = model.value[0]
					const secondItem = model.value[1] ? model.value[1] :firstItem
          const slideNode1 = nodeList[0]
          const slideNode2 = nodeList[1]
          setSrc(firstItem, slideNode1)
          setSrc(secondItem, slideNode2)
          slideNode1.container.style.display ='block'
          slideNode2.container.style.display = 'none'

					count.value = count.value === maxCount.value ? 0 : 1
        })

      }, {deep: true, lazy: true})

			// Sliding logic
      watch(currentItem, (newVal, oldVal) => {
				if (oldVal && newVal) {
          currentTimeout = setTimeout(() => {
            const currentNode = nodeList[nodeFlag ? 1 : 0]
            const nextNode = nodeList[nodeFlag ? 0 : 1]
            nextNode.container.style.display = 'block'
            const transition = currentNode.container.animate(...getTransition(newVal.transition, 'out', props))
            nextNode.container.animate(...getTransition(newVal.transition, 'in', props))
            nextNode.video.style.display !== 'none' && (nextNode.video.play())
            transition.onfinish = () => {
              clearTimeout(currentTimeout)
              currentNode.container.style.display = 'none'
              setSrc(nextItem.value, currentNode)
              nodeFlag = !nodeFlag
              count.value = count.value === maxCount.value ? 0 : count.value + 1
            }
          }, oldVal.duration - (transitionList.includes(newVal.transition) ? props.transitionDuration : 0))
        }
			}, {lazy: true})



			// Clean up before destroyed
			onBeforeUnmount(() => {
			  if (context.refs.container.firstChild) {
			    nodeList.map(slideNode => {
			      context.refs.container.removeChild(slideNode.container)
					})
				}
			})

			// Render functions
      const genSlideshow = () => {
        return <div class="g-slideshow-container" ref="container"/>
      }

			return {
			 	currentItem,
				count,
				genSlideshow
			}
		},
		render () {
      return this.genSlideshow()
		}
  }
</script>
<style scoped lang="scss">
	.g-slideshow {
		&-container {
			position: absolute;
			width: 100%;
			height: 100%;
			overflow: hidden;
			background-color: black;
		}

		&-current {
			position: absolute;
			width: 500px;
			height: 500px;
		}

		&-next {
			position: absolute;
			width: 100%;
			display: none;
		}
	}

	::v-deep img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	::v-deep video {
		width: 100%;
		height: 100%;
	}
</style>