<template>
	<g-layout vertical>
		<div :class="tabsClasses" :style="tabsStyles">
			<!--			TODO: surround with slider group for handling overflow tabs -->
			<div class="g-tabs-bar" ref="itemsRef" :class="barClasses" :style="barStyles">
				<slot name="tabs" :toggle="toggleItem" :isActive="isActiveItem">
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

		<!--	TODO: content inside tabs	-->
		<!--		<g-tab-items :items="items" v-model="model">-->
		<!--			<template v-slot:default="{isActive}">-->
		<!--				<slot :isActive="isActive"></slot>-->
		<!--			</template>-->
		<!--		</g-tab-items>-->

	</g-layout>
</template>

<script>
  import GTabItems from '../GTabs/GTabItems';
  import getVModel from '../../mixins/getVModel';
  import GTab from '../GTabs/GTab';
  import groupable from '../../mixins/groupable';
  import GLayout from '../GLayout/GLayout';
  import { computed, provide, watch, ref, reactive, onMounted } from '@vue/composition-api'
  import { find } from 'lodash'
  import { convertToUnit } from '../../utils/helpers';
  import colorHandler from '../../utils/helpers';

  export default {
    name: 'GTabs',
    components: { GLayout, GTab, GTabItems },
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
    },
    setup(props, context) {
      const { model } = getVModel(props, context);
      const { toggleItem, isActiveItem } = groupable({ mandatory: true, multiple: false }, model);

      if (!model.value) {
        model.value = props.items[0];
      }

      provide('model', model);

      const { getColorType, convertColorClass } = colorHandler();

      const tabsClasses = computed(() => ({
        'g-tabs': true,
        'g-tabs__grow': props.grow,
        'g-tabs__vertical': props.vertical,
        'g-tabs__right': props.right,
        'g-tabs__center': props.center,
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
        'left': '0',
      });

      const itemsRef = ref(null);

      function calculateSliderStyle() {
        const activeTab = find(context.refs.itemsRef.children, i => i.classList.contains('g-tab__active'));
        sliderStyles.width = convertToUnit(props.vertical ? props.sliderSize : activeTab.offsetWidth);
        sliderStyles.height = convertToUnit(props.vertical ? activeTab.offsetHeight : props.sliderSize);
        sliderStyles.top = convertToUnit(props.vertical ? activeTab.offsetTop : (activeTab.offsetHeight - props.sliderSize));
        sliderStyles.left = convertToUnit(activeTab.offsetLeft);
      }

      watch(() => [model.value, props.grow, props.right, props.center, props.vertical], () => {
        calculateSliderStyle();
      }, { lazy: true });

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
        toggleItem,
        isActiveItem,
        sliderStyles,
        fullTitle,
      }
    }
  }
</script>

<style scoped>

</style>