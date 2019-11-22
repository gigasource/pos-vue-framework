<script>
  import _ from 'lodash'
  import { reactive, computed } from '@vue/composition-api';
  import GTextField from '../GInput/GTextField'
  import GIcon from '../GIcon/GIcon';
  import { enterPressed } from '../../utils/keyboardHelper';
  import GPagination from './GIconPagination'

  export default {
    name: 'GIconSearch',
    components: { GIcon, GTextField, GPagination },
    props: {
      icons: Array,
      value: String,
      placeHolder: String,
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
        return <div>
          <div class='g-icon-search'>
            <g-icon color="rgb(179, 179, 179)">search</g-icon>
            <input
                value={state.searchContent}
                placeholder={props.placeHolder}
                vOn:keyup={e => {
                  if (enterPressed(e)) {
                    state.searchContent = e.target.value
                    context.emit('input', e.target.value)
                  }
                }}></input>
          </div>
          <g-pagination
              vShow={cptFilteredResult.value.length > 0}
              dataSrc={cptFilteredResult.value}
              itemsPerPage={30}
              pageIndexesShowInView={7}
              renderItems={props.renderResultItem}
              vOn:viewmode={viewMode => state.pagingViewMode = viewMode}/>
        </div>
      }
    }
  }
</script>
<style scoped lang="scss">
  $height: 36px;
  .g-icon-search {
    display: flex;
    margin: 10px 10px;
    position: relative;
    background-color: white;
    height: 36px;

    &:before{
      position: absolute;
      content: '';
      top:0;
      left: 0;
      transform: translateX(-100%);
      width: 0;
      height: 0;
      border-width: $height/2 10px $height/2 10px;
      border-color: transparent;
      border-style: solid;
      border-right-color: white;
    }

    &:after{
      position: absolute;
      content: '';
      top:0;
      right: 0;
      transform: translateX(100%);
      width: 0;
      height: 0;
      border-width: $height/2 10px $height/2 10px;
      border-color: transparent;
      border-style: solid;
      border-left-color: white;
    }

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
