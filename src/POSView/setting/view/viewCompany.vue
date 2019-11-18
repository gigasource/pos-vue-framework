<template>
	<div>
		<div style="padding-left: 256px">Company</div>
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
  export default {
    name: 'viewCompany',
    components: { GIcon, GBtn, GToolbar }
  }
</script>

<style scoped>

</style>