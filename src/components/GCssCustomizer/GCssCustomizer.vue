<script>
	import _ from 'lodash';
  import { ref, reactive, computed, onMounted } from '@vue/composition-api';
  import { getInternalValue } from '../../mixins/getVModel';
  import { convertToUnit } from '../../utils/helpers';
  import GCssCustomizerLayout from './GCssCustomizerLayout'
  import GGridLayout from '../GGridGenerator/GGridLayout';
  import GCssCustomizerTreeView from './GCssCustomizerTreeView';
  import GBtn from '../GBtn/GBtn';
  import GDatePicker from '../GDatePicker/GDatePicker';
  import GTextField from '../GInput/GTextField';

  export default {
    name: 'GCssCustomizer',
		components: { GTextField, GCssCustomizerTreeView, GGridLayout, GBtn, GDatePicker },
    props: {
      value: {
        type: Object
      }
		},
    setup (props, context) {
			const treeData = getInternalValue(props, context)

			const cssCustomizerTree = treeData.value.metaData && treeData.value.metaData.cssCustomizerTree ? reactive(treeData.value.metaData.cssCustomizerTree) : reactive({
        allPaths: [],
        activePath: '',
      })


			// Tree Data logic
			const getComponentName = path => _.get(treeData.value, path + 'name') || _.get(treeData.value, path + '.component')
			const getComponentId = path => _.get(treeData.value, path + 'id') || _.get(treeData.value, path + '.id')

			// Tree view logic
      const itemText = node => node['name'] ? node['name'] : node['component']

      const genTreeView = () => {
        return <div area="tree" class="g-css-customizer-tree">
          <div class="g-css-customizer-tree-title">
            Select
          </div>
					<div class="g-css-customizer-tree-content">
						<g-css-customizer-tree-view vModel={cssCustomizerTree} data={treeData.value} itemText={itemText} itemChildren="items" expandLevel={3}/>
					</div>
        </div>
			}

			// Actions
			const genActions = () => {
			  return <div area="action" class="g-css-customizer-action">
					<div class="g-css-customizer-action-title">
						Action
					</div>
          <div class="g-css-customizer-action-content">
            <g-btn outlined>Save</g-btn>
            <g-btn outlined>Cancel</g-btn>
            <g-btn outlined>Close</g-btn>
					</div>
				</div>
			}

			// Preview
			const scopedId = ref(null)
			const genPreviewComponent = () => {
				return <g-btn ref="previewComponent">Test</g-btn>
			}

			onMounted(() => {
			  const previewComponent = context.refs.previewComponent
				scopedId.value = previewComponent.$options._scopeId
				previewComponent.$el.classList.add(genCssClass(getComponentName(cssCustomizerTree.activePath), getComponentId(cssCustomizerTree.activePath)))
				// debugger
			})

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
			  return genCssClass(getComponentName(cssCustomizerTree.activePath), getComponentId(cssCustomizerTree.activePath))
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
				style.innerText = '.' + activeCssClass.value + ' ' + cssCode.value + '\r\n'
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
				cssCode,
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
			border-top: 0;
			border-bottom: 0;
			border-left: 2px solid grey;
			border-right: 2px solid grey;
		}
	}
</style>