<template>
	<div class="container">
		<div class="wrapper">
			<g-chip-new filter close text-color="red" draggable ripple>
<!--			<g-icon>mdi-account-circle</g-icon>-->
				Default chip
			</g-chip-new>
		</div>
	</div>
</template>

<script>
  import GChip from '../components/GChip/GChip';
  import GMenu from '../components/GMenu/GMenu';
  import GBtn from '../components/GBtn/GBtn';
  import GList from '../components/GList/GList';
  import GListItem from '../components/GList/GListItem';
	import GChipNew from '../components/GChip/GChipNew';
	import GIcon from '../components/GIcon/GIcon';

  export default {
    name: 'ChipDemo',
    components: { GIcon, GChipNew, GListItem, GList, GBtn, GMenu, GChip }
  }
</script>

<style scoped>
	.avatar-image {
		border-radius: 50%;
	}

	.wrapper {
		display: block;
		flex-wrap: wrap;
	}

	.container {
		display: block;
	}

	.wrapper > * {
		margin: 10px 0 10px 10px;
	}
</style>
