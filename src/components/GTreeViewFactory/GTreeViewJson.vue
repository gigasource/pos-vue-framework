<script>
  import { computed } from '@vue/composition-api';
  import { getPropsNameAZPrimitiveFirst } from './util'
  import GTreeFactory from './GTreeFactory';
  import GIcon from '../GIcon/GIcon';


  export default {
    name: 'GTreeViewJson',
    components: { GIcon },
    props: {
      expandLevel: {
        type: Number,
        default: 100
      },
      data: [Object, Array],
      itemText: [Function, String],
      // coloring

    },
    setup(props, context) {
      // TODO:
      //  + Complete Playground: Computed props expand level doesn't work
      //  + Test cases

      //// Render itemText
      // Get corresponding class of a value to display in a line
      // Note that this method is not designed to be used by 'object' nodeDesc
      // Instead, each prop of an object nodeDesc will use this method to get corresponding class
      function getNodeClass(nodeDesc) {
        let outputClass = 'g-tree-view__item-value-'
        if (nodeClassFromValueType.indexOf(nodeDesc.valueType) >= 0)
          outputClass += nodeDesc.valueType
        else
          outputClass += typeof (nodeDesc.value)
        return outputClass
      }
      const nodeClassFromValueType = ['array', 'null', 'function']

      // Format displayed text value of a node
      // NOTE THAT, this method is not designed to be used by 'object' nodeDesc
      // Instead, each prop of an Object nodeDesc will use this method to format value
      function getFormattedNodeContent(nodeDesc) {
        switch (nodeDesc.valueType) {
          case 'string':
            return `"${nodeDesc.value}"`
          case 'array' :
            return `Array (${nodeDesc.value.length})`
          case 'boolean':
            return nodeDesc.value ? 'true' : 'false'
          case 'function':
            return 'function'
          case 'null':
            return 'null'
          case 'number': // we can round the number in this place, etc... by default, just return its value
          default:
            return nodeDesc.value
        }
      }

      function genValueNode(nodeDesc) {
        if (nodeDesc.valueType === 'skip') return null
        if (nodeDesc.valueType === 'object') {
          return [
            <span class='g-tree-view__item-value-object'>Object &#123;&nbsp;</span>,
            nodeDesc.value.outputValues.map(outputValue => [
                  <span class="g-tree-view__item-var-name">{outputValue.varName}</span>,
                  <span class='g-tree-view__item-separate-symbol'>:&nbsp;</span>,
                  genValueNode(outputValue),
                  <span class='g-tree-view__item-separate-symbol'>,&nbsp;</span>
                ]
            ),
            nodeDesc.value.moreSymbol ? <span class='g-tree-view__item-separate-symbol'>...</span> : undefined,
            <span class='g-tree-view__item-value-object'> &#125;</span>
          ]
        } else {
          return <span class={getNodeClass(nodeDesc)}>{getFormattedNodeContent(nodeDesc)}</span>
        }
      }

      function createValueDesc(name, value, type) {
        return { varName: name, value: value, valueType: type }
      }

      function jsonStringifyReplacer(object) {
        const outputValues = []
        let moreSymbol = false

        const allKeyOrdered = getPropsNameAZPrimitiveFirst(object)
        for (let index = 0; index < allKeyOrdered.length; index++) {
          let key = allKeyOrdered[index]
          let val = object[key]
          let typeOfVal = typeof val

          // only add primitive value
          // skip if value is object, array
          let valDesc
          if (typeOfVal !== 'object') {
            // cut the string if it's length too long
            if (typeOfVal === 'string' && val.length > 50) {
              valDesc = createValueDesc(key, val.substr(0, 20) + '...' + val.substr(val.length - 1 - 20), typeOfVal)
            } else if (typeOfVal === 'function') {
              valDesc = createValueDesc(key, 'function(...){...}', typeOfVal)
            } else {
              valDesc = createValueDesc(key, val, typeOfVal)
            }
          } else {
            valDesc = createValueDesc(key, null, 'skip')
          }

          outputValues.push(valDesc)

          if (index === 5) {
            moreSymbol = true
            break
          }
        }

        return {
          outputValues,
          moreSymbol
        }
      }

      const itemText = props.itemText || ((node, isRoot) => {
        let nodeDescription;
        if (isRoot) {
          if (node == undefined) {
            nodeDescription = { varName: 'Result', valueType: 'null', value: 'null' }
          } else if (Array.isArray(node)) {
            nodeDescription = { varName: 'Result', valueType: 'array', value: node }
          } else if (typeof (node) === 'object') {
            nodeDescription = { varName: 'Result', valueType: 'object', value: jsonStringifyReplacer(node) }
          } else {
            nodeDescription = { varName: 'Result', value: node, valueType: typeof node }
          }
        } else {
          if (typeof node === 'object') {
            const firstPropName = Object.keys(node)[0]
            const firstPropValue = node[firstPropName]
            if (Array.isArray(firstPropValue)) {
              nodeDescription = { varName: firstPropName, valueType: 'array', value: firstPropValue }
            } else if (firstPropValue === null) {
              nodeDescription = { varName: firstPropName, valueType: 'null', value: 'null' }
            } else if (typeof firstPropValue === 'object') {
              nodeDescription = { varName: firstPropName, valueType: 'object', value: jsonStringifyReplacer(firstPropValue) }
            } else {
              nodeDescription = { varName: firstPropName, value: firstPropValue, valueType: typeof firstPropValue }
            }
          } else {
            nodeDescription = { value: node, valueType: typeof node }
          }
        }

        // render list item ([icon] [varName] = [ValueNode])
        return [
          nodeDescription.valueType === 'object'
              ? <g-icon small color="orange">reorder</g-icon>
              : nodeDescription.valueType === 'array'
              ? <g-icon small color="blue">list</g-icon>
              : <g-icon small color="blue">local_atm</g-icon>,
          <span>&nbsp;</span>,
          nodeDescription.varName ?
              [<span class="g-tree-view__item-var-name">{nodeDescription.varName}</span>,
                <span class='g-tree-view__item-separate-symbol'>&nbsp;=&nbsp;</span>]
              : undefined,
          genValueNode(nodeDescription)
        ]
      })
      //text: result generated by itemText function
      const genNode = function ({node, text , childrenVNodes, isLast, state, path}) {
        return (
            <li>
              <span class={['g-tree-view__item', { 'g-tree-view__item--expandable': childrenVNodes != null }]}
                    vOn:click={() => childrenVNodes && (state.collapse = !state.collapse)}>
                {
                  childrenVNodes
                      ? <g-icon small color="red"> {state.collapse ? 'chevron_right' : 'expand_more'}</g-icon>
                      : <span style='display: inline-block; width: 15px;'></span>
                }
                {text}
              </span>
              {!state.collapse ? childrenVNodes : null}
            </li>
        )
      }
      const genWrapper = function (childrenVNodes) {
        return <ul>{childrenVNodes}</ul>
      }
      const genRootWrapper = function (childrenVNodes) {
        return (
            <div root>
              <ul>{childrenVNodes}</ul>
            </div>
        )
      }

      const itemChildren = (node, {isRoot}) => {
        if (Array.isArray(node)) {
          return node
        } else if (typeof node === 'object') {
          const converter = node => Object.keys(node).map(k => ({ [k]: node[k] }))
          const firstPropValue = node[Object.keys(node)[0]];

          if (isRoot) {
            return converter(node)
          } else if (Array.isArray(firstPropValue)) {
            return firstPropValue.map((item, index) => {
              if (typeof item === 'object')
                return ({ [index]: item })
              return item
            })
          } else if (firstPropValue === null) {
            return null
          } else if (typeof firstPropValue === 'object') {
            return converter(firstPropValue);
          } else {
            return firstPropValue
          }
        } else {
          return node // primitive
        }
      }

      const itemPath = function (node, { key, path, isRoot }) {
        const firstPropKey = Object.keys(node)[0];
        if (isRoot) return key;
				if (typeof node !== 'object') return key;
        return firstPropKey;
      }

      const { treeStates, genTree } = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
        data: props.data,
        itemText,
				itemPath,
        itemChildren,
        expandLevel: props.expandLevel
      })

      return { treeStates, genTree }
    },
    render() {
      return this.genTree()
    }
  }


</script>
<style scoped lang="scss">
  ul {
    list-style-type: none;
    padding-left: 20px;
  }

  .g-tree-view {
    &__item {
      display: flex;
      align-items: center;

      &--expandable {
        cursor: pointer;
      }

      &:hover {
        background-color: #ddd;
      }

      &-icon-wrapper {
        width: 20px;
      }

      &-var-name {
        color: rgb(123, 49, 49);
      }

      &-separate-symbol {
        color: rgb(168, 168, 168);
      }

      &-value {
        &-function {
          color: rgb(109, 109, 109);
        }

        &-string {
          color: rgb(185, 125, 82);
        }

        &-null {
          color: rgb(17, 0, 113);
        }

        &-boolean {
          color: rgb(69, 133, 206);
        }

        &-number {
          color: #268e0e;
        }

        &-array {
          color: rgb(168, 168, 168);
        }

        &-object {
          color: rgb(109, 109, 109);
        }
      }
    }

    &__collapse-expand {
      display: inline-block;
      cursor: pointer;
      width: 15px;
    }
  }

</style>
