import _ from 'lodash'
// font awesome
// icons will be added to window.___FONT_AWESOME___ when import js file from fontawesome
// DON'T DELETE THIS IMPORT LINE
import * as fa from '@fortawesome/fontawesome-free/js/all'
import FontAwesomeCategories from './FontAwesomeFreeCategories'

// mdi
import * as mdi from '@mdi/js/mdi'
import mdiCategories from './mdiCategories'

// mddx
import MDDXCategories from './MDDXFontCategories'
import * as materialDesignIcons from '../styles/materialDesignIconExport.scss'

function _ignoreNullIcon(v) {return v != null}

/**
 * iconSources: [
 *   {
 *     name: 'Font Awesome 5 Brands',
 *     source: 'https://fontawesome.com/',
 *     totalIcons: 100,
 *     categories: [
 *       {
 *         name: 'brands',
 *         icons: [
 *           { name: 'accusoft', value: 'fab fa-accusoft' }
 *         ]
 *       }
 *     ]
 *   }, ...
 * ]
 */
function _getFontAweSomeIconSource() {
  function _getFontAwesomeCategories(iconSrc, type) {
    return _.map(FontAwesomeCategories, category => ({
      name: category.name,
      icons: _.filter(_.map(category.icons, ico => _.has(iconSrc, ico) ? {
        name: ico,
        value: `${type} fa-${ico}`
      }: null ), _ignoreNullIcon)
    }))
  }
  function _getFontAwesomeIcons(iconSrc, type /*brands, solid, regular*/) {
    return _.map(_.keys(iconSrc), prop => ({
      name: prop,
      value: `${type} fa-${prop}`,
    }))
  }
  // font-awesome: add all svg path to window object window.___FONT_AWESOME___
  return [
    {
      name: 'Font Awesome 5 Brands',
      source: 'https://fontawesome.com/',
      totalIcons: _.keys(window.___FONT_AWESOME___.styles.fab).length,
      color: 'rgb(27, 105, 168)',
      shadeColor: 'rgb(21, 84, 134)',
      categories: [{
          name: 'brands',
          icons: _getFontAwesomeIcons(window.___FONT_AWESOME___.styles.fab, 'fab')
        }]
    },
    {
      name: 'Font Awesome 5 Solid',
      source: 'https://fontawesome.com/',
      totalIcons: _.keys(window.___FONT_AWESOME___.styles.fas).length,
      color: 'rgb(151, 42, 169)',
      shadeColor: 'rgb(119, 33, 133)',
      categories: _getFontAwesomeCategories(window.___FONT_AWESOME___.styles.fas, 'fas')
    },
    {
      name: 'Font Awesome 5 Regular',
      source: 'https://fontawesome.com/',
      totalIcons: _.keys(window.___FONT_AWESOME___.styles.far).length,
      color: 'rgb(8, 144, 103)',
      shadeColor: 'rgb(5, 90, 82)',
      categories: _getFontAwesomeCategories(window.___FONT_AWESOME___.styles.far, 'far')
    }
  ]
}
function _getMDIIconSource() {
  // create kebabKey array of mdi icons name, remove 'mdi'
  const supportedMdiIcons = {}
  _.each(Object.keys(mdi), key => supportedMdiIcons[_.kebabCase(key.substr(3))] = true)

  function _getFontMDIIconCategories() {
    return _.map(mdiCategories, category => ({
      name: category.name,
      icons: _.filter(_.map(category.icons, icon => supportedMdiIcons[icon] ? ({
        name: icon,
        value: `mdi-${icon}`
      }) : null), _ignoreNullIcon)
    }))
  }

  return {
    name: 'Material Design Icons',
    source: 'https://materialdesignicons.com/',
    totalIcons: _.keys(supportedMdiIcons).length,
    color: 'rgb(147, 89, 18)',
    shadeColor: 'rgb(120, 72, 12)',
    categories: _getFontMDIIconCategories()
  }
}
function _getMDDXIconSource() {
  const mddx = Object.freeze(materialDesignIcons)
  function _getMDDXCategories() {
    return _.map(MDDXCategories, category => ({
      name: category.name,
      icons: _.filter(_.map(category.icons, icon => _.has(mddx, icon) ? ({
        name: icon,
        value: icon
      }) : null), _ignoreNullIcon)
    }))
  }
  return {
    name: 'Material Design Icons DX',
    source: 'https://github.com/jossef/material-design-icons-iconfont',
    totalIcons: _.keys(mddx).length,
    color: 'rgb(81, 104, 116)',
    shadeColor: 'rgb(64, 82, 92)',
    categories: _getMDDXCategories()
  }
}

export function getIconSources() {
  return [..._getFontAweSomeIconSource(), _getMDIIconSource(), _getMDDXIconSource()]
}
