//// import/export layout as json
// add parent for layout
import { isRef, ref } from '@vue/composition-api';

/**
 * Add parent layout for each node in layout tree
 * @param layout current layout node
 * @param parentLayout
 * @private
 */
function _attachParentLayout(layout, parentLayout) {
  if (parentLayout)
    layout.parent = parentLayout
  _.each(layout.subAreas, subArea => _attachParentLayout(subArea, layout))
}

/**
 * Parse plain object to layout object
 * @param jsonObject
 * @param parent
 * @returns {*}
 */
export function parseLayoutObject(jsonObject, parent) {
  // wrap ref
  _.each(Object.keys(jsonObject), key => {
    if (key === 'rows' || key === 'columns') {
      // if rows item, column item is not ref then it's json object
      // not layoutObject
      // => convert to ref
      if (!isRef(jsonObject[key][0])) {
        jsonObject[key] = _.map(jsonObject[key], item => ref(item))
      }
    }
  })
  _.each(jsonObject.subAreas, subArea => parseLayoutObject(subArea, jsonObject))

  // attach parent
  if (parent && !jsonObject.parent) jsonObject.parent = parent
  return jsonObject
}

/**
 * Create Layout object from json string
 * @param jsonLayout
 * @returns {any}
 */
export function parseLayoutStr(jsonLayout) {
  const jsonParseReviver = (k, v) => {
    // wrap ref
    if (k === 'rows' || k === 'columns') {
      return _.map(v, vItem => ref(vItem))
    }
    else
      return v
  }
  const layout = JSON.parse(jsonLayout, jsonParseReviver)
  _attachParentLayout(layout, null)
  return layout
}

/**
 * Create JSON from layout object
 * @param layout
 * @returns {string}
 */
export function createLayoutStr(layout) {
  return JSON.stringify(layout, (k, v) => {
    // ignore circular references
    if (k === 'parent')
      return

    // unwrap ref
    if (k === 'rows' || k === 'columns')
      return _.map(v, vItem => vItem.value)

    // normal data, return directly
    return v
  })
}
