<template>
	<div>
		<g-dialog v-model="dialog">
			<template v-slot:activator="{ toggleDialog }">
				<g-btn flat text-color="#1271FF" @click="toggleDialog">
					<p>{{text}}</p>
					<g-icon svg size="10" right>icon-zoom</g-icon>
				</g-btn>
			</template>
			<g-grid-layout :layout="Layout" :displayPreviewColor="false" style="height: 443px; width: 522px">
				<div area="content" style="background-color: #FFFFFF">
					<div area="form">
            <div area="close">

            </div>
						<div area="text">
							<p>Barcode Lookup</p>
						</div>
						<div area="inputs">
							<g-text-field v-model="input" readOnly filled solo></g-text-field>
						</div>
						<div area="form-btns">
							<g-btn @click="dialog = false">Cancel</g-btn>
							<g-btn @click="dialog = false">OK</g-btn>
						</div>
					</div>
				</div>
				<div area="number" style="background-color: #BDBDBD">
					<div area="buttons">
						<div area="btnClr">
							<g-btn height="100%" width="100%" @click="clearInput">C</g-btn>
						</div>
						<div area="btnComma">
							<g-btn height="100%" width="100%" @click="numberClick('.')">.</g-btn>
						</div>
						<div v-for="btn in btns" :area="`btn${btn.value}`">
							<g-btn height="100%" width="100%" @click="numberClick(btn.value)">{{btn.value}}</g-btn>
						</div>
					</div>
				</div>
			</g-grid-layout>
		</g-dialog>
	</div>
</template>

<script>
    import {reactive, ref} from "@vue/composition-api";
    import GDialog from "../../components/GDialog/GDialog";
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import Layout from "./codelookupLayout"
    import GTextField from "../../components/GInput/GTextField";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";

    export default {
        name: "CodeLookUp",
        components: {GTextField, GDialog, GGridLayout, GBtn, GIcon},
        props: {
            text: String,
        },
        setup() {
            const dialog = ref(false)
            const btns = ref([
                {value: '0'},
                {value: '1'},
                {value: '2'},
                {value: '3'},
                {value: '4'},
                {value: '5'},
                {value: '6'},
                {value: '7'},
                {value: '8'},
                {value: '9'},
            ])
            const input = ref('')

            function numberClick(num) {
                input.value = input.value + num
            }

            function clearInput() {
                input.value = ''
            }

            return {
                Layout,
                dialog,
                btns,
                input,
                //handler
                numberClick,
                clearInput,
            }
        }
    }
</script>

<style scoped>
</style>