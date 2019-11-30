<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { ref, reactive, inject } from '@vue/composition-api';
  import GBindingDiagramEditorItem from './GBindingDiagramEditorItem';
  import GDialog from '../GDialog/GDialog';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GCombobox from '../GCombobox/GCombobox';
  import GTextField from '../GInput/GTextField';

  export default {
    name: 'GBindingDiagramEditor',
		components: { GTextField, GCombobox, GBindingDiagramEditorItem, GBtn, GIcon, GDialog },
    props: {
			value : {
			  type: Object,
			}
		},
    setup (props, context) {
			const model = getInternalValue(props, context)

			const toggleItem = inject('toggleItem')
			const addItem = inject('addItem')

			const newItem = reactive({
			  type: null,
				key: null,
				show: true
			})

			const dialog = ref(false)

			// function toggleItem(path, index) {
			//   context.emit('toggle', path, index)
			// }

			const add = () => {
			  addItem(model.value.path, newItem)
				newItem.type = null
				newItem.key = null
				dialog.value = false
			}

			const genEditor = () => {
				return <div>
					<div class="g-binding-diagram-editor-header">
						Editor: {model.value.name}
						<g-btn icon vOn:click={() => {dialog.value = true}}>
							<g-icon class="text-blue">fas fa-plus-circle</g-icon>
						</g-btn>
					</div>
					<div class="g-binding-diagram-editor-content">
            {model.value.items && model.value.items.map((item, index) => {
              return <g-binding-diagram-editor-item value={item} vOn:toggle={() => toggleItem(model.value.path, index)}/>
            })}
					</div>
          <g-dialog value={dialog.value} vOn:input={e => dialog.value = e}>
						<div class="g-binding-diagram-editor-form-wrapper">
							<g-text-field value={newItem.type} vOn:input={e => newItem.type = e} label='type'/>
							<g-text-field value={newItem.key} vOn:input={e => newItem.key = e} label='key'/>
							<g-btn text textColor="blue" vOn:click={add}>Add</g-btn>
            </div>
          </g-dialog>
				</div>
			}

      return {
				genEditor,
				newItem
			}
		},
		render() {
      return this.genEditor()
		}
  }
</script>
<style scoped lang="scss">
	.g-binding-diagram-editor {
		&-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 5px;
		}
		&-content {
			display: flex;
			flex-direction: column;
			padding: 5px 10px;
		}
		&-form-wrapper {
			display: flex;
			flex-direction: column;
			background-color: white;
			padding: 20px;
			align-items: flex-end;
		}
	}
</style>