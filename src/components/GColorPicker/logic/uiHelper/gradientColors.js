import { gradientColors } from '../../../../utils/colors'

// Create gradient model, add helper method
function createGradientModel(name, angle, colorStop1, colorStop2) {
  return { name, angle, colorStop1, colorStop2 }
}

/**
 * Create gradient items from defined gradientColors in @/styles/_colors.scss
 * @param onGradientColorSelected function(name, startColor, endColor, direction) a function which will be called when one select the color
 * @returns {Array} a gradient color array
 *
 * For example:
 * [
 *   {
 *    name: 'red',
 *    startColor: '#000',
 *    endColor: '#FFF',
 *    direction: '45deg'
 *   },
 *   ...
 * ]
 */
export default function createGradientModels() {
  // WARNING: Declared constants below is a defined name in _colors.scss
  // Don't change it
  const angle = 'direction'
  const colorStop1 = 'start-color'
  const colorStop2 = 'end-color'

  // extract, validate gradient information
  function extractGradientInfo(gradientKey) {
    const [name, propName] = gradientKey.split('--')

    if (propName !== colorStop1 && propName !== colorStop2 && propName !== angle)
      console.warn(`Invalid gradient property name '${propName}'`)

    return { name, propName }
  }

  const output = []
  let currentGradientName = null
  let tempObj = null

  // key = #{gradientName}--#{gradientProp} (see more detail at _colors.scss)
  Object.keys(gradientColors).forEach(key => {
    const { name, propName } = extractGradientInfo(key)
    if (currentGradientName !== name) {
      currentGradientName = name

      if (tempObj != null) {
        output.push(createGradientModel(tempObj.name, tempObj[angle], tempObj[colorStop1], tempObj[colorStop2]) )
      }

      tempObj = { name, [propName]: gradientColors[key] }
    } else {
      tempObj[propName] = gradientColors[key]
    }
  })

  // append the last gradients
  output.push(createGradientModel(tempObj.name, tempObj[angle], tempObj[colorStop1], tempObj[colorStop2]))
  return output
}
