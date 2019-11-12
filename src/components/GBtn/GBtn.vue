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
        value: null,
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
        color: String,
        backgroundColor: String,
        gradient: String,
        gradientAngle: { type: String, default: '45deg' },
      }
    },
    setup(props, context) {
      const { classes, styles } = GBtnUtil(props, context);

      function genBtnContent() {
        return <span class="g-btn__content">
          {context.slots.default && context.slots.default()}
        </span>
      }

      function genBtn() {
        return <button ref="btn" id="btn" v-ripple class={classes.value} style={styles.value} vOn:click={(event) => {
          context.emit('click', event);
          context.refs.btn.blur();
        }}>
          {genBtnContent()}
        </button>
      }

      return {
        genBtn
      }
    }, render() {
      return this.genBtn();
    }

  }
</script>

<style scoped lang="scss">
	@import "_GBtn.scss";
</style>
