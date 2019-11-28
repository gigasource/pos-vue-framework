<script>
  import sampleImg from '../logic/sampleImageBase64'
  import { reactive } from '@vue/composition-api';
  import GDialog from '../../GDialog/GDialog'
  import GBtn from '../../GBtn/GBtn'

  export function renderGLayoutData(model) {
    const style = `background-image: ${model.image}; width: ${model.width}; height: ${model.height}; border: ${model.border}`
    return <model.tag area={model.area} style={style}>
      {model.text}
    </model.tag>
  }

  export default {
    name: 'GLayoutDataInput',
    components: { GDialog, GBtn },
    setup(props, context) {
      const state = reactive({
        showDialog: false
      })

      const refId = {
        area: 'area',
        tag: 'tag',
        text: 'text',
        border: 'border',
        image: 'image',
        width: 'width',
        height: 'height'
      }

      function create() {
        state.showDialog = false
        context.emit('create', {
          area: context.refs[refId.area].value,
          tag: context.refs[refId.tag].value,
          text: context.refs[refId.text].value,
          border: context.refs[refId.border].value,
          bgImage: context.refs[refId.image].value,
          width: context.refs[refId.width].value,
          height: context.refs[refId.height].value,
        })
      }

      function cancel() {
        state.showDialog = false
      }

      // TODO: image picker
      // TODO: input-select component

      return () => {
        return <div class="g-layout-data-input">
          <g-btn vOn:click={() => state.showDialog = true}>Add layout</g-btn>
          <g-dialog value={state.showDialog} width="600px" persistent>
            <div class="g-layout-data-input__dialog-content">
              <span class="grid-gen__dialog__confirm__header">Create new demo input</span>
              <div class="grid-gen__dialog__confirm__content">
                <div>Area:&nbsp;<input type="text" ref={refId.area}/></div>
                <div>Tag:&nbsp;<input type="text" ref={refId.tag}/></div>
                <div>Text:&nbsp;<input type="text" ref={refId.text}/></div>
                <div>Border:&nbsp;<input type="text" ref={refId.border}/></div>
                <div>Image:&nbsp;<input type="text" ref={refId.image}/></div>
                <div>Width:&nbsp;<input type="text" ref={refId.width}/></div>
                <div>Height:&nbsp;<input type="text" ref={refId.height}/></div>
              </div>
              <div class="grid-gen__dialog__confirm__action-btn">
                <button class='simple-btn' vOn:click={() => create()}>Create</button>
                &nbsp;
                <button class='simple-btn' vOn:click={() => cancel()}>Cancel</button>
              </div>
            </div>
          </g-dialog>
        </div>
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-layout-data-input {

    &__dialog-content {
      height: 500px;
      width: 100%;
      background-color: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
  }
</style>
