import { fromHex, fromRGBA } from '../GColorPickerUtil';
import { clamp } from 'lodash';
import { enterPressed } from '../../../utils/keyboardHelper';

export default function getRenderColorEditorFn(state, updateColor) {
  function updateHex(e){
    if (enterPressed(e))
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
    if (enterPressed(e))
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
                 vOn:keyup={updateHex}/>
          <small>HEX</small>
        </span>
    )
  }

  function getRGBAElementMaxLength(element) {
    // maximum rgb: 0 -> 255 => length 3
    // consider alpha minimum unit: 1% or 0.01 -> max length 4 (3 digit and . char)
    return element === 'a' ? 4 : 3
  }
  function getRGBAElementMaxValue(element) {
    return element === 'a' ? 1 : 255
  }
  function renderRGBEditor() {
    return ['r', 'g', 'b', 'a'].map(element => <span class='g-color-picker__editor__input-wrapper g-color-picker__editor__input-wrapper__rgba'>
          <input type='text' value={ `${state.color.rgba[element]}`.substr(0, getRGBAElementMaxLength(element))}
                 class='g-color-picker__editor__input'
                 min={0}
                 max={ getRGBAElementMaxValue(element) }
                 maxLength={ getRGBAElementMaxLength(element) }
                 vOn:keyup={e => updateRGBA(e, element)}/>
          <small>{element.toUpperCase()}</small>
        </span>)
  }

  return function () {
    return <div class='g-color-picker__editor'>
      {[renderHexEditorInput(), renderRGBEditor()]}
    </div>
  }
}
