<template>
	<div id="app" class="vertical-body-responsive-wrapper">
		<g-layout row>
			<div class="col-6">
				<g-layout column class="r">
					<g-container class="h-90">
						<g-layout column class="justify-between">
							<div class="row-10 table-scroll table-rounded">
								<g-table striped class="table">
									<template v-slot:header>
										<tr>
											<th v-for="(header, i) in headers" :key="i" class="pl-2 fs-small fw-700 bg-white" style="position: sticky; top: 0; z-index: 2">
												{{header}}
											</th>
										</tr>
									</template>
									<template v-slot:body>
										<template v-for="item in items">
											<g-expansion-panel class="table-row-group">
												<template v-slot:default="{show}">
													<g-expansion-panel-header class="table-row" :isActive="show">
														<td style="padding: 0.5rem">{{ item.name }}</td>
														<td style="padding: 0.5rem">{{ item.quantity }}</td>
														<td style="padding: 0.5rem">{{ item.price }}</td>
														<td style="padding: 0.5rem">{{ item.total }}</td>
													</g-expansion-panel-header>
													<g-expansion-panel-content :show="show" class="table-row">
														<td colspan="4" class="bg-blue-8 pa-2">
															<g-layout row>
																<div class="col-4 row-flex">
																	<g-button class="btn__small-rounded bg-transparent ba-dgray-2 ba-thin fw-500">-</g-button>
																	<div class="bg-white ba-blue-7 blue-7 ba-thin ta-center col-3">{{ item.quantity}}</div>
																	<g-button class="btn__small-rounded bg-transparent ba-dgray-2 ba-thin fw-500">+</g-button>
																</div>
																<div class="col-8 row-flex justify-end">
																	<g-button color="#92beff">
																		<img src="../assets/delivery/delete.svg">
																		<span class="ml-2 red-1">Remove item</span>
																	</g-button>
																</div>
															</g-layout>
														</td>
													</g-expansion-panel-content>
												</template>
											</g-expansion-panel>
										</template>
										<template v-if="items.length < 12">
											<tr v-for="i in (12 - items.length)">
												<td colspan="4" style="height: 2rem"></td>
											</tr>
										</template>
									</template>
								</g-table>
							</div>
							<div class="h-12">
								<g-layout row>
									<div class="col-6 br-black brw-thin pa-2 fw-400 fs-small col-flex justify-between">
										<p class="row-flex pa-1">
											<span class="col-6 ta-left">Discount</span>
											<span class="col-6 ta-right">- €0.50</span>
										</p>
										<p class="row-flex pa-1">
											<span class="col-6 ta-left">Tax</span>
											<span class="col-6 ta-right">€0.50</span>
										</p>
									</div>
									<div class="col-6 pa-2 fw-400 fs-small col-flex justify-between">
										<p class="row-flex pa-1">
											<span class="col-6 ta-left">Sub-total</span>
											<span class="col-6 ta-right fw-700">€40.00</span>
										</p>
										<p class="row-flex pa-1">
											<span class="col-6 ta-left">Total</span>
											<span class="col-6 ta-right red-1 fw-700 fs-large">€40.50</span>
										</p>
									</div>
								</g-layout>
							</div>
						</g-layout>
					</g-container>
					<g-toolbar tile height="10%">
						<g-button color="#eeeeee" width="20%">
							<img src="../assets/order/back.svg">
							<span class="ml-1">Back</span>
						</g-button>
						<g-button color="#ffffff" width="15%" class="mr-2">
							<img src="../assets/order/bureau.svg">
							<span class="ml-1 fs-small-2">More</span>
						</g-button>
						<g-button color="#ffffff" width="30%" class="mr-2">
							<img src="../assets/delivery/list.svg">
							<span class="ml-1 fs-small-2">Order History</span>
						</g-button>
						<g-button color="#ffffff" width="35%">
							<img src="../assets/delivery/more.svg">
							<span class="ml-1 fs-small-2">Exchange/Refund</span>
						</g-button>
					</g-toolbar>
				</g-layout>
			</div>
			<div class="col-6 bl-lgray-4 blw-1">
				<g-layout column>
					<div class="row-2 col-flex pa-2 bg-category-menu">
						<g-layout row class="flex-equal pb-1">
							<g-button class="flex-equal mr-1" color="#ff4452" textColor="#ffffff">Featured Products</g-button>
							<g-button class="flex-equal mr-1" color="#ffffff">Hauptgerichte</g-button>
							<g-button class="flex-equal mr-1" color="#ffffff">Heißgetränk</g-button>
							<g-button class="w-10" color="#d6d6d6" textColor="#2f1ac3">&gt;</g-button>
						</g-layout>
						<g-layout row class="flex-equal">
							<g-button class="flex-equal mr-1" color="#ffffff">Bier, Side, Gin Genuss</g-button>
							<g-button class="flex-equal mr-1" color="#ffffff">Wein, Cocktails</g-button>
							<g-button class="flex-equal mr-1" color="#ffffff">Longdrinks, Wishkeys, Tequila</g-button>
							<g-button class="w-10" color="#d6d6d6" textColor="#2f1ac3">&lt;</g-button>
						</g-layout>
					</div>
					<div class="row-5 pt-1 pl-1 pr-1">
						<g-layout row>
							<g-layout column class="col-3">
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
							</g-layout>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffe7a7">Tiramisu</g-button>
							</g-layout>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
							</g-layout>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#b5ff6a">Tiramisu</g-button>
							</g-layout>
						</g-layout>
					</div>
					<div class="row-5 pl-1 pr-1 pb-1">
						<g-layout row>
							<g-number-keyboard class="col-6" v-model="product" :items="keyNumbers">
								<template v-slot:screen>
									<div class="number-key-show ba-blue-9 ba-thin bg-lgray-5">
										<div class="number-key-screen col-6">
											<label for="number_key_output" class="number-key-text bg-white ba-blue-9 ba-thin w-100 br-2 white fs-small-2 fw-400 pl-2"></label>
										</div>
										<input id="number_key_output" class="number-key-text col-5 self-center ta-right bg-lgray-5 fs-large-2 fw-700" style="border: none; outline: none" v-model="product">
									</div>
								</template>
							</g-number-keyboard>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#eeeeee"></g-button>
								<g-button class="flex-equal mb-1" color="#39475a" outline>Check Stack</g-button>
								<g-button class="flex-equal mb-1" color="#39475a" outline>Price Change</g-button>
								<g-button class="flex-equal mb-1" color="#39475a" outline>Credit Card</g-button>
								<g-button class="row-4" color="#fb755c" text-color="#ffffff">Quick Cash</g-button>
							</g-layout>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#eeeeee"></g-button>
								<g-button class="flex-equal mb-1" color="#39475a" outline>Guest Info</g-button>
								<g-button class="flex-equal mb-1" color="#39475a" outline>Discount</g-button>
								<g-button class="flex-equal mb-1" color="#39475a" outline>Plastic Refund</g-button>
								<g-button class="flex-equal mb-1" color="#046eff" text-color="#ffffff">Save</g-button>
								<g-button class="flex-equal" color="#ff264a" text-color="#ffffff">Pay</g-button>
							</g-layout>
						</g-layout>
					</div>
				</g-layout>
			</div>
		</g-layout>

	</div>
</template>

<script>

  import GTextField from '@/components/GInput/GTextField';
  import GButton from '@/components/GButton';
  import GDivider from '@/components/GDivider';
  import GToolbar from '@/components/GToolbar';
  import GList from '@/components/GList/GList';
  import GSwitch from '@/components/GInput/GSwitch';
  import GListItem from '@/components/GList/GListItem';
  import GRadioGroup from '@/components/GInput/GRadioGroup';
  import GRadio from '@/components/GInput/GRadio';
  import GTable from '@/components/GTable/GTable';
  import GNumberKeyboard from '@/components/GKeyboard/GNumberKeyboard';
  import GLayout from '@/components/GLayout';
  import GContainer from '@/components/GContainer';
  import GExpansionPanel from '@/components/GExpansionPanel/GExpansionPanel';
  import GExpansionPanelHeader from '@/components/GExpansionPanel/GExpansionPanelHeader';
  import GExpansionPanelContent from '@/components/GExpansionPanel/GExpansionPanelContent';

  export default {
    name: 'OrderDefault',
    components: { GExpansionPanelContent, GExpansionPanelHeader, GExpansionPanel, GContainer, GLayout, GNumberKeyboard, GRadio, GRadioGroup, GListItem, GSwitch, GList, GToolbar, GDivider, GButton, GTextField, GTable },
    data() {
      return {
        text: 'OK',
        color: '#cae132',
        headers: ['Name', 'Qty', 'Each', 'Total'],
        items: [
          { name: 'Product item 1', quantity: 1, price: '€5.52', total: '€5.52' },
          { name: 'Product item 2', quantity: 2, price: '€10.00', total: '€20.00' },
          { name: 'Product item 3', quantity: 1, price: '€4.00', total: '€4.00' },
          { name: 'Product item 4', quantity: 1, price: '€0.50', total: '€0.50' },
          { name: 'Product item 5', quantity: 2, price: '€0.50', total: '€1.00' },
          { name: 'Product item 6', quantity: 1, price: '€5.52', total: '€5.52' },
        ],
        product: 0,
        label: '',
        keyNumbers: [
          { content: '7', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '8', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '9', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '4', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '5', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '6', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '1', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '2', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '3', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '0', classes: 'key-number bg-white ba-blue-9 ba-thin' , style: 'grid-area: 1/4/2/5'},
          { content: '00', classes: 'key-number bg-white ba-blue-9 ba-thin', style: 'grid-area: 2/4/3/5' },
          { content: 'x', classes: 'key-number bg-white ba-blue-9 ba-thin', action: 'delete', style: 'grid-area: 3/4/5/5; background-color: #ff4452'},
          { content: 'C', classes: 'key-number bg-white ba-blue-9 ba-thin', action: 'clear' },
          { content: '&crarr;', classes: 'key-number key-number__extra bg-black white', action: 'enter' }
        ]
      }
    }
  }
</script>

<style>
	.bg-category-menu {
		background-image: linear-gradient(84deg, rgba(254, 87, 90, 0.4), rgba(34, 106, 213, 0.4));
	}

	.table-scroll {
		position: relative;
		overflow-y: auto;
	}

	.table-scroll::-webkit-scrollbar {
		width: 0 !important
	}

	.table-rounded {
		border: 1px solid #a1a1a1;
		border-radius: 8px;
	}

	.table td:nth-child(1) {
		width: 65%;
	}

	.table td:nth-child(2) {
		width: 15%;
	}

	.table td:nth-child(3) {
		width: 15%;
	}

	.table td:nth-child(4) {
		width: 15%;
	}

	.expansion-panel-header__active {
		border-collapse: collapse;
		background-color: #046eff;
		color: #ffffff;
	}
</style>
