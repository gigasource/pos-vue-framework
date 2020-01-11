<script>
  import _ from 'lodash'
  import {ref, reactive, computed, watch, set, inject, onMounted} from '@vue/composition-api';
  import {getInternalValue} from '../../mixins/getVModel';
  import {convertToUnit} from '../../utils/helpers';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GGridSelect from '../GGridSelect/GGridSelect';
  import GColorPicker from '../GColorPicker/GColorPicker';
  import GCheckbox from '../GCheckbox/GCheckbox';
  import GTextField from '../GInput/GTextField';
  import GMenu from '../GMenu/GMenu';
  import GSections from '../GExpansion/GSections';
  import GSectionsHeader from '../GExpansion/GSectionsHeader';
  import GSectionsItem from '../GExpansion/GSectionsItem';

  export default {
    name: "GCssCustomizerDesignPanel",
    components: {
      GSectionsHeader,
      GSectionsItem, GSections, GTextField, GBtn, GIcon, GGridSelect, GColorPicker, GCheckbox, GMenu
    },
    props: {
      activeSelector: String,
      value: Object
    },
    setup(props, context) {
      const activeSections = ref([])

      const sectionsList = ref(['Fill', 'Stroke', 'Space'])

      const defaultDesignData = {
        basic: {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          rotation: 0,
          borderRadius: 0,
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

      const designData = ref(_.cloneDeep(defaultDesignData))

      watch(() => props.activeSelector, () => {
        designData.value = getDesignState() || _.cloneDeep(defaultDesignData)
      }, {lazy: true})

      const getStyle = inject('getStyle')
      const setStyle = inject('setStyle')
      const getDesignState = inject('getDesignState')
      const setDesignState = inject('setDesignState')

      // Helpers
      const colorToRGBA = color => {
        const r = parseInt(`0x${color.value.substring(1, 3)}`)
        const g = parseInt(`0x${color.value.substring(3, 5)}`)
        const b = parseInt(`0x${color.value.substring(5, 7)}`)
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          return `rgba(${r}, ${g}, ${b}, ${color.alpha})`
        }
      }

      const strokeToCSS = strokeData => {
        return `${strokeData.width}px solid ${colorToRGBA(strokeData.color)}`
      }

      const updateColor = (inputColor, color) => {
        if (inputColor.angle) {
          return
        } else if (inputColor.value) {
          color.value = inputColor.value
        } else {
          color.value = inputColor
        }
      }

      const spaceToCSS = spaceData => {
        if (_.isArray(spaceData)) {
          return _.reduce(spaceData, (acc, val) => {
            return acc = acc + convertToUnit(val) + ' '
          }, '')
        } else {
          return convertToUnit(spaceData)
        }
      }

      const shadowToCCS  = effectData => {
        const shadowData = _.filter(effectData, val => val.type.indexOf('Shadow') > -1 && val.active)
        return _.reduce(shadowData, (acc, val, index) => {
          let temp = ''
          if (val.active) {
            if (val.type === 'innerShadow') temp += 'inset '
            temp += `${convertToUnit(val.x)} ${convertToUnit(val.y)} ${convertToUnit(val.shadowBlur)} ${colorToRGBA(val.color)}`
            if (index < shadowData.length - 1) temp += ', '
          }
          return acc += temp
        }, '')
      }

      const blurToCSS = effectData => {
        const blurData = _.find(effectData, val => val.type.indexOf('Blur') > -1 && val.active)
        if (blurData !== undefined) return `blur(${convertToUnit(blurData.layerBlur)})`
      }

      const parseLength = str => isNaN(parseInt(str)) ? 0 : parseInt(str)

      const parsePercentage = str => !isNaN(parseFloat(str)) ? parseFloat(str) / 100 : 0

      // Align functionality
      const align = ref('')
      const alignItemList = ref([
        {
          value: 'left',
          icon: 'icon-align_left'
        },
        {
          value: 'center',
          icon: 'icon-align_center_horizontal'
        },
        {
          value: 'right',
          icon: 'icon-align_right'
        },
        {
          value: 'top',
          icon: 'icon-align_top'
        },
        {
          value: 'center-vertical',
          icon: 'icon-align_center_vertical'
        },
        {
          value: 'bottom',
          icon: 'icon-align_bottom'
        },
      ])

      // Fill functionality
      const fillData = computed({
        get: () => designData.value['fill'],
        set: value => designData.value['fill'] = value
      })

      const fillColorPicker = computed({
        get: () => {
          return colorToRGBA(fillData.value.color)
        },
        set: value => {
          if (value.length === 7) {
            fillData.value.color.value = value
            fillData.value.color.alpha = 1
            setStyle('backgroundColor', colorToRGBA(fillData.value.color))
            setDesignState(designData.value)
          } else if (value.length === 9) {
            fillData.value.color.value = value.substring(0, 7)
            const alpha = parseInt(`0x${value.substring(7, 9)}`) / 256
            fillData.value.color.alpha = alpha >= 1 ? 1 : alpha.toFixed(2)
            setStyle('backgroundColor', colorToRGBA(fillData.value.color))
            setDesignState(designData.value)
          } else {
            fillData.value.color.value = undefined
            fillData.value.color.alpha = undefined
            setStyle('backgroundColor', undefined)
            setDesignState(designData.value)
          }
        }
      })

      const fillColorInput = computed({
        get: () => fillData.value.color.value.replace(/^#/, ''),
        set: value => {
          fillData.value.color.value = `#${value}`
          setStyle('backgroundColor', colorToRGBA(fillData.value.color))
          setDesignState(designData.value)
        }
      })

      const fillAlphaInput = computed({
        get: () => `${fillData.value.color.alpha * 100}%`,
        set: value => {
          fillData.value.color.alpha = !isNaN(parseFloat(value)) ? parseFloat(value) / 100 : 0
          setStyle('backgroundColor', colorToRGBA(fillData.value.color))
          setDesignState(designData.value)
        }
      })

      const fillCheckbox = computed({
        get: () => {
          return getStyle('backgroundColor') !== undefined
        },
        set: value => {
          if (value) {
            setStyle('backgroundColor', colorToRGBA(fillData.value.color))
          } else {
            setStyle('backgroundColor', undefined)
          }
        }
      })

      const fillMenu = ref(false)

      // Stroke functionality
      const strokeModeList = ref([
        {
          value: 'center',
          text: 'Center'
        },
        {
          value: 'inside',
          text: 'Inside'
        },
        {
          value: 'outside',
          text: 'Outside'
        }
      ])

      const strokeData = computed({
        get: () => designData.value['stroke'],
        set: value => designData.value['stroke'] = value
      })

      const strokeColorPicker = computed({
        get: () => {
          return colorToRGBA(strokeData.value.color)
        },
        set: value => {
          if (value.length === 7) {
            strokeData.value.color.value = value
            strokeData.value.color.alpha = 1
            setStyle('border', strokeToCSS(strokeData.value))
            setDesignState(designData.value)
          } else if (value.length === 9) {
            strokeData.value.color.value = value.substring(0, 7)
            const alpha = parseInt(`0x${value.substring(7, 9)}`) / 256
            strokeData.value.color.alpha = alpha >= 1 ? 1 : alpha.toFixed(2)
            setStyle('border', strokeToCSS(strokeData.value))
            setDesignState(designData.value)
          } else {
            strokeData.value.color.value = undefined
            strokeData.value.color.alpha = undefined
            setStyle('border', undefined)
          }
        }
      })

      const strokeAlphaInput = computed({
        get: () => `${strokeData.value.color.alpha * 100}%`,
        set: value => {
          strokeData.value.color.alpha = !isNaN(parseFloat(value)) ? parseFloat(value) / 100 : 0
          setStyle('border', strokeToCSS(strokeData.value))
          setDesignState(designData.value)
        }
      })

      const strokeColorInput = computed({
        get: () => strokeData.value.color.value.replace(/^#/, ''),
        set: value => {
          strokeData.value.color.value = `#${value}`
          setStyle('border', strokeToCSS(strokeData.value))
          setDesignState(designData.value)
        }
      })

      const strokeWidthInput = computed({
        get: () => `${strokeData.value.width}px`,
        set: value => {
          strokeData.value.width = !isNaN(parseInt(value)) ? parseInt(value) : 0
          setStyle('border', strokeToCSS(strokeData.value))
          setDesignState(designData.value)
        }
      })

      const strokeCheckbox = computed({
        get: () => {
          return getStyle('border') !== undefined
        },
        set: value => {
          if (value) {
            setStyle('border', strokeToCSS(strokeData.value))
          } else {
            setStyle('border', undefined)
          }
        }
      })

      const strokePosition = computed({
        get: () => strokeData.value.mode,
        set: value => {
          strokeData.value.mode = value
          // setStyle('border', strokeToCSS(strokeData.value))
        }
      })

      const strokeMenu = ref(false)

      // Space functionality
      const spaceData = computed({
        get: () => designData.value['space'],
        set: value => designData.value['space'] = value
      })

      const switchSpaceMode = key => {
        if (spaceData.value[key].mode === 'short') {
          spaceData.value[key].value = [spaceData.value[key].value, spaceData.value[key].value, spaceData.value[key].value, spaceData.value[key].value]
          spaceData.value[key].mode = 'long'
          if (getStyle(key) !== undefined) setStyle(key, spaceToCSS(spaceData.value[key].value))
          setDesignState(designData.value)
        } else {
          spaceData.value[key].value = spaceData.value[key].value[0]
          spaceData.value[key].mode = 'short'
          if (getStyle(key) !== undefined) setStyle(key, spaceToCSS(spaceData.value[key].value))
          setDesignState(designData.value)
        }
      }

      const paddingInput = computed({
        get: () => {
          if (spaceData.value.padding.value instanceof Array) {
            return _.map(spaceData.value.padding.value, pos => `${pos}px`)
          } else {
            return `${spaceData.value.padding.value}px`
          }
        },
        set: value => {
          if (value instanceof Object) {
            set(spaceData.value.padding.value, value.index, !isNaN(parseInt(value.value)) ? parseInt(value.value) : 0)
          } else {
            spaceData.value.padding.value = !isNaN(parseInt(value)) ? parseInt(value) : 0
          }
          setStyle('padding', spaceToCSS(spaceData.value.padding.value))
          setDesignState(designData.value)
        }
      })

      const paddingCheckbox = computed({
        get: () => {
          return getStyle('padding') !== undefined
        },
        set: value => {
          if (value) {
            setStyle('padding', spaceToCSS(spaceData.value.padding.value))
          } else {
            setStyle('padding', undefined)
          }
        }
      })

      const marginInput = computed({
        get: () => {
          if (spaceData.value.margin.value instanceof Array) {
            return _.map(spaceData.value.margin.value, pos => `${pos}px`)
          } else {
            return `${spaceData.value.margin.value}px`
          }
        },
        set: value => {
          if (value instanceof Object) {
            set(spaceData.value.margin.value, value.index, !isNaN(parseInt(value.value)) ? parseInt(value.value) : 0)
          } else {
            spaceData.value.margin.value = !isNaN(parseInt(value)) ? parseInt(value) : 0
          }
          setStyle('margin', spaceToCSS(spaceData.value.margin.value))
          setDesignState(designData.value)
        }
      })

      const marginCheckbox = computed({
        get: () => {
          return getStyle('margin') !== undefined
        },
        set: value => {
          if (value) {
            setStyle('margin', spaceToCSS(spaceData.value.margin.value))
          } else {
            setStyle('margin', undefined)
          }
        }
      })

      // Effects functionality
      const effectList = ref([
        {
          value: 'dropShadow',
          text: 'Drop Shadow'
        },
        {
          value: 'innerShadow',
          text: 'Inner Shadow'
        },
        {
          value: 'layerBlur',
          text: 'Layer Blur'
        }
      ])

      const shadowEffectPropertyList = ref(['shadowBlur', 'x','y'])

      const effectData = computed({
        get: () => designData.value['effects'],
        set: value => designData.value['effects'] = value
      })

      const effectMenu = ref([])

      const effectColorPickerMenu = ref([])

      const setEffectProperty = (effect, property, value) => {
        set(effect, property, value)
        set(effect, 'active', true)
      }

      const setEffectColor = (effect, key, value) => {
        set(effect.color, key, value)
        set(effect, 'active', true)
      }

      const updateEffectColor = (effect, inputColor) => {
        let color
        if (inputColor.angle) return
        else if (inputColor.value) {
          color = inputColor.value
        } else {
          color = inputColor
        }
        if (color.length === 7) {
          set(effect.color, 'value', color)
          set(effect.color, 'alpha', 1)
        } else if (color.length === 9) {
          set(effect.color, 'value', color.substring(0, 7))
          const alpha = parseInt(`0x${color.substring(7, 9)}`) / 256
          set(effect.color, 'alpha', alpha >= 1 ? 1 : alpha.toFixed(2))
        } else {
          set(effect.color, 'value', undefined)
          set(effect.color, 'alpha', undefined)
        }
        set(effect, 'active', true)
      }

      watch(() => effectData.value, newVal => {
        setStyle('boxShadow', shadowToCCS(newVal))
        setStyle('filter', blurToCSS(newVal))
        setDesignState(designData.value)
      }, {lazy: true, deep: true})

      const addEffectBtn = e => {
        if (activeSections.value.includes(4)) e.stopPropagation()
        effectData.value.push({
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
        })
        effectMenu.value.push(false)
      }

      const removeEffectBtn = index => {
        effectData.value.splice(index, 1)
      }

      // Render functions
      const genAlign = () => {
        const data = {
          scopedSlots: {
            default: ({toggleSelect, item, index}) => {
              return <GBtn flat style="margin-right: 4px; width: 28px; min-width: 12px; height: 28px; padding: 0px 4px;"
                           vOn:click={() => toggleSelect(item)} ripple={false}>
                <GIcon svg size="20">
                  {item.icon}
                </GIcon>
              </GBtn>
            },
            selected: ({toggleSelect, item, index}) => {
              return <GBtn flat style="margin-right: 4px; width: 28px; min-width: 12px; height: 28px; padding: 0px 4px;"
                           vOn:click={() => toggleSelect(item)} backgroundColor="#E0E0E0" ripple={false}>
                <GIcon svg size="20">
                  {item.icon}
                </GIcon>
              </GBtn>
            },
          }
        }

        return <g-grid-select class="g-css-customizer-design-panel-section" grid={false} items={alignItemList.value}
                              itemText="itemText" itemValue="value" {...data} vModel={align.value}>
        </g-grid-select>
      }

      const genFillSection = () => {
        const data = {
          scopedSlots: {
            activator: ({on}) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{backgroundColor: fillColorPicker.value}}/>
              </div>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-section-content">
          <g-checkbox vModel={fillCheckbox.value}/>
          <g-menu {...data} vModel={fillMenu.value}>
            <g-color-picker vOn:color={color => updateColor(color, fillColorPicker)}/>
          </g-menu>
          <input type="text" maxLength="6" size="7" style="text-transform: uppercase"
                 value={fillColorInput.value}
                 vOn:change={e => fillColorInput.value = e.target.value}/>
          <input type="text" maxLength="4" size="5" style="margin-left: 20px"
                 value={fillAlphaInput.value}
                 vOn:change={e => fillAlphaInput.value = e.target.value}/>
        </div>
      }

      const genStrokeSection = () => {
        const menuData = {
          scopedSlots: {
            activator: ({on}) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{backgroundColor: strokeColorPicker.value}}/>
              </div>
            }
          }
        }

        const gridSelectData = {
          scopedSlots: {
            default: ({toggleSelect, item, index}) => {
              return <GBtn flat small ripple={false} vOn:click={() => toggleSelect(item)}
                           style="font-size: 14px; text-transform: capitalize">
                {item.text}
              </GBtn>
            },
            selected: ({toggleSelect, item, index}) => {
              return <GBtn flat small ripple={false}
                           vOn:click={() => toggleSelect(item)}
                           backgroundColor="#E0E0E0" style="font-size: 14px; text-transform: capitalize">
                {item.text}
              </GBtn>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-section-content">
          <g-checkbox vModel={strokeCheckbox.value}/>
          <g-menu {...menuData} vModel={strokeMenu.value}>
            <g-color-picker vOn:color={color => updateColor(color, strokeColorPicker)}/>
          </g-menu>
          <input type="text" maxLength="6" size="7" style="text-transform: uppercase"
                 value={strokeColorInput.value}
                 vOn:change={e => strokeColorInput.value = e.target.value}/>
          <input type="text" maxLength="4" size="5" style="margin-left: 20px"
                 value={strokeAlphaInput.value}
                 vOn:change={e => strokeAlphaInput.value = e.target.value}/>
          <input type="text" maxLength="5" size="6" style="margin-left: 16px"
                 value={strokeWidthInput.value}
                 vOn:change={e => strokeWidthInput.value = e.target.value}/>
          <g-grid-select class="g-css-customizer-design-panel-stroke-position"
                         vModel={strokePosition.value}
                         grid={false}
                         mandatory={true}
                         items={strokeModeList.value}
                         itemText="itemText"
                         itemValue="value" {...gridSelectData}/>
        </div>
      }

      const genPaddingShort = () => {
        return <input type="text" maxLength="4" size="4" style="margin-left: 8px" value={paddingInput.value} vOn:change={e => paddingInput.value = e.target.value}/>
      }

      const genPaddingLong = (item, index) => {
        return <input type="text" maxLength="4" size="4" style="margin-left: 8px" value={item}
                      vOn:change={e => paddingInput.value = {index: index, value: e.target.value}}/>
      }

      const genPaddingSection = () => {
        return <div class="g-css-customizer-design-panel-section-content g-css-customizer-design-panel-section-content__justify" >
          <div style="display: flex">
            <g-checkbox vModel={paddingCheckbox.value}/>
            <p style="margin-right: 8px; font-size: 14px; color: grey">P</p>
            {spaceData.value.padding.mode === 'short' ? genPaddingShort() : paddingInput.value.map((item, index) => genPaddingLong(item, index))}
          </div>
          <div>
            <g-btn flat style="width: 20px; min-width: 12px; height: 20px; padding: 0;" vOn:click={() => switchSpaceMode('padding')}>
              <g-icon size="16">fas fa-expand</g-icon>
            </g-btn>
          </div>
        </div>
      }

      const genMarginShort = () => {
        return <input type="text" maxLength="4" size="4" style="margin-left: 8px" value={marginInput.value} vOn:change={e => marginInput.value = e.target.value}/>
      }

      const genMarginLong = (item, index) => {
        return <input type="text" maxLength="4" size="4" style="margin-left: 8px" value={item}
                      vOn:change={e => marginInput.value = {index: index, value: e.target.value}}/>
      }

      const genMarginSection = () => {
        return <div class="g-css-customizer-design-panel-section-content g-css-customizer-design-panel-section-content__justify" >
          <div style="display: flex">
            <g-checkbox vModel={marginCheckbox.value}/>
            <p style="margin-right: 8px; font-size: 14px; color: grey">M</p>
            {spaceData.value.margin.mode === 'short' ? genMarginShort() : marginInput.value.map((item, index) => genMarginLong(item, index))}
          </div>
          <div>
            <g-btn flat style="width: 20px; min-width: 12px; height: 20px; padding: 0;" vOn:click={() => switchSpaceMode('margin')}>
              <g-icon size="16">fas fa-expand</g-icon>
            </g-btn>
          </div>
        </div>
      }

      const genShadowEditor = (effect, index) => {
        const colorPikerMenuData = {
          scopedSlots: {
            activator: ({on}) => {
              return <div class="g-css-customizer-design-panel-color-preview-transparent">
                <div class="g-css-customizer-design-panel-color-preview" vOn:click={on.click}
                     style={{backgroundColor: colorToRGBA(effect.color)}}/>
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
                  <input type="text" maxLength="4" size="4" value={convertToUnit(effect[property])}
                         vOn:change={e => setEffectProperty(effect, property, parseLength(e.target.value))}/>
                </div>
              ]
            })
          }
          <div class="g-css-customizer-design-panel-effect-shadow-editor-color">
            <g-menu value={effectColorPickerMenu.value[index]}
                    vOn:input={e => set(effectColorPickerMenu.value, index, e)} {...colorPikerMenuData}>
              <g-color-picker vOn:color={color => updateEffectColor(effect, color)}/>
            </g-menu>
            <input type="text" maxLength="6" size="7"
                   value={effect.color.value.replace(/^#/, '')}
                   vOn:change={e => setEffectColor(effect, 'value', `#${e.target.value}`)}/>
          </div>
          <div class="g-css-customizer-design-panel-effect-shadow-editor-alpha">
            <input type="text" maxLength="4" size="5"
                   value={`${effect.color.alpha * 100}%`}
                   vOn:change={e => setEffectColor(effect, 'alpha', parsePercentage(e.target.value))}/>
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
            <input type="text" maxLength="4" size="4" value={convertToUnit(effect['layerBlur'])}
                   vOn:change={e => setEffectProperty(effect, 'layerBlur', parseLength(e.target.value))}/>
          </div>
        </div>
      }

      const genEffectSection = (effect, index) => {
        const menuData = {
          scopedSlots: {
            activator: ({on}) => {
              return <GBtn flat style="width: 20px; min-width: 12px; height: 20px; padding: 0; margin-left: 16px" vOn:click={on.click}>
                <GIcon size="16" color="grey">far fa-sun</GIcon>
              </GBtn>
            }
          }
        }

        return <div class="g-css-customizer-design-panel-section-content g-css-customizer-design-panel-section-content__justify">
          <div style="display: flex">
            <g-checkbox inputValue={effect.active} vOn:change={e => effect.active = e}/>
            <select value={effect.type} vOn:change={e => setEffectProperty(effect, 'type', e.target.value)}>
              {effectList.value.map(item => <option value={item.value} disabled={item.value === 'layerBlur' && effect.type !== 'layerBlur' && _.find(effectData.value, {type: 'layerBlur'})}>
                {item.text}
              </option>)}
            </select>
            <g-menu value={effectMenu.value[index]} vOn:input={e => set(effectMenu.value, index, e)} {...menuData}>
              {effect.type.indexOf('Shadow') > -1 && genShadowEditor(effect, index)}
              {effect.type.indexOf('Blur') > -1 && genBlurEditor(effect, index)}
            </g-menu>
          </div>
          <div>
            <g-btn flat style="width: 20px; min-width: 12px; height: 20px; padding: 0; margin-left: 16px" vOn:click={() => removeEffectBtn(index)}>
              <g-icon size="16" color="grey">fas fa-minus</g-icon>
            </g-btn>
          </div>
        </div>
      }

      const genDesignPanel = () => {
        return <div class="g-css-customizer-design-panel">
          {genAlign()}
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
              <g-icon size="16" vOn:click={addEffectBtn}>
                fas fa-plus
              </g-icon>
            </g-sections-header>
            <g-sections-item key="fill">
              {genFillSection()}
            </g-sections-item>
            <g-sections-item key="stroke">
              {genStrokeSection()}
            </g-sections-item>
            <g-sections-item key="margin">
              {genPaddingSection()}
              {genMarginSection()}
            </g-sections-item>
            <g-sections-item key="effects" class={{'g-sections-item__empty': effectData.value.length === 0}}>
              {effectData.value.map((effect, index) => genEffectSection(effect, index))}
              <div/>
            </g-sections-item>
          </g-sections>
        </div>
      }

      return {
        genDesignPanel,
        align,
        fillData,
        strokeData,
        spaceData,
        designData,
        effectData,
        paddingInput,
        activeSections,
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
      width: 240px;
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

      &-title, &-input, &-alpha {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-left: 16px;
        color: grey;

        input {
          font-size: 14px
        }
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

        input {
          font-size: 14px;
          text-transform: uppercase;
          padding-left: 8px;
        }
      }
    }

    &-effect-blur-editor {
      background-color: white;
      border: 1px solid #E0E0E0;
      width: 240px;
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

  ::v-deep.g-sections-item__empty {
    .g-sections-item-content-wrapper {
      padding: 0
    }
  }
</style>