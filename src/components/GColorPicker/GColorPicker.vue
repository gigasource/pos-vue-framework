<script>
  import _ from 'lodash'
  import { ref } from '@vue/composition-api'
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

  export default {
    name: 'GColorPicker',
    components: { GTabItem, GTabItems, GTab, GToolTip, GSlider, GTabs },
    props: {
      disabled: Boolean,
      width: {
        type: [String, Number],
        default: 300
      }
    },
    setup(props, context) {
      let model = ref(null)
      const emitColor = color => context.emit('update:color', color)
      const emitGradient = gradient => context.emit('update:gradient', gradient)

      const renderColorPicker = getColorPickerRenderFn(props, context, emitColor)
      const renderSwatches = getSwatchesRenderFn(colorModel => emitColor(colorModel.value))
      const renderGradientColors = getGradientRenderFn(emitGradient)

      const tabItems = [
        { title: 'swatches', renderFn: renderSwatches },
        { title: 'gradient', renderFn: renderGradientColors },
        { title: 'color picker', renderFn: renderColorPicker }
      ]

      return function renderFn() {
        return (
            <div class='g-color-picker' style={{ width: `${props.width}px` }}>
              <g-tabs items={tabItems} vModel={model.value} sliderSize={2}>
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
    margin-top: 20px; /*g-tabs issue work-around*/
  }
</style>
