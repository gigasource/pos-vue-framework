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
    const selectorStyleString = parseSelectorData(val.data)
    if (selectorStyleString !== '{}') return `${acc} ${key} ${selectorStyleString} \r\n`
    else return acc
  }, '')
}

export function isEmptySelector (selectorData) {
  for (let key in selectorData) {
    if (selectorData[key] !== '' && selectorData[key] !== undefined) return false
  }
  return true
}

export function genSelectorDisplayData (selectorData) {
  return _.compact(_.map(selectorData, (val, key) => {
    let temp = ''
    if (val) temp = val.replace(/\(|\)|,/g, match => ` ${match} `)
    temp = _.filter(temp.split(' '), val => val)
    if (val !== undefined && val !== '') return {
      property: _.kebabCase(key),
      value: _.map(temp, (val, index, arr) => {
        let type
        if (val) {
          if (val.search(/\d+/) > -1) type = 'number'
          else if (arr[index + 1] === '(') type = 'function'
          else if (val === '(' || val === ')' || val === ',') type = 'delimiter'
          else type = 'string'
          return {
            type: type,
            string: val
          }
        }
      })
    }
  }))
}
