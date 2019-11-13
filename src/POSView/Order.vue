<template>
	<div class="row-12 row-flex">
		<div class="layout-left">

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
				<g-number-keyboard class="keyboard" v-model="product" :items="keyboard">
					<template v-slot:screen>
						<div class="number-key-show ba-thin bg-grey-lighten-3" style="height: calc(16.6667% - 4px)">
							<input id="number_key_output" class="number-key-text col-12 self-center bg-transparent fs-large-2 fw-700 pl-2" style="border: none; outline: none" v-model="product">
						</div>
					</template>
				</g-number-keyboard>
				<div class="buttons">
					<g-btn outlined>F1</g-btn>
					<g-btn outlined>Note</g-btn>
					<g-btn outlined disabled>Disabled Button</g-btn>
					<g-btn outlined></g-btn>
					<g-btn text background-color="green lighten 1" text-color="white" class="big">Quick Cash</g-btn>
					<g-btn outlined>Change Price</g-btn>
					<g-btn outlined>Product Lookup</g-btn>
					<g-btn outlined>Discount</g-btn>
					<g-btn outlined>Plastic Refund</g-btn>
					<g-btn text background-color="orange lighten 1" text-color="white">Save</g-btn>
					<g-btn text background-color="blue darken 2" text-color="white">Pay</g-btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import GGridSelect from '../components/GGridSelect/GGridSelect';
  import GBtn from '../components/GBtn/GBtn';
  import GRow from '../components/GLayout/GRow';
  import GNumberKeyboard from '../components/GKeyboard/GNumberKeyboard';
  import GWindow from '../components/GWindow/GWindow';
  import GWindowItem from '../components/GWindow/GWindowItem';
  import GItemGroup from '../components/GItemGroup/GItemGroup';
  import GItem from '../components/GItemGroup/GItem';

  export default {
    name: 'Order',
    components: { GItem, GItemGroup, GWindowItem, GWindow, GNumberKeyboard, GRow, GBtn, GGridSelect },
    data() {
      return {
        product: 0,
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
          { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key7; border: 1px solid #979797'},
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
      }
    },
    methods: {
      selectMenu(item) {
        this.menuSelected = item;
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
	.layout-left {
		flex-basis: 50%;
		width: 50%;
		display: grid;
		background-color: #fff;
		grid-template: "info" "table" "report" "action" "toolbar"
		/*grid-template-rows: ;*/
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
			letter-spacing: 0;
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