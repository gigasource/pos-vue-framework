<template>
	<div>
		<div style="padding-left: 256px">
			<g-simple-table>
				<tr>
					<td>Barcode</td>
					<td><g-switch v-model="model"/></td>
				</tr>
				<tr>
					<td>Favorite article</td>
					<td><g-switch v-model="model"/></td>
				</tr>
				<tr>
					<td>Virtual keyboard</td>
					<td><g-switch v-model="model"/></td>
				</tr>
				<tr>
					<td>Cashdrawer opens automatically</td>
					<td><g-switch v-model="model"/></td>
				</tr>
			</g-simple-table>
		</div>
		<g-toolbar absolute bottom color="grey lighten 3">
			<g-btn background-color="white" text-color="#1d1d26">
				<g-icon class="mr-2" svg>
					icon-back
				</g-icon>
				Back
			</g-btn>
		</g-toolbar>
	</div>
</template>

<script>
  import GToolbar from '../../../components/GToolbar/GToolbar';
  import GIcon from '../../../components/GIcon/GIcon';
  import GBtn from '../../../components/GBtn/GBtn';
  import GSimpleTable from '../../../components/GSimpleTable/GSimpleTable';
  import GSwitch from '../../../components/GSwitch/GSwitch';

  export default {
    name: 'viewGeneral',
    components: { GSwitch, GSimpleTable, GBtn, GIcon, GToolbar },
		data () {
       return {
         model: true,
			 }
		}
  }
</script>

<style scoped lang="scss">
	.g-table {
		::v-deep tr td {
			padding: 0 32px;
		}

		::v-deep tr td:first-child {
			width: 200px;
		}

		::v-deep tr:not(:last-child) td {
			border-bottom: 1px solid #D8D8D8;
		}
	}
</style>