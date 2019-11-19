<template>
	<div>
		<g-dialog v-model="dialogSavedList" overlay-color="#6b6f82" overlay-opacity="0.95" bottom max-width="100%" width="100%" lazy>
			<div class="w-100">
				<g-simple-table striped style="font-size: 14px;">
					<thead>
					<tr>
						<th class="ta-left">Order No.</th>
						<th class="ta-left">Customer</th>
						<th class="ta-right">Qty of Items</th>
						<th class="ta-left">Saved time</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(save, i) in savedLists" :key="i">
						<td class="ta-left text-blue">{{save.id}}</td>
						<td class="ta-left">{{save.customer}}</td>
						<td class="ta-right">{{save.quantity}}</td>
						<td class="ta-left">{{save.time}}</td>
						<td class="ta-left row-flex justify-center align-items-center">
							<g-btn background-color="#1271FF" text-color="white">
								<g-icon>{{require('../../assets/order/open.svg')}}</g-icon>
								Select
							</g-btn>
							<g-btn background-color="#FF4452" text-color="white" class="ml-2" @click="dialogDeleteSave = true">
								<g-icon>{{require('../../assets/delivery/delete.svg')}}</g-icon>
								Delete
							</g-btn>
						</td>
					</tr>
					</tbody>
				</g-simple-table>
				<g-toolbar color="#eee" elevation="2">
					<g-btn background-color="white" class="mr-2">
						<g-icon class="mr-2">{{require('../../assets/order/back.svg')}}</g-icon>
						Back
					</g-btn>
					<g-btn background-color="white" class="mr-2">
						<g-icon class="mr-2">{{require('../../assets/order/folder.svg')}}</g-icon>
						Saved list
					</g-btn>
				</g-toolbar>
			</div>
		</g-dialog>
		<g-dialog v-model="dialogDeleteSave" overlay-color="#6b6f82" overlay-opacity="0.95" width="40%" lazy>
			<g-card class="w-100">
				<g-card-title>
					Confirmation
				</g-card-title>
				<g-card-text>
					Are you sure you want to delete Saved order <b>"431413413413"</b>?
				</g-card-text>
				<g-card-actions>
					<g-btn flat background-color="#efefef">Cancel</g-btn>
					<g-btn flat background-color="red lighten 2" text-color="white">OK</g-btn>
				</g-card-actions>
			</g-card>
		</g-dialog>
	</div>
</template>

<script>
  import GDialog from '../../components/GDialog/GDialog';
  import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
  import GBtn from '../../components/GBtn/GBtn';
  import GIcon from '../../components/GIcon/GIcon';
  import GToolbar from '../../components/GToolbar/GToolbar';
  import GCardTitle from '../../components/GCard/GCardTitle';
  import GCard from '../../components/GCard/GCard';
  import { GCardText, GCardActions } from '../../components/GCard/GCardFunctionalComponent';

  export default {
    name: 'dialogSavedList',
    components: { GCardText, GCardActions, GCard, GCardTitle, GToolbar, GIcon, GBtn, GSimpleTable, GDialog },
    props: {
      value: Boolean,

    },
    data() {
      return {
        dialogDeleteSave: false,
        savedLists: [
          { id: '#037187408', customer: 'Unknown', quantity: 10, time: '3 mins ago' },
          { id: '#037187418', customer: 'David Beckham', quantity: 4, time: '1hr ago' },
          { id: '#037187423', customer: 'Unknown', quantity: 8, time: '08:23' },
        ],
      }
    },
    computed: {
      dialogSavedList: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
	.dialog-wrapper {
		.g-table {
			thead tr th {
				font-size: inherit;
			}

			.g-btn {
				margin: 0 8px;
			}
		}
	}

	.g-card {
		.g-card-title,
		.g-card-text {
			justify-content: center;
			text-align: center;
			color: #1d1d26;
		}

		.g-card-text {
			padding: 32px 64px;
		}

		.g-card-actions {
			justify-content: flex-end;

			.g-btn {
				min-width: 120px !important;
			}
		}
	}
</style>