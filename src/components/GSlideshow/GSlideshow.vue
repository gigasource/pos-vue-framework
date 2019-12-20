<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { createSlideNode, setSrc, clean, getTransition, getTransitionDuration } from './GSlideshowFactory';
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
			const defaultSlideDuration = 5000

      const computedModel = computed(() => {
        if (model.value.length === 1) return model.value = [...model.value, ...model.value]
        return model.value
      })

			const slideNodes = []
			let nodeFlag = false
			const count = ref(0)
			const nextCount = computed(() => count.value === maxCount.value ? 0 : count.value + 1)
			const maxCount = computed(() => computedModel.value.length - 1)


			const currentItem = computed({get: () => computedModel.value[count.value], set: val => count.value = val})
			const nextItem = computed(() => computedModel.value[nextCount.value])

			let currentTimeout

      const initSlideNodes = () => {
        const container = context.refs.container

        const slideNode1 = createSlideNode()
        const slideNode2 = createSlideNode()

        currentItem.value && setSrc(currentItem.value, slideNode1)
        currentItem.value && setSrc(nextItem.value, slideNode2)

        slideNode2.container.style.display = 'none'

        container.appendChild(slideNode1.container)
        container.appendChild(slideNode2.container)

        slideNodes.push(slideNode1, slideNode2)
      }

			// Init slide nodes when mounted
      onMounted( async () => {
        initSlideNodes()
        if (model.value.length > 0 && slideNodes[0].video.style.display !== "none") await slideNodes[0].video.play()
        count.value = count.value >= maxCount.value ? 0 : count.value + 1
      })

			// Reset slide nodes when source changed
      watch(() => computedModel.value, () => {
        currentItem.value = 0
				clean(slideNodes)
        clearTimeout(currentTimeout)
        nodeFlag = false
        context.root.$nextTick( async () => {
					const firstItem = computedModel.value[0]
					const secondItem = computedModel.value[1]
          const slideNode1 = slideNodes[0]
          const slideNode2 = slideNodes[1]
          setSrc(firstItem, slideNode1)
          setSrc(secondItem, slideNode2)
          slideNode1.container.style.display ='block'
          slideNode2.container.style.display = 'none'
          if (slideNode1.video.style.display !== "none") {
            await slideNode1.video.play()
          }

          count.value = count.value === maxCount.value ? 0 : 1
        })

      }, {deep: true, lazy: true})

			// Sliding logic
      watch(currentItem, (newVal, oldVal) => {
				if (oldVal && newVal) {
          const currentNode = slideNodes[nodeFlag ? 1 : 0]
          const nextNode = slideNodes[nodeFlag ? 0 : 1]
					const duration = (oldVal.duration ? oldVal.duration : currentNode.video.style.display !== 'none' ? Math.round(currentNode.video.duration * 1000) - getTransitionDuration(oldVal.transition, props) : defaultSlideDuration)
					const transitionDuration = getTransitionDuration(newVal.transition, props)
          currentTimeout = setTimeout( () => {
            nextNode.container.style.display = 'block'
            const transition = currentNode.container.animate(...getTransition(newVal.transition, 'out', props))
            nextNode.container.animate(...getTransition(newVal.transition, 'in', props))
            nextNode.video.style.display !== 'none' && (nextNode.video.play())
            transition.onfinish = () => {
              clearTimeout(currentTimeout)
              currentNode.container.style.display = 'none'
              setSrc(nextItem.value, currentNode)
              nodeFlag = !nodeFlag
              count.value = count.value >= maxCount.value ? 0 : count.value + 1
            }
          }, duration - transitionDuration)
        }
			}, {lazy: true})

			// Clean up before destroyed
			onBeforeUnmount(() => {
			  if (context.refs.container.firstChild) {
			    slideNodes.map(slideNode => {
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