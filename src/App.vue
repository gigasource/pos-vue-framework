<template>
	<div id="app" class="body-wrapper__responsive__vertical" data-app>
		<g-layout vertical v-if="$route.path === '/'">
			<router-link to="/keyboard-demo">Keyboard Demo</router-link>
			<router-link to="/order-default">OrderDefault</router-link>
			<router-link to="/groupable">Groupable</router-link>
			<router-link to="/payment">Payment</router-link>
			<router-link to="/slider">Slider demo</router-link>
			<router-link to="/menu-demo">Menu</router-link>
			<router-link to="/pulse-demo">Pulse</router-link>
			<router-link to="/card">Card</router-link>
			<router-link to="/overlay-demo">Overlay</router-link>
			<router-link to="/dialog-demo">Dialog Demo</router-link>
      <router-link to="/tool-tip-demo">Tooltip demo</router-link>
			<router-link to="/button">Button</router-link>
			<router-link to="/input">Input</router-link>
			<router-link to="/transition-demo">Transition</router-link>
			<router-link to="/list-demo">List</router-link>
			<router-link to="/selection-control">SelectIonControl</router-link>
      <router-link to="/date-picker-demo">DatePicker</router-link>
			<router-link to="/time-picker-demo">Time Picker</router-link>
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
