<script>
import GTabs from "../../components/GTabs/GTabs";
import GTabItem from "../../components/GTabs/GTabItem";
import GTab from "../../components/GTabs/GTab";
import getVModel from "../../mixins/getVModel";

export default {
  name: 'IosTab',
  components: {GTab, GTabItem, GTabs},
  props: {
    items: Array,
    value: null,
    color: String,
    textColor: String,
    grow: Boolean,
    sliderColor: String,
    sliderSize: {
      type: [Number, String],
      default: 2
    },
    vertical: Boolean,
    right: Boolean,
    center: Boolean,
    centerActive: Boolean,
    icon: Boolean,
    alignWithTitle: Boolean
  },
  setup(props, context) {
    const model = getVModel(props, context);
    const gTabItems = () => props.items.map((item, index) => {
      return (
        <g-tab-item key={index} item={item}>
          {item.title}
        </g-tab-item>
      )
    });

    return () => (
      <g-tabs {
        ...{
          props: {
            ...props,
            showSlider: false
          },
          on: {
            input(e) {
              model.value = e
            }
          },
          scopedSlots: {
            tab: ({item, index}) => (
                <g-tab item={item} key={index}>{item.title}</g-tab>
            )
          }
        }
      }
      >

        {context.slots.default ? context.slots.default() : gTabItems()}
      </g-tabs>
    )
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/colors";
  @import "../../style/variables";
  /*.g-tabs-wrapper {*/
  /*  align-items: center;*/
  /*}*/
  ::v-deep .g-tabs-bar {
    mix-blend-mode: normal;
    width: 260px;
    min-height: 32px;
    border-radius: 29px;
    font-family: "Muli", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
  }
  ::v-deep .g-tab {
    flex-basis: 100%;
    border-radius: 29px;
    text-transform: none;
    &:hover:before {
      opacity: 0;
    }
    &:not(.g-tab__active):not(.g-tab__disabled) {
      color: color("grey", "base");
      opacity: 1;
    }
    &__active {
      background-color: #1271FF;
    }
  }
</style>
