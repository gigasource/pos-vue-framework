<template>
	<g-layout class="align-items-center justify-center">
		<g-menu v-model="showMenu2" lazy open-on-hover open-delay="500" close-delay="500">
			<template v-slot:activator="{toggleContent}">
				<g-button @click="toggleContent" width="100px" height="50px">Activator</g-button>
			</template>
			<div style="background-color: #ffe7a7">
				<g-layout column>
					<g-button v-for="i in 5" :key="i">Content Button {{i}}</g-button>
				</g-layout>
			</div>
		</g-menu>
	</g-layout>
</template>

<script>
  import GButton from '../components/GButton/GButton';
  import GLayout from '../components/GLayout/GLayout';
  import GMenu from '../components/GMenu/GMenu';

  export default {
    name: 'MenuDemo',
    components: { GMenu, GLayout, GButton },
    data() {
      return {
        showMenu: false,
        showMenu2: false,
        showMenu3: false
      }
    }
  }
</script>

<style scoped>

</style>