<script>
  import { watch, onMounted, reactive, computed } from '@vue/composition-api'
  import { fromHexa, fromHSLA, fromHSVA, fromRGBA } from './logic/GColorPickerUtil'
  import { clamp } from 'lodash/number'
  import { RGBAtoCSS, RGBtoCSS } from '../../utils/colors'
  import { updateCanvas } from './logic/uiHelper/GColorPickerUIHelper'
  import swatches from './logic/uiHelper/materialSwatches'
  import GSlider from '../GInput/GSlider'
  import GToolTip from '../GToolTip/GToolTip';
  import _ from 'lodash'

  export default {
    name: 'GColorPicker',
    components: { GToolTip, GSlider },
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
      const state = reactive({
        color: {
          rgba: { r: 255, g: 0, b: 0, a: 1 },
          hsva: { h: 0, s: 100, v: 100, a: 1 },
          hexa: '#FF0000FF'
        },
        hue: 0,
        alpha: 1,
        canvasSize: { width: 0, height: 0 }
      })

      //
      function updateColor(color) {
        state.color = color
        // we only emit input with rgba value
        context.emit('input', state.color.rgba)
        // but emit entire color object into custom event update:color
        context.emit('update:color', state.color)
      }
      function emitColor(x, y) {
        const { width, height, left, top } = context.refs[canvasRef].getBoundingClientRect()
        updateColor(fromHSVA({
          h: state.hue,
          s: clamp(x - left, 0, width) / width,
          v: 1 - clamp(y - top, 0, height) / height,
          a: state.alpha,
        }))
      }

      // canvas
      onMounted(() => {
        if (context.refs[canvasRef]) {
          const { width, height } = context.refs[canvasRef].getBoundingClientRect()
          state.canvasSize = { width, height }
          watch(() => state.hue, () => updateCanvas(context.refs[canvasRef], state.hue))
        }
      })
      function handleCanvasClick(e) {
        e.stopPropagation()
        e.preventDefault()
        if (props.disabled) {
          return
        }
        emitColor(e.clientX, e.clientY)
      }
      function handleCanvasMouseDown(e) {
        e.stopPropagation()
        e.preventDefault()
        if (props.disabled) {
          return
        }
        window.addEventListener('mousemove', _handleCanvasMouseMove)
        window.addEventListener('mouseup', _handleCanvasMouseUp)
      }
      function _handleCanvasMouseMove(e) {
        emitColor(e.clientX, e.clientY)
      }
      function _handleCanvasMouseUp() {
        window.removeEventListener('mousemove', _handleCanvasMouseMove)
        window.removeEventListener('mouseup', _handleCanvasMouseUp)
      }
      const dotPos = computed(() => {
        if (!state.color) {
          return { x: 0, y: 0 }
        }
        return {
          x: state.color.hsva.s * parseInt(state.canvasSize.width),
          y: (1 - state.color.hsva.v) * parseInt(state.canvasSize.height)
        }
      })
      function renderColorCanvas() {
        return (
            <canvas
                ref={canvasRef}
                width={props.width}
                height={150}
                vOn:click={handleCanvasClick}
                vOn:mousedown={handleCanvasMouseDown}>
            </canvas>
        )
      }
      function renderDotFn() {
        return (
            <div
                class='g-color-picker__color-field__dot'
                style={{ left: `${dotPos.value.x}px`, top: `${dotPos.value.y}px` }}>
            </div>
        )
      }

      // preview
      function renderPreviewColorField() {
        return <div class='g-color-picker__preview' style={{ borderRadius: '100%', backgroundColor: RGBAtoCSS(state.color.rgba) }}></div>
      }

      // adjust
      const hueSliderStyleObj = {
        background: `linear-gradient(to right, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%, #00F 66.66%, #F0F 83.33%, #F00 100%)`,
        padding: '5px'
      }
      const alphaSliderStyleObj = {
        backgroundColor: `linear-gradient(to right, transparent, ${RGBtoCSS(state.color.rgba)})`
      }
      function renderHueAdjustSlider() {
        return (
            <div class='g-color-picker__slider__hue'>
              <g-slider
                  thumbColor='grey lighten-2'
                  style={hueSliderStyleObj}
                  value={state.color ? state.color.hue : 0}
                  step={1} min={0} max={360}
                  vOn:input={val => state.color.hue !== val && updateColor(fromHSVA({ ...state.color.hsva, h: val }))}
              ></g-slider>
            </div>
        )
      }
      function renderAlphaAdjustSlider() {
        return <div className='g-color-picker__slider__alpha'>
          <g-slider
              thumbColor='grey lighten-2'
              style={alphaSliderStyleObj}
              value={state.color ? state.color.alpha : 0}
              step={0.01} min={0} max={1}
              vOn:input={val => state.color.alpha !== val && updateColor(fromHSVA(...state.color.hsva, val))}
          ></g-slider>
        </div>
      }

      // edit
      const editModes = {
        rgba: {
          inputs: [
            ['r', 255, 'int'],
            ['g', 255, 'int'],
            ['b', 255, 'int'],
            ['a', 1, 'float'],
          ],
          from: fromRGBA,
        },
        hsla: {
          inputs: [
            ['h', 360, 'int'],
            ['s', 1, 'float'],
            ['l', 1, 'float'],
            ['a', 1, 'float'],
          ],
          from: fromHSLA,
        },
        hexa: {
          from: fromHexa
        }
      }
      const editorState = reactive({
        currentMode: editModes.hexa
      })
      function changeMode() {
        const modeNames = Object.keys(editModes)
        const index = modeNames.indexOf(editorState.currentMode)
        editorState.currentMode = editModes[modeNames[(index + 1) % modeNames.length]]
      }
      function getValue(v, type) {
        if (type === 'float') {
          return Math.round(v * 100) / 100
        } else if (type === 'int') {
          return Math.round(v)
        } else {
          return 0
        }
      }
      function parseValue(v, type) {
        if (type === 'float') {
          return parseFloat(v)
        } else if (type === 'int') {
          return parseInt(v, 10) || 0
        } else {
          return 0
        }
      }
      function renderHexaEditorInput() {
        return (
            <div class='g-color-picker__edit__input'
                 vShow={editorState.currentMode === editModes.hexa}>
              <input type='text'
                     key='hex'
                     maxLength="9"
                     disabled={props.disabled}
                     value={state.color.hexa}/>
            </div>
        )
      }
      function renderNonHexaEditorInput() {
        return (
            <div vShow={editorState.currentMode !== editModes.hexa}>
              Non-Hexa
            </div>)
      }
      function renderEditorModeSwitch() {
        return (
            <button type="button" vOn:click={changeMode}>switch</button>
        )
      }

      // swatches
      const onColorSelected = (name, colorValue) => {
        console.log('color selected', name, ':', colorValue)
      }
      const swatchesModel = swatches(onColorSelected)
      const tooltipStyleObj = {
        boxShadow: '0 2px 8px 4px #0003',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        marginTop: '10px',
        marginBottom: '10px',
        borderRadius: '100%',
        width: '50px',
        height: '50px'
      }
      function renderSwatches() {
        return <div class="__swatches">
          {
            _.map(swatchesModel, colorPalletModel => {
              return (
                  <div class="__pallet-category">
                    <span class='__pallet-name'>{colorPalletModel.name}</span>
                    {
                      _.map(colorPalletModel.shortPallet, pallet => {
                            const styleObj = {
                              borderRadius: '100%',
                              border: '1px solid #0003',
                              margin: '0px',
                              width: '20px',
                              height: '20px',
                              display: 'inline-block',
                              backgroundColor: pallet.value
                            }
                            const scopedSlots = {
                              activator: (scope) => {
                                return (
                                    <span style={styleObj}
                                          vOn:mouseleave={scope.on.mouseleave}
                                          vOn:mouseenter={scope.on.mouseenter}
                                          vOn:blur={scope.on.blur}
                                          vOn:click={() => console.log(pallet.value)}
                                    ></span>)
                              }
                            }
                            return (
                                <g-tool-tip top speech-bubble open-on-hover scopedSlots={scopedSlots} color="#333">
                                  <div style={'text-align: center;'}>
                                    <div style={{ ...tooltipStyleObj, backgroundColor: pallet.value }}></div>
                                    {pallet.name}
                                  </div>
                                </g-tool-tip>)
                          }
                      )
                    }
                  </div>)
            })
          }
        </div>
      }


      function renderSwatches2() {
        return <div class="__swatches">
          {
            _.map(swatchesModel, colorPalletModel => {
              return (
                  <div class="__pallet-category">
                    {
                      _.map(colorPalletModel.pallet, pallet => {
                            const styleObj = {
                              border: '1px solid #0003',
                              margin: '0px',
                              width: '20px',
                              height: '20px',
                              display: 'inline-block',
                              backgroundColor: pallet.value
                            }
                            const scopedSlots = {
                              activator: (scope) => {
                                return (
                                    <span style={styleObj}
                                          vOn:mouseleave={scope.on.mouseleave}
                                          vOn:mouseenter={scope.on.mouseenter}
                                          vOn:blur={scope.on.blur}
                                          vOn:click={() => console.log(pallet.value)}
                                    ></span>)
                              }
                            }
                            return (
                                <g-tool-tip top speech-bubble open-on-hover scopedSlots={scopedSlots} color="#aaa">
                                  <div style={'text-align: center;'}>
                                    <div style={{ ...tooltipStyleObj, backgroundColor: pallet.value }}></div>
                                    <div>{colorPalletModel.name}</div>
                                    <div>{pallet.name}</div>
                                  </div>
                                </g-tool-tip>)
                          }
                      )
                    }
                  </div>)
            })
          }
        </div>
      }
      // color picker
      return function renderColorPicker() {
        return (
            <div class='g-color-picker'>
              <div class='g-color-picker__color-field'>
                {renderColorCanvas()}
                {renderDotFn()}
              </div>
              <div class='g-color-picker__controls'>
                <div class='g-color-picker__preview-slider-wrapper'>
                  {renderPreviewColorField()}
                  <div class='g-color-picker__sliders'>
                    {renderHueAdjustSlider()}
                    {renderAlphaAdjustSlider()}
                  </div>
                </div>
                <div className='g-color-picker__edit'>
                  {renderHexaEditorInput()}
                  {renderNonHexaEditorInput()}
                  {renderEditorModeSwitch()}
                </div>
                {renderSwatches2()}
              </div>
            </div>)

        // return (<div class='g-color-picker'>{renderSwatches2()}</div>)
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-color-picker {
    width: 300px;
    box-shadow: 0 2px 6px 2px #0004;
    border-radius: 5px;
    overflow: hidden;

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
      }
    }

    &__controls {
      padding: 5px;
    }

    &__preview-slider-wrapper {
      display: flex;
    }

    &__preview {
      position: relative;
      height: 30px;
      margin: 10px;
      width: 30px;
      overflow: hidden;
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
          width: 100%;
          height: 28px;
        }
      }
    }


    &__swatches {

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
