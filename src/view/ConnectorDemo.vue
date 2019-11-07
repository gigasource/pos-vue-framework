<template>
		<g-diagram>
			<g-connector2 v-model="dataA" point-radius="15" show-point point-position="x">
				<div id="div1">
					{{ dataA }}
				</div>
			</g-connector2>
			<g-connector2 v-model="dataB" point-color="red" path-color="red" point-radius="15" show-point point-position="y">
			<div id="div2">
				{{ dataB }}
			</div>
		</g-connector2>
		</g-diagram>
</template>
<script>
  import { ref, reactive, computed, onMounted } from '@vue/composition-api'
  import GConnector2 from '../components/GConnector/GConnector2';
  import GDiagram from '../components/GConnector/GDiagram';
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'ConnectorDemo',
    components: { GDiagram, GConnector2, Fragment },
    props: {},
    setup(props, context) {
			const dataA = ref('A')
			const dataB = ref('B')

			return {
				dataA,
				dataB
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
		color: white;
		font-size: 24px;
		background-color: darkgray;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#div2 {
		position: absolute;
		top: 200px;
		left: 700px;
		width: 100px;
		height: 100px;
		color: white;
		font-size: 24px;
		background-color: darkgray;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>