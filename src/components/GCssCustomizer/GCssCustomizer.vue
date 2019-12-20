<script>
	import _ from 'lodash';
  import { ref, reactive, computed, onMounted } from '@vue/composition-api';
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

			// Path
      function isRootPath (path) {
        return path === ''
      }

			const parseElement = (el) => {
			  // debugger
			  const obj = {}
        if (el instanceof Element) {
          obj['start'] = el.innerHTML ? el.outerHTML.slice(0, el.outerHTML.indexOf(el.innerHTML)) : el.outerHTML.slice(0, el.outerHTML.search(/<\/+/))
					obj['end'] = el.innerHTML ? el.outerHTML.slice(el.outerHTML.indexOf(el.innerHTML) + el.innerHTML.length - el.outerHTML.length) : el.outerHTML.slice(obj['start'].length - el.outerHTML.length)
					obj['start'] = obj['start'].replace(/ data-v-\w+=""/g, '')
					obj['classList'] = [...el.classList]
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
				// previewComponent.$el.classList.add(genCssClass(getComponentName(cssCustomizerTree.activePath), getComponentId(cssCustomizerTree.activePath)))
				// treeData.value = previewComponent.$el
				// console.log(treeData.value.childNodes)
				treeData.value = parseElement(previewComponent.$el)
				// debugger
			})

			// Tree Data logic
			const getComponentName = path => _.get(treeData.value, path + 'name') || _.get(treeData.value, path + '.component')
			const getComponentId = path => _.get(treeData.value, path + 'id') || _.get(treeData.value, path + '.id')

			// Tree view logic
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

			// Actions

			const saveData = () => {
			  context.emit('save')
			}

			const genActions = () => {
			  return <div area="action" class="g-css-customizer-action">
					<div class="g-css-customizer-action-title">
						Action
					</div>
          <div class="g-css-customizer-action-content">
            <g-btn outlined vOn:click={saveData}>Save</g-btn>
            <g-btn outlined>Cancel</g-btn>
            <g-btn outlined vOn:click={() => context.emit('close')}>Close</g-btn>
					</div>
				</div>
			}

			// Preview
			const model = ref('2019-12-10')
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

					</style>
				</div>
			}

			// Code
      const genText = (text) => {
			  if (text.match(/#/) || text.match(/\d+/)) return <span class="g-css-customizer-code-number"> {text}</span>
				else return <span class="g-css-customizer-code-string"> {text}</span>
			}

			const genCssClass = (component, id) => {
			  return `${_.kebabCase(component)}-${id}`
			}

			const activeCssClass = computed(() => {
			  if (isRootPath(cssCustomizerTree.activePath)) return _.get(treeData.value, cssCustomizerTree.activePath + 'classList')
				return _.get(treeData.value, cssCustomizerTree.activePath + '.classList')
			})

			const cssCode = computed(() => {
			  let temp = '{'
				_.forEach(stylesObj.value, (val, key) => {
				  val && (temp += `${_.kebabCase(key)}: ${val} !important;` + ' ')
				})
				temp += '}'
				return temp
			})

			const cssDisplayCode = computed(() => {
        const temp = []
        _.forEach(stylesObj.value, (val, key) => {
          val && temp.push({
            property: _.kebabCase(key),
            value: val.split(' ')
          })
        })
        return temp
      })

			const genDisplayCode = (item) => {
				return <p>
					<span>{item.property + ':'}</span>
          {item.value.map(val => genText(val))};
				</p>
			}

			const genCode = () => {
			  return <div area="code" class="g-css-customizer-code">
					<div class="g-css-customizer-code-title">
						CSS
					</div>
					<g-combobox items={activeCssClass.value} label="selector"/>
					{cssDisplayCode.value.map(item => genDisplayCode(item))}
				</div>
			}

			// Design

			const inputObj = reactive({
        backgroundColor: '#ab3f67',
        color: '#ffffff',
        width: '100',
        height: '50',
				border: '1px solid lightgreen',
				borderRadius: '20',
			})

			const stylesObj = computed(() => ({
				backgroundColor: inputObj.backgroundColor,
				color: inputObj.color,
				width: convertToUnit(inputObj.width),
				height: convertToUnit(inputObj.height),
				border: inputObj.border,
				borderRadius: convertToUnit(inputObj.borderRadius)
			}))

			const setStyle = (el, stylesObj) => {
			  _.forEach(stylesObj, (val, key) => {
			    // if (key === 'width') debugger
			    el.style[key] = val || ""
					return true
				})
			}

			const resetStyle = (el, stylesObj) => {
			  for (let key in stylesObj) {
			    el.style[key] = ""
				}
			}

			const applyChanges = () => {
			  const preview = context.refs.preview
        const el = preview.querySelector(`[${scopedId.value}]`)
        // setStyle(el, stylesObj.value)
				const style = preview.querySelector('style')
				// style.innerText = '.' + activeCssClass.value + ' ' + cssCode.value + '\r\n'
			}

			const resetChanges = () => {
        const preview = context.refs.preview
        const el = preview.querySelector(`[${scopedId.value}]`)
				// resetStyle(el, stylesObj.value)
        const style = preview.querySelector('style')
				style.innerText = ''
			}

			const genDesign = () => {
			  return <div area="design" class="g-css-customizer-design">
					<div class="g-css-customizer-design-title">
						Design
					</div>
          <div class="g-css-customizer-design-content">
						<g-text-field dense vModel={inputObj.backgroundColor} label="Background Color"/>
						<g-text-field dense vModel={inputObj.color} label="Color"/>
						<g-text-field dense vModel={inputObj.width} label="Width"/>
						<g-text-field dense vModel={inputObj.height} label="Height"/>
            <g-text-field dense vModel={inputObj.border} label="Border"/>
            <g-text-field dense vModel={inputObj.borderRadius} label="Border Radius"/>
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
				activeCssClass
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