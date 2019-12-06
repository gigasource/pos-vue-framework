<template>
	<div>
		<g-btn @click="openDiagram">Edit</g-btn>
		<g-dialog v-model="dialog" lazy fullscreen>
			<g-binding-diagram v-model="treeData" @close="closeDiagram">

			</g-binding-diagram>
		</g-dialog>
	</div>
</template>
<script>
  import axios from 'axios'
  import { ref, computed } from '@vue/composition-api'
  import GBindingDiagram from '../components/GBindingDiagram/GBindingDiagram';
  import GDialog from '../components/GDialog/GDialog';
  import GBtn from '../components/GBtn/GBtn';
  export default {
    name: 'BindingDiagramDemo',
    components: { GBtn, GDialog, GBindingDiagram },
    setup (props, context) {
      const dialog = ref(false)

      const treeData = ref(undefined)

			async function openDiagram() {
        const res = await axios.get('http://localhost:3000')
				treeData.value = res.data
				dialog.value = true
			}

			async function closeDiagram() {
        const res = await axios.post('http://localhost:3000', treeData.value)
				console.log(res.data)
        dialog.value = false
			}

			return {
        treeData,
				dialog,
				openDiagram,
				closeDiagram
			}
		}
  }
</script>
<style scoped>
</style>