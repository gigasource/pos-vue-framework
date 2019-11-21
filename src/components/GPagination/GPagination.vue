<script>
  import _ from 'lodash'
  import { reactive, computed, watch } from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn'
  import GIcon from '../GIcon/GIcon';

  const viewModeEnum = {
    grid: 0,
    list: 1
  }

  export default {
    name: 'Paging',
    components: { GIcon, GBtn },
    props: {
      dataSrc: Array,
      itemsPerPage: Number,
      pageIndexesShowInView: Number,
      renderItems: Function,
    },
    setup(props, context) {
      const state = reactive({
        selectedIndex: 0,
        viewMode: viewModeEnum.grid
      })
      watch(() => props.dataSrc, () => state.selectedIndex = 0, { flush: 'pre' })

      const cptTotalPages = computed(() => {
        return Math.floor((props.dataSrc.length + props.itemsPerPage - 1) / props.itemsPerPage)
      })

      const cptPages = computed(() => {
        const _pages = []
        for (let i = 0; i < cptTotalPages.value; ++i) {
          _pages.push({
            index: i,
            items: props.dataSrc.slice(i * props.itemsPerPage, i * props.itemsPerPage + props.itemsPerPage),
            select: () => state.selectedIndex = i
          })
        }
        return _pages
      })

      const cptPageIndexes = computed(() => {
        const half = Math.floor(props.pageIndexesShowInView / 2)
        if (cptTotalPages.value <= props.pageIndexesShowInView) {
          return cptPages.value
        } else {
          if (state.selectedIndex <= half) {
            return [...cptPages.value.slice(0, props.pageIndexesShowInView), null]
          } else if (state.selectedIndex >= cptTotalPages.value - 1 - half) {
            return [null, ...cptPages.value.slice(cptTotalPages.value - props.pageIndexesShowInView, cptTotalPages.value)]
          } else {
            const start = state.selectedIndex - half
            return [null, ...cptPages.value.slice(start, state.selectedIndex + half + 1), null]
          }
        }
      })

      const cptCanGoBegin = computed(() => state.selectedIndex > 0)
      const cptCanGoBack = computed(() => state.selectedIndex > 0)
      const cptCanGoNext = computed(() => state.selectedIndex < cptTotalPages.value - 1)
      const cptCanGoEnd = computed(() => state.selectedIndex < cptTotalPages.value - 1)
      const goBegin = () => state.selectedIndex = 0
      const goBack = () => state.selectedIndex--
      const goNext = () => state.selectedIndex++
      const goEnd = () => state.selectedIndex = cptTotalPages.value - 1

      // custom render
      const _renderItems = props.renderItems || (item => <div>{item}</div>)

      const getViewModeSwitchClass = (viewMode) => ({
        'g-pagination__view-mode-switch' : true,
        'g-pagination__view-mode-switch--selected' : viewMode === state.viewMode,
      })

      return () => {
        return (
            <div>
              <div class="g-pagination__header">
                <span class="g-pagination__header-title">Displaying {props.dataSrc.length} items</span>
                <div class="g-pagination__view-mode">
                  <button class={getViewModeSwitchClass(viewModeEnum.grid)} vOn:click={e => state.viewMode = viewModeEnum.grid}>
                    <g-icon>mdi-view-module</g-icon>
                  </button>
                  <button class={getViewModeSwitchClass(viewModeEnum.list)} vOn:click={e => state.viewMode = viewModeEnum.list}>
                    <g-icon>mdi-view-list</g-icon>
                  </button>
                </div>
              </div>
              <div class="items">
                { cptPages.value.length == 0 ? null : _.map(cptPages.value[state.selectedIndex].items, _renderItems)}
              </div>
              <div class="page-indexes">
                <g-btn
                    outlined icon
                    maxWidth={30}
                    maxHeight={30}
                    disabled={!cptCanGoBegin.value}
                    vOn:click={() => goBegin()}>|&lt;</g-btn>
                <g-btn
                    outlined icon
                    width={30}
                    maxWidth={30}
                    maxHeight={30}
                    disabled={!cptCanGoBack.value}
                    vOn:click={() => goBack()}>&lt;</g-btn>
                {
                  _.map(cptPageIndexes.value, page => page
                      ?
                      <g-btn
                          outlined icon
                          width={30}
                          maxWidth={30}
                          maxHeight={30}
                          active={page.index === state.selectedIndex}
                          activeClass="paging__nav--active"
                          vOn:click={() => page.select()}>
                        {page.index + 1}
                      </g-btn>
                      : <span class="paging__nav__ellipsis"> ... </span>
                  )
                }
                <g-btn
                    outlined icon
                    maxWidth={30}
                    maxHeight={30}
                    disabled={!cptCanGoNext.value}
                    vOn:click={() => goNext()}>&gt;</g-btn>
                <g-btn
                    outlined icon
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
  .g-pagination {
    &__header {
      display: flex;
      flex-direction: row;

      &-title {
        flex: 1;
      }
    }

    &__view-mode-switch {
      background-color: #fff;
      outline: none;

      &--selected {
        background-color: #888;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }




  .items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 400px;
  }

  .page-indexes {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    transition: width 2s;
    &>* {
      margin: 5px;
    }
  }

  .paging {
    &__nav {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 5px;
      border: 1px solid #0003;
      /*transition: background-color 0.5s;*/

      &--active {
        background: #bbb;
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
