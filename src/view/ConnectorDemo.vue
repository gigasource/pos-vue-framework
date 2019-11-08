<template>
	<g-diagram width="80%" height="80%" position="absolute" top="10%" left="10%">
		<div id="props">
			<p>props</p>
			<g-connector v-for="prop in Props" v-model="prop.value" point-radius="10" point-position="right" path-color="#118f41">
				<div>
					{{ prop.value }}
				</div>
			</g-connector>
		</div>
		<div id="event">
			<p>event</p>
			<g-connector v-for="event in Events" v-model="event.value" point-radius="10" path-color="#0e5bad" point-position="right">
				<div>
					{{ event.value }}
				</div>
			</g-connector>
		</div>
		<div id="context">
			<p>context</p>
			<g-connector v-for="context in Contexts" v-model="context.value" point-radius="10" path-color="#d97d14" point-position="left">
				<div>
					{{ context.value }}
				</div>
			</g-connector>
		</div>
		<div id="data">
			<p>data</p>
			<g-connector v-for="data in Datas" v-model="data.value" point-radius="10" path-color="#7d0f85" point-position="left">
				<div>
					{{ data.value }}
				</div>
			</g-connector>
		</div>
	</g-diagram>
</template>
<script>
  import { ref, reactive, computed, onMounted } from '@vue/composition-api'
  import GConnector from '../components/GConnector/GConnector';
  import GDiagram from '../components/GConnector/GDiagram';

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

			return {
				Props,
				Contexts,
				Events,
				Datas
			}
		}
  }
</script>
<style scoped lang="scss">

	#props {
		border: 1px solid #118f41;
		width: 30%;
		height: 40%;
		position: absolute;
		top: 5%;
		left: 10%;
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
		width: 30%;
		height: 40%;
		position: absolute;
		top: 55%;
		left: 10%;
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
		width: 30%;
		height: 40%;
		position: absolute;
		top: 5%;
		left: 60%;
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
		width: 30%;
		height: 40%;
		position: absolute;
		top: 55%;
		left: 60%;
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