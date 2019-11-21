<template>
	<g-grid-layout class="wrapper" :layout="Layout" :displayPreviewColor="true">
		<div area="table">
			<g-simple-table>

			</g-simple-table>
		</div>
		<div area="order">
		</div>
		<div area="footer">
			<router-link to="/dashboard">
				<g-btn class="btn-back">
					<g-icon svg size="18">icon-back</g-icon>
					<span>Back</span>
				</g-btn>
			</router-link>
			<g-btn class="btn-delete">
				<g-icon svg></g-icon>
				<span>Delete Order</span>
			</g-btn>
			<g-btn class="btn-print">
				<g-icon svg>icon-print</g-icon>
				<span>Print</span>
			</g-btn>
		</div>
	</g-grid-layout>
</template>

<script>
    import {reactive} from "@vue/composition-api";
    //import components
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import Layout from "./order.json"
    import GSimpleTable from "../../components/GTable/GTable";
    import GDialog from "../../components/GDialog/GDialog";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";
    //import other components
    import DialogPicker from "./DialogPicker";
    import CodeLookUp from "./CodeLookUp";

    export default {
        name: "OrderHistory",
        components: {
            DialogPicker,
            CodeLookUp,

            GGridLayout,
            GSimpleTable,
            GDialog,
            GBtn,
            GIcon,
        },
        setup() {
            const dialog = reactive({
                datePicker: false,
            })

            return {
                Layout,
                dialog,
            }
        }
    }
</script>

<style scoped lang="scss">
	.wrapper {
		height: 100%;
	}

	.table {

	}

	.order {

	}

	.footer {
		display: flex;
		align-items: center;
		padding: 0 16px;
	}

	.btn-back, .btn-delete, .btn-print {
    display: flex;
    align-items: center;
    padding: 15px 0;
    height: 40px;
	}
</style>