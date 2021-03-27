import { ref, reactive, computed, watch, onMounted } from 'vue';
import _ from 'lodash';

export function isRootPath (path) {
  return path === ''
}

export function isSlotPath (path) {
  return path && path.indexOf('slot') > -1
}

export function convertToNormalPath (slotPath) {
  return slotPath.replace(/\.slot\.\d/, '')
}

export function convertToPath (slottedPath) {
  return slottedPath.replace(/slot\.\d\./g, '')
}

export default function GBindingDiagramFactory (props, context, treeData, selectTree, addTree, diagramsData, editorPath) {
  const selectTreeActivePath = computed(() => selectTree.activePath)
  const addTreeActiveSlottedPath = computed(() => addTree.activePath)
  const addTreeActivePath = computed(() => convertToPath(addTreeActiveSlottedPath.value))

  // Init diagrams data
  function initDiagramsData() {
    const allSlotData = []

    for (let slottedPath of addTree.allPaths) {
      const path = convertToPath(slottedPath)
      if (isSlotPath(path)) {
        const pathData = initPathData(path, treeData.value)
        pathData['slottedPath'] = slottedPath
        allSlotData.push(pathData)
      }
    }

    for (let path of selectTree.allPaths) {
      const slotsData = []
      const foreignObjects = []
      const bindingData = getPathBinding(path, treeData.value)
      const slotScopeBinding = getPathSlotScopeBinding(path, treeData.value)
      if (bindingData.length > 0 ) foreignObjects.push({
        path: '',
        top: 20 + foreignObjects.length*250,
        left: 20
      })
      if (slotScopeBinding.length > 0) {
        const properSlotData = _.filter(allSlotData, data => isProperSlotPath(data.slottedPath, path))
        _.forEach(properSlotData, data => {
          const allKeyInData = _.map(data.items, 'key')
          for (let binding of slotScopeBinding) {
            if (allKeyInData.includes(binding.slotScope)) {
              foreignObjects.push({
                path: data.path,
                top: 20 + foreignObjects.length*250,
                left: 20
              })
              return
            }
          }
        })
      }

      for (let slotData of allSlotData) {
        if (path === convertToNormalPath(slotData.path)) slotsData.push(slotData)
      }
      diagramsData.value.push({
        localData: initPathData(path, treeData.value),
        localPosition: {
          top: 20,
          left: 300
        },
        slotsData: slotsData,
        foreignObjects: foreignObjects,
        binding: bindingData,
        slotScopeBinding: slotScopeBinding,
        editorPath: undefined
      })
    }
  }

  onMounted(() => {
    if (treeData.value.metaData === undefined) initDiagramsData()
  })

  // Tree Data extraction functionality
  function getPathName(path, treeData) {
    if (path === '') {
      // Root
      return _.get(treeData, path + 'name')
    } else if (path.indexOf('slot') > -1) {
      // Slot path
      return _.get(treeData, path.replace(/\.slot\.\d/, '.component'))
    }
    return _.get(treeData, path + '.component')
  }

  function getSlotName(slotPath, treeData) {
    const slotGroups = _.groupBy(_.get(treeData, slotPath.replace(/\.slot\.\d/, '.items')), i => i.slot || 'default')
    const slotNames = _.map(slotGroups, (items, slot) => slot)
    return slotNames[slotPath[slotPath.length - 1]]
  }

  function getPathProps(path, treeData) {
    if (path === '' && _.get(treeData, path + 'props.fields')) {
      return _.map(_.get(treeData, path + 'props.fields'), val => ({type: 'prop', key: val.key, default: val.default, show: true}))
    } else if (_.get(treeData, path + '.content.props')) {
      return _.map(_.get(treeData, path + '.content.props'), (val, key) => ({type: 'prop', key: key, default: val, show: true}))
    } else {
      return []
    }
  }

  function getPathEmits(path, treeData) {
    if (_.get(treeData, path + '.content.emits')) {
      return _.map(_.keys(_.get(treeData, path + '.content.emits')), val => ({type: 'emit', key: val, show: true}))
    } else {
      return []
    }
  }

  function getPathSlots(path, treeData) {
    if (path === '') return []
    else if (!_.get(treeData, path + '.items')) return []
    else {
      return _.map(_.uniq(_.map(_.get(treeData, path + '.items'), 'slot')), slot => ({type: 'slot', key: slot || 'default', show: true}))
    }
  }

  function getSlotScopesItems(slotScope) {
    return _.flatten(_.map(slotScope, (val, type) => _.map(_.keys(val), key => ({ type: type, key: key, show: true}))))
  }

  function getPathSlotScopes(path, treeData) {
    if (_.get(treeData, path + '.content.slotScopes')) {
      return _.mapValues(_.get(treeData, path + '.content.slotScopes'), slotScope => getSlotScopesItems(slotScope))
    }
    return {}
  }

  function getPathBinding(path, treeData) {
    if (_.get(treeData, path + '.binding')) return _.get(treeData, path + '.binding')
    return []
  }

  function getPathSlotScopeBinding(path, treeData) {
    if (_.get(treeData, path + '.slotScopeBinding')) return _.get(treeData, path + '.slotScopeBinding')
    return []
  }

  function initPathData(path, treeData) {
    // slot path
    if (isSlotPath(path)) {
      const slotScopes = getPathSlotScopes(convertToNormalPath(path), treeData)
      const slotName = getSlotName(path, treeData)
      return {
        path: path,
        name: getPathName(path, treeData) + ': ' + slotName,
        items: slotScopes[slotName] || [],
      }
    }

    // normal path
    return {
      path: path,
      name: getPathName(path, treeData),
      items: [
        ...getPathProps(path, treeData),
        ...getPathEmits(path, treeData),
        ...getPathSlots(path, treeData)
      ],
      slotScopes: getPathSlotScopes(path, treeData),
    }
  }

  // Diagram Data Extraction functionality
  function getDiagramData (path) {
    const normalPath = convertToNormalPath(path)
    for (let diagramData of diagramsData.value) {
      if (normalPath === diagramData.localData.path) {
        return diagramData
      }
    }
  }

  function getPathData (path) {
    for (let diagramData of diagramsData.value) {
      if (path === diagramData.localData.path) return diagramData.localData
      if (isSlotPath(path) && convertToNormalPath(path) === diagramData.localData.path) {
        for (let slotData of diagramData.slotsData) {
          if (path === slotData.path) return slotData
        }
      }
    }
    return {}
  }

  // Path conversion functionality
  function convertToSlottedPath (path) {
    for (let slottedPath of addTree.allPaths) {
      if (convertToPath(slottedPath) === path) return slottedPath
    }
  }

  function isProperSlotPath(slottedPath, path) {
    return convertToSlottedPath(path).indexOf(slottedPath) > -1
  }

  function isDiagramLocalPath (path, diagramData) {
    return path === diagramData.localData.path;
  }

  function isDiagramForeignPath (path, diagramData) {
    for (let item of diagramData.foreignObjects) {
      if (path === item.path) return true
    }
    return false
  }

  function isDiagramPath (path, diagramData) {
    return isDiagramLocalPath(path, diagramData) || isDiagramForeignPath(path, diagramData)
  }

  // Diagram editing functionality
  function addToDiagram() {
    const diagramData = getDiagramData(selectTreeActivePath.value)
    if (isProperAddPath(addTreeActivePath.value) && !isDiagramPath(addTreeActivePath.value, diagramData)) {
      diagramData.foreignObjects.push({
        path: addTreeActivePath.value,
        top: 20 + diagramData.foreignObjects.length*250,
        left: 20
      })
    }
  }

  const isConnectedGroup = (path, localPath) => {
    const diagramData = getDiagramData(localPath)
    if (isRootPath(path) && diagramData.binding.length > 0) return true
    else if (diagramData.slotScopeBinding.length > 0) {
      for (let item of diagramData.slotScopeBinding) {
        if (path === getSlotPathFromKey(item.slotScope, localPath)) return true
      }
    } else {
      return false
    }
  }

  const removeGroup = (path, localPath, index) => {
    const diagramData = getDiagramData(localPath)
    if (!isConnectedGroup(path, localPath)) diagramData.foreignObjects.splice(index, 1)
  }

  // Connecting functionality
  function connect (startVal, endVal) {
    for (let diagramData of diagramsData.value) {
      if (isDiagramLocalPath(selectTreeActivePath.value, diagramData)) {
        if (endVal.type === 'data' || endVal.type === 'func') {
          diagramData.slotScopeBinding.push({
            type: startVal.type,
            slotScope: endVal.key,
            local: startVal.key
          })
        } else {
          diagramData.binding.push({
            type: startVal.type,
            root: startVal.key,
            local: endVal.key
          })
        }
      }
    }
  }

  function disconnect (startVal, endVal) {
    for (let diagramData of diagramsData.value) {
      if (isDiagramLocalPath(selectTreeActivePath.value, diagramData)) {
        if (endVal.type === 'data' || endVal.type === 'func') {
          diagramData.slotScopeBinding.splice(diagramData.slotScopeBinding.findIndex(connection => connection.type === startVal.type && connection.foreign === startVal.value && connection.local === endVal.value), 1)
        } else {
          diagramData.binding.splice(diagramData.binding.findIndex(connection => connection.type === startVal.type && connection.foreign === startVal.value && connection.local === endVal.value), 1)
        }
      }
    }
  }

  // Item editor functionality
  // Switch editor data according to active diagram
  watch(selectTreeActivePath, newVal => {
    const diagramData = getDiagramData(newVal)
    editorPath.value = diagramData ? diagramData.editorPath : undefined
  })

  // Handle edit event from item group
  function edit(path) {
    getDiagramData(selectTreeActivePath.value).editorPath = path
    editorPath.value = path
  }

  const isItemConnected = (path, index) => {
    const item = getPathData(path).items[index]
    if (isRootPath(path)) {
      return _.filter(_.flatten(_.map(diagramsData.value, 'binding')), val => val.root === item.key).length > 0
    } else if (isSlotPath(path)) {
      return _.filter(_.flatten(_.map(diagramsData.value, 'slotScopeBinding')), val => val.slotScope === item.key).length > 0
    } else {
      const diagramData = getDiagramData(path)
      return _.filter(diagramData.binding, val => val.local === item.key).length > 0 || _.filter(diagramData.slotScopeBinding, val => val.local === item.key).length > 0
    }
  }

  function toggleItem(path, index) {
    if (isItemConnected(path, index)) return
    if (path === undefined || path === null) return
    const normalPath = convertToNormalPath(path)
    for (let diagramData of diagramsData.value) {
      if (normalPath === diagramData.localData.path) {
        if (isSlotPath(path)) {
          for (let slotData of diagramData.slotsData) {
            if (path === slotData.path) {
              slotData.items[index].show = !slotData.items[index].show
            }
          }
        } else {
          diagramData.localData.items[index].show = !diagramData.localData.items[index].show
        }
      }
    }
  }

  function addItem(path, newItem) {
    if (path === undefined || path === null) return
    const normalPath = convertToNormalPath(path)
    for (let diagramData of diagramsData.value) {
      if (normalPath === diagramData.localData.path) {
        if (isSlotPath(path)) {
          for (let slotData of diagramData.slotsData) {
            if (path === slotData.path) {
              slotData.items.push(newItem)
            }
          }
        } else {
          diagramData.localData.items.push(newItem)
        }
      }
    }
  }

  function deleteItem(path, index) {
    if (isItemConnected(path, index)) return
    if (path === undefined || path === null) return
    const normalPath = convertToNormalPath(path)
    for (let diagramData of diagramsData.value) {
      if (normalPath === diagramData.localData.path) {
        if (isSlotPath(path)) {
          for (let slotData of diagramData.slotsData) {
            if (path === slotData.path) {
              slotData.items.splice(index, 1)
            }
          }
        } else {
          diagramData.localData.items.splice(index, 1)
        }
      }
    }
  }

  // Visual functionality
  const allSlotPaths = computed(() => {
    return _.filter(addTree.allPaths, path => isSlotPath(convertToPath(path)))
  })

  const activeProperAddPaths = computed(() => {
    const activeProperSlottedPaths = _.filter(allSlotPaths.value, path => isProperSlotPath(path, selectTreeActivePath.value))
    return ["", ..._.map(activeProperSlottedPaths, path => convertToPath(path))]
  })

  const isProperAddPath = path => activeProperAddPaths.value.includes(path)

  const isConnectedPath = path => {
    const diagramData = getDiagramData(path)
    if (diagramData === undefined) return false
    return diagramData.binding.length > 0 || diagramData.slotScopeBinding.length > 0
  }

  const updatePosition = (path, localPath, top, left) => {
    const diagramData = getDiagramData(localPath)
    if (path === localPath) {
      diagramData.localPosition.top = top
      diagramData.localPosition.left = left
    } else {
      for (let item of diagramData.foreignObjects) {
        if (path === item.path) {
          item.top = top
          item.left = left
        }
      }
    }
  }

  const getPosition = (path, localPath) => {
    const diagramData = getDiagramData(localPath)
    if (path === localPath) {
      return {
        top: diagramData.localPosition.top,
        left: diagramData.localPosition.left,
      }
    } else {
      for (let item of diagramData.foreignObjects) {
        if (path === item.path) {
          return {
            top: item.top,
            left: item.left
          }
        }
      }
    }
  }

  const getSlotPathFromKey = (key, localPath) => {
    const diagramData = getDiagramData(localPath)
    for (let item of diagramData.foreignObjects) {
      const slotData = getPathData(item.path)
      const allKeyInData = _.map(slotData.items, 'key')
      for (let slotKey of allKeyInData) {
        if (key === slotKey) return item.path
      }
    }
  }

  // External functionality
  function saveDiagramsData() {
    !treeData.value.metadata && (treeData.value.metaData = {})
    treeData.value.metaData.diagramsData = diagramsData.value
    treeData.value.metaData.selectTree = selectTree
    treeData.value.metaData.addTree = addTree
  }

  function updateIntoTreeData() {
    for (let diagramData of diagramsData.value) {
      const path = diagramData.localData.path
      let propsData
      let emitsData
      if (isRootPath(path)) {
        const rootProps = treeData.value.props.fields
        _.forEach(diagramData.localData.items, val => {
          for (let item of rootProps) {
            if (item.key === val.key) return
          }
          rootProps.push({
            key: val.key,
            default: val.default
          })
        })
      } else {

        propsData = {}
        emitsData = {}
        _.forEach(diagramData.localData.items, val => {
          if (val.type === 'prop') propsData[val.key] = val.default || ''
          else if (val.type === 'emit') emitsData[val.key] = val.default || ''
        })

        if (diagramData.slotsData.length > 0) {
          const slotScopeData = {}
          _.forEach(diagramData.slotsData, slotData => {
            const data = {}
            const func = {}
            _.forEach(slotData.items, val => {
              if (val.type === 'data') data[val.key] = val.default || ''
              else if (val.type === 'func') func[val.key] = val.default || ''
            })
            slotScopeData[getSlotName(slotData.path, treeData.value)] = {
              data: data,
              func: func
            }
          })
          _.set(treeData.value, path + '.content.slotScopes', slotScopeData)
        }
        _.set(treeData.value, path + '.content.props', propsData)
        _.set(treeData.value, path + '.content.emits', emitsData)
        _.set(treeData.value, path + '.binding', diagramData.binding)
        _.set(treeData.value, path + '.slotScopeBinding', diagramData.slotScopeBinding)
      }
    }
  }

  function close() {
    saveDiagramsData()
    updateIntoTreeData()
    context.emit('close')
  }

  function save() {
    saveDiagramsData()
    updateIntoTreeData()
    context.emit('save')
  }

  function cancel() {
    context.emit('cancel')
  }

  return {
    selectTreeActivePath,
    addTreeActivePath,
    getPathData,
    addToDiagram,
    removeGroup,
    connect,
    disconnect,
    edit,
    toggleItem,
    addItem,
    deleteItem,
    isProperAddPath,
    isConnectedPath,
    getPosition,
    updatePosition,
    getSlotPathFromKey,
    save,
    cancel,
    close
  }
}
