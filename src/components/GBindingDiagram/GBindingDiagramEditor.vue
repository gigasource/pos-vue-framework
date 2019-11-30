<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { ref, reactive, inject } from '@vue/composition-api';
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

			const add = () => {
			  const item = {
			    type: newItem.type,
					key: newItem.key,
					show: true
				}
			  addItem(model.value.path, item)
				newItem.type = ''
				newItem.key = ''
				dialog.value = false
			}

			const genAddDialog = () => {
			  return <g-dialog value={dialog.value} vOn:input={e => dialog.value = e}>
          <g-card>
            <g-card-title className="bg-grey-lighten-2">Add new item</g-card-title>
            <g-card-text>
              <g-select value={newItem.type} vOn:input={e => newItem.type = e}
                        items={model.value.path !== undefined ? isSlotPath(model.value.path) ? slotScopeTypes : componentTypes : []}
                        label='type'/>
              <g-text-field value={newItem.key} vOn:input={e => newItem.key = e} label='key'/>
            </g-card-text>
            <g-card-actions>
              <g-btn vShow={model.value.path !== undefined} text textColor="blue" vOn:click={add}>Add</g-btn>
            </g-card-actions>
          </g-card>
        </g-dialog>
			}

			const genEditor = () => {
				return <div>
					<div class="g-binding-diagram-editor-title">
						Editor
					</div>
					<div class="g-binding-diagram-editor-header">
						{model.value.name}
						<g-btn icon vOn:click={() => {dialog.value = true}}>
							<g-icon class="text-blue">fas fa-plus-circle</g-icon>
						</g-btn>
					</div>
					<div class="g-binding-diagram-editor-content">
            {model.value.items && model.value.items.map((item, index) => {
              return <g-binding-diagram-editor-item value={item}
																										vOn:toggle={() => toggleItem(model.value.path, index)}
																										vOn:delete={() => deleteItem(model.value.path, index)}/>
            })}
					</div>
					{genAddDialog()}
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

		&-title {
			position: relative;
			overflow: hidden;
			font-size: 19px;
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
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&-content {
			display: flex;
			flex-direction: column;
			padding: 5px 0;
		}
	}
</style>