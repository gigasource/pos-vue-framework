<template>
	<g-dialog v-model="dialog" overlay-color="#6b6f82" overlay-opacity="0.95" width="40%" lazy>
		<g-card class="w-100">
			<g-card-title>
				Confirmation
			</g-card-title>
			<g-card-text>
				Are you sure you want to delete payment <b>"Cash"</b>?
			</g-card-text>
			<g-card-actions>
				<g-btn flat background-color="#efefef">Cancel</g-btn>
				<g-btn flat background-color="red lighten 2" text-color="white">OK</g-btn>
			</g-card-actions>
		</g-card>
	</g-dialog>
</template>

<script>
  import GDialog from '../../../components/GDialog/GDialog';
  import GCard from '../../../components/GCard/GCard';
  import GCardTitle from '../../../components/GCard/GCardTitle';
  import GBtn from '../../../components/GBtn/GBtn';
  import { GCardActions, GCardText } from '../../../components/GCard/GCardFunctionalComponent';

  export default {
    name: 'dialogDeletePayment',
    components: { GCardActions, GCardText, GBtn, GCardTitle, GCard, GDialog },
    props: {
      value: null,
    },
		computed: {
      dialog: {
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
	.g-card {
		.g-card-title,
		.g-card-text {
			justify-content: center;
			text-align: center;
			color: #1d1d26;
		}

		.g-card-text {
			padding: 32px 64px;
		}

		.g-card-actions {
			justify-content: flex-end;

			.g-btn {
				min-width: 120px !important;
			}
		}
	}
</style>