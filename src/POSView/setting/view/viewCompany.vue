<template>
	<div>
		<div style="padding-left: 256px">
			<div class="main">
				<div class="main__item">
					<p>Company Name</p>
					<g-text-field solo filled dense :appendInnerIcon="keyboardIcon"></g-text-field>
				</div>
				<div class="main__item">
					<p>Address</p>
					<g-text-field solo filled dense :appendInnerIcon="keyboardIcon"></g-text-field>
				</div>
				<div class="main__item">
					<p>Telephone</p>
					<g-text-field solo filled dense :appendInnerIcon="keyboardIcon"></g-text-field>
				</div>
				<div class="main__item">
					<p>Tax Number</p>
					<g-text-field solo filled dense :appendInnerIcon="keyboardIcon"></g-text-field>
				</div>
				<div class="main__item">
					<p>Logo</p>
					<g-file-input solo filled dense :prependInnerIcon="uploadIcon"></g-file-input>
				</div>
				<div>
					<p>Logo size</p>
					<div class="logo">
						<div v-for="i in 6" class="item">
							{{i}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<g-toolbar absolute bottom color="grey lighten 3">
			<g-btn background-color="white" text-color="#1d1d26" class="ma-2">
				<g-icon class="mr-2">
					{{require('../../../assets/order/back.svg')}}
				</g-icon>
				Back
			</g-btn>
		</g-toolbar>
	</div>
</template>

<script>
  import GToolbar from '../../../components/GToolbar/GToolbar';
  import GBtn from '../../../components/GBtn/GBtn';
  import GIcon from '../../../components/GIcon/GIcon';
  import GTextField from '../../../components/GInput/GTextField';
  import GFileInput from '../../../components/GFileInput/GFileInput';
  import upload from '../../../assets/config/upload.svg';
  import keyboard from '../../../assets/config/keyboard.svg';

  export default {
    name: 'viewCompany',
    components: { GFileInput, GTextField, GIcon, GBtn, GToolbar },
    data() {
      return {
        uploadIcon: upload,
				keyboardIcon: keyboard
      }
    }
  }
</script>

<style scoped lang="scss">
	.main {
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		grid-auto-columns: 1fr 1fr;
		grid-auto-flow: column;
		grid-gap: 32px;
		padding: 32px;
		height: 44%;
	}

	.g-tf-wrapper {
		margin: 8px 0 0 0;

		::v-deep .g-tf .g-tf-input {
			padding: 4px 6px;
		}

		::v-deep .g-tf-append__inner {
			margin-right: 8px;
		}
	}

	.g-file-input {
		::v-deep .g-tf-prepend__inner {
			padding: 0;
			margin: 0 0 0 16px;

			img {
				font-size: 16px !important;
				width: 16px !important;
				height: 16px !important;
			}
		}
	}

	.main__item {
		padding-right: 32px;
	}

	.logo {
		display: flex;

		.item {
			background: #F0F0F0;
			border: 1px solid #C9C9C9;
			box-sizing: border-box;
			border-radius: 2px;
			padding: 12px 16px;
			margin: 8px 8px 0 0;
			font-size: 13px;
			line-height: 16px;
		}
	}
</style>