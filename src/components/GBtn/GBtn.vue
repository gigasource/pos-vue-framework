<script>
import Ripple from '../../directives/ripple/ripple';
import GBtnUtil from './logic/GBtnUtil';
import { getScopeIdRender } from '../../utils/helpers';

export default {
  name: 'GBtn',
  directives: {
    Ripple
  },
  props: {
    //classes
    ...{
      ripple: { type: Boolean, default: true },
      raised: Boolean,
      depressed: Boolean,
      disabled: Boolean,
      rounded: Boolean,
      text: Boolean,
      flat: Boolean,
      fab: Boolean,
      tile: Boolean,
      icon: Boolean,
      outlined: Boolean,
      dashed: Boolean,
      active: Boolean,
      activeClass: {
        type: String,
        default: 'g-btn__active',
      },
      uppercase: {
        type: Boolean,
        default: true,
      }
    },
    //style
    ...{
      elevation: [String, Number],
      absolute: Boolean,
      fixed: Boolean,
      top: Boolean,
      bottom: Boolean,
      left: Boolean,
      right: Boolean,
      large: Boolean,
      small: Boolean,
      xLarge: Boolean,
      xSmall: Boolean,
      maxHeight: [String, Number],
      maxWidth: [String, Number],
      minHeight: [String, Number],
      minWidth: [String, Number],
      width: [String, Number],
      height: [String, Number],
      block: Boolean,
      textColor: String,
      backgroundColor: String,
      gradient: String,
      gradientAngle: { type: String, default: '45deg' },
      borderRadius: [Number, String],
    }
  },
  setup(props, context) {
    const { classes, styles } = GBtnUtil(props, context);
    return { classes, styles }
  },
  emits: ['click', 'mouseenter', 'mouseleave', 'mouseup', 'mousedown'],
  render() {
    const genBtn = () => {
      const nodeData = {
        class: this.classes,
        style: this.styles,
        onClick: (e) => this.$emit('click', e),
        onMouseEnter: (e) => this.$emit('mouseenter', e),
        onMouseLeave: (e) => this.$emit('mouseleave', e),
        onMouseUp: (e) => this.$emit('mouseup', e),
        onMouseDown: (e) => this.$emit('mousedown', e),
      };
      if (this.ripple) return (<div v-ripple {...nodeData}>
        <span class="g-btn__content">
          {!!this.$slots.default && this.$slots.default()}
        </span>
      </div>)
      else return (<div {...nodeData}>
        <span class="g-btn__content">
          {!!this.$slots.default && this.$slots.default()}
        </span>
      </div>)
    };

    const scopeIdRender = getScopeIdRender()
    return scopeIdRender(genBtn)();
  }

}
</script>

<style lang="scss" scoped>
@import "GBtn";
</style>
