<template>
	<g-layout class="align-items-center justify-center">
		<g-menu v-model="showMenu">
			<template v-slot:activator="{click}">
				<g-button @click="click" width="100px" height="50px">Activator</g-button>
			</template>
			<div style="background-color: #ffe7a7">
				<g-layout column>
					<g-button v-for="i in 5" :key="i">Button {{i}}</g-button>
				</g-layout>
			</div>
		</g-menu>
		<g-menu-functional v-model="showMenu2">
			<template v-slot:activator="{activate}">
				<g-button @click="activate" width="100px" height="50px">Activator</g-button>
			</template>
			<div style="background-color: #ffe7a7">
				<g-menu-functional v-model="showMenu3">
					<template v-slot:activator="{activate}">
						<g-button @click="activate" style="z-index: 1">Activator</g-button>
					</template>
					<div style="background-color: white">abc</div>
				</g-menu-functional>
			</div>
		</g-menu-functional>
	</g-layout>
</template>

<script>
  import GMenu from '../components/GMenu/GMenu';
  import GButton from '../components/GButton/GButton';
  import GLayout from '../components/GLayout/GLayout';
  import GMenuFunctional from '../components/GMenu/GMenuFunctional';

  export default {
    name: 'MenuDemo',
    components: { GMenuFunctional, GLayout, GButton, GMenu },
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