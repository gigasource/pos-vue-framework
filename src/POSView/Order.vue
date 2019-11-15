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
				<table-expansion-row v-model="product" :items="orderDetail"/>
				<template v-if="orderDetail.length < 12 && orderDetail.length > 0">
					<tr v-for="i in (10 - orderDetail.length)" class="empty-row">
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
				<g-scroll-window :show-arrows="false" v-model="window">
					<g-scroll-window-item v-for="(items, i) in listItems" :key="i">
						<g-btn v-for="(item, i) in items" :key="i" flat :background-color="item.color">{{item.title}}</g-btn>
					</g-scroll-window-item>
				</g-scroll-window>
				<g-item-group :items="listItems" v-model="window" :return-object="false" mandatory>
					<template v-slot:default="{ toggle, active }">
						<template v-for="(item, index) in listItems">
							<g-item :is-active="active(item)" :key="index">
								<g-btn @click="toggle(item)"></g-btn>
							</g-item>
						</template>
					</template>
				</g-item-group>
			</div>
			<div class="action">
				<g-number-keyboard class="keyboard" v-model="number" :items="numpad_1">
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
					<g-btn outlined @click="dialogChangePrice = true">Change Price</g-btn>
					<g-btn outlined @click="dialogProductLookup = true">Product Lookup</g-btn>
					<g-btn outlined>Discount</g-btn>
					<g-btn outlined>Plastic Refund</g-btn>
					<g-btn text background-color="orange lighten 1" text-color="white">Save</g-btn>
					<g-btn text background-color="blue darken 2" text-color="white">
						<router-link to="/payment">Pay</router-link>
					</g-btn>
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
					<g-text-field outlined clearable class="w-50" style="color: #1d1d26" clear-icon="cancel" v-model="productLookup" @focus="showKeyboard = true" @blur="showKeyboard = false"></g-text-field>
					<g-spacer/>
					<g-btn icon style="box-shadow: none; border-radius: 50%" @click="dialogProductLookup = false"><g-icon>clear</g-icon></g-btn>
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
					<g-keyboard class="h-100" v-model="productLookup" :items="keyboardFull" :template="templateFull"></g-keyboard>
				</div>
			</div>
		</g-dialog>
		<g-dialog v-model="dialogChangePrice" overlay-color="#6b6f82" overlay-opacity="0.95" width="65%">
			<div class="dialog-change" :style="[{background: showKeyboard ? 'white' : 'transparent'}]">
			<div class="dialog-change-content">
				<div class="header">
					<div class="col-5 ml-5">
						<p>Original Price</p>
						<g-text-field read-only outlined value="€ 50"/>
					</div>
					<div class="col-5">
						<p>Effective Price</p>
						<g-text-field read-only outlined class="tf__effective" value="€ 30.50"/>
					</div>
				</div>
				<g-radio-group name="basic" v-model="changeType">
					<g-radio color="#1271ff" value="percentage" label="Discount by %"></g-radio>
					<div class="row-flex ml-5 col-10 pr-2">
						<g-btn outlined :disabled="disabledPercent">- 5%</g-btn>
						<g-btn outlined :disabled="disabledPercent">- 10%</g-btn>
						<g-btn outlined :disabled="disabledPercent">- 15%</g-btn>
						<g-btn outlined :disabled="disabledPercent">- 20%</g-btn>
						<g-text-field outlined :disabled="disabledPercent" v-model="newPercent" style="flex-grow: 1" placeholder="Other" @focus="showKeyboard = true" @blur="showKeyboard = false" :rules="[rulePercent.percent]"></g-text-field>
					</div>
					<g-radio color="#1271ff" value="amount" label="Discount by €"></g-radio>
					<div class="row-flex ml-5 col-10 pr-2">
						<g-btn outlined :disabled="disabledAmount">- € 5</g-btn>
						<g-btn outlined :disabled="disabledAmount">- € 10</g-btn>
						<g-btn outlined :disabled="disabledAmount">- € 15</g-btn>
						<g-btn outlined :disabled="disabledAmount">- € 20</g-btn>
						<g-text-field outlined :disabled="disabledAmount" v-model="newAmount" style="flex-grow: 1" placeholder="Other" @focus="showKeyboard = true" @blur="showKeyboard = false" ></g-text-field>
					</div>
					<g-radio color="#1271ff" value="new" label="New Price"></g-radio>
					<div class="ml-5 col-10">
						<g-text-field outlined placeholder="New Price" v-model="newPrice" @focus="showKeyboard = true" @blur="showKeyboard = false" :disabled="disabledNew"></g-text-field>
					</div>
				</g-radio-group>
				<div class="action">
					<g-btn flat background-color="#efefef" text-color="grey darken 1" @click="dialogChangePrice = false">Cancel</g-btn>
					<g-btn flat background-color="blue accent 3" text-color="white" @click="changePrice()">OK</g-btn>
				</div>
			</div>
				<div :style="[{visibility: showKeyboard ? 'visible' : 'hidden'}]" class="keyboard-wrapper">
					<g-keyboard :template="templateNp2" :items="numpad_2"/>
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
  import GRadioGroup from '../components/GRadio/GRadioGroup';
  import GRadio from '../components/GRadio/GRadio';

  export default {
    name: 'Order',
    components: { GRadio, GRadioGroup, GKeyboard, GSpacer, GTextField, GScrollWindowItem, GScrollWindow, GCardText, GCardActions, GCardTitle, GCard, GDialog, GIcon, GBadge, GToolbar, GDivider, TableExpansionRow, GSimpleTable, GImg, GAvatar, GItem, GItemGroup, GWindowItem, GWindow, GNumberKeyboard, GRow, GBtn },
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
        dialogSavedList: false,
        savedLists: [
          { id: '#037187408', customer: 'Unknown', quantity: 10, time: '3 mins ago' },
          { id: '#037187418', customer: 'David Beckham', quantity: 4, time: '1hr ago' },
          { id: '#037187423', customer: 'Unknown', quantity: 8, time: '08:23' },
        ],
        dialogDeleteSave: false,
				discount: -0.50,
				tax: 0.50,
				subTotal: 40.50,
				total: 40.50,
				lastPayment: 0,
				dialogProductLookup: false,
				productLookup: 'Pro',
				showKeyboard: false,
				keyboardFull: [
          { content: ['Tab'], img: '', style: 'grid-area: tab; background-color: #e0e0e0; font-size: 14px', action: (value) => (value + '  ')},
          { content: ['q', 'Q'], img: '', style: 'grid-area: q', action: (value, append) => (value + append) },
          { content: ['w', 'W'], img: '', style: 'grid-area: w', action: (value, append) => (value + append) },
          { content: ['e', 'E'], img: '', style: 'grid-area: e', action: (value, append) => (value + append) },
          { content: ['r', 'R'], img: '', style: 'grid-area: r', action: (value, append) => (value + append) },
          { content: ['t', 'T'], img: '', style: 'grid-area: t', action: (value, append) => (value + append) },
          { content: ['y', 'Y'], img: '', style: 'grid-area: y', action: (value, append) => (value + append) },
          { content: ['u', 'U'], img: '', style: 'grid-area: u', action: (value, append) => (value + append) },
          { content: ['i', 'I'], img: '', style: 'grid-area: i', action: (value, append) => (value + append) },
          { content: ['o', 'O'], img: '', style: 'grid-area: o', action: (value, append) => (value + append) },
          { content: ['p', 'P'], img: '', style: 'grid-area: p', action: (value, append) => (value + append) },
          { content: [''], img: 'delivery/key_delete', style: 'grid-area: del; background-color: #e0e0e0', action: (value) => value.substring(0, value.length-1)},
          { content: ['Caps lock'], img: '', style: 'grid-area: caps; background-color: #e0e0e0; font-size: 14px'},
          { content: ['a', 'A'], img: '', style: 'grid-area: a', action: (value, append) => (value + append) },
          { content: ['s', 'S'], img: '', style: 'grid-area: s', action: (value, append) => (value + append) },
          { content: ['d', 'D'], img: '', style: 'grid-area: d', action: (value, append) => (value + append) },
          { content: ['f', 'F'], img: '', style: 'grid-area: f', action: (value, append) => (value + append) },
          { content: ['g', 'G'], img: '', style: 'grid-area: g', action: (value, append) => (value + append) },
          { content: ['h', 'H'], img: '', style: 'grid-area: h', action: (value, append) => (value + append) },
          { content: ['j', 'J'], img: '', style: 'grid-area: j', action: (value, append) => (value + append) },
          { content: ['k', 'K'], img: '', style: 'grid-area: k', action: (value, append) => (value + append) },
          { content: ['l', 'L'], img: '', style: 'grid-area: l', action: (value, append) => (value + append) },
          { content: [], img: 'delivery/key_enter', style: 'grid-area: enter; background-color: #e0e0e0', type: 'enter'},
          { content: [], img: 'delivery/key_shift', style: 'grid-area: shift1; background-color: #e0e0e0', type: 'shift', action: (isShift) => (!isShift)},
          { content: ['z', 'Z'], img: '', style: 'grid-area: z', action: (value, append) => (value + append) },
          { content: ['x', 'X'], img: '', style: 'grid-area: x', action: (value, append) => (value + append) },
          { content: ['c', 'C'], img: '', style: 'grid-area: c', action: (value, append) => (value + append) },
          { content: ['v', 'V'], img: '', style: 'grid-area: v', action: (value, append) => (value + append) },
          { content: ['b', 'B'], img: '', style: 'grid-area: b', action: (value, append) => (value + append) },
          { content: ['n', 'N'], img: '', style: 'grid-area: n', action: (value, append) => (value + append) },
          { content: ['m', 'M'], img: '', style: 'grid-area: m', action: (value, append) => (value + append) },
          { content: [','], img: '', style: 'grid-area: comma', action: (value) => (value + ',') },
          { content: ['.'], img: '', style: 'grid-area: dot', action: (value) => (value + '.') },
          { content: ['/'], img: '', style: 'grid-area: splash', action: (value) => (value + '/') },
          { content: [], img: 'delivery/key_shift', style: 'grid-area: shift2; background-color: #e0e0e0', type: 'shift', action: (isShift) => (!isShift)},
          { content: ['*#$'], img: '', style: 'grid-area: sym; background-color: #e0e0e0; font-size: 14px'},
          { content: ['&'], img: '', style: 'grid-area: amp', action: (value) => (value + '&') },
          { content: ['%'], img: '', style: 'grid-area: pct', action: (value) => (value + '%') },
          { content: ['€'], img: '', style: 'grid-area: pnd', action: (value) => (value + '€') },
          { style: 'grid-area: space', action: (value) => (value + ' ') },
          { content: ['@'], img: '', style: 'grid-area: at', action: (value) => (value + '@') },
          { content: ['EN'], img: '', style: 'grid-area: lang; background-color: #e0e0e0; font-size: 14px'},
          { content: ['&rarr;'], img: '', style: 'grid-area: rarr; background-color: #e0e0e0'},
          { content: ['&larr;'], img: '', style: 'grid-area: larr; background-color: #e0e0e0'},
          { content: ['7'], action: (value, append) => (value + append), style: 'grid-area: key7' },
          { content: ['8'], action: (value, append) => (value + append), style: 'grid-area: key8' },
          { content: ['9'], action: (value, append) => (value + append), style: 'grid-area: key9' },
          { content: ['2'], action: (value, append) => (value + append), style: 'grid-area: key4' },
          { content: ['5'], action: (value, append) => (value + append), style: 'grid-area: key5' },
          { content: ['6'], action: (value, append) => (value + append), style: 'grid-area: key6' },
          { content: ['1'], action: (value, append) => (value + append), style: 'grid-area: key1' },
          { content: ['2'], action: (value, append) => (value + append), style: 'grid-area: key2' },
          { content: ['3'], action: (value, append) => (value + append), style: 'grid-area: key3' },
          { content: ['0'], action: (value, append) => (value + append), style: 'grid-area: key0' },
          { content: ['.'], action: (value) => (value + '.'), style: 'grid-area: keyDot' },
        ],
				templateFull: 'grid-template-areas: "tab tab q q w w e e r r t t y y u u i i o o p p del del del del key7 key7 key8 key8 key9 key9" ' +
					'"caps caps caps a a s s d d f f g g h h j j k k l l enter enter enter enter enter key4 key4 key5 key5 key6 key6" ' +
					'"shift1 shift1 shift1 shift1 z z x x c c v v b b n n m m comma comma dot dot splash splash shift2 shift2 key1 key1 key2 key2 key3 key3" ' +
					'"sym sym amp amp pct pct pnd pnd space space space space space space space space space space at at lang lang larr larr rarr rarr key0 key0 key0 key0 keyDot keyDot";' +
					'grid-auto-columns: 1fr; grid-gap: 10px',
				products: [
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
					{ name: 'Product Name 01', unit: 'Box' },
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
					{ name: 'Product Name 01', barcode: '89748173401744339', unit: 'Box', attribute: { Color: 'Black, White', Age: '1-2yrs, 0-6mths'} },
				],
				dialogChangePrice: false,
				numpad_2: [
          { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key7' },
          { content: ['8'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key8' },
          { content: ['9'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key9' },
          { content: ['4'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key4' },
          { content: ['5'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key5' },
          { content: ['6'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key6' },
          { content: ['1'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key1' },
          { content: ['2'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key2' },
          { content: ['3'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key3' },
          { content: ['0'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key0' },
          { content: ['.'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: keyDot' },
          { content: [''], img: 'delivery/key_delete', classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value) => value.substring(0, value.length - 1), style: 'grid-area: keyX' },
        ],
				templateNp2: 'grid-template: "key7 key8 key9" "key4 key5 key6" "key1 key2 key3" "key0 keyDot keyX"/ 1fr 1fr 1fr',
				changeType: null,
				newPrice: 0,
				newPercent: 0,
				newAmount: 0,
        rulePercent: {
          percent: value => (value < 100 && value > 0) || 'Input: 0 - 100',
        },
      }
    },
    computed: {
      currentDateTime: () => ({}),
      tbLookup() {
        return this.showKeyboard ? 'tbLookup' : 'tbLookup__full'
      },
			disabledPercent() {
        return this.changeType !== 'percentage'
			},
			disabledAmount() {
        return this.changeType !== 'amount'
			},
			disabledNew() {
        return this.changeType !== 'new'
			},
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
			convertMoney (val) {
        if(val && typeof(val) === 'number')
          return val.toFixed(2)
				else
				  return 0
			},
			changePrice () {
				if(!this.product) {
          this.dialogChangePrice = false;
          return;
				}
        const i = this.orderDetail.findIndex(p => p.id === this.product.id);
        this.product.edited = true;
        this.orderDetail.splice(i, 1, this.product);
        this.dialogChangePrice = false;
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
			overflow: hidden;

			::v-deep .g-window {
				box-shadow: none;
				flex-basis: calc(100% - 12px);
				width: 100%;

				.g-window__container {
					height: 100%;
				}

				.g-window-item ,
				.g-scroll-window-item {
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

				.g-item__active .g-btn {
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

		.text__editted {
			color: #8bc34a;
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

		.keyboard-wrapper {
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

	.dialog-change {
		border-radius: 6px;
		display: flex;
		flex-direction: column;

		.dialog-change-content {
			display: flex;
			flex-direction: column;
			background: white;
			border-radius: inherit;
			padding: 32px;

			.header {
				display: flex;
				margin-bottom: 16px;
				font-size: 13px;
				font-weight: 700;

				.g-tf-wrapper {
					&.tf__effective input {
						color: #4CAF50;
						font-size: 24px;
					}

					input {
						font-size: 20px;
						line-height: 32px;
						font-weight: 700;
					}
				}
			}

			.g-tf-wrapper {
				margin: 0;

				&.g-tf-wrapper__disabled fieldset {
					opacity: 0.42;
				}

				input::placeholder {
					text-align: center;
					font-size: 18px;
				}

				input {
					text-align: center;
				}
			}

			.g-btn {
				height: 50px !important;
			}

			.g-btn:not(:last-child) {
				margin-right: 8px;
			}

			.g-radio-wrapper {
				line-height: 12px;

				.g-radio {
					display: inline-flex;
				}
			}

			.action {
				display: flex;
				justify-content: flex-end;
				padding-top: 16px;

				.g-btn {
					min-width: 120px !important;
				}
			}
		}

		.keyboard-wrapper {
			background-color: #bdbdbd;
			padding: 16px 200px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;

			.key-number {
				padding: 12px 8px;
			}
		}
	}

	.dialog-content {
		max-height: 100% !important;
	}
</style>