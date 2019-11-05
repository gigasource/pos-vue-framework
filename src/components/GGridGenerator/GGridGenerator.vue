<script>
  import _ from 'lodash'
  import { generateGridCSS, initGridModel, joinRefArrayValue } from './logic/GGridGeneratorUtil'
  import { gridDataModel } from './logic/temp'
  import { reactive, ref, computed, } from '@vue/composition-api';
  import GTreeViewExample from '../GTreeViewFactory/GTreeViewExample';
  import GTreeFactory, { genTextFactory } from '../GTreeViewFactory/GTreeFactory';
  import GDialog from '../GDialog/GDialog';

  export default {
    name: 'GGridGenerator',
    components: { GDialog, GTreeViewExample },
    props: {},
    setup(props, context) {

      // Grid data convention:
      // +-----------+----------------------------------------------------------------+
      // | Grid prop | Desc                                                           |
      // +-----------+----------------------------------------------------------------+
      // |- name     | a path to this grid item, separated by __                      |
      // |- area     | an area of grid item in it's parent grid                       |
      // |- settings | an object contain grid setting if this grid                    |
      // |           | item is "grid or sub grid" (only available for sub-grid items) |
      // |- hide     | indicate whether a grid-item should be shown or                |
      // |           | not                                                            |
      // +-----------+----------------------------------------------------------------+
      const state = reactive({
        grids: [{
          name: 'Main',
          settings: {
            columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
            rows: [ref('50px'), ref('1fr'), ref('80px'), ref('1fr')],
            columnGap: 1,
            rowGap: 0,
          }
        }, {
          name: 'Main__Header',
          hide: false,
          area: {
            rowStart: 1,
            columnStart: 1,
            rowEnd: 2,
            columnEnd: 6
          }
        }, {
          name: 'Main__Content',
          hide: false,
          area: {
            rowStart: 2,
            columnStart: 1,
            rowEnd: 4,
            columnEnd: 6
          }, settings: {
            columns: [ref('1fr'), ref('1fr'), ref('1fr')],
            rows: [ref('1fr'), ref('1fr'), ref('1fr')],
            columnGap: 2,
            rowGap: 2,
          }
        }],
        selectedGrid: 'Main',
      })
      const dialogState = reactive({
        createGridItemShow: false,
        generateOutputShow: false,
        generatedCss: '',
      })

      // store selecting area temporary information
      let selectingArea

      function resetSelectingArea() {
        selectingArea = {
          name: 'Undefined',
          rowStart: -1,
          columnStart: -1,
          rowEnd: -1,
          columnEnd: -1
        }
      }

      resetSelectingArea()

      const rowUnitWidth = '100px'
      const columnUnitHeight = '50px'

      function renderColumnUnits(grid) {
        const colUnitStyles = {
          display: 'grid',
          'grid-template-rows': columnUnitHeight,
          'grid-template-columns': joinRefArrayValue(grid.settings.columns),
          'gap': `${grid.settings.rowGap}px ${grid.settings.columnGap}px`,
          //
          position: 'absolute',
          top: 0,
          left: rowUnitWidth,
          right: 0,
          height: columnUnitHeight
        }
        return <div class="grid-columns-unit" style={colUnitStyles}>
          {
            _.map(grid.settings.columns, (column, index) =>
                <div style="text-align: center">
                  <input style="width: 80%" value={column.value}
                         vOn:keypress={e => {
                           if (e.keyCode !== 13) return
                           grid.settings.columns[index].value = e.target.value
                         }}/>
                </div>
            )
          }
        </div>
      }

      function renderRowUnits(grid) {
        const rowUnitStyles = {
          display: 'grid',
          'grid-template-columns': rowUnitWidth,
          'grid-template-rows': joinRefArrayValue(grid.settings.rows),
          'gap': `${grid.settings.rowGap}px ${grid.settings.columnGap}px`,
          //
          position: 'absolute',
          top: columnUnitHeight,
          left: 0,
          bottom: 0,
          width: rowUnitWidth
        }

        return <div class="grid-columns-row" style={rowUnitStyles}>
          {
            _.map(grid.settings.rows, (row, index) =>
                <div>
                  <input style="width: 80%" value={row.value}
                         vOn:keypress={e => {
                           if (e.keyCode !== 13) return
                           grid.settings.rows[index].value = e.target.value
                         }}/>
                </div>
            )
          }
        </div>
      }

      function renderGridContainer(grid) {
        const gridContainerStyles = {
          display: 'grid',
          'grid-template-columns': joinRefArrayValue(grid.settings.columns),
          'grid-template-rows': joinRefArrayValue(grid.settings.rows),
          'gap': `${grid.settings.rowGap}px ${grid.settings.columnGap}px`,
          //
          position: 'absolute',
          top: columnUnitHeight,
          left: rowUnitWidth,
          bottom: 0,
          right: 0,
        }

        const gridItems = []
        for (let i = 0; i < grid.settings.rows.length; ++i) {
          for (let j = 0; j < grid.settings.columns.length; ++j) {
            gridItems.push(
                <div
                    vOn:mousedown={() => {
                      selectingArea.rowStart = i
                      selectingArea.columnStart = j
                    }}

                    vOn:mouseup={() => {
                      selectingArea.rowEnd = i
                      selectingArea.columnEnd = j
                      dialogState.createGridItemShow = true
                    }}
                    class='g-grid-generator__editor__field__item'
                    style={{ border: '1px solid black' }}>
                </div>)
          }
        }

        return ([
          <div style={gridContainerStyles}>
            {gridItems}
          </div>,
          <div class="grid-container-area"
               style={gridContainerStyles}>
            {renderGridAreas(grid)}
          </div>
        ])
      }

      function renderGridAreas(targetGrid) {
        const gridItems = _.filter(state.grids, grid => {
          // skip itself
          if (grid === targetGrid) return false

          // an item which have name Main_Header should be consider as grid's area
          // an item which have the name is Main_Header_Logo should not be consider as grid's area
          const nameParts = grid.name.substr(targetGrid.name.length).split('__')
          return nameParts[0] === '' && nameParts.length === 2
        })

        return gridItems.map((gridItem, index) =>
            gridItem.hide
                ? undefined
                : <div style={{
                  backgroundColor: `hsl(${index * 60 % 360}, 100%, 50%, 70%)`,
                  'grid-area': `${gridItem.area.rowStart} / ${gridItem.area.columnStart} / ${gridItem.area.rowEnd} / ${gridItem.area.columnEnd}`
                }}></div>
        )
      }

      function renderGridField(grid) {
        return [
          renderColumnUnits(grid),
          renderRowUnits(grid),
          renderGridContainer(grid),
        ]
      }

      function renderGridSettings(grid) {
        return [
          <div>
            Columns:
            <input value={grid.settings.columns.length}
                   vOn:keypress={e => {
                     if (e.keyCode !== 13) return
                     console.log(grid.settings.columns)
                     const oldLen = grid.settings.columns.length
                     const newLen = parseInt(e.target.value)
                     if (oldLen < newLen) {
                       let newCols = [...Array(newLen - oldLen).keys()].map(i => ref('1fr'))
                       grid.settings.columns.push.apply(grid.settings.columns, newCols)
                     } else if (oldLen > newLen) {
                       grid.settings.columns.splice(newLen, oldLen - newLen)
                     }
                     console.log(grid.settings.columns)
                   }}
            />
          </div>,
          <div>
            Rows:
            <input value={grid.settings.rows.length}
                   vOn:keypress={e => {
                     if (e.keyCode !== 13) return
                     console.log(grid.settings.rows)
                     const oldLen = grid.settings.rows.length
                     const newLen = parseInt(e.target.value)
                     if (oldLen < newLen) {
                       let newCols = [...Array(newLen - oldLen).keys()].map(i => ref('1fr'))
                       grid.settings.rows.push.apply(grid.settings.rows, newCols)
                     } else if (oldLen > newLen) {
                       grid.settings.rows.splice(newLen, oldLen - newLen)
                     }
                     console.log(grid.settings.rows)
                   }}
            />
          </div>,
          <div>
            Column Gap(px):
            <input value={grid.settings.columnGap} vOn:keypress={e => {
              if (e.keyCode !== 13) return
              grid.settings.columnGap = e.target.value
            }}/>
          </div>,
          <div>
            Row Gap(px):
            <input value={grid.settings.rowGap} vOn:keypress={e => {
              if (e.keyCode !== 13) return
              grid.settings.rowGap = e.target.value
            }}/>
          </div>
        ]
      }

      function renderGenerateStyleBtn() {
        return <button type='button' vOn:click={() => {
          dialogState.generateOutputShow = true
          dialogState.generatedCss = generateGridCSS(state.grids)
          console.log(dialogState.generatedCss)
        }}>Generate</button>
      }

      function createSingleItem(grid) {
        const rowStart = Math.min(selectingArea.rowStart, selectingArea.rowEnd) + 1
        const rowEnd = Math.max(selectingArea.rowStart, selectingArea.rowEnd) + 2
        const columnStart = Math.min(selectingArea.columnStart, selectingArea.columnEnd) + 1
        const columnEnd = Math.max(selectingArea.columnStart, selectingArea.columnEnd) + 2

        return {
          name: grid.name + '__' + selectingArea.name,
          hide: false,
          area: {
            rowStart,
            columnStart,
            rowEnd,
            columnEnd
          }
        }
      }

      function createSubGridItem(grid) {
        const singleItem = createSingleItem(grid)
        return {
          ...singleItem,
          settings: {
            columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
            rows: [ref('50px'), ref('1fr'), ref('80px'), ref('1fr')],
            columnGap: 1,
            rowGap: 0,
          }
        }
      }

      // render grid generator
      function renderGridGenerator() {
        return (
            <div class="g-grid-generator">
              <div class="g-grid-generator__grid-list">
                <ul>
                  {_.map(state.grids, grid =>
                      <li>
                        <span vOn:click={() => grid.settings && (state.selectedGrid = grid.name)}>{grid.name} </span>
                        <span vOn:click={() => grid.hide = !grid.hide}> [hide/show] </span>
                      </li>
                  )}
                </ul>
              </div>
              <div class="g-grid-generator__editor">
                {_.map(state.grids, grid =>
                    grid.settings && grid.name === state.selectedGrid
                        ? (
                            <div>
                              <div class="g-grid-generator__field"
                                   style={{ width: '550px', height: '350px', position: 'relative', display: 'inline-block' }}>
                                {renderGridField(grid)}
                              </div>
                              <div class="g-grid-generator__settings">
                                {renderGridSettings(grid)}
                              </div>
                              {renderGenerateStyleBtn()}


                              <g-dialog vModel={dialogState.createGridItemShow} width="500px" persistent>
                                <div style='height: 200px; border-radius: 10px; box-shadow: 0 2px 8px 4px #0003; background: white; padding: 30px;'>
                                  <div>New grid item will be a sub-grid or just single item?</div>
                                  <div>
                                    Grid item name: <input type="text" vModel={selectingArea.name} style="border: 1px solid #888; padding: 5px;"/>
                                  </div>
                                  <button type='button'
                                          vOn:click={() => {
                                            state.grids.push(createSubGridItem(grid))
                                            dialogState.createGridItemShow = false
                                            resetSelectingArea()
                                          }}>Sub Grid
                                  </button>
                                  &nbsp;
                                  <button type='button'
                                          vOn:click={() => {
                                            state.grids.push(createSingleItem(grid))
                                            dialogState.createGridItemShow = false
                                            resetSelectingArea()
                                          }}>Single item
                                  </button>
                                  &nbsp;
                                  <button type='button'
                                          vOn:click={() => {
                                            dialogState.createGridItemShow = false;
                                            resetSelectingArea()
                                          }}>Cancel
                                  </button>
                                </div>
                              </g-dialog>
                            </div>)
                        : undefined
                )}
              </div>

              <div class="g-grid-generator__output">
                <g-dialog vModel={dialogState.generateOutputShow} width="500px" persistent>
                  <div style="width: 600px; background-color: white; display: flex; flex-direction: column; align-items: center; padding: 20px;">
                    <textarea style="border: 1px solid black; border-radius: 8px; height: 400px; width: 90%; margin: 20px; padding: 5px;">
                      {dialogState.generatedCss}
                    </textarea>

                    <button type="button" vOn:click={() => { dialogState.generateOutputShow = false}}>Close</button>
                  </div>

                </g-dialog>
              </div>
            </div>
        )
      }

      return {
        state,
        dialogState,
        renderGridGenerator
      }
    },
    render() {
      return this.renderGridGenerator()
    }
  }
</script>
<style scoped lang="scss">
  .g-grid-generator {
    display: flex;
    flex-direction: row;

    &__editor {
      margin-left: 30px;
    }
  }

  .grid-container-area {
    pointer-events: none;
    opacity: 0.5;
  }

  .g-grid-generator__editor__field__item {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='8' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0h1L0 6V5zm1 5v1H5z' fill='%239C92AC' fill-opacity='.4' fill-rule='evenodd'/%3E%3C/svg%3E");

    &--disabled {
      pointer-events: none;
      z-index: -1
    }
  }
</style>
