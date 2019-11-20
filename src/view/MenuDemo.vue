<template>
	<g-layout class="align-items-center justify-center">
		<g-menu v-model="showMenu2" close-on-content-click open-on-hover :open-delay="500" :close-delay="500" lazy>
			<template v-slot:activator="{toggleContent}">
				<g-btn @click="toggleContent" width="100px" height="50px">Activator</g-btn>
			</template>
			<div style="background-color: yellow">
				Content
			</div>
		</g-menu>
	</g-layout>
</template>

<script>
  import GLayout from '../components/GLayout/GLayout';
  import GMenu from '../components/GMenu/GMenu';
  import GList from '../components/GList/GList';
  import GListItem from '../components/GList/GListItem';
	import GBtn from '../components/GBtn/GBtn';

  export default {
    name: 'MenuDemo',
    components: { GBtn, GListItem, GList, GMenu, GLayout },
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
