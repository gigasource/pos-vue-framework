<script>
  import GCardUtils from './logic/GCardUtils';

  export default {
    name: 'GCard',
    props: {
      //classes
      ...{
        active: Boolean,
        activeClass: {
          type: String,
          default: 'g-card__active'
        },
        shaped: Boolean,
        disabled: Boolean,
        isClickable: Boolean,
        loading: Boolean,
        backgroundColor: String,
        flat: Boolean,
        hover: Boolean,
        color: String,
        tile: Boolean,
      },
      //styles
      ...{
        minWidth: [String, Number],
        maxWidth: [String, Number],
        minHeight: [String, Number],
        maxHeight: [String, Number],
        ripple: Boolean,
        width: [String, Number],
        borderRadius: [String, Number],
        elevation: [String, Number],
        height: [String, Number],
        img: String,
        outlined: Boolean,
        raised: Boolean,
      }
    }, setup(props, context) {
      const { classes, styles } = GCardUtils(props, context);

      function genCard() {
        return <div class={classes.value} style={styles.value} vOn:click={(event) => {
          context.emit('click', event)
        }}>
          {context.slots.default()}
        </div>
      }

      return {
        genCard
      }
    },
    render() {
      return this.genCard();
    }
  }
</script>

<style scoped>

</style>
