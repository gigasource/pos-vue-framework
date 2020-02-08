<script>


  import GSelect from '../GSelect/GSelect';

  export default {
    name: 'GCssCustomizerSelect',
    mixins: [GSelect],
  }
</script>
<style scoped lang="scss">
	.g-select::v-deep {
		span {
			margin: 3px
		}

		.g-tf-wrapper {
			margin: 0;

      .g-tf-affix {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        width: 20px;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.54);
        padding: 0 6px;
      }

      .g-tf-affix:last-child {
        padding: 3px 6px 0 0;
      }
		}


		.g-tf {
			padding: 2px;

			&:focus-within {
				padding: 1px;
				border: 1px solid rgb(24, 103, 192);
				border-radius: 4px;
			}

			&:hover {
				padding: 1px;
				border: 1px solid #BDBDBD;
				border-radius: 4px;

				&:focus-within {
					padding: 1px;
					border: 1px solid rgb(24, 103, 192);
					border-radius: 4px;
				}
			}

			.g-tf-input.selections div {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				line-height: 22px;
				color: rgba(0, 0, 0, 0.54);
			}
		}

		.g-list {
			background-color: #00b0ff;
		}


		.g-tf::before, .g-tf::after {
			display: none;
		}

		.g-tf-input {
			display: flex;
      font-size: 14px;
      line-height: 22px;
      padding: 0;
		}

		.input {
			display: flex;
			padding: 0 8px;

			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 22px;
			color: rgba(0, 0, 0, 0.54);
		}

		.g-tf-label {
			top: -24px;
			font-size: 13px;
			line-height: 16px;
			color: #1D1D26;
		}

		.g-tf-label__active {
			transform: none;
		}

		.g-tf-append__inner {
			display: flex;
			align-items: center;
			transition: transform 0.4s;
			width: 22px;
			padding: 0 6px;

			.g-icon {
				color: #000000 !important;
			}
		}

		.g-list-item {
			padding: 0;
		}

		input {
			flex-shrink: 1;
			flex-grow: 1;
			flex-basis: 0%;
			padding: 0;
		}

		.g-tf-affix {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 22px;
			color: rgba(0, 0, 0, 0.54);
			padding: 3px 6px 0 6px;
		}

		.g-tf-prepend__inner {
			width: 22px;
			padding: 0 6px;
		}


		::placeholder {
			color: #424242
		}

	}


	.g-select__active::v-deep {
		.g-tf-append__inner .g-icon:last-child {
			transform: rotateZ(180deg);
		}
	}

	* {
		border: none;
	}

	.g-menu--content {
		.g-list ::v-deep {

			.g-list-item {
				min-height: 28px;

				.g-list-item-content {
					padding-left: 4px;
					margin-left: 0;
				}

				&__disabled {
					.g-list-item-text {
						color: lightslategray;
					}
				}
			}

			.g-list-item-icon {
				margin: 0 0 0 10px;

				~ .g-list-item-content {
					padding-left: 0;
				}
			}

			.g-list-item-text {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				line-height: 22px;
				color: #000000;
				padding: 3px 6px 0 6px;
			}
		}

	}


</style>
