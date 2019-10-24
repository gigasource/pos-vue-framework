<template>
	<div v-resize="setWidths" :class="classes" :style="styles">
		<div :class="slideGroupPrevClasses" @click="onAffixClick('prev')">
			<slot name="prev" @click="onAffixClick('prev')">
				<i class="material-icons">{{prevIcon}}</i>
			</slot>
		</div>

		<div ref="wrapper" class="g-slide-group__wrapper">
			<div ref="content" class="g-slide-group__content">
				<slot name="content" :toggle="toggleItem" :active="isActiveItem"></slot>
			</div>

		</div>
		<div :class="slideGroupNextClasses" @click="onAffixClick('next')">
			<slot name="next" @click="onAffixClick('next')">
				<i class="material-icons">{{nextIcon}}</i>
			</slot>
		</div>
	</div>
</template>

<script>
  import { computed, watch, ref, reactive, onBeforeUpdate, onUpdated } from '@vue/composition-api';
  import groupable from '../../mixins/groupable';
  import Resize from '../../directives/resize/resize';

  export default {
    name: 'GSlideGroup',
    components: {},
    props: {
      mandatory: Boolean,
      max: Boolean,
      value: null,
      multiple: Boolean,
      activeClass: String,
      centerActive: false,
      mobileBreakPoint: {
        type: [Number, String],
        default: 1264,
        validator: (v) => !isNaN(parseInt(v)),
      },
      prevIcon: {
        type: String,
        default: 'navigate_before',
      },
      nextIcon: {
        type: String,
        default: 'navigate_next',
      },
      showArrows: Boolean,
    },
    directives: {
      Resize
    }
    ,
    setup(props, context) {
      //State date
      let data = reactive({
        selectedItem: null,
        items: [],
        widths: {
          content: 0,
          wrapper: 0
        }
      });

      let selectedIndex = ref(-1);
      let selectedItem = reactive({});
      let isOverflowing = ref(false);
      let internalItemsLength = ref(0);
      let scrollOffset = ref(0);
      let widths = reactive({
        content: 0,
        wrapper: 0
      });

      //Styles & classes computed

      let slideGroupNextClasses = computed(() => {
        return {
          'g-slide-group__next': true,
          'g-slide-group__prev--disabled': !hasNext.value,
        }
      });

      let slideGroupPrevClasses = computed(() => {
        return {
          'g-slide-group__prev': true,
          'g-slide-group__prev--disabled': !hasPrev.value,
        }
      });

      let classes = computed(() => {
        return {
          'g-slide-group': true,
          'g-slide-group__has-affixes': hasAffixes.value,
          'g-slide-group__is-overflowing': isOverflowing.value,
        }
      });

      let styles = computed(() => {

      });
      //Update & beforeUpdate
      onBeforeUpdate(() => {
        internalItemsLength.value = (context.refs.content.children || []).length
      });

      onUpdated(() => {
        if (internalItemsLength.value === (context.refs.content.children || []).length) {
          return
        }
        setWidths();
      });


      //Has affixes when overflowing
      let hasAffixes = computed(() => {
        return (
          props.showArrows && isOverflowing.value
        )
      });

      let hasNext = computed(() => {
        if (!hasAffixes) {
          return false;
        }

        const { content, wrapper } = data.widths;
        // Check one scroll ahead to know the width of right-most item
        return content > Math.abs(scrollOffset.value) + wrapper;
      });


      let hasPrev = computed(() => {
        return hasAffixes && scrollOffset.value !== 0
      });

      watch(isOverflowing, () => {

      });

      // When overflow changes, the arrows alter
      // the widths of the content and wrapper
      // and need to be recalculated
      watch(scrollOffset, (val) => {
        context.refs.content.style.transform = `translateX(${-val}px)`
      }, { lazy: true });


      let scrollTo = (location) => {
        scrollOffset.value = calculateNewOffset(location, {
          // Force reflow
          content: context.refs.content ? context.refs.content.clientWidth : 0,
          wrapper: context.refs.wrapper ? context.refs.wrapper.clientWidth : 0,
        }, scrollOffset.value);
      };

      let calculateNewOffset = (direction, widths, currentScrollOffset) => {
        const newAbsoluteOffset = currentScrollOffset + (direction === 'prev' ? -1 : 1) * widths.wrapper;

        return Math.max(Math.min(newAbsoluteOffset, widths.content - widths.wrapper), 0);
      };

      //onClick 'prev/next'
      let onAffixClick = (location) => {
        context.emit(`click:${location}`);
        scrollTo(location);
      };

      let calculateUpdatedOffset = (selectedElement, widths, currentScrollOffset) => {
        const clientWidth = selectedElement.clientWidth;
        let offsetLeft = selectedElement.offsetLeft;


        const totalWidth = widths.wrapper + currentScrollOffset;
        const itemOffset = clientWidth + offsetLeft;
        const additionalOffset = clientWidth * 0.4;

        if (offsetLeft < currentScrollOffset) {
          currentScrollOffset = Math.max(offsetLeft - additionalOffset, 0)
        } else if (totalWidth < itemOffset) {
          currentScrollOffset = Math.min(currentScrollOffset - (totalWidth - itemOffset - additionalOffset), widths.content - widths.wrapper)
        }

        return currentScrollOffset
      };

      let calculateCenteredOffset = (selectedElement, widths) => {
        const { offsetLeft, clientWidth } = selectedElement;
        const offsetCentered = offsetLeft + clientWidth / 2 - widths.wrapper / 2;
        return Math.min(widths.content - widths.wrapper, Math.max(0, offsetCentered));
      };

      let scrollIntoView = () => {
        if (!data.selectedItem) {
          return
        }

        if (selectedIndex.value === 0 || (!props.centerActive && !isOverflowing.value)) {
          scrollOffset.value = 0;
        } else if (props.centerActive) {
          scrollOffset.value = calculateCenteredOffset(
            data.selectedItem.$el,
            data.widths,
          )
        } else if (isOverflowing.value) {
          scrollOffset.value = calculateUpdatedOffset(
            data.selectedItem.$el,
            data.widths,
            scrollOffset.value
          )
        }
      };

      let setWidths = () => {
        window.requestAnimationFrame(() => {
          const { content, wrapper } = context.refs;

          data.widths = {
            content: content ? content.clientWidth : 0,
            wrapper: wrapper ? wrapper.clientWidth : 0,
          };

          isOverflowing.value = data.widths.wrapper < data.widths.content;
          scrollIntoView();
        });
      };

      //Model
      let model = computed({
        get: () => {
          if (props.value) {
            if (props.multiple && !Array.isArray(props.value)) {
              props.value = [props.value];
            }
            return props.value;
          }
          return props.multiple ? [] : null;
        },
        set: (value) => {
          context.emit('input', value);
        }
      });

      const { toggleItem, isActiveItem } = groupable(props, model);

      return {
        classes,
        styles,
        slideGroupNextClasses,
        slideGroupPrevClasses,
        internalItemsLength,
        selectedItem,
        isOverflowing,
        scrollOffset,
        widths,
        setWidths,
        onAffixClick,
        toggleItem,
        isActiveItem,
      }
    }
  }
</script>

<style scoped>

</style>
