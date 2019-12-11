import { onMounted, reactive, watch, computed } from '@vue/composition-api';
import { fromHSVA } from '../GColorPickerUtil';
import { clamp } from 'lodash/number';
import { tabIndexes } from '../commonUI';

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

export function getRenderCanvasFn(props, context, state, tabState, updateColor) {
  const canvasRef = 'canvas'
  const cptCanvasSize = computed(() => ({
    width: props.width || 300,
    height: 150
  }))

  const cptDotStyle = computed(() => ({
    left: `${state.color.hsva.s * parseInt(cptCanvasSize.value.width)}px`,
    top: `${(1 - state.color.hsva.v) * parseInt(cptCanvasSize.value.height)}px`
  }))

  watch(() => tabState.selectedTab, () => {
    if (tabState.selectedTab === tabIndexes.colorPicker) {
      updateCanvas(context.refs[canvasRef], state.color.hue)
    }
  })

  watch(() => state.color.hue, () => {
    updateCanvas(context.refs[canvasRef], state.color.hue)
  }, { lazy: true })

  function emitColor(x, y) {
    const { width, height, left, top } = context.refs[canvasRef].getBoundingClientRect()
    updateColor(fromHSVA({
      h: state.color.hue,
      s: clamp(x - left, 0, width) / width,
      v: 1 - clamp(y - top, 0, height) / height,
      a: state.color.alpha,
    }))
  }

  let mouseDown
  function handleCanvasMouseDown() {
    if (!props.disabled) mouseDown = true
  }

  function handleCanvasMouseMove(e) {
    if (mouseDown) emitColor(e.clientX, e.clientY)
  }

  function handleCanvasMouseUp() {
    mouseDown = false
  }

  function handleMouseLeave() {
    mouseDown = false
  }

  return function() {
    return <div class='g-color-picker__color-field'>
      <canvas
          class='g-color-picker__color-field__ground'
          ref={canvasRef}
          width={cptCanvasSize.width}
          height={cptCanvasSize.height}
          vOn:mousedown={handleCanvasMouseDown}
          vOn:mousemove={handleCanvasMouseMove}
          vOn:mouseup={handleCanvasMouseUp}
          vOn:mouseleave={handleMouseLeave}>
      </canvas>
      <div class='g-color-picker__color-field__dot' style={cptDotStyle.value}></div>
    </div>
  }
}
