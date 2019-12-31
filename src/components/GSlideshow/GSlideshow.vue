<script>
  import GSlideshowContent from './GSlideshowContent';

  export default {
    name: "GSlideshow",
    components: { GSlideshowContent },
    props: {
      value: Array,
      defaultTransition: {
        type: String,
        default: "None"
      },
      transitionDuration: {
        type: Number,
        default: 1500
      }
    },
    data() {
      return {
        count: 0
      }
    },
    watch: {
      value() {
        this.count++;
      }
    },
    render(h) {
      return h('GSlideshowContent', {props: this.$props, key: this.count, on: this.$listeners})
    }
  }
</script>