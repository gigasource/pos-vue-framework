<script>
  import { ref } from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import GGridSelect from '../GGridSelect/GGridSelect';
  import GColorPicker from '../GColorPicker/GColorPicker';
  import GRow from '../GLayout/GRow';
  import GCheckbox from '../GCheckbox/GCheckbox';
  import GTextField from '../GInput/GTextField';
  import GCssCustomizerPositionForm from './GCssCustomizerPositionForm';

  export default {
    name: 'GCssCustomizerDesignPanel',
    components: { GCssCustomizerPositionForm, GTextField, GBtn, GIcon, GGridSelect, GColorPicker, GRow, GCheckbox },
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


      //gen Transform
      const position = [{ type: 'input', prefix: 'X', value: '41' }, { type: 'input', prefix: 'Y', value: '711' },]
      const size = [{ type: 'input', prefix: 'W', value: '9' }, { type: 'input', prefix: 'H', value: '11' }, { type: 'button', icon: 'icon-pns_angle' }]
      const rotation = [{ type: 'input', prepend: 'icon-pns_rotation', value: '100%' }, { type: 'input', prepend: 'icon-pns_chain', value: '0' }]
      const genPositionAndSizing = () => {
        return <g-css-customizer-position-form list1={position} list2={size} list3={rotation}>

        </g-css-customizer-position-form>
      }

      //gen TextOptions
      const family = [{ type: 'select', value: 'Roboto', list: ['Regular', 'Bold', 'Italic'] }]
      const format = [{ type: 'select', value: 'Regular', list: ['Regular', 'Bold', 'Italic'] }, {}, { type: 'input', prepend: 'icon', value: '12px' }]
      const lineSpace = [{ type: 'input', prepend: 'icon-tops_line_height', value: '22' }, { type: 'input', prepend: 'icon-tops_text_percent', value: '0' }, { type: 'input', prepend: 'icon-tops_line_space', value: '0%' }]
      const genTextOptions = () => {
        return <g-css-customizer-position-form list1={family} list2={format} list3={lineSpace}>

        </g-css-customizer-position-form>
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

	.g-css-customizer-design-panel {
		&-position {
			display: flex;
			flex-direction: co;
		}
	}
</style>
