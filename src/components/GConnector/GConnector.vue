<template>
	<svg width="1000" height="1000" ref="svg">
	</svg>
</template>
<script>
  import { Point , Rectangle } from "./CoordinateSystem"
	import { createCircle } from './ConnectorHelper';
  import { computed, ref, reactive, watch, onMounted, onBeforeUnmount, onUpdated } from '@vue/composition-api';

  export default {
    name: 'GConnector',
    props: {
			connectionPoints: Array,
			connectionPointRadius: {
			  type: Number,
				default: 5
			}
		},
		setup (props, context) {

			const connectionRegions = computed(() => {
			  return props.connectionPoints.map(connectionPoint => new Rectangle(
			    connectionPoint.y - props.connectionPointRadius,
					connectionPoint.x - props.connectionPointRadius,
          connectionPoint.y + props.connectionPointRadius,
          connectionPoint.x + props.connectionPointRadius,
				))
			})

      let startPoint
			let endPoint
			let startControlPoint
			let endControlPoint

      const isDrag = ref(false)

      let path
			let endCircle

      function drawStart(e) {
        e.preventDefault();

        // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				// svg.setAttribute('width', '1000')
        // svg.setAttribute('height', '1000')
				// svg.style.position = 'fixed'
				// svg.style.top = 0
				// svg.style.left = 0
				const svg = context.refs.svg

				const mousePoint = new Point(e.pageX, e.pageY)

				for (let connectionRegion of connectionRegions.value) {
				  if (mousePoint.isInside(connectionRegion)) {
            startPoint = props.connectionPoints[connectionRegions.value.indexOf(connectionRegion)]
            const circle = createCircle(startPoint.x, startPoint.y, 5, 'green', 2, 'none')

            path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('stroke', 'green')
            path.setAttribute('stroke-width', '2')
            path.setAttribute('fill', 'none')

            endCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            endCircle.setAttribute('r', "5")
            endCircle.setAttribute('stroke', 'green')
            endCircle.setAttribute('stroke-width', '2')
            endCircle.setAttribute('fill', 'none')

            svg.appendChild(circle)
            svg.appendChild(path)
            svg.appendChild(endCircle)
            //document.body.appendChild(svg)
            isDrag.value = true;
          }
				}
			}

      function draw(e) {
        if (isDrag.value) {
          endPoint = new Point(e.pageX, e.pageY);
					startControlPoint = new Point((startPoint.x + endPoint.x)/2, startPoint.y)
					endControlPoint = new Point((startPoint.x + endPoint.x)/2, endPoint.y)

          const d = `M${startPoint.x} ${startPoint.y} C${startControlPoint.x} ${startControlPoint.y}, ${endControlPoint.x} ${endControlPoint.y}, ${endPoint.x} ${endPoint.y}`
          path.setAttribute('d', d)
          endCircle.setAttribute('cx', endPoint.x)
					endCircle.setAttribute('cy', endPoint.y)
				}
			}

			function drawEnd(e) {
        const svg = context.refs.svg
        const mousePoint = new Point(e.pageX, e.pageY)

        for (let connectionRegion of connectionRegions.value) {
          if (mousePoint.isInside(connectionRegion)) {
            endPoint = props.connectionPoints[connectionRegions.value.indexOf(connectionRegion)]
            startControlPoint = new Point((startPoint.x + endPoint.x)/2, startPoint.y)
            endControlPoint = new Point((startPoint.x + endPoint.x)/2, endPoint.y)
            const d = `M${startPoint.x} ${startPoint.y} C${startControlPoint.x} ${startControlPoint.y}, ${endControlPoint.x} ${endControlPoint.y}, ${endPoint.x} ${endPoint.y}`
            path.setAttribute('d', d)
            endCircle.setAttribute('cx', endPoint.x)
            endCircle.setAttribute('cy', endPoint.y)
            isDrag.value = false
            path = undefined
            endCircle = undefined
						return
					}
        }

        svg.removeChild(path)
				svg.removeChild(endCircle)
        isDrag.value = false
				path = undefined
				endCircle = undefined
			}

      document.addEventListener('mousedown', drawStart)
      document.addEventListener('mousemove', draw)
			document.addEventListener('mouseup', drawEnd)

			// onMounted(() => {
      //   const svg = context.refs.svg
      //   svg.addEventListener('mousedown', drawStart)
      //   svg.addEventListener('mousemove', draw)
      //   svg.addEventListener('mouseup', drawEnd)
      // })

			watch(() => props.connectionPoints, () => {
        const svg = context.refs.svg
			  for (let connectionPoint of props.connectionPoints) {
			    svg.appendChild(createCircle(connectionPoint.x, connectionPoint.y, props.connectionPointRadius, 'green', 2, 'none'));
				}
			}, {lazy: true, deep: true})

			return {
			  connectionRegions
			}
		}

  }
</script>
<style scoped>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
	}
</style>