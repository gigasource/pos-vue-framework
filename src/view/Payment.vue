<template>
	<div id="app" class="vertical-body-responsive-wrapper">
		<g-layout row>
			<div class="col-6">
				<g-layout column class="r">
					<g-container class="h-90">
						<g-layout column>
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
												<g-expansion-panel class="table-row-group" v-for="item in items">
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
							<div class="row-2 row-flex pt-3">
								<div class="col-12 h-80 self-center">
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
							</div>
						</g-layout>
					</g-container>
					<g-toolbar tile height="8%">
						<g-button color="#212121" width="25%" class="mr-2 btn__centered justify-center" @click="back()">
							<img src="../assets/order/back.svg">
							<span class="ml-2 white">Back</span>
						</g-button>
						<g-button color="#ffffff" width="15%" class="mr-2 btn__centered justify-center">
							<img src="../assets/order/menu.svg">
							<span class="ml-2 dgray-2">More</span>
						</g-button>
						<g-button color="#ffffff" width="33%" class="mr-2 btn__centered">
							<img src="../assets/order/cashier.svg">
							<span class="ml-2 dgray-2">Cashier Drawer</span>
						</g-button>
					</g-toolbar>
				</g-layout>
			</div>
			<div class="col-6 pa-2 col-flex" style="box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);">
				<g-layout row class="h-12 align-items-center">
						<g-text-field v-model="balance" class="col-6" large bordered text-color="#1271ff">
							<template v-slot:label>
								<span class="fw-700 fs-small">Balance due</span>
							</template>
						</g-text-field>
						<g-text-field v-model="change" class="col-3 pl-2" large bordered>
							<template v-slot:label>
								<span class="fw-700 fs-small">Change</span>
							</template>
						</g-text-field>
						<g-text-field v-model="tip" class="col-3 pl-2" large bordered>
							<template v-slot:label>
								<span class="fw-700 fs-small">Tip</span>
							</template>
						</g-text-field>
				</g-layout>
					<g-tabs v-model="activeItem" class="flex-grow-1">
						<template v-slot:tabs="{toggle, isActive}">
							<g-layout row class="row-3 mt-5">
								<g-tab v-for="(item, i) in tabItems" class="flex-grow-1 mr-1">
									<g-button class="btn__centered w-100 h-100" outline :class="{'button__active': isActive(item)}" @click="toggleTab(toggle, item)">
										<img class="col-4" :src="getImg(item.img)">
										<span class="ml-2">{{item.content}}</span>
									</g-button>
								</g-tab>
							</g-layout>
						</template>
						<template v-slot:default="{isActive}">
							<g-tab-item v-for="(item, i) in tabItems" :key="i" v-if="isActive(item)" class="flex-grow-1 justify-center">
								<g-text-field class="self-center w-70" large bordered centered placeholder="Enter Amount here" v-model="item.amount"></g-text-field>
							</g-tab-item>
						</template>
					</g-tabs>
				<g-layout column class="row-6">
					<g-layout row class="h-80">
						<g-keyboard class="col-8 pr-1 pb-2" :template="template" :items="keyboard" v-model="keyboardModel"></g-keyboard>
						<g-layout column class="col-4">
							<g-button class="flex-equal mb-2" outline color="#8191ab" text-color="#1c1c1c">Voucher € 10</g-button>
							<g-button class="flex-equal mb-2" outline color="#8191ab" text-color="#1c1c1c">Discount 10%</g-button>
							<g-button class="flex-equal mb-2" color="#eaeaea"></g-button>
							<g-button class="flex-equal mb-2" color="#eaeaea"></g-button>
						</g-layout>
					</g-layout>
					<g-layout row class="h-20">
						<g-button class="flex-equal" outline color="#8191ab" text-color="#1c1c1c">Multiple Payment</g-button>
						<g-button class="flex-equal ml-1" color="#eaeaea"></g-button>
						<g-button class="flex-equal ml-1 fs-large-2" color="#ff4452" text-color="#ffffff">Pay</g-button>
					</g-layout>
				</g-layout>
			</div>
		</g-layout>
	</div>
</template>

<script>
  import GButton from '@/components/GButton';
  import GToolbar from '@/components/GToolbar';
  import GTable from '@/components/GTable/GTable';
  import GNumberKeyboard from '@/components/GKeyboard/GNumberKeyboard';
  import GLayout from '@/components/GLayout';
  import GContainer from '@/components/GContainer';
  import GExpansionPanel from '@/components/GExpansionPanel/GExpansionPanel';
  import GExpansionPanelHeader from '@/components/GExpansionPanel/GExpansionPanelHeader';
  import GExpansionPanelContent from '@/components/GExpansionPanel/GExpansionPanelContent';
  import GDivider from '../components/GDivider';
  import GTextField from '../components/GInput/GTextField';
  import GKeyboard from '../components/GKeyboard/GKeyboard';
  import GTabs from '../components/GTabs/GTabs';
  import GTab from '../components/GTabs/GTab';
  import GTabItem from '../components/GTabs/GTabItem';
  import GExpansionPanelGroup from '../components/GExpansionPanel/GExpansionPanelGroup';

  export default {
    name: 'Payment',
    components: { GExpansionPanelGroup, GTabItem, GTab, GTabs, GKeyboard, GTextField, GDivider, GExpansionPanelContent, GExpansionPanelHeader, GExpansionPanel, GContainer, GLayout, GNumberKeyboard, GToolbar, GButton, GTable },
    data() {
      return {
        headers: ['Name', 'Qty', 'Each', 'Total'],
        items: [
          { name: 'Product item 1', quantity: 1, price: '€5.52', total: '€5.52' },
          { name: 'Product item 2', quantity: 2, price: '€10.00', total: '€20.00' },
          { name: 'Product item 3', quantity: 1, price: '€4.00', total: '€4.00' },
          { name: 'Product item 4', quantity: 1, price: '€0.50', total: '€0.50' },
          { name: 'Product item 5', quantity: 2, price: '€0.50', total: '€1.00' },
          { name: 'Product item 6', quantity: 1, price: '€5.52', total: '€5.52' },
        ],
				balance: '€ 350',
				change: '€ 0',
				tip: '€ 0',
				keyboard: [
					{content:['7'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key7', action: (value, append) => (value + append)},
					{content:['8'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key8', action: (value, append) => (value + append)},
					{content:['9'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key9', action: (value, append) => (value + append)},
					{content:['€ 100'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key100', action: (value, append) => (value + append)},
					{content:['4'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key4', action: (value, append) => (value + append)},
					{content:['5'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key5', action: (value, append) => (value + append)},
					{content:['6'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key6', action: (value, append) => (value + append)},
					{content:['€ 50'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key50', action: (value, append) => (value + append)},
					{content:['1'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key1', action: (value, append) => (value + append)},
					{content:['2'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key2', action: (value, append) => (value + append)},
					{content:['3'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key3', action: (value, append) => (value + append)},
					{content:['€ 20'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key20', action: (value, append) => (value + append)},
					{content:['0'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key0', action: (value, append) => (value + append)},
					{content:[','], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: comma', action: (value, append) => (value + append)},
					{img: 'delivery/key_delete', classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: delete', action: value => value.substring(0, value.length-1)},
					{content:['€ 10'], classes: 'key-number bg-white ba-dgray-4 ba-thin', style: 'grid-area: key10', action: (value, append) => (value + append)},
				],
				template: 'grid-template: "key7 key8 key9 key100" "key4 key5 key6 key50" "key1 key2 key3 key20" "key0 comma delete key10"/ 1fr 1fr 1fr 1fr; grid-gap: 8px 4px;',
				amount: '',
				tabItems: [
					{content: 'Cash', img: 'order/cash', amount: ''},
					{content: 'Credit Card', img: 'order/credit_card', amount: ''},
					{content: 'Master Card', img: 'order/master_card', amount: ''},
				],
				activeItem: null,
			}
		},
		computed: {
      keyboardModel: {
        get() {
          return this.activeItem.amount;
				},
				set(value) {
          this.activeItem.amount = value;
				}
			}
		},
		methods: {
      getImg(name) {
        return require('../assets/' + name + '.svg');
      },
			toggleTab(toggle, item){
        this.amount = item.amount;
        toggle(item);
			},
			back() {
        this.$router.push('/');
			}
		},
		created() {
      this.activeItem = this.tabItems[0];
		}
  }
</script>

<style scoped>
.button__active {
	background-color: #046eff;
	color: #ffffff;
}
</style>