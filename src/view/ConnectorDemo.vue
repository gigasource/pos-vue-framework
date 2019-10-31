<template>
	<div>
		<div id="div1" ref="div1"></div>
		<div id="div2" ref="div2"></div>
		<g-connector :connection-points="connectionPoint"></g-connector>
	</div>
</template>
<script>
  import GConnector from '../components/GConnector/GConnector';
  import { getConnectionPoint } from '../components/GConnector/ConnectorHelper';
  import { ref, reactive, computed, onMounted } from '@vue/composition-api'

  export default {
    name: 'ConnectorDemo',
    components: { GConnector },
    props: {},
    setup(props, context) {
      const connectionPoint = ref([]);

			onMounted(() => {
			  connectionPoint.value = [...getConnectionPoint(context.refs.div1), ...getConnectionPoint(context.refs.div2)]
			})

			return {
			  connectionPoint
			}
		}
  }
</script>
<style scoped>
	#div1 {
		position: absolute;
		top: 500px;
		left: 100px;
		width: 100px;
		height: 100px;
		background-color: darkgray;
	}
	#div2 {
		position: absolute;
		top: 200px;
		left: 700px;
		width: 100px;
		height: 100px;
		background-color: darkgray;
	}
</style>