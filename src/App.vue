<template>
	<div id="app" class="vertical-body-responsive-wrapper">
		<g-layout column v-if="$route.path === '/'">
			<router-link to="/demo">Demo</router-link>
			<router-link to="/order-default">OrderDefault</router-link>
			<router-link to="/groupable">Groupable</router-link>
		</g-layout>
		<router-view></router-view>
	</div>
</template>

<script>

  import GLayout from '@/components/GLayout';
  import GContainer from '@/components/GContainer';
  export default {
    name: 'app',
    components: { GContainer, GLayout },
  }
</script>

<style>

</style>
