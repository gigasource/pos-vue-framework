<template>
	<div class="outerdiv">
		<g-dialog v-model="dialog" width="500px">
			<template v-slot:activator="{ toggleDialog }">
				<g-button width="100px" height="50px" @click="toggleDialog">Dialog</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialog = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog>

		<g-dialog v-model="dialogPersistent" width="500px" persistent>
			<template v-slot:activator="{ toggleDialog }">
				<g-button width="100px" height="50px" @click="toggleDialog">Dialog Persistent</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogPersistent = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog>

		<g-dialog v-model="dialogHideOverlay" width="500px" hide-overlay>
			<template v-slot:activator="{ toggleDialog }">
				<g-button width="100px" height="50px" @click="toggleDialog">Dialog Hide Overlay</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogHideOverlay = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog>

		<g-dialog v-model="dialogOverflow" width="500px">
			<template v-slot:activator="{ toggleDialog }">
				<g-button width="100px" height="50px" @click="toggleDialog">Dialog Overflow</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogOverflow = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog>

		<g-dialog v-model="dialogScrollable" width="500px" scrollable>
			<template v-slot:activator="{ toggleDialog }">
				<g-button width="100px" height="50px" @click="toggleDialog">Dialog Scrollable</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogScrollable = false">I accept</g-button>
					<g-button @click="dialog = true">Open Dialog</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog>

		<div></div>
		<g-button width="100px" height="50px" @click="dialogFullscreen = true">Dialog Fullscreen</g-button>
		<g-dialog v-model="dialogFullscreen" width="500px" scrollable fullscreen>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</g-card-text>
				<div>
					<hr/>
				</div>
				<g-card-actions>
					<g-button @click="dialogFullscreen = false">I accept</g-button>
					<g-button @click="dialogScrollable = true">Open Dialog</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog>
	</div>
</template>

<script>
  import GDialog from '../components/GDialog/GDialog';
  import GButton from '../components/GButton/GButton';
  import GCard from '../components/GCard/GCard';
  import GCardTitle from '../components/GCard/GCardTitle';
  import {GCardText, GCardActions} from '../components/GCard/GCardFunctionalComponent'

  export default {
    name: 'DialogDemo',
    components: { GCardText, GCardActions, GCardTitle, GCard, GButton, GDialog },
    data() {
      return {
        dialog: false,
        dialogPersistent: false,
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
