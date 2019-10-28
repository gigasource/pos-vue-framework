<template>
	<g-layout :vertical="!vertical">
		<div :class="tabsClasses" :style="tabsStyles">
			<!--			TODO: surround with slider group for handling overflow tabs -->
			<div class="g-tabs-bar" ref="itemsRef" :class="barClasses" :style="barStyles">
				<slot name="tabs">
					<template v-if="fullTitle">
						<g-tab v-for="(item, i) in items" :item="item" :key="i">
<!--							TODO: change with g-icon component-->
							<i v-if="icon && item.icon" class="material-icons">{{item.icon}}</i>
							{{item.title}}
						</g-tab>
					</template>
				</slot>
			</div>
			<div class="g-tabs-slider" :style="sliderStyles"></div>
		</div>
		<slot></slot>
	</g-layout>
</template>

<script>
  import GTabItems from '../GTabs/GTabItems';
  import getVModel from '../../mixins/getVModel';
  import GTab from '../GTabs/GTab';
  import GLayout from '../GLayout/GLayout';
  import { computed, onMounted, provide, reactive, ref, watch } from '@vue/composition-api'
  import { find } from 'lodash'
  import colorHandler, { convertToUnit } from '../../utils/helpers';
  import { colors } from '../../utils/colors';
  import GTabItem from './GTabItem';

  export default {
    name: 'GTabs',
    components: { GTabItem, GLayout, GTab, GTabItems },
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
			icon: Boolean,
			alignWithTitle: Boolean,
    },
    setup(props, context) {
      const { model } = getVModel(props, context);

      if (!model.value) {
        model.value = props.items.find(item => !item.disabled);
      }

      provide('model', model);

      const { getColorType, convertColorClass } = colorHandler();

      const tabsClasses = computed(() => ({
        'g-tabs': true,
        'g-tabs__grow': props.grow,
        'g-tabs__vertical': props.vertical,
        'g-tabs__right': props.right,
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
				'transition-property': 'left'
      });

      const itemsRef = ref(null);

      function calculateSliderStyle() {
        const activeTab = find(context.refs.itemsRef.children, i => i.classList.contains('g-tab__active'));
        sliderStyles.width = convertToUnit(props.vertical ? props.sliderSize : activeTab.offsetWidth);
        sliderStyles.height = convertToUnit(props.vertical ? activeTab.offsetHeight : props.sliderSize);
        sliderStyles.top = convertToUnit(props.vertical ? activeTab.offsetTop : (activeTab.offsetHeight - props.sliderSize));
        sliderStyles.left = convertToUnit(activeTab.offsetLeft);
        sliderStyles['background-color'] = props.sliderColor ? (getColorType(props.sliderColor) === 'style' ? props.sliderColor : colors[props.sliderColor.trim().split(' ').join('-')]) : 'currentColor';
      }

      watch(() => [props.grow, props.right, props.center, props.vertical, props.sliderSize, props.sliderColor, props.alignWithTitle, props.icon], () => {
        calculateSliderStyle();
      }, { lazy: true });

      watch(() => model.value, () => {
        const parent = context.refs.itemsRef;
        const activeTab = find(context.refs.itemsRef.children, i => i.classList.contains('g-tab__active'));
        if (props.vertical) {
          if (activeTab.offsetTop < +sliderStyles.top.replace("px", "")) {
            sliderStyles['transition-property'] = 'bottom';
          } else {
            sliderStyles['transition-property'] = 'top';
          }
          sliderStyles.bottom = convertToUnit(parent.offsetHeight - activeTab.offsetHeight - activeTab.offsetTop);
          sliderStyles.top = convertToUnit(activeTab.offsetTop);
          sliderStyles.height = 'auto';
				} else {
          if (activeTab.offsetLeft < +sliderStyles.left.replace("px", "")) {
            sliderStyles['transition-property'] = 'right';
          } else {
            sliderStyles['transition-property'] = 'left';
          }
          sliderStyles.right = convertToUnit(parent.offsetWidth - activeTab.offsetWidth - activeTab.offsetLeft);
          sliderStyles.left = convertToUnit(activeTab.offsetLeft);
          sliderStyles.width = 'auto';
				}
			}, {lazy: true});

      onMounted(() => {
        context.root.$nextTick(() => {
          window.setTimeout(calculateSliderStyle, 30);
        })
      });

      const fullTitle = computed(() => {
        const noTitle = find(props.items, item => item.title === undefined);
        return !noTitle;
      });

      return {
        model,
        tabsClasses,
        tabsStyles,
        barClasses,
        barStyles,
        sliderStyles,
        fullTitle,
      }
    }
  }
</script>

<style scoped>

</style>