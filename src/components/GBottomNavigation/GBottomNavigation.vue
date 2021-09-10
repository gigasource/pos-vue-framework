<script>
import {ref, computed} from 'vue'
import {genScopeId} from '../../utils/helpers';
import scrollable from '../../mixins/scrollable'
import measurable from '../../mixins/measurable'
import {setBackgroundColor, setTextColor} from '../../mixins/colorable';

export default {
  name: 'GBottomNavigation',
  props: {
    activeClass: {
      type: String,
      default: 'g-btn--active',
    },
    backgroundColor: String,
    absolute: Boolean,
    fixed: Boolean,
    height: {
      type: [Number, String],
      default: 56,
    },
    hideOnScroll: Boolean,
    inputValue: {
      type: Boolean,
      default: true,
    },
    grow: Boolean,
    horizontal: Boolean,
    shift: Boolean,
    scrollTarget: String,
    scrollThreshold: [String, Number],
  },
  setup(props, ctx) {
    const isActive = ref(props.inputValue)
    const containerEl = ref()
    const canScroll = computed(() => props.hideOnScroll || !props.inputValue)
    scrollable(props, ctx, canScroll, active => {
      isActive.value = active
      ctx.emit('update:input-value', isActive.value)
    })
    const measurableStyles = measurable(props)
    const classes = computed(() => {
      return {
        'g-bottom-navigation--absolute': props.absolute,
        'g-bottom-navigation--fixed': props.fixed,
        'g-bottom-navigation--grow': props.grow,
        'g-bottom-navigation--horizontal': props.horizontal,
        'g-bottom-navigation--vertical': !props.horizontal,
        'g-bottom-navigation--shift': !props.horizontal && props.shift,
      }
    })
    const styles = computed(() => {
      return {
        ...measurableStyles.value,
        transform: isActive.value ? 'none' : 'translateY(100%)',
      }
    })

    if (ctx.attrs.hasOwnProperty('active')) {
       console.error('active.sync', 'value or v-model', props.name)
    }

    return genScopeId(() => {
      const data = setBackgroundColor(props.backgroundColor, {
        staticClass: 'g-bottom-navigation',
        class: classes.value,
        style: styles.value,
        props: {
          activeClass: props.activeClass,
          value: props.internalValue,
        },
        on: {change: val => ctx.emit('change', val)},
      })

      return <div class="g-bottom-navigation elevation-4" ref={containerEl} {...setTextColor(props.color, data)}>
        {ctx.slots.default && ctx.slots.default()}
      </div>
    })
  }
}
</script>
<style scoped lang="scss">
.g-bottom-navigation {
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 4;
  transition: 0.5s;

  &--absolute {
    position: absolute;
  }
  &--fixed {
    position: fixed;
  }

  &--grow {
    :deep {
      &>* {
        flex: 1;
        max-width: 168px;
      }
    }
  }

  &--horizontal {
    :deep {
      &>* {
        display: flex;
        flex-direction: row;
      }
    }
  }

  &--vertical {
    :deep {
      &>* {
        display: flex;
        flex-direction: column;
      }
    }
  }

  &--shift {
    :deep {
      &>* {
        position: relative;
      }

      &>*:not(.active) {
        &>span {
          opacity: 0;
          transform: scale(.9);
          position: absolute;
          top: calc(100% - 12px);
        }
      }

      &>*.active {
        &>span {
          opacity: 1;
          top: calc(100% - 22px);
          transform: scale(1);
        }
      }
    }
  }

  :deep {
    .g-btn, .g-btn-bs {
      margin: 0
    }
  }
}
</style>
