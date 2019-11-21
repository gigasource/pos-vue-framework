<script>
  import _ from 'lodash'
  import { reactive, computed } from '@vue/composition-api';
  import { enterPressed } from '../../utils/keyboardHelper';
  import GTextField from '../GInput/GTextField'

  export default {
    name: 'GIconSearch',
    components: { GTextField },
    props: {
      icons: Array,
      value: String,
      renderResultItem: Function
    },
    setup(props, context) {
      return () => {
        const state = reactive({
          searchContent: props.value
        })
        const cptFilteredResult = computed(() => {
          if (state.searchContent != '') {
            return _.filter(props.icons, icon => _.includes(icon.name, _.lowerCase(state.searchContent)))
          } else {
            return []
          }
        })
        return <div class='g-icon-search'>
          <g-text-field
              solo
              prependInnerIcon="search"
              value={state.searchContent}
              vOn:enter={v =>  {
                state.searchContent = v
                context.emit('input', v)
              }}
          />
          <div vShow={cptFilteredResult.value.length > 0}>
            {_.map(cptFilteredResult.value, props.renderResultItem)}
          </div>
        </div>
      }
    }
  }
</script>
<style scoped>
</style>
