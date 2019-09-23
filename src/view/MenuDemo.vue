<template>
	<g-layout class="align-items-center justify-center">
		<g-menu-functional v-model="showMenu2" top lazy>
			<template v-slot:activator="{activate}">
				<g-button @click="activate" width="100px" height="50px">Activator</g-button>
			</template>
			<div style="background-color: #ffe7a7">
				<g-layout column>
					<g-button v-for="i in 5" :key="i">Content Button {{i}}</g-button>
				</g-layout>
			</div>
		</g-menu-functional>
	</g-layout>
</template>

<script>
  import GButton from '../components/GButton/GButton';
  import GLayout from '../components/GLayout/GLayout';
  import GMenuFunctional from '../components/GMenu/GMenuFunctional';

  export default {
    name: 'MenuDemo',
    components: { GMenuFunctional, GLayout, GButton },
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