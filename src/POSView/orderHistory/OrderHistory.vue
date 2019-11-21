<template>
	<g-grid-layout class="wrapper" :layout="Layout" :displayPreviewColor="false">
		<div area="table">
			<g-simple-table striped text-center>
				<template v-slot:default>
					<thead class="table-header">
					<tr height="60">
						<th class="text-left"><code-look-up text="Order No."/></th>
						<th class="text-left"><dialog-picker/></th>
						<th class="text-left"><code-look-up text="Barcode"/></th>
						<th class="text-left"><amount-filter/></th>
						<th class="text-left"><code-look-up text="Staff"/></th>
						<th class="text-left"><code-look-up text="Info"/></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="row in tableBody" :key="row.no">
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
		<div area="order" class="order">
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
			<g-btn class="btn" backgroundColor="#2979FF" textColor="#FFFFFF">
				<g-icon svg>icon-print2</g-icon>
				<span>Print</span>
			</g-btn>
		</div>
	</g-grid-layout>
</template>

<script>
    import {reactive, ref} from "@vue/composition-api";
    //import components
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import Layout from "./order.json"
    import GSimpleTable from "../../components/GSimpleTable/GSimpleTable";
    import GDialog from "../../components/GDialog/GDialog";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";
    //import other components
    import DialogPicker from "./DialogPicker";
    import CodeLookUp from "./CodeLookUp";
    import AmountFilter from "./AmountFilter";

    export default {
        name: "OrderHistory",
        components: {
            DialogPicker,
            CodeLookUp,
						AmountFilter,

            GGridLayout,
            GSimpleTable,
            GDialog,
            GBtn,
            GIcon,
        },
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

<style scoped lang="scss">
	.wrapper {
		height: 100%;
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
		//box-shadow: -1px 0px 6px rgba(0, 0, 0, 0.25);
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