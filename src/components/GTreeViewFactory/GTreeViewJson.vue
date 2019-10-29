<script>
  import { computed } from '@vue/composition-api';
  import GTreeFactory, { genTextFactory } from './GTreeFactory';
  import GIcon from '../GIcon/GIcon';
  import { getPropsNameAZPrimitiveFirst } from './util'


  export default {
    name: 'GTreeViewJson',
    components: { GIcon },
    props: {
      expandLevel: {
        type: Number,
        default: 100
      },
      data: [Object, Array],
      itemText: [Function, String]
    },
    setup(props, context) {
      // TODO:
      //  + Complete Playground: Computed props expand level doesn't work
      //  + Adjust icon position
      //  + Test cases

      // Render itemText
      function getValueClass(text) {
        switch (text.valueType) {
          case 'array':
            return 'g-tree-view__item-value-array'
          case 'string':
            return 'g-tree-view__item-value-string'
          default:
            return 'g-tree-view__item-value-' + typeof (text.value)
        }
      }

      function formatTextValue(text) {
        switch (text.valueType) {
          case 'string':
            return `"${text.value}"`
          case 'array' :
            return `Array (${text.value.length})`
          case 'boolean':
            return text.value ? 'true' : 'false'
          case 'function':
            return text.value.toString()
          default:
            return text.value
        }
      }

      function genValueNode(text) {
        if (text.valueType === 'skip') return null
        if (text.valueType === 'object') {
          return [
            <span class='g-tree-view__item-value-object'>Object &#123; </span>,
            text.value.outputValues.map(outputValue => [
                  <span class="g-tree-view__item-var-name">{outputValue.varName}</span>,
                  <span class='g-tree-view__item-separate-symbol'>: </span>,
                  genValueNode(outputValue),
                  <span class='g-tree-view__item-separate-symbol'>, </span>
                ]
            ),
            text.value.moreSymbol ? <span class='g-tree-view__item-separate-symbol'>...</span> : undefined,
            <span class='g-tree-view__item-value-object'> &#125;</span>
          ]
        } else {
          return <span class={getValueClass(text)}>{formatTextValue(text)}</span>
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
            break;
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
            nodeDescription = { varName: 'result', valueType: 'null', value: 'null' }
          } else if (Array.isArray(node)) {
            nodeDescription = { varName: 'result', valueType: 'array', value: node }
          } else if (typeof(node) === 'object') {
            nodeDescription = { varName: 'result', valueType: 'object', value: jsonStringifyReplacer(node) }
          } else {
            nodeDescription = { varName: 'result', value: node, valueType: typeof node }
          }
        } else {
          if (typeof node === 'object') {
            const firstPropName = Object.keys(node)[0];
            const firstPropValue = node[firstPropName];
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

        return [
          <span class='g-tree-view__item-icon-wrapper'>
            {
              nodeDescription.valueType === 'object'
                  ? <g-icon small color="orange">reorder</g-icon>
                  : nodeDescription.valueType === 'array'
                  ? <g-icon small color="blue">list</g-icon>
                  : <g-icon small color="blue">local_atm</g-icon>
            }
          </span>,
          nodeDescription.varName ?
              [<span class="g-tree-view__item-var-name">{nodeDescription.varName}</span>,
                <span class='g-tree-view__item-separate-symbol'> = </span>]
              : undefined,
          genValueNode(nodeDescription)
        ]
      })

      const genNode = function (node, text /*result generated by itemText function*/, childrenVNodes, isLast, state, path) {
        return <li>
          {
            childrenVNodes
                ? <span class='g-tree-view__collapse-expand' vOn:click={() => state.collapse = !state.collapse}>
                  <span>
                    {state.collapse ? <g-icon small color="red">chevron_right</g-icon> : <g-icon small color="red">expand_more</g-icon>}
                  </span>
                </span>
                : <span class='g-tree-view__primitive-item'></span>
          }
          {text}

          {!state.collapse ? childrenVNodes : null}
        </li>
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

      const itemChildren = (node, isRoot) => {
        if (Array.isArray(node)) {
          return node
        } else if (typeof node === 'object') {
          const converter = node => Object.keys(node).map(k => ({ [k]: node[k] }))
          const firstPropValue = node[Object.keys(node)[0]];

          if (isRoot) {
            return converter(node)
          } else if (Array.isArray(firstPropValue)) {
            return firstPropValue.map((item, index) => {
              if (typeof item === 'object') return ({ [index]: item });
              return item;
            });
          } else if (firstPropValue === null) {
            return null;
          } else if (typeof firstPropValue === 'object') {
            return converter(firstPropValue);
          } else {
            return firstPropValue;
          }
        } else {
          // primitive
          return node;
        }
      }

      // TODO: Correct the algorithm
      // const converter = node => Object.keys(node).map(k => ({ [k]: node[k], __primitive: true }))
      // const itemChildren = (node) => {
      //   if (Array.isArray(node)) {
      //     return node
      //   } else if (typeof node === 'object') {
      //     if (node.__primitive) {
      //       return node[Object.keys(node)[0]]
      //     }
      //     else {
      //       return converter(node)
      //     }
      //   } else {
      //     return node;
      //   }
      // }

      const cptExpandLevel = computed(() => props.expandLevel)
      const { treeStates, genTree } = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
        data: props.data,
        itemText,
        itemChildren,
        cptExpandLevel
      })
      return { treeStates, genTree }
    },
    render() {
      return this.genTree();
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
      &-icon-wrapper {
        width: 20px;
      }

      &-var-name {
        color: rgb(246, 123, 121);
      }

      &-separate-symbol {
        color: rgb(168, 168, 168);
      }

      &-value {
        &-function {
          color: rgb(150, 125, 82);
        }

        &-string {
          color: rgb(185, 125, 82);
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

    &__primitive-item {
      display: inline-block;
      width: 15px;
    }

    &__collapse-expand {
      display: inline-block;
      width: 15px;
      alignment: center;
      cursor: pointer;

      span {
        width: 5px;
        height: 5px;
      }
    }
  }

</style>
