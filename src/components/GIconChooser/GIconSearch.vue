<script>
  import _ from 'lodash'
  import { reactive, computed } from 'vue';
  import GTextField from '../GInput/GTextField'
  import GIcon from '../GIcon/GIcon';
  import { enterPressed } from '../../utils/keyboardHelper';
  import GPagination from './GIconPagination'
  import { getScopeIdRender } from '../../utils/helpers';

  export default {
    name: 'GIconSearch',
    components: { GIcon, GTextField, GPagination },
    emits: ['update:modelValue'],
    props: {
      icons: Array,
      value: String,
      placeHolder: String,
      renderItems: Function,
      renderItemsList: Function
    },
    setup(props, context) {
      const state = reactive({
        searchContent: props.modelValue || ''
      })

      const cptFilteredResult = computed(() => {
        if (state.searchContent !== '') {
          return _.filter(props.icons, icon => _.includes(icon.name, _.lowerCase(state.searchContent)))
        } else {
          return []
        }
      })

      const renderFn = () => {
        return <div>
          <div class='g-icon-search'>
            <g-icon color="rgb(179, 179, 179)">search</g-icon>
            <input
                modelValue={state.searchContent}
                placeholder={props.placeHolder}
                onKeyup={e => {
                  if (enterPressed(e)) {
                    state.searchContent = e.target.value
                    context.emit('update:modelValue', e.target.value)
                  }
                }}></input>
          </div>
          <g-pagination
              v-show={cptFilteredResult.value.length > 0}
              dataSrc={cptFilteredResult.value}
              itemsPerPage={30}
              pageIndexesShowInView={7}
              renderItems={props.renderItems}
              renderItemsList={props.renderItemsList}/>
        </div>
      }

      return {
        state,
        cptFilteredResult,
        renderWithScope: getScopeIdRender()(renderFn)
      }
    },
    render() {
      return this.renderWithScope()
    }
  }
</script>
<style scoped lang="scss">
  $height: 36px;
  .g-icon-search {
    border: 1px solid #0003;
    display: flex;
    margin: 5px;
    position: relative;
    background-color: white;
    height: 36px;

    & > input {
      flex: 1;
      padding: 5px;
      font-size: 14px;
      color: rgb(179, 179, 179);
      border: none;
      outline: none;
    }
  }
</style>
