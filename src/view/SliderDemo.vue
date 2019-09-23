<template>
	<g-layout column>
		<g-slider v-model="value" thumb-label="always" class="h-10 ma-3" min="20"></g-slider>
		<g-range v-model="vals" thumb-label class="h-10 ma-3" thumb-color="#ffffff" track-fill-color="#1271ff"></g-range>
	</g-layout>
</template>

<script>
  import GLayout from '../components/GLayout/GLayout';
  import GSlider from '../components/GInput/GSlider';
  import GButton from '../components/GButton/GButton';
  import GRange from '../components/GInput/GRange';
  export default {
    name: 'SliderDemo',
    components: { GRange, GButton, GSlider, GLayout },
		data() {
      return {
        value: 50,
				vals: [10, 60],
			}
		}
  }
</script>

<style scoped>

</style>