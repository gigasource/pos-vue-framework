<template>
	<div id="app" class="vertical-body-responsive-wrapper">
		<g-layout row>
			<div class="col-6">
				<g-layout column class="r">
					<g-container class="h-90">
						<g-layout column class="justify-around">
							<div class="row-10 table-scroll table-rounded">
								<g-table striped class="table">
									<template v-slot:header>
										<tr>
											<th v-for="(header, i) in headers" :key="i" class="pl-2 fs-small fw-700 bg-white" style="position: sticky; top: 0; z-index: 2; height: 2rem">
												{{header}}
											</th>
										</tr>
									</template>
									<template v-slot:body>
										<g-expansion-panel-group v-model="activeItem">
											<template v-slot:default="{toggle, isActive}">
												<g-expansion-panel class="table-row-group" v-for="(item, index) in items" :key="index">
													<g-expansion-panel-header class="table-row" :is-active="isActive(item)" @click.native="toggle(item)">
														<td style="height: 2.75rem; padding: 0.75rem">{{ item.name }}</td>
														<td style="height: 2.75rem; padding: 0.75rem">{{ item.quantity }}</td>
														<td style="height: 2.75rem; padding: 0.75rem">{{ item.price }}</td>
														<td style="height: 2.75rem; padding: 0.75rem; font-weight: 700">{{ item.total }}</td>
													</g-expansion-panel-header>
													<g-expansion-panel-content v-show="isActive(item)" class="table-row">
														<td colspan="4" class="pl-2 pr-2" style="height: 3rem; background-color: rgba(20, 113, 255, 0.2)">
															<g-layout row>
																<div class="col-4 row-flex">
																	<g-button class="btn__small-rounded bg-transparent ba-dgray-2 ba-thin fw-500 self-center">-</g-button>
																	<div class="bg-white ba-blue-7 blue-7 ba-thin col-3" style="display: inline-flex; align-items: center; justify-content: center">{{ item.quantity}}</div>
																	<g-button class="btn__small-rounded bg-transparent ba-dgray-2 ba-thin fw-500 self-center">+</g-button>
																</div>
																<div class="col-8 row-flex justify-end">
																	<g-button flat>
																		<img src="../assets/order/remove.svg">
																		<span class="ml-2 red-1">Remove item</span>
																	</g-button>
																</div>
															</g-layout>
														</td>
													</g-expansion-panel-content>
												</g-expansion-panel>
											</template>
										</g-expansion-panel-group>
										<template v-if="items.length < 12">
											<tr v-for="i in (12 - items.length)">
												<td colspan="4" style="height: 2.75rem"></td>
											</tr>
										</template>
									</template>
								</g-table>
							</div>
							<div class="h-12">
								<g-layout row>
									<div class="col-6 pa-2 pr-4 pl-4 fw-400 col-flex justify-between">
										<p class="row-6 row-flex pa-1">
											<span class="col-6 ta-left">Discount</span>
											<span class="col-6 ta-right">- €0.50</span>
										</p>
										<p class="row-6 row-flex pa-1">
											<span class="col-6 ta-left self-end">Tax</span>
											<span class="col-6 ta-right self-end">€0.50</span>
										</p>
									</div>
									<g-divider vertical inset></g-divider>
									<div class="col-6 pa-2 pr-4 pl-4 fw-400 col-flex justify-between">
										<p class="row-6 row-flex pa-1">
											<span class="col-6 ta-left">Sub-total</span>
											<span class="col-6 ta-right fw-700">€40.00</span>
										</p>
										<p class="row-6 row-flex pa-1">
											<span class="col-6 ta-left self-end">Total</span>
											<span class="col-6 ta-right red-1 fw-700 fs-large self-end">€40.50</span>
										</p>
									</div>
								</g-layout>
							</div>
						</g-layout>
					</g-container>
					<g-toolbar tile height="8%">
						<g-button color="#212121" width="20%" class="mr-2 btn__centered" @click="back">
							<img src="../assets/order/back.svg">
							<span class="ml-2 white">Back</span>
						</g-button>
						<g-button color="#ffffff" width="15%" class="mr-2 btn__centered">
							<img src="../assets/order/menu.svg">
							<span class="ml-2 dgray-2">More</span>
						</g-button>
						<g-button color="#ffffff" width="23%" class="mr-2 btn__centered">
							<img src="../assets/order/folder.svg">
							<span class="ml-2 dgray-2">Saved list</span>
						</g-button>
					</g-toolbar>
				</g-layout>
			</div>
			<div class="col-6" style="box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);">
				<g-layout column>
					<div class="row-2 col-flex pa-2 bg-category-menu">
						<g-layout row class="flex-equal pb-1">
							<g-button class="flex-equal mr-1" color="#ff4452" textColor="#ffffff">Featured Products</g-button>
							<g-button class="flex-equal mr-1" color="#ffffff">Hauptgerichte</g-button>
							<g-button class="flex-equal mr-1" color="#ffffff">Heißgetränk</g-button>
							<g-button class="w-10" color="#d6d6d6" textColor="#2f1ac3">
								<img src="../assets/order/next.svg">
							</g-button>
						</g-layout>
						<g-layout row class="flex-equal">
							<g-button class="flex-equal mr-1" color="#ffffff">Bier, Side, Gin Genuss</g-button>
							<g-button class="flex-equal mr-1" color="#ffffff">Wein, Cocktails</g-button>
							<g-button class="flex-equal mr-1" color="#ffffff">Longdrinks, Wishkeys, Tequila</g-button>
							<g-button class="w-10" color="#d6d6d6" textColor="#2f1ac3">
								<img src="../assets/order/prev.svg">
							</g-button>
						</g-layout>
					</div>
					<div class="row-5 pt-1 pl-1 pr-1">
						<g-layout row>
							<g-layout column class="col-3">
								<g-button class="flex-equal mb-1" color="#ffd3d5">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffd3d5">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffd3d5">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffd3d5">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffd3d5">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffd3d5">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#ffd3d5">Tiramisu</g-button>
							</g-layout>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#95ffef">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#95ffef">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#95ffef">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#95ffef">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#95ffef">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#95ffef">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#95ffef">Tiramisu</g-button>
							</g-layout>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#9ddaff">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#9ddaff">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#9ddaff">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#9ddaff">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#9ddaff">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#9ddaff">Tiramisu</g-button>
								<g-button class="flex-equal mb-1" color="#9ddaff">Tiramisu</g-button>
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
						</g-layout>
					</div>
					<div class="row-5 pl-1 pr-1 pb-1">
						<g-layout row>
							<g-number-keyboard class="col-6" v-model="product" :items="keyNumbers">
								<template v-slot:screen>
									<div class="number-key-show ba-dgray-4 ba-thin bg-lgray-2" style="height: calc(16.6667% - 3.4px)">
										<div class="number-key-screen col-6">
											<label for="number_key_output" class="number-key-text bg-dgray-9 ba-blue-9 ba-thin w-100 br-2 white fs-small-2 fw-400 pl-2">{{label}}</label>
										</div>
										<input id="number_key_output" class="number-key-text col-6 self-center ta-right bg-lgray-2 fs-large-2 fw-700 pr-2" style="border: none; outline: none; direction: rtl" v-model="product">
									</div>
								</template>
							</g-number-keyboard>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#8191ab" text-color="#1c1c1c" outline style="background-color: #efefef">Note</g-button>
								<g-button class="flex-equal mb-1" color="#8191ab" text-color="#1c1c1c" outline style="background-color: #efefef">Check Stack</g-button>
								<g-button class="flex-equal mb-1" color="#8191ab" text-color="#1c1c1c" outline style="background-color: #efefef">Price Change</g-button>
								<g-button class="flex-equal mb-1" color="#8191ab" text-color="#1c1c1c" outline style="background-color: #efefef">Credit Card</g-button>
								<g-button style="height: calc(33.3333% - 2.5px); font-size: 1.25rem" color="#fa6400" text-color="#ffffff">Quick Cash</g-button>
							</g-layout>
							<g-layout column class="col-3 pl-1">
								<g-button class="flex-equal mb-1" color="#efefef"></g-button>
								<g-button class="flex-equal mb-1" color="#8191ab" text-color="#1c1c1c" outline style="background-color: #efefef">Guest Info</g-button>
								<g-button class="flex-equal mb-1" color="#8191ab" text-color="#1c1c1c" outline style="background-color: #efefef">Discount</g-button>
								<g-button class="flex-equal mb-1" color="#8191ab" text-color="#1c1c1c" outline style="background-color: #efefef">Plastic Refund</g-button>
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

  import GButton from '@/components/GButton/GButton';
  import GDivider from '@/components/GLayout/GDivider';
  import GToolbar from '@/components/GLayout/GToolbar';
  import GTable from '@/components/GTable/GTable';
  import GNumberKeyboard from '@/components/GKeyboard/GNumberKeyboard';
  import GLayout from '@/components/GLayout/GLayout';
  import GContainer from '@/components/GLayout/GContainer';
  import GExpansionPanel from '@/components/GExpansionPanel/GExpansionPanel';
  import GExpansionPanelHeader from '@/components/GExpansionPanel/GExpansionPanelHeader';
  import GExpansionPanelContent from '@/components/GExpansionPanel/GExpansionPanelContent';
  import GExpansionPanelGroup from '../components/GExpansionPanel/GExpansionPanelGroup';

  export default {
    name: 'OrderDefault',
    components: { GExpansionPanelGroup, GDivider, GExpansionPanelContent, GExpansionPanelHeader, GExpansionPanel, GContainer, GLayout, GNumberKeyboard, GToolbar, GButton, GTable },
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
				activeItem: null,
        product: 0,
        label: '',
        keyNumbers: [
          { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['8'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['9'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['4'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['5'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['6'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['1'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['2'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['3'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['0'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['00'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append) },
          { content: ['x'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value) => value.substring(0, value.length - 1) },
          { content: ['C'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: () => '0' },
          { content: ['&crarr;'], classes: 'key-number key-number__extra white', type: 'enter', action: () => null, style: 'background-color: #000000; border-color: black; grid-area: Enter' }
        ],
				template: 'grid',
      }
    },
		methods: {
      back() {
        this.$router.push('/');
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
		border: 1px solid #e8e8e8;
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
</style>
