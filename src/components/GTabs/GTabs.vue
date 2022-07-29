<script>
import GTab from '../GTabs/GTab';
import GTabItems from '../GTabs/GTabItems';
import GIcon from '../GIcon/GIcon';
import getVModel from '../../mixins/getVModel';
import { computed, onMounted, onUnmounted, provide, reactive, ref, watch, nextTick } from 'vue'
import { find } from 'lodash'
import colorHandler, { convertToUnit, getScopeIdRender } from '../../utils/helpers';
import { colors } from '../../utils/colors';
import GSlideGroup from '../GSlideGroup/GSlideGroup';
import Resize from '../../directives/resize/resize';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
import {isCSR} from '../../utils/ssr';

export default {
  name: 'GTabs',
  directives: { Resize },
  components: { GSlideGroup, GIcon, GTab, GTabItems },
  props: {
    items: Array,
    modelValue: null,
    color: String,
    textColor: String,
    activeTextColor: String,
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
    showArrows: {
      type: Boolean,
      default: true
    },
    addable: Boolean,
    deletable: Boolean,
  },
  emits: ['update:modelValue', 'add', 'delete'],
  setup(props, context) {
    const model = getVModel(props, context);

    let ResizeObserver
    if (isCSR)
      ResizeObserver = window.ResizeObserver || Polyfill

    let sliderResizeObserver
    if (ResizeObserver)
      sliderResizeObserver = new ResizeObserver(calculateSliderStyle)
    const activeTab = ref(null)

    if (!model.value) {
      model.value = props.items.find(item => !item.disabled);
    }
    provide('model', model);

    const items = computed(() => props.items)
    provide('items', items)

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
      'position': 'absolute',
      'top': '46px',
      'right': 'auto',
      'left': '0',
      'bottom': 'auto',
      'background-color': 'currentColor',
      'transition': 'left 1s, right 0.5s'
    });

    onMounted(() => {
      sliderResizeObserver && sliderResizeObserver.observe(itemsRef.value)
    })

    onUnmounted(() => {
      sliderResizeObserver && sliderResizeObserver.disconnect()
    })

    function calculateSliderStyle() {
      if (!itemsRef.value) return
      const children = itemsRef.value.querySelector('.g-slide-group__content').children
      activeTab.value = find(children, i => i.classList.contains('g-tab__active'));

      if (activeTab.value) {
        sliderStyles.width = convertToUnit(props.vertical ? props.sliderSize : 'auto');
        sliderStyles.height = convertToUnit(props.vertical ? activeTab.value.offsetHeight : props.sliderSize);
        sliderStyles.top = convertToUnit(props.vertical ? activeTab.value.offsetTop : (activeTab.value.offsetHeight - props.sliderSize));

        const parent = itemsRef.value.querySelector('.g-slide-group__content')
        sliderStyles.left = convertToUnit(activeTab.value.offsetLeft)
        sliderStyles.right = convertToUnit(parent.offsetWidth - activeTab.value.offsetWidth - activeTab.value.offsetLeft)
      }

      sliderStyles['background-color'] = props.sliderColor
          ? (getColorType(props.sliderColor) === 'style'
              ? props.sliderColor
              : colors[props.sliderColor.trim().split(' ').join('-')])
          : 'currentColor';
    }

    const itemsRef = ref(null)
    watch(() => [itemsRef.value, props.items, props.grow, props.right, props.center, props.vertical, props.sliderSize, props.sliderColor, props.alignWithTitle, props.icon], () => {
      calculateSliderStyle();
    });

    // tab transition
    watch(() => model.value, () => {
      nextTick(() => {
        const parent = itemsRef.value.querySelector('.g-slide-group__content');
        activeTab.value = find(parent.children, i => i.classList.contains('g-tab__active'));
        if (!activeTab.value) return
        if (props.vertical) {
          if (activeTab.value.offsetTop < +sliderStyles.top.replace('px', '')) {
            sliderStyles['transition'] = 'top 0.5s, bottom 1s';
          } else {
            sliderStyles['transition'] = 'bottom 0.5s, top 1s';
          }

          //todo vertical arrows
          sliderStyles.bottom = convertToUnit(parent.offsetHeight - activeTab.value.offsetHeight - activeTab.value.offsetTop);
          sliderStyles.top = convertToUnit(activeTab.value.offsetTop);
          sliderStyles.height = 'auto';
        } else {
          if (activeTab.value.offsetLeft < +sliderStyles.left.replace('px', '')) {
            sliderStyles['transition'] = 'left 0.5s, right 1s';
          } else {
            sliderStyles['transition'] = 'left 1s, right 0.5s';
          }

          sliderStyles.width = 'auto';
          sliderStyles.right = convertToUnit(parent.offsetWidth - activeTab.value.offsetWidth - activeTab.value.offsetLeft)
          sliderStyles.left = convertToUnit(activeTab.value.offsetLeft)
        }
      })
    }, { lazy: true });

    const fullTitle = computed(() => {
      const noTitle = find(props.items, item => item.title === undefined);
      console.warn(`Required prop title for tab`)
      return !noTitle;
    });

    const genTabIcon = (item) => {
      if (props.icon && item.icon) return <g-icon>{item.icon}</g-icon>
    }

    const activeTextColor = computed(() => props.activeTextColor ? props.activeTextColor : sliderStyles['background-color']);

    //provide slider style (color) default active tab text color
    provide('slider-styles', sliderStyles);

    const genTabs = () => {
      return context.slots.tabs
          ? context.slots.tabs()
          : props.items.map((item, index) => (
              (context.slots.tab && context.slots.tab({ item, index }))
              || <g-tab active-text-color={activeTextColor.value} item={item} key={index}>
                {genTabIcon(item)}
                {item.title}
              </g-tab>
          ))
    }

    const genTabSlider = () => <div class="g-tabs-slider" style={sliderStyles}></div>

    const genTabsBar = () => {
      if (!fullTitle) return
      const slideGroupData = {
        showArrows: props.showArrows,
        centerActive: props.centerActive,
        items: props.items,
        'onClick:prev': calculateSliderStyle,
        'onClick:next': calculateSliderStyle,
        slot: 'tabs',
        style: {
          ...!props.vertical && (props.addable || props.deletable) && {
            width: 'calc(100% - 32px)'
          },
          ...!props.vertical && props.addable && props.deletable && {
            width: 'calc(100% - 56px)'
          },
        }

      }

      return <g-slide-group {...slideGroupData} onUpdate:modelValue={e => model.value = e } value={model.value} dense>
        {genTabs()}
        {activeTab.value && genTabSlider()}
      </g-slide-group>
    }

    const genAddButton = () => props.addable &&
        <g-icon class="mr-2" color={sliderStyles['background-color']} onClick={e => {context.emit('add')}}>add_circle</g-icon>

    const genDeleteButton = () => props.deletable &&
        <g-icon color={sliderStyles['background-color']} onClick={e => context.emit('delete')}>delete</g-icon>

    const genTabsGroup = () => <div class={['g-tabs-wrapper', props.vertical ? 'row-flex' : 'col-flex']}>
      <div class={tabsClasses.value} style={tabsStyles.value}>
        <div ref={itemsRef}
             class={{ ...barClasses.value, 'g-tabs-bar': true }}
             style={barStyles.value}
             v-resize={calculateSliderStyle}>
          {genTabsBar()}
          {genAddButton()}
          {genDeleteButton()}
        </div>
      </div>
      {context.slots.default && (
          <g-tab-items>
            {context.slots.default()}
          </g-tab-items>
      )}
    </div>

    return {
      genTabsGroup
    }
  },
  render() {
    const scopeIdRender = getScopeIdRender();
    return scopeIdRender(this.genTabsGroup)();
  }
}
</script>

<style scoped lang="scss">
@import "GTabs";
</style>
