<script>
  import Ripple from '../../directives/ripple/ripple';
  import GBtnUtil from './logic/GBtnUtil';

  export default {
    name: 'GBtn', directives: {
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
    render(h) {
      const genBtn = () => {
        const nodeData = {
          class: this.classes,
          style: this.styles,
          directives: this.ripple ? [{ name: 'ripple', value: undefined }] : [],
          on: {
            click: (e) => this.$emit('click', e),
            mouseenter: (e) => this.$emit('mouseenter', e),
            mouseleave: (e) => this.$emit('mouseleave', e),
            mouseup: (e) => this.$emit('mouseup', e),
            mousedown: (e) => this.$emit('mousedown', e),
          }
        };

        return <button {...nodeData}>
          <span className="g-btn__content">
            {this.$slots.default}
          </span>
        </button>
      };

      return genBtn();
    }

  }
</script>

<style lang="scss" scoped>
  @import "GBtn";
</style>
