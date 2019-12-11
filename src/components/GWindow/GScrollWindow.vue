<script>
  import GWindowItem from '../GWindow/GWindowItem';
  import { computed, onMounted, provide, reactive, watch } from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GScrollWindow',
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
      reverse: Boolean,
      showArrows: Boolean,
      showArrowsOnHover: Boolean,
      vertical: Boolean,
      elevation: {
        type: [String, Number],
        default: 2
      },
    },
    setup(props) {
      const data = reactive({
        transitionHeight: undefined, // Intermediate height during transition.
        transitionCount: 0, // Number of windows in transition state.
        isBooted: false,
        isReverse: false,
        items: []
      });

      onMounted(function () {
        this.$forceUpdate = () => null;
      })

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

      const classes = computed(() => ({
        'g-window__vertical-delimiters': isVertical.value,
        ['elevation-' + props.elevation]: true,
        [props.activeClass]: props.active
      }));

      const isVertical = computed(() => props.verticalDelimiters != null);

      const isActive = computed(() => data.transitionCount > 0);

      watch(() => props.value, (val, oldVal) => {
        if (val !== oldVal) {
          const currentElement = data.items[props.value].$el;
          currentElement.scrollIntoView({ block: 'center' });
        }
      }, { lazy: true });

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

      function isActiveIndex(index) {
        return internalValue.value === index;
      }

      function genDelimiterItems() {
        return data.items.map((item, index) => <g-btn icon small
                                                      active={isActiveIndex(index)}
                                                      textColor="#FFFFFF8A"
                                                      vOn:click={() => onDelimiterClick(index)}
          >
            <g-icon small>{props.delimiterIcon}</g-icon>
          </g-btn>
        )
      }

      function genContainer() {
        const containerData = {
          staticClass: 'g-window__container',
          class: {
            'g-window__container__is-active': isActive.value,
          },
          id: 'window-container',
          style: {
            height: data.transitionHeight,
          },
        };

        return <div {...containerData}>
          {this.$slots.default}
        </div>
      }

      function genWindow() {
        const windowData = {
          staticClass: 'g-window',
          class: classes.value,
          directives: []
        };

        return <div ref="window" {...windowData}>{genContainer.bind(this)()} {!props.hideDelimiters && genDelimiters()}</div>
      }

      return {
        genWindow,
        data,
      }
    },
    render() {
      return this.genWindow.bind(this)();
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

  .g-window__container {
    display: flex;
    box-sizing: content-box;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
  }

  .g-window__container::-webkit-scrollbar {
    display: none;
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
