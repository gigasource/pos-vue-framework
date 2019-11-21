<template>
	<g-dialog v-model="dialog">
		<template v-slot:activator="{ toggleDialog }">
			<g-btn flat text-color="#1271FF" @click="toggleDialog">
				<span>Amount</span>
				<g-icon svg size="10" right>icon-path-filter</g-icon>
			</g-btn>
		</template>
		<div style="width: 722px; height: 260px; background-color: #FFFFFF">
			<pos-range-slider/>
			<g-btn flat right @click="dialog = false">OK</g-btn>
		</div>
	</g-dialog>
</template>

<script>
    import {ref} from "@vue/composition-api";
    import GDialog from "../../components/GDialog/GDialog";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";
    import PosRangeSlider from "../../POSComponents/POSInput/POSRangeSlider";

    export default {
        name: "AmountFilter",
        components: {GDialog, GBtn, GIcon, PosRangeSlider},
        setup() {
            const dialog = ref(false)

            return {
                dialog
            }
        }
    }
</script>