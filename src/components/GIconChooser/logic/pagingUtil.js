import { reactive, computed } from '@vue/composition-api';

// explain pageEntriesShowInView: the number of page button will be shown in view
// case 0: << < 0 1 2 3 4 5 > >>
// case 1: << < 0 1 2 3 4 5 .. 6 > >>
// case 2: << < 0 ... 1 2 3 4 5 6 > >>
// case 3: << < 0 ... 1 2 3 4 5 ... 6 > >>
export default function(dataSrc, { itemsPerPage, pageEntriesShowInView }) {
  if (!Array.isArray(dataSrc))
    throw "Invalid data source"
  const pagingState = reactive({ selectedIndex: 0 })
  function getPageDataFn(pageIndex) {
    return dataSrc.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage)
  }
  const totalPages =  Math.floor((dataSrc.length + itemsPerPage - 1) / itemsPerPage)
  const pages = []
  for (let i=0; i<totalPages; ++i) {
    pages.push({
      index: i,
      selected: pagingState.selectedIndex == i,
      items: getPageDataFn(i),
      select: () => pagingState.selectedIndex = i,
    })
  }
  function getPages() {
    if (totalPages <= pageEntriesShowInView) {
      return pages // case 0
    } else {
      if (pagingState.selectedIndex <= pageEntriesShowInView / 2) { // -1 : starting from 0 (but in view start from 1,  -1 for last item
        // case 1
        return [...pages.slice(0, pageEntriesShowInView - 1), null, ...pages.slice(totalPages - 1, totalPages)]
      } else if (pagingState.selectedIndex >= totalPages - (pageEntriesShowInView - 1) / 2) {
        // case 2
        return [pages[0], null, ...pages.slice(totalPages - (pageEntriesShowInView - 1), totalPages)]
      } else {
        // case 3
        return [pages[0], ...pages.slice(pagingState.selectedIndex - 2, pagingState.selectedIndex + 2), pages[totalPages-1]]
      }
    }
  }

  return {
    canGoBegin: function() {
      return pagingState.selectedIndex > 0
    },
    goBegin: function() {
      pagingState.selectedIndex = 0
    },
    canGoBack: function() {
      return pagingState.selectedIndex > 0
    },
    goBack: function() {
      pagingState.selectedIndex--
    },
    canGoNext: function() {
      pagingState.selectedIndex < totalPages - 1
    },
    goNext: function() {
      pagingState.selectedIndex++
    },
    canGoEnd: function() {
      pagingState.selectedIndex < totalPages - 1
    },
    goEnd: function () {
      pagingState.selectedIndex = totalPages - 1
    },
    pages: getPages()
  }
}
