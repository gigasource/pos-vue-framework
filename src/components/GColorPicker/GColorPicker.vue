<template>

</template>
<script>
  import { watch, onMounted, reactive, computed } from '@vue/composition-api'
  import { fromHexa, fromHSLA, fromHSVA, fromRGBA } from './logic/GColorPickerUtil'
  import { clamp } from 'lodash/number';
  import { RGBAtoCSS, RGBtoCSS } from '../../utils/colors';
  import GSlider from '../GInput/GSlider';

  // https://en.wikipedia.org/wiki/HSL_and_HSV
  // http://learn.leighcotnoir.com/artspeak/elements-color/hue-value-saturation/
  // https://psychology.wikia.org/wiki/HSL_and_HSV
  // https://www.w3schools.com/colors/colors_hsl.asp
  // Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240 is blue.
  // Saturation is a percentage value; 0% means a shade of gray and 100% is the full color.
  // Lightness is also a percentage; 0% is black, 100% is white.
  function updateCanvas(canvas, hue) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    saturationGradient.addColorStop(0, 'hsl(0, 0%, 100%)') // white
    saturationGradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`)
    ctx.fillStyle = saturationGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    valueGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0') // transparent
    valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)') // black
    ctx.fillStyle = valueGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  export default {
    name: 'GColorPicker',
    components: { GSlider },
    props: {
      showCanvas: Boolean,
      showEdit: Boolean,
      showSwatches: Boolean,
      disabled: Boolean,

      //
      width: {
        type: [String, Number],
        default: 300
      }
    },
    setup(props, context) {
      // default RED
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

      function updateColor(color) {
        state.color = color
        // we only emit input with rgba value
        context.emit('input', state.color.rgba)
        // but emit entire color object into custom event update:color
        context.emit('update:color', state.color)
      }

      function emitColor(x, y) {
        console.log('emitColor')
        const { width, height, left, top } = context.refs.canvas.getBoundingClientRect()
        updateColor(fromHSVA({
          h: state.hue,
          s: clamp(x - left, 0, width) / width,
          v: 1 - clamp(y - top, 0, height) / height,
          a: state.alpha,
        }))
      }

      // color-field
      // color-field__canvas
      onMounted(() => {
        console.log('mounted')
        // update canvas size
        const { width, height } = context.refs.canvas.getBoundingClientRect()
        state.canvasSize = { width, height }

        //
        watch(() => state.hue, () => updateCanvas(context.refs.canvas, state.hue))
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
      function renderColorCanvasFn() {
        return props.showCanvas ? (
            <canvas
                ref="canvas"
                height="150"
                width={props.width}
                vOn:click={handleCanvasClick}
                vOn:mousedown={handleCanvasMouseDown}>
            </canvas>
        ) : undefined
      }
      // color-field__dot
      const cptDotPos = computed(() => {
        if (!state.color) {
          return { x: 0, y: 0 }
        }
        return {
          x: state.color.hsva.s * parseInt(state.canvasSize.width),
          y: (1 - state.color.hsva.v) * parseInt(state.canvasSize.height)
        }
      })
      function renderDotFn() {
        return props.showCanvas ? (
            <div class='g-color-picker__color-field__dot'
                 style={{ left: `${cptDotPos.value.x}px`, top: `${cptDotPos.value.y}px` }}>
            </div>
        ) : undefined
      }

      // preview
      function renderPreviewColorField() {
        return <div class='g-color-picker__preview' style={{ backgroundColor: RGBAtoCSS(state.color.rgba) }}></div>
      }

      // sliders
      // sliders__hue
      function renderHueSlider() {
        return (
            <div class='g-color-picker__slider__hue'>
              <g-slider
                  thumbColor='grey lighten-2'
                  style={{
                    background: `linear-gradient(to right, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%, #00F 66.66%, #F0F 83.33%, #F00 100%)`,
                    padding: '5px'
                  }}
                  value={state.color ? state.color.hue : 0} step='0'
                  min='0' max='360'
                  vOn:input={val => state.color.hue !== val && updateColor(fromHSVA({ ...state.color.hsva, h: val }))}
              ></g-slider>
            </div>
        )
      }
      // sliders__alpha
      function renderAlphaSlider() {
        return <div className='g-color-picker__slider__alpha'>
          <g-slider
              thumbColor='grey lighten-2'
              value={state.color ? state.color.alpha : 0} step='0'
              min='0' max='1'
              style={{
                background: `linear-gradient(to right, transparent, ${RGBtoCSS(state.color.rgba)})`
              }}
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
      function getValue(v, type) {
        if (type === 'float') return Math.round(v * 100) / 100
        else if (type === 'int') return Math.round(v)
        else return 0
      }
      function parseValue(v, type) {
        if (type === 'float') return parseFloat(v)
        else if (type === 'int') return parseInt(v, 10) || 0
        else return 0
      }
      function changeMode() {
        const modeNames = Object.keys(editModes)
        const index = editModes.indexOf(editorState.currentMode)
        editorState.currentMode = editModes[modeNames[(index + 1) % modeNames.length]]
      }
      // hexa
      function renderHexaEditorInput() {
        return (
            <div class='g-color-picker__edit__input'>
              <input type='text' key='hex' maxLength="9" disabled={props.disabled} value={state.color.hexa}/>
            </div>
        )
      }
      // rgba, hsla
      function renderNonHexaEditorInput() {
        return (<div>NonHexa</div>)
      }
      function renderEditorInput() {
        return editorState.currentMode === editModes.hexa ? renderHexaEditorInput() : renderNonHexaEditorInput()
      }
      function renderEditorModeSwitch() {
        return (
            <button type="button" vOn:click={changeMode}>switch</button>
        )
      }
      function renderColorEditorIfNeeded() {
        if (!props.showEdit) {
          return
        }
        return (
            <div class='g-color-picker__edit'>
              {renderEditorInput()}
              {renderEditorModeSwitch()}
            </div>
        )
      }

      // swatches
      function renderSwatchesIfNeeded() {
        if (!props.showSwatches) {
          return
        }
        return (
            <div> swatches </div>
        )
      }

      // g-color-picker
      return function renderColorPickerFn() {
        return (
            <div class='g-color-picker'>
              <div class='g-color-picker__color-field'>
                {renderColorCanvasFn()}
                {renderDotFn()}
              </div>
              <div class='g-color-picker__controls'>
                <div class='g-color-picker__preview-slider-wrapper'>
                  {renderPreviewColorField()}
                  <div class='g-color-picker__sliders'>
                    {renderHueSlider()}
                    {renderAlphaSlider()}
                  </div>
                </div>
                {renderColorEditorIfNeeded()}
                {renderSwatchesIfNeeded()}
              </div>
            </div>)
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
  }
</style>
