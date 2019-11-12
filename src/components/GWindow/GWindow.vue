<script>
  import GWindowItem from '../GWindow/GWindowItem';
  import { computed, onMounted, watch, reactive, provide, inject } from '@vue/composition-api';
  import { getInternalValue } from '../../mixins/getVModel';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';
  import Touch from '../../directives/touch/touch';

  export default {
    name: 'GWindow',
    components: { GIcon, GBtn, GWindowItem },
    props: {
      value: null,
      hideDelimiters: { type: Boolean, default: true },
      verticalDelimiters: { type: String, default: undefined },
      delimiterIcon: {
        type: String,
        default: 'mdi-checkbox-blank-circle',
      },
      activeClass: {
        type: String,
        default: 'g-window__active',
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
      },
      touch: Object,
      touchless: Boolean,
    },
    directives: { Touch },
    setup(props, context) {
      const data = reactive({
        changedByDelimiters: undefined,
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
      const registerWindow = inject('registerWindow', null);

      onMounted(function () {
        window.requestAnimationFrame(() => (data.isBooted = true));
        registerWindow && registerWindow(this);
      });

      const classes = computed(() => ({
        'g-window__show-arrows-on-hover': props.showArrowsOnHover,
        'g-window__vertical-delimiters': isVertical.value,
        ['elevation-' + props.elevation]: true,
        [props.activeClass]: props.active
      }));

      const isVertical = computed(() => {
        return props.verticalDelimiters != null;
      });

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
        if (props.reverse !== undefined) {
          return props.reverse;
        }
        return data.isReverse;
      });

      provide('internalReverse', internalReverse);

      watch(internalValue, (val, oldVal) => {
        if (data.changedByDelimiters || props.continuous) {
          data.changedByDelimiters = false;
          return
        }

        data.isReverse = val < oldVal
      }, { flush: 'pre' });

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
              data.changedByDelimiters = true;
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

      function genDelimiters() {
        const nodeData = {
          staticClass: 'g-window-controls',
          style: {
            left: props.verticalDelimiters === 'left' && isVertical.value ? 0 : 'auto',
            right: props.verticalDelimiters === 'right' ? 0 : 'auto',
          }
        };
        return <div {...nodeData}>
          {genDelimiterItems()}
        </div>
      }

      function onDelimiterClick(index) {
        internalValue.value = index;
      }

      function toggleDelimiterIndex(index) {
        return internalValue.value === index;
      }

      function genDelimiterItems() {
        const children = [];
        const iconData = {
          props: {
            small: true
          }
        };

        data.items.map((item, index) => {
          const btnData = {
            props: {
              icon: true,
              active: toggleDelimiterIndex(index),
              textColor: '#FFFFFF8A',
              small: true
            },
            on: {
              click() {
                onDelimiterClick(index);
              }
            }
          };

          children.push(<g-btn {...btnData}>
            <g-icon {...iconData}>{props.delimiterIcon}</g-icon>
          </g-btn>);
        });

        return children;
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
          directives: []
        };

        const directiveValue = props.touch || {
          left: () => {
            next();
          },
          right: () => {
            prev();
          },
          end: (e) => {
            e.stopPropagation()
          },
          start: (e) => {
            e.stopPropagation()
          },
        };

        !props.touchless && windowData.directives.push({ name: 'touch', value: directiveValue });


        return <div ref="window" {...windowData}>{genContainer()} {!props.hideDelimiters && genDelimiters()}</div>
      }

      return {
        computedTransition,
        internalReverse,
        internalValue,
        genWindow,
        next,
        data,
        hasPrev,
        hasNext
      }
    }

    ,
    render() {
      return this.genWindow();
    }
  }
</script>

<style lang="scss" scoped>
  .g-window-controls {
    align-items: center;
    background: rgba(0, 0, 0, .3);
    bottom: 0;
    display: flex;
    height: 50px;
    justify-content: center;
    list-style-type: none;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  .g-window__vertical-delimiters {
    .g-window-controls {
      height: 100% !important;
      width: 50px;
      flex-direction: column;
    }
  }

  .g-window {
    position: relative;

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

      .g-btn {
        color: #ffffff8a
      }

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
