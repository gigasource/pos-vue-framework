<template>
	<g-grid-layout :displayPreviewColor="false" :layout="Layout" class="wrapper">
		<div area="table">
			<g-simple-table striped text-center>
				<template v-slot:default>
					<thead class="table-header">
					<tr height="60">
						<th class="text-left">
							<code-look-up text="Order No."/>
						</th>
						<th class="text-left">
							<date-picker-dialog text="Date Time"/>
						</th>
						<th class="text-left">
							<code-look-up text="Barcode"/>
						</th>
						<th class="text-left">
							<amount-filter/>
						</th>
						<th class="text-left">
							<code-look-up text="Staff"/>
						</th>
						<th class="text-left">
							<code-look-up text="Info"/>
						</th>
					</tr>
					</thead>
					<tbody>
					<tr :key="row.no" v-for="row in tableBody">
						<td>{{row.no}}</td>
						<td>{{row.date}}</td>
						<td>{{row.code}}</td>
						<td>{{row.amount}}</td>
						<td>{{row.staff}}</td>
						<td>{{row.info}}</td>
					</tr>
					</tbody>
				</template>
			</g-simple-table>
		</div>
		<div area="order" class="order" style=" padding: 14px 9px 14px 9px">
			<div>
				<span style="font-weight: bold; font-size: 14px; line-height: 18px; color: #9E9E9E;">Order No.</span>
				<span style="font-size: 20px; font-weight: bold; line-height: 30px; margin-left: 4px">{{orderNumber}}</span>
			</div>
			<div>
				<g-simple-table striped>
					<tr>
						<td>1x</td>
						<td>Tomaten Suppe Hähnch</td>
						<td>€ 100</td>
					</tr>
					<tr>
						<td>2x</td>
						<td>Tomaten Suppe Hähnch</td>
						<td>€ 200</td>
					</tr>
					<tr>
						<td>1x</td>
						<td>Tomaten Suppe Hähnch</td>
						<td> €100</td>
					</tr>
					<tr>
						<td>2x</td>
						<td>Tomaten Suppe Hähnch</td>
						<td>€ 200</td>
					</tr>
				</g-simple-table>
			</div>
			<div style="padding: 6px 8px 8px 8px; border-top: 1px solid #D4D4D4">
				<div style="display: flex">
					<p style="font-weight: bold; font-size: 12px; line-height: 15px; margin: 16px 13px 4px 0">Promotional
						Applied </p>
					<g-spacer/>
					<p style="font-weight: normal; font-size: 12px; line-height: 15px; margin: 16px 0 4px 0">- € 50</p>
				</div>
				<div style="display: flex">
					<p style="font-weight: bold; font-size: 12px; line-height: 15px;color: #FF4452; margin: 4px 13px 4px 0">
						Discount 10% </p>
					<g-spacer/>
					<p style="font-weight: normal; font-size: 12px; line-height: 15px;color: #FF4452; margin: 4px 0px 4px 0">- €
						50</p>
				</div>
				<g-divider/>
				<div style="display: flex">
					<p style="font-weight: bold; font-size: 12px; line-height: 15px;  margin: 13px 13px 4px 0">Sub Total</p>
					<g-spacer/>
					<p style="font-weight: normal; font-size: 12px; line-height: 15px;  margin: 13px 0 4px 0">- € 450</p>
				</div>
				<div style="display: flex">
					<p style="font-weight: bold; font-size: 12px; line-height: 15px;  margin: 7px 13px 13px 0">Tax</p>
					<g-spacer/>
					<p style="font-weight: normal; font-size: 12px; line-height: 15px;  margin: 7px 0px 13px 0">€ 100</p>
				</div>
				<g-divider/>
				<div style="display: flex">
					<p style=" margin: 15px 0 15px 0">Total </p>
					<g-spacer/>
					<p style="color: #1271FF; line-height: 23px; font-weight: bold; margin: 15px 0 15px 0">€ 550</p>
				</div>
				<g-divider/>
			</div>
		</div>
		<div area="footer">
			<router-link to="/dashboard">
				<g-btn class="btn">
					<g-icon svg>icon-back</g-icon>
					<span>Back</span>
				</g-btn>
			</router-link>
			<g-btn class="btn">
				<g-icon svg>icon-remove-square</g-icon>
				<span>Delete Order</span>
			</g-btn>
			<g-btn backgroundColor="#2979FF" class="btn" textColor="#FFFFFF">
				<g-icon svg>icon-print2</g-icon>
				<span>Print</span>
			</g-btn>
		</div>
	</g-grid-layout>
</template>

<script>
    import {reactive, ref} from '@vue/composition-api';
    //import components
    import GGridLayout from '../../components/GGridGenerator/GGridLayout';
    import Layout from './order.json'
    import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
    import GDialog from '../../components/GDialog/GDialog';
    import GBtn from '../../components/GBtn/GBtn';
    import GIcon from '../../components/GIcon/GIcon';
    //import other components
    import CodeLookUp from './CodeLookUp';
    import GDivider from '../../components/GLayout/GDivider';
    import GSpacer from '../../components/GLayout/GSpacer';
    import AmountFilter from './AmountFilter';
    import DatePickerDialog from './DatePickerDialog';

    export default {
        name: 'OrderHistory',
        components: {
            GSpacer,
            GDivider,
            DatePickerDialog,
            CodeLookUp,
            AmountFilter,
            GGridLayout,
            GSimpleTable,
            GDialog,
            GBtn,
            GIcon,
        },
        data: () => ({
            orderNumber: '413431'
        }),
        setup() {
            const dialog = reactive({
                order: false,
                datePicker: false,
                barcode: false,
                amount: false,
                staff: false,
                info: false,
            })

            const dialogComponent = ref([
                {name: '', icon: '', component: ''},
                {name: '', icon: '', component: ''},
                {name: '', icon: '', component: ''},
                {name: '', icon: '', component: ''},
                {name: '', icon: '', component: ''},
                {name: '', icon: '', component: ''},
            ])

            const getNum = () => Math.floor(Math.random() * 100);
            const getBigNum = () => Math.floor(Math.random() * 100000000);
            const tableBody = ref([
                {no: '1201', date: '20.08 11:20', code: getBigNum(), amount: '$ ' + getNum(), staff: 'User1', info: ''},
                {no: '1202', date: '20.08 11:45', code: getBigNum(), amount: '$ ' + getNum(), staff: 'User1', info: ''},
                {no: '1203', date: '20.08 12:37', code: getBigNum(), amount: '$ ' + getNum(), staff: 'User1', info: ''},
                {no: '1204', date: '20.08 13:37', code: getBigNum(), amount: '$ ' + getNum(), staff: 'User1', info: ''},
                {no: '1205', date: '20.08 13:39', code: getBigNum(), amount: '$ ' + getNum(), staff: 'User1', info: ''},
                {no: '1206', date: '20.08 13:49', code: getBigNum(), amount: '$ ' + getNum(), staff: 'User1', info: ''},
                {no: '1207', date: '20.08 15:22', code: getBigNum(), amount: '$ ' + getNum(), staff: 'User1', info: ''},
            ])

            return {
                Layout,
                dialog,
                tableBody,
            }
        }
    }
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100%;
	}

	.order {
		::v-deep .g-table .g-data-table__wrapper {
			td {
				padding-left: 0;
				font-size: 12px;
				line-height: 28px;
				height: 28px;
			}
		}
	}

	.table {
		&-header {

		}

		th {
			font-weight: bold;
			font-size: 14px;
			line-height: 18px;
		}

		td {
			height: 33px !important;
		}
	}

	.order {
		border-left: 1px solid rgba(0, 0, 0, 0.25);
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 14px 0 8px;
		background: #EEEEEE;
		box-shadow: 0px -1px 8px rgba(0, 0, 0, 0.122432);
	}

	.footer :first-child {
		margin-right: auto;
	}

	.btn {
		height: 40px;
		box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
		border-radius: 2px;
		margin: 8px;

		font-weight: bold;
		font-size: 13px !important;

		.g-icon {
			margin-right: 10px;
		}
	}
</style>
