<template>
	<div>
		<g-dialog v-model="dialog">
			<template v-slot:activator="{ toggleDialog }">
				<g-btn flat text-color="#1271FF" @click="toggleDialog">
					<p>{{text}}</p>
					<g-icon svg size="10" right>icon-zoom</g-icon>
				</g-btn>
			</template>
			<div class="wrapper">
				<g-icon @click="dialog = false" svg class="icon">icon-close</g-icon>
				<div class="screen">
					<pos-text-field v-model="screenValue" large label="Barcode Lookup" readOnly/>
					<div class="buttons">
						<g-btn @click="dialog = false" backgroundColor="#EFEFEF" text-color="#757575" height="36" width="121"
									 style="margin-right: 8px">Cancel
						</g-btn>
						<g-btn @click="dialog = false" backgroundColor="#2979FF" text-color="#FFFFFF" height="36" width="121">OK
						</g-btn>
					</div>
				</div>
				<div class="keyboard">
					<g-number-keyboard v-model="screenValue" :items="numpad" :template="template"/>
				</div>
			</div>
		</g-dialog>
	</div>
</template>

<script>
    import {reactive, ref} from "@vue/composition-api";
    import GDialog from "../../components/GDialog/GDialog";
    import GTextField from "../../components/GInput/GTextField";
    import GNumberKeyboard from "../../components/GKeyboard/GNumberKeyboard";
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import Layout from "./codelookupLayout"
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";
    import PosTextField from "../../POSComponents/POSInput/POSTextField";

    export default {
        name: "CodeLookUp",
        components: {PosTextField, GDialog, GTextField, GNumberKeyboard, GGridLayout, GBtn, GIcon},
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
            const screenValue = 0
            const numpad = [
                {
                    content: ['7'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key7; border: 1px solid #979797; height: 47px'
                },
                {
                    content: ['8'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key8; border: 1px solid #979797; height: 47px'
                },
                {
                    content: ['9'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key9; border: 1px solid #979797 ;height: 47px'
                },
                {
                    content: ['4'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key4; border: 1px solid #979797; height: 47px;'
                },
                {
                    content: ['5'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key5; border: 1px solid #979797; height: 47px;'
                },
                {
                    content: ['6'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key6; border: 1px solid #979797; height: 47px;'
                },
                {
                    content: ['1'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key1; border: 1px solid #979797; height: 47px;'
                },
                {
                    content: ['2'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key2; border: 1px solid #979797; height: 47px;'
                },
                {
                    content: ['3'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key3; border: 1px solid #979797; height: 47px;'
                },
                {
                    content: ['0'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: key0; border: 1px solid #979797; height: 47px;'
                },
                {
                    content: [','],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value, append) => (value + append),
                    style: 'grid-area: keyP; border: 1px solid #979797; height: 47px;'
                },
                {
                    content: ['X'],
                    classes: 'key-number bg-white ba-blue-9 ba-thin',
                    action: (value) => value.substring(0, value.length - 1),
                    style: 'grid-area: keyX; border: 1px solid #979797; height: 47px;'
                },
            ]

            const template = 'grid-template: "key7 key8 key9" "key4 key5 key6" "key1 key2 key3" "key0 keyP keyX"/ 1fr 1fr 1fr'

            return {
                Layout,
                dialog,
                screenValue,
                numpad,
                template,
            }
        }
    }
</script>

<style scoped lang="scss">
	@import "../../components/GKeyboard/GKeyboard";

	.wrapper {
		width: 522px;
		background-color: #FFFFFF;
		position: relative;

		.icon {
			position: absolute;
			top: 16px;
			right: 16px;
		}
	}

	.screen {
		margin-top: 12px;
		padding: 0 24px;
	}

	.buttons {
		height: 96px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 4px;

		&::v-deep .g-btn {
			border-radius: 2px;
		}
	}

	.keyboard {
		height: 236px;
		background-color: #BDBDBD;
		padding: 20px 127px 13px;

		&::v-deep .number-key-show {
			display: none;
		}
	}
</style>