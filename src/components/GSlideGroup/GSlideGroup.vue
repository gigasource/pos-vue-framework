<template>
	<div v-resize="setWidths" :class="classes" :style="styles">
		<div :class="slideGroupPrevClasses" @click="onAffixClick('prev')">
			<slot name="prev" @click="onAffixClick('prev')">
				<i class="material-icons">{{prevIcon}}</i>
			</slot>
		</div>

		<div ref="wrapper" class="g-slide-group__wrapper">
			<div ref="content" class="g-slide-group__content">
				<slot></slot>
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
  import GBtn from '../GBtn/GBtn';
  import { computed, ref, watch, reactive, onUpdated, onBeforeUpdate } from '@vue/composition-api';
  import Resize from '../../directives/resize/resize';

  export default {
    name: 'GSlideGroup',
    components: { GBtn },
    props: {
      mandatory: Boolean,
      max: Boolean,
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
      let data = reactive({
        selectedIndex: -1,
        selectedItem: null,
        isOverflowing: false,
        internalItemsLength: 0,
        items: [],
        scrollOffset: 0,
        widths: {
          content: 0,
          wrapper: 0
        }
      });

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
          'g-slide-group__is-overflowing': data.isOverflowing,
        }
      });

      let styles = computed(() => {

      });

      let hasAffixes = computed(() => {
        return (
          //check: is Mobile
          // (props.showArrows || !isMobile) && data.isOverflowing
          props.showArrows && data.isOverflowing
        )
      });

      let hasNext = computed(() => {
        if (!hasAffixes) {
          return false;
        }

        const { content, wrapper } = data.widths;
        // Check one scroll ahead to know the width of right-most item
        return content > Math.abs(data.scrollOffset) + wrapper;
      });


      let hasPrev = computed(() => {
        return hasAffixes && data.scrollOffset !== 0
      });

      //TODO: break point of app
      // let isMobile = () => {
      //   return context.$vuetify.breakpoint.width < props.mobileBreakPoint;
      // };

      watch(() => data.isOverflowing, () => {

      });

      watch(() => data.scrollOffset, (val) => {
        // When overflow changes, the arrows alter
        // the widths of the content and wrapper
        // and need to be recalculated
        context.refs.content.style.transform = `translateX(${-val}px)`
      }, { lazy: true });


      let scrollTo = (location) => {
        data.scrollOffset = calculateNewOffset(location, {
          // Force reflow
          content: context.refs.content ? context.refs.content.clientWidth : 0,
          wrapper: context.refs.wrapper ? context.refs.wrapper.clientWidth : 0,
        }, data.scrollOffset);
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

      //
      //selectedElement:
      //widths:
      let calculateCenteredOffset = (selectedElement, widths) => {
        const { offsetLeft, clientWidth } = selectedElement;
        const offsetCentered = offsetLeft + clientWidth / 2 - widths.wrapper / 2;
        return Math.min(widths.content - widths.wrapper, Math.max(0, offsetCentered));
      };

      let scrollIntoView = () => {
        if (!data.selectedItem) {
          return
        }

        if (
          data.selectedIndex === 0 ||
          (!props.centerActive && !data.isOverflowing)
        ) {
          data.scrollOffset = 0
        } else if (props.centerActive) {
          data.scrollOffset = calculateCenteredOffset(
            data.selectedItem.$el,
            data.widths,
          )
        } else if (data.isOverflowing) {
          data.scrollOffset = calculateUpdatedOffset(
            data.selectedItem.$el,
            data.widths,
            data.scrollOffset
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

          data.isOverflowing = data.widths.wrapper < data.widths.content;
          scrollIntoView();
        });
      };

      return {
        classes,
        styles,
        slideGroupNextClasses,
        slideGroupPrevClasses,
        setWidths,
        onAffixClick
      }
    }
  }
</script>

<style scoped>

</style>
