import _ from 'lodash';
import { ref } from '@vue/composition-api';
import GridModel from './GridModel';
import AreaModel from './AreaModel';

//
export function fromJson(inputModel) {
  if (inputModel == null) {
    // empty grid model
    return new GridModel({parent: null})
  } else {
    if (typeof(inputModel) === 'string')
      inputModel = JSON.parse(inputModel)
    return _parseGridModel(inputModel, null)
  }
}
export function toJsonStr(gridModel) {
  return JSON.stringify(gridModel, (k, v) => {
    // skip private field
    if (k.startsWith('_'))
      return
    // unwrap ref
    if (k === 'rows' || k === 'columns')
      return _.map(v, vItem => vItem.value)
    // normal data, return directly
    return v
  })
}

//
function _copyAreaInfo(areaModel, inputModel) {
  _.each(Object.keys(inputModel), key => {
    switch (key) {
      case 'name':
      case 'alignSelf':
      case 'justifySelf':
      case 'padding':
      case 'margin':
      case 'top':
      case 'left':
      case 'width':
      case 'height':
      case 'bgColor':
        areaModel[key] = inputModel[key]
        break
        // compatibility old version
      case 'align-self':
        areaModel.alignSelf = inputModel[key]
        break
      case 'justify-self':
        areaModel.justifySelf = inputModel[key]
        break
      case 'area':
        areaModel.top = inputModel[key]['rowStart']
        areaModel.left = inputModel[key]['columnStart']
        areaModel.width =  inputModel[key]['columnEnd'] - inputModel[key]['columnStart']
        areaModel.height = inputModel[key]['rowEnd'] - inputModel[key]['rowStart']
        break
    }
  })
}
function _copyGridInfo(gridModel, inputModel) {
  _.each(Object.keys(inputModel), key => {
    switch (key) {
      case 'columns':
      case 'rows':
        gridModel[key] = _.map(inputModel[key], item => ref(item))
        break;
      case 'columnGap':
      case 'rowGap':
      case 'alignItems':
      case 'alignContent':
      case 'justifyItems':
      case 'justifyContent':
        gridModel[key] = inputModel[key]
        break;
      case 'subAreas':
        gridModel.subAreas = _.map(inputModel[key], item => item.subAreas ? _parseGridModel(item, gridModel) : _parseAreaModel(item, gridModel))
        break;
        // compatibility
      case 'align-items':
        gridModel.alignItems = inputModel[key]
        break
      case 'align-content':
        gridModel.alignContent = inputModel[key]
        break
      case 'justify-items':
        gridModel.justifyItems = inputModel[key]
        break
      case 'justify-content':
        gridModel.justifyContent = inputModel[key]
        break
    }
  })
}
function _parseAreaModel(inputModel, parent) {
  const areaModel = new AreaModel({parent})
  _copyAreaInfo(areaModel, inputModel)
  return areaModel
}
function _parseGridModel(inputModel, parent) {
  const gridModel = new GridModel({parent})
  _copyAreaInfo(gridModel, inputModel)
  _copyGridInfo(gridModel, inputModel)
  return gridModel
}
