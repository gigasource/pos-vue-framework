<script>
  import { ref, onMounted, inject } from '@vue/composition-api';
  import { getConnectionPoint } from './ConnectorHelper';

  export default {
    name: 'GConnector2',
    props: {

    },
    setup(props, context) {

      const diagramID = inject('id');

      const connectionPoints = inject('connectionPoint');

      const localConnectionPoints = ref([]);

      function genCircle(cx, cy, r, stroke, strokeWidth, fill) {
        return <circle class="g-connection-point" cx={cx} cy={cy} r={r} stroke={stroke} stroke-width={strokeWidth} fill={fill}/>
      }

      onMounted(function () {
        this.$nextTick(function () {
          localConnectionPoints.value = getConnectionPoint(this.$slots.default["0"].elm)
          connectionPoints.value = [...connectionPoints.value, ...localConnectionPoints.value]
        })
      })

      function genGroup() {
        return <g>
					{
					  localConnectionPoints.value.map(connectionPoint => genCircle(
					    connectionPoint.x, connectionPoint.y, 10, undefined, undefined, 'transparent'
						))
					}
          <portal to={diagramID.value}>
            {context.slots.default ? context.slots.default() : undefined}
          </portal>
        </g>
      }

      return {
        genGroup,
      }
    },
    render() {
      return this.genGroup()
    }
  }
</script>
<style scoped lang="scss">
	.g-connection-point:hover {
		fill: green;
		fill-opacity: 0.5;
	}
</style>