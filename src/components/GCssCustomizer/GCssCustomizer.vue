<script>
  import { ref, reactive, provide } from '@vue/composition-api';
  import { getInternalValue } from '../../mixins/getVModel';
  import GCssCustomizerLayout from './GCssCustomizerLayout'
  import GGridLayout from '../GGridGenerator/GGridLayout';
  import GCssCustomizerTreeView from './GCssCustomizerTreeView';
  import GBtn from '../GBtn/GBtn';
  import GTextField from '../GInput/GTextField';

  export default {
    name: 'GCssCustomizer',
		components: { GTextField, GCssCustomizerTreeView, GGridLayout, GBtn },
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
			const genPreview = () => {
			  return <div area="preview" class="g-css-customizer-preview" refs="preview">
					<g-btn>Test</g-btn>
				</div>
			}

			// Code
			const genCode = () => {
			  return <div area="code" class="g-css-customizer-code">
					<div class="g-css-customizer-code-title">
						CSS
					</div>
				</div>
			}

			// Design
			const cssCode = computed(() => ({
				backgroundColor: backgroundColor.value
			}))

			const backgroundColor = ref('#ababab')

			const applyChanges = () => {
			  const preview = context.refs.preview
				preview.addEventListener()
			}

			const genDesign = () => {
			  return <div area="design" class="g-css-customizer-design">
					<div class="g-css-customizer-design-title">
						Design
					</div>
          <div class="g-css-customizer-design-content">
						<g-text-field vModel={backgroundColor.value} label="Background Color">

						</g-text-field>
						<g-btn>Apply</g-btn>
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
			  genCssCustomizer
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

		&-action {
			&-content {
				display: flex;
				flex-wrap: wrap;
				align-content: flex-start;

				::v-deep.g-btn {
					margin: 0 10px 10px 0;
				}
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