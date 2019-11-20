<script>
  import { toJsonStr, fromJson } from './logic/modelParser';
  import { reactive } from '@vue/composition-api';
  import GDialog from '../GDialog/GDialog'
  import GGridGenerator from './GGridGenerator'
  import GBtn from '../GBtn/GBtn'

  export default {
    name: 'GGridGeneratorInput',
    components: { GDialog, GGridGenerator, GBtn },
    props: {
      model: Object,
      field: Object,
    },
    setup(props, context) {
      const dialogState = reactive({ show: false })

      return () => {
        console.log(props.model)

        return <div>
          <g-btn vOn:click={() => dialogState.show = true}>
            { props.model[props.field.key] != null ? 'Edit grid': 'Add grid' }
          </g-btn>
          <g-dialog value={dialogState.show} fullscreen >
            <div class="editor-dialog">
              <div class='editor-dialog__title-bar'>
                <span class='editor-dialog__title-bar__title'>Grid Layout Editor</span>
                <button vOn:click={() => {
                  context.refs.gridGenerator.save()
                  dialogState.show = false
                }}>Save
                </button>
                <button vOn:click={() => {
                  context.refs.gridGenerator.cancel()
                  dialogState.show = false
                }}>Cancel
                </button>
              </div>
              <g-grid-generator
                  ref="gridGenerator"
                  layout={toJsonStr(props.model[props.field.key])}
                  style="flex: 1"
                  vOn:json={json => props.model[props.field.key] = JSON.parse(json)}/>
            </div>
          </g-dialog>
        </div>
      }
    }
  }
</script>
<style scoped lang="scss">
  .editor-dialog {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: white;
    border: 1px solid #666;

    &__title-bar {
      display: flex;
      flex-direction: row;
      padding: 10px;
      margin-bottom: 15px;
      background: #eee;
      border-bottom: 1px solid #666;

      &__title {
        flex: 1;
        color: #666;

        & > .uid {
          color: #888;
          font-weight: bold;
        }
      }

      & > .close-btn {
        border-radius: 2px;
        background-color: #888;
        color: #eee;

        &:focus {
          outline: none;
        }

        &:hover {
          cursor: pointer;
          background-color: #aaa;
        }
      }
    }
  }
</style>
