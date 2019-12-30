<script>
  import _ from 'lodash';
  import {ref, reactive, computed, watch, set, provide, onMounted} from '@vue/composition-api';
  import {parseCssData, isEmptySelector} from './GCssCustomizerFactory';
  import {getInternalValue} from '../../mixins/getVModel';
  import {convertToUnit, openFile, saveFile} from '../../utils/helpers';
  import GCssCustomizerLayout from './GCssCustomizerLayout'
  import GGridLayout from '../GGridGenerator/GGridLayout';
  import GCssCustomizerTreeView from './GCssCustomizerTreeView';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GDatePicker from '../GDatePicker/GDatePicker';
  import GTextField from '../GInput/GTextField';
  import GCombobox from '../GCombobox/GCombobox';
  import GDialog from '../GDialog/GDialog';
  import GCard from '../GCard/GCard';
  import GCardTitle from '../GCard/GCardTitle';
  import {GCardText, GCardActions} from '../GCard/GCardFunctionalComponent';
  import GCssCustomizerStylePreview from './GCssCustomizerStylePreview';

  export default {
    name: 'GCssCustomizer',
    components: {
      GCardText,
      GCardActions,
      GCardTitle,
      GCard,
      GDialog,
      GCombobox,
      GTextField,
      GCssCustomizerTreeView,
      GGridLayout,
      GBtn,
      GIcon,
      GDatePicker,
      GCssCustomizerStylePreview
    },
    props: {
      value: undefined
    },
    setup(props, context) {
      const treeData = getInternalValue(props, context)

      const cssCustomizerTree = treeData.value.metaData && treeData.value.metaData.cssCustomizerTree ? reactive(treeData.value.metaData.cssCustomizerTree) : reactive({
        allPaths: [],
        activePath: '',
        hoverPath: '',
      })

      const cssData = treeData.value.metaData && treeData.value.metaData.cssData ? ref(treeData.value.metaData.cssData) : ref({})

      const stylesString = computed(() => parseCssData(cssData.value))

      const activeSelector = ref('')

      // Path
      function isRootPath(path) {
        return path === ''
      }

      function getParentPath(path) {
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

      const parseElement = (el, prefix) => {
        const obj = {}
        obj['domPath'] = prefix
        if (el instanceof Element) {
          obj['start'] = el.innerHTML ? el.outerHTML.slice(0, el.outerHTML.indexOf(el.innerHTML)) : el.outerHTML.slice(0, el.outerHTML.search(/<\/+/))
          obj['end'] = el.innerHTML ? el.outerHTML.slice(el.outerHTML.indexOf(el.innerHTML) + el.innerHTML.length - el.outerHTML.length) : el.outerHTML.slice(obj['start'].length - el.outerHTML.length)
          obj['start'] = obj['start'].replace(/ data-v-\w+=""/g, '')
          obj['classList'] = [...el.classList]
          obj['tag'] = el.tagName.toLowerCase()
          obj['children'] = []
          for (let i = 0; i < el.childNodes.length; i++) {
            const child = parseElement(el.childNodes[i], prefix ? prefix + '.childNodes.' + i : prefix + 'childNodes.' + i)
            child && obj['children'].push(child)
          }
          return obj
        } else if (el instanceof Text) {
          obj['name'] = el.wholeText
          if (obj['name'].search(/\S+/) > -1) return obj
        }
      }

      const addTreePathToDom = (treeNode, prefix) => {
        const treeNodeEl = isRootPath(treeNode.domPath) ? context.refs.previewComponent.$el : _.get(context.refs.previewComponent.$el, treeNode.domPath)
        treeNodeEl['treePath'] = prefix
        if (treeNode.children) {
          for (let i = 0; i < treeNode.children.length; i++) {
            addTreePathToDom(treeNode.children[i], prefix ? prefix + '.children.' + i : prefix + 'children.' + i)
          }
        }
      }

      const buildSelectorList = (treeNode, prefix) => {
        treeNode.selectorList = []
        const closestNotEmptyClassList = getClosestAncestorClassList(prefix)
        _.forEach(treeNode.classList, cssClass => {
          treeNode.selectorList.push(`.${cssClass}`)
        })
        _.forEach(closestNotEmptyClassList, parentClass => {
          if (treeNode.tag) {
            treeNode.selectorList.push(`.${parentClass} ${treeNode.tag}`)
            treeNode.selectorList.push(`.${parentClass}>${treeNode.tag}`)
          }
          _.forEach(treeNode.classList, childClass => {
            treeNode.selectorList.push(`.${parentClass} .${childClass}`)
            treeNode.selectorList.push(`.${parentClass}>.${childClass}`)
          })
        })

        if (treeNode.children) {
          for (let i = 0; i < treeNode.children.length; i++) {
            buildSelectorList(treeNode.children[i], prefix ? prefix + '.children.' + i : prefix + 'children.' + i)
          }
        }
      }

      const addCustomSelector = (el) => {
        for (let selector of _.keys(cssData.value)) {
          const matchedElementPathList = _.map(el.parentNode.querySelectorAll(selector), 'treePath')
          for (let path of matchedElementPathList) {
            const selectorList = getSelectorList(path)
            if (!selectorList.includes(selector)) selectorList.push(selector)
          }
        }
      }

      const rebuildTreeData = () => {
        const previewComponent = context.refs.previewComponent
        treeData.value = parseElement(previewComponent.$el, '')
        buildSelectorList(treeData.value, '')
        addCustomSelector(previewComponent.$el)

        // return to root if activePath is not found on the new tree
        if (_.get(treeData.value, cssCustomizerTree.activePath) === undefined) cssCustomizerTree.activePath = ''
      }

      onMounted(() => {
        const previewComponent = context.refs.previewComponent
        rebuildTreeData()
        addTreePathToDom(treeData.value, '')
        setActiveTreeTargetPosition(previewComponent.$el)

        // modify _update function of preview component to rebuild tree when preview component updated
        const _update = previewComponent._update;
        let ignoreRun = false
        previewComponent._update = function () {
          _update.bind(previewComponent)(...arguments);
          if (!ignoreRun) {
            ignoreRun = true;
            previewComponent.$nextTick(() => {
              rebuildTreeData()
              setTimeout(() => {
                addTreePathToDom(treeData.value, '')
                ignoreRun = false;
              }, 100)
            })
          }
        }
      })

      // Target hover functionality
      const targetFlag = ref(false)

      const setActiveTreeTargetPosition = target => {
        const activeTreeTarget = context.refs.activeTreeTarget
        const rect = target ? target.getBoundingClientRect() : {}
        const computedStyle = target ? window.getComputedStyle(target) : undefined
        activeTreeTarget.style.top = convertToUnit(rect.top) || 0
        activeTreeTarget.style.left = convertToUnit(rect.left) || 0
        activeTreeTarget.style.width = convertToUnit(rect.width) || 0
        activeTreeTarget.style.height = convertToUnit(rect.height) || 0
        activeTreeTarget.style.borderWidth = computedStyle ? computedStyle.getPropertyValue('padding') : 0
        activeTreeTarget.style.outlineWidth = computedStyle ? computedStyle.getPropertyValue('margin') : 0
      }

      const mouseMove = (e) => {
        setActiveTreeTargetPosition(e.target)
      }

      const mouseDown = (e) => {
        const target = e.target
        cssCustomizerTree.activePath = target.treePath
      }

      const toggleTargetMode = () => {
        const previewComponent = context.refs.previewComponent
        if (!targetFlag.value) {
          // for (let i = 0; i < previewComponent.$el.children.length; i++) {
          //   previewComponent.$el.children[i].style.pointerEvents = 'none'
          // }
          previewComponent.$el.addEventListener('mousemove', mouseMove)
          previewComponent.$el.addEventListener('mousedown', mouseDown)
          targetFlag.value = true
        } else {
          // for (let i = 0; i < previewComponent.$el.children.length; i++) {
          //   previewComponent.$el.children[i].style.pointerEvents = 'auto'
          // }
          previewComponent.$el.removeEventListener('mousemove', mouseMove)
          previewComponent.$el.removeEventListener('mousedown', mouseDown)
          targetFlag.value = false
          setActiveTreeTargetPosition()
        }
      }

      // Tree Hover functionality
      const mouseEnterElement = (path) => {
        const previewComponentEl = context.refs.previewComponent.$el
        const hoverEl = isRootPath(path) ? previewComponentEl : _.get(previewComponentEl, _.get(treeData.value, path + '.domPath'))
        if (!(hoverEl instanceof Element)) return
        setActiveTreeTargetPosition(hoverEl)
      }

      const mouseLeaveElement = () => {
        setActiveTreeTargetPosition()
      }

      provide('mouseEnterElement', mouseEnterElement)
      provide('mouseLeaveElement', mouseLeaveElement)

      // Selector target view functionality
      const selectorTargetFlag = ref(false)
      let activeAnimationList = []
      let activeSelectorTargetList = []

      const toggleSelectorTargetMode = () => {
        selectorTargetFlag.value = !selectorTargetFlag.value
      }

      const createTargetDiv = (el) => {
        const div = document.createElement('div')
        const rect = el.getBoundingClientRect()
        div.style.top = convertToUnit(rect.top)
        div.style.left = convertToUnit(rect.left)
        div.style.width = convertToUnit(rect.width)
        div.style.height = convertToUnit(rect.height)
        div.style.background = 'linear-gradient(90deg, red 50%, transparent 50%), linear-gradient(90deg, red 50%, transparent 50%), linear-gradient(0deg, red 50%, transparent 50%), linear-gradient(0deg, red 50%, transparent 50%)'
        div.style.backgroundRepeat = 'repeat-x, repeat-x, repeat-y, repeat-y'
        div.style.backgroundSize = '6px 1px, 6px 1px, 1px 6px, 1px 6px'
        div.style.backgroundPosition = `0px 0px, ${convertToUnit(rect.width - 1)} ${convertToUnit(rect.height - 1)}, 0px ${convertToUnit(rect.height - 1)}, ${convertToUnit(rect.width - 1)} 0px`
        div.style.boxSizing = 'border-box'
        div.style.position = 'absolute'
        div.style.zIndex = '100000'
        div.style.pointerEvents = 'none'

        const animationStopPoint = '30px'
        const borderAnimation = [
          [
            {backgroundPosition: `0px 0px, ${animationStopPoint} ${convertToUnit(rect.height - 1)}, 0px ${animationStopPoint}, ${convertToUnit(rect.width - 1)} 0px`},
            {backgroundPosition: `${animationStopPoint} 0px, 0px ${convertToUnit(rect.height - 1)}, 0px 0px, ${convertToUnit(rect.width - 1)} ${animationStopPoint}`},
          ],
          {
            duration: 4000,
            easing: 'linear',
            iterations: Infinity
          }
        ]

        const activeAnimation = div.animate(...borderAnimation)
        activeAnimation.pause()
        activeAnimationList.push(activeAnimation)
        return div
      }

      const animateSelectorTarget = (el) => {
        const targetList = el.querySelectorAll(activeSelector.value)
        for (let target of targetList) {
          const targetDiv = createTargetDiv(target)
          context.refs.preview.appendChild(targetDiv)
          activeSelectorTargetList.push(targetDiv)
        }
        for (let activeAnimation of activeAnimationList) {
          activeAnimation.play()
        }
      }

      const cancelSelectorTargetAnimation = () => {
        for (let activeAnimation of activeAnimationList) {
          activeAnimation.cancel()
        }
        for (let selectorTarget of activeSelectorTargetList) {
          context.refs.preview.removeChild(selectorTarget)
        }
        activeAnimationList = []
        activeSelectorTargetList = []
      }

      watch([() => activeSelector.value, () => selectorTargetFlag.value], () => {
        const previewComponent = context.refs.previewComponent
        if (selectorTargetFlag.value && activeSelector.value) {
          cancelSelectorTargetAnimation()
          animateSelectorTarget(previewComponent.$el.parentNode)
        } else {
          cancelSelectorTargetAnimation()
        }
      }, {lazy: true})

      // Preview
      const model = ref('2019-12-10')

      // Selector and css code
      const getSelectorList = (treePath) => {
        if (isRootPath(treePath)) return _.get(treeData.value, treePath + 'selectorList')
        return _.get(treeData.value, treePath + '.selectorList')
      }

      const activeCssSelectorList = computed({
        get: () => {
          return getSelectorList(cssCustomizerTree.activePath)
        },
        set: value => {
          getSelectorList(cssCustomizerTree.activePath).push(value)
        }
      })

      watch(() => activeCssSelectorList.value, () => {
        activeSelector.value = activeCssSelectorList.value[0] || ''
      }, {lazy: true, deep: true})

      watch(() => activeSelector.value, newVal => {
        if (newVal && !activeCssSelectorList.value.includes(newVal)) {
          const previewComponentElParent = context.refs.previewComponent.$el.parentNode
          const matchedElementPathList = _.map(previewComponentElParent.querySelectorAll(activeSelector.value), 'treePath')
          for (let path of matchedElementPathList) {
            const selectorList = getSelectorList(path)
            if (!selectorList.includes(activeSelector.value)) selectorList.push(activeSelector.value)
          }
          if (!matchedElementPathList.includes(cssCustomizerTree.activePath)) {
            cssCustomizerTree.activePath = matchedElementPathList[0]
          }
        }
      }, {lazy: true})

      const cssDisplayCode = computed(() => {
        const temp = []
        _.forEach(cssData.value[activeSelector.value], (val, key) => {
          val !== undefined && val !== '' && temp.push({
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
            } else return cssData.value[activeSelector.value][key]
          }
          return ''
        }),
        set: val => {
          if (!cssData.value[activeSelector.value]) reactiveSet(cssData.value, activeSelector.value, {})
          if (val.key.search(/[W|w]idth|[H|h]eight/) > -1) {
            reactiveSet(cssData.value[activeSelector.value], val.key, convertToUnit(val.value))
          } else if (val.value !== '') {
            reactiveSet(cssData.value[activeSelector.value], val.key, val.value)
          } else {
            reactiveSet(cssData.value[activeSelector.value], val.key, undefined)
          }
          if (isEmptySelector(cssData.value[activeSelector.value])) {
            reactiveSet(cssData.value, activeSelector.value, undefined)
          }
        }
      })

      const onInput = (value, key) => {
        inputObj.value = {key: key, value: value}
      }

      const applyChanges = () => {

      }

      const resetChanges = () => {
        reactiveSet(cssData.value, activeSelector.value, undefined)
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

      const loadCssFile = () => {
        openFile({multiple: false, mimeType: 'application/json'}, async files => {
          const data = await files[0].text()
          cssData.value = JSON.parse(data)
          addCustomSelector(context.refs.previewComponent.$el)
        })
      }

      const saveCssFile = () => {
        saveFile('cssData.json', JSON.stringify(cssData.value), 'application/json')
      }

      const stylePreviewDialog = ref(false)

      const openStylePreviewDialog = () => stylePreviewDialog.value = true

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
            <g-btn outlined vOn:click={openStylePreviewDialog}>View All Styles</g-btn>
          </div>
          <div class="g-css-customizer-action-content">
            <g-btn outlined vOn:click={loadCssFile}>Import</g-btn>
            <g-btn outlined vOn:click={saveCssFile}>Export</g-btn>
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
          <g-btn icon small class="g-css-customizer-preview-target" vOn:click={toggleTargetMode}>
            <g-icon size="20" color={targetFlag.value ? 'green' : 'grey'}>fas fa-crosshairs</g-icon>
          </g-btn>
          <div ref="activeTreeTarget" class="g-css-customizer-target">

          </div>
        </div>
      }

      const genCode = () => {
        return <div area="code" class="g-css-customizer-code">
          <div class="g-css-customizer-code-title">
            CSS
          </div>
          <g-combobox value={activeSelector.value} vOn:input={e => activeSelector.value = e}
                      items={activeCssSelectorList.value} label="selector" menuProps={{maxHeight: '100%'}}/>
          {cssDisplayCode.value.map(item => genDisplayCode(item))}
          <g-css-customizer-style-preview vModel={stylePreviewDialog.value} cssData={cssData.value}/>
            <g-icon class="g-css-customizer-code-show" size="16" color="red" vOn:click={toggleSelectorTargetMode}>
              {selectorTargetFlag.value ? 'far fa-eye' : 'far fa-eye-slash'}
            </g-icon>
        </div>
      }

      const genDesign = () => {
        return <div area="design" class="g-css-customizer-design">
          <div class="g-css-customizer-design-title">
            Design
          </div>
          <div class="g-css-customizer-design-content">
            {propertyList.map(property => {
              return <g-text-field dense label={property} value={inputObj.value[property]}
                                   vOn:input={e => onInput(e, property)}/>
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
        activeCssSelectorList,
        cssData,
        stylesString,
        inputObj,
      }
    },
    render() {
      return this.genCssCustomizer()
    }
  }
</script>
<style scoped lang="scss">
  .g-css-customizer {

    &-target {
      box-sizing: border-box;
      pointer-events: none;
      position: absolute;
      border-style: solid;
      outline-style: solid;
      background-color: rgba(156, 192, 246, 0.6);
      border-color: rgba(147, 224, 58, 0.6);
      outline-color: rgba(230, 131, 32, 0.6);
    }

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

    &-action {
      &-content {
        flex: none;
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

      &-show {
        position: absolute;
        top: 20px;
        right: 12px;
      }
    }

    &-preview {
      background-color: #f0f0f0;
      padding: 10px;
      border-top: 0;
      border-bottom: 0;
      border-left: 2px solid grey;
      border-right: 2px solid grey;
      /*position: relative;*/

      &-target {
        position: absolute;
        top: 8px;
        right: 260px;
      }
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