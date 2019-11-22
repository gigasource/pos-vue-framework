<template>
	<g-dialog v-model="dialogProductLookup" fullscreen>
		<div class="dialog-lookup w-100">
			<g-toolbar class="header" color="grey lighten 3" elevation="0">
				<g-text-field outlined clearable class="w-50" style="color: #1d1d26" clear-icon="cancel" v-model="productLookup" @focus="showKeyboard = true"></g-text-field>
				<g-spacer/>
				<g-btn icon style="box-shadow: none; border-radius: 50%" @click="dialogProductLookup = false">
					<g-icon>clear</g-icon>
				</g-btn>
			</g-toolbar>
			<g-simple-table fixed-header :class="tbLookup">
				<thead>
				<tr>
					<th>Name</th>
					<th>Barcode</th>
					<th>Unit</th>
					<th>Attribute</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(product, i) in products" :key="i">
					<td>{{product.name}}</td>
					<td>{{product.barcode ? product.barcode : '-'}}</td>
					<td>{{product.unit ? product.unit : '-s'}}</td>
					<td>
						<div v-if="product.attribute">
							<span v-for="(val, attr) in product.attribute" class="td-attr">
								{{attr}}: {{val}}
							</span>
						</div>
						<div v-else>-</div>
					</td>
				</tr>
				</tbody>
			</g-simple-table>
			<div v-show="showKeyboard" class="keyboard-wrapper">
				<pos-keyboard-full v-model="productLookup"/>
			</div>
		</div>
	</g-dialog>
</template>

<script>
  import GDialog from '../../components/GDialog/GDialog';
  import GToolbar from '../../components/GToolbar/GToolbar';
  import GTextField from '../../components/GInput/GTextField';
  import GSpacer from '../../components/GLayout/GSpacer';
  import GBtn from '../../components/GBtn/GBtn';
  import GIcon from '../../components/GIcon/GIcon';
  import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
  import PosKeyboardFull from '../../POSComponents/PosKeyboardFull';

  export default {
    name: 'dialogProductLookup',
    components: { PosKeyboardFull, GSimpleTable, GIcon, GBtn, GSpacer, GTextField, GToolbar, GDialog },
    props: {
      value: Boolean,
    },
    data() {
      return {
        productLookup: 'Pro',
        showKeyboard: false,
        products: [
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
          { name: 'Product Name 01', unit: 'Box' },
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
          { name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths' } },
        ],
      }
    },
    computed: {
      tbLookup() {
        return this.showKeyboard ? 'tbLookup' : 'tbLookup__full'
      },
      dialogProductLookup: {
        get () {
          return this.value;
				},
				set (value) {
          this.$emit('input', value);
				}
			}
		},
  }
</script>

<style scoped lang="scss">
	.dialog-lookup {
		min-height: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;
		border: 16px solid rgba(107, 111, 130, 0.95);

		.g-tf-wrapper fieldset {
			border-radius: 0;
			border: 2px solid #BDBDBD;
		}

		.g-toolbar {
			flex: 0;
		}

		.g-table {
			&.tbLookup {
				height: calc(65% - 64px) !important;
				flex-basis: calc(65% - 64px);
				flex-grow: 0;
				flex-shrink: 0;

				&__full {
					flex-basis: calc(100% - 64px);
				}
			}

			thead tr th {
				font-size: 13px;
				line-height: 16px;
				color: rgba(29, 29, 38, 0.5);
				text-align: left;
			}

			tbody tr td {
				height: 60px;
			}

			.td-attr:not(:last-child) {
				border-right: 1px solid #979797;
				padding-right: 16px;
			}

			.td-attr:not(:first-child) {
				padding-left: 8px;
			}
		}

		::v-deep .keyboard-wrapper {
			flex-basis: 35%;
			height: 35%;
			padding: 16px;
			background-color: #BDBDBD;

			.key {
				border-radius: 0;
				font-size: 24px;
			}
		}
	}
</style>