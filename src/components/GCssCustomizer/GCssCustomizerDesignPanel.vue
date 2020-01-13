<script>
  import { reactive, ref } from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GGridSelect from '../GGridSelect/GGridSelect';
  import GColorPicker from '../GColorPicker/GColorPicker';
  import GRow from '../GLayout/GRow';
  import GCheckbox from '../GCheckbox/GCheckbox';
  import GTextField from '../GInput/GTextField';
  import GCssCustomizerInputForm from './GCssCustomizerInputForm';
  import GCssCustomizerInputGroup from './GCssCustomizerInputGroup';
  import GDivider from '../GLayout/GDivider';

  export default {
    name: 'GCssCustomizerDesignPanel',
    components: { GDivider, GCssCustomizerInputGroup, GCssCustomizerInputForm, GTextField, GBtn, GIcon, GGridSelect, GColorPicker, GRow, GCheckbox },
    props: {},
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
            default: ({ toggleSelect, item, index }) => {
              return <GBtn flat style="margin-right: 4px; width: 28px; min-width: 12px; height: 28px; padding: 0px 4px;" vOn:click={() => toggleSelect(item)} ripple={false}>
                <GIcon svg size="20">
                  {item.icon}
                </GIcon>
              </GBtn>
            },
            selected: ({ toggleSelect, item, index }) => {
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

      const basic = ref({
        X: 41,
        Y: 711,
        W: 9,
        H: 11,
        rotation: 100,
        borderRadius: 0,
      })

      const textOptions = ref({
          fontFamily: 'Roboto',
          fontStyle: 'Regular',
          fontSize: 12,
          lineHeight: 22,
          textPercent: 0,
          lineSpace: 0,
        }
      )

      const basicList = ref([
        { type: 'input', prefix: 'X', name: 'X', value: basic.value.X }, { type: 'input', prefix: 'Y', name: 'Y', value: basic.value.Y }, { type: 'endLine' },
        { type: 'input', prefix: 'W', name: 'W', value: basic.value.W }, { type: 'input', prefix: 'H', name: 'H', value: basic.value.H }, { type: 'endLine' },
        { type: 'input', name: 'rotation', prepend: 'icon-pns_rotation', value: basic.value.rotation, suffix: '%' }, { type: 'input', prepend: 'icon-pns_chain', name: 'borderRadius', value: basic.value.borderRadius, disabled: true }
      ])

      const borderRadiusArray = ref([basicList.value[6].borderRadius, basicList.value[6].borderRadius, basicList.value[6].borderRadius, basicList.value[6].borderRadius,])

      //gen Transform

      const genPositionAndSizing = () => {
        return [
          <g-css-customizer-input-form width="145px" componentList={basicList.value} value={basic.value} vOn:change={(e) => {basic.value = e}}/>,
          basicList.value[6].disabled ?
            <g-css-customizer-input-group width="145px" value={borderRadiusArray.value} prepend={basicList.value[6].prepend} vOn:input={e => basic.value[6].borderRadius = e}/>
            : null,
          <g-divider/>
        ]
      }

      //gen TextOptions
      const textOpList = ref([
        { type: 'combobox', name: 'fontFamily', value: textOptions.value.fontFamily, list: [{ text: 'Roboto', prependIcon: 'check' }, { text: 'SuperBow', prependIcon: 'check' }, { text: 'Ariel', prependIcon: 'check' }] }, { type: 'endLine' },
        { type: 'select', name: 'fontStyle', value: textOptions.value.fontStyle, list: [{ text: 'Regular', prependIcon: 'check', disabled: true }, { text: 'Bold', prependIcon: 'check' }, { text: 'Italic', prependIcon: 'check' }] }, {}, { type: 'input', name: 'fontSize', value: textOptions.value.fontSize, suffix: 'px' }, { type: 'endLine' },
        { type: 'input', prepend: 'icon-tops_line_height', name: 'lineHeight', value: textOptions.value.lineHeight }, { type: 'input', prepend: 'icon-tops_text_percent', name: 'textPercent', value: textOptions.value.textPercent }, { type: 'input', prepend: 'icon-tops_line_space', name: 'lineSpace', value: textOptions.value.lineSpace, suffix: '%' }

      ])

      const genTextOptions = () => {
        return <g-css-customizer-input-form value={textOptions.value} componentList={textOpList.value} vOn:input={(e) => textOptions.value = e}>
        </g-css-customizer-input-form>
      }

      const
        genDesignPanel = () => {
          return <div class="g-css-customizer-design-panel">
            {genAlign()}
            {genPositionAndSizing()}
            {genTextOptions()}

          </div>
        }

      return {
        genDesignPanel,
        align,
        basic,
      }
    },
    render() {
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

	::v-deep.g-divider {
		background-color: #1d1d1d;
		height: 2px;
		margin-top: 10px;
	}

	.g-css-customizer-design-panel {
		&-position {
			display: flex;
			flex-direction: co;
		}
	}
</style>
