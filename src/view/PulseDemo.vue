<template>
	<div>
		<h5>Pulse Effect:</h5>
		<g-button class="pulse ml-3" raised color="#1241ff" width="100px" height="50px">Button</g-button>
		<h5>Wave Effect:</h5>
		<g-button class="waves-effect waves-amber ml-3" width="100px" height="50px" >Button</g-button>
		<h5>Pulse & Wave (error - overflow conflict):</h5>
		<g-button class="pulse ml-3 waves-effect waves-amber" width="100px" height="50px" color="#ffddcc">Button</g-button>
	</div>
</template>

<script>
  import GButton from '../components/GButton/GButton';
  export default {
    name: 'PulseDemo',
    components: { GButton }
  }
</script>

<style scoped>

</style>