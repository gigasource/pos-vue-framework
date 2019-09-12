<template>
	<div>
		<input :value="text">
		<g-keyboard v-model="text" class="bg-lgray-7"></g-keyboard>
	</div>
</template>

<script>
  import GContainer from '../components/GLayout/GContainer';
  import GLayout from '../components/GLayout/GLayout';
  import GButton from '../components/GButton/GButton';
  import GKeyboard from '../components/GKeyboard/GKeyboard';

  export default {
    name: 'Demo',
    components: { GKeyboard, GButton, GLayout, GContainer },
    data() {
      return {
        text: 'asdads'
      }
    }
  }
</script>

<style scoped>

</style>