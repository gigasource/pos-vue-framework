<script>
  import _ from 'lodash'
  import {ref, reactive, computed, watch, set, inject, onMounted} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GGridSelect from '../GGridSelect/GGridSelect';
  import GColorPicker from '../GColorPicker/GColorPicker';
  import GCheckbox from '../GCheckbox/GCheckbox';
  import GMenu from '../GMenu/GMenu';
  import GCssCustomizerInput from './GCssCustomizerInput';
  import GSections from '../GExpansion/GSections';
  import GSectionsHeader from '../GExpansion/GSectionsHeader';
  import GSectionsItem from '../GExpansion/GSectionsItem';
  import GCssCustomizerInputForm from './GCssCustomizerInputForm';
  import GCssCustomizer from './GCssCustomizer';

  export default {
    name: "GCssCustomizerDesignPanel2",
    components: {
      GCssCustomizer,
      GCssCustomizerInputForm,
      GCssCustomizerInput,
      GSectionsHeader,
      GSectionsItem,
      GSections,
      GBtn,
      GIcon,
      GGridSelect,
      GColorPicker,
      GCheckbox,
      GMenu,
    },
    props: {
      activeSelector: String,
    },
    setup(props, context) {
      const activeSections = ref([])

      const sectionsList = ref(['Text','Fill', 'Stroke', 'Space'])

      const defaultDesignData = {
        basic: {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          rotation: 0,
          borderRadius: 0,
        },
        text: {
          fontFamily: 'Roboto',
          fontSize: 14,
          fontWeight: 'Normal',
          lineHeight: 22,
          letterSpacing: 0,
          textAlign: 'Left',
          align: 'Top'
        },
        fill: {
          color: {
            value: '#C4C4C4',
            alpha: 1
          }
        },
        stroke: {
          color: {
            value: '#1080EC',
            alpha: 1,
          },
          width: 1,
          mode: 'inside'
        },
        space: {
          padding: {
            value: 5,
            mode: 'short'
          },
          margin: {
            value: 5,
            mode: 'short'
          }
        },
        effects: []
      }

      const defaultEffectData = {
        type: 'dropShadow',
        shadowBlur: 4,
        layerBlur: 4,
        x: 4,
        y: 4,
        color: {
          value: '#000000',
          alpha: 0.25
        },
        active: true
      }

      const designData = ref(_.cloneDeep(defaultDesignData))



      const genDesignPanel = () => {
        return <div class="g-css-customizer-design-panel">

        </div>
      }

      return {
        genDesignPanel,
      }
    },
    render() {
      return this.genDesignPanel()
    }
  }
</script>

<style scoped lang="scss">
  $transparentImg: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC);

  ::v-deep.g-row {
    justify-content: space-between;
  }

  .g-sections-header::v-deep {
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #212121;
    padding: 0 8px;
  }

  .g-sections-item::v-deep .g-sections-item-content-wrapper {
    padding: 0 8px 16px;
  }

  .g-css-customizer-design-panel {
    overflow-y: auto;

    &-section {
      padding: 10px 0 10px 8px;

      &-header {
        font-size: 14px;
        font-weight: bold;
      }

      &-content {
        display: flex;
        align-items: center;
        padding-top: 4px;
        flex-wrap: wrap;

        &__justify {
          justify-content: space-between;
        }

        input {
          font-size: 14px;
          margin-left: 16px;
        }

        ::v-deep.g-checkbox-wrapper {
          margin: 0;
        }

        ::v-deep.g-checkbox {
          padding-left: 32px;
        }

        ::v-deep.g-checkbox-checkmark::before {
          top: 1px;
        }

        ::v-deep.g-css-customizer-design-panel-color-preview {
          width: 100%;
          height: 100%;
        }

        ::v-deep.g-css-customizer-design-panel-color-preview-transparent {
          position: relative;
          width: 20px;
          height: 20px;
          border: 1px solid #E0E0E0;
          background: $transparentImg repeat;
        }
      }
    }

    &-section:first-child {
      padding: 0 0 10px 4px;
    }

    &-stroke-position {
      margin-top: 16px;
      margin-right: 20px;
    }

    &-effect-shadow-editor {
      background-color: white;
      border: 1px solid #E0E0E0;
      width: 260px;
      height: 160px;
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-template-areas:
          "header header header"
          "blurtitle xtitle ytitle"
          "blurinput xinput yinput"
          "colorinput alphainput .";

      &-header {
        grid-area: header;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E0E0E0;
        padding: 0 16px;
        font-size: 14px;
        font-weight: bold;
      }

      &-title {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-left: 16px;
        color: grey;

        input {
          font-size: 14px
        }
      }

      &-input, &-alpha {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding: 0 7px;
      }

      &-color {
        display: flex;
        align-items: center;
        padding-left: 16px;

        ::v-deep.g-css-customizer-design-panel-color-preview {
          width: 100%;
          height: 100%;
        }

        ::v-deep.g-css-customizer-design-panel-color-preview-transparent {
          position: relative;
          width: 20px;
          height: 20px;
          border: 1px solid #E0E0E0;
          background: $transparentImg repeat;
        }

        .g-css-customizer-design-panel-color-input {
          padding: 0 7px 0 5px;
        }
      }
    }

    &-effect-blur-editor {
      background-color: white;
      border: 1px solid #E0E0E0;
      width: 260px;
      height: 80px;
      display: grid;
      grid-template-columns: 0.4fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
          "header header"
          "blurtitle blurinput";

      &-header {
        grid-area: header;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E0E0E0;
        padding: 0 16px;
        font-size: 14px;
        font-weight: bold;
      }

      &-title, &-input {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-left: 16px;
        color: grey;

        input {
          font-size: 14px
        }
      }
    }

    &-color-input {
      width: 82px;
      padding-left: 12px;
      line-height: normal;

      ::v-deep.g-tf-input {
        text-transform: uppercase;
      }
    }

    &-percentage-input {
      width: 54px;
    }

    &-length-input {
      width: 48px;

      &-prefixed {
        width: 68px;

        ::v-deep.g-tf {
          align-items: center;
        }

        ::v-deep.g-tf-affix {
          width: 20px;
          font-size: 14px;
          padding: 0 6px;
        }
      }
    }

    &-space-input {
      display: flex;
      align-items: center;

      ::v-deep.g-checkbox {
        padding-left: 20px;
      }
    }
  }

  ::v-deep.g-sections-item__empty {
    .g-sections-item-content-wrapper {
      padding: 0
    }
  }
</style>