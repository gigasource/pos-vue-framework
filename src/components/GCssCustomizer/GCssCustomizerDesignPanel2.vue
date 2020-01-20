<script>
  import _ from 'lodash'
  import {ref, reactive, computed, watch, set, inject, onMounted} from '@vue/composition-api';
  import {Length, Angle, Color, LineStyle, cssLineStyleList} from './GCssCustomizerHelper';
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
  import GCssCustomizerSelect from './GCssCustomizerSelect';

  export default {
    name: "GCssCustomizerDesignPanel2",
    components: {
      GCssCustomizerSelect,
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
          x: new Length(0),
          y: new Length(0),
          width: new Length(100),
          height: new Length(100),
          rotation: new Angle(0),
          borderRadius: new Length(0),
        },
        text: {
          fontFamily: 'Roboto',
          fontSize: 14,
          fontWeight: 'Normal',
          lineHeight: 22,
          letterSpacing: 0,
          textAlign: 'Left',
          align: 'Top',
        },
        fill: {
          color: new Color('#C4C4C4')
        },
        stroke: {
          width: new Length(1),
          style: new LineStyle('solid'),
          color: new Color('#1080EC'),
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

      watch(() => props.activeSelector, () => {
        const activeDesignState = getDesignState()
        if (activeDesignState) reconstructBasic(getDesignState())
        else designData.value = _.cloneDeep(defaultDesignData)
      }, {lazy: true})

      const getStyle = inject('getStyle')
      const setStyle = inject('setStyle')
      const getDesignState = inject('getDesignState')
      const setDesignState = inject('setDesignState')

      // Basic functionality
      const designPropertyList = ref({
        basic: [
          {key: 'x', prefix: 'X', cssKey: 'top', constructor: Length},
          {key: 'y', prefix: 'Y', cssKey: 'left', constructor: Length},
          {key: 'width', prefix: 'W', cssKey: 'width', constructor: Length},
          {key: 'height', prefix: 'H', cssKey: 'height', constructor: Length},
          {key: 'rotation', prependInnerIcon: 'icon-pns_rotation', cssKey: 'transform', constructor: Angle},
          {key: 'borderRadius', prependInnerIcon: 'icon-pns_chain', cssKey: 'borderRadius', constructor: Length}
        ],
        fill: [
          {key: 'color', cssKey: 'backgroundColor', constructor: Color}
        ],
        stroke: [
          {key: 'width', prefix: 'W', cssKey: 'borderWidth', constructor: Length},
          {key: 'style', cssKey: 'borderStyle', constructor: LineStyle},
          {key: 'color', cssKey: 'borderColor', constructor: Color}
        ]
      })

      const basicToCSS = () => {
        for (let item of designPropertyList.value.basic) {
          const prop = designData.value.basic[item.key]
          if (prop.active) {
            if (item.key !== 'rotation') setStyle(item.cssKey, prop.toCSS())
            else setStyle(item.cssKey, `rotate(${prop.value})`)
          } else if (getStyle(item.cssKey)) {
            setStyle(item.cssKey, undefined)
          }
        }
      }

      const reconstructBasic = inputDesignData => {
        for (let item of designPropertyList.value.basic) {
          designData.value.basic[item.key] = new item.constructor(..._.values(inputDesignData.basic[item.key]))
        }
      }

      // Fill functionality
      const fillMenu = ref(false)

      const fillToCSS = () => {
        for (let item of designPropertyList.value.fill) {
          const prop = designData.value.fill[item.key]
          if (prop.active) {
            setStyle(item.cssKey, prop.toCSS())
          } else if (getStyle(item.cssKey)) {
            setStyle(item.cssKey, undefined)
          }
        }
      }

      // Stroke functionality
      const strokeMenu = ref(false)

      const strokeToCSS = () => {
        for (let item of designPropertyList.value.stroke) {
          const prop = designData.value.stroke[item.key]
          if (prop.active) {
            setStyle(item.cssKey, prop.toCSS())
          } else if (getStyle(item.cssKey)) {
            setStyle(item.cssKey, undefined)
          }
        }
      }

      const strokeCheckbox = computed({
        get: () => {
          let temp = false
          for (let item of designPropertyList.value.stroke) {
            const prop = designData.value.stroke[item.key]
            temp = temp || prop.active
          }
          if (temp) strokeCheckbox.value = temp
          return temp
        },
        set: value => {
          for (let item of designPropertyList.value.stroke) {
            const prop = designData.value.stroke[item.key]
            prop.active = value
          }
        }
      })


      watch(() => designData.value, () => {
        basicToCSS()
        fillToCSS()
        strokeToCSS()
        setDesignState(designData.value)
      }, {lazy: true, deep: true})

      // Render functions
      const genCheckbox = prop => {
        return <g-checkbox inputValue={prop.active} vOn:change={e => prop.active = e}/>
      }

      const genInputShort = (item, prop, width) => {
        return <g-css-customizer-input class="g-css-customizer-design-panel-basic-input"
                                       prefix={item.prefix}
                                       svg={true}
                                       prependInnerIcon={item.prependInnerIcon}
                                       value={prop.value}
                                       style={{width: width}}
                                       vOn:change={e => prop.value = e}/>
      }

      const genInputLong = (item, val, index, prop) => {
        if (index === 0) return <g-css-customizer-input class="g-css-customizer-design-panel-basic-input__prefixed"
                                                        prefix={item.prefix}
                                                        svg={true}
                                                        prependInnerIcon={item.prependInnerIcon}
                                                        value={val}
                                                        vOn:change={e => prop.value = {string: e, index: index}}/>
        else return <g-css-customizer-input class="g-css-customizer-design-panel-basic-input__long"
                                            value={val}
                                            vOn:change={e => prop.value = {string: e, index: index}}/>
      }

      const genBasicInput = item => {
        return <div class={`g-css-customizer-design-panel-basic-input-wrapper__${designData.value.basic[item.key].mode}`}>
          {genCheckbox(designData.value.basic[item.key])}
          {designData.value.basic[item.key].mode === 'long'
            ? designData.value.basic[item.key].value.map((val, index) => genInputLong(item, val, index, designData.value.basic[item.key]))
            : genInputShort(item, designData.value.basic[item.key])}
        </div>
      }

      const genBasicSection = () => {
        return <div class="g-css-customizer-design-panel-basic">
          {designPropertyList.value.basic.map(item => genBasicInput(item))}
          <g-btn class="g-css-customizer-design-panel-btn" flat
                 vOn:click={() => designData.value.basic.borderRadius.toggleMode()}>
            <g-icon size="16" color="grey">fas fa-expand</g-icon>
          </g-btn>
        </div>
      }

      const genFillSection = () => {
        const data = {
          scopedSlots: {
            activator: ({on}) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{backgroundColor: designData.value.fill.color.rgba}}/>
              </div>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-section-content">
          {genCheckbox(designData.value.fill.color)}
          <g-menu {...data} vModel={fillMenu.value} nudgeLeft="376" nudgeTop="36">
            <g-color-picker vOn:color={color => designData.value.fill.color.value = color}/>
          </g-menu>
          <g-css-customizer-input class="g-css-customizer-design-panel-color-input"
                                  value={designData.value.fill.color.hex}
                                  vOn:change={e => designData.value.fill.color.hex = e}/>
          <g-css-customizer-input class="g-css-customizer-design-panel-percentage-input"
                                  value={designData.value.fill.color.alpha}
                                  vOn:change={e => designData.value.fill.color.alpha = e}/>
        </div>
      }

      const genStrokeSection = () => {
        const menuData = {
          scopedSlots: {
            activator: ({on}) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{backgroundColor: designData.value.stroke.color.rgba}}/>
              </div>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-section-content">
          <g-checkbox inputValue={strokeCheckbox.value} vOn:change={e => strokeCheckbox.value = e}/>
          <g-menu {...menuData} vModel={strokeMenu.value} nudgeLeft="376" nudgeTop="36">
            <g-color-picker vOn:color={color => designData.value.stroke.color.value = color}/>
          </g-menu>
          <g-css-customizer-input class="g-css-customizer-design-panel-color-input"
                                  value={designData.value.stroke.color.hex}
                                  vOn:change={e => designData.value.stroke.color.hex = e}/>
          <g-css-customizer-input class="g-css-customizer-design-panel-percentage-input"
                                  value={designData.value.stroke.color.alpha}
                                  vOn:change={e => designData.value.stroke.color.alpha = e}/>
          <g-css-customizer-select class="g-css-customizer-design-panel-section-content-select-style"
                                   value={designData.value.stroke.style.value}
                                   vOn:input={e => designData.value.stroke.style.value = e} items={cssLineStyleList}/>
          <div class={`g-css-customizer-design-panel-basic-input-wrapper__long`}>
            <g-checkbox style="opacity: 0;"/>
            {designData.value.stroke.width.mode === 'long'
              ? designData.value.stroke.width.value.map((val, index) => genInputLong(designPropertyList.value.stroke[0], val, index, designData.value.stroke.width))
              : genInputShort(designPropertyList.value.stroke[0], designData.value.stroke.width, '32%')}
          </div>
          <g-btn class="g-css-customizer-design-panel-btn" flat
                 vOn:click={() => designData.value.stroke.width.toggleMode()}>
            <g-icon size="16" color="grey">fas fa-expand</g-icon>
          </g-btn>
        </div>
      }

      const genDesignPanel = () => {
        return <div class="g-css-customizer-design-panel">
          {genBasicSection()}
          <g-sections vModel={activeSections.value} multiple={true}>
            {
              sectionsList.value.map((section, index) => {
                return <g-sections-header key={`header${index}`}>
                  {section}
                </g-sections-header>
              })
            }
            <g-sections-item key="text">

            </g-sections-item>
            <g-sections-item key="fill">
              {genFillSection()}
            </g-sections-item>
            <g-sections-item key="stroke">
              {genStrokeSection()}
            </g-sections-item>
            <g-sections-item key="space">

            </g-sections-item>
          </g-sections>
        </div>
      }

      return {
        genDesignPanel,
        designData,
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
    padding: 0 4px;
  }

  .g-sections-item::v-deep .g-sections-item-content-wrapper {
    padding: 0 4px 10px;
  }

  ::v-deep.g-checkbox-wrapper {
    margin: 0;
  }

  ::v-deep.g-checkbox {
    padding-left: 32px;
  }

  .g-css-customizer-design-panel {
    overflow-y: auto;

    &-btn {
      width: 20px !important;
      min-width: 12px !important;
      height: 20px !important;
      padding: 0 !important;
      margin-left: auto;
      align-self: center;
    }

    &-basic {
      display: flex;
      flex-wrap: wrap;
      padding: 0 4px 10px;

      &-input {
        width: 100%;

        &__prefixed {
          width: 32%;
        }

        &__long {
          width: 22%;
        }

        &-wrapper__short {
          width: 45%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        &-wrapper__long {
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }

      ::v-deep.g-checkbox-checkmark::before {
        top: 2px;
      }
    }

    &-section {
      padding: 10px 0 10px 8px;

      &-header {
        font-size: 14px;
        font-weight: bold;
      }

      &-content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        &__justify {
          justify-content: space-between;
        }

        &-select-style {
          width: 20%;

          .g-menu--content.in-select {
            .g-list-item {
              width: 10px
            }
          }
        }

        ::v-deep.g-checkbox-wrapper {
          margin: 0;
        }

        ::v-deep.g-checkbox {
          padding-left: 32px;
        }

        ::v-deep.g-checkbox-checkmark::before {
          top: 2px;
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