<template>
	<div>
		<g-button @click="show = !show" width="200px" height="100px" class="waves-effect waves-green-1">Show</g-button>
		<g-dialog v-model="show">
			<g-layout column class="dialog-wrapper__dark">
				<div class="row-11 pa-2">
					<g-layout column class="align-items-center">
						<div class="row-2 w-60 col-flex mb-3 bg-white pa-2 br-2">
							<p class="row-3 ta-center fs-large-2">Redefined % Discount</p>
							<div class="row-9 pa-2 row-flex mt-2">
								<g-tabs v-model="tabActiveItem">
									<template v-slot:tabs="{toggle, isActive}">
										<g-layout row>
											<g-tab v-for="(item, i) in discountItems" :key="i" class="flex-grow-1 mr-1">
												<div class="flex-grow-1 h-100 ma-1 bg-lgray-6 ba-lgray-4 ba-thin row-flex justify-center align-items-center pa-2 br-2 op-5" :class="{'tab__active': isActive(item)}" @click="toggle(item)">{{item.content}}</div>
											</g-tab>
										</g-layout>
									</template>
								</g-tabs>
							</div>
						</div>
						<div class="row-5 w-60 mb-3 bg-white pa-2 br-2 ba-blue-7 ba-1 col-flex">
							<p class="ta-center blue-7 fs-large">Manual Input</p>
							<div class="col-flex flex-grow-1">
								<div class="row-4 row-flex">
									<p class="col-3 ta-right mr-2 mt-3">% Discount</p>
									<g-text-field class="col-6 mt-2" centered :rules="isNumber" error-message="Invalid price!" placeholder="your number" v-model="percentage.value" :active="percentage.isActive" @focus="changeInput(percentage.type)">
										<template v-slot:after="{isValidInput}">
											<img v-if="isValidInput && percentage.value.length > 0" src="../assets/order/checked2.svg">
										</template>
									</g-text-field>
								</div>
								<div class="row-4 row-flex">
									<p class="col-3 ta-right mr-2 mt-3">€ Discount</p>
									<g-text-field class="col-6 mt-2" centered :rules="isNumber" error-message="Invalid price!" placeholder="your number" v-model="number.value" :active="number.isActive" @focus="changeInput(number.type)">
										<template v-slot:after="{isValidInput}">
											<img v-if="isValidInput && number.value.length > 0" src="../assets/order/checked2.svg">
										</template>
									</g-text-field>
								</div>
								<div class="row-4 row-flex align-items-center">
									<p class="col-3 ta-right mr-2">New Price (€)</p>
									<p class="col-6 ta-center">100</p>
								</div>
							</div>
						</div>
						<div class="row-4 w-30 mb-3 pa-3">
							<g-keyboard class="bg-transparent h-100" :items="keyboard" :template="keyboardTemplate" v-model="discountAmount.value"></g-keyboard>
						</div>
					</g-layout>
				</div>
				<g-toolbar height="8%">
					<g-button color="#212121" width="12%" class="btn__centered justify-center" @click="close()">
						<img src="../assets/order/back.svg">
						<span class="ml-2 white">Back</span>
					</g-button>
					<g-spacer></g-spacer>
					<g-button color="#ff4452" text-color="#ffffff" width="12%" class="btn__centered">
						<span class="col-8">Save</span>
						<span class="col-4 fs-large-2">&rarr;</span>
					</g-button>
				</g-toolbar>
			</g-layout>
		</g-dialog>
	</div>
</template>

<script>
  import GDialog from '../components/GDialog/GDialog';
  import GButton from '../components/GButton/GButton';
  import GTextField from '../components/GInput/GTextField';
  import GLayout from '../components/GLayout/GLayout';
  import GToolbar from '../components/GLayout/GToolbar';
  import GSpacer from '../components/GLayout/GSpacer';
  import GKeyboard from '../components/GKeyboard/GKeyboard';
  import GTabs from '../components/GTabs/GTabs';
  import GTab from '../components/GTabs/GTab';
  export default {
    name: 'DialogDemo',
    components: { GTab, GTabs, GKeyboard, GSpacer, GToolbar, GLayout, GTextField, GButton, GDialog },
    data() {
      return{
        show: false,
				text: 'asd',
				keyboard: [
					{content: ['0'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key0', action: (value, append) => (value + append)},
					{content: ['1'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key1', action: (value, append) => (value + append)},
					{content: ['2'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key2', action: (value, append) => (value + append)},
					{content: ['3'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key3', action: (value, append) => (value + append)},
					{content: ['4'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key4', action: (value, append) => (value + append)},
					{content: ['5'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key5', action: (value, append) => (value + append)},
					{content: ['6'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key6', action: (value, append) => (value + append)},
					{content: ['7'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key7', action: (value, append) => (value + append)},
					{content: ['8'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key8', action: (value, append) => (value + append)},
					{content: ['9'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: key9', action: (value, append) => (value + append)},
					{content: ['.'], classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: comma', action: (value, append) => (value + append)},
					{img: 'delivery/key_delete', classes: 'key-number bg-white ba-transparent waves-effect', style: 'grid-area: delete', action: value => value.substring(0, value.length-1)},
				],
				keyboardTemplate: 'grid-template: "key7 key8 key9" "key4 key5 key6" "key1 key2 key3" "key0 comma delete"/1fr 1fr 1fr',
				discountItems: [
					{content: '10%', value: 0.1},
					{content: '15%', value: 0.15},
					{content: '20%', value: 0.2},
					{content: '25%', value: 0.25},
					{content: '30%', value: 0.3},
				],
				tabActiveItem: null,
				isNumber: value => !isNaN(value),
				discountAmount: {value: ''},
				number: {type: 'number', value: '', isActive: false},
				percentage: {type: 'percentage', value: '', isActive: false},
			}
		},
		computed: {
      keyboardModel: {
        get() {
          return this.discountAmount.value;
				},
				set(value) {
          this.discountAmount.value = value;
          if(this.discountAmount.type === this.percentage.type) {
            this.percentage = this.discountAmount;
					} else if (this.discountAmount.type === this.number.type) {
            this.number = this.discountAmount;
					}
				}
			}
		},
		methods: {
      close() {
        this.show = false;
			},
			changeInput(type){
        if(type === this.percentage.type) {
          this.percentage.isActive = true;
          this.number.isActive = false;
          this.discountAmount = this.percentage;
				} else if(type === this.number.type) {
          this.percentage.isActive = false;
          this.number.isActive = true;
          this.discountAmount = this.number;
				}
			}
		}
  }
</script>

<style scoped>
	.tab__active {
		border: 1px solid #1271ff !important;
		color: #1271ff !important;
		opacity: 1 !important;
	}

	.input__active {
		border: 1px solid #1271ff !important;
	}
</style>