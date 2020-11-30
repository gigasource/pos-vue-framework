<script>
import GSlideshowContent from './GSlideshowContent';

const { h } = require('vue')
export default {
  name: 'GSlideshow',
  components: { GSlideshowContent },
  props: {
    modelValue: Array,
    defaultTransition: {
      type: String,
      default: 'None'
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
  setup(props) {
    return () => h(GSlideshowContent, Object.assign({}, props))
  }
}
</script>
