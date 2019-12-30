import _ from 'lodash'

export function parseSelectorData (selectorData) {
  let temp = '{'
  _.forEach(selectorData, (val, key) => {
    val && (temp += `${_.kebabCase(key)}: ${val} !important;` + '\r\n')
  })
  temp += '}'
  return temp
}

export function parseCssData (cssData) {
  return _.reduce(cssData, (acc, val, key) => {
    const selectorStyleString = parseSelectorData(val)
    if (selectorStyleString !== '{}') return `${acc} ${key} ${parseSelectorData(val)} \r\n`
    else return acc
  }, '')
}

export function isEmptySelector (selectorData) {
  for (let key in selectorData) {
    if (selectorData[key] !== '' && selectorData[key] !== undefined) return false
  }
  return true
}

