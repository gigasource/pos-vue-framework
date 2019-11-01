<script>
  import { ref, reactive, computed, provide } from '@vue/composition-api';
  import { Point } from './CoordinateSystem';

  export default {
    name: 'GDiagram',
    props: {

		},
    setup (props, context) {
      const diagramId = reactive({
				value: 'null'
			});

      const connectionPoints = reactive({
				value: []
			})

      provide('id', diagramId)
			provide('connectionPoint', connectionPoints)


			// Draw connect line
			const isDraw = ref(false)
      let path
			let endCircle

      let startPoint
      let endPoint
      let startControlPoint
      let endControlPoint

			function drawStart(e) {
        const target = e.target
        if(target.nodeName === 'circle') {
          const diagram = context.refs.diagram
          const mousePoint = new Point(e.pageX, e.pageY)
					startPoint = new Point(+target.getAttribute('cx'), +target.getAttribute('cy'))

          path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute('stroke', 'green')
          path.setAttribute('stroke-width', '2')
          path.setAttribute('fill', 'none')

          endCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          endCircle.setAttribute('r', "5")
          endCircle.setAttribute('stroke', 'green')
          endCircle.setAttribute('stroke-width', '2')
          endCircle.setAttribute('fill', 'none')

          diagram.appendChild(path)
          diagram.appendChild(endCircle)

					isDraw.value = true
				}
			}

			function draw(e) {
        const target = e.target
        if (isDraw.value) {
          endPoint = target.nodeName === 'circle' ? new Point(+target.getAttribute('cx'), +target.getAttribute('cy')) : new Point(e.pageX, e.pageY);
          startControlPoint = new Point((startPoint.x + endPoint.x)/2, startPoint.y)
          endControlPoint = new Point((startPoint.x + endPoint.x)/2, endPoint.y)

          const d = `M${startPoint.x} ${startPoint.y} C${startControlPoint.x} ${startControlPoint.y}, ${endControlPoint.x} ${endControlPoint.y}, ${endPoint.x} ${endPoint.y}`
          path.setAttribute('d', d)
          endCircle.setAttribute('cx', endPoint.x)
          endCircle.setAttribute('cy', endPoint.y)
        }
			}

			function drawEnd(e) {
        if (isDraw.value) {
          const target = e.target
          const diagram = context.refs.diagram
          if (target.nodeName === 'circle') {
            isDraw.value = false
            path = undefined
            endCircle = undefined
          } else {
            diagram.removeChild(path)
            diagram.removeChild(endCircle)
            isDraw.value = false
            path = undefined
            endCircle = undefined
          }
        }
			}

			document.body.addEventListener('mousedown', drawStart)
      document.body.addEventListener('mousemove', draw)
      document.body.addEventListener('mouseup', drawEnd)

      function genSVG() {
        return <div class="g-diagram-container" ref="diagram-container">
					<svg width="1000" height="1000" ref="diagram">
            {context.slots.default ? context.slots.default() : undefined}
        	</svg>
					<portal-target name={diagramId.value} multiple>

					</portal-target>
        </div>
			}

			return {
        diagramId,
				connectionPoints,
        genSVG
			}
		},
		render() {
      return this.genSVG()
		},
		mounted () {
      this.diagramId.value = `${this._uid}`
      console.log(this._uid)
		}
  }
</script>
<style scoped lang="scss">
	.g-diagram-container {

		svg {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 1000;
		}
	}
</style>