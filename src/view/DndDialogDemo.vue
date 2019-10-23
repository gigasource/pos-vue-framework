<template>
<!-- <g-dnd-dialog>-->

<!-- </g-dnd-dialog>-->
	<div>
		<g-btn width="100" height="50" @click="dnddialog = true">Open Dialog</g-btn>

		<g-dnd-dialog3 v-model="dnddialog">
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
		</g-dnd-dialog3>
	</div>
</template>

<script>
  import GDndDialog from '../components/GDndDialog/GDndDialog';
  import GDndDialog2 from '../components/GDndDialog/GDndDialog2';
  import GDndDialog3 from '../components/GDndDialog/GDndDialog3';
  import GBtn from '../components/GBtn/GBtn';
  export default {
    name: 'DndDialogDemo',
    components: { GDndDialog3, GDndDialog, GBtn },
		data () {
      return {
        dnddialog: false,
			}
		},
  }
</script>

<style scoped>

</style>