<template>
	<div>
		<div style="padding-left: 256px">
			<g-simple-table striped>
					<tr>
						<th>Name</th>
						<th>Icon</th>
					</tr>
					<tr v-for="payment in payments">
						<td>{{payment.name}}</td>
						<td><g-icon svg>{{payment.icon}}</g-icon></td>
					</tr>
			</g-simple-table>
		</div>
		<g-toolbar absolute bottom color="grey lighten 3">
			<g-btn background-color="white" text-color="#1d1d26" class="ma-2">
				<g-icon class="mr-2" svg>
					icon-back
				</g-icon>
				Back
			</g-btn>
			<g-spacer/>
			<g-btn background-color="white" text-color="#1d1d26" class="ma-2">
				<g-icon class="mr-2" color="red" @click="dialogNewPayment = true">
					edit
				</g-icon>
				Edit
			</g-btn>
			<g-btn background-color="white" text-color="#1d1d26" class="ma-2">
				<g-icon class="mr-2" svg @click="dialogDeletePayment = true">
					icon-trash
				</g-icon>
				Delete
			</g-btn>
		</g-toolbar>
		<dialog-delete-payment v-model="dialogDeletePayment"/>
		<dialog-new-payment v-model="dialogNewPayment"/>
	</div>
</template>

<script>
  import GToolbar from '../../../components/GToolbar/GToolbar';
  import GBtn from '../../../components/GBtn/GBtn';
  import GIcon from '../../../components/GIcon/GIcon';
  import GSimpleTable from '../../../components/GSimpleTable/GSimpleTable';
  import GSpacer from '../../../components/GLayout/GSpacer';
  import DialogDeletePayment from '../dialog/dialogDeletePayment';
  import DialogNewPayment from '../dialog/dialogNewPayment';
  export default {
    name: 'viewPayment',
    components: { DialogNewPayment, DialogDeletePayment, GSpacer, GSimpleTable, GIcon, GBtn, GToolbar },
		data() {
      return {
        payments: [
					{ name: 'Cash', icon: 'icon-cash'},
					{ name: 'Card', icon: 'icon-credit_card'},
					{ name: 'Paypal', icon: 'icon-paypal'},
				],
        dialogDeletePayment: false,
        dialogNewPayment: false,
			}
		}
  }
</script>

<style scoped lang="scss">
	.g-table {
		tr th {
			color: #1d1d26;
			text-align: left;
		}

		th:first-child, td:first-child {
			width: 200px;
		}
	}
</style>