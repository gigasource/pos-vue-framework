<template>
	<div id="app" class="body-wrapper__responsive__vertical" data-app>
		<g-layout vertical v-if="$route.path === '/'">
			<router-link to="/keyboard-demo">Keyboard Demo</router-link>
			<router-link to="/transition-demo">Transition</router-link>
			<router-link to="/setting">Setting</router-link>
			<router-link to="/connector-demo">Connector Demo</router-link>
			<router-link to="/order">Order</router-link>
      <router-link to="/login">Login</router-link>
			<router-link to="/article">Article</router-link>
			<router-link to="/function-button">Function Button</router-link>
			<router-link to="/select-form">Select Form</router-link>
			<router-link to="/transform-form">Transform Form</router-link>
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
