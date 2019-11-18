// icons will be added to window.___FONT_AWESOME___ when import js file from fontawesome
// DON'T DELETE THIS IMPORT LINE
import _ from 'lodash'
import * as fa from '@fortawesome/fontawesome-free/js/all'
import * as mdi from '@mdi/js/mdi'
import * as materialDesignIcons from '../styles/materialDesignIconExport.scss'
import { kebabCase } from '../../../utils/helpers';
import FontAwesomeCategories from './FontAwesomeFreeCategories'

// TODO:
// - icon missing
// - categories
// - water mark??
// - paging

/**
 * Object models:
 *
 * iconSources: [
 *   {
 *     name: 'Font Awesome 5 Brands',
 *     source: 'https://fontawesome.com/',
 *     categories: [
 *       {
 *         name: 'brands',
 *         icons: [
 *           { name: 'accusoft', value: 'fab fa-accusoft' }
 *         ]
 *       }
 *     ]
 *   },
 *   {
 *     name: 'FontAwesome 5 Solid',
 *     source: 'https://fontawesome.com/',
 *     categories: [
 *       {
 *          name: 'address',
 *          icons: [
 *           { name: 'address-card', value: 'fas fa-address-card' },
 *           { name: 'address-book', value: 'fas fa-address-book' },
 *          ]
 *       },
 *
 *     ]
 *   },
 *   {
 *     name: 'FontAwesome 5 Regular',
 *     source: 'https://fontawesome.com/',
 *     categories: [
 *       {
 *          name: 'address',
 *          icons: [
 *           { name: 'address-card', value: 'far fa-address-card' },
 *           { name: 'address-book', value: 'far fa-address-book' },
 *          ]
 *       },
 *     ]
 *   },
 *   {
 *      name: '@MDI,
 *      source: 'https://materialdesignicons.com/
 *      categories: [
 *        name: 'account',
 *        icons: [
 *          {
 *            name: 'domain',
 *            value: 'mdi-domain'
 *          }
 *        ]
 *      ]
 *   }
 *   {
 *      //
 *      name: 'Material Design Icons DX',
 *      source: 'https://github.com/jossef/material-design-icons-iconfont',
 *      categories: [
 *        {
 *          name: 'account',
 *          icons: [
 *            { name: 'domain', value: 'domain' },
 *            { name: 'domain_disabled', value: 'domain_disabled' }
 *          ]
 *        }
 *      ]
 *   }
 * ]
 */

export function getIconSources() {
  return [..._getFontAweSomeIconSource(), _getFontMDIIconSource(), _getMaterialDesignIconSource()]
}

function _getFontAweSomeIconSource() {
  function _getFontAwesomeCategories(iconSrc, type) {
    return _.map(FontAwesomeCategories, category => ({
      name: category.name,
      icons: _.filter(_.map(category.icons, ico => _.has(iconSrc, ico) ? {
        name: ico,
        value: `${type} fa-${ico}`
      }: null ), ico => ico != null)
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
      categories: [
        {
          name: 'brands',
          icons: _getFontAwesomeIcons(window.___FONT_AWESOME___.styles.fab, 'fab')
        }
      ]
    },
    {
      name: 'Font Awesome 5 Solid',
      source: 'https://fontawesome.com/',
      categories: _getFontAwesomeCategories(window.___FONT_AWESOME___.styles.fas, 'fas')
    },
    {
      name: 'Font Awesome 5 Regular',
      source: 'https://fontawesome.com/',
      categories: _getFontAwesomeCategories(window.___FONT_AWESOME___.styles.far, 'far')
    }
  ]
}

function _getFontMDIIconSource() {
  // font-mdi: export as an object which contain all font as property pair: iconName = 'svg path'
  //   TODO: Split all property into category ???
  return {
    name: 'Material Design Icons',
    source: 'https://materialdesignicons.com/',
    categories: [
      {
        name: 'all',
        icons: _.map(Object.keys(mdi), key => ({
          name: kebabCase(key.substr(3)),
          value: kebabCase(key),
        }))
      }
    ]
  }
}

function _getMaterialDesignIconSource() {
  // material design icons: gathered from _variables.scss
  const mdi = Object.freeze(materialDesignIcons)
  let icons = _.map(Object.keys(mdi), v => ({
    name: v,
    value: v,
  }))
  return {
    name: 'Material Design Icons DX',
    source: 'https://github.com/jossef/material-design-icons-iconfont',
    categories: [
      {
        name: 'all',
        icons: icons
      }
    ]
  }
}
