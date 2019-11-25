<script>
  import _ from 'lodash'
  import { reactive } from '@vue/composition-api'
  // slider used in colorPicker/adjustPreview
  import GSlider from '../GSliderRemake/GSlider'
  import GMenu from '../../components/GMenu/GMenu'
  import GToolTip from '../../components/GToolTip/GToolTip'
  import getSwatchesRenderFn from './swatches'
  import getGradientRenderFn from './gradientColors'
  import getColorPickerRenderFn from './colorPicker'
  import { tabIndexes } from './commonUI';
  import GTextField from '../GInput/GTextField';

  GMenu.components['GTextField'] = GTextField

  export default {
    name: 'GColorPicker',
    components: { GTextField, GSlider, GMenu, GToolTip },
    props: {
      disabled: Boolean,
      width: {
        type: [String, Number],
        default: 300
      },
      label: String,
    },
    setup(props, context) {
      const state = reactive({
        value: null,
        showMenu: false
      })
      const colorSelectedHandler = color => {
        if (color.angle) {
          state.value = `linear-gradient(${color.angle}, ${color.colorStop1}, ${color.colorStop2})`
        } else if (color.value) {
          state.value = color.value
        } else {
          state.value = color
        }
        state.showMenu = false
      }
      // color picker require tabState to activate updateCanvas function
      const tabState = reactive({ selectedTab: tabIndexes.swatches })
      const renderColorPicker = getColorPickerRenderFn(props, context, tabState, colorSelectedHandler)
      const renderSwatches = getSwatchesRenderFn(colorSelectedHandler)
      const renderGradientColors = getGradientRenderFn(colorSelectedHandler)

      //
      const deactiveTabColor = '#78909c'
      const activeTabColor = '#42A5F5'
      const tabItems = {
        tabs: [{
          id: tabIndexes.swatches,
          title: 'swatches',
          renderFn: renderSwatches,
          bgStyle: { background: deactiveTabColor, borderColor: deactiveTabColor },
          bgSelectedStyle: { background: activeTabColor, borderColor: activeTabColor }
        }, {
          id: tabIndexes.gradient,
          title: 'gradient',
          renderFn: renderGradientColors,
          bgStyle: { background: 'linear-gradient(180deg, #fff, #b0bec5, #78909c)', borderColor: deactiveTabColor },
          bgSelectedStyle: { background: 'linear-gradient(180deg, #fff, #90CAF9, #42A5F5)', borderColor: activeTabColor }
        }, {
          id: tabIndexes.colorPicker,
          title: 'color picker',
          renderFn: renderColorPicker,
          bgStyle: { background: '#fff', borderColor: deactiveTabColor },
          bgSelectedStyle: { background: '#fff', borderColor: activeTabColor }
        }]
      }

      //// Color picker dialog
      const previewStyle = {
        width: '30px',
        height: '20px',
        margin: '16px 0px 24px -40px',
        border: '1px solid #0003'
      }

      return function renderFn() {
        return (
            <g-menu value={state.showMenu} vOn:input={v => state.showMenu = v}
                    scopedSlots={{ activator: gMenuScope =>
                          <div style='display: flex; align-items: center;'>
                            <g-text-field
                                label={props.label}
                                value={state.value}
                                prependIcon="fas fa-palette"
                                vOn:click={gMenuScope.toggleContent}/>
                            <span style={{...previewStyle, background: state.value}}></span>
                          </div>
                    }}
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
                              vOn:click={() => tabState.selectedTab = item.id}>
                        </span>)
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
  @import 'colorPicker';

  .g-color-picker {
    $tabContentBgColor: #fff;

    &__tab-header {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #ccc;
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
            border-bottom-color: $tabContentBgColor;
          }
        }
      }
    }

    &__tab-body {
      &__content {
        padding: 0 10px;
        height: 310px;
        overflow: auto;
        background-color: $tabContentBgColor;
      }
    }
  }
</style>
