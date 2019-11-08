<template>
		<g-diagram width="500" height="500" position="absolute" top="100" left="300">
			<g-connector v-model="dataA" point-radius="15" show-point point-position="x">
				<div id="div1">
					{{ dataA }}
				</div>
			</g-connector>
			<g-connector v-model="dataB" point-color="red" path-color="red" point-radius="15" show-point point-position="y">
			<div id="div2">
				{{ dataB }}
			</div>
		</g-connector>
		</g-diagram>
</template>
<script>
  import { ref, reactive, computed, onMounted } from '@vue/composition-api'
  import GConnector from '../components/GConnector/GConnector';
  import GDiagram from '../components/GConnector/GDiagram';
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'ConnectorDemo',
    components: { GDiagram, GConnector, Fragment },
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
		top: 100px;
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
		top: 300px;
		left: 300px;
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