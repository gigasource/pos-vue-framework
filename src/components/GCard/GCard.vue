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
        textColor: String,
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
        elevation: {
          type: [String, Number],
          default: 2
        },
        height: [String, Number],
        img: String,
        outlined: Boolean,
        raised: Boolean,
      }
    }, setup(props, context) {
      const { classes, styles } = GCardUtils(props, context);

      function genCard() {
        const nodeData = {
          class: classes.value,
          style: styles.value,
          on: {
            click: (event) => {
              context.emit('click', event)
            }
          }
        }
        return <div {...nodeData}>
          {context.slots.default && context.slots.default()}
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

<style scoped lang="scss">
	@import "GCard";
</style>
