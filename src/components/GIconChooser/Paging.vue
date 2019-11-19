<script>
  import _ from 'lodash'
  import { reactive, computed } from '@vue/composition-api';

  export default {
    name: 'Paging',
    props: {
      dataSrc: Array,
      itemsPerPage: Number,
      pageIndexesShowInView: Number,
      renderItems: Function,
    },
    setup(props) {
      const pagingState = reactive({ selectedIndex: 0 })
      const totalPages = Math.floor((props.dataSrc.length + props.itemsPerPage - 1) / props.itemsPerPage)

      function getPageDataFn(pageIndex) {
        return props.dataSrc.slice(pageIndex * props.itemsPerPage, pageIndex * props.itemsPerPage + props.itemsPerPage)
      }

      const pages = []
      for (let i = 0; i < totalPages; ++i) {
        pages.push({
          index: i,
          items: getPageDataFn(i),
          select: () => pagingState.selectedIndex = i
        })
      }

      const cptPages = computed(() => {
        // explain pageIndexesShowInView: the number of page button will be shown in view
        // case 0: << < 0 1 2 3 4 5 > >>
        // case 1: << < 0 1 2 3 4 5 .. 6 > >>
        // case 2: << < 0 ... 1 2 3 4 5 6 > >>
        // case 3: << < 0 ... 1 2 3 4 5 ... 6 > >>
        if (totalPages <= props.pageIndexesShowInView) {
          return pages // case 0
        } else {
          if (pagingState.selectedIndex <= props.pageIndexesShowInView / 2) { // -1 : starting from 0 (but in view start from 1,  -1 for last item
            // case 1
            return [...pages.slice(0, props.pageIndexesShowInView - 1), null, ...pages.slice(totalPages - 1, totalPages)]
          } else if (pagingState.selectedIndex >= totalPages - (props.pageIndexesShowInView - 1) / 2) {
            // case 2
            return [pages[0], null, ...pages.slice(totalPages - (props.pageIndexesShowInView - 1), totalPages)]
          } else {
            // case 3
            return [pages[0], ...pages.slice(pagingState.selectedIndex - 2, pagingState.selectedIndex + 2), pages[totalPages - 1]]
          }
        }
      })

      const cptCanGoBegin = computed(() => pagingState.selectedIndex > 0)
      const cptCanGoBack = computed(() => pagingState.selectedIndex > 0)
      const cptCanGoNext = computed(() => pagingState.selectedIndex < totalPages - 1)
      const cptCanGoEnd = computed(() => pagingState.selectedIndex < totalPages - 1)
      const goBegin = () => pagingState.selectedIndex = 0
      const goBack = () => pagingState.selectedIndex--
      const goNext = () => pagingState.selectedIndex++
      const goEnd = () => pagingState.selectedIndex = totalPages - 1

      function renderPageIndexes() {
        return <div class="page-entries">
          <button class={{'paging__nav--disabled': cptCanGoBegin.value}} vOn:click={() => goBegin()}>|&lt;</button>
          <button class={{'paging__nav--disabled': cptCanGoBack.value}} vOn:click={() => goBack()}>&lt;</button>
          {
            _.map(cptPages.value, page => page
                ? <button vOn:click={() => page.select()}>
                  {page.index}
                </button>
                : '...'
            )
          }
          <button class={{'paging__nav--disabled': cptCanGoNext.value}} vOn:click={() => goNext()}>&gt;</button>
          <button class={{'paging__nav--disabled': cptCanGoEnd.value}} vOn:click={() => goEnd()}>&gt;|</button>
        </div>
      }

      // custom render
      const _renderItems = props.renderItems || (item => <div>{item}</div>)

      return () => {
        return (
            <div>
              <div class="items">
                {_.map(cptPages.value[pagingState.selectedIndex].items, _renderItems)}
              </div>
              <div class="pageIndexes">
                {renderPageIndexes()}
              </div>
            </div>)
      }
    }
  }
</script>
<style scoped lang="scss">
  .paging {
    &__nav {


      &--disabled {
        pointer-events: none;
      }
    }
  }
</style>
