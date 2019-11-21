<script>
  import GList from "../../components/GList/GList";
  import { GListItemAction } from "../../components/GList/GListFunctionalComponent"
  export default {
    name: 'GListCustom',
    components: {GList, GListItemAction},
    props: {
      height: String,
      width: String,
      disabled: Boolean,
      rounded: Boolean,
      shaped: Boolean,
      elevation: {
        type: [Number, String],
        default: 2,
      },
      dense: Boolean,
      nav: Boolean,
      items: Array,
      multiSection: Boolean,
      subheader: String,
      divider: {
        type: [Boolean, String],
        default: false,
      },
      prependType: {
        type: String,
        default: 'icon',
      },
      subtitleWrap: Boolean,
      value: [String, Object, Number, Array],
      selectable: Boolean,
      multiple: Boolean,
      mandatory: Boolean,
      allowDuplicates: Boolean,
      itemValue: String,
      itemTitle: {
        type: String,
        default: 'title'
      }
    },
    setup(props, context) {
      return () => (
          <g-list {...{
            props,
            scopedSlots: {
              append: ({item, index}) => (
                  <g-list-item-action class="g-list-item-action" item={item}>{item.append}</g-list-item-action>
              )
            }
          }
          }>
          </g-list>
      )
    }
  }
</script>

<style lang="scss" scoped>
  .g-list {
    padding: 0;
    border: 1px solid #D1D1D1;
    border-radius: 4px;
  }

  ::v-deep .g-list-item-content {
    margin-left: 0;
    align-self: flex-start;
  }

  ::v-deep .g-list-item-action {
    margin: 0 0 0 16px;
    align-self: flex-start;
  }

  ::v-deep .g-list-item {
    padding: 18px 26px 18px 26px;
  }

  ::v-deep .g-list-header {
    padding: 0 0 0 26px;
    font-family: "Muli" , sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;
    color: #1D1D26;
    background: #D8D8D8;
    border-radius: 3px 3px 0 0;
    align-items: center;
  }
</style>
