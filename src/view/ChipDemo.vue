<template>
<div class="wrapper">
	<g-chip>TUAN</g-chip>
</div>
</template>

<script>
  import GChip from '../components/GChip/GChip';
  export default {
    name: 'ChipDemo',
    components: { GChip }
  }
</script>

<style scoped>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.container {
		display: block;
	}

	.wrapper > * {
		margin: 10px 0 10px 10px;
	}
</style>
