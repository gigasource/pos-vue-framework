<template>
	<div id="app" class="body-wrapper__responsive__vertical" data-app>
		<g-layout vertical v-if="$route.path === '/'">
			<router-link to="/order">Order</router-link>
      <router-link to="/login">Login</router-link>
			<router-link to="/article">Article</router-link>
			<router-link to="/function-button">Function Button</router-link>
		</g-layout>
		<router-view></router-view>
	</div>
</template>

<script>
	import GLayout from '@/components/GLayout/GLayout';

	export default {
    name: 'app',
    components: { GLayout },
  }
</script>

<style>
</style>