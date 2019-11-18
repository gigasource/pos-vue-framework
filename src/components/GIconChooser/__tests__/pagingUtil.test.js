// Created at 2019-11-18 14:23 by Thinh Vu
import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import paging from '../logic/pagingUtil'

describe('/pagingUtil', () => {
  createLocalVue().use(plugin)
  it('should work', () => {
    let rs = paging([0, 1, 2, 3, 4, 5, 6], { itemsPerPage: 7, pageEntriesShowInView: 7})
    expect(rs.totalPages).toBe(1)
    let pageGroups = rs.getPageGroups()
    expect(pageGroups.length).toBe(1)
  })

  it('should work 2', () => {
    let rs = paging([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { itemsPerPage: 1, pageEntriesShowInView: 7})
    expect(rs.totalPages).toBe(11)
    let pageGroups = rs.getPageGroups()
    expect(pageGroups.length).toBe(3)
    expect(pageGroups[0].length).toBe(6)
    expect(pageGroups[1]).toBe(null)
    expect(pageGroups[2].length).toBe(1)
  })
})
