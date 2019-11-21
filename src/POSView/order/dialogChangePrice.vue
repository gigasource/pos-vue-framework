<template>
	<g-dialog v-model="dialogChangePrice" overlay-color="#6b6f82" overlay-opacity="0.95" width="65%">
		<div class="dialog-change w-100" :style="[{background: showKeyboard ? 'white' : 'transparent'}]">
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
						<g-text-field outlined :disabled="disabledAmount" v-model="newAmount" style="flex-grow: 1" placeholder="Other" @focus="showKeyboard = true" @blur="showKeyboard = false"></g-text-field>
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
				<pos-numpad/>
			</div>
		</div>
	</g-dialog>
</template>

<script>
  import GDialog from '../../components/GDialog/GDialog';
  import GTextField from '../../components/GInput/GTextField';
  import GRadioGroup from '../../components/GRadio/GRadioGroup';
  import GRadio from '../../components/GRadio/GRadio';
  import GBtn from '../../components/GBtn/GBtn';
  import PosNumpad from '../../POSComponents/PosNumpad';

  export default {
    name: 'dialogChangePrice',
    components: { PosNumpad, GBtn, GRadio, GRadioGroup, GTextField, GDialog },
    props: {
      value: Boolean,
      product: null,
    },
    data() {
      return {
        changeType: null,
        showKeyboard: false,
        newPrice: 0,
        newPercent: 0,
        newAmount: 0,
        rulePercent: {
          percent: value => (value < 100 && value > 0) || 'Input: 0 - 100',
        },
      }
    },
    computed: {
      dialogChangePrice: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
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
      changePrice() {
        if (!this.product) {
          this.dialogChangePrice = false;
          return;
        }
        this.product.edited = true;
        this.$emit('change-price', this.product)
        this.dialogChangePrice = false;
      }
    }
  }
</script>

<style lang="scss">
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

			div:not(.action) .g-btn {
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
			padding: 16px 180px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
			margin-top: -16px;

			.key-number {
				padding: 10px 8px;
				background: #FFFFFF;
				border: 1px solid #979797;
				box-sizing: border-box;
				border-radius: 4px;
				font-family: "Muli", sans-serif;
			}
		}
	}
</style>