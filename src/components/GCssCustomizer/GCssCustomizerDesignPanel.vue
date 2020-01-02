<script>
  import {ref, reactive, computed, watch, set, onMounted} from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GGridSelect from '../GGridSelect/GGridSelect';
  import GColorPicker from '../GColorPicker/GColorPicker';
  import GRow from '../GLayout/GRow';
  import GCheckbox from '../GCheckbox/GCheckbox';
  import GTextField from '../GInput/GTextField';

  export default {
    name: "GCssCustomizerDesignPanel",
    components: {GTextField, GBtn, GIcon, GGridSelect, GColorPicker, GRow, GCheckbox},
    props: {

    },
    setup(props, context) {
      const alignItemList = ref([
        {
          value: 'left',
          icon: 'icon-align_left'
        },
        {
          value: 'center',
          icon: 'icon-align_center_horizontal'
        },
        {
          value: 'right',
          icon: 'icon-align_right'
        },
        {
          value: 'top',
          icon: 'icon-align_top'
        },
        {
          value: 'center-vertical',
          icon: 'icon-align_center_vertical'
        },
        {
          value: 'bottom',
          icon: 'icon-align_bottom'
        },
      ])

      const align = ref('')

      const genAlign = () => {
        const data = {
          scopedSlots: {
            default: ({toggleSelect, item, index}) => {
              return <GBtn flat style="margin-right: 4px; width: 28px; min-width: 12px; height: 28px; padding: 0px 4px;" vOn:click={() => toggleSelect(item)} ripple={false}>
                <GIcon svg size="20">
                  {item.icon}
                </GIcon>
              </GBtn>
            },
            selected: ({toggleSelect, item, index}) => {
              return <GBtn flat style="margin-right: 4px; width: 28px; min-width: 12px; height: 28px; padding: 0px 4px;" vOn:click={() => toggleSelect(item)} backgroundColor="#E0E0E0" ripple={false}>
                <GIcon svg size="20">
                  {item.icon}
                </GIcon>
              </GBtn>
            },
          }
        }

        return <g-grid-select grid={false} items={alignItemList.value} itemText="itemText" itemValue="value" {...data} vModel={align.value}>
        </g-grid-select>
      }

      const genPositionAndSizing = () => {
        return <div class="g-css-customizer-design-panel-position">
          <div style="width: 50%">
            <g-text-field></g-text-field>
          </div>
          <div style="width: 50%">
            <g-text-field></g-text-field>
          </div>
        </div>
      }

      const genDesignPanel = () => {
        return <div class="g-css-customizer-design-panel">
          {genAlign()}
        </div>
      }

      return {
        genDesignPanel,
        align,
      }
    },
    render () {
      return this.genDesignPanel()
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.g-row {
    padding: 0 0 10px 0;
    border-bottom: 1px solid grey;
    justify-content: space-between;
  }

  .g-css-customizer-design-panel {
    &-position {
      display: flex;
      flex-direction: co;
    }
  }
</style>