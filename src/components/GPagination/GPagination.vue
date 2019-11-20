<script>
  import _ from 'lodash'
  import { reactive, computed } from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn'


  export default {
    name: 'Paging',
    components: { GBtn },
    props: {
      dataSrc: Array,
      itemsPerPage: Number,
      pageIndexesShowInView: Number,
      renderItems: Function,
    },
    setup(props, context) {
      const _state = reactive({ selectedIndex: 0 })
      const cptTotalPages = computed(() => {
        console.log('re cpt total pages')
        return Math.floor((props.dataSrc.length + props.itemsPerPage - 1) / props.itemsPerPage)
      })

      function getPageDataFn(pageIndex) {
        return props.dataSrc.slice(pageIndex * props.itemsPerPage, pageIndex * props.itemsPerPage + props.itemsPerPage)
      }

      const cptPages = computed(() => {
        const _pages = []
        for (let i = 0; i < cptTotalPages.value; ++i) {
          _pages.push({
            index: i,
            items: getPageDataFn(i),
            select: () => _state.selectedIndex = i
          })
        }
        return _pages
      })

      const cptPageIndexes = computed(() => {
        const half = Math.floor(props.pageIndexesShowInView / 2)
        if (cptTotalPages.value <= props.pageIndexesShowInView) {
          return cptPages.value
        } else {
          if (_state.selectedIndex <= half) {
            return [...cptPages.value.slice(0, props.pageIndexesShowInView)]
          } else if (_state.selectedIndex >= cptTotalPages.value - 1 - half) {
            return [...cptPages.value.slice(cptTotalPages.value - props.pageIndexesShowInView, cptTotalPages.value)]
          } else {
            const start = _state.selectedIndex - half
            return [...cptPages.value.slice(start, _state.selectedIndex + half + 1)]
          }
        }
      })

      const cptCanGoBegin = computed(() => _state.selectedIndex > 0)
      const cptCanGoBack = computed(() => _state.selectedIndex > 0)
      const cptCanGoNext = computed(() => _state.selectedIndex < cptTotalPages.value - 1)
      const cptCanGoEnd = computed(() => _state.selectedIndex < cptTotalPages.value - 1)
      const goBegin = () => _state.selectedIndex = 0
      const goBack = () => _state.selectedIndex--
      const goNext = () => _state.selectedIndex++
      const goEnd = () => _state.selectedIndex = cptTotalPages.value - 1

      // custom render
      const _renderItems = props.renderItems || (item => <div>{item}</div>)

      return () => {
        return (
            <div>
              <div class="items">
                {_.map(cptPages.value[_state.selectedIndex].items, _renderItems)}
              </div>
              <div class="page-indexes">
                <g-btn
                    rounded
                    maxWidth={30}
                    maxHeight={30}
                    disabled={!cptCanGoBegin.value}
                    vOn:click={() => goBegin()}>|&lt;</g-btn>
                <g-btn
                    rounded
                    width={30}
                    maxWidth={30}
                    maxHeight={30}
                    disabled={!cptCanGoBack.value}
                    vOn:click={() => goBack()}>&lt;</g-btn>
                {
                  _.map(cptPageIndexes.value, page => page
                      ?
                      <g-btn
                          rounded
                          width={30}
                          maxWidth={30}
                          maxHeight={30}
                          disabled={page.index === _state.selectedIndex}
                          vOn:click={() => page.select()}>
                        {page.index + 1}
                      </g-btn>
                      : <span class="paging__nav__ellipsis">..</span>
                  )
                }
                <g-btn
                    rounded
                    maxWidth={30}
                    maxHeight={30}
                    disabled={!cptCanGoNext.value}
                    vOn:click={() => goNext()}>&gt;</g-btn>
                <g-btn
                    rounded
                    maxWidth={30}
                    maxHeight={30}
                    disabled={!cptCanGoEnd.value}
                    vOn:click={() => goEnd()}>&gt;|
                </g-btn>
              </div>
            </div>)
      }
    }
  }
</script>
<style scoped lang="scss">
  .items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    min-height: 400px;
  }

  .page-indexes {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .paging {
    &__nav {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 5px;
      border: 1px solid #0003;
      /*transition: background-color 0.5s;*/

      &:hover {
        cursor: pointer;
        border: 1px solid #0003;
        background-color: #aaa;
      }

      &:focus {
        outline: none;
      }

      &--disabled {
        pointer-events: none;
        color: #aaa;
      }

      &--selected {
        background: #888;
        color: #fff;
      }

      &__ellipsis {
        width: 15px;
        height: 30px;
        margin: 5px 0;
        text-align: center;
      }
    }
  }
</style>
