<template>
	<div style="background-color: #e6e9ec; height: 100%">
		<g-expansion v-model="activeItem" :items="items" item-header="name" item-content="message" popout mandatory>
		</g-expansion>
	</div>
</template>
<script>
  import GIcon from '../components/GIcon/GIcon';
  import GBtn from '../components/GBtn/GBtn';
  import GExpansion from '../components/GExpansion/GExpansion';
  export default {
    name: 'ExpansionPanel',
    components: { GExpansion, GIcon, GBtn },
    props: {},
    data: function () {
      return {
        activeItem: null,
				activeItem2: null,
        items : [
          {
            name: 'Item1',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            name: 'Item2',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            name: 'Item3',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            name: 'Item4',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            name: 'Item5',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }
        ]
			}
    },
    computed: {},
    methods: {

		}
  }
</script>
<style scoped>
</style>