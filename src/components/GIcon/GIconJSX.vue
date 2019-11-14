<script>
  import {computed, ref, onMounted, onUpdated} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';
  import {setTextColor} from '../../mixins/colorable';
  //import { Fragment } from 'vue-fragment'

  export default {
    name: "GIconJSX",
    props: {
      value: String,
      dense: Boolean,
      disabled: Boolean,
      left: Boolean,
      right: Boolean,
      color: [String],
      size: [Number, String],
      xSmall: Boolean,
      small: Boolean,
      medium: Boolean,
      large: Boolean,
      xLarge: Boolean,
    },
    setup(props, context) {
      const icon = computed(()=> context.slots.default? context.slots.default()[0].text.trim() : '')

      function genIcon() {
        return
      }

      return {
        genIcon
      }
    },
    render() {
      return this.genIcon()
    }
  }

  function isFontAwesome5(icon) {
    return ['fas', 'far', 'fal', 'fab'].some(val => icon.includes(val))
  }

  function isSvgPath(icon) {
    return (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(icon) && /[\dz]$/i.test(icon) && icon.length > 4)
  }

  function isCustomSvgIcon(icon) {
    return icon.slice(-3) === 'svg'
  }

  function getSize(props) {
    if (props.xSmall) return '12px'
    if (props.small) return '16px'
    if (props.medium) return '28px'
    if (props.large) return '36px'
    if (props.xLarge) return '40px'
    if (props.size) return convertToUnit(props.size)
    return '24px'
  }
</script>

<style scoped>

</style>