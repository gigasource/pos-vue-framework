<script>
  import _ from 'lodash'
  import { ref, computed, watch, set, inject } from '@vue/composition-api';
  import { Length, Angle, Color, Display, Position, LineStyle, FontFamily, FontWeight, Effect, cssLineStyleList, cssDisplayList, cssPositionList, cssFontFamilyList, cssFontStyleList, effectList, reservedKeyList } from './GCssCustomizerModel';
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
  import GCssCustomizer from './GCssCustomizer';
  import GCssCustomizerSelect from './GCssCustomizerSelect';
  import GCombobox from '../GCombobox/GCombobox';
  import GSelect from '../GSelect/GSelect';
  import GCssCustomizerCombobox from './GCssCustomizerCombobox';
  import GTextarea from '../GTextarea/GTextarea';

  export default {
    name: 'GCssCustomizerDesignPanel',
    components: {
      GCssCustomizerCombobox,
      GTextarea,
      GSelect,
      GCombobox,
      GCssCustomizerSelect,
      GCssCustomizer,
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
      resetState: Boolean,
      load: Boolean,
    },
    setup(props, context) {
      const activeSections = ref([])

      const sectionsList = ref(['Basic', 'Text', 'Fill', 'Stroke', 'Space'])

      const defaultDesignData = {
        basic: {
          display: new Display('block'),
          position: new Position('static'),
          x: new Length(0),
          y: new Length(0),
          width: new Length(100),
          height: new Length(100),
          rotation: new Angle(0),
          borderRadius: new Length(0),
        },
        text: {
          color: new Color('#212121'),
          fontFamily: new FontFamily('Roboto'),
          fontSize: new Length(14),
          fontWeight: new FontWeight('Normal'),
          lineHeight: new Length(22),
          letterSpacing: new Length(0, 'em', 'em'),
          textAlign: 'Left',
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
          padding: new Length(5),
          margin: new Length(5),
        },
        effects: undefined,
        custom: '',
      }

      const designData = ref(_.cloneDeep(defaultDesignData))

      const designPropertyList = ref({
        basic: [
          { key: 'display', prefix: 'D', cssKey: 'display', constructor: Display},
          { key: 'position', prefix: 'P', cssKey: 'position', constructor: Position},
          { key: 'x', prefix: 'T', cssKey: 'top', constructor: Length },
          { key: 'y', prefix: 'L', cssKey: 'left', constructor: Length },
          { key: 'width', prefix: 'W', cssKey: 'width', constructor: Length },
          { key: 'height', prefix: 'H', cssKey: 'height', constructor: Length },
          { key: 'rotation', prependInnerIcon: 'icon-pns_rotation', cssKey: 'transform', constructor: Angle },
          { key: 'borderRadius', prependInnerIcon: 'icon-pns_chain', cssKey: 'borderRadius', constructor: Length }
        ],
        text: [
          { key: 'color', cssKey: 'color', constructor: Color },
          { key: 'fontFamily', cssKey: 'fontFamily', constructor: FontFamily },
          { key: 'fontWeight', appendInnerIcon: 'icon-arrow_drop_down', cssKey: 'fontWeight', constructor: FontWeight },
          { key: 'fontSize', cssKey: 'fontSize', constructor: Length },
          { key: 'lineHeight', prependInnerIcon: 'icon-tops_line_height', cssKey: 'lineHeight', constructor: Length},
          { key: 'letterSpacing', prependInnerIcon: 'icon-tops_letter_spacing', cssKey: 'letterSpacing', constructor: Length}
        ],
        fill: [
          { key: 'color', cssKey: 'backgroundColor', constructor: Color }
        ],
        stroke: [
          { key: 'width', prefix: 'W', cssKey: 'borderWidth', constructor: Length },
          { key: 'style', cssKey: 'borderStyle', constructor: LineStyle },
          { key: 'color', cssKey: 'borderColor', constructor: Color }
        ],
        space: [
          { key: 'padding', prefix: 'P', cssKey: 'padding', constructor: Length},
          { key: 'margin', prefix: 'M', cssKey: 'margin', constructor: Length}
        ],
      })

      let customCache = []

      const reconstructDesignData = inputDesignData => {
        designData.value = _.cloneDeep(defaultDesignData)

        for (let section in designPropertyList.value) {
          if (inputDesignData[section]) for (let item of designPropertyList.value[section]) {
            if (inputDesignData[section][item.key]) {
              designData.value[section][item.key] = new item.constructor(..._.values(inputDesignData[section][item.key]))
            }
          }
        }

        set(designData.value, 'effects', [])
        if (inputDesignData.effects) {
          for (let effect of inputDesignData.effects) {
            designData.value.effects.push(new Effect(..._.values(effect)))
          }
        }

        inputDesignData.custom && set(designData.value, 'custom', inputDesignData.custom)
      }

      watch(() => props.activeSelector, () => {
        const activeDesignState = getDesignState()
        if (activeDesignState) reconstructDesignData(getDesignState())
        else designData.value = _.cloneDeep(defaultDesignData)
      }, { lazy: true })

      watch(() => props.resetState, () => {
        designData.value = _.cloneDeep(defaultDesignData)
      }, { lazy: true })

      watch(() => props.load, () => {
        const activeDesignState = getDesignState()
        if (activeDesignState) reconstructDesignData(getDesignState())
        else designData.value = _.cloneDeep(defaultDesignData)
      }, { lazy: true })

      const getStyle = inject('getStyle')
      const setStyle = inject('setStyle')
      const deleteStyle = inject('deleteStyle')
      const getDesignState = inject('getDesignState')
      const setDesignState = inject('setDesignState')
      const deleteDesignState = inject('deleteDesignState')

      // Conversion
      const shadowToCSS  = effectData => {
        const shadowData = _.filter(effectData, val => val.type.indexOf('Shadow') > -1 && val.active)
        return _.reduce(shadowData, (acc, val, index) => {
          let temp = val.toCSS()
          if (index < shadowData.length - 1) temp += ', '
          return acc += temp
        }, '')
      }

      const blurToCSS = effectData => {
        const blurData = _.find(effectData, val => val.type.indexOf('Blur') > -1 && val.active)
        if (blurData !== undefined) return blurData.toCSS()
      }

      const designToCSS = () => {
        for (let section in designPropertyList.value) {
          for (let item of designPropertyList.value[section]) {
            const prop = designData.value[section][item.key]
            if (prop.active) {
              setStyle(item.cssKey, prop.toCSS())
            } else if (getStyle(item.cssKey)) {
              deleteStyle(item.cssKey)
            }
          }
        }

        if (designData.value.effects) {
          const shadowString = shadowToCSS(designData.value.effects)
          const blurString = blurToCSS(designData.value.effects)
          if (shadowString) setStyle('boxShadow', shadowString)
          else deleteStyle('boxShadow')
          if (blurString) setStyle('filter', blurString)
          else deleteStyle('filter')
        }
      }

      const saveDesignState = () => {
        for (let section in designPropertyList.value) {
          for (let item of designPropertyList.value[section]) {
            const prop = designData.value[section][item.key]
            if (prop.modified) {
              setDesignState(section, item.key, designData.value[section][item.key])
            }
          }
        }

        if (designData.value.effects && designData.value.effects.length > 0) setDesignState('effects', null, designData.value.effects)
        if (designData.value.custom) setDesignState('custom', null, designData.value.custom)
      }

      watch(() => designData.value, () => {
        designToCSS()
        saveDesignState()
      }, { lazy: true, deep: true })

      // Text functionality
      const textMenu = ref(false)

      // Fill functionality
      const fillMenu = ref(false)

      // Stroke functionality
      const strokeMenu = ref(false)

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

      // Effect functionality
      const effectMenu = ref([])

      const effectColorPickerMenu = ref([])

      const shadowEffectPropertyList = ref(['shadowBlur', 'x','y'])

      const addEffect = e => {
        if (activeSections.value.includes(sectionsList.value.length + 1)) e.stopPropagation()
        if (!designData.value.effects) designData.value.effects = []
        designData.value.effects.push(new Effect())
        effectMenu.value.push(false)
        effectColorPickerMenu.value.push(false)
      }

      const removeEffect = index => {
        designData.value.effects.splice(index, 1)
        effectMenu.value.splice(index, 1)
        effectColorPickerMenu.value.splice(index, 1)
      }

      // Custom functionality
      watch(() => designData.value.custom, () => {
        for (let customKey of customCache) {
          deleteStyle(customKey)
        }

        customCache = []
        if (designData.value.custom) {
          const customPropertyList = designData.value.custom.split('\n')
          for (let customProperty of customPropertyList) {
            const customStringList = customProperty.replace(';', '').split(':')
            if (customStringList.length === 2) {
              const customKey = customStringList[0].trim()
              const customValue = customStringList[1].trim()
              if(customKey && customValue && !reservedKeyList.includes(customKey)) {
                setStyle(customKey, customValue)
                customCache.push(customKey)
              }
            }
          }
        }
      }, {lazy: true, deep: true})

      const updateCustomString = _.debounce(function (e) {
        designData.value.custom = e
      }, 1000)

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
                                       style={{ width: width }}
                                       vOn:change={e => prop.value = e}/>
      }

      const genInputLong = (item, val, index, prop) => {
        if (index === 0) return <g-css-customizer-input class="g-css-customizer-design-panel-basic-input__prefixed"
                                                        prefix={item.prefix}
                                                        svg={true}
                                                        prependInnerIcon={item.prependInnerIcon}
                                                        value={val}
                                                        vOn:change={e => prop.value = { string: e, index: index }}/>
        else return <g-css-customizer-input class="g-css-customizer-design-panel-basic-input__long"
                                            value={val}
                                            vOn:change={e => prop.value = { string: e, index: index }}/>
      }

      const genSelect = (item, prop, itemList) => {
        return <div class="g-css-customizer-design-panel-basic-input-wrapper__short">
          {genCheckbox(prop)}
          <g-css-customizer-select items={itemList}
                                   value={prop.value}
                                   prefix={item.prefix}
                                   vOn:input={e => prop.value = e}/>
        </div>
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
        return <div class="g-css-customizer-design-panel-section-content">
          {genSelect(designPropertyList.value.basic[0], designData.value.basic.display, cssDisplayList)}
          {genSelect(designPropertyList.value.basic[1], designData.value.basic.position, cssPositionList)}
          {designPropertyList.value.basic.map(item => (item.constructor === Length || item.constructor === Angle) && genBasicInput(item))}
          <g-btn class="g-css-customizer-design-panel-btn" flat
                 vOn:click={() => designData.value.basic.borderRadius.toggleMode()}>
            <g-icon size="16" color="grey">fas fa-expand</g-icon>
          </g-btn>
        </div>
      }

      const genTextSectionCombobox = (prop) => {
        return <div class="g-css-customizer-design-panel-basic-input-wrapper__long">
          {genCheckbox(prop)}
          <g-css-customizer-combobox items={cssFontFamilyList} value={prop.value} vOn:input={e => prop.value = e}/>
        </div>
      }

      const genTextSectionSelect = (prop) => {
        return <div class="g-css-customizer-design-panel-basic-input-wrapper__short">
          {genCheckbox(prop)}
          <g-css-customizer-select items={cssFontStyleList} value={prop.value} vOn:input={e => prop.value = e}/>
        </div>
      }

      const genTextSectionInput = (item, prop) => {
        return <div class="g-css-customizer-design-panel-basic-input-wrapper__short">
          {genCheckbox(prop)}
          {genInputShort(item, prop)}
        </div>
      }

      const genTextSection = () => {
        const data = {
          scopedSlots: {
            activator: ({ on }) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{ backgroundColor: designData.value.text.color.rgba }}/>
              </div>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-section-content">
          <g-checkbox class="g-css-customizer-design-panel-color-checkbox"
                      inputValue={designData.value.text.color.active}
                      vOn:change={e => designData.value.text.color.active = e}/>
          <g-menu {...data} vModel={textMenu.value} nudgeLeft="376" nudgeTop="36">
            <g-color-picker vOn:color={color => designData.value.text.color.value = color}/>
          </g-menu>
          <g-css-customizer-input class="g-css-customizer-design-panel-color-input"
                                  value={designData.value.text.color.hex}
                                  vOn:change={e => designData.value.text.color.hex = e}/>
          <g-css-customizer-input class="g-css-customizer-design-panel-percentage-input"
                                  value={designData.value.text.color.alpha}
                                  vOn:change={e => designData.value.text.color.alpha = e}/>
          {genTextSectionCombobox(designData.value.text.fontFamily)}
          {genTextSectionSelect(designData.value.text.fontWeight)}
          {designPropertyList.value.text.map(item => item.constructor === Length && genTextSectionInput(item, designData.value.text[item.key]))}
        </div>
      }

      const genFillSection = () => {
        const data = {
          scopedSlots: {
            activator: ({ on }) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{ backgroundColor: designData.value.fill.color.rgba }}/>
              </div>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-section-content">
          <g-checkbox class="g-css-customizer-design-panel-color-checkbox"
                      inputValue={designData.value.fill.color.active}
                      vOn:change={e => designData.value.fill.color.active = e}/>
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
            activator: ({ on }) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{ backgroundColor: designData.value.stroke.color.rgba }}/>
              </div>
            }
          }
        }


        return <div class="g-css-customizer-design-panel-section-content">
          <g-checkbox class="g-css-customizer-design-panel-color-checkbox"
                      inputValue={strokeCheckbox.value}
                      vOn:change={e => strokeCheckbox.value = e}/>
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

      const genSpaceInput = item => {
        return <div class={`g-css-customizer-design-panel-basic-input-wrapper__long`}>
          {genCheckbox(designData.value.space[item.key])}
          {designData.value.space[item.key].mode === 'long'
              ? designData.value.space[item.key].value.map((val, index) => genInputLong(item, val, index, designData.value.space[item.key]))
              : genInputShort(item, designData.value.space[item.key], '32%')}
        </div>
      }

      const genSpaceSection = () => {
        return <div class="g-css-customizer-design-panel-section-content">
          {designPropertyList.value.space.map(item => [
            genSpaceInput(item),
            <g-btn class="g-css-customizer-design-panel-btn" flat
                   vOn:click={() => designData.value.space[item.key].toggleMode()}>
              <g-icon size="16" color="grey">fas fa-expand</g-icon>
            </g-btn>
          ])}
        </div>
      }

      const genShadowEditor = (effect, index) => {
        const colorPikerMenuData = {
          scopedSlots: {
            activator: ({on}) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{backgroundColor: effect.color.rgba}}/>
              </div>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-effect-shadow-editor">
          <div class="g-css-customizer-design-panel-effect-shadow-editor-header">
            Effect
          </div>
          {
            shadowEffectPropertyList.value.map(property => {
              const propertyText = property.indexOf('Blur') > -1 ? 'blur' : property
              return [
                <div class="g-css-customizer-design-panel-effect-shadow-editor-title"
                     style={{gridArea: `${propertyText}title`}}>
                  {_.startCase(propertyText)}
                </div>,
                <div class="g-css-customizer-design-panel-effect-shadow-editor-input"
                     style={{gridArea: `${propertyText}input`}}>
                  <g-css-customizer-input value={effect[property].value}
                                          vOn:change={e => effect[property].value = e}/>
                </div>
              ]
            })
          }
          <div class="g-css-customizer-design-panel-effect-shadow-editor-color">
            <g-menu  nudgeLeft="338" nudgeTop="36" value={effectColorPickerMenu.value[index]}
                     vOn:input={e => set(effectColorPickerMenu.value, index, e)} {...colorPikerMenuData}>
              <g-color-picker vOn:color={color => effect.color.value = color}/>
            </g-menu>
            <g-css-customizer-input class="g-css-customizer-design-panel-color-input"
                                    value={effect.color.hex}
                                    vOn:change={e => effect.color.hex = e}/>
          </div>
          <div class="g-css-customizer-design-panel-effect-shadow-editor-alpha">
            <g-css-customizer-input value={effect.color.alpha}
                                    vOn:change={e => effect.color.alpha = e}/>
          </div>
        </div>
      }

      const genBlurEditor = (effect, index) => {
        return <div class="g-css-customizer-design-panel-effect-blur-editor">
          <div class="g-css-customizer-design-panel-effect-blur-editor-header">
            Effect
          </div>
          <div class="g-css-customizer-design-panel-effect-blur-editor-title">
            Blur
          </div>
          <div class="g-css-customizer-design-panel-effect-blur-editor-input">
            <g-css-customizer-input class="g-css-customizer-design-panel-length-input"
                                    value={effect['layerBlur'].value}
                                    vOn:change={e => effect['layerBlur'].value = e}/>
          </div>
        </div>
      }

      const genEffectSection = (effect, index) => {
        const menuData = {
          scopedSlots: {
            activator: ({on}) => {
              return <GBtn flat style="width: 20px; min-width: 12px; height: 20px; padding: 0; margin-left: 8px" vOn:click={on.click}>
                <GIcon size="16" color="grey">far fa-sun</GIcon>
              </GBtn>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-section-content">
          <div class="g-css-customizer-design-panel-effect-wrapper">
            {genCheckbox(effect)}
            <g-css-customizer-select class="g-css-customizer-design-panel-section-content-select-effect"
                                     value={effect.type} vOn:input={e => effect.type = e}
                                     items={effectList} itemText="text" itemValue="value"/>
          </div>
          <g-menu value={effectMenu.value[index]} vOn:input={e => set(effectMenu.value, index, e)} {...menuData} nudgeLeft="448" nudgeTop="32">
            {effect.type.indexOf('Shadow') > -1 && genShadowEditor(effect, index)}
            {effect.type.indexOf('Blur') > -1 && genBlurEditor(effect, index)}
          </g-menu>
          <g-btn flat class="g-css-customizer-design-panel-btn" style="margin-left: auto" vOn:click={() => removeEffect(index)}>
            <g-icon size="16" color="grey">fas fa-minus</g-icon>
          </g-btn>
        </div>
      }

      const genCustomSection = () => {
        return <div class="g-css-customizer-design-panel-custom">
          <g-textarea value={designData.value.custom} vOn:input={updateCustomString}/>
        </div>
      }

      const genDesignPanel = () => {
        return <div class="g-css-customizer-design-panel">
          <g-sections vModel={activeSections.value} multiple={true}>
            {
              sectionsList.value.map((section, index) => {
                return <g-sections-header key={`header${index}`}>
                  {section}
                </g-sections-header>
              })
            }
            <g-sections-header key="headerEffects">
              Effects
              <g-icon size="16" vOn:click={addEffect}>
                fas fa-plus
              </g-icon>
            </g-sections-header>
            <g-sections-header key="headerCustom">
              Custom
            </g-sections-header>
            <g-sections-item key="basic">
              {genBasicSection()}
            </g-sections-item>
            <g-sections-item key="text">
              {genTextSection()}
            </g-sections-item>
            <g-sections-item key="fill">
              {genFillSection()}
            </g-sections-item>
            <g-sections-item key="stroke">
              {genStrokeSection()}
            </g-sections-item>
            <g-sections-item key="space">
              {genSpaceSection()}
            </g-sections-item>
            <g-sections-item key="effects" class={{'g-sections-item__empty': !designData.value.effects || (designData.value.effects && designData.value.effects.length === 0)}}>
              {designData.value.effects && designData.value.effects.map((effect, index) => genEffectSection(effect, index))}
              <span/>
            </g-sections-item>
            <g-sections-item key="custom">
              {genCustomSection()}
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

				&-select {
          &-style {
            width: 20%;

            .g-menu--content.in-select {
              .g-list-item {
                width: 10px
              }
            }
          }
				}

				::v-deep.g-checkbox-wrapper {
					margin: 0;
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

		&-effect {
      &-wrapper {
        width: 60%;
        display: flex;
        align-items: center;
      }

			&-shadow-editor {
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

      &-blur-editor {
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
		}

    &-custom {
      &-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
      }

      &-key {
        width: 40%
      }

      &-value {
        width: 60%
      }

      &::v-deep .g-tf-input {
        font-size: 12px;
      }

      &::v-deep .g-tf-wrapper {
        margin: 0;
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

    &-color-checkbox {
      ::v-deep.g-checkbox {
        padding-left: 32px;
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

    &::v-deep .g-sections-header:first-child {
      border-top: none;
    }

    ::v-deep.g-sections-item__empty {
      .g-sections-item-content-wrapper {
        padding: 0
      }
    }
	}
</style>
