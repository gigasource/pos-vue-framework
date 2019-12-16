import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { ref, reactive, computed } from '@vue/composition-api';
import GCssCustomizer from '../GCssCustomizer';
import GDialog from '../../GDialog/GDialog';
import GBtn from '../../GBtn/GBtn';

export default {
  title: 'GCssCustomizer',
  decorators: [withKnobs]
}

export const Demo = () => ({
  components: { GDialog, GBtn, GCssCustomizer },
  props: {},
  setup (props, context) {
    const dialog = ref(false)

    const treeData = ref(undefined)

    const revertTreeData = ref(undefined)

    const resetTreeData = () => {
      const treeData = {
        "name": "GBtn",
        "items": [
          {
            "component": "GIcon"
          }
        ]
      }
      localStorage.setItem('treeData', JSON.stringify(treeData))
    }

    const openCssCustomizer = () => {
      treeData.value = JSON.parse(localStorage.getItem('treeData'))
      revertTreeData.value = JSON.parse(localStorage.getItem('treeData'))
      dialog.value = true
    }

    const closeCssCustomizer = () => {
      localStorage.setItem('treeData', JSON.stringify(treeData.value))
      revertTreeData.value = JSON.parse(localStorage.getItem('treeData'))
      dialog.value = false
    }

    const saveTreeData = () => {
      localStorage.setItem('treeData', JSON.stringify(treeData.value))
      revertTreeData.value = JSON.parse(localStorage.getItem('treeData'))
    }

    const cancel = () => {
      localStorage.setItem('treeData', JSON.stringify(revertTreeData.value))
      dialog.value = false
    }

    return {
      dialog,
      treeData,
      openCssCustomizer,
      closeCssCustomizer,
      resetTreeData,
      saveTreeData,
      cancel
    }
  },
  template: `
    <div data-app>
      <g-btn @click="openCssCustomizer">Open</g-btn>
      <g-btn @click="resetTreeData">Reset TreeData</g-btn>
      <g-dialog v-model="dialog" fullscreen lazy>
        <g-css-customizer v-model="treeData" @close="closeCssCustomizer" @save="saveTreeData" @cancel="cancel">
          
        </g-css-customizer>
      </g-dialog>
    </div>
  `
})