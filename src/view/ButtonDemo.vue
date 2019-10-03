<template>
	<div class="wrapper">
		<g-btn raised>RAISED BUTTON</g-btn>
		<g-btn depressed>DEPRESSED BUTTON</g-btn>
		<g-btn outlined color="#009688">OUTLINED BUTTON</g-btn>
		<g-btn rounded color="#009688">ROUNDED BUTTON</g-btn>
		<g-btn fab fab-radius="30" color="#009688" outlined>FAB</g-btn>
		<g-btn rounded>ICON</g-btn>
		<g-btn flat background-color="#ffab91">FLAT BUTTON</g-btn>
		<g-btn disabled>DISABLED BUTTON</g-btn>
		<g-btn tile>TILE BUTTON</g-btn>
	</div>
</template>

<script>
  import GBtn from '../components/GBtn/GBtn';

  export default {
    name: 'ButtonDemo',
    components: { GBtn }
  }
</script>

<style scoped>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.wrapper > * {
		margin: 10px 0 10px 10px;
	}
</style>
