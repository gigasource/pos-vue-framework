<template>
  <div v-resize="setWidths" :class="containerClasses">
    <div :class="slideGroupPrevClasses" @click="onAffixClick('prev')">
      <slot name="prev" @click="onAffixClick('prev')">
        <!--TODO use g-icon-->
        <i class="material-icons">{{prevIcon}}</i>
      </slot>
    </div>

    <div ref="wrapper" class="g-slide-group__wrapper">
      <div ref="content" class="g-slide-group__content">
        <slot :toggle="toggleItem" :isActive="isActiveItem"></slot>
      </div>

    </div>
    <div :class="slideGroupNextClasses" @click="onAffixClick('next')">
      <slot name="next" @click="onAffixClick('next')">
        <!--TODO use g-icon-->
        <i class="material-icons">{{nextIcon}}</i>
      </slot>
    </div>
  </div>
</template>

<script>
  import { computed, onBeforeUpdate, onUpdated, reactive, ref, watch } from '@vue/composition-api';
  import groupable from '../../mixins/groupable';
  import Resize from '../../directives/resize/resize';

  //TODO add stories + tests
  export default {
    name: 'GSlideGroup',
    props: {
      items: null,
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
      showArrows: {
        type: Boolean,
        default: true
      },
    },
    directives: {
      Resize
    },
    setup(props, context) {
      const data = reactive({
        widths: {
          content: 0,
          wrapper: 0
        }
      });

      const isOverflowing = ref(false);
      const internalItemsLength = ref(0);
      const scrollOffset = ref(0);

      //Styles & classes computed
      const slideGroupNextClasses = computed(() => {
        return {
          'g-slide-group__next': true,
          'g-slide-group__prev--disabled': !hasNext.value,
        }
      });

      const slideGroupPrevClasses = computed(() => {
        return {
          'g-slide-group__prev': true,
          'g-slide-group__prev--disabled': !hasPrev.value,
        }
      });

      const containerClasses = computed(() => {
        return {
          'g-slide-group': true,
          'g-slide-group__has-affixes': hasAffixes.value,
          'g-slide-group__is-overflowing': isOverflowing.value,
        }
      });

      onBeforeUpdate(() => {
        internalItemsLength.value = (context.refs.content.children || []).length
      });

      onUpdated(() => {
        if (internalItemsLength.value === (context.refs.content.children || []).length) return
        setWidths();
      });

      //show arrows if overflowing
      const hasAffixes = computed(() => props.showArrows && isOverflowing.value);

      const hasNext = computed(() => {
        if (!hasAffixes) return false;
        const { content, wrapper } = data.widths;
        // Check one scroll ahead to know the width of right-most item
        return content > Math.abs(scrollOffset.value) + wrapper;
      });

      const hasPrev = computed(() => hasAffixes && scrollOffset.value !== 0);

      watch(() => [props.value, isOverflowing.value], () => {
        setWidths();
      });

      // When overflow changes, the arrows alter
      // the widths of the content and wrapper
      // and need to be recalculated
      watch(scrollOffset, (val) => {
        context.refs.content.style.transform = `translateX(${-val}px)`
      }, { lazy: true });


      function scrollTo(location) {
        scrollOffset.value = calculateNewOffset(location, {
          // Force reflow
          content: context.refs.content ? context.refs.content.clientWidth : 0,
          wrapper: context.refs.wrapper ? context.refs.wrapper.clientWidth : 0,
        }, scrollOffset.value);
      }

      function calculateNewOffset(direction, widths, currentScrollOffset) {
        const newAbsoluteOffset = currentScrollOffset + (direction === 'prev' ? -1 : 1) * widths.wrapper;
        return Math.max(Math.min(newAbsoluteOffset, widths.content - widths.wrapper), 0);
      }

      //prev/next arrow click handler
      function onAffixClick(location) {
        context.emit(`click:${location}`);
        scrollTo(location);
      }

      function calculateUpdatedOffset(selectedElement, widths, currentScrollOffset) {
        const { offsetLeft, clientWidth } = selectedElement;
        const totalWidth = widths.wrapper + currentScrollOffset;
        const itemOffset = clientWidth + offsetLeft;
        const additionalOffset = clientWidth * 0.4;

        if (offsetLeft < currentScrollOffset) {
          currentScrollOffset = Math.max(offsetLeft - additionalOffset, 0)
        } else if (totalWidth < itemOffset) {
          currentScrollOffset = Math.min(currentScrollOffset - (totalWidth - itemOffset - additionalOffset), widths.content - widths.wrapper)
        }

        return currentScrollOffset
      }

      function calculateCenteredOffset(selectedElement, widths) {
        const { offsetLeft, clientWidth } = selectedElement;
        const offsetCentered = offsetLeft + clientWidth / 2 - widths.wrapper / 2;

        return Math.min(widths.content - widths.wrapper, Math.max(0, offsetCentered));
      }

      function scrollIntoView() {
        if (!selectedItem.value) return

        if (selectedIndex.value === 0 || (!props.centerActive && !isOverflowing.value)) {
          scrollOffset.value = 0;
        } else if (props.centerActive) {
          scrollOffset.value = calculateCenteredOffset(
            selectedItem.value,
            data.widths,
          );
        } else if (isOverflowing.value) {
          scrollOffset.value = calculateUpdatedOffset(
            selectedItem.value,
            data.widths,
            scrollOffset.value
          );
        }
      }

      function setWidths() {
        window.requestAnimationFrame(() => {
          const { content, wrapper } = context.refs;

          data.widths = {
            content: content ? content.clientWidth : 0,
            wrapper: wrapper ? wrapper.clientWidth : 0,
          };

          isOverflowing.value = data.widths.wrapper < data.widths.content;
          scrollIntoView();
        });
      }

      //v-model
      const internalValue = computed({
        get: () => {
          if (props.value) {
            if (props.multiple && !Array.isArray(props.value)) {
              return [props.value];
            }
            return props.value;
          }
          return props.multiple ? [] : null;
        },
        set: (value) => {
          context.emit('input', value);
        }
      });

      const selectedIndex = computed(() => {
        return internalValue.value ? props.items.findIndex((i) => i === internalValue.value) : -1;
      });

      const selectedItem = computed(() => props.multiple ? undefined : selectedItems.value[0])

      const selectedItems = computed(() => {
        const clonedValue = _.clone(internalValue.value);
        const childrenArray = [...context.refs.content.children];

        let clonedInternalValue = !Array.isArray(clonedValue) ? [].concat(clonedValue) : clonedValue;
        let selectedValues = [];
        for (const value of clonedInternalValue) {
          if (value) {
            selectedValues.push(_.findIndex(props.items, value));
          } else {
            selectedValues.push(-1);
          }
        }
        return childrenArray.filter((item, index) => selectedValues.includes(index));
      });

      const { toggleItem, isActiveItem } = groupable(props, internalValue);

      return {
        setWidths,
        containerClasses,
        slideGroupPrevClasses,
        slideGroupNextClasses,
        onAffixClick,
        toggleItem,
        isActiveItem
      }
    }
  }
</script>

<style scoped>

</style>
