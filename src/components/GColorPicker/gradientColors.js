import { gradientColors } from '../../utils/colors'
import _ from 'lodash'

// Create gradient model, add helper method
function createGradientModel(name, angle, colorStop1, colorStop2) {
  return { name, angle, colorStop1, colorStop2 }
}

/**
 * Create gradient items from defined gradientColors in @/styles/_colors.scss
 * @returns {Array} a gradient color array
 *
 * For example:
 * [
 *   {
 *    name: 'red',
 *    angle: '45deg'
 *    colorStop1: '#000',
 *    colorStop2: '#FFF',
 *   },
 *   ...
 * ]
 */
function createGradientModels() {
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

/**
 * Get gradient render function
 * @param onGradientSelected ({name:, angle, colorStop1, colorStop2 }) => {...} a handler function which will be called when user click to a gradient item
 * This gradient will be pass as 1st parameters of handler function
 * @returns {function(): VNode} gradient render function
 */
export default function getGradientRenderFn(onGradientSelected) {
  const gradientModels = createGradientModels()
  return function renderGradientColors() {
    return (
        <div> {
          _.map(gradientModels, gradient => {
            return <span class='g-color-picker__gradient__item'
                style={{
                  background: `linear-gradient(${gradient.angle}, ${gradient.colorStop1}, ${gradient.colorStop2})`
                }}
                vOn:mouseleave={() => {}}
                vOn:mouseenter={() => {}}
                vOn:click={() => onGradientSelected(gradient)}></span>
          })
        }
        </div>
    )
  }
}


