<template>
	<div class="row-12 row-flex">
		<div class="layout__left">
			<div class="info">
				<div class="info__left">
					<g-avatar size="36">
						<g-img :src="require('../assets/order/customer_ava.svg')"/>
					</g-avatar>
					<p class="pa-1 ml-2" style="line-height: 16px">
						Select Customer
					</p>
					<g-icon small>add_circle</g-icon>
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
			<div class="table">
				<g-simple-table striped fixed-header style="height: 100%">
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
					<tbody>
					<tr v-for="order in orderDetail">
						<td style="color: inherit; padding: 0">
							<div class="row-flex" style="line-height: 1.75">
								<div class="flex-grow-1 pa-2 ta-left" style="font-size: 15px">
									<p>{{order.name}} <g-icon v-if="order.edited" small color="#f44336" style="margin-bottom: 5px">edit</g-icon></p>
									<p v-if="order.promotion" class="promotion">{{order.promotion}}</p>
								</div>
								<div class="w-10 pa-2 ta-center">{{order.unit}}</div>
								<div class="w-10 pa-2 ta-right">{{order.quantity}}</div>
								<div class="w-12 pa-2 ta-right">
									<p :class="[order.edited && 'text__edited']">{{order.price}}</p>
									<p v-if="order.promotion && order.oldPrice" class="promotion-price">{{order.oldPrice}}</p>
								</div>
								<div class="W-12 pa-2 ta-right">
									<p :class="[order.edited && 'text__edited']">{{order.price * order.quantity}}</p>
									<p v-if="order.promotion && order.oldPrice" class="promotion-price">{{order.oldPrice * order.quantity}}</p>
								</div>
							</div>
						</td>
					</tr>
					</tbody>
				</g-simple-table>
			</div>
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
				<g-btn outlined>F1</g-btn>
				<g-btn outlined>F2</g-btn>
			</div>
			<g-toolbar class="toolbar" color="#eee" elevation="0">
				<g-btn background-color="white">
					<router-link to="/order">
						<g-icon>{{require('../assets/order/back.svg')}}</g-icon>
						<span style="color: rgba(0, 0, 0, 0.87)">Back</span>
					</router-link>
				</g-btn>
				<g-btn background-color="white">
					<g-icon>{{require('../assets/order/menu.svg')}}</g-icon>
					More
				</g-btn>
				<g-btn background-color="white" @click="dialogSavedList = true">
					<g-icon>{{require('../assets/order/cashier.svg')}}</g-icon>
					Cashier drawer
				</g-btn>
			</g-toolbar>
		</div>
		<div class="layout-right">
			<div class="screen">
				<div class="two-head">
					<p>Balance due</p>
					<p>Amount Tendered</p>
				</div>
				<div>Change</div>
				<div class="input two-head">
					<p class="balance">€ {{convertMoney(total)}}</p>
					<p class="amount">€ {{amount}}</p>
				</div>
				<div class="input change">
					€ {{parseInt(change)}}
				</div>
				<div>
					Tip
					<span class="tip">€ {{tip}}</span>
				</div>
			</div>
			<div class="main">
				<g-btn x-large flat background-color="blue accent 3" text-color="white">
					<g-icon>{{require('../assets/order/cash.svg')}}</g-icon>
					<span class="ml-2">Cash</span>
				</g-btn>
				<g-btn x-large outlined text-color="#1271ff" class="ml-3">
					<g-icon>{{require('../assets/order/credit_card.svg')}}</g-icon>
					<span class="ml-2 text-black">Card</span>
				</g-btn>
			</div>
			<div class="action">
				<g-number-keyboard class="keyboard" :items="keyboard" :template="template" v-model="amount">
					<template v-slot:screen>
						<div></div>
					</template>
				</g-number-keyboard>
				<div class="disabled"></div>
				<div class="disabled"></div>
				<div class="disabled"></div>
				<div class="disabled"></div>
				<g-btn outlined text-color="#979797">
					<span style="color: #1c1c1c; font-size: 16px">Multiple Payment</span>
				</g-btn>
				<div class="disabled"></div>
				<g-btn flat background-color="blue darken 1" text-color="white">
					<span class="fs-large-2">Pay</span>
				</g-btn>
			</div>
		</div>
	</div>
</template>

<script>
  import GBtn from '../components/GBtn/GBtn';
  import GRow from '../components/GLayout/GRow';
  import GAvatar from '../components/GAvatar/GAvatar';
  import GImg from '../components/GImg/GImg';
  import GSimpleTable from '../components/GSimpleTable/GSimpleTable';
  import GDivider from '../components/GLayout/GDivider';
  import GToolbar from '../components/GToolbar/GToolbar';
  import GIcon from '../components/GIcon/GIcon';
  import GTextField from '../components/GInput/GTextField';
  import GSpacer from '../components/GLayout/GSpacer';
  import GKeyboard from '../components/GKeyboard/GKeyboard';
  import GNumberKeyboard from '../components/GKeyboard/GNumberKeyboard';

  export default {
    name: 'Payment',
    components: { GNumberKeyboard, GKeyboard, GSpacer, GTextField, GIcon, GToolbar, GDivider, GSimpleTable, GImg, GAvatar, GRow, GBtn },
    data() {
      return {
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
						edited: true,
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
            oldPrice: '7.52',
            promotion: 'Promotion A',
          },
        ],
        product: null,
        discount: -0.50,
        tax: 0.50,
        subTotal: 40.00,
        total: 40.00,
				amount: 100,
				tip: 0,
				keyboard: [
					{ content: ['7'], style: 'grid-area: key7', action: (value, append) => (value + append)},
					{ content: ['8'], style: 'grid-area: key8', action: (value, append) => (value + append)},
					{ content: ['9'], style: 'grid-area: key9', action: (value, append) => (value + append)},
					{ content: ['€ 100'], style: 'grid-area: key100', action: (value) => (value + 100)},
					{ content: ['4'], style: 'grid-area: key4', action: (value, append) => (value + append)},
					{ content: ['5'], style: 'grid-area: key5', action: (value, append) => (value + append)},
					{ content: ['6'], style: 'grid-area: key6', action: (value, append) => (value + append)},
					{ content: ['€ 50'], style: 'grid-area: key50', action: (value) => (value + 50)},
					{ content: ['1'], style: 'grid-area: key1', action: (value, append) => (value + append)},
					{ content: ['2'], style: 'grid-area: key2', action: (value, append) => (value + append)},
					{ content: ['3'], style: 'grid-area: key3', action: (value, append) => (value + append)},
					{ content: ['€ 20'], style: 'grid-area: key20', action: (value) => (value + 20)},
					{ content: ['0'], style: 'grid-area: key0', action: (value, append) => (value + append)},
					{ content: [','], style: 'grid-area: keyC', action: (value, append) => (value + append)},
					{ img: 'delivery/key_delete', style: 'grid-area: keyD', action: (value) => (value && value.substring(0, value.length - 1))},
					{ content: ['€ 10'], style: 'grid-area: key10', action: (value) => (value + 10)},
				],
				template: 'grid-template-areas: "key7 key8 key9 key100" "key4 key5 key6 key50" "key1 key2 key3 key20" "key0 keyC keyD key10"; grid-auto-rows: 1fr; grid-auto-columns: 1fr; grid-gap: 6px'
      }
    },
		computed: {
			change () {
			  return this.convertMoney(this.amount - this.total);
			}
		},
    methods: {
      convertMoney(val) {
        if (val && typeof (val) === 'number') {
          return val.toFixed(2)
        } else {
          return 0
        }
      },
    }
  }
</script>

<style scoped lang="scss">
	.layout__left {
		flex-basis: 50%;
		width: 50%;
		display: grid;
		background-color: #fff;
		grid-template: "info" "table" "report" "." "action" "toolbar";
		grid-template-rows: 8% auto 11% 1fr 9% 8%;

		.info {
			grid-area: info;
			display: flex;

			.info__left {
				flex-basis: 50%;
				display: flex;
				padding: 16px 16px 16px 6px;
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
			margin: 6px;
			overflow: hidden;

			.g-table {
				border: 1px solid #e8e8e8;
				border-radius: 6px;
				font-size: 13px;
			}

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

			::v-deep .g-toolbar-content {
				height: 100% !important;

				& > .g-btn:first-child {
					margin-left: 0;
				}
			}

			::v-deep .g-toolbar-background {
				height: 100% !important;

				& > div {
					height: 100% !important;
					box-shadow: inset -8px 0 8px -8px rgba(0, 0, 0, 0.25);
				}
			}
		}
	}

	.layout-right {
		flex-basis: 50%;
		width: 50%;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.252295);

		::v-deep .g-btn {
			text-transform: none;
		}

		.screen {
			flex-basis: 16.6667%;
			max-height: 16.6667%;
			display: grid;
			grid-template-columns: 2fr 1fr;
			grid-template-rows: 1fr 4fr 1fr;
			grid-gap: 6px;
			padding: 12px;
			line-height: 16px;
			font-size: 13px;
			font-weight: 700;

			.two-head {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.input {
				border: 1px solid #c9c9c9;
				background: #f0f0f0;
				border-radius: 4px;
				padding: 16px;

				.balance {
					font-size: 24px;
					color: #1271ff;
				}

				.amount {
					font-size: 20px;
				}

				&.change {
					display: flex;
					align-items: center;
					font-size: 20px;
				}
			}

			.tip {
				font-weight: 400;
			}
		}

		.main {
			flex-grow: 1;
			flex-basis: 0;
			padding: 12px;
			display: flex;
		}

		.action {
			flex-basis: 50%;
			max-height: 50%;
			padding: 12px;
			display: grid;
			grid-template-rows: repeat(5, 1fr);
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 6px;

			.keyboard {
				grid-area: 1/1/5/3;

				::v-deep .key {
					background: #FFFFFF;
					border: 1px solid #979797;
					box-sizing: border-box;
					border-radius: 6px;
					box-shadow: none;
					font-size: 20px;
					font-weight: 700;
					font-family: "Muli", sans-serif;
				}
			}

			::v-deep .g-btn {
				height: 100% !important;
			}

			div.disabled {
				background: #DFDFDF;
				opacity: 0.5;
				border: 1px solid #9B9B9B;
				border-radius: 6px;
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

		.text__edited {
			color: #F44336;
		}

		.promotion {
			color: #979797;
			margin-left: 8px;
			line-height: 1;

			&-price {
				color: #979797;
				text-decoration: line-through;
				margin-top: 4px;
				line-height: 1;
			}
		}
	}

	.g-data-table__wrapper {
		border-radius: inherit;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	a:visited, a:link {
		text-decoration: none;
	}
</style>
