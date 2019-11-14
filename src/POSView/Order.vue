<template>
	<div class="row-12 row-flex">
		<div class="layout__left">
			<div class="info">
				<div class="info__left">
					<p v-if="lastPayment > 0">Last Pay: <span style="color: #1271ff">€ {{convertMoney(lastPayment)}}</span></p>
				</div>
				<div class="info__right">
					<g-avatar size="36">
						<g-img :src="require('../assets/order/avatar.svg')"/>
					</g-avatar>
					<div class="pa-1" style="line-height: 16px">
						<p class="ta-right fw-700 fs-small">Admin</p>
						<p class="fs-small-2">16:45 &#8231; May 20, 19</p>
					</div>
				</div>
			</div>
			<g-simple-table striped fixed-header class="table">
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
				<table-expansion-row v-model="product" :items="products"/>
				<template v-if="products.length < 12 && products.length > 0">
					<tr v-for="i in (10 - products.length)" class="empty-row">
						<td></td>
					</tr>
				</template>
			</g-simple-table>
			<div class="report">
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
			<div class="action">
				<g-btn outlined>F1</g-btn>
				<g-btn outlined>F2</g-btn>
				<g-btn outlined>F3</g-btn>
				<g-btn outlined>F4</g-btn>
			</div>
			<g-toolbar class="toolbar" color="#eee">
				<g-btn background-color="white">
					<g-icon>{{require('../assets/order/back.svg')}}</g-icon>
					Back
				</g-btn>
				<g-btn background-color="white">
					<g-icon>{{require('../assets/order/menu.svg')}}</g-icon>
					More
				</g-btn>
				<g-badge overlay color="#FF4452">
					<template v-slot:badge>
						<span>2</span>
					</template>
					<g-btn background-color="white" @click="dialogSavedList = true">
						<g-icon>{{require('../assets/order/folder.svg')}}</g-icon>
						Saved list
					</g-btn>
				</g-badge>
			</g-toolbar>
		</div>
		<div class="layout-right">
			<div class="menu">
				<g-btn v-for="(item, i) in menu" :key="i" elevation="0" background-color="#fff" text-color="#1d1d26"
							 @click.stop="selectMenu(item)" :class="[item === menuSelected ? 'menu__active' : '']">
					{{item.title}}
				</g-btn>
			</div>
			<div class="main">
				<g-window :show-arrows="false" v-model="window">
					<g-window-item v-for="(items, i) in listItems" :key="i">
						<g-btn v-for="(item, i) in items" :key="i" flat :background-color="item.color">{{item.title}}</g-btn>
					</g-window-item>
				</g-window>
				<g-item-group :items="delimeters" v-model="window">
					<template v-slot:default="{ toggle, active }">
						<template v-for="(item, index) in delimeters">
							<g-item :item="item" :is-active="active(item)" @toggle="toggle" :key="index">
								<g-btn @click="toggle"></g-btn>
							</g-item>
						</template>
					</template>
				</g-item-group>
			</div>
			<div class="action">
				<g-number-keyboard class="keyboard" v-model="number" :items="keyboard">
					<template v-slot:screen>
						<div class="number-key-show ba-thin bg-grey-lighten-3" style="height: calc(16.6667% - 4px)">
							<input id="number_key_output" class="number-key-text col-12 self-center bg-transparent fs-large-2 fw-700 pl-2" style="border: none; outline: none" v-model="number">
						</div>
					</template>
				</g-number-keyboard>
				<div class="buttons">
					<g-btn outlined>F1</g-btn>
					<g-btn outlined>Note</g-btn>
					<g-btn outlined disabled>Disabled Button</g-btn>
					<g-btn outlined></g-btn>
					<g-btn text background-color="green lighten 1" text-color="white" class="big" @click="quickCash">Quick Cash</g-btn>
					<g-btn outlined>Change Price</g-btn>
					<g-btn outlined @click="dialogProductLookup = true">Product Lookup</g-btn>
					<g-btn outlined>Discount</g-btn>
					<g-btn outlined>Plastic Refund</g-btn>
					<g-btn text background-color="orange lighten 1" text-color="white">Save</g-btn>
					<g-btn text background-color="blue darken 2" text-color="white">Pay</g-btn>
				</div>
			</div>
		</div>
		<g-dialog v-model="dialogSavedList" overlay-color="#6b6f82" overlay-opacity="0.95" bottom max-width="100%" width="100%" lazy>
			<div>
				<g-simple-table striped style="font-size: 14px;">
					<thead>
					<tr>
						<th class="ta-left">Order No.</th>
						<th class="ta-left">Customer</th>
						<th class="ta-right">Qty of Items</th>
						<th class="ta-left">Saved time</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(save, i) in savedLists" :key="i">
						<td class="ta-left text-blue">{{save.id}}</td>
						<td class="ta-left">{{save.customer}}</td>
						<td class="ta-right">{{save.quantity}}</td>
						<td class="ta-left">{{save.time}}</td>
						<td class="ta-left row-flex justify-center align-items-center">
							<g-btn background-color="#1271FF" text-color="white">
								<g-icon>{{require('../assets/order/open.svg')}}</g-icon>
								Select
							</g-btn>
							<g-btn background-color="#FF4452" text-color="white" @click="dialogDeleteSave = true" lazy>
								<g-icon>{{require('../assets/home/delete.svg')}}</g-icon>
								Delete
							</g-btn>
						</td>
					</tr>
					</tbody>
				</g-simple-table>
				<g-toolbar color="#eee" elevation="2">
					<g-btn background-color="white">
						<g-icon>{{require('../assets/order/back.svg')}}</g-icon>
						Back
					</g-btn>
					<g-btn background-color="white">
						<g-icon>{{require('../assets/order/folder.svg')}}</g-icon>
						Saved list
					</g-btn>
				</g-toolbar>
			</div>
		</g-dialog>
		<g-dialog v-model="dialogDeleteSave" overlay-color="#6b6f82" overlay-opacity="0.95" width="40%">
			<g-card>
				<g-card-title>
					Confirmation
				</g-card-title>
				<g-card-text>
					Are you sure you want to delete Saved order <b>"431413413413"</b>?
				</g-card-text>
				<g-card-actions>
					<g-btn flat background-color="#efefef">Cancel</g-btn>
					<g-btn flat background-color="red lighten 2" text-color="white">OK</g-btn>
				</g-card-actions>
			</g-card>
		</g-dialog>
		<g-dialog v-model="dialogProductLookup" fullscreen>
			<div class="dialog-lookup">
				<g-toolbar class="header" color="grey lighten 3" elevation="0">
					<g-text-field outlined clearable class="w-50" style="color: #1d1d26" clear-icon="cancel"></g-text-field>
					<g-spacer/>
					<g-btn icon style="box-shadow: none; border-radius: 50%" @click="dialogProductLookup = false"><g-icon>clear</g-icon></g-btn>
				</g-toolbar>
				<g-simple-table>

				</g-simple-table>
				<div class="keyboard-wrapper">
					<g-keyboard v-model="productLookup"></g-keyboard>
				</div>
			</div>
		</g-dialog>
	</div>
</template>

<script>
  import GBtn from '../components/GBtn/GBtn';
  import GRow from '../components/GLayout/GRow';
  import GNumberKeyboard from '../components/GKeyboard/GNumberKeyboard';
  import GWindow from '../components/GWindow/GWindow';
  import GWindowItem from '../components/GWindow/GWindowItem';
  import GItemGroup from '../components/GItemGroup/GItemGroup';
  import GItem from '../components/GItemGroup/GItem';
  import GAvatar from '../components/GAvatar/GAvatar';
  import GImg from '../components/GImg/GImg';
  import GSimpleTable from '../components/GSimpleTable/GSimpleTable';
  import TableExpansionRow from '../POSComponents/TableExpansionRow';
  import GDivider from '../components/GLayout/GDivider';
  import GToolbar from '../components/GToolbar/GToolbar';
  import GBadge from '../components/GBadge/GBadge';
  import GIcon from '../components/GIcon/GIcon';
  import GDialog from '../components/GDialog/GDialog';
  import GCard from '../components/GCard/GCard';
  import GCardTitle from '../components/GCard/GCardTitle';
  import { GCardText, GCardActions } from '../components/GCard/GCardFunctionalComponent';
  import GScrollWindow from '../components/GWindow/GScrollWindow';
  import GScrollWindowItem from '../components/GWindow/GScrollWindowItem';
  import GTextField from '../components/GInput/GTextField';
  import GSpacer from '../components/GLayout/GSpacer';
  import GKeyboard from '../components/GKeyboard/GKeyboard';

  export default {
    name: 'Order',
    components: { GKeyboard, GSpacer, GTextField, GScrollWindowItem, GScrollWindow, GCardText, GCardActions, GCardTitle, GCard, GDialog, GIcon, GBadge, GToolbar, GDivider, TableExpansionRow, GSimpleTable, GImg, GAvatar, GItem, GItemGroup, GWindowItem, GWindow, GNumberKeyboard, GRow, GBtn },
    data() {
      return {
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
        keyboard: [
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
        delimeters: null,
        products: [
          {
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
          },
          {
            name: 'Product item 1',
            unit: 'piece',
            quantity: 1,
            price: '5.52',
            oldPrice: '7.52',
            promotion: 'Promotion A',
          },
        ],
        product: null,
        dialogSavedList: false,
        savedLists: [
          { id: '#037187408', customer: 'Unknown', quantity: 10, time: '3 mins ago' },
          { id: '#037187418', customer: 'David Beckham', quantity: 4, time: '1hr ago' },
          { id: '#037187423', customer: 'Unknown', quantity: 8, time: '08:23' },
        ],
        dialogDeleteSave: false,
				discount: -0.50,
				tax: 0.50,
				subTotal: 40.00,
				total: 40.50,
				lastPayment: 0,
				dialogProductLookup: false,
				productLookup: null,
      }
    },
    computed: {
      currentDateTime: () => ({})
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
				this.products = [];
				this.product = null;
			},
			convertMoney (val) {
        if(val && typeof(val) === 'number')
          return val.toFixed(2)
				else
				  return 0
			}
    },
    created() {
      this.menuSelected = this.menu[0];
      this.window = 0;
      this.delimeters = [...this.listItems.keys()];
    }
  }
</script>

<style scoped lang="scss">
	.layout__left {
		flex-basis: 50%;
		width: 50%;
		display: grid;
		background-color: #fff;
		grid-template: "info" "table" "report" "action" "toolbar";
		grid-template-rows: 8% 64% 11% 9% 8%;

		.info {
			grid-area: info;
			display: flex;

			.info__left {
				flex-basis: 50%;
				display: flex;
				padding: 16px;
				align-items: center;
				font-size: 13px;
				font-weight: 700;
			}

			.info__right {
				flex-basis: 50%;
				display: flex;
				flex-direction: row-reverse;
				align-items: center;
				padding: 0 6px;
			}
		}

		.table {
			grid-area: table;
			border: 1px solid #e8e8e8;
			border-radius: 6px;
			font-size: 13px;
			margin: 6px;

			.empty-row {
				height: 42px;
			}
		}

		.report {
			grid-area: report;
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
			grid-area: action;
			padding: 6px;
			display: flex;

			::v-deep .g-btn {
				margin: 3px;
				flex: 1 1 0;
				height: auto !important;
				border-radius: 6px;
				background-color: #fafafa;
			}
		}

		.toolbar {
			grid-area: toolbar;
			width: 100%;
			height: 100% !important;

			::v-deep .g-badge-wrapper .g-btn {
				margin-right: 0;
			}
		}
	}

	.layout-right {
		flex-basis: 50%;
		width: 50%;
		display: grid;
		grid-template: "menu" "main" "action";
		grid-template-rows: 12% 44% 44%;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.252295);

		::v-deep .g-btn {
			text-transform: none;
		}

		.menu {
			grid-area: menu;
			background-color: #90CAF9;
			overflow-x: auto;
			display: flex;
			flex-flow: column wrap;
			margin-bottom: 4px;

			&__active {
				background-color: #2979FF !important;
				color: white !important;
			}

			::v-deep .g-btn {
				flex-basis: calc(50% - 8px);
				height: calc(50% - 8px) !important;
				width: 31.25%;
				margin: 6px 0 0 6px;
			}

			&:after {
				content: '';
				width: 6px;
				height: 100%;
				flex-basis: 100%;
			}
		}

		.main {
			grid-area: main;
			padding: 0 6px;
			display: flex;
			flex-direction: column;

			::v-deep .g-window {
				box-shadow: none;
				flex-basis: calc(100% - 12px);

				.g-window__container {
					height: 100%;
				}

				.g-window-item {
					height: 100%;
					display: grid;
					grid-template-rows: repeat(7, 1fr);
					grid-template-columns: repeat(4, 1fr);
					grid-gap: 6px;

					.g-btn {
						height: 100% !important;
					}
				}
			}

			::v-deep .g-item-group {
				flex-basis: 12px !important;
				height: 12px;
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

				.g-item:not(:first-child):not(:last-child) .g-btn {
					background-color: #2196F3 !important;
				}
			}
		}

		.action {
			grid-area: action;
			display: flex;
			padding: 8px;

			.keyboard {
				flex-basis: calc(50% - 3px);
				width: calc(50% - 3px);
				margin-right: 3px;
			}

			.buttons {
				display: flex;
				flex-flow: column wrap;
				margin: -2px 3px -2px 0;
				flex-basis: calc(50% - 3px);
				width: calc(50% - 3px);

				::v-deep .g-btn {
					height: calc(16.6667% - 4px) !important;
					width: calc(50% - 3px) !important;
					flex-basis: calc(16.6667% - 4px);
					margin: 2px 3px;
					border: 1px solid #979797;
					background-color: #fafafa;

					&.big {
						height: calc(33.3333% - 4px) !important;
						flex-basis: calc(33.3333% - 4px);
					}

					&.g-btn__disabled {
						background-color: #DFDFDF;
					}

					&.g-btn__text {
						border: 0;
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	.g-btn {
		letter-spacing: 0 !important;
	}

	.g-data-table__striped {
		tr:nth-child(odd) {
			background: rgba(242, 242, 242, 0.5);
		}

		tr:nth-child(even) {
			background: white !important;
		}

		thead tr:last-child {
			background: white !important;

			th {
				border: 0 !important;
				box-shadow: none !important;
			}
		}

		td {
			border-bottom: none !important;
		}
	}

	.g-data-table__wrapper {
		border-radius: inherit;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.g-toolbar .g-btn {
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		margin: 0 16px 0 -4px;
		padding: 0 12px !important;
		height: 40px !important;

		.g-btn__content {
			justify-content: space-evenly;
		}

		.g-icon {
			margin-right: 6px;
		}
	}

	.dialog-wrapper {
		.g-table {
			thead tr th {
				font-size: inherit;
				color: #1d1d26;
			}

			.g-btn {
				margin: 0 8px;
			}
		}

		.g-card {
			.g-card-title,
			.g-card-text {
				justify-content: center;
				text-align: center;
				color: #1d1d26;
			}

			.g-card-text {
				padding: 32px 64px;
			}

			.g-card-actions {
				justify-content: flex-end;

				.g-btn {
					min-width: 120px !important;
				}
			}
		}
	}

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

		.keyboard-wrapper {
			flex-basis: 40%;
			height: 40%
		}
	}
</style>