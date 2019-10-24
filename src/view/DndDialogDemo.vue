<template>
	<div>
		<g-btn color="red" width="100" height="50" @click="dnddialog = true">Open Dialog</g-btn>

		<g-dnd-dialog v-model="dnddialog" width="300" height="250" lazy destroy-on-close>
			<template v-slot:title>
				Dialog header
			</template>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
			nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
			nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
			nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
			nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		</g-dnd-dialog>
	</div>
</template>

<script>
  import GDndDialog from '../components/GDndDialog/GDndDialog';
  import GBtn from '../components/GBtn/GBtn';
  export default {
    name: 'DndDialogDemo',
    components: { GDndDialog, GBtn },
		data () {
      return {
        dnddialog: false,
			}
		},
  }
</script>

<style scoped>

</style>