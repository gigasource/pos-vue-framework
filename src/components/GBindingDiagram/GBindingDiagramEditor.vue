<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { ref, reactive, watch, inject } from '@vue/composition-api';
  import { isSlotPath } from './GBindingDiagramFactory';
  import GBindingDiagramEditorItem from './GBindingDiagramEditorItem';
  import GDialog from '../GDialog/GDialog';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GTextField from '../GInput/GTextField';
  import GSelect from '../GSelect/GSelect';
  import GCard from '../GCard/GCard';
  import GCardTitle from '../GCard/GCardTitle';
  import { GCardText, GCardActions } from '../GCard/GCardFunctionalComponent';

  export default {
    name: 'GBindingDiagramEditor',
		components: { GCardText, GCardActions, GCardTitle, GCard, GSelect, GTextField, GBindingDiagramEditorItem, GBtn, GIcon, GDialog },
    props: {
      diagramPath: String,
			value : {
			  type: Object,
			}
		},
    setup (props, context) {
			const model = getInternalValue(props, context)

			const toggleItem = inject('toggleItem')
			const addItem = inject('addItem')
			const deleteItem = inject('deleteItem')

			const componentTypes = [
				{text: 'prop', value: 'prop'},
        {text: 'emit', value: 'emit'},
        {text: 'slot', value: 'slot'}
			]

			const slotScopeTypes = [
        {text: 'data', value: 'data'},
        {text: 'func', value: 'func'}
			]

			const newItem = reactive({
			  type: '',
				key: '',
			})

			const dialog = ref(false)

			// Reset input value when dialog closed
			watch(dialog, newVal => {
			  if(!newVal) {
          newItem.type = ''
          newItem.key = ''
				}
			})

			const add = () => {
			  const item = {
			    type: newItem.type,
					key: newItem.key,
					show: true
				}
			  addItem(model.value.path, item)
				dialog.value = false
			}

			const genAddButton = () => {
			  return <g-btn icon vOn:click={() => {dialog.value = true}}>
          <g-icon size="20" class="text-blue">fas fa-plus-circle</g-icon>
        </g-btn>
			}

			const genAddDialog = () => {
			  return <g-dialog value={dialog.value} vOn:input={e => dialog.value = e}>
          <g-card>
            <g-card-title class="bg-grey-lighten-2">Add new item</g-card-title>
            <g-card-text>
              <g-select value={newItem.type} vOn:input={e => newItem.type = e}
                        items={isSlotPath(model.value.path) ? slotScopeTypes : componentTypes}
                        label='type'/>
              <g-text-field value={newItem.key} vOn:input={e => newItem.key = e} label='key'/>
            </g-card-text>
            <g-card-actions>
              <g-btn text textColor="blue" vOn:click={add}>Add</g-btn>
            </g-card-actions>
          </g-card>
        </g-dialog>
			}

			const genEditor = () => {
				return <div class="g-binding-diagram-editor">
					<div class="g-binding-diagram-editor-title">
						Editor
					</div>
					<div class="g-binding-diagram-editor-header">
						{model.value.name}
						{model.value.path !== undefined && genAddButton()}
					</div>
					<div class="g-binding-diagram-editor-content">
            {model.value.items !== undefined && model.value.items.map((item, index) => {
              return <g-binding-diagram-editor-item
								value={item}
								vOn:toggle={() => toggleItem(model.value.path, index)}
								vOn:delete={() => deleteItem(model.value.path, index)}/>
            })}
					</div>
					{model.value.path !== undefined && genAddDialog()}
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
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1 1 100%;

		&-title {
			flex: 0 0 auto;
			position: relative;
			overflow: hidden;
			font-size: 16px;
			color: grey;


			&::after {
				content: "";
				width: 100%;
				height:100%;
				border-top: 1px solid grey;
				position: absolute;
				transform: translateY(50%);
				margin-left: 10px
			}
		}

		&-header {
			flex: 0 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
		}

		&-content {
			flex: 1 1 auto;
			display: flex;
			flex-direction: column;
			backface-visibility: hidden;
			overflow-y: auto;
		}
	}
</style>