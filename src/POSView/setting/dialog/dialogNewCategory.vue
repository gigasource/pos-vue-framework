<template>
	<g-dialog v-model="dialogNewCategory" fullscreen>
		<div class="dialog-payment w-100">
			<div class="form">
				<p class="ml-1 mb-3">Create New Category</p>
				<p-o-s-text-field style="width: 268px" label="Name" placeholder="Category name" v-model="name"/>
			</div>
			<div class="keyboard-wrapper">
				<pos-keyboard-full v-model="name"/>
			</div>
			<g-toolbar bottom color="grey lighten 3">
				<g-btn background-color="white" text-color="#1d1d26" class="ma-2">
					<g-icon class="mr-2" svg @click="dialogNewCategory = false">
						icon-back
					</g-icon>
					Back
				</g-btn>
			</g-toolbar>
		</div>
	</g-dialog>
</template>

<script>
  import GDialog from '../../../components/GDialog/GDialog';
  import POSTextField from '../../../POSComponents/POSInput/POSTextField';
  import POSFileInput from '../../../POSComponents/POSInput/POSFileInputImage';
  import GKeyboard from '../../../components/GKeyboard/GKeyboard';
  import GToolbar from '../../../components/GToolbar/GToolbar';
  import GBtn from '../../../components/GBtn/GBtn';
  import GIcon from '../../../components/GIcon/GIcon';
  import GSpacer from '../../../components/GLayout/GSpacer';
  import PosKeyboardFull from '../../../POSComponents/PosKeyboardFull';

  export default {
    name: 'dialogNewCategory',
    components: { PosKeyboardFull, GSpacer, GIcon, GBtn, GToolbar, GKeyboard, POSFileInput, POSTextField, GDialog },
    data() {
      return {
				name: '',
      }
    },
    props: {
      value: null,
    },
    computed: {
      dialogNewCategory: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	.dialog-payment {
		background-color: white;
		display: flex;
		flex-direction: column;

		.form {
			padding: 32px 32px 0;
			color: #1d1d26;
			font-weight: 700;
		}

		::v-deep .keyboard-wrapper {
			position: absolute;
			bottom: 64px;
			height: 35%;
			width: 100%;
			padding: 16px;
			background-color: #BDBDBD;
		}
	}

</style>