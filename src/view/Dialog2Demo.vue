<template>
	<div class="outerdiv">
		<g-dialog2 v-model="dialog" width="500px">
			<template v-slot:activator="{toggleOverlay}">
				<g-button width="100px" height="50px" @click="toggleOverlay">Dialog</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialog = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog2>

		<g-dialog2 v-model="dialogHideOverlay" width="500px" hide-overlay>
			<template v-slot:activator="{toggleOverlay}">
				<g-button width="100px" height="50px" @click="toggleOverlay">Dialog Hide Overlay</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogHideOverlay = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog2>

		<g-dialog2 v-model="dialogOverflow" width="500px">
			<template v-slot:activator="{toggleOverlay}">
				<g-button width="100px" height="50px" @click="toggleOverlay">Dialog Overflow</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogOverflow = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog2>

		<g-dialog2 v-model="dialogScrollable" width="500px" scrollable>
			<template v-slot:activator="{toggleOverlay}">
				<g-button width="100px" height="50px" @click="toggleOverlay">Dialog Scrollable</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogScrollable = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog2>

		<div></div>
		<g-button width="100px" height="50px" @click="dialogFullscreen = true">Dialog Fullscreen</g-button>
		<g-dialog2 v-model="dialogFullscreen" width="500px" scrollable fullscreen lazy>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogFullscreen = false">I accept</g-button>
					<g-button @click="dialog = true">Open Dialog</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog2>
	</div>
</template>

<script>
  import GDialog2 from '../components/GDialog/GDialog2';
  import GButton from '../components/GButton/GButton';
  import GCard from '../components/GCard/GCard';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GCardActions from '../components/GCard/GCardActions';
  import GCardText from '../components/GCard/GCardText';
  export default {
    name: 'Dialog2Demo',
    components: { GCardText, GCardActions, GCardTitle, GCard, GButton, GDialog2 },
		data() {
      return {
        dialog: false,
				dialogHideOverlay: false,
				dialogOverflow: false,
				dialogScrollable: false,
				dialogFullscreen: false,
			}
		}
  }
</script>

<style scoped>

</style>