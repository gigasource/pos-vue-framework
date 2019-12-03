<script>
  import sampleImages from '../logic/sampleImageBase64'
  import _ from 'lodash'
  import { watch, reactive, computed } from '@vue/composition-api';
  import GDialog from '../../GDialog/GDialog'
  import GBtn from '../../GBtn/GBtn'
  import GAutoComplete from '../../GAutocomplete/GAutocomplete'
  import GCombobox from '../../GCombobox/GCombobox'
  import GTextField from '../../GInput/GTextField'

  export function renderGLayoutData(model) {
    let css = ''
    if (model.bgImage) css += `background-image: ${model.bgImage}; `
    if (model.width) css += `width: ${model.width}; `
    if (model.height) css += `height: ${model.height}; `
    if (model.border) css += `border: ${model.border}; `
    return <model.tag area={model.area} style={css}>{model.text}</model.tag>
  }

  export default {
    name: 'DemoLayoutDialog',
    components: { GTextField, GAutoComplete, GCombobox, GDialog, GBtn },
    props: {
      // boolean value indicate whether this dialog should be shown or not
      show: Boolean,
      // input data contain demoLayoutDialog model, used for edit
      value: Object,
      // input data for g-auto-complete: include all area name
      areaNames: Array
    },
    setup(props, context) {
      const suggestedTags = [
        { text: 'span', value: 'span' },
        { text: 'div', value: 'div' },
        { text: 'button', value: 'button' },
        { text: 'g-btn', value: 'g-btn' },
        { text: 'g-icon', value: 'g-icon' },
        { text: 'h1', value: 'h1' },
        { text: 'h2', value: 'h2' },
        { text: 'h3', value: 'h3' },
        { text: 'h4', value: 'h4' },
        { text: 'h5', value: 'h5' },
        { text: 'h6', value: 'h6' },
      ]

      const state = reactive({
        area: null,
        tag: 'span',
        text: 'Lorem ispum',
        border: '1px solid black',
        width: '100px',
        height: '100px',
        selectedImageId: 0,
      })

      watch(() => props.value, () => {
        if (props.value) {
          state.area = props.value.area
          state.tag = props.value.tag
          state.text = props.value.text
          state.border = props.value.border
          state.width = props.value.width
          state.height = props.value.height
          state.selectedImageId = sampleImages.indexOf(props.value.bgImage)
        }
      })

      function create() {
        context.emit(props.value ? 'update' : 'create', {
          ..._.pick(state, 'area', 'tag', 'text', 'border', 'width', 'height'),
          bgImage: sampleImages[state.selectedImageId],
        })
        context.emit('close')
      }

      function cancel() {
        context.emit('close')
      }

      return () => {
        return <g-dialog value={props.show} width="570px" persistent class="g-layout-data-dialog">
          <div class="g-layout-data-dialog__content">
            <span class="g-layout-data-dialog__content__header">Demo layout</span>
            <div class="g-layout-data-dialog__content__body">
              <g-auto-complete
                  flat label="Area"
                  itemText="text"
                  itemValue="value"
                  items={props.areaNames}
                  value={state.area}
                  vOn:input={v => state.area = v}/>
              <g-combobox
                  flat label="Tag"
                  itemText="text"
                  itemValue="value"
                  items={suggestedTags}
                  value={state.tag}
                  vOn:input={v => state.tag = v}
              />
              <g-text-field flat label="Text" value={state.text} vOn:input={v => state.text = v}/>
              <g-text-field flat label="Border" value={state.border} vOn:input={v => state.border = v}/>
              <g-text-field flat label="Width" value={state.width} vOn:input={v => state.width = v}/>
              <g-text-field flat label="Height" value={state.height} vOn:input={v => state.height = v}/>
              <div>
                <label>Image</label>
                <div>
                  {_.map(sampleImages, (img, id) =>
                      <span
                          class={{ "sample-image": true, "sample-image--selected": id === state.selectedImageId }}
                          style={{ backgroundImage: img }}
                          vOn:click={() => state.selectedImageId = id}>
                      </span>)}
                </div>
              </div>
            </div>
            <div class="g-layout-data-dialog__content__action-btn">
              <g-btn flat outlined vOn:click={() => create()}>{props.value ? 'Update' : 'Create'}</g-btn>
              &nbsp;
              <g-btn flat outlined vOn:click={() => cancel()}>Cancel</g-btn>
            </div>
          </div>
        </g-dialog>
      }
    }
  }
</script>
<style scoped lang="scss">
  input {
    border: 1px solid #0003;
  }

  ::v-deep .simple-btn {
    height: 18px;
    border: 1px solid #0003;
    margin: 2px;
    color: #333;

    &:hover {
      background-color: #888;
      color: #fff;
      cursor: pointer;
    }
  }

  .sample-image {
    margin: 3px;
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 2px solid transparent;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.5s;

    &--selected {
      border: 2px solid #888;
      opacity: 1;
    }
  }

  .g-layout-data-dialog {
    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 800px;
      box-shadow: 0 2px 8px 4px #0003;
      background: #fff;

      &__header {
        background-color: #000;
        color: #fff;
        font-size: 30px;
        padding: 10px;
      }

      &__body {
        padding: 20px;
        flex: 1;

        & label {
          width: 70px;
          display: inline-block;
        }
      }

      &__item-name {
        border: 1px solid #888;
        padding: 5px;
      }

      &__error-msg {
        font-size: small;
        color: red;
        padding-left: 10px;
      }

      &__action-btn {
        padding: 20px;
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }


</style>
