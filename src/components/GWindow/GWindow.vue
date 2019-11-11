<script>
  import GWindowItem from '../GWindow/GWindowItem';
  import getVModel from '../../mixins/getVModel';
  import { createElement as h, computed, onMounted, watch, reactive, provide } from '@vue/composition-api';
  import { getInternalValue } from '../../mixins/getVModel';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GWindow',
    components: { GIcon, GBtn, GWindowItem },
    props: {
      value: null,
      activeClass: {
        type: String,
        default: 'g-window-item__active',
      },
      continuous: Boolean,
      nextIcon: {
        type: [Boolean, String],
        default: 'mdi-chevron-right',
      },
      prevIcon: {
        type: [Boolean, String],
        default: 'mdi-chevron-left',
      },
      reverse: {
        type: Boolean,
        default: undefined,
      },
      showArrows: {
        type: Boolean,
        default: true
      },
      showArrowsOnHover: Boolean,
      vertical: Boolean,
      elevation: {
        type: [String, Number],
        default: 2
      }
    },
    setup(props, context) {
      const data = reactive({
        transitionHeight: undefined, // Intermediate height during transition.
        transitionCount: 0, // Number of windows in transition state.
        isBooted: false,
        isReverse: false,
        items: []
      });

      const internalValue = getInternalValue(props, context);

      function register(item) {
        item.data.value = data.items.push(item) - 1;
      }

      function unregister(item) {
        const index = data.items.findIndex(g => g._uid === item._uid);

        if (index > -1) {
          data.items.splice(index, 1);
        }
      }

      provide('register', register);
      provide('unregister', unregister);
      provide('windowData', data);
      provide('internalValue', internalValue);

      onMounted(function () {
        window.requestAnimationFrame(() => (data.isBooted = true));
      });

      const classes = computed(() => ({
        'g-window__show-arrows-on-hover': props.showArrowsOnHover,
        ['elevation-' + props.elevation]: true,
      }));

      const isActive = computed(() => {
        return data.transitionCount > 0;
      });

      const hasNext = computed(() => {
        return props.continuous || internalValue.value < data.items.length - 1
      });

      const hasPrev = computed(() => {
        return props.continuous || internalValue.value > 0
      });

      const internalReverse = computed(() => {
        if(props.reverse !== undefined) {
          return props.reverse;
        }
        return data.isReverse;
      });

      provide('internalReverse', internalReverse);

      watch(internalValue, (val, oldVal) => {
        data.isReverse = val < oldVal
      });

      const hasActiveItems = computed(() => {
        return Boolean(
          data.items.find(item => !item.disabled)
        )
      });

      const computedTransition = computed(() => {
        if (!data.isBooted) {
          return '';
        }

        const axis = props.vertical ? 'y' : 'x';
        const direction = internalReverse.value ? '-reverse' : '';

        return `g-window-${axis}${direction}-transition`
      });

      provide('windowComputedTransition', computedTransition);

      function getNextIndex(index) {
        const nextIndex = (index + 1) % data.items.length;
        const item = data.items[nextIndex];
        if (item.disabled) {
          return getNextIndex(nextIndex);
        }

        return nextIndex;
      }

      function getPrevIndex(index) {
        const prevIndex = (index + data.items.length - 1) % data.items.length;

        const item = data.items[prevIndex];
        if (item.disabled) {
          return getPrevIndex(prevIndex);

        }

        return prevIndex
      }

      function next() {
        data.isReverse = false;

        /* istanbul ignore if */
        if (!hasActiveItems.value || !hasNext.value) {
          return;
        }

        internalValue.value = getNextIndex(internalValue.value);
      }

      function prev() {
        data.isReverse = true;

        /* istanbul ignore if */
        if (!hasActiveItems.value || !hasPrev.value) {
          return;
        }

        internalValue.value = getPrevIndex(internalValue.value);
      }

      function genIcon(direction, icon, fn) {
        const btnData = {
          props: {
            icon: true,
          },
          on: {
            click: () => {
              fn();
            }
          }
        };

        const iconData = {
          props: {
            large: true
          }
        };

        return <div class={`g-window__${direction}`}>
          <g-btn {...btnData}>
            <g-icon {...iconData}>{icon}</g-icon>
          </g-btn>
        </div>
      }

      function genControlIcons() {
        const icons = [];
        if (hasPrev.value && props.prevIcon) {
          const icon = genIcon('prev', props.prevIcon, prev);
          icon && icons.push(icon);
        }

        if (hasNext.value && props.nextIcon) {
          const icon = genIcon('next', props.nextIcon, next);
          icon && icons.push(icon);
        }

        return icons;
      }

      function genContainer() {
        const containerData = {
          staticClass: 'g-window__container',
          class: {
            'g-window__container__is-active': isActive.value,
          },
          style: {
            height: data.transitionHeight,
          },
        };

        return <div {...containerData}> {[context.slots.default && context.slots.default(), props.showArrows && genControlIcons()]}</div>
      }

      function genWindow() {
        const windowData = {
          staticClass: 'g-window',
          class: classes.value,
        }
        return <div ref="window" {...windowData}>{genContainer()}</div>
      }

      return {
        computedTransition,
        internalReverse,
        internalValue,
        genWindow,
        data,
        hasPrev,
        hasNext
      }
    }, render() {
      return this.genWindow();
    }
  }
</script>

<style lang="scss" scoped>
  .g-window {
    &__container {
      height: inherit;
      position: relative;
      transition: .3s cubic-bezier(.25, .8, .50, 1);

      &__is-active {
        overflow: hidden;
      }
    }

    &__prev,
    &__next {
      background: rgba(0, 0, 0, .3);
      border-radius: 50%;
      position: absolute;
      margin: 0 16px;
      top: calc(50% - 20px);
      z-index: 1;

      .g-btn:hover {
        background: none;
      }
    }

    &__prev {
      left: 0;
    }

    &__next {
      right: 0;
    }

    &__show-arrows-on-hover {
      overflow: hidden;

      .g-window__next,
      .g-window__prev {
        transition: .2s transform cubic-bezier(0.25, 0.8, 0.5, 1);
      }

      .g-window__prev {
        transform: translateX(-200%);
      }

      .g-window__next {
        transform: translateX(200%);
      }

      &:hover {
        .g-window__next,
        .g-window__prev {
          transform: translateX(0);
        }
      }
    }

    &-x-transition,
    &-x-reverse-transition,
    &-y-transition,
    &-y-reverse-transition {
      &-enter-active,
      &-leave-active {
        transition: .3s cubic-bezier(.25, .8, .50, 1);;
      }

      &-leave,
      &-leave-to {
        position: absolute !important;
        top: 0;
        width: 100%;
      }
    }

    &-x-transition {
      &-enter {
        transform: translateX(100%);
      }

      &-leave-to {
        transform: translateX(-100%);
      }
    }

    &-x-reverse-transition {
      &-enter {
        transform: translateX(-100%);
      }

      &-leave-to {
        transform: translateX(100%);
      }
    }

    &-y-transition {
      &-enter {
        transform: translateY(100%)
      }

      &-leave-to {
        transform: translateY(-100%)
      }
    }

    &-y-reverse-transition {
      &-enter {
        transform: translateY(-100%)
      }

      &-leave-to {
        transform: translateY(100%)
      }
    }
  }

</style>
