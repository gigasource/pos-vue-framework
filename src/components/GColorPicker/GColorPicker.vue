<script>
  import _ from 'lodash'
  import { ref, reactive, onMounted, computed } from '@vue/composition-api'
  // slider used in colorPicker/adjustPreview
  import GSlider from '../GInput/GSlider'
  // tooltip used in gradientColors & swatches
  import GToolTip from '../GToolTip/GToolTip'
  import GTab from '../GTabs/GTab'
  import GTabs from '../GTabs/GTabs'
  import GTabItems from '../GTabs/GTabItems'
  import GTabItem from '../GTabs/GTabItem'
  import getSwatchesRenderFn from './swatches'
  import getGradientRenderFn from './gradientColors'
  import getColorPickerRenderFn from './colorPicker'
  import detachable from '../../mixins/detachable';

  export default {
    name: 'GColorPicker',
    components: { GTabItem, GTabItems, GTab, GToolTip, GSlider, GTabs },
    props: {
      disabled: Boolean,
      showSwatches: {
        type: Boolean,
        default: false
      },
      showGradient: {
        type: Boolean,
        default: false,
      },
      showColorPicker: {
        type: Boolean,
        default: true
      },
      width: {
        type: [String, Number],
        default: 300
      }
    },
    setup(props, context) {
      const activatorRef = 'activator'
      const colorPickerRef = 'colorPicker'
      const { attachToRoot } = detachable(props, context);

      const state = reactive({
        show: false,
        colorPickerLocation: {
          x: 0,
          y: 0
        }
      })

      let model = ref(null)
      const emitColor = color => context.emit('updatecolor', color)
      const emitSwatches = color => context.emit('updateswatches', color)
      const emitGradient = gradient => context.emit('updategradient', gradient)

      const renderColorPicker = getColorPickerRenderFn(props, context, emitColor)
      const renderSwatches = getSwatchesRenderFn(emitSwatches)
      const renderGradientColors = getGradientRenderFn(emitGradient)

      const tabItems = []
      props.showSwatches && tabItems.push({ title: 'swatches', icon: '#F00', renderFn: renderSwatches })
      props.showGradient && tabItems.push({ title: 'gradient', icon: '#FF0', renderFn: renderGradientColors })
      props.showColorPicker && tabItems.push({ title: 'color picker', icon: '#0F0', renderFn: renderColorPicker })

      onMounted(() => attachToRoot(context.refs[colorPickerRef]))

      const activatorScope = {
        toggleColorPicker: () => {
          state.show = !state.show
          if (state.show) {
            const {bottom, left} = context.refs[activatorRef].getBoundingClientRect()
            state.colorPickerLocation = {
              x: left,
              y: bottom
            }
          }
        }
      }

      const cptColorPickerStyle = computed(() => ({
        position: 'fixed',
        width: '322px',
        border: '1px solid #0009',
        borderBottom: 'none',
        left: `${state.colorPickerLocation.x}px`,
        top: `${state.colorPickerLocation.y}px`
      }))

      return function renderFn() {
        const tabHeaderStyle = {
          width: '30px',
          height: '30px',
          borderRadius: '100%',
          border: '1px solid #0009',
        }

        const tabSlotsObj = {
          tabs: () =>
              tabItems.map((tabItem, i) =>
                  <g-tab item={tabItem}>
                    <div style={ {...tabHeaderStyle, background: tabItem.icon } }></div>
                  </g-tab>)
        }

        return (
            <div class='g-color-picker'
                 style={{ width: `${props.width}px` }}>
              <div ref={activatorRef}>
                {context.slots.default(activatorScope)}
              </div>

              <div vShow={state.show}
                   ref={colorPickerRef}
                   style={cptColorPickerStyle.value}>
                <g-tabs items={tabItems}
                        vModel={model.value}
                        scopedSlots={tabSlotsObj}
                        sliderColor='transparent'>
                  <g-tab-items items={tabItems} vModel={model.value}>
                    {
                      _.map(tabItems, (item, index) =>
                          <g-tab-item key={index} item={item}>
                            <div class='g-color-picker__tab-content'>
                              {item.renderFn()}
                            </div>
                          </g-tab-item>
                      )
                    }
                  </g-tab-items>
                </g-tabs>
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

  .g-color-picker__tab-content {
    /*margin-top: 20px; !*g-tabs issue work-around*!*/
    width: 322px;
    padding: 20px 10px;
    border: 1px solid #0009;
    border-top: none;
    border-radius: 0px 0px 5px 5px;
  }
</style>
