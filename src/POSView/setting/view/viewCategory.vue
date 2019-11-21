<template>
	<div>
		<div style="padding-left: 256px">
			<g-simple-table striped>
					<tr>
						<th>Name</th>
					</tr>
					<tr v-for="(category, i) in categories" :class="[i === 0 && 'bordered']">
						<td>{{category}}</td>
					</tr>
			</g-simple-table>
		</div>
		<g-toolbar absolute bottom color="grey lighten 3">
			<g-btn background-color="white" text-color="#1d1d26" class="mr-2">
				<g-icon class="mr-2" svg>
					icon-back
				</g-icon>
				Back
			</g-btn>
			<g-spacer/>
			<g-btn background-color="white" text-color="#1d1d26" class="mr-2">
				<g-icon class="mr-2" color="red">
					edit
				</g-icon>
				Edit
			</g-btn>
			<g-btn background-color="white" text-color="#1d1d26" class="mr-2">
				<g-icon class="mr-2" svg>
					icon-trash
				</g-icon>
				Delete
			</g-btn>
			<g-btn flat background-color="green" text-color="white" @click="dialogNewCategory = true">
				+ Create new category
			</g-btn>
		</g-toolbar>
		<dialog-new-category v-model="dialogNewCategory"/>
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
  import DialogNewCategory from '../dialog/dialogNewCategory';
  export default {
    name: 'viewCategory',
    components: { DialogNewCategory, DialogNewPayment, DialogDeletePayment, GSpacer, GSimpleTable, GIcon, GBtn, GToolbar },
		data() {
      return {
        categories: ['Sport', 'Computer', 'Food', 'Device'],
        dialogNewCategory: false,
			}
		}
  }
</script>

<style scoped lang="scss">
	.g-table {
		tr th {
			color: #1d1d26;
			text-align: left;
			font-size: 14px;
			line-height: 18px;
		}

		th, td {
			padding-left: 32px;
		}

		td {
			height: 32px;
		}

		&.g-data-table__striped {
			tr:nth-child(even){
				background-color: white
			}

			tr:nth-child(odd):not(:first-child) {
				background-color: #f2f2f2;
			}
		}

		.bordered > td {
			border: 2px solid #1271ff;
			box-shadow: 0 0 4px rgba(18, 113, 255, 0.563019);
		}
	}
</style>