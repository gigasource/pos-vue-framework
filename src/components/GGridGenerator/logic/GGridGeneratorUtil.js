import _ from 'lodash'


export function joinRefArrayValue(refArray, separator = ' ') {
  let output = ''
  refArray.forEach(refVar => output += separator + refVar.value)
  return output
}

/**
 * Generate css grid from grid data model
 * @param models
 */
export function generateGridCSS(models) {
  let output = ''
  if (!Array.isArray(models))
    models = [models]

  _.each(models, model => {
    let css = ''
    if (model.area)
      css += `   grid-area: ${model.area.rowStart} / ${model.area.columnStart} / ${model.area.rowEnd} / ${model.area.columnEnd};`

    if (model.settings) {
      css +=
`  display: grid;
  grid-template-columns: ${joinRefArrayValue(model.settings.columns)};
  grid-template-rows: ${joinRefArrayValue(model.settings.rows)};
  grid-column-gap: ${model.settings.columnGap}px;
  grid-row-gap: ${model.settings.rowGap}px;`
    }

    output += `.${model.name} {
${css}
}
`
  })

  return output
}
