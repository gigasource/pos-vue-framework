import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { ref, reactive, computed } from '@vue/composition-api';
import GCssCustomizer from '../GCssCustomizer';
import GDialog from '../../GDialog/GDialog';
import GBtn from '../../GBtn/GBtn';
import GDatePicker from '../../GDatePicker/GDatePicker';
import GTextField from '../../GInput/GTextField';

export default {
  title: 'GCssCustomizer',
  decorators: [withKnobs]
}

export const Demo = () => ({
  components: { GDialog, GBtn, GDatePicker, GTextField, GCssCustomizer },
  props: {},
  setup (props, context) {
    const dialog = ref(false)

    const treeData = ref(undefined)

    const revertTreeData = ref(undefined)

    const date = ref('2019-12-10')
    const resetTreeData = () => {
      const treeData = {
        "name": "GBtn",
        "id": "28adc2342",
        "items": [
          {
            "component": "GIcon",
            "id": "82qod23s"
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
      date,
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
      <h5>Please click RESET TREEDATA button on the very first run to create localStorage key!</h5>
      <g-dialog v-model="dialog" fullscreen persistent lazy>
        <g-css-customizer v-model="treeData" @close="closeCssCustomizer" @save="saveTreeData" @cancel="cancel">
          <g-date-picker v-model="date"/>
<!--          <g-btn>TEST</g-btn>-->
<!--          <g-text-field label="hello"/>-->
        </g-css-customizer>
      </g-dialog>
    </div>
  `
})