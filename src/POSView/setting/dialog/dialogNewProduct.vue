<template>
	<g-dialog v-model="dialogNewProduct" fullscreen scrollable>
		<div class="dialog-product w-100">
			<div class="form">
				<div class="title">
					Create New Product
				</div>
				<div class="input">
					<p-o-s-text-field label="Name" required placeholder="Fill your number"/>
					<p-o-s-select label="Tax Category" :items="items" item-text="value" v-model="selected" append-icon="mdi-chevron-down" required/>
					<p-o-s-text-field label="Product ID" placeholder="Auto generate"/>
					<p-o-s-select label="Product Category":items="items" item-text="value" v-model="selected" append-icon="mdi-chevron-down" required/>
					<p-o-s-text-field label="Product Code" placeholder="Shortcut Key"/>
					<p-o-s-select label="Unit" :items="items2" item-text="value" v-model="selected2" append-icon="mdi-chevron-down"/>
					<div class="row-flex">
						<div class="col-6">
							<p-o-s-text-field label="Price" required placeholder="Fill your number">
								<template v-slot:append>
									<span style="color: #1471ff">€</span>
								</template>
							</p-o-s-text-field>
						</div>
						<div class="col-6">
							<p-o-s-text-field label="Barcode/PLU" placeholder="Fill your number">
								<template v-slot:append>
									<g-icon svg>icon-scanning_barcode</g-icon>
								</template>
							</p-o-s-text-field>
						</div>
					</div>
					<p-o-s-text-field label="Manual Price Input" placeholder="Fill your number"/>
					<p-o-s-select label="Plastic Bottle" placeholder="Select" append-icon="mdi-chevron-down" :items="[]"/>
					<div class="row-flex">
						<div class="col-6">
							<pos-switch dense label="Favorite" :input-value="true"/>
						</div>
						<div class="col-6">
							<pos-switch dense label="Non Refundable" :input-value="true"/>
						</div>
					</div>
					<div class="row-flex justify-between">
						<pos-switch dense label="Active" :input-value="true"/>
						<pos-switch dense label="Show on 'Order Screen'" :input-value="true"/>
					</div>
				</div>
				<div class="accordion">
					<g-expansion accordion v-model="expansionItem" :items="expansions" item-header="name">
					</g-expansion>
				</div>
				<div class="action">
					<g-btn flat background-color="#EFEFEF" text-color="#757575" class="mr-2" width="120">Cancel</g-btn>
					<g-btn flat background-color="blue accent 3" text-color="white">Submit</g-btn>
				</div>
			</div>
			<div class="bg-grey-lighten-1 h-30 pa-2">
				<pos-keyboard-full/>
			</div>
		</div>
	</g-dialog>
</template>

<script>
  import GDialog from '../../../components/GDialog/GDialog';
  import PosKeyboardFull from '../../../POSComponents/PosKeyboardFull';
  import POSTextField from '../../../POSComponents/POSInput/POSTextField';
  import PosSwitch from '../../../POSComponents/PosSwitch';
  import POSSelect from '../../../POSComponents/POSInput/POSSelect';
  import GExpansion from '../../../components/GExpansion/GExpansion';
  import GBtn from '../../../components/GBtn/GBtn';
  import GIcon from '../../../components/GIcon/GIcon';
  export default {
    name: 'dialogNewProduct',
    components: { GIcon, GBtn, GExpansion, POSSelect, PosSwitch, POSTextField, PosKeyboardFull, GDialog },
		data () {
      return {
        selected: null,
				items: [{value: 'Vegetables'}],
        selected2: null,
				items2: [{value: 'Box'}],
				expansions: [
					{ name: 'Multiple Unit' },
					{ name: 'Attributes' },
					{ name: 'More' },
				],
        expansionItem: null
			}
		},
		props: {
      value: null,
		},
		computed: {
      dialogNewProduct: {
        get () {
          return this.value
				},
				set (val) {
          this.$emit('input', val);
				}
			}
		},
		created () {
      this.selected = 'Vegetables';
      this.selected2 = 'Box';
		}
  }
</script>

<style scoped lang="scss">
	.dialog-product {
		display: flex;
		flex-direction: column;
		background-color: white;
		overflow-y: auto;

		.form {
			padding: 48px;

			.title {
				padding-left: 27px;
				font-size: 16px;
				line-height: 20px;
				color: #1d1d26;
				font-weight: 700;
				margin-bottom: 16px;
			}

			.input {
				display: grid;
				grid-gap: 12px 4px;
				grid-template-columns: 39.6% 30.2% 30.2%;
				grid-template-rows: auto auto auto auto;
				padding: 0 48px;
			}

			.g-expansion-group {
				box-shadow: none;

				::v-deep .g-expansion,
				::v-deep .g-expansion > .g-expansion-header {
					border: none;
				}

				::v-deep .g-expansion .g-expansion-content {
					background-color: white;
					border: none;
				}
			}

			.action {
				display: flex;
				justify-content: flex-end;
				padding-right: 48px;
			}
		}
	}
</style>