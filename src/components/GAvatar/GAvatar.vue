<script>
  import { computed, onMounted, reactive, ref, watch } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable';

  export default {
    name: 'GAvatar',
    props: {
      backgroundColor: String,
      textColor: String,
      maxHeight: [Number, String],
      maxWidth: [Number, String],
      minHeight: [Number, String],
      left: Boolean,
      right: Boolean,
      size: {
        type: [Number, String],
        default: 48,
      },
      tile: Boolean,
    },
    setup(props, context) {
      const classes = computed(() => ({
        'g-avatar': true,
        'g-avatar__left': props.left,
        'g-avatar__tile': props.tile,
        ...backgroundColorOutput.value && backgroundColorOutput.value.class,
        ...textColorOutput.value && textColorOutput.value.class
      }));

      const styles = computed(() => ({
        height: convertToUnit(props.size),
        width: convertToUnit(props.size),
        minWidth: convertToUnit(props.size),
        minHeight: convertToUnit(props.minHeight),
        maxHeight: convertToUnit(props.maxHeight),
        maxWidth: convertToUnit(props.maxWidth),
        ...backgroundColorOutput.value && backgroundColorOutput.value.style,
        ...textColorOutput.value && textColorOutput.value.style,
      }));

      const backgroundColorOutput = computed(() => {
        if (props.backgroundColor) {
          return props.backgroundColor && setBackgroundColor(props.backgroundColor, {})
        }
      });

      const textColorOutput = computed(() => {
        return props.textColor && setTextColor(props.textColor, {})
      });

      function genAvatar() {
        return <div class={classes.value} style={styles.value}>
          {context.slots.default()}
        </div>
      }

      return {
        genAvatar
      }
    },
    render() {
      return this.genAvatar()
    }
  }
</script>

<style lang="scss" scoped>
  .g-avatar {
    background-color: #f5f5f5;
    align-items: center;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    line-height: normal;
    position: relative;
    text-align: center;
    vertical-align: middle;

    img,
    svg,
    ::v-deep.g-icon,
    ::v-deep.g-image,
    .g-responsive__content {
      border-radius: 50% !important;
      display: inline-flex;
      height: inherit !important;
      width: inherit !important;

      .g-image-content {
        border-radius: 50% !important;
      }

    }

    &__tile {
      border-radius: 0;
    }
  }

</style>
