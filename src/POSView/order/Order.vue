<template>
	<div class="row-flex row-12">
		<g-grid-layout :layout="layout" class="order row-12">
			<div area="info__left">
				<p v-if="lastPayment > 0">Last Pay: <span style="color: #1271ff">€ {{convertMoney(lastPayment)}}</span></p>
			</div>
			<div area="info__right">
				<g-avatar size="36">
					<g-icon svg>icon-avatar</g-icon>
				</g-avatar>
				<div class="pa-1" style="line-height: 16px">
					<p class="ta-right fw-700 fs-small">Admin</p>
					<p class="fs-small-2">16:45 &#8231; May 20, 19</p>
				</div>
			</div>
			<g-simple-table area="table" striped fixed-header>
				<thead>
				<tr>
					<th style="color: inherit; padding: 0">
						<div class="row-flex" style="line-height: 1.75">
							<span class="flex-grow-1 pa-2 ta-left">Name</span>
							<span class="w-10 pa-2 ta-center">Unit</span>
							<span class="w-10 pa-2 ta-right">Qty</span>
							<span class="w-12 pa-2 ta-right">Each(€)</span>
							<span class="W-12 pa-2 ta-right">Total(€)</span>
						</div>
					</th>
				</tr>
				</thead>
				<table-expansion-row v-model="product" :items="orderDetail"/>
				<template v-if="orderDetail.length < 12 && orderDetail.length > 0">
					<tr v-for="i in (10 - orderDetail.length)" class="empty-row">
						<td></td>
					</tr>
				</template>
			</g-simple-table>
			<div area="report">
				<div class="report-column">
					<span>Discount (€)</span>
					<span class="number">{{convertMoney(discount)}}</span>
					<span>Tax (€)</span>
					<span class="number">{{convertMoney(tax)}}</span>
				</div>
				<g-divider inset vertical color="#979797"/>
				<div class="report-column">
					<span>Sub Total (€)</span>
					<span class="number">{{convertMoney(subTotal)}}</span>
					<span>Total (€)</span>
					<span class="number__important">{{convertMoney(total)}}</span>
				</div>
			</div>
			<div area="action">
				<g-btn outlined height="100%">F1</g-btn>
				<g-btn outlined height="100%">F2</g-btn>
				<g-btn outlined height="100%">F3</g-btn>
				<g-btn outlined height="100%">F4</g-btn>
			</div>
			<g-toolbar area="toolbar" color="#eee" elevation="0" fill-height>
				<g-btn background-color="white" class="mr-3" style="margin-left: -4px">
					<g-icon class="mr-2" svg>icon-back</g-icon>
					Back
				</g-btn>
				<g-btn background-color="white" class="mr-3">
					<g-icon class="mr-2" svg>icon-menu</g-icon>
					More
				</g-btn>
				<g-badge overlay color="#FF4452">
					<template v-slot:badge>
						<span>2</span>
					</template>
					<g-btn background-color="white" @click="dialogSavedList = true">
						<g-icon class="mr-2" svg>icon-folder</g-icon>
						Saved list
					</g-btn>
				</g-badge>
			</g-toolbar>
			<div area="menu">
				<g-btn v-for="(item, i) in menu" :key="i" elevation="0" background-color="#fff" text-color="#1d1d26" height="100%"
							 @click.stop="selectMenu(item)" :class="[item === menuSelected ? 'menu__active' : '']">
					{{item.title}}
				</g-btn>
			</div>
			<g-scroll-window area="window" :show-arrows="false" v-model="window" elevation="0">
				<g-scroll-window-item v-for="(items, i) in listItems" :key="i">
					<g-btn v-for="(item, i) in items" :key="i" flat :background-color="item.color" height="100%">{{item.title}}</g-btn>
				</g-scroll-window-item>
			</g-scroll-window>
			<g-item-group area="delimeter" :items="listItems" v-model="window" :return-object="false" mandatory>
				<template v-slot:default="{ toggle, active }">
					<template v-for="(item, index) in listItems">
						<g-item :is-active="active(item)" :key="index">
							<g-btn @click="toggle(item)"></g-btn>
						</g-item>
					</template>
				</template>
			</g-item-group>
			<g-number-keyboard area="keyboard" v-model="number" :items="numpad_1" @submit="dialogProductSearch = true">
				<template v-slot:screen>
					<div class="number-key-show ba-thin bg-grey-lighten-3" style="height: calc(16.6667% - 4px)">
						<input id="number_key_output" class="number-key-text col-12 self-center bg-transparent fs-large-2 fw-700 pl-2" style="border: none; outline: none" v-model="number">
					</div>
				</template>
			</g-number-keyboard>
			<div area="buttons">
				<g-btn outlined height="100%">F1</g-btn>
				<g-btn outlined height="100%" @click="dialogChangePrice = true">Change Price</g-btn>
				<g-btn outlined height="100%">Note</g-btn>
				<g-btn outlined height="100%" @click="dialogProductLookup = true">Product Lookup</g-btn>
				<g-btn outlined height="100%" disabled>Disabled Button</g-btn>
				<g-btn outlined height="100%">Discount</g-btn>
				<g-btn outlined height="100%"></g-btn>
				<g-btn outlined height="100%">Plastic Refund</g-btn>
				<g-btn area="btn__big" text background-color="green lighten 1" text-color="white" height="100%" @click="quickCash">Quick Cash</g-btn>
				<g-btn text background-color="orange lighten 1" text-color="white" height="100%">Save</g-btn>
				<g-btn text background-color="blue darken 2" height="100%">
					<router-link to="/payment">
						<span class="text-white">Pay</span>
					</router-link>
				</g-btn>
			</div>
		</g-grid-layout>
		<dialog-saved-list v-model="dialogSavedList"/>
		<dialog-product-lookup v-model="dialogProductLookup"/>
		<dialog-change-price v-model="dialogChangePrice" :product="product" @change-price="changePrice($event)"/>
		<dialog-product-search-result v-model="dialogProductSearch"></dialog-product-search-result>
	</div>
</template>

<script>
  import GBtn from '../../components/GBtn/GBtn';
  import GRow from '../../components/GLayout/GRow';
  import GNumberKeyboard from '../../components/GKeyboard/GNumberKeyboard';
  import GWindow from '../../components/GWindow/GWindow';
  import GWindowItem from '../../components/GWindow/GWindowItem';
  import GItemGroup from '../../components/GItemGroup/GItemGroup';
  import GItem from '../../components/GItemGroup/GItem';
  import GAvatar from '../../components/GAvatar/GAvatar';
  import GImg from '../../components/GImg/GImg';
  import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
  import TableExpansionRow from '../../POSComponents/TableExpansionRow';
  import GDivider from '../../components/GLayout/GDivider';
  import GToolbar from '../../components/GToolbar/GToolbar';
  import GBadge from '../../components/GBadge/GBadge';
  import GIcon from '../../components/GIcon/GIcon';
  import GDialog from '../../components/GDialog/GDialog';
  import GCard from '../../components/GCard/GCard';
  import GCardTitle from '../../components/GCard/GCardTitle';
  import { GCardText, GCardActions } from '../../components/GCard/GCardFunctionalComponent';
  import GScrollWindow from '../../components/GWindow/GScrollWindow';
  import GScrollWindowItem from '../../components/GWindow/GScrollWindowItem';
  import GTextField from '../../components/GInput/GTextField';
  import GSpacer from '../../components/GLayout/GSpacer';
  import GKeyboard from '../../components/GKeyboard/GKeyboard';
  import GRadioGroup from '../../components/GRadio/GRadioGroup';
  import GRadio from '../../components/GRadio/GRadio';
  import DialogSavedList from './dialogSavedList';
  import DialogProductLookup from './dialogProductLookup';
  import DialogChangePrice from './dialogChangePrice';
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';
  import layout from './orderLayout';
	import DialogProductSearchResult from './dialogProductSearchResult';

  export default {
    name: 'Order2',
    components: { DialogProductSearchResult, GGridLayout, DialogChangePrice, DialogProductLookup, DialogSavedList, GRadio, GRadioGroup, GKeyboard, GSpacer, GTextField, GScrollWindowItem, GScrollWindow, GCardText, GCardActions, GCardTitle, GCard, GDialog, GIcon, GBadge, GToolbar, GDivider, TableExpansionRow, GSimpleTable, GImg, GAvatar, GItem, GItemGroup, GWindowItem, GWindow, GNumberKeyboard, GRow, GBtn },
    data() {
      return {
        layout: layout,
        number: 0,
        menuSelected: null,
        menu: [
          { title: 'Favorite' },
          { title: 'Drink' },
          { title: 'Sport' },
          { title: 'Material' },
          { title: 'Wine' },
          { title: 'Electronic' },
          { title: 'Other 1' },
          { title: 'Other 2' },
        ],
        numpad_1: [
          { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key7; border: 1px solid #979797' },
          { content: ['8'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key8; border: 1px solid #979797' },
          { content: ['9'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key9; border: 1px solid #979797' },
          { content: ['4'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key4; border: 1px solid #979797' },
          { content: ['5'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key5; border: 1px solid #979797' },
          { content: ['6'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key6; border: 1px solid #979797' },
          { content: ['1'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key1; border: 1px solid #979797' },
          { content: ['2'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key2; border: 1px solid #979797' },
          { content: ['3'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key3; border: 1px solid #979797' },
          { content: ['0'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key0; border: 1px solid #979797' },
          { content: ['00'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key00; border: 1px solid #979797' },
          { content: ['x'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value) => value.substring(0, value.length - 1), style: 'grid-area: keyX; border: 1px solid #979797' },
          { content: ['C'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: () => '0', style: 'grid-area: keyC; border: 1px solid #979797' },
          { content: ['&crarr;'], classes: 'key-number white', type: 'enter', action: () => null, style: 'grid-area: Enter; border: 1px solid #979797' }
        ],
        window: null,
        listItems: [
          [
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
          ],
          [
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'red accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'green accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
          ],
          [
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'green accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'brown lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
            { title: 'Tiramisu', color: 'pink lighten 4' },
            { title: 'Tiramisu', color: 'teal accent 1' },
            { title: 'Tiramisu', color: 'blue lighten 3' },
            { title: 'Tiramisu', color: 'yellow accent 1' },
          ],
        ],
        delimiters: null,
        orderDetail: [
          {
            id: 1,
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            id: 2,
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            id: 3,
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            id: 4,
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            id: 5,
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            id: 6,
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
            oldPrice: '7.52',
            promotion: 'Promotion A',
          },
        ],
        product: null,
        discount: -0.50,
        tax: 0.50,
        subTotal: 40.50,
        total: 40.50,
        lastPayment: 0,
        dialogSavedList: false,
        dialogProductLookup: false,
        dialogChangePrice: false,
				dialogProductSearch: false
      }
    },
    methods: {
      selectMenu(item) {
        this.menuSelected = item;
      },
      quickCash() {
        this.lastPayment = +this.total;
        this.total = 0;
        this.tax = 0;
        this.discount = 0;
        this.subTotal = 0;
        this.orderDetail = [];
        this.product = null;
      },
      convertMoney(val) {
        if (val && typeof (val) === 'number') {
          return val.toFixed(2)
        } else {
          return 0
        }
      },
      changePrice(product) {
        const i = this.orderDetail.findIndex(p => p.id === product.id);
        this.orderDetail.splice(i, 1, product);
      }
    },
    created() {
      this.menuSelected = this.menu[0];
      this.window = 0;
      this.delimiters = [...this.listItems.keys()];
    }
  }
</script>

<style scoped lang="scss">
	.info__left {
		display: flex;
		padding: 16px;
		align-items: center;
		font-size: 13px;
		font-weight: 700;
	}

	.info__right {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		padding: 0 6px;
	}

	.table {
		border: 1px solid #e8e8e8;
		border-radius: 6px;
		font-size: 13px;
		margin: 6px;

		.empty-row {
			height: 42px;
		}
	}

	.report {
		display: flex;

		&-column {
			flex: 1 1 0;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 1fr;
			grid-gap: 6px;
			padding: 8px 16px;

			.number {
				text-align: right;

				&__important {
					text-align: right;
					font-size: 20px;
					font-weight: 700;
					color: #1271ff;
				}
			}
		}
	}

	.action {
		padding: 9px 6px;
	}

	.toolbar {
		.g-badge-wrapper .g-btn {
			margin-right: 0;
		}

		.g-toolbar-content > .g-btn:first-child {
			margin-left: 0;
		}

		.g-toolbar-background > div {
			box-shadow: inset -8px 0 8px -8px rgba(0, 0, 0, 0.25);
		}
	}

	.menu {
		background-color: #90CAF9;
		overflow-x: auto;
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-auto-columns: 32%;
		grid-gap: 6px;
		grid-auto-flow: column;
		padding: 6px;

		&::-webkit-scrollbar {
			display: none;
		}

		&__active {
			background-color: #2979FF !important;
			color: white !important;
		}

		&:after {
			content: '';
			width: 1px;
			height: 100%;
		}
	}

	.g-btn {
		&.g-btn__outlined {
			border: 1px solid #979797;
			background-color: #fafafa;
		}

		&.g-btn__disabled {
			background-color: #DFDFDF;
		}

		&.g-btn__text {
			border: 0;
		}
	}
</style>

<style lang="scss">
	.order {
		.layout__right {
			box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

			.main {
				padding: 6px 6px 0 6px;
				overflow: hidden;

				.g-window {
					width: 100%;

					.g-window__container {
						height: 100%;
					}

					.g-window-item,
					.g-scroll-window-item {
						height: 100%;
						display: grid;
						grid-template-rows: repeat(7, 1fr);
						grid-template-columns: repeat(4, 1fr);
						grid-gap: 6px;
					}
				}

				.g-item-group {
					align-items: center;
					justify-content: center;

					.g-btn {
						width: 8px !important;
						height: 8px !important;
						border-radius: 50%;
						min-width: 0 !important;
						padding: 0 !important;
						margin: 0 6px;
						box-shadow: none;
						background-color: #E0E0E0 !important;
					}

					.g-item__active .g-btn {
						background-color: #2196F3 !important;
					}
				}
			}

			.controller {
				padding: 8px;
			}

		}
	}
</style>
