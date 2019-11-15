<template>
	<div>
		<p>Connection: {{connections}}</p>
		<g-diagram width="80%" height="80%" position="absolute" top="10%" left="10%">
			<template v-slot:default="{ dragStart }">
				<div id="props" @mousedown="dragStart">
					<p>props</p>
					<g-connector v-for="prop in Props"
											 v-model="prop.value"
											 point-radius="10"
											 point-position="x"
											 path-color="#118f41"
											 show-point
											 @connected="y => connect(prop.value, y)"
											 @disconnected="y => disconnect(prop.value, y)" :key="prop.value">
						<div>
							{{ prop.value }}
						</div>
					</g-connector>
				</div>
				<div id="event" @mousedown="dragStart">
					<p>event</p>
					<g-connector v-for="event in Events"
											 v-model="event.value"
											 point-radius="10"
											 path-color="#0e5bad"
											 point-position="x"
											 show-point
											 @connected="y => connect(event.value, y)"
											 @disconnected="y => disconnect(event.value, y)" :key="event.value">
						<div>
							{{ event.value }}
						</div>
					</g-connector>
				</div>
				<div id="context" @mousedown="dragStart">
					<p>context</p>
					<g-connector v-for="context in Contexts"
											 v-model="context.value"
											 point-radius="10"
											 path-color="#d97d14"
											 point-position="x"
											 show-point
											 @connected="y => connect(context.value, y)"
											 @disconnected="y => disconnect(context.value, y)" :key="context.value">
						<div>
							{{ context.value }}
						</div>
					</g-connector>
				</div>
				<div id="data" @mousedown="dragStart">
					<p>data</p>
					<g-connector v-for="data in Datas"
											 v-model="data.value"
											 point-radius="10"
											 path-color="#7d0f85"
											 point-position="x"
											 show-point
											 @connected="y => connect(data.value, y)"
											 @disconnected="y => disconnect(data.value, y)" :key="data.value">
						<div>
							{{ data.value }}
						</div>
					</g-connector>
				</div>
			</template>
		</g-diagram>
	</div>
</template>
<script>
  import { ref, reactive, computed, onMounted } from '@vue/composition-api'
  import GConnector from '../components/GConnector/GConnector';
  import GDiagram from '../components/GConnector/GDiagram';
  import { getElementPosition } from '../utils/helpers';

  export default {
    name: 'ConnectorDemo',
    components: { GDiagram, GConnector },
    props: {},
    setup(props, context) {
			const Props = ref([
				{
				  value: 'A'
				},
        {
          value: 'B'
        },
        {
          value: 'C'
        }
			])

      const Events = ref([
        {
          value: 'D'
        },
        {
          value: 'E'
        },
        {
          value: 'F'
        }
      ])

      const Contexts = ref([
        {
          value: 'G'
        },
        {
          value: 'H'
        },
        {
          value: 'I'
        }
      ])

      const Datas = ref([
        {
          value: 'J'
        },
        {
          value: 'K'
        },
        {
          value: 'L'
        }
      ])

			const connections = ref([])

			function test() {
			  console.log('ok')
			}

			function connect(x, y) {
				connections.value.push([x, y])
			}

			function disconnect(x, y) {
			  connections.value.splice(connections.value.findIndex(connection => connection[0] === x && connection[1] === y), 1)
			}

			return {
				Props,
				Contexts,
				Events,
				Datas,
				connections,
				connect,
				disconnect
			}
		}
  }
</script>
<style scoped lang="scss">

	#props {
		border: 1px solid #118f41;
		width: 240px;
		height: 240px;
		position: absolute;
		top: 30px;
		left: 80px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-around;

		> div {
			//width: 80%;
			height: 25%;
			font-size: 24px;
			border: 1px solid #118f41;
			//background-color: darkgray;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 5%
		}

		> p {
			padding: 10px;
			font-size: 1.2em;
		}
	}

	#event {
		border: 1px solid #0e5bad;
		width: 240px;
		height: 240px;
		position: absolute;
		top: 330px;
		left: 80px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-around;

		> div {
			//width: 80%;
			height: 25%;
			font-size: 24px;
			border: 1px solid #0e5bad;
			//background-color: darkgray;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 5%
		}

		> p {
			padding: 10px;
			font-size: 1.2em;
		}
	}

	#context {
		border: 1px solid #d97d14;
		width: 240px;
		height: 240px;
		position: absolute;
		top: 30px;
		left: 480px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-around;

		> div {
			//width: 80%;
			height: 25%;
			font-size: 24px;
			border: 1px solid #d97d14;
			//background-color: darkgray;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 5%
		}

		> p {
			padding: 10px;
			font-size: 1.2em;
		}
	}

	#data {
		border: 1px solid #7d0f85;
		width: 240px;
		height: 240px;
		position: absolute;
		top: 330px;
		left: 480px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-around;

		> div {
			//width: 80%;
			height: 25%;
			font-size: 24px;
			border: 1px solid #7d0f85;
			//background-color: darkgray;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 5%
		}

		> p {
			padding: 10px;
			font-size: 1.2em;
		}
	}
</style>