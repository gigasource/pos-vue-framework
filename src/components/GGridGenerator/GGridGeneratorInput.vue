<script>
  import { reactive } from '@vue/composition-api';
  import GDialog from '../GDialog/GDialog'
  import GGridGenerator from './components/GGridGenerator'
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
        return <div>
          <g-btn flat outlined vOn:click={() => dialogState.show = true}>
            { props.model[props.field.key] != null ? 'Edit grid': 'Add grid' }
          </g-btn>
          <g-dialog value={dialogState.show} fullscreen>
            <div class="editor-dialog">
              <g-grid-generator
                  ref="gridGenerator"
                  layout={props.model[props.field.key]}
                  vOn:json={json => props.model[props.field.key] = json}
                  vOn:close={() => dialogState.show = false}/>
            </div>
          </g-dialog>
        </div>
      }
    }
  }
</script>
<style scoped lang="scss">
  .editor-dialog {
    width: calc(100%);
    height: 100vh;
    background-color: white;
    border: 1px solid #666;
  }
</style>
