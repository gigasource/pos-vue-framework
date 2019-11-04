<script>
  import _ from 'lodash'
  import { reactive } from '@vue/composition-api'
  // slider used in colorPicker/adjustPreview
  import GSlider from '../GInput/GSlider'
  import GMenu from '../../components/GMenu/GMenu'
  import GToolTip from '../../components/GToolTip/GToolTip'
  import getSwatchesRenderFn from './swatches'
  import getGradientRenderFn from './gradientColors'
  import getColorPickerRenderFn from './colorPicker'

  export default {
    name: 'GColorPicker',
    components: { GSlider, GMenu, GToolTip },
    props: {
      disabled: Boolean,
      width: {
        type: [String, Number],
        default: 300
      }
    },
    setup(props, context) {
      const emitColor = color => context.emit('input', color)

      // color picker require tabState to activate updateCanvas function
      const tabState = reactive({ selectedTab: 0 })
      const renderColorPicker = getColorPickerRenderFn(props, context, tabState, emitColor)
      const renderSwatches = getSwatchesRenderFn(emitColor)
      const renderGradientColors = getGradientRenderFn(emitColor)

      //
      const deactiveTabColor = '#78909c'
      const activeTabColor = '#42A5F5'
      const tabItems = {
        tabs: [{
          id: 0,
          title: 'swatches',
          renderFn: renderSwatches,
          bgStyle: { background: deactiveTabColor, borderColor: deactiveTabColor },
          bgSelectedStyle: { background: activeTabColor, borderColor: activeTabColor }
        }, {
          id: 1,
          title: 'gradient',
          renderFn: renderGradientColors,
          bgStyle: { background: 'linear-gradient(180deg, #fff, #b0bec5, #78909c)', borderColor: deactiveTabColor },
          bgSelectedStyle: { background: 'linear-gradient(180deg, #fff, #90CAF9, #42A5F5)', borderColor: activeTabColor }
        }, {
          id: 2,
          title: 'color picker',
          renderFn: renderColorPicker,
          bgStyle: { background: '#fff', borderColor: deactiveTabColor },
          bgSelectedStyle: { background: '#fff', borderColor: activeTabColor }
        }]
      }

      //// Color picker dialog
      const dialogState = reactive({ showMenu: false })
      return function renderFn() {
        return (
            <g-menu vModel={dialogState.showMenu}
                    scopedSlots={{ activator: gMenuScope => context.slots.default(gMenuScope) }}
                    minWidth={320}
                    maxWidth={320}
                    contentFillWidth={false}
                    closeOnClick
                    nudgeBottom={10}>
              <div class='g-color-picker__dialog'>
                <div class='g-color-picker__tab-header'>
                  {
                    _.map(tabItems.tabs, item =>
                        <span class={{
                                'g-color-picker__tab-header__item': true,
                                'g-color-picker__tab-header__item--selected': item.id === tabState.selectedTab
                              }}
                              style={item.id === tabState.selectedTab ? item.bgSelectedStyle : item.bgStyle}
                              vOn:click={() => {
                                tabState.selectedTab = item.id
                              }}></span>)
                  }
                </div>
                <div class='g-color-picker__tab-body'>
                  {_.map(tabItems.tabs, item =>
                    <div
                        key={item.id}
                        vShow={item.id === tabState.selectedTab}
                        class='g-color-picker__tab-body__content'>
                      {item.renderFn()}
                    </div>
                  )}
                </div>
              </div>
            </g-menu>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  @import 'swatches';
  @import 'gradientColors';
  @import 'colorPicker';


  .g-color-picker {
    $borderColor: #ccc;
    $tabContentColor: #fff;


    &__tab-header {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid $borderColor;
      background-color: #cfd8dc;
      border-radius: 5px 5px 0 0;

      &__item {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        margin: 10px;
        border: 2px solid #78909c;
        box-sizing: border-box;

        &:hover {
          cursor: pointer;
        }

        &--selected {
          &:before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            bottom: -13px;
            left: 50%;
            transform: translateX(-50%);
            border: 7px solid transparent;
            border-bottom-color: $tabContentColor;
          }
        }
      }
    }

    &__tab-body {
      &__title {
        padding: 10px;
        color: #888;
        font-weight: bold;
        border-bottom: 1px solid $borderColor;
      }

      &__content {
        padding: 0 10px;
        height: 280px;
        overflow: auto;
        background-color: $tabContentColor;
      }
    }
  }


</style>
