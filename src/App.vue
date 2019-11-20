<template>
	<div id="app" class="body-wrapper__responsive__vertical" data-app>
		<g-layout vertical v-if="$route.path === '/'">
			<router-link to="/keyboard-demo">Keyboard Demo</router-link>
			<router-link to="/transition-demo">Transition</router-link>
			<router-link to="/connector-demo">Connector Demo</router-link>
		</g-layout>
		<router-view></router-view>
	</div>
</template>

<script>
  import GLayout from '@/components/GLayout/GLayout';
  import GContainer from '@/components/GLayout/GContainer';

  export default {
    name: 'app',
    components: { GContainer, GLayout },
  }
</script>

<style>

</style>
