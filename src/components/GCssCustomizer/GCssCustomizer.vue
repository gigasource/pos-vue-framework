<script>
	import _ from 'lodash';
  import { ref, reactive, computed, watch, set, onMounted } from '@vue/composition-api';
  import { parseCssData, parseSelectorData } from './GCssCustomizerFactory';
  import { getInternalValue } from '../../mixins/getVModel';
  import { convertToUnit } from '../../utils/helpers';
  import GCssCustomizerLayout from './GCssCustomizerLayout'
  import GGridLayout from '../GGridGenerator/GGridLayout';
  import GCssCustomizerTreeView from './GCssCustomizerTreeView';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GDatePicker from '../GDatePicker/GDatePicker';
  import GTextField from '../GInput/GTextField';
  import GCombobox from '../GCombobox/GCombobox';

  export default {
    name: 'GCssCustomizer',
		components: { GCombobox, GTextField, GCssCustomizerTreeView, GGridLayout, GBtn, GIcon, GDatePicker },
    props: {
      value: undefined
		},
    setup (props, context) {
			const treeData = getInternalValue(props, context)

			const cssCustomizerTree = treeData.value.metaData && treeData.value.metaData.cssCustomizerTree ? reactive(treeData.value.metaData.cssCustomizerTree) : reactive({
        allPaths: [],
        activePath: '',
      })

      const cssData = treeData.value.metaData && treeData.value.metaData.cssData ? ref(treeData.value.metaData.cssData) : ref({})

      const stylesString = computed(() => parseCssData(cssData.value))

			// Path
      function isRootPath (path) {
        return path === ''
      }

      function getParentPath (path) {
			  if (isRootPath(path)) return undefined
        if (path.lastIndexOf('.children') > -1) return path.slice(0, path.lastIndexOf('.children'))
        if (path.lastIndexOf('children') > -1) return path.slice(0, path.lastIndexOf('children'))
      }

      function getPathData(path, key) {
        return isRootPath(path) ? _.get(treeData.value, path + key) : _.get(treeData.value, path + '.' + key)
      }

      function getClosestAncestorClassList(path) {
			  const parentPath = getParentPath(path)
        if (parentPath === undefined) return undefined
        const parentClassList = getPathData(parentPath, 'classList')
        if (parentClassList.length > 0) return parentClassList
        else return getClosestAncestorClassList(parentPath)
      }

			const parseElement = (el) => {
			  const obj = {}
        if (el instanceof Element) {
          obj['start'] = el.innerHTML ? el.outerHTML.slice(0, el.outerHTML.indexOf(el.innerHTML)) : el.outerHTML.slice(0, el.outerHTML.search(/<\/+/))
					obj['end'] = el.innerHTML ? el.outerHTML.slice(el.outerHTML.indexOf(el.innerHTML) + el.innerHTML.length - el.outerHTML.length) : el.outerHTML.slice(obj['start'].length - el.outerHTML.length)
					obj['start'] = obj['start'].replace(/ data-v-\w+=""/g, '')
					obj['classList'] = [...el.classList]
          obj['tag'] = el.tagName.toLowerCase()
          obj['children'] = []
          for (let childEl of el.childNodes) {
            const child = parseElement(childEl)
            child && obj['children'].push(child)
          }
          return obj
        } else if (el instanceof Text) {
					obj['name'] = el.wholeText
          if (obj['name'].search(/\S+/) > -1) return obj
				}
			}

			const rebuildTreeData = () => {
        const previewComponent = context.refs.previewComponent
        treeData.value = parseElement(previewComponent.$el)
			}

			onMounted(() => {
			  const previewComponent = context.refs.previewComponent
				treeData.value = parseElement(previewComponent.$el)
			})

			// Preview
			const model = ref('2019-12-10')

			// Code
			const activeSelector = ref('')

			const activeCssSelectorList = computed(() => {
        const selectorList = []
        const classList = getPathData(cssCustomizerTree.activePath, 'classList')
        const tag = getPathData(cssCustomizerTree.activePath, 'tag')
        const parentPath = getParentPath(cssCustomizerTree.activePath)
        const parentClassList = getPathData(parentPath, 'classList')
        const closestNotEmptyClassList = getClosestAncestorClassList(cssCustomizerTree.activePath)
        _.forEach(classList, cssClass => {
          selectorList.push(`.${cssClass}`)
        })
        _.forEach(closestNotEmptyClassList, parentClass => {
          if (tag) {
            selectorList.push(`.${parentClass} ${tag}`)
            selectorList.push(`.${parentClass}>${tag}`)
            selectorList.push(`.${parentClass}+${tag}`)
            selectorList.push(`.${parentClass}~${tag}`)
          }
          _.forEach(classList, childClass => {
            selectorList.push(`.${parentClass} .${childClass}`)
            selectorList.push(`.${parentClass}>.${childClass}`)
            selectorList.push(`.${parentClass}+.${childClass}`)
            selectorList.push(`.${parentClass}~.${childClass}`)
          })
        })
        return selectorList
			})

      watch(() => activeCssSelectorList.value, newVal => {
        activeSelector.value = newVal[0] || ''
      }, {lazy: true, deep: true})

			const cssDisplayCode = computed(() => {
        const temp = []
        _.forEach(cssData.value[activeSelector.value], (val, key) => {
          val && temp.push({
            property: _.kebabCase(key),
            value: val.split(' ')
          })
        })
        return temp
      })

			// Design
      const propertyList = ['backgroundColor', 'color', 'width', 'height', 'border', 'borderRadius', 'padding', 'margin']

      const reactiveSet = (obj, key, val) => {
			  if (obj[key] === undefined) set(obj, key, val)
        else obj[key] = val
      }

      const inputObj = computed({
        get: () => _.mapValues(_.groupBy(propertyList, val => val), (val, key) => {
          if (cssData.value[activeSelector.value] && cssData.value[activeSelector.value][key]) {
            if (key.search(/[W|w]idth|[H|h]eight/) > -1) {
              return cssData.value[activeSelector.value][key].replace(/px$/, '')
            }
            else return cssData.value[activeSelector.value][key]
          }
          return ''
        }),
        set: val => {
          if (!cssData.value[activeSelector.value]) reactiveSet(cssData.value, activeSelector.value, {})
          if (val.key.search(/[W|w]idth|[H|h]eight/) > -1) {
            reactiveSet(cssData.value[activeSelector.value],val.key, convertToUnit(val.value))
          } else {
            reactiveSet(cssData.value[activeSelector.value],val.key, val.value)
          }
        }
      })

      const onInput = (value, key) => {
			  inputObj.value = {key: key, value: value}
      }

			const applyChanges = () => {
			  // const preview = context.refs.preview
				// const style = preview.querySelector('style')
				// style.innerText = '.' + activeSelector.value + ' ' + cssCode.value + '\r\n'
        // set(cssData.value, activeSelector.value, _.cloneDeep(stylesObj.value))
        // context.root.$set(cssData.value, `.${activeSelector.value}`, _.cloneDeep(stylesObj.value))
        const previewComponentEl = context.refs.previewComponent.$el
        const activeEl = _.get(previewComponentEl, cssCustomizerTree.activePath.replace(/children/g, 'childNodes'))
        activeEl.classList.add(activeSelector.value.replace('.', ''))
      }

			const resetChanges = () => {

			}

      // Actions
      const saveCssData = () => {
        !treeData.value.metaData && (treeData.value.metaData = {})
        treeData.value.metaData.cssData = cssData.value
      }

      const save = () => {
        saveCssData()
        context.emit('save')
      }

      const close = () => {
        context.emit('close')
      }

      // Render functions
      const genText = (text) => {
        if (text.match(/#/) || text.match(/\d+/)) return <span class="g-css-customizer-code-number"> {text}</span>
        else return <span class="g-css-customizer-code-string"> {text}</span>
      }

      const genDisplayCode = (item) => {
        return <p>
          <span>{item.property + ':'}</span>
          {item.value.map(val => genText(val))};
        </p>
      }

      const genTreeView = () => {
        return <div area="tree" class="g-css-customizer-tree">
          <div class="g-css-customizer-tree-title">
            Select
          </div>
          <div class="g-css-customizer-tree-content">
            <g-btn small class="g-css-customizer-tree-reload" icon vOn:click={rebuildTreeData}>
              <g-icon size="16" color="grey">fas fa-redo-alt</g-icon>
            </g-btn>
            <g-css-customizer-tree-view vModel={cssCustomizerTree} data={treeData.value} expandLevel={10}/>
          </div>
        </div>
      }

      const genActions = () => {
        return <div area="action" class="g-css-customizer-action">
          <div class="g-css-customizer-action-title">
            Action
          </div>
          <div class="g-css-customizer-action-content">
            <g-btn outlined vOn:click={save}>Save</g-btn>
            <g-btn outlined>Cancel</g-btn>
            <g-btn outlined vOn:click={close}>Close</g-btn>
          </div>
        </div>
      }

      const genPreviewComponent = () => {
        // return <g-btn ref="previewComponent">Test</g-btn>
        return <g-date-picker vModel={model.value} ref="previewComponent">

        </g-date-picker>
      }


      const genPreview = () => {
        return <div area="preview" class="g-css-customizer-preview" ref="preview">
          {genPreviewComponent()}
          <div class="test-class">
          </div>
          <style type="text/css">
            {stylesString.value}
          </style>
        </div>
      }


      const genCode = () => {
        return <div area="code" class="g-css-customizer-code">
          <div class="g-css-customizer-code-title">
            CSS
          </div>
          <g-combobox value={activeSelector.value} vOn:input={e => activeSelector.value = e} items={activeCssSelectorList.value} label="selector" menuProps={{maxHeight: undefined}}/>
          {cssDisplayCode.value.map(item => genDisplayCode(item))}
        </div>
      }

			const genDesign = () => {
			  return <div area="design" class="g-css-customizer-design">
					<div class="g-css-customizer-design-title">
						Design
					</div>
          <div class="g-css-customizer-design-content">
            {propertyList.map(property => {
              return <g-text-field dense label={property} value={inputObj.value[property]} vOn:input={e => onInput(e, property)}/>
            })}
						<g-btn outlined vOn:click={applyChanges}>Apply</g-btn>
            <g-btn outlined vOn:click={resetChanges}>Reset</g-btn>
          </div>
				</div>
			}

      const genCssCustomizer = () => {
        return <g-grid-layout class="g-css-customizer-container" layout={GCssCustomizerLayout}>
					{genTreeView()}
					{genActions()}
					{genPreview()}
					{genCode()}
					{genDesign()}
				</g-grid-layout>
			}

			return {
			  genCssCustomizer,
				cssCustomizerTree,
        activeSelector,
        cssData,
        stylesString,
        inputObj,
			}
		},
		render () {
      return this.genCssCustomizer()
		}
  }
</script>
<style scoped lang="scss">
	.g-css-customizer {

		&-container {
			width: 100%;
			height: 100%;
			background-color: #FFFFFF;
		}

		&-tree, &-code, &-design, &-action {
			position: relative;
			padding: 0 10px;
			height: 100%;
			display: flex;
			flex-direction: column;
			flex: 1 1 100%;
			background-color: white;


			&-title {
				position: relative;
				overflow: hidden;
				font-size: 16px;
				color: grey;
				flex: 0 0 auto;


				&::after {
					content: "";
					width: 100%;
					height: 100%;
					border-top: 1px solid grey;
					position: absolute;
					transform: translateY(50%);
					margin-left: 10px
				}
			}

			&-content {
				backface-visibility: hidden;
				flex: 1 1 auto;
				overflow-y: auto;
			}
		}

		&-action, &-design {
			&-content {
				display: flex;
				flex-wrap: wrap;
				align-content: flex-start;

				::v-deep.g-btn {
					margin: 0 10px 10px 0;
				}
			}
		}

		&-code {
			font-size: 12px;
			color: #444444;

			&-number {
				color: #F16B16;
			}

			&-string {
				color: #20A471
			}
		}

		&-preview {
			background-color: #f0f0f0;
			padding: 10px;
			border-top: 0;
			border-bottom: 0;
			border-left: 2px solid grey;
			border-right: 2px solid grey;
		}

		&-tree {
			&-reload {
				position: absolute;
				top: 16px;
				right: 12px;
			}
		}

		::v-deep.g-tf-wrapper {
			margin: 4px 0 4px 0;
		}
	}
</style>