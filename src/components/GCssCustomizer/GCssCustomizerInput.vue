<script>
  import GTextField from '../GInput/GTextField';

  export default {
    name: 'GCssCustomizerInput',
    mixins: [GTextField],

  }
</script>
<style scoped lang="scss">
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
	}

	.g-tf-wrapper {
		margin: 0;

		.g-tf-affix {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 22px;
			color: rgba(0, 0, 0, 0.54);
			padding: 3px 6px 0 6px;
		}

		.g-tf-affix:last-child {
			padding: 3px 6px 0 0;
		}
	}

	.g-tf::before, .g-tf::after {
		display: none;

	}

	.g-tf-wrapper:not(.g-tf__filled):not(.g-tf__outlined) .g-tf-prepend__inner ~ .inputGroup {
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

	input {
		background-color: white;
		padding: 0 0 0 8px;

		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 22px;
		color: #424242;
	}

	::placeholder {
		color: #424242
	}
</style>
