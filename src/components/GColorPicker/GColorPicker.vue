<script>
  import _ from 'lodash'
  import { reactive, onMounted, computed } from '@vue/composition-api'
  // slider used in colorPicker/adjustPreview
  import GSlider from '../GInput/GSlider'
  import getSwatchesRenderFn from './swatches'
  import getGradientRenderFn from './gradientColors'
  import getColorPickerRenderFn from './colorPicker'
  import detachable from '../../mixins/detachable'

  export default {
    name: 'GColorPicker',
    components: { GSlider },
    props: {
      disabled: Boolean,
      width: {
        type: [String, Number],
        default: 300
      }
    },
    setup(props, context) {
      const emitColor = color => context.emit('updatecolor', color)
      const renderColorPicker = getColorPickerRenderFn(props, context, emitColor)
      const renderSwatches = getSwatchesRenderFn(emitColor)
      const renderGradientColors = getGradientRenderFn(emitColor)

      //
      const colorPickerRef = 'content'
      const { attachToRoot } = detachable(props, context)
      onMounted(() => attachToRoot(context.refs[colorPickerRef]))

      const activatorRef = 'activator'
      const activatorScope = {
        toggleColorPicker: () => {
          state.show = !state.show
          if (!state.show) return
          const { bottom, left } = context.refs[activatorRef].getBoundingClientRect()
          state.colorPickerLocation = { x: left, y: bottom + 10 }
        }
      }

      //
      const deactiveTabColor = '#78909c'
      const activeTabColor = '#42A5F5'
      const state = reactive({
        show: false,
        colorPickerLocation: {
          x: 0,
          y: 0
        },
        tabs: [{
          id: 0,
          title: 'swatches',
          bgStyle: {
            background: deactiveTabColor,
            borderColor: deactiveTabColor
          },
          bgSelectedStyle: {
            background: activeTabColor,
            borderColor: activeTabColor
          },
          renderFn: renderSwatches
        }, {
          id: 1,
          title: 'gradient',
          bgStyle: {
            background: 'linear-gradient(180deg, #fff, #b0bec5, #78909c)',
            borderColor: deactiveTabColor
          },
          bgSelectedStyle: {
            background: 'linear-gradient(180deg, #fff, #90CAF9, #42A5F5)',
            borderColor: activeTabColor
          },
          renderFn: renderGradientColors
        }, {
          id: 2,
          title: 'color picker',
          bgStyle: {
            background: '#fff',
            borderColor: deactiveTabColor
          },
          bgSelectedStyle: {
            background: '#fff',
            borderColor: activeTabColor
          },
          renderFn: renderColorPicker
        }],
        selectedTab: 0
      })

      const cptDialogPosition = computed(() => ({
        left: `${state.colorPickerLocation.x}px`,
        top: `${state.colorPickerLocation.y}px`
      }))

      return function renderFn() {
        return (
            <div class='g-color-picker' style={{ width: `${props.width}px` }}>
              <div ref={activatorRef}>
                {context.slots.default(activatorScope)}
              </div>

              <div vShow={state.show}
                   ref={colorPickerRef}
                   class='g-color-picker__dialog'
                   style={cptDialogPosition.value}>
                <div class="g-color-picker__tab-header">
                  {
                    _.map(state.tabs, item =>
                        <span class={{
                                'g-color-picker__tab-header__item': true,
                                'g-color-picker__tab-header__item--selected': item.id === state.selectedTab
                              }}
                              style={item.id === state.selectedTab ? item.bgSelectedStyle : item.bgStyle}
                              vOn:click={() => {
                                state.selectedTab = item.id
                              }}></span>)
                  }
                </div>
                <div class='g-color-picker__tab-content'>
                  {_.map(state.tabs, item => item.id === state.selectedTab && [
                    <div class='g-color-picker__tab-content__title'>{item.title.toUpperCase()}</div>,
                    item.renderFn()
                  ])}
                </div>
              </div>
            </div>
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

    &__dialog {
      position: fixed;
      width: 322px;
      border-radius: 8px;
      border: 1px solid $borderColor;
    }

    &__tab-header {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid $borderColor;
      background-color: #cfd8dc;

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

    &__tab-content {
      padding: 10px;
      width: 320px;
      background-color: $tabContentColor;

      &__title {
        padding: 10px 0;
        color: #888;
        font-weight: bold;
      }
    }
  }


</style>
