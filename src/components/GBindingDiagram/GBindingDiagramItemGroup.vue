<script>
import _ from 'lodash'
import {ref, computed, provide, inject, onMounted} from 'vue';
import GBindingDiagramItem from './GBindingDiagramItem';
import {convertToUnit, genScopeId} from '../../utils/helpers';
import {isSlotPath} from './GBindingDiagramFactory';
import GBtn from '../GBtn/GBtn';
import GIcon from '../GIcon/GIcon';
import GConnector from '../GConnector/GConnector';

export default {
  name: 'GBindingDiagramItemGroup',
  components: {GBindingDiagramItem, GBtn, GIcon, GConnector},
  props: {
    path: String,
    localPath: String,
    binding: {
      type: Array,
      default: () => []
    },

    slotScopeBinding: {
      type: Array,
      default: () => []
    },

    top: {
      type: [Number, String],
      default: 0
    },
    left: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ['dragStart', 'edit', 'connected', 'disconnect', 'removeGroup'],
  setup(props, context) {
    const itemZIndex = inject('itemZIndex')
    const getPathData = inject('getPathData')
    const updatePosition = inject('updatePosition')
    const getPosition = inject('getPosition')
    const getSlotPathFromKey = inject('getSlotPathFromKey')

    const model = getPathData(props.path)

    // Initial binding draw
    const connectionPoints = inject('connectionPoint')
    const initConnections = ref([])

    provide('initConnections', initConnections)

    onMounted(() => {
      setTimeout(() => {
        if (props.binding.length > 0) {
          _.forEach(props.binding, item => {
            const startGroupPosition = getPosition(props.path, props.localPath)
            const endGroupPosition = getPosition(props.localPath, props.localPath)
            let startPoint
            let endPoint
            if (startGroupPosition.left < endGroupPosition.left) {
              startPoint = _.find(connectionPoints.value, point => {
                return point.position === 'right' && point.value.path === props.path && point.value.type === 'prop' && point.value.key === item.root
              })
              endPoint = _.find(connectionPoints.value, point => {
                return point.position === 'left' && point.value.path === props.localPath && point.value.type === 'prop' && point.value.key === item.local
              })
            } else {
              startPoint = _.find(connectionPoints.value, point => {
                return point.position === 'left' && point.value.path === props.path && point.value.type === 'prop' && point.value.key === item.root
              })
              endPoint = _.find(connectionPoints.value, point => {
                return point.position === 'right' && point.value.path === props.localPath && point.value.type === 'prop' && point.value.key === item.local
              })
            }
            initConnections.value.push({startPoint: startPoint, endPoint: endPoint})
          })
        }
        if (props.slotScopeBinding.length > 0) {
          _.forEach(props.slotScopeBinding, item => {
            const startGroupPosition = getPosition(props.localPath, props.localPath)
            const endGroupPosition = getPosition(getSlotPathFromKey(item.slotScope, props.localPath), props.localPath)
            let startPoint
            let endPoint
            if (startGroupPosition.left < endGroupPosition.left) {
              startPoint = _.find(connectionPoints.value, point => {
                return point.position === 'right' && point.value.path === props.localPath && point.value.type === item.type && point.value.key === item.local
              })
              endPoint = _.find(connectionPoints.value, point => {
                return point.position === 'left' && isSlotPath(point.value.path) && point.value.key === item.slotScope
              })
            } else {
              startPoint = _.find(connectionPoints.value, point => {
                return point.position === 'left' && point.value.path === props.localPath && point.value.type === item.type && point.value.key === item.local
              })
              endPoint = _.find(connectionPoints.value, point => {
                return point.position === 'right' && isSlotPath(point.value.path) && point.value.key === item.slotScope
              })
            }
            initConnections.value.push({startPoint: startPoint, endPoint: endPoint})
          })
        }
      }, 200)
    })


    const onMousedown = function (e) {
      itemZIndex.value++
      e.currentTarget.style.zIndex = itemZIndex.value
      if (e.target.classList.contains('g-icon') || e.target.classList.contains('g-btn')) return
      context.emit('edit', model.path)
      context.emit('dragStart', e)
    }

    function connect(startVal, endVal) {
      context.emit('connected', startVal, endVal)
    }

    function disconnect(startVal, endVal) {
      context.emit('disconnected', startVal, endVal)
    }

    const group = ref();

    function dragEnd() {
      const top = parseInt(window.getComputedStyle(group.value).getPropertyValue('top'))
      const left = parseInt(window.getComputedStyle(group.value).getPropertyValue('left'))
      updatePosition(props.path, props.localPath, top, left)
    }

    const styles = computed(() => ({
      top: convertToUnit(props.top),
      left: convertToUnit(props.left)
    }))

    const genRemoveButton = () => {
      return <g-btn icon small onClick={() => context.emit('removeGroup', props.path, props.localPath)}>
        <g-icon color="red" size="16">fas fa-times-circle</g-icon>
      </g-btn>
    }

    const genBindingDiagramItemGroup = () => {
      return <div class="g-binding-item-group b-grey" style={styles.value} onMousedown={onMousedown} ref={group}>
        <div class="g-binding-item-group-header">
          {model.name}
          {props.path !== props.localPath && genRemoveButton()}
        </div>
        {model.items.map((item, index) => {
          return <g-binding-diagram-item value={item}
                                         path={model.path}
                                         onConnected={connect}
                                         onDisconnected={disconnect}
                                         onDragEnd={dragEnd}
                                         key={`${item.type}_${item.key}_${props.path}_${props.localPath}`}/>
        })}
      </div>
    }
    return {
      genBindingDiagramItemGroup: genScopeId(genBindingDiagramItemGroup),
      initConnections,
      connectionPoints
    }
  },
  render() {
    return this.genBindingDiagramItemGroup()
  }
}
</script>
<style scoped lang="scss">
.g-binding-item-group {
  position: absolute;
  background-color: white;
  //top: 20px;
  //left: 20px;
  display: flex;
  flex-direction: column;
  padding: 3px 6px;
  border: 1px solid;
  border-radius: 6px;
  width: 200px;

  &-header {
    display: flex;
    justify-content: space-between;
  }
}

.g-binding-diagram-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  border: 1px solid;
  border-radius: 6px;
  padding: 10px;
  margin: 3px 0;
  font-size: 14px;

  &-type {
    padding: 2px;
    border-radius: 4px;
    font-size: 10px;
    color: white;
  }
}
</style>
