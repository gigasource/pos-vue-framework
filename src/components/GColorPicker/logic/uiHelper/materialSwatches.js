import { colors } from '../../../../utils/colors'

/**
 * Create swatches model from defined colors in @/styles/_colors.scss
 * @param onColorSelected function(colorName, colorValue) a function which will be called when one select the color
 * @returns {Array} a swatches model array
 *
 * For example:
 * [
 *   {
 *    name: 'red',
 *    pallet: [
 *      { name: 'red', value: '#ff0000', select: () => onColorSelected('red', '#ff0000') },
 *      { name: 'red lighten-1', value: '#...', select: () => onColorSelected('red lighten-1', '#...') }
 *      { name: 'red lighten-2', value: '#...', select: () => onColorSelected('red lighten-2', '#...') }
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
export default function createSwatchesModels(onColorSelected) {
  function createColorModel(name, value) {
    return { name: name, value: value, select: () => onColorSelected(name, value) }
  }

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
        shortPallet: [
          createColorModel(key, colors[key])
        ],
        pallet: [
          createColorModel(key, colors[key])
        ]
      }
    } else {
      // otherwise, add color to existed category
      if (subColorEndedNumbers.indexOf(key[key.length-1]) < 2) {
        palletCategory.shortPallet.push(createColorModel(key, colors[key]))
      }
      palletCategory.pallet.push(createColorModel(key, colors[key]))
    }
  })

  // append the last category
  palletCategories.push(palletCategory)

  return palletCategories
}
