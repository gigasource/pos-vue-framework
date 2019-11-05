<script>
  import _ from 'lodash'
  import { generateGridCSS, joinRefArrayValue, getGridAreaCss, getSubItems } from './logic/GGridGeneratorUtil'
  import { reactive, ref, } from '@vue/composition-api';
  import GDialog from '../GDialog/GDialog';
  import GIcon from '../GIcon/GIcon'
  import { enterPressed, enterNotPressed } from '../../utils/keyboardHelper';
  import { createRange } from '../../utils/helpers'

  export default {
    name: 'GGridGenerator',
    components: { GDialog, GIcon },
    props: {},
    setup() {
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
          name: 'app',
          settings: {
            columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
            rows: [ref('50px'), ref('1fr'), ref('80px'), ref('1fr')],
            columnGap: 0,
            rowGap: 0,
          }
        }, {
          name: 'app__header',
          hide: false,
          area: {
            rowStart: 1,
            columnStart: 1,
            rowEnd: 2,
            columnEnd: 6
          }
        }, {
          name: 'app__content',
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
        // a value hold the selecting grid/sub-grid
        selectedGrid: 'app',
        // a value indicate whether a confirm dialog will be shown or not
        // the confirm dialog should be show when user create new sub-grid/single item
        showConfirmDialog: false,
        // a value indicate whether an output dialog will be shown or not
        // the output dialog should be shown when user click to generate output button
        showOutputDialog: false,
        // a value which hold generated css
        generatedCss: ''
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

      // define the width of row height setting section
      const heightUnitSettingRowWidth = '50px'
      // define the height of column width setting section
      const widthUnitSettingColumnHeight = '30px'

      function renderGridColumnWidthSetting(grid) {
        const colStyle = {
          display: 'grid',
          'grid-template-rows': widthUnitSettingColumnHeight,
          'grid-template-columns': joinRefArrayValue(grid.settings.columns),
          'gap': `${grid.settings.rowGap}px ${grid.settings.columnGap}px`,
          // align column in top, margin left = row width
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: heightUnitSettingRowWidth,
          height: widthUnitSettingColumnHeight
        }

        return <div style={colStyle}> {
          _.map(grid.settings.columns, (col, id) =>
              <div style="text-align: center">
                <input style="width: 80%"
                       value={col.value}
                       vOn:keypress={e => enterPressed(e) && (grid.settings.columns[id].value = e.target.value)}/>
              </div>
          )
        }
        </div>
      }

      function renderGridRowHeightSetting(grid) {
        const rowUnitStyles = {
          display: 'grid',
          'grid-template-columns': heightUnitSettingRowWidth,
          'grid-template-rows': joinRefArrayValue(grid.settings.rows),
          'gap': `${grid.settings.rowGap}px ${grid.settings.columnGap}px`,
          // align rows settings on the left, margin top = column height
          position: 'absolute',
          top: widthUnitSettingColumnHeight,
          left: 0,
          bottom: 0,
          width: heightUnitSettingRowWidth
        }

        return <div style={rowUnitStyles}> {
          _.map(grid.settings.rows, (row, id) => <div>
                <input style='width: 80%'
                       value={row.value}
                       vOn:keypress={e => enterPressed(e) && (grid.settings.rows[id].value = e.target.value)}/>
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
          top: widthUnitSettingColumnHeight,
          left: heightUnitSettingRowWidth,
          bottom: 0,
          right: 0,
        }

        const selectedAreaContainerStyle = {
          ...gridContainerStyles,
          'pointer-events': 'none',
          'opacity': 0.5,
        }

        const gridItems = []
        for (let i = 0, rowLen = grid.settings.rows.length; i < rowLen; ++i) {
          for (let j = 0, colLen = grid.settings.columns.length; j < colLen; ++j) {
            gridItems.push(<div
                class='g-grid-generator__editor__field__item'
                style='border: 1px solid #666'
                vOn:mousedown={() => selectingArea = { rowStart: i, columnStart: j }}
                vOn:mouseup={() => {
                  selectingArea = { ...selectingArea, rowEnd: i, columnEnd: j }
                  state.showConfirmDialog = true
                }}></div>)
          }
        }

        return ([
          <div style={gridContainerStyles}>{gridItems}</div>,
          <div style={selectedAreaContainerStyle}>{renderGridAreas(grid)}</div>
        ])
      }

      function renderGridAreas(targetGrid) {
        return getSubItems(state.grids, targetGrid).map((gridItem, index) => gridItem.hide
            ? null
            : <div style={{
              backgroundColor: `hsl(${index * 60 % 360}, 100%, 50%, 70%)`,
              'grid-area': getGridAreaCss(gridItem)
            }}></div>
        )
      }

      function renderGridField(grid) {
        return [
          renderGridColumnWidthSetting(grid),
          renderGridRowHeightSetting(grid),
          renderGridContainer(grid),
        ]
      }


      // settings
      // columns:, rows:  adjust
      function adjustRowColNumbers(target, e) {
        if (enterNotPressed(e)) return
        const oldLen = target.length
        const newLen = parseInt(e.target.value)
        if (oldLen < newLen) {
          const newCols = createRange(newLen - oldLen, () => ref('1fr'))
          target.push.apply(target, newCols)
        } else if (oldLen > newLen) {
          target.splice(newLen, oldLen - newLen)
        }
      }

      function renderGridSettings(grid) {
        const lblStyle = {
          width: '180px',
          display: 'inline-block',
        }
        const inputStyle = {
          width: '40px'
        }

        return [
          <div>
            <label style={lblStyle}>Columns: </label>
            <input style={inputStyle}
                   value={grid.settings.columns.length}
                   vOn:keypress={e => adjustRowColNumbers(grid.settings.columns, e)}
            />
          </div>,
          <div>
            <label style={lblStyle}>Rows: </label>
            <input style={inputStyle}
                   value={grid.settings.rows.length}
                   vOn:keypress={e => adjustRowColNumbers(grid.settings.rows, e)}
            />
          </div>,
          <div>
            <label style={lblStyle}>Column Gap(px): </label>
            <input style={inputStyle}
                   value={grid.settings.columnGap}
                   vOn:keypress={e => enterPressed(e) && (grid.settings.columnGap = parseInt(e.target.value))}/>
          </div>,
          <div>
            <label style={lblStyle}>Row Gap(px): </label>
            <input style={inputStyle}
                   value={grid.settings.rowGap}
                   vOn:keypress={e => enterPressed(e) && (grid.settings.rowGap = parseInt(e.target.value))}/>
          </div>
        ]
      }

      function renderGenerateStyleBtn() {
        return <button
            type='button'
            vOn:click_stop_prevent={() => {
              state.showOutputDialog = true
              state.generatedCss = generateGridCSS(state.grids)
            }}>Generate Css</button>
      }

      function createSingleItem(grid) {
        const rowStart = Math.min(selectingArea.rowStart, selectingArea.rowEnd) + 1
        const rowEnd = Math.max(selectingArea.rowStart, selectingArea.rowEnd) + 2
        const columnStart = Math.min(selectingArea.columnStart, selectingArea.columnEnd) + 1
        const columnEnd = Math.max(selectingArea.columnStart, selectingArea.columnEnd) + 2

        return {
          name: `${grid.name}__${selectingArea.name}`,
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
            columnGap: 0,
            rowGap: 0,
          }
        }
      }

      // render grid generator
      const confirmDialogStyle = {
        height: '200px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px 4px #0003',
        background: '#fff',
        padding: '30px'
      }
      const gridItemNameStyle = {
        border: '1px solid #888',
        padding: '5px'
      }
      const outputDialogStyle = {
        width: '600px',
        background: '#fff',
        padding: '20px',
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
      }
      const outputTextAreaStyle = {
        border: '1px solid black',
        borderRadius: '8px',
        height: '400px',
        width: '90%',
        margin: '20px',
        padding: '5px'
      }


      function deleteGridItem(gridItem) {
        _.each(getSubItems(state.grids, gridItem), item => deleteGridItem(item))
        let id = _.findIndex(state.grids, item => item.name === gridItem.name)
        state.grids.splice(id, 1)
      }


      const listItemStyle = {
        display: 'flex',
        padding: '5px',
        margin: '2px',
        border: '1px solid #999',
        borderRadius: '5px'
      }

      function renderGridGenerator() {
        return (
            <div class="g-grid-generator">
              <ul class="g-grid-generator__grid-list">
                {_.map(state.grids, (grid) =>
                    <li style={{ ...listItemStyle, background: (state.selectedGrid === grid.name) ? '#aaa' : '#fff' }}>
                      {
                        grid.settings ? [
                          <span style="flex: 1"
                                vOn:click={() => grid.settings && (state.selectedGrid = grid.name)}>
                            {grid.name}
                          </span>,
                          <span>
                            <g-icon color="#aaa">search</g-icon>
                          </span>
                        ] : <span style="flex: 1">{grid.name}</span>
                      }

                      {
                        grid.name !== 'app' ? [
                          <span vOn:click={() => deleteGridItem(grid)}>
                            <g-icon>delete</g-icon>
                          </span>,
                          <span vOn:click={() => grid.hide = !grid.hide}>
                            {grid.hide ? <g-icon>visibility</g-icon> : <g-icon>visibility_off</g-icon>}
                          </span>] : null
                      }
                    </li>
                )}
              </ul>

              <div class="g-grid-generator__editor">
                {_.map(state.grids, grid =>
                    grid.settings && grid.name === state.selectedGrid
                        ? [
                          <div class="g-grid-generator__editor__field">
                            {renderGridField(grid)}
                          </div>,
                          <div class="g-grid-generator__editor__settings">
                            {renderGridSettings(grid)}
                            {renderGenerateStyleBtn()}
                          </div>,
                          <g-dialog vModel={state.showConfirmDialog} width="500px" persistent>
                            <div style={confirmDialogStyle}>
                              <div>New grid item will be a sub-grid or just single item?</div>
                              <div>Grid item name: <input type="text" vModel={selectingArea.name} style={gridItemNameStyle}/></div>
                              <button type='button'
                                      vOn:click={() => {
                                        state.grids.push(createSubGridItem(grid))
                                        state.showConfirmDialog = false
                                        resetSelectingArea()
                                      }}>Sub Grid
                              </button>
                              &nbsp;
                              <button type='button'
                                      vOn:click={() => {
                                        state.grids.push(createSingleItem(grid))
                                        state.showConfirmDialog = false
                                        resetSelectingArea()
                                      }}>Single item
                              </button>
                              &nbsp;
                              <button type='button'
                                      vOn:click={() => {
                                        state.showConfirmDialog = false
                                        resetSelectingArea()
                                      }}>Cancel
                              </button>
                            </div>
                          </g-dialog>
                        ]
                        : undefined
                )}
              </div>

              <g-dialog vModel={state.showOutputDialog} width="500px" persistent>
                <div style={outputDialogStyle}>
                  <textarea style={outputTextAreaStyle}>{state.generatedCss}</textarea>
                  <button type="button" vOn:click_stop_prevent={() => state.showOutputDialog = false}>Close</button>
                </div>
              </g-dialog>
            </div>
        )
      }

      return {
        state,
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

    &__grid-list {
      list-style-type: none;
      width: 350px;
      overflow: auto;

      &__item {
        &--explorable {
          cursor: pointer;
        }
      }
    }

    &__editor {
      margin-left: 30px;
      display: flex;
      flex-direction: row;

      &__field {
        display: inline-block;
        position: relative;
        width: 900px;
        height: 600px;

        &__item {
          cursor: pointer;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='8' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0h1L0 6V5zm1 5v1H5z' fill='%239C92AC' fill-opacity='.4' fill-rule='evenodd'/%3E%3C/svg%3E");

          &--disabled {
            pointer-events: none;
            z-index: -1
          }
        }
      }

      &__settings {
        padding: 20px;
      }
    }
  }
</style>
