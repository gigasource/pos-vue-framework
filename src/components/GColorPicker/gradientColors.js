import _ from 'lodash'
import { gradientColors } from '../../utils/colors'
import { tooltipBackgroundColor, tooltipContentStyleObj } from './commonUI'

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

    if (propName !== colorStop1 && propName !== colorStop2 && propName !== angle) {
      console.warn(`Invalid gradient property name '${propName}'`)
    }

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
        output.push(createGradientModel(tempObj.name, tempObj[angle], tempObj[colorStop1], tempObj[colorStop2]))
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

function createLinearGradientBackground(gradient) {
  return {
    background: `linear-gradient(${gradient.angle}, ${gradient.colorStop1}, ${gradient.colorStop2})`
  }
}

/**
 * Get gradient render function
 * @param onGradientSelected ({name:, angle, colorStop1, colorStop2 }) => {...} a handler function which will be called when user click to a gradient item
 * This gradient will be pass as 1st parameters of handler function
 * @returns {function(): VNode} gradient render function
 */
export default function getGradientRenderFn(onGradientSelected) {
  const gradientModels = createGradientModels()

  const gradientItemStyleObj = {
    display: 'inline-block',
    width: '75px',
    height: '35px',
    margin: '10px',
    border: '1px solid #0003',
    borderRadius: '35px',
  }

  return function renderGradientColors() {
    return (
        <div> {
          _.map(gradientModels, gradient => {
            const scopedSlot = {
              activator: (scope) => <span
                  key={gradient.name}
                  style={{ ...gradientItemStyleObj, ...createLinearGradientBackground(gradient) }}
                  vOn:mouseleave={scope.on.mouseleave}
                  vOn:mouseenter={scope.on.mouseenter}
                  vOn:blur={scope.on.blur}
                  vOn:click={() => onGradientSelected(gradient)}></span>
            }

            return <g-tool-tip
                key={gradient.name}
                top
                speech-bubble
                open-on-hover
                color={tooltipBackgroundColor}
                transition='none'
                scopedSlots={scopedSlot}
                lazy>
              <div style={'display: flex; align-items: center'}>
                <div>
                  <div style={{ ...tooltipContentStyleObj, ...createLinearGradientBackground(gradient) }}></div>
                </div>
                <div>
                  {`Name: ${gradient.name}`}<br/>
                  {`Angle: ${gradient.angle}`}<br/>
                  {`Start Color: ${gradient.colorStop1}`}<br/>
                  {`End Color: ${gradient.colorStop2}`}<br/>
                </div>
              </div>
            </g-tool-tip>
          })
        }
        </div>
    )
  }
}


