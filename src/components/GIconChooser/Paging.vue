<script>
  import _ from 'lodash'
  import { reactive, computed } from '@vue/composition-api';


  export default {
    name: 'Paging',
    components: { },
    props: {
      dataSrc: Array,
      itemsPerPage: Number,
      pageIndexesShowInView: Number,
      renderItems: Function,
    },
    setup(props, context) {
      const _state = reactive({ selectedIndex: 0 })
      const _totalPages = Math.floor((props.dataSrc.length + props.itemsPerPage - 1) / props.itemsPerPage)

      function getPageDataFn(pageIndex) {
        return props.dataSrc.slice(pageIndex * props.itemsPerPage, pageIndex * props.itemsPerPage + props.itemsPerPage)
      }

      const _pages = []
      for (let i = 0; i < _totalPages; ++i) {
        _pages.push({
          index: i,
          items: getPageDataFn(i),
          select: () => _state.selectedIndex = i
        })
      }

      const cptPages = computed(() => {
        if (_totalPages <= props.pageIndexesShowInView) {
          return _pages
        } else {
          if (_state.selectedIndex <= props.pageIndexesShowInView / 2) { // -1 : starting from 0 (but in view start from 1,  -1 for last item
            return [..._pages.slice(0, props.pageIndexesShowInView - 1), null, ..._pages.slice(_totalPages - 1, _totalPages)]
          } else if (_state.selectedIndex > _totalPages - 1 - (props.pageIndexesShowInView) / 2) {
            // case 2
            console.log('case 2')
            return [_pages[0], null, ..._pages.slice(_totalPages - 1 - props.pageIndexesShowInView, _totalPages)]
          } else {
            // case 3
            console.log('case 3')
            return [null, ..._pages.slice(_state.selectedIndex - props.pageIndexesShowInView / 2, _state.selectedIndex + props.pageIndexesShowInView / 2 + 1), null]
          }
        }
      })

      const cptCanGoBegin = computed(() => _state.selectedIndex > 0)
      const cptCanGoBack = computed(() => _state.selectedIndex > 0)
      const cptCanGoNext = computed(() => _state.selectedIndex < _totalPages - 1)
      const cptCanGoEnd = computed(() => _state.selectedIndex < _totalPages - 1)
      const goBegin = () => _state.selectedIndex = 0
      const goBack = () => _state.selectedIndex--
      const goNext = () => _state.selectedIndex++
      const goEnd = () => _state.selectedIndex = _totalPages - 1

      // custom render
      const _renderItems = props.renderItems || (item => <div>{item}</div>)

      return () => {
        return (
            <div>
              <div class="items">
                {_.map(_pages[_state.selectedIndex].items, _renderItems)}
              </div>
              <div class="page-indexes">
                <button rounded class={{ 'paging__nav': true, 'paging__nav--disabled': !cptCanGoBegin.value }} vOn:click={() => goBegin()}>|&lt;</button>
                <button rounded class={{ 'paging__nav': true, 'paging__nav--disabled': !cptCanGoBack.value }} vOn:click={() => goBack()}>&lt;</button>
                {
                  _.map(cptPages.value, page => page
                      ?
                      <button rounded class={{ 'paging__nav': true, 'paging__nav--selected': page.index === _state.selectedIndex }} vOn:click={() => page.select()}>
                        {page.index}
                      </button>
                      : <span class="paging__nav__ellipsis" >..</span>
                  )
                }
                <button rounded class={{ 'paging__nav': true, 'paging__nav--disabled': !cptCanGoNext.value }} vOn:click={() => goNext()}>&gt;</button>
                <button rounded class={{ 'paging__nav': true, 'paging__nav--disabled': !cptCanGoEnd.value }} vOn:click={() => goEnd()}>&gt;|</button>
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
  }

  .page-indexes {
    display: flex;
    justify-content: center;
  }

  .paging {
    &__nav {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      margin: 5px;
      transition: background-color 0.5s;

      &:hover {
        cursor: pointer;
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
        width: 30px;
        height: 30px;
        margin: 5px;
        text-align: center;
      }
    }
  }
</style>
