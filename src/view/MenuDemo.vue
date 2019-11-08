<template>
	<g-layout class="align-items-center justify-center">
		<g-menu v-model="showMenu2" close-on-content-click open-on-hover :open-delay="500" :close-delay="500">
			<template v-slot:activator="{toggleContent}">
				<g-button @click="toggleContent" width="100px" height="50px">Activator</g-button>
			</template>
			<div style="background-color: yellow">
				Content
			</div>
		</g-menu>
	</g-layout>
</template>

<script>
  import GButton from '../components/GButton/GButton';
  import GLayout from '../components/GLayout/GLayout';
  import GMenu from '../components/GMenu/GMenu';
  import GList from '../components/GList/GList';
  import GListItem from '../components/GList/GListItem';

  export default {
    name: 'MenuDemo',
    components: { GListItem, GList, GMenu, GLayout, GButton },
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
