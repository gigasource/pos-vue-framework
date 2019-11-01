import { fromHex, fromRGBA } from '../GColorPickerUtil';
import { clamp } from 'lodash';

export default function getRenderColorEditorFn(state, updateColor) {
  const keyCode_Enter = 13
  function updateHex(e){
    if (e.keyCode === keyCode_Enter)
      updateColor(fromHex(e.target.value))
  }

  function getElementValue(value, element) {
    if (element === 'a') {
      return clamp(parseFloat(value), 0, 1)
    } else {
      return clamp(parseInt(value), 0, 255)
    }
  }

  function updateRGBA(e, element) {
    if (e.keyCode === keyCode_Enter)
      updateColor(fromRGBA({
        ...state.color.rgba,
        [element]: getElementValue(e.target.value || 0, element)
      }))
  }

  function renderHexEditorInput() {
    return (
        <span class='g-color-picker__editor__input-wrapper g-color-picker__editor__input-wrapper__hex'>
          <input type='text' maxLength={7}
                 class='g-color-picker__editor__input'
                 value={state.color.hex}
                 vOn:keypress={updateHex}/>
          <small>HEX</small>
        </span>
    )
  }

  function renderRGBEditor() {

    return ['r', 'g', 'b', 'a'].map(element => <span class='g-color-picker__editor__input-wrapper g-color-picker__editor__input-wrapper__rgba'>
          <input type='text' value={state.color.rgba[element]}
                 class='g-color-picker__editor__input'
                 min={0} max={ element === 'a' ? 1: 255} maxLength={ element === 'a' ? 4 /*limit 4 => minimum opacity 0.01*/ : 3}
                 vOn:keypress={e => updateRGBA(e, element)}/>
          <small>{element.toUpperCase()}</small>
        </span>)
  }

  return function () {
    return <div class='g-color-picker__editor'>
      {[renderHexEditorInput(), renderRGBEditor()]}
    </div>
  }
}
