<script>
  import { computed, onMounted, watch, reactive, provide } from '@vue/composition-api';
  import { convertToUnit, getInternalValue } from '../../utils/helpers';
  import GWindow from '../GWindow/GWindow';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GCarousel',
    components: { GIcon, GBtn, GWindow },
    props: {
      value: null,
      nextIcon: {
        type: [Boolean, String],
        default: 'mdi-chevron-right',
      },
      prevIcon: {
        type: [Boolean, String],
        default: 'mdi-chevron-left',
      },
      continuous: {
        type: Boolean,
        default: true,
      },
      cycle: Boolean,
      delimiterIcon: {
        type: String,
        default: 'mdi-checkbox-blank-circle',
      },
      height: {
        type: [Number, String],
        default: 500,
      },
      width: {
        type: [Number, String],
        default: '100%',
      },
      hideDelimiters: Boolean,
      hideDelimiterBackground: Boolean,
      interval: {
        type: [Number, String],
        default: 6000,
        validator: (value) => value > 0,
      },
      elevation: Number,
      showArrows: {
        type: Boolean,
        default: true,
      },
      showArrowsOnHover: Boolean,
      vertical: Boolean,
      verticalDelimiters: {
        type: String,
        default: undefined,
      },
    },
    setup(props, context) {
      const data = reactive({
        internalHeight: props.height,
        slideTimeout: undefined,
        carousel: null,
        window: null
      });

      onMounted(function () {
        data.carousel = this;
        startTimeout();
      });

      function registerWindow(window) {
        data.window = window;
      }

      provide('registerWindow', registerWindow);

      const internalValue = getInternalValue(props, context);
      const cycle = computed(() => {
        return props.cycle;
      });
      watch(internalValue, () => restartTimeout());
      watch(cycle, (val) => {
        if (val) {
          restartTimeout()
        } else {
          clearTimeout(data.slideTimeout);
          data.slideTimeout = undefined;
        }
      }, { lazy: true });
      const classes = computed(() => {
        return {
          'g-carousel': true,
          'g-carousel__hide-delimiter-background': props.hideDelimiterBackground,
        }
      });

      const styles = computed(()=>({
        height: convertToUnit(props.height),
        width: convertToUnit(props.width)
      }));

      function restartTimeout() {
        data.slideTimeout && clearTimeout(data.slideTimeout);
        data.slideTimeout = undefined;

        window.requestAnimationFrame(startTimeout);
      }

      function startTimeout() {
        if (!props.cycle) {
          return;
        }

        data.slideTimeout = window.setTimeout(data.window.next, +props.interval > 0 ? +props.interval : 6000)
      }

      function genCarousel() {
        const nodeData = {
          class: classes.value,
          style: styles.value,
          props: {
            showArrows: props.showArrows,
            hideDelimiters: props.hideDelimiters,
            verticalDelimiters: props.verticalDelimiters,
            continuous: props.continuous,
            nextIcon: props.nextIcon,
            prevIcon: props.prevIcon,
            vertical: props.vertical,
            reverse: props.reverse,
            delimiterIcon: props.delimiterIcon,
            elevation: props.elevation,
            showArrowsOnHover: props.showArrowsOnHover
          }
        };

        return <g-window {...nodeData} vOn:input={e => internalValue.value = e} value={internalValue.value}>
          {context.slots.default && context.slots.default()}
        </g-window>
      }

      return {
        data,
        genCarousel
      }
    }, render() {
      return this.genCarousel();
    }
  }
</script>

<style lang="scss" scoped>
  .g-carousel {
    overflow: hidden;
    position: relative;
    width: 100%;

    &__controls {
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
  }

  .g-carousel .g-window-item {
    display: block;
    height: inherit;
    text-decoration: none;
  }

  // Modifier
  ::v-deep.g-carousel__hide-delimiter-background .g-window-controls {
    background: transparent;
  }
</style>
