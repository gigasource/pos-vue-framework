<template>
	<div>
		<input :value="text">
		<g-keyboard v-model="text"></g-keyboard>
	</div>
</template>

<script>
  import GContainer from '../components/GContainer';
  import GLayout from '../components/GLayout';
  import GButton from '../components/GButton';
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