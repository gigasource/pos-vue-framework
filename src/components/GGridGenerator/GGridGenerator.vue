<script>
  import _ from 'lodash'
  import { reactive, ref, computed, onUpdated } from '@vue/composition-api'
  import { saveFile, openFile } from '../../utils/helpers';
  import { enterPressed, escapePressed, shiftPressed, ctrlPressed, metaPressed } from '../../utils/keyboardHelper'
  import {
    _gridItemOptions, _gridContentOptions,
    changeAlignSelf, changeAlignItems, changeAlignContent, changeJustifySelf, changeJustifyItems, changeJustifyContent,
    isActiveAlignSelf, isActiveAlignItems, isActiveAlignContent, isActiveJustifySelf, isActiveJustifyItems, isActiveJustifyContent,
    joinRefArrayValue,
    getGridAreaCss,
    addSubGridArea,
    addSubItemArea,
    deleteGridItem, createEmptyArea, createGridArea,
    isGridAreaNameValid, getGridList, isAreaOverflowed,
    insertRowAbove, insertRowBelow, insertColumnLeft, insertColumnRight, deleteColumn, deleteRow,
    generateRandomColor, adjustRowColNumbers, generateLayoutJson, parseLayoutStr, parseLayoutJsonObject
  } from './logic/GGridGeneratorUtil'
  import GDialog from '../GDialog/GDialog'
  import GIcon from '../GIcon/GIcon'
  import GIncDecNumberInput from './GIncDecNumberInput'
  import GEditViewInput from './GEditViewInput'
  import GFileInputJSX from '../GFileInput/GFileInputJSX'

  export default {
    name: 'GGridGenerator',
    components: { GFileInputJSX, GEditViewInput, GIncDecNumberInput, GDialog, GIcon },
    props: {
      // layout can be:
      // - json string
      // - json object (column, rows items are string
      // - layout object (columns, rows items are ref(string))
      layout: {
        type: [String, Object]
      }
    },
    setup(props, context) {
      // initialize layout
      let initLayout = null
      if (typeof (props.layout) === 'string') {
        initLayout = parseLayoutStr(props.layout)
      } else {
        initLayout = parseLayoutJsonObject(props.layout || {
          name: 'app',
          columns: ['1fr', '1fr', '1fr', '1fr', '1fr'],
          rows: ['1fr', '1fr', '1fr', '1fr', '1fr'],
          columnGap: 0,
          rowGap: 0,
          subAreas: []
        })
      }

      console.log(initLayout)

      const selectedSetting = {
        grid: 0,
        area: 1
      }

      const state = reactive({
        layout: initLayout,
        //// view settings
        // view size
        fieldWidth: 946,
        fieldHeight: 478,
        // view mode
        viewMode: false,

        //// hover settings
        hovering: false,
        hoveringArea: {
          rowStart: -1,
          columnStart: -1,
          rowEnd: -1,
          columnEnd: -1
        },

        //
        selectedSetting: selectedSetting.grid,
        // a value hold the selected grid/sub-grid
        selectedGrid: initLayout,
        // a value hold the selected area
        selectedArea: null,
        // a value hold the editing area
        editingArea: null,

        // A value hold selected index of row unit
        // Base 0
        selectedRowUnitIndex: 0,
        // A value hold selected index of column unit
        // Base 0
        selectedColumnUnitIndex: 0,

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
      // similar to state.hoveringArea but store raw grid index base 0
      // state.hoveringArea contain modified area and only used for display hovering area
      let _selectingArea = createEmptyArea()

      // 1) List
      function changeItemName(item, newName) {
        item.name = newName
      }

      // list all grid item is grid or sub-grid (not for single item)
      function getGridListItemClass(grid) {
        return {
          'grid-gen__sub-list__item': true,
          'grid-gen__sub-list__item--selected': grid === state.selectedGrid
        }
      }

      function setSelectedGrid(grid) {
        state.selectedGrid = grid
        state.selectedSetting = selectedSetting.grid
      }

      function renderGridList() {
        return <div class="grid-gen__sub-list">
          <div class="grid-gen__sub-list__section">GRID</div>
          <ul class="grid-gen__sub-list__items">
            {_.map(getGridList(state.layout), grid =>
                <li class={getGridListItemClass(grid)}>
                  <g-edit-view-input
                      width="100%"
                      value={grid.name}
                      vOn:click={() => setSelectedGrid(grid)}
                      vOn:input={newName => changeItemName(grid, newName)}/>
                </li>
            )}
          </ul>
        </div>
      }

      // show all area
      function getAreaListItemClass(area) {
        return {
          'grid-gen__sub-list__item': true,
          'grid-gen__sub-list__item--selected': area === state.selectedArea,
          'grid-gen__sub-list__item--overflowed': isAreaOverflowed(area)
        }
      }

      function setSelectedArea(area) {
        state.selectedArea = area
        state.selectedSetting = selectedSetting.area
      }

      function toggleAreaHideShow(area) {
        area.hide = !area.hide
      }

      function renderAreaList() {
        return <div class="grid-gen__sub-list">
          <div class="grid-gen__sub-list__section">AREA</div>
          <ul class="grid-gen__sub-list__items">
            {_.map(state.selectedGrid.subAreas, area =>
                <li class={getAreaListItemClass(area)}>
                  <g-edit-view-input
                      width="100%"
                      value={area.name}
                      vOn:click={() => setSelectedArea(area)}
                      vOn:input={newName => changeItemName(area, newName)}/>
                  <span style="line-height: 16px" vOn:click={() => toggleAreaHideShow(area)}>
                    <g-icon small>{area.hide ? 'visibility' : 'visibility_off'}</g-icon>
                  </span>
                </li>
            )}
          </ul>
        </div>
      }

      // 2) Editor
      // render row, column unit editor
      const heightUnitSettingRowWidth = '60px' // define the width of row height setting section
      const widthUnitSettingColumnHeight = '30px' // define the height of column width setting section
      function getColumnUnitClass(id) {
        return {
          'grid-gen__column-unit': true,
          'grid-gen__column-unit--selected': id === state.selectedColumnUnitIndex,
        }
      }

      function renderGridColumnWidthSetting(grid) {
        const colStyle = {
          display: 'grid',
          'grid-template-rows': widthUnitSettingColumnHeight,
          'grid-template-columns': joinRefArrayValue(grid.columns),
          'gap': `${grid.rowGap}px ${grid.columnGap}px`,
          // align column in top, margin left = row width
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: heightUnitSettingRowWidth,
          height: widthUnitSettingColumnHeight
        }
        return <div style={colStyle}> {
          _.map(grid.columns, (col, id) =>
              <div class={getColumnUnitClass(id)}>
                <input
                    value={col.value}
                    vOn:keypress={e => enterPressed(e) && (grid.columns[id].value = e.target.value)}
                    vOn:focus_stop={() => state.selectedColumnUnitIndex = id}/>
              </div>
          )
        }
        </div>
      }

      function getRowUnitClass(id) {
        return {
          'grid-gen__row-unit': true,
          'grid-gen__row-unit--selected': id === state.selectedRowUnitIndex
        }
      }

      function renderGridRowHeightSetting(grid) {
        const rowUnitStyles = {
          display: 'grid',
          'grid-template-columns': heightUnitSettingRowWidth,
          'grid-template-rows': joinRefArrayValue(grid.rows),
          'gap': `${grid.rowGap}px ${grid.columnGap}px`,
          // align rows settings on the left, margin top = column height
          position: 'absolute',
          top: widthUnitSettingColumnHeight,
          left: 0,
          bottom: 0,
          width: heightUnitSettingRowWidth
        }
        return <div style={rowUnitStyles}> {
          _.map(grid.rows, (row, id) =>
              <div class={getRowUnitClass(id)}>
                <input
                    value={row.value}
                    vOn:keypress={e => enterPressed(e) && (grid.rows[id].value = e.target.value)}
                    vOn:focus_stop={() => state.selectedRowUnitIndex = id}
                />
              </div>
          )
        }
        </div>
      }

      // render grid editor
      const cptGridContainerClass = computed(() => ({
        'grid-gen__editor__field__item': true,
        'grid-gen__editor__field__item--view-only': state.viewMode,
      }))

      function renderGridContainer(grid) {
        const gridItems = []
        for (let i = 0, rowLen = grid.rows.length; i < rowLen; ++i) {
          for (let j = 0, colLen = grid.columns.length; j < colLen; ++j) {
            gridItems.push(<div
                class={cptGridContainerClass.value}
                vOn:mousedown={(e) => {
                  // view mode
                  if (state.viewMode) return

                  // execute action
                  const actionExecuted = tryToExecuteActionIfHit(e)
                  if (actionExecuted) {
                    return
                  }

                  // create or modify existing item
                  _selectingArea = {
                    name: _selectingArea.name,
                    rowStart: i,
                    columnStart: j,
                    rowEnd: i,
                    columnEnd: j
                  }
                  state.hoveringArea = createGridArea(_selectingArea)
                  state.hovering = true
                }}
                vOn:mouseenter={() => {
                  if (state.viewMode) return
                  if (state.hovering) {
                    _selectingArea = { ..._selectingArea, rowEnd: i, columnEnd: j }
                    state.hoveringArea = createGridArea(_selectingArea)
                  }
                }}
                vOn:mouseup={() => {
                  if (state.viewMode) return

                  // checking hovering in mouseup to prevent action mouse up
                  if (state.hovering) {
                    state.hovering = false
                    if (state.editingArea) {
                      state.editingArea.area = state.hoveringArea
                      state.hoveringArea = null
                      state.editingArea = null
                    } else {
                      state.showConfirmDialog = true
                    }
                  }
                }}
            ></div>)
          }
        }

        const gridStyles = {
          display: 'grid',
          'grid-template-columns': joinRefArrayValue(grid.columns),
          'grid-template-rows': joinRefArrayValue(grid.rows),
          'gap': `${grid.rowGap}px ${grid.columnGap}px`,
          //
          position: 'absolute',
          top: widthUnitSettingColumnHeight,
          left: heightUnitSettingRowWidth,
          bottom: 0,
          right: 0,
          //
        }
        const selectedAreaContainerStyle = {
          ...gridStyles,
          'pointer-events': 'none',
        }

        return ([
          <div style={gridStyles} class="grid-gen__editor__field">{gridItems}</div>,
          <div style={selectedAreaContainerStyle}>
            {renderGridAreas(grid)}
            {renderHoveringArea()}
          </div>
        ])
      }

      // render area in edit mode
      function getAreaClass(area) {
        return {
          'grid-gen__editor__field__area': true,
          'grid-gen__editor__field__area--selected': area == state.selectedArea,
          'grid-gen__editor__field__area--editing': area == state.editingArea,
        }
      }

      const actionWrapperClass = 'grid-gen__editor__field__area__actions'
      const actionClass = 'area-action'

      function tryToExecuteActionIfHit(e) {
        let actionExecuted = false
        _.each(context.refs.el.getElementsByClassName(actionWrapperClass), actionWrapperElement => {
          _.each(actionWrapperElement.getElementsByClassName(actionClass), areaActionElement => {
            const { top, left, width, height } = areaActionElement.getBoundingClientRect()
            const pageTop = top + window.scrollY
            const pageLeft = left + window.scrollX
            const pageBottom = pageTop + height
            const pageRight = pageLeft + width
            if ((pageLeft <= e.pageX && e.pageX <= pageRight) && (pageTop <= e.pageY && e.pageY <= pageBottom)) {
              areaActionElement.click()
              actionExecuted = true
            }
          })
        })
        return actionExecuted
      }

      function renderGridAreaInEditMode(gridItem) {
        return <div class={getAreaClass(gridItem)}
                    style={{ backgroundColor: gridItem.bgColor, gridArea: getGridAreaCss(gridItem) }}>
          <span>{gridItem.name}</span>
          <span class={actionWrapperClass}>
            <span class={actionClass} vOn:click={() => gridItem.bgColor = generateRandomColor()}>
              <g-icon small>autorenew</g-icon>
            </span>
            <span class={actionClass}
                  vOn:click={() => {
                    state.selectedArea = gridItem
                    state.editingArea = gridItem
                  }}>
              <g-icon small>edit</g-icon>
            </span>
            <span class={actionClass} vOn:click={() => deleteGridItem(gridItem)}>
              <g-icon small>delete</g-icon>
            </span>
          </span>
        </div>
      }

      // render area in view mode
      function renderGridAreaInViewMode(gridItem) {
        if (gridItem.subAreas) {
          return <div
              class="grid-gen__editor__field__area"
              style={{
                border: '1px dashed #0008',
                backgroundColor: gridItem.bgColor,
                gridArea: getGridAreaCss(gridItem),
                display: 'grid',
                'grid-template-columns': joinRefArrayValue(gridItem.columns),
                'grid-template-rows': joinRefArrayValue(gridItem.rows),
                'gap': `${gridItem.rowGap}px ${gridItem.columnGap}px`,
              }}>
            {renderGridAreas(gridItem)}
          </div>
        } else {
          return <div
              class="grid-gen__editor__field__area"
              style={{
                border: '1px dashed #0008',
                backgroundColor: gridItem.bgColor,
                gridArea: getGridAreaCss(gridItem)
              }}>
            {gridItem.name}
          </div>
        }
      }

      // render area
      function renderGridAreas(targetGrid) {
        return (targetGrid.subAreas || []).map((gridItem, index) =>
            gridItem.hide
                ? null
                : state.viewMode
                ? renderGridAreaInViewMode(gridItem, index)
                : renderGridAreaInEditMode(gridItem, index)
        )
      }

      // render hovering area
      function renderHoveringArea() {
        return state.hovering ? <div style={{
          border: '3px dashed #000',
          'grid-area': getGridAreaCss({ area: state.hoveringArea })
        }}></div> : null
      }

      // render confirm dialog
      const refIdNewItemNameInput = 'txtItemName'
      const refIdBtnCreateSubItem = 'btnCreateSubItem'
      const refIdBtnCreateSubGrid = 'btnCreateSubGrid'
      const refIdBtnCancel = 'btnCancel'

      function onOnConfirmDialogKeyDown(e) {
        if (enterPressed(e)) {
          if (shiftPressed(e) || ctrlPressed(e) || metaPressed(e)) {
            context.refs[refIdBtnCreateSubGrid].click()
          } else {
            context.refs[refIdBtnCreateSubItem].click()
          }
        } else if (escapePressed(e)) {
          context.refs[refIdBtnCancel].click()
        }
      }

      function onSubGridBtnClicked(grid) {
        if (isGridAreaNameValid(_selectingArea.name)) {
          // can use state.hoveringArea directly instead of _selectingArea
          addSubGridArea(grid, _selectingArea)
          state.showConfirmDialog = false
          _selectingArea = createEmptyArea()
        }
      }

      function onSubItemBtnClicked(grid) {
        if (isGridAreaNameValid(_selectingArea.name)) {
          addSubItemArea(grid, _selectingArea)
          state.showConfirmDialog = false
          _selectingArea = createEmptyArea()
        }
      }

      function onCancelBtnClick() {
        state.showConfirmDialog = false
        _selectingArea = createEmptyArea()
      }

      function renderConfirmDialog(grid) {
        return <g-dialog vModel={state.showConfirmDialog} width="600px" persistent>
          <div class="grid-gen__dialog__confirm" vOn:keydown={onOnConfirmDialogKeyDown}>
            <span class="grid-gen__dialog__confirm__header">Create new area</span>
            <div class="grid-gen__dialog__confirm__content">
              <div>
                Are you sure you want to create new area? If Yes, please set area name and click to either 'Single' or 'Sub Grid' button.<br/>
                <small>
                  <b>Single</b> create an atom item which can't be divided into smaller items<br/>
                  <b>Sub-grid</b> create a sub grid item which can be divided into smaller items.
                </small>
              </div>
              <br/>
              <div>
                Area name:&nbsp;
                <input class="grid-gen__dialog__confirm__item-name"
                       type="text"
                       ref={refIdNewItemNameInput}
                       vModel={_selectingArea.name}/>
              </div>
              <div>
                <small>
                  (*) Item name can contain only a-z, A-Z, -, _ characters<br/>
                  (*) Shortcuts: <br/>
                  - ESC: Cancel<br/>
                  - Enter: Sub Item<br/>
                  - Enter + (Shift | Ctrl | Meta): Sub Grid<br/>
                </small>
              </div>
            </div>
            <div class="grid-gen__dialog__confirm__action-btn">
              <button ref={refIdBtnCreateSubGrid} vOn:click={() => onSubGridBtnClicked(grid)}>Sub grid</button>
              &nbsp;
              <button ref={refIdBtnCreateSubItem} vOn:click={() => onSubItemBtnClicked(grid)}>Sub item</button>
              &nbsp;
              <button ref={refIdBtnCancel} vOn:click={onCancelBtnClick}>Cancel</button>
            </div>
          </div>
        </g-dialog>
      }

      // 3) Settings
      function renderViewportSetting() {
        return [
          <div class="grid-gen__settings-section">Preview</div>,
          <div class="grid-gen__settings-prop">
            <label>Width(px): </label>
            <g-inc-dec-number-input min={600} value={state.fieldWidth} vOn:input={v => state.fieldWidth = v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Height(px): </label>
            <g-inc-dec-number-input min={400} value={state.fieldHeight} vOn:input={v => state.fieldHeight = v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>View mode: </label>
            <input type="checkbox" value={state.viewMode} vOn:change={() => state.viewMode = !state.viewMode}>Overview</input>
          </div>,
        ]
      }

      // a helper method adjust row, col number


      function renderGridSettings(grid) {
        return state.selectedSetting === selectedSetting.grid ? [
          // columns number, rows number, gap pixel setting
          <div class="grid-gen__settings-section">Grid Settings</div>,
          <div class="grid-gen__settings-prop">
            <label>Columns: </label>
            <g-inc-dec-number-input min={1} value={grid.columns.length} vOn:input={v => adjustRowColNumbers(grid.columns, v)}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Rows: </label>
            <g-inc-dec-number-input min={1} value={grid.rows.length} vOn:input={v => adjustRowColNumbers(grid.rows, v)}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Column Gap(px): </label>
            <g-inc-dec-number-input min={0} value={grid.columnGap} vOn:input={v => grid.columnGap = v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Row Gap(px): </label>
            <g-inc-dec-number-input min={0} value={grid.rowGap} vOn:input={v => grid.rowGap = v}/>
          </div>,

          // justify/align items
          <div class="grid-gen__settings-prop">
            <label>Align Items:</label>
            <select vOn:change={e => changeAlignItems(grid, e.target.value)}>
              { _.map(_gridItemOptions, value => <option selected={isActiveAlignItems(grid, value)} value={value}>{value}</option>) }
            </select>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Align content:</label>
            <select vOn:change={e => changeAlignContent(grid, e.target.value)}>
              { _.map(_gridContentOptions, value => <option selected={isActiveAlignContent(grid, value)} value={value}>{value}</option>) }
            </select>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Justify Items:</label>
            <select vOn:change={e => changeJustifyItems(grid, e.target.value)}>
              { _.map(_gridItemOptions, value => <option selected={isActiveJustifyItems(grid, value)} value={value}>{value}</option>) }
            </select>
          </div>,

          // justify/alignment contents
          <div class="grid-gen__settings-prop">
            <label>Justify content:</label>
            <select vOn:change={e => changeJustifyContent(grid, e.target.value)}>
              { _.map(_gridContentOptions, value => <option selected={isActiveJustifyContent(grid, value)} value={value}>{value}</option>) }
            </select>
          </div>,

            // Insert/delete row/column
          <div class="grid-gen__settings-section">Insert/Delete</div>,
          <div class="grid-gen__settings-prop">
            <label>Rows:</label>
            <span>
              <button vOn:click={() => insertRowAbove(grid, state.selectedRowUnitIndex)}>Above</button>
              <button vOn:click={() => insertRowBelow(grid, state.selectedRowUnitIndex)}>Below</button>
              <button vOn:click={() => deleteRow(grid, state.selectedRowUnitIndex)}>Delete</button>
            </span>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Columns:</label>
            <span>
              <button vOn:click={() => insertColumnLeft(grid, state.selectedColumnUnitIndex)}>Left</button>
              <button vOn:click={() => insertColumnRight(grid, state.selectedColumnUnitIndex)}>Right</button>
              <button vOn:click={() => deleteColumn(grid, state.selectedColumnUnitIndex)}>Delete</button>
            </span>
          </div>,
        ] : null
      }

      function renderAreaSettings(gridItem) {
        return gridItem != null && (gridItem.parent === state.selectedGrid) && state.selectedSetting === selectedSetting.area ? [
          <div class="grid-gen__settings-section">Area Settings</div>,
          <div class="grid-gen__settings-prop">
            <label>Top: </label>
            <g-inc-dec-number-input
                min={1}
                value={gridItem.area.rowStart}
                vOn:input={newRowStart => {
                  const topChanged = newRowStart - gridItem.area.rowStart
                  gridItem.area.rowStart = newRowStart
                  gridItem.area.rowEnd += topChanged
                }}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Left: </label>
            <g-inc-dec-number-input
                min={1}
                value={gridItem.area.columnStart}
                vOn:input={newColumnStart => {
                  const leftChanged = newColumnStart - gridItem.area.columnStart
                  gridItem.area.columnStart = newColumnStart
                  gridItem.area.columnEnd += leftChanged
                }}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Width: </label>
            <g-inc-dec-number-input
                min={1}
                value={gridItem.area.columnEnd - gridItem.area.columnStart}
                vOn:input={v => gridItem.area.columnEnd = gridItem.area.columnStart + v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Height: </label>
            <g-inc-dec-number-input
                min={1}
                value={gridItem.area.rowEnd - gridItem.area.rowStart}
                vOn:input={v => gridItem.area.rowEnd = gridItem.area.rowStart + v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Align self:</label>
            <select vOn:change_stop={e => changeAlignSelf(gridItem, e.target.value)}>
              { _.map(_gridItemOptions, value => <option selected={isActiveAlignSelf(gridItem, value)} value={value}>{value}</option>) }
            </select>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Justify self:</label>
            <select vOn:change_stop={e => changeJustifySelf(gridItem, e.target.value)}>
              { _.map(_gridItemOptions, value => <option selected={isActiveJustifySelf(gridItem, value)} value={value}>{value}</option>) }
            </select>
          </div>,
        ] : null
      }

      // 4) Generate output
      function loadLayoutFile() {
        openFile({ multiple: false, mimeType: 'application/json' }, files => {
          files[0].text().then(content => {
            state.layout = parseLayoutStr(content)
            state.selectedGrid = state.layout
          })
        })
      }

      function saveLayoutFile() {
        saveFile('layout.json', generateLayoutJson(state.layout), 'application/json')
      }

      function renderGridGeneratorOutput() {
        return [
          <div class="grid-gen__settings-section">Files</div>,
          <button vOn:click_stop_prevent={loadLayoutFile}>Import</button>,
          <button vOn:click_stop_prevent={saveLayoutFile}>Export</button>,
        ]
      }

      // do stuff after vue rendered
      onUpdated(() => {
        // if confirm showed, select all text of new item name input
        // then focus on it
        if (state.showConfirmDialog) {
          context.refs[refIdNewItemNameInput].setSelectionRange(0, context.refs[refIdNewItemNameInput].value.length)
          context.refs[refIdNewItemNameInput].focus()
        }
      })

      // 0) Entire render
      function renderGridGenerator() {
        return (
            <div class="grid-gen" ref="el">
              <div class="grid-gen__list">
                {renderGridList()}
                {renderAreaList()}
              </div>

              <div class="grid-gen__editor">
                <div style={{
                  position: 'relative',
                  width: `${state.fieldWidth}px`,
                  height: `${state.fieldHeight}px`,
                  backgroundColor: '#fff',
                  margin: '0 auto'
                }}>
                  {renderGridColumnWidthSetting(state.selectedGrid)}
                  {renderGridRowHeightSetting(state.selectedGrid)}
                  {renderGridContainer(state.selectedGrid)}
                </div>
              </div>
              <div class="grid-gen__settings">
                {renderGridGeneratorOutput()}
                {renderViewportSetting()}
                {renderGridSettings(state.selectedGrid)}
                {renderAreaSettings(state.selectedArea)}
              </div>
              {renderConfirmDialog(state.selectedGrid)}

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
  .grid-gen {
    display: flex;
    flex-direction: row;
    align-items: stretch;

    button {
      border-radius: 0;
    }

    &__list {
      background-color: #fff;
      border-right: 2px solid #888;
      padding: 0 20px;
    }

    &__sub-list {
      margin-bottom: 20px;

      &__section {
        font-size: larger;
        border-top: 2px solid #888;
        color: #888;
      }

      &__items {
        min-height: 200px;
        height: 200px;
        max-height: 400px;
        list-style-type: none;
        padding: 0;
        margin: 0;
        width: 200px;
        overflow: auto;
      }

      &__item {
        display: flex;
        padding: 5px;
        margin: 2px;
        border: 1px solid #aaa;
        background-color: transparent;

        &--selected {
          background-color: #eee;
        }

        &--overflowed {
          background-color: red;
        }

        &__name {
          flex: 1;

          &--explorable {
            cursor: pointer;
          }
        }
      }
    }

    &__column-unit {
      text-align: center;

      & > input {
        width: 80%;

        &:focus {
          outline: none;
        }
      }

      &--selected > input {
        border: 2px solid black;
      }
    }

    &__row-unit {
      margin: auto;
      text-align: center;

      & > input {
        width: 80%;

        &:focus {
          outline: none;
        }
      }

      &--selected > input {
        border: 2px solid black;
      }
    }

    &__editor {
      flex: 1;
      overflow: auto;
      border: 1px solid #0003;
      background-color: #ddd;

      &__field {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='8' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0h1L0 6V5zm1 5v1H5z' fill='%239C92AC' fill-opacity='.4' fill-rule='evenodd'/%3E%3C/svg%3E");

        &__item {
          cursor: pointer;
          border: 1px dotted #666;

          &--view-only {
            border: 1px dotted transparent;
          }

          &--disabled {
            pointer-events: none;
            z-index: -1
          }
        }

        &__area {
          position: relative;
          font-size: small;
          /* prevent overflow*/
          min-height: 3px;
          min-width: 3px;
          overflow: hidden;
          border: 2px solid transparent;

          &--selected {
            border: 2px solid #555;
          }

          &--editing {
            opacity: 0.5;
          }

          &__actions {
            display: inline-block;
            position: absolute;
            right: 0;
            top: 0;

            line-height: 1;
            color: #ccc;
            background-color: #555;
          }
        }
      }
    }

    &__settings {
      padding: 0 20px;
      background-color: #fff;
      border-left: 2px solid #888;
      min-width: 265px;
      top: 0;
      right: 0;

      &-section {
        font-size: larger;
        border-top: 2px solid #888;
        color: #888;

        &:nth-of-type(n+2) {
          margin-top: 20px;
        }
      }

      &-prop {
        & > label {
          width: 110px;
          display: inline-block;
          font-size: small;
        }

        & > input {
          width: 40px;
        }
      }
    }

    &__dialog {
      &__confirm {
        display: flex;
        flex-direction: column;
        height: 450px;
        box-shadow: 0 2px 8px 4px #0003;
        background: #fff;

        &__header {
          background-color: #000;
          color: #fff;
          font-size: 30px;
          padding: 10px;
        }

        &__content {
          padding: 20px;
          flex: 1;
        }

        &__item-name {
          border: 1px solid #888;
          padding: 5px;
        }

        &__action-btn {
          padding: 20px;
          display: flex;
          flex-direction: row-reverse;
        }
      }

      &__output {
        width: 600px;
        background: #fff;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;

        & > textarea {
          border: 1px dashed #888;
          height: 400px;
          width: 90%;
          margin: 20px;
          padding: 5px;
        }
      }
    }
  }
</style>
