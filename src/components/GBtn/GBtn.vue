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
        gradientAngle: { type: String, default: '45deg' },
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
        block: Boolean,
        width: [String, Number],
        height: [String, Number],
        textColor: String,
        color: String,
        backgroundColor: String,
        gradient: String,
      }
    },
    setup(props, context) {
      const { classes, styles } = GBtnUtil(props, context);

      function genBtnContent() {
        return <span class="g-btn__content">
          {context.slots.default()}
        </span>
      }

      function genBtn() {
        return <button v-ripple class={classes.value} style={styles.value} vOn:click={(event) => {
          context.emit('click', event)
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

<style scoped>

</style>
