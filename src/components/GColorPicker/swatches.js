import { colors } from '../../utils/colors'
import _ from 'lodash'
import { tooltipBackgroundColor, tooltipContentStyleObj } from './commonUI';

/**
 * Create swatches model from defined colors in @/styles/_colors.scss
 * @returns {Array} a swatches model array
 *
 * For example:
 * [
 *   {
 *    name: 'red',
 *    pallet: [
 *      { name: 'red', value: '#ff0000' },
 *      { name: 'red lighten-1', value: '#...' }
 *      { name: 'red lighten-2', value: '#...' }
 *    ],
 *    shortPallet: [
 *
 *    ]
 *   },
 *   {
 *     name: 'blue',
 *     pallet: [...],
 *     shortPallet: [...]
 *   }
 * ]
 */
function createSwatchesModels() {
  const createColorModel = (name, value) => ({ name, value })
  const subColorEndedNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  // generate color pallets
  const palletCategories = []
  let palletCategory = null
  Object.keys(colors).forEach(key => {
    // if color name is not ended by number, it should be the base color
    // create new pallet category
    if (subColorEndedNumbers.indexOf(key[key.length-1]) < 0) {
      if (palletCategory != null)
        palletCategories.push(palletCategory)

      palletCategory = {
        name: key,
        pallet: [ createColorModel(key, colors[key]) ]
      }
    } else {
      palletCategory.pallet.push(createColorModel(key, colors[key]))
    }
  })

  // append the last category
  palletCategories.push(palletCategory)

  return palletCategories
}


/**
 * Get swatches render function
 * @param onColorSelected function({name, value}) => {...} a function which will be called when one select the color
 * @returns {function(): *}
 */
export default function getSwatchesRenderFn(onColorSelected) {
  const swatchesModel = createSwatchesModels()

  const getTransparentImageStyle = (pallet) => ({
    background: pallet.name === 'transparent' ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat': ''
  })

  // For some reason, styling scoped slot in CSS is not recognized by vue so
  // I wrote css for scoped slot in JS
  const palletItemStyleObj = {
    border: '1px solid #0003',
    margin: '0px',
    width: '20px',
    height: '20px',
    display: 'inline-block',
  }

  return function renderSwatches() {
    return <div> {
      _.map(swatchesModel, colorPalletModel => [
          <div class='g-color-picker__pallet__name'> {colorPalletModel.name} </div>,
          <div class='g-color-picker__pallet'> {
              _.map(colorPalletModel.pallet, pallet => {
                const scopedSlots = {
                  activator: (scope) => <span key={pallet.name} class='g-color-picker__pallet__item'
                      style={{ ...getTransparentImageStyle(pallet), ...palletItemStyleObj, backgroundColor: pallet.value }}
                      vOn:mouseleave={scope.on.mouseleave}
                      vOn:mouseenter={scope.on.mouseenter}
                      vOn:blur={scope.on.blur}
                      vOn:click={() => onColorSelected(pallet)}></span>
                }
                return (
                    <g-tool-tip
                        key={pallet.name}
                        top
                        speech-bubble
                        open-on-hover
                        scopedSlots={scopedSlots}
                        color={tooltipBackgroundColor}
                        transition='none'
                    >
                      <div style='display: flex; align-items: center;'>
                        <div style={{
                          ...tooltipContentStyleObj,
                          ...getTransparentImageStyle(pallet),
                          backgroundColor: pallet.value,
                        }}></div>
                        <div>
                          <div>{colorPalletModel.name}</div>
                          <div>{pallet.name}</div>
                        </div>
                      </div>
                    </g-tool-tip>)
                }
            )
          }
          </div>])
    }
    </div>
  }
}
