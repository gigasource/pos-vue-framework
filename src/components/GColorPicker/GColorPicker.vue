<script>
  import { watch, onMounted, reactive, computed, ref } from '@vue/composition-api'
  import { fromHexa, fromHSLA, fromHSVA, fromRGBA } from './logic/GColorPickerUtil'
  import { clamp } from 'lodash/number'
  import { RGBAtoCSS, RGBtoCSS } from '../../utils/colors'
  import { updateCanvas } from './logic/uiHelper/GColorPickerUIHelper'
  import swatches from './logic/uiHelper/swatches'
  import GSlider from '../GInput/GSlider'
  import GToolTip from '../GToolTip/GToolTip'
  import _ from 'lodash'
  import GTab from '../GTabs/GTab'
  import GTabs from '../GTabs/GTabs'
  import GTabItems from '../GTabs/GTabItems'
  import GTabItem from '../GTabs/GTabItem'
  import createGradientModels from './logic/uiHelper/gradientColors'

  export default {
    name: 'GColorPicker',
    components: { GTabItem, GTabItems, GTab, GToolTip, GSlider, GTabs },
    props: {
      disabled: Boolean,

      //
      width: {
        type: [String, Number],
        default: 300
      }
    },
    setup(props, context) {
      const canvasRef = 'canvas'
      const colorPickerState = reactive({
        color: {
          rgba: { r: 255, g: 0, b: 0, a: 1 },
          hsva: { h: 0, s: 1, v: 1, a: 1 },
          hsla: { h: 0, s: 1, l: 0.5, a: 1 },
          hexa: '#FF0000FF',
          hex: '#FF0000',
          hue: 0,
          alpha: 1
        },
        canvasSize: { width: 0, height: 0 }
      })

      /// canvas
      onMounted(() => {
        const { width, height } = context.refs[canvasRef]
        colorPickerState.canvasSize = { width, height }
        watch(() => colorPickerState.color.hue, () => updateCanvas(context.refs[canvasRef], colorPickerState.color.hue))
      })

      function updateColor(color) {
        colorPickerState.color = color
        // we only emit input with rgba value
        context.emit('input', colorPickerState.color.rgba)
        // but emit entire color object into custom event update:color
        context.emit('update:color', colorPickerState.color)
      }

      function emitColor(x, y) {
        const { width, height, left, top } = context.refs[canvasRef].getBoundingClientRect()
        updateColor(fromHSVA({
          h: colorPickerState.color.hue,
          s: clamp(x - left, 0, width) / width,
          v: 1 - clamp(y - top, 0, height) / height,
          a: colorPickerState.color.alpha,
        }))
      }

      let mouseDown

      function handleCanvasMouseDown(e) {
        if (props.disabled) {
          return
        }
        mouseDown = true
      }

      function handleCanvasMouseMove(e) {
        if (mouseDown) {
          emitColor(e.clientX, e.clientY)
        }
      }

      function handleCanvasMouseUp() {
        mouseDown = false
      }

      function renderCanvas() {
        return (
            <canvas
                ref={canvasRef}
                width={props.width}
                height={150}
                vOn:mousedown={handleCanvasMouseDown}
                vOn:mousemove={handleCanvasMouseMove}
                vOn:mouseup={handleCanvasMouseUp}
            >
            </canvas>
        )
      }

      const cptDotStyle = computed(() => ({
        left: `${colorPickerState.color.hsva.s * parseInt(colorPickerState.canvasSize.width)}px`,
        top: `${(1 - colorPickerState.color.hsva.v) * parseInt(colorPickerState.canvasSize.height)}px`
      }))

      function renderDot() {
        return <div class='g-color-picker__color-field__dot' style={cptDotStyle.value}></div>
      }

      // preview
      function renderPreview() {
        return <div class='g-color-picker__preview' style={{ borderRadius: '100%', backgroundColor: RGBAtoCSS(colorPickerState.color.rgba) }}></div>
      }

      // adjust
      const hueSliderStyleObj = {
        background: `linear-gradient(to right, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%, #00F 66.66%, #F0F 83.33%, #F00 100%)`,
      }
      const alphaSliderStyleObj = {
        backgroundImage: `linear-gradient(to right, transparent, ${RGBtoCSS(colorPickerState.color.rgba)})`
      }

      function renderHueAdjustSlider() {
        return (
            <div class='g-color-picker__adjust__hue'>
              <g-slider
                  style={hueSliderStyleObj}
                  value={colorPickerState.color ? colorPickerState.color.hue : 0}
                  step={1} min={0} max={360}
                  vOn:input={val => colorPickerState.color.hue !== val && updateColor(fromHSVA({ ...colorPickerState.color.hsva, h: val }))}
              ></g-slider>
            </div>
        )
      }

      function renderAlphaAdjustSlider() {
        return <div class='g-color-picker__adjust__alpha'>
          <g-slider
              style={alphaSliderStyleObj}
              value={colorPickerState.color ? colorPickerState.color.alpha : 0}
              step={0.01} min={0} max={1}
              vOn:input={val => {
                if (colorPickerState.color.alpha !== val) {
                  console.log(colorPickerState.color.hsva)
                  const newColor = fromHSVA({ ...colorPickerState.color.hsva, a: val })
                  updateColor(newColor)
                }
              }}
          ></g-slider>
        </div>
      }

      // editor
      const editorModes = [
        {
          name: 'hexa',
          from: fromHexa
        }, {
          name: 'rgba',
          inputs: [
            ['r', 255, 'int'],
            ['g', 255, 'int'],
            ['b', 255, 'int'],
            ['a', 1, 'float'],
          ],
          from: fromRGBA,
        }, {
          name: 'hsla',
          inputs: [
            ['h', 360, 'int'],
            ['s', 1, 'float'],
            ['l', 1, 'float'],
            ['a', 1, 'float'],
          ],
          from: fromHSLA,
        }
      ]

      const editorState = reactive({
        currentMode: editorModes[0]
      })

      function changeMode() {
        const currenModeIndex = editorModes.indexOf(editorState.currentMode)
        editorState.currentMode = editorModes[(currenModeIndex + 1) % editorModes.length]
        console.log(editorState.currentMode.name)
      }

      function renderHexaEditorInput() {
        return (
            <div class='g-color-picker__edit__input'
                 vShow={editorState.currentMode === editorModes[0]}>
              <input type='text'
                     key='hex'
                     maxLength="9"
                     disabled={props.disabled}
                     value={colorPickerState.color.hexa}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromHexa(e.target.value))
                     }}/>
            </div>
        )
      }

      function renderRGBAEditor() {
        return (
            <div className='g-color-picker__edit__input'
                 vShow={editorState.currentMode === editorModes[1]}>
              <label>R: </label>
              <input type='text' key='r' disabled={props.disabled}
                     value={colorPickerState.color.rgba.r}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromRGBA({...colorPickerState.color.rgba, r: parseInt(e.target.value || 0)}))
                     }}/>
              <label>G: </label>
              <input type='text' key='g' disabled={props.disabled}
                     value={colorPickerState.color.rgba.g}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromRGBA({...colorPickerState.color.rgba, g: parseInt(e.target.value || 0)}))
                     }}/>
              <label>B: </label>
              <input type='text' key='b' disabled={props.disabled}
                     value={colorPickerState.color.rgba.b}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromRGBA({...colorPickerState.color.rgba, b: parseInt(e.target.value || 0)}))
                     }}/>
              <label>A: </label>
              <input type='text' key='a' disabled={props.disabled}
                     value={colorPickerState.color.rgba.a}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromRGBA({...colorPickerState.color.rgba, a: parseFloat(e.target.value || 0)}))
                     }}/>
            </div>
        )
      }

      function renderHSLAEditor() {
        return (
            <div className='g-color-picker__edit__input'
                 vShow={editorState.currentMode === editorModes[2]}>
              <label>H: </label>
              <input type='text' key='h' disabled={props.disabled}
                     value={colorPickerState.color.hsla.h}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromHSLA({...colorPickerState.color.hsla, h: parseInt(e.target.value || 0)}))
                     }}/>
              <label>S: </label>
              <input type='text' key='s' disabled={props.disabled}
                     value={colorPickerState.color.hsla.s}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromHSLA({...colorPickerState.color.hsla, s: parseFloat(e.target.value || 0)}))
                     }}/>
              <label>L: </label>
              <input type='text' key='l' disabled={props.disabled}
                     value={colorPickerState.color.hsla.l}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromHSLA({...colorPickerState.color.hsla, l: parseFloat(e.target.value || 0)}))
                     }}/>
              <label>A: </label>
              <input type='text' key='a' disabled={props.disabled}
                     value={colorPickerState.color.hsla.a}
                     vOn:input_stop_prevent={(e) => {
                       updateColor(fromHSLA({...colorPickerState.color.hsla, a: parseFloat(e.target.value || 0)}))
                     }}/>
            </div>
        )
      }

      function renderEditorModeSwitch() {
        return <button type="button" vOn:click={changeMode}>switch</button>
      }

      //// swatches
      const swatchesModel = swatches()
      const tooltipContentStyleObj = {
        boxShadow: '0 2px 8px 4px #0003',
        margin: '10px',
        borderRadius: '100%',
        width: '50px',
        height: '50px'
      }
      const swatchItemStyleObj = {
        border: '1px solid #0003',
        margin: '0px',
        width: '20px',
        height: '20px',
        display: 'inline-block',
      }

      function renderSwatches() {
        return <div class='g-color-picker__swatches'> {
          _.map(swatchesModel, colorPalletModel =>
              <div class='g-color-picker__swatches__pallet-category'> {
                _.map(colorPalletModel.pallet, pallet => {
                      const scopedSlots = {
                        activator: (scope) => <span
                            style={{ ...swatchItemStyleObj, backgroundColor: pallet.value }}
                            vOn:mouseleave={scope.on.mouseleave}
                            vOn:mouseenter={scope.on.mouseenter}
                            vOn:blur={scope.on.blur}
                            vOn:click={() => {
                              // TODO: Define action when color is selected
                            }}></span>
                      }
                      return (
                          <g-tool-tip top speech-bubble open-on-hover scopedSlots={scopedSlots} color="#333">
                            <div style={'display: flex; align-items: center'}>
                              <div style={{ ...tooltipContentStyleObj, backgroundColor: pallet.value }}></div>
                              <div>
                                <div>{colorPalletModel.name}</div>
                                <div>{pallet.name}</div>
                              </div>
                            </div>
                          </g-tool-tip>)
                    }
                )
              }
              </div>)
        }
        </div>
      }

      //// gradients
      const gradientModels = createGradientModels()
      const gradientItemStyle = {
        display: 'inline-block',
        width: '40px',
        height: '40px',
        margin: '10px',
        border: '1px solid #0003',
        borderRadius: '100%',
      }

      function renderGradientColors() {
        return (
            <div> {
              _.map(gradientModels, gradient => {
                const scopedSlot = {
                  activator: (scope) => <span
                      style={{
                        ...gradientItemStyle,
                        background: `linear-gradient(${gradient.angle}, ${gradient.colorStop1}, ${gradient.colorStop2})`
                      }}
                      vOn:mouseleave={scope.on.mouseleave}
                      vOn:mouseenter={scope.on.mouseenter}
                      vOn:blur={scope.on.blur}
                      vOn:click={() => console.log(gradient.name)}></span>
                }

                return <g-tool-tip top open-on-hover scopedSlots={scopedSlot} color="#333">
                  <div style={'display: flex; align-items: center'}>
                    <div>
                      <div style={{
                        ...tooltipContentStyleObj,
                        background: `linear-gradient(${gradient.angle}, ${gradient.colorStop1}, ${gradient.colorStop2})`
                      }}></div>
                    </div>
                    <div>
                      <div>{`name: ${gradient.name}`}</div>
                      <div>{`angle: ${gradient.angle}`}</div>
                      <div>{`color-stop 1: ${gradient.colorStop1}`}</div>
                      <div>{`color-stop 2: ${gradient.colorStop2}`}</div>
                    </div>
                  </div>
                </g-tool-tip>
              })
            }
            </div>
        )
      }

      let model = ref(null)
      const tabItems = [
        // { title: 'Swatches', renderFn: renderSwatches },
        // { title: 'Gradient', renderFn: renderGradientColors },
        {
          title: 'ColorPicker', renderFn: () => [
            <div class='g-color-picker__color-field'>
              {renderCanvas()}
              {renderDot()}
            </div>,
            <div class='g-color-picker__controls'>
              <div class='g-color-picker__preview-slider-wrapper'>
                {renderPreview()}
                <div class='g-color-picker__sliders'>
                  {renderHueAdjustSlider()}
                  {renderAlphaAdjustSlider()}
                </div>
              </div>
              <div class='g-color-picker__edit'>
                {renderHexaEditorInput()}
                {renderRGBAEditor()}
                {renderHSLAEditor()}
                {renderEditorModeSwitch()}
              </div>
            </div>
          ]
        }
      ]

      return function renderColorPicker() {
        return (
            <div class='g-color-picker'>
              <g-tabs items={tabItems} vModel={model.value} sliderSize={2}>
                <g-tab-items items={tabItems} vModel={model.value}>
                  {_.map(tabItems, (item, index) =>
                      <g-tab-item key={index} item={item}>
                        <div style="padding: 10px; width: 100%">
                          {item.renderFn()}
                        </div>
                      </g-tab-item>
                  )}
                </g-tab-items>
              </g-tabs>
            </div>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-color-picker {
    width: 300px;
    /*box-shadow: 0 2px 6px 2px #0004;*/
    border-radius: 5px;

    &__color-field {
      position: relative;

      &__dot {
        position: absolute;
        width: 8px;
        height: 8px;
        background: transparent;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 1), inset 0 0 1px 1.5px rgba(0, 0, 0, 0.3);
        pointer-events: none;
      }
    }

    &__adjust {

      &__alpha {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat;
      }
    }

    &__controls {
      padding: 5px;
    }

    &__preview-slider-wrapper {
      display: flex;
    }

    &__preview {
      width: 30px;
      height: 30px;
      margin: 10px;
    }

    &__sliders {
      flex: 1;
    }

    &__edit {
      display: flex;

      &__input {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;

        input {
          border-radius: 4px;
          margin-bottom: 8px;
          min-width: 0;
          outline: none;
          text-align: center;
          height: 28px;

          &.hexa {
            width: 100%;
          }

          &.rgba {
            width: 20%;
          }

          &.hsla {
            width: 20%;
          }
        }
      }
    }
  }

  .__pallet-category {
    height: 24px;
    display: flex;
    margin-top: 2px;
  }

  .__pallet-color-list {
    line-height: 1;
  }

  .__pallet-name {
    vertical-align: middle;
    line-height: 24px;
    font-size: small;
    width: 100px;
    height: 100%;
    display: inline-block;
  }
</style>
