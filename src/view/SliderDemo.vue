<template>
	<g-layout column>
		<g-slider v-model="value" thumb-label="always" class="h-10 ma-3" min="20"></g-slider>
	</g-layout>
</template>

<script>
  import GLayout from '../components/GLayout/GLayout';
  import GSlider from '../components/GInput/GSlider';
  import GButton from '../components/GButton/GButton';
  export default {
    name: 'SliderDemo',
    components: { GButton, GSlider, GLayout },
		data() {
      return {
        value: 10,
			}
		}
  }
</script>

<style scoped>

</style>