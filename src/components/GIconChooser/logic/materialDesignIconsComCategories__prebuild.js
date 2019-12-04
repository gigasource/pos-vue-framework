/////
// NOTICE: Run this file when model in './materialdesignicons_com changed
// Read ./materialdesignicons_com/README.text to known how to get category model

import _ from 'lodash'
import { saveFile } from '../../../utils/helpers';
// get all json file
const jsonFiles = require.context('./materialdesignicons_com/', false, /^.*?.json$/).keys()

function getJsonFileName(file) {
  // ./abc-xyz.json -> abc-xyz

  // 2 = ./ length
  // 7 = 2 + 5  = './' length + '.json' length
  return file.substr(2, file.length - 7)
}

function getJsonFileWithExtension(file) {
  return file.substr(2)
}

function getIcons(file) {
  const categoryModel = require('./materialdesignicons_com/' + getJsonFileWithExtension(file))
  return _.map(categoryModel.icons, icon => icon.name)
}

function getCategory(file) {
  return {
    name: getJsonFileName(file),
    icons: getIcons(file)
  }
}

const categories = _.map(jsonFiles, getCategory)

const content = `
// auto generated by materialDesignIconsComCategories__prebuild
// https://materialdesignicons.com/

export default [${
    _.map(categories, cate =>
`{ 
    name: '${cate.name}',
    icons: '${cate.icons}'.split(',')
  }`).join(`, `)}
]`;

saveFile('mdiCategories.js', content)
