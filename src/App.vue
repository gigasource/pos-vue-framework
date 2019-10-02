<template>
	<div id="app" class="body-wrapper__responsive__vertical" data-app>
		<g-layout column v-if="$route.path === '/'">
			<router-link to="/keyboard-demo">Keyboard Demo</router-link>
			<router-link to="/order-default">OrderDefault</router-link>
			<router-link to="/groupable">Groupable</router-link>
			<router-link to="/payment">Payment</router-link>
			<router-link to="/dialog">Dialog demo</router-link>
			<router-link to="/slider">Slider demo</router-link>
			<router-link to="/menu-demo">Menu</router-link>
			<router-link to="/overlay-demo">Overlay</router-link>
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
