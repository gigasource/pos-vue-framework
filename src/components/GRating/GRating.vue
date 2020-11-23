<script>
  import { computed, reactive, ref } from 'vue';
  import getVModel from '../../mixins/getVModel';
  import { setTextColor } from '../../mixins/colorable';
  import { createRange } from '../../utils/helpers';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GRating',
    components: { GIcon },
    props: {
      backgroundColor: {
        type: String,
        // default: 'accent',
        default: 'blue lighten-4'
      },
      color: {
        type: String,
        default: 'blue'
        // default: 'primary',
      },
      clearable: Boolean,
      dense: Boolean,
      emptyIcon: {
        type: String,
        default: 'far fa-star',
      },
      fullIcon: {
        type: String,
        default: 'fas fa-star',
      },
      halfIcon: {
        type: String,
        default: 'fas fa-star-half',
      },
      halfIncrements: Boolean,
      hover: {
        type: Boolean,
        default: true
      },
      length: {
        type: [Number, String],
        default: 5,
      },
      readonly: Boolean,
      value: {
        type: Number,
        default: 0,
      },
      //sizing
      size: [Number, String],
      large: Boolean,
      small: Boolean,
      xLarge: Boolean,
      xSmall: Boolean,
    },
    setup(props, context) {
      const hoverIndex = ref(-1)
      const internalValue = getVModel(props, context)

      const iconProps = computed(() => ({
        large: props.large,
        medium: props.medium,
        small: props.small,
        size: props.size,
        xLarge: props.xLarge,
        xSmall: props.xSmall
      }))

      const isHovering = computed(() => props.hover && hoverIndex.value >= 0)

      function createClickFn(i) {
        return (e) => {
          if (props.readonly) return

          const newValue = genHoverIndex(e, i)
          if (props.clearable && internalValue.value === newValue) {
            internalValue.value = 0
          } else {
            internalValue.value = newValue
          }
        }
      }

      function createProps(i) {
        const itemProps = reactive({
          index: i,
          value: internalValue.value,
          click: createClickFn(i),
          isFilled: Math.floor(internalValue.value) > i,
          isHovered: Math.floor(hoverIndex.value) > i,
        })

        if (props.halfIncrements) {
          itemProps.isHalfHovered = !itemProps.isHovered && (hoverIndex.value - i) % 1 > 0
          console.log( (internalValue.value - i) % 1)
          itemProps.isHalfFilled = !itemProps.isFilled && (internalValue.value - i) % 1 > 0
        }

        return itemProps
      }

      function genHoverIndex(e, i) {
        let isHalf = isHalfEvent(e)
        return i + (isHalf ? 0.5 : 1)
      }

      function getIconName(itemProps) {
        const isFull = isHovering.value ? itemProps.isHovered : itemProps.isFilled
        const isHalf = isHovering.value ? itemProps.isHalfHovered : itemProps.isHalfFilled

        return isFull ? props.fullIcon : isHalf ? props.halfIcon : props.emptyIcon
      }

      function getColor(itemProps) {
        if (isHovering.value) {
          if (itemProps.isHovered || itemProps.isHalfHovered) return props.color
        } else {
          if (itemProps.isFilled || itemProps.isHalfFilled) return props.color
        }

        return props.backgroundColor
      }

      function isHalfEvent(e) {
        if (props.halfIncrements) {
          const rect = e.target && (e.target).getBoundingClientRect()
          if (rect && (e.pageX - rect.left) < rect.width / 2) return true
        }

        return false
      }

      function onMouseEnter(e, i) {
        hoverIndex.value = genHoverIndex(e, i)
      }

      function onMouseLeave() {
        hoverIndex.value = -1
      }

      const genItem = (i) => {
        const itemProps = createProps(i)

        if (context.slots.item) return context.slots.item(itemProps)

        const listeners = {
          click: itemProps.click,
        }

        if (props.hover) {
          listeners.mouseenter = (e) => onMouseEnter(e, i)
          listeners.mouseleave = onMouseLeave

          if (props.halfIncrements) {
            listeners.mousemove = (e) => onMouseEnter(e, i)
          }
        }

        let data = {
          ...setTextColor(getColor(itemProps)),
          ...{
            props: iconProps.value,
            on: listeners
          }
        };
        return <g-icon {...data}>
          {getIconName(itemProps)}
        </g-icon>
      }

      function genWrapper() {
        const children = createRange(Number(props.length)).map(i => genItem(i))

        return <div {...{
          class: {
            'g-rating': true,
            'g-rating--readonly': props.readonly,
            'g-rating--dense': props.dense
          }
        }}>
          {children}
        </div>
      }

      return {
        internalValue,
        genWrapper
      }
    },
    render() {
      return this.genWrapper()
    }
  }
</script>

<style scoped lang="scss">
  .g-rating {
    max-width: 100%;
    white-space: nowrap;

    .g-icon {
      padding: 0.5rem;
      border-radius: 50%;
      user-select: none;
    }

    &--readonly {
      .g-icon {
        pointer-events: none;
      }
    }

    &--dense {
      .g-icon {
        padding: 0.1rem;
      }
    }
  }
</style>
