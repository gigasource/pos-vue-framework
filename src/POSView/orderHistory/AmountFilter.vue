<template>
	<g-dialog v-model="dialog">
		<template v-slot:activator="{ toggleDialog }">
			<g-btn flat text-color="#1271FF" @click="toggleDialog">
				<span>Amount</span>
				<g-icon svg size="10" right>icon-path-filter</g-icon>
			</g-btn>
		</template>
		<g-grid-layout class="wrapper" :layout="Layout">
			<div area="header" class="header">
				<span>Price range filter</span>
				<g-icon @click="dialog = false" svg>icon-close</g-icon>
			</div>
			<div area="range">
				<pos-range-slider min="0" max="431"/>
				<div class="range-value">
					<span>0</span>
					<span>€ 431</span>
				</div>
			</div>
			<div area="buttons" class="buttons">
				<g-btn @click="dialog = false" backgroundColor="#EFEFEF" text-color="#757575" height="36" width="121" style="margin-right: 8px">Cancel</g-btn>
				<g-btn @click="dialog = false" backgroundColor="#2979FF" text-color="#FFFFFF" height="36" width="121">OK</g-btn>
			</div>
		</g-grid-layout>
	</g-dialog>
</template>

<script>
    import {ref} from "@vue/composition-api";
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import Layout from "./amountLayout";
    import GDialog from "../../components/GDialog/GDialog";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";
    import PosRangeSlider from "../../POSComponents/POSInput/POSRangeSlider";

    export default {
        name: "AmountFilter",
        components: {GGridLayout, GDialog, GBtn, GIcon, PosRangeSlider},
        setup() {
            const dialog = ref(false)

            return {
                dialog,
                Layout,
            }
        }
    }
</script>

<style scoped lang="scss">
	.wrapper {
		width: 722px;
		height: 260px;
		background-color: #FFFFFF;
	}

	.header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 16px 17px 0 28px;
		font-weight: bold;
		font-size: 16px;
		line-height: 20px;
	}

	.range-value {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 0px 34px 0 28px;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 16px;
	}
</style>