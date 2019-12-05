<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { createSlideNode, setSrc, getTransition } from './GSlideshowFactory';
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

			const containerDimension = {
				width: 0,
				height: 0,
			}

			const nodeList = []
			let nodeFlag = false
			const count = ref(0)
			const nextCount = computed(() => count.value === maxCount.value ? 0 : count.value + 1)
			const maxCount = ref(0)

			onMounted(() => {
				maxCount.value = model.value.length - 1
			})

			const currentItem = computed(() => model.value[count.value])
			const nextItem = computed(() => model.value[nextCount.value])

			// Update container dimension when mounted
			onMounted(() => {
			  containerDimension.width = context.refs.container.parentNode.clientWidth
				containerDimension.height = context.refs.container.parentNode.clientHeight
			})

			// Init slide nodes when mounted
      onMounted(() => {
        const container = context.refs.container

        const slideNode1 = createSlideNode(containerDimension)
        const slideNode2 = createSlideNode(containerDimension)

				setSrc(currentItem.value, slideNode1)
				setSrc(nextItem.value, slideNode2)

				slideNode2.container.style.display = 'none'

				container.appendChild(slideNode1.container)
        container.appendChild(slideNode2.container)

        nodeList.push(slideNode1, slideNode2)
        count.value = count.value === maxCount.value ? 0 : count.value + 1
      })

			// Sliding logic
      watch(currentItem, (newVal, oldVal) => {
			  setTimeout(() => {
          const currentNode = nodeList[nodeFlag ? 1 : 0]
          const nextNode = nodeList[nodeFlag ? 0 : 1]
			    nextNode.container.style.display = 'block'
					const transition = currentNode.container.animate(...getTransition(newVal.transition, 'out', props))
					nextNode.container.animate(...getTransition(newVal.transition, 'in', props))
					nextNode.video.style.display !== 'none' && (nextNode.video.play())
					transition.onfinish = () => {
			      currentNode.container.style.display = 'none'
						setSrc(nextItem.value, currentNode)
						nodeFlag = !nodeFlag
            count.value = count.value === maxCount.value ? 0 : count.value + 1
					}
				}, oldVal.duration - (newVal.transition === 'none' ? 0 : props.transitionDuration))
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
</style>