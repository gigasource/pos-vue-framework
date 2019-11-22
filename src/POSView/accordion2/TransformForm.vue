<template>
	<g-simple-table>
		<thead>
		<tr>Transform</tr>
		</thead>

		<tbody>
		<template v-for="i in position.length">
			<tr>
				<td>
					<p-o-s-text-field :placeholder="position[i-1].placeholder" :prefix="position.prefix"/>
				</td>
			</tr>
		</template>
		<template v-for="i in size.length">
			<tr>
				<td>
					<p-o-s-text-field :placeholder="size[i-1].placeholder" :prefix="size.prefix"/>
				</td>
			</tr>
		</template>
		</tbody>
	</g-simple-table>
</template>
<script>
  import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
  import POSTextField from '../../POSComponents/POSInput/POSTextField';

  export default {
    name: 'TransformForm',
    components: { POSTextField, GSimpleTable },
    data() {
      return {
        position: [{ prefix: 'X', placeholder: 41 }, { prefix: 'Y', placeholder: 711 }],
        size: [{ prefix: 'W', placeholder: 9 }, { prefix: 'H', placeholder: 11 }]
      }
    },
    props: {},
    setup: function (props, context) {

      return {}
    }
  }
</script>
<style scoped>
</style>
