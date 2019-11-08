<script>
  import GLayout from '../GLayout/GLayout';
  import GTab from '../GTabs/GTab';
  import GTabItems from '../GTabs/GTabItems';
  import GTabItem from './GTabItem';
  import GIcon from '../GIcon/GIcon';
  import getVModel from '../../mixins/getVModel';
  import { computed, provide, reactive, ref, watch } from '@vue/composition-api'
  import { find } from 'lodash'
  import colorHandler, { convertToUnit } from '../../utils/helpers';
  import { colors } from '../../utils/colors';
  import GSlideGroup from '../GSlideGroup/GSlideGroup';
  import Resize from '../../directives/resize/resize';

  export default {
    name: 'GTabs',
    directives: { Resize },
    components: { GSlideGroup, GIcon, GTabItem, GLayout, GTab, GTabItems },
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
      alignWithTitle: Boolean,
    },
    setup(props, context) {
      const { model } = getVModel(props, context);

      if (!model.value) {
        model.value = props.items.find(item => !item.disabled);
      }
      provide('model', model);
      provide('items', props.items)

      const { getColorType, convertColorClass } = colorHandler();

      const tabsClasses = computed(() => ({
        'g-tabs': true,
        'g-tabs__grow': props.grow,
        'g-tabs__vertical': props.vertical,
        'g-tabs__right': props.right,
        'g-tabs__icon': props.icon,
        'g-tabs__center': props.center,
        'g-tabs__align-title': props.alignWithTitle,
        [convertColorClass(props.textColor)]: props.textColor && getColorType(props.textColor) === 'class'
      }));

      const tabsStyles = computed(() => ({
        ...props.textColor && getColorType(props.textColor) === 'style' && { color: props.textColor }
      }));

      const barClasses = computed(() => ({
        [convertColorClass(props.color, 'background')]: props.color && getColorType(props.color) === 'class'
      }));

      const barStyles = computed(() => ({
        ...props.color && getColorType(props.color) === 'style' && { 'background-color': props.color }
      }));

      const sliderStyles = reactive({
        'width': '90px',
        'height': '2px',
        'top': '46px',
        'right': 'auto',
        'left': '0',
        'bottom': 'auto',
        'background-color': 'currentColor',
        'transition': 'left 1s, right 0.5s'
      });

      function calculateSliderStyle() {
        if (!itemsRef.value) return
        const children = itemsRef.value.querySelector('.g-slide-group__content').children
        const activeTab = find(children, i => i.classList.contains('g-tab__active'));
        sliderStyles.width = convertToUnit(props.vertical ? props.sliderSize : 'auto');
        sliderStyles.height = convertToUnit(props.vertical ? activeTab.offsetHeight : props.sliderSize);
        sliderStyles.top = convertToUnit(props.vertical ? activeTab.offsetTop : (activeTab.offsetHeight - props.sliderSize));

        const parent = context.refs.itemsRef.querySelector('.g-slide-group__content')
        sliderStyles.left = convertToUnit(activeTab.offsetLeft)
        sliderStyles.right = convertToUnit(parent.offsetWidth - activeTab.offsetWidth - activeTab.offsetLeft)

        sliderStyles['background-color'] = props.sliderColor
          ? (getColorType(props.sliderColor) === 'style'
            ? props.sliderColor
            : colors[props.sliderColor.trim().split(' ').join('-')])
          : 'currentColor';
      }

      const itemsRef = ref(null)
      watch(() => [itemsRef.value, props.grow, props.right, props.center, props.vertical, props.sliderSize, props.sliderColor, props.alignWithTitle, props.icon], () => {
        calculateSliderStyle();
      });

      // tab transition
      watch(() => model.value, () => {
        const parent = context.refs.itemsRef.querySelector('.g-slide-group__content');
        const activeTab = find(parent.children, i => i.classList.contains('g-tab__active'));

        if (props.vertical) {
          if (activeTab.offsetTop < +sliderStyles.top.replace('px', '')) {
            sliderStyles['transition'] = 'top 0.5s, bottom 1s';
          } else {
            sliderStyles['transition'] = 'bottom 0.5s, top 1s';
          }

          //todo vertical arrows
          sliderStyles.bottom = convertToUnit(parent.offsetHeight - activeTab.offsetHeight - activeTab.offsetTop);
          sliderStyles.top = convertToUnit(activeTab.offsetTop);
          sliderStyles.height = 'auto';
        } else {
          if (activeTab.offsetLeft < +sliderStyles.left.replace('px', '')) {
            sliderStyles['transition'] = 'left 0.5s, right 1s';
          } else {
            sliderStyles['transition'] = 'left 1s, right 0.5s';
          }

          sliderStyles.width = 'auto';
          sliderStyles.right = convertToUnit(parent.offsetWidth - activeTab.offsetWidth - activeTab.offsetLeft)
          sliderStyles.left = convertToUnit(activeTab.offsetLeft)
        }
      }, { lazy: true });

      const fullTitle = computed(() => {
        const noTitle = find(props.items, item => item.title === undefined);
        console.warn(`Required prop title for tab`)
        return !noTitle;
      });

      const genWrapper = () => <g-layout className="g-tabs-wrapper" vertical={!props.vertical}>
        <div className={tabsClasses.value} style={tabsStyles.value}>
          <div ref="itemsRef"
               className={{ ...barClasses.value, 'g-tabs-bar': true }}
               style={barStyles.value}
               v-resize={calculateSliderStyle}>
            {genTabsBar()}
          </div>
        </div>
        {context.slots.default && context.slots.default()}
      </g-layout>

      const genTabIcon = (item) => {
        if (props.icon && item.icon) return <g-icon>{item.icon}</g-icon>
      }

      const genTabs = () => {
        return props.items.map((item, index) => (
          (context.slots.tab && context.slots.tab({ item, index }))
          || <g-tab item={item} key={index}>
            {genTabIcon(item)}
            {item.title}
          </g-tab>
        ))
      }

      const genTabSlider = () => <div class="g-tabs-slider" style={sliderStyles}></div>

      const genTabsBar = () => {
        if (!fullTitle) return
        const slideGroupData = {
          props: {
            centerActive: props.centerActive,
            items: props.items,
          },
          on: {
            'click:prev': calculateSliderStyle,
            'click:next': calculateSliderStyle
          },
          slot: 'tabs'
        }
        return <g-slide-group {...slideGroupData} vModel={model.value} dense>
          {genTabs()}
          {genTabSlider()}
        </g-slide-group>
      }

      return () => <div class={['g-tabs-wrapper', props.vertical ? 'row-flex' : 'col-flex']}>
        <div class={tabsClasses.value} style={tabsStyles.value}>
          <div ref="itemsRef"
               class={{ ...barClasses.value, 'g-tabs-bar': true }}
               style={barStyles.value}
               v-resize={calculateSliderStyle}>
            {genTabsBar()}
          </div>
        </div>
        {context.slots.default && (
          <g-tab-items>
            {context.slots.default()}
          </g-tab-items>
        )}
      </div>
    }
  }
</script>

<style scoped lang="scss">
	@import "GTabs";
</style>