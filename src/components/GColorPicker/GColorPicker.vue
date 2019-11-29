<script>
  import _ from 'lodash'
  import {reactive} from '@vue/composition-api'
  // slider used in colorPicker/adjustPreview
  import GSlider from '../GSlider/GSlider'
  import GTooltip from '../../components/GTooltip/GTooltip'
  import getSwatchesRenderFn from './swatches'
  import getGradientRenderFn from './gradientColors'
  import getColorPickerRenderFn from './colorPicker'
  import {tabIndexes} from './commonUI';

  export default {
    name: 'GColorPicker',
    components: {GSlider, GTooltip},
    setup(props, context) {
      const colorSelectedHandler = color => context.emit('color', color)
      // color picker require tabState to activate updateCanvas function
      const tabState = reactive({selectedTab: tabIndexes.swatches})
      const renderColorPicker = getColorPickerRenderFn(props, context, tabState, colorSelectedHandler)
      const renderSwatches = getSwatchesRenderFn(colorSelectedHandler)
      const renderGradientColors = getGradientRenderFn(colorSelectedHandler)

      const inactiveTabColor = '#78909c'
      const activeTabColor = '#42A5F5'
      const tabItems = {
        tabs: [{
          id: tabIndexes.swatches,
          title: 'swatches',
          renderFn: renderSwatches,
          bgStyle: {background: inactiveTabColor, borderColor: inactiveTabColor},
          bgSelectedStyle: {background: activeTabColor, borderColor: activeTabColor}
        }, {
          id: tabIndexes.gradient,
          title: 'gradient',
          renderFn: renderGradientColors,
          bgStyle: {background: 'linear-gradient(180deg, #fff, #b0bec5, #78909c)', borderColor: inactiveTabColor},
          bgSelectedStyle: {background: 'linear-gradient(180deg, #fff, #90CAF9, #42A5F5)', borderColor: activeTabColor}
        }, {
          id: tabIndexes.colorPicker,
          title: 'color picker',
          renderFn: renderColorPicker,
          bgStyle: {background: '#fff', borderColor: inactiveTabColor},
          bgSelectedStyle: {background: '#fff', borderColor: activeTabColor}
        }]
      }

      return function renderFn() {
        return (
            <div class='g-color-picker'>
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
		width: 320px;

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
