<template>
<!--	<div>-->
<!--		<div id="div1" ref="div1"></div>-->
<!--		<div id="div2" ref="div2"></div>-->
<!--		<g-connector :connection-points="connectionPoint"></g-connector>-->
<!--	</div>-->

	<fragment>
		<g-diagram>
			<g-connector2>
				<div id="div1"></div>
			</g-connector2>
			<g-connector2>
			<div id="div2"></div>
		</g-connector2>
		</g-diagram>
	</fragment>
</template>
<script>
  import { getConnectionPoint } from '../components/GConnector/ConnectorHelper';
  import { ref, reactive, computed, onMounted } from '@vue/composition-api'
  import GConnector from '../components/GConnector/GConnector';
  import GConnector2 from '../components/GConnector/GConnector2';
  import GDiagram from '../components/GConnector/GDiagram';
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'ConnectorDemo',
    components: { GDiagram, GConnector, GConnector2, Fragment },
    props: {},
    setup(props, context) {
      //const connectionPoint = ref([]);

			// onMounted(() => {
			//   connectionPoint.value = [...getConnectionPoint(context.refs.div1), ...getConnectionPoint(context.refs.div2)]
			// })

			return {

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