export const gridDataModel = [{
  name: 'Main',
  settings: {
    columns: ['1fr', '1fr', '1fr', '1fr', '1fr'],
    rows: ['50px', '1fr', '80px', '1fr'],
    columnGap: 1,
    rowGap: 0,
  }
}, {
  // an item in grid, it's also a grid
  name: 'Main__Head',
  settings: {
    columns: ['1fr', '1fr', '1fr', '1fr', '1fr'],
    rows: ['50px', '1fr', '80px', '1fr'],
    columnGap: 1,
    rowGap: 0,
  },
  area: {
    rowStart: 0,
    columnStart: 0,
    rowEnd: 1,
    columnEnd: 1
  },
}, {
  // an item in grid
  name: 'Main__Head__Logo',
  area: {
    rowStart: 0,
    columnStart: 0,
    rowEnd: 1,
    columnEnd: 1
  }
}]
