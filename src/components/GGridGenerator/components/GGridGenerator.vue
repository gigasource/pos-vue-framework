<script>
  import _ from 'lodash'
  import { reactive, ref, computed, onUpdated } from '@vue/composition-api'
  import { saveFile, openFile } from '../../../utils/helpers'
  import { enterPressed, escapePressed, shiftPressed, ctrlPressed, metaPressed } from '../../../utils/keyboardHelper'
  import copy from 'copy-to-clipboard'
  import {
    _gridItemOptions, _gridContentOptions, joinRefArrayValue, normalizeArea, getCssArea, getUniqueAreaName,
    _flexJustifyContentOptions, _flexAlignItemOptions, _flexAlignContentOptions, _flexWraps, _flexDirection
  } from '../logic/utils'
  import GridModel from '../logic/GridModel'
  import { fromJSON, toJSONStr, toJSON } from '../logic/modelParser'
  import GDialog from '../../GDialog/GDialog'
  import GIcon from '../../GIcon/GIcon'
  import GGridLayout from '../GGridLayout'
  import GIncDecNumberInput from './IncDecNumberInput'
  import GEditViewInput from './EditViewInput'
  import DemoLayoutDialog, { renderGLayoutData } from './DemoLayoutDialog';
  import GSwitch from '../../GSwitch/GSwitch'
  import GBtn from '../../GBtn/GBtn'
  import GTextField from '../../GInput/GTextField';

  const selectedSettingEnum = {
    grid: 0,
    area: 1
  }

  /**
   * Return all grid/sub-grid item
   * skip single item
   * @param grid {GridModel}
   * @returns {null}
   */
  function getGridList(grid) {
    let gridList = null
    if (grid.subAreas) {
      gridList = [grid]
      _.each(grid.subAreas, area => {
        gridList.push(...(getGridList(area) || []).filter(i => i != null))
      })
    }
    return gridList
  }

  function getAreaNames(grid) {
    let areaNames = []
    if (grid.subAreas) {
      _.each(grid.subAreas, area => {
        areaNames.push(area.name)
        areaNames.push(...getAreaNames(area))
      })
    }
    return areaNames
  }

  function createEmptySelectingArea() {
    return {
      name: 'div',
      rowStart: -1,
      columnStart: -1,
      rowEnd: -1,
      columnEnd: -1
    }
  }

  export default {
    name: 'GGridGenerator',
    components: { GTextField, GSwitch, GGridLayout, DemoLayoutDialog, GEditViewInput, GIncDecNumberInput, GDialog, GIcon, GBtn },
    props: {
      layout: {
        type: Object
      }
    },
    setup(props, context) {
      // initialize layout
      let initLayout = fromJSON(props.layout)
      const state = reactive({
        layout: initLayout,
        //// view settings
        // view size
        fieldWidth: 946,
        fieldHeight: 478,
        // view mode
        viewMode: false,
        // grid layout
        demoMode: false,
        gridLayoutLazy: false,

        displayPreviewColor: false,
        demoLayoutData: [],
        showDemoLayoutDialog: false,
        selectedDemoLayoutDataIndex: -1,
        //// hover settings
        hoveringArea: null,

        //
        selectedSetting: selectedSettingEnum.grid,
        // a value hold the selected grid/sub-grid
        selectedGrid: initLayout,
        // a value hold the selected area
        selectedArea: null,
        // a value hold the editing area
        editingArea: null,

        // A value hold selected index of row unit
        // Base 0
        selectedRowId: 0,
        // A value hold selected index of column unit
        // Base 0
        selectedColumnId: 0,

        // value indicate whether a create demo dialog will be shown or not
        showCreateDemoInputDialog: false,

        // a value indicate whether a confirm dialog will be shown or not
        // the confirm dialog should be show when user create new sub-grid/single item
        showConfirmDialog: false,
        confirmDialogErrorMsg: '',
        // a value indicate whether an output dialog will be shown or not
        // the output dialog should be shown when user click to generate output button
        showOutputDialog: false,
        // a value which hold generated css
        generatedCss: ''
      })

      // 1) List
      // list all grid item is grid or sub-grid (not for single item)
      function getGridListItemClass(grid) {
        return {
          'grid-gen__sub-list__item': true,
          'grid-gen__sub-list__item--selected': grid === state.selectedGrid
        }
      }

      function setSelectedGrid(grid) {
        state.selectedGrid = grid
        state.selectedSetting = selectedSettingEnum.grid
      }

      function renderGridList() {
        return <div class="grid-gen__sub-list">
          <div class="grid-gen__sub-list__section">Grid</div>
          <ul class="grid-gen__sub-list__items">
            {_.map(getGridList(state.layout), grid =>
                <li class={getGridListItemClass(grid)} key={grid.name}>
                  <g-edit-view-input
                      width="100%"
                      value={grid.name}
                      vOn:click={() => setSelectedGrid(grid)}
                      vOn:input={newName => grid.name = newName}/>
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
          'grid-gen__sub-list__item--overflowed': area.isOverflowed()
        }
      }

      function setSelectedArea(area) {
        state.selectedArea = area
        state.selectedSetting = selectedSettingEnum.area
      }

      function renderAreaList() {
        return <div class="grid-gen__sub-list">
          <div class="grid-gen__sub-list__section">Area</div>
          <ul class="grid-gen__sub-list__items">
            {_.map(state.selectedGrid.subAreas, area =>
                <li class={getAreaListItemClass(area)} key={area.name}>
                  <g-edit-view-input
                      width="100%"
                      value={area.name} vOn:input={v => area.name = v}
                      vOn:click={() => setSelectedArea(area)}/>
                  <span style="line-height: 16px" vOn:click={() => area.toggleVisible()}>
                    <g-icon small>{area.visible ? 'visibility' : 'visibility_off'}</g-icon>
                  </span>
                </li>
            )}
          </ul>
        </div>
      }

      let areaNames;

      function renderDemoInputList() {
        return <div class="grid-gen__sub-list">
          <div class="grid-gen__sub-list__section">Demo Input</div>
          <g-btn flat outlined vOn:click={() => {
            areaNames = _.map(_.uniq(getAreaNames(state.layout)), name => ({ text: name, value: name }))
            state.selectedDemoLayoutDataIndex = -1
            state.showDemoLayoutDialog = true
          }}>Add Demo Data
          </g-btn>
          <demo-layout-dialog
              show={state.showDemoLayoutDialog}
              areaNames={areaNames}
              value={state.selectedDemoLayoutDataIndex >= 0 ? state.demoLayoutData[state.selectedDemoLayoutDataIndex] : null}
              vOn:create={demo => state.demoLayoutData.push(demo)}
              vOn:update={demo => state.demoLayoutData[state.selectedDemoLayoutDataIndex] = demo}
              vOn:close={() => state.showDemoLayoutDialog = false}
          />
          {_.map(state.demoLayoutData, (demoLayoutData, id) =>
              <div class="grid-gen__sub-list__item">
                <span style="line-height: 16px">
                  <g-icon small vOn:click={e => {
                    state.selectedDemoLayoutDataIndex = id
                    state.showDemoLayoutDialog = true
                  }}>edit
                  </g-icon>
                </span>
                <span style="flex: 1; height: 20px; font-size: small">{demoLayoutData.area}</span>
                <span style="line-height: 16px">
                  <g-icon small vOn:click={e => state.demoLayoutData.splice(_.indexOf(state.demoLayoutData, demoLayoutData), 1)}>delete</g-icon>
                </span>
              </div>
          )}
        </div>
      }

      // 2) Editor
      // render row, column unit editor
      const heightUnitSettingRowWidth = '150px' // define the width of row height setting section
      const widthUnitSettingColumnHeight = '30px' // define the height of column width setting section
      function getColumnUnitClass(id) {
        return {
          'grid-gen__column-unit': true,
          'grid-gen__column-unit--selected': id === state.selectedColumnId,
        }
      }

      /**
       *
       * @param grid {GridModel}
       * @returns {*}
       */
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
              <div class={getColumnUnitClass(id)} key={`${col.value}_${id}`}>
                <input
                    value={col.value}
                    vOn:keypress={e => enterPressed(e) && grid.setColumnUnit(id, e.target.value)}
                    vOn:focus_stop={() => state.selectedColumnId = id}/>
              </div>
          )
        }
        </div>
      }

      function getRowUnitClass(id) {
        return {
          'grid-gen__row-unit': true,
          'grid-gen__row-unit--selected': id === state.selectedRowId
        }
      }

      /**
       *
       * @param grid {GridModel}
       * @returns {*}
       */
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
              <div class={getRowUnitClass(id)} key={`${row.value}_${id}`}>
                <input
                    value={row.value}
                    vOn:keypress={e => enterPressed(e) && grid.setRowUnit(id, e.target.value)}
                    vOn:focus_stop={() => state.selectedRowId = id}
                />
              </div>
          )
        }
        </div>
      }

      // render grid editor
      // store selecting area temporary information
      // similar to state.hoveringArea but store raw grid index base 0
      // state.hoveringArea contain modified area and only used for display hovering area
      let _selectingArea = createEmptySelectingArea()

      /**
       *
       * @param grid {GridModel}
       * @returns {*}
       */
      function renderGridContainer(grid) {
        const gridItems = []
        for (let i = 0, rowLen = grid.rows.length; i < rowLen; ++i) {
          for (let j = 0, colLen = grid.columns.length; j < colLen; ++j) {
            gridItems.push(<div
                class='grid-gen__editor__field__item'
                vOn:mousedown={(e) => {
                  // check and execute if area hit
                  if (e.ctrlKey && areaHit(e)) return

                  // check and execute if area's action hit
                  if (tryToExecuteActionIfHit(e)) return

                  // create or modify existing item
                  _selectingArea = {
                    name: state.editingArea ? state.editingArea.name : getUniqueAreaName('div', state.selectedGrid.subAreas),
                    rowStart: i,
                    columnStart: j,
                    rowEnd: i,
                    columnEnd: j
                  }
                  state.hoveringArea = normalizeArea(_selectingArea)
                }}
                vOn:mouseenter={() => {
                  if (state.hoveringArea) {
                    _selectingArea = { ..._selectingArea, rowEnd: i, columnEnd: j }
                    state.hoveringArea = normalizeArea(_selectingArea)
                  }
                }}
                vOn:mouseup={() => {
                  if (state.hoveringArea) {
                    if (state.editingArea) {
                      state.editingArea.setArea(_selectingArea)
                      state.editingArea = null
                    } else {
                      state.showConfirmDialog = true
                    }
                    state.hoveringArea = null
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
        }
        const selectedAreaContainerStyle = {
          ...gridStyles,
          'pointer-events': 'none',
        }

        return ([
          <div style={gridStyles} class="grid-gen__editor__field">{gridItems}</div>,
          <div style={selectedAreaContainerStyle}>
            {renderGridAreas(grid, false)}
            {renderHoveringArea()}
          </div>
        ])
      }

      function getAreaClass(area) {
        return {
          'grid-gen__editor__field__area': true,
          'grid-gen__editor__field__area--selected': area == state.selectedArea,
          'grid-gen__editor__field__area--editing': area == state.editingArea,
        }
      }

      const actionWrapperClass = 'grid-gen__editor__field__area__actions'
      const actionClass = 'area-action'

      function areaHit(e) {
        for (let actionWrapperElement of context.refs.el.getElementsByClassName(actionWrapperClass)) {
          const area = actionWrapperElement.parentNode
          const { top, left, width, height } = area.getBoundingClientRect()
          const pageTop = top + window.scrollY
          const pageLeft = left + window.scrollX
          const pageBottom = pageTop + height
          const pageRight = pageLeft + width
          if ((pageLeft <= e.pageX && e.pageX <= pageRight) && (pageTop <= e.pageY && e.pageY <= pageBottom)) {
            area.click()
            return true
          }
        }
      }

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

      /**
       * @param gridItem {GridModel}
       */
      function renderGridAreaInEditMode(gridItem) {
        return <div
            class={getAreaClass(gridItem)}
            style={{ backgroundColor: gridItem.bgColor, gridArea: gridItem.gridAreaCss() }}
            vOn:click={() => {
              setSelectedArea(gridItem)
            }}>
          <span>{gridItem.name}</span>
          <span class={actionWrapperClass}>
            <span class={actionClass} vOn:click={() => gridItem.changeBgColor()}>
              <g-icon small>autorenew</g-icon>
            </span>
            <span class={actionClass}
                  vOn:click={() => {
                    state.selectedArea = gridItem
                    state.editingArea = gridItem
                  }}>
              <g-icon small>edit</g-icon>
            </span>
            <span class={actionClass} vOn:click={() => gridItem.destroy()}>
              <g-icon small>delete</g-icon>
            </span>
          </span>
        </div>
      }

      /**
       * @param grid {GridModel}
       */
      function renderGridAreaInViewMode(grid) {
        if (grid instanceof GridModel && grid.subAreas.length > 0) {
          return <div
              class="grid-gen__editor__field__area"
              style={{
                border: '1px solid #0008',
                backgroundColor: grid.bgColor,
                gridArea: grid.gridAreaCss(),
                display: 'grid',
                'grid-template-columns': joinRefArrayValue(grid.columns),
                'grid-template-rows': joinRefArrayValue(grid.rows),
                'gap': `${grid.rowGap}px ${grid.columnGap}px`,
              }}>
            {renderGridAreas(grid, true)}
          </div>
        } else {
          return <div
              class="grid-gen__editor__field__area"
              style={{
                border: '1px solid #0008',
                backgroundColor: grid.bgColor,
                gridArea: grid.gridAreaCss(),
              }}>
            {grid.name}
          </div>
        }
      }

      /**
       * render area
       * @param grid {GridModel | AreaModel}
       * @param viewMode
       * @returns {*}
       */
      function renderGridAreas(grid, viewMode) {
        if (grid instanceof GridModel) {
          return grid.subAreas.map(gridItem => {
            return !gridItem.visible
                ? null
                : viewMode
                    ? renderGridAreaInViewMode(gridItem)
                    : renderGridAreaInEditMode(gridItem)
          })
        }
      }

      // render hovering area
      function renderHoveringArea() {
        return state.hoveringArea ? <div style={{
          border: '3px dashed #000',
          'grid-area': getCssArea(state.hoveringArea)
        }}></div> : null
      }

      // render mini map (view mode)
      function renderMiniMap() {
        const gridItems = []
        for (let i = 0, rowLen = state.layout.rows.length; i < rowLen; ++i) {
          for (let j = 0, colLen = state.layout.length; j < colLen; ++j) {
            gridItems.push(<div class='grid-gen__editor__field__item'></div>)
          }
        }
        const selectedAreaContainerStyle = {
          display: 'grid',
          'grid-template-columns': joinRefArrayValue(state.layout.columns),
          'grid-template-rows': joinRefArrayValue(state.layout.rows),
          'gap': `${state.layout.rowGap}px ${state.layout.columnGap}px`,
          //
          position: 'absolute',
          top: 0,
          left: heightUnitSettingRowWidth,
          bottom: 0,
          right: 0,
          backgroundColor: '#fff',
          'pointer-events': 'none',
        }
        return ([
          <div style={selectedAreaContainerStyle} class="grid-gen__editor__field">
            {renderGridAreas(state.layout, true)}
          </div>
        ])
      }

      function renderDemoLayout() {
        return <g-grid-layout
            vShow={state.demoMode}
            lazy={state.gridLayoutLazy}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: 0,
              left: heightUnitSettingRowWidth,
              bottom: 0,
              right: 0,
            }}
            layout={toJSON(state.layout)}
            displayPreviewColor={state.displayPreviewColor}>
          {_.map(state.demoLayoutData, renderGLayoutData)}
        </g-grid-layout>
      }

      // render confirm dialog
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

      function newAreaNameIsAvailable(grid) {
        if (grid.isSubAreaNameExisted(_selectingArea.name)) {
          state.confirmDialogErrorMsg = `"${_selectingArea.name.substr(0, 30)}" existed!`
          return false
        }
        return true
      }

      /**
       * @param grid {GridModel}
       */
      function onSubGridBtnClicked(grid) {
        if (newAreaNameIsAvailable(grid) && grid.addSubGrid(_selectingArea)) {
          state.showConfirmDialog = false
          _selectingArea = createEmptySelectingArea()
        }
      }

      /**
       * @param grid {GridModel}
       */
      function onSubItemBtnClicked(grid) {
        if (newAreaNameIsAvailable(grid) && grid.addSubItem(_selectingArea)) {
          state.showConfirmDialog = false
          _selectingArea = createEmptySelectingArea()
        }
      }

      function onCancelBtnClick() {
        state.showConfirmDialog = false
        _selectingArea = createEmptySelectingArea()
      }

      function renderConfirmDialog(grid) {
        return <g-dialog value={state.showConfirmDialog} width="600px" persistent>
          <div class="grid-gen__dialog__confirm" vOn:keydown={onOnConfirmDialogKeyDown}>
            <span class="grid-gen__dialog__confirm__header">Create new area</span>
            <div class="grid-gen__dialog__confirm__content">
              <g-text-field
                  label="Area name"
                  value={_selectingArea.name} vOn:input={e => {
                _selectingArea.name = e.target.value
                if (state.confirmDialogErrorMsg !== '') {
                  state.confirmDialogErrorMsg = ''
                }
              }}/>
              <span class="grid-gen__dialog__confirm__error-msg">{state.confirmDialogErrorMsg}</span>
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
              <span vOn:click={() => onSubGridBtnClicked(grid)} ref={refIdBtnCreateSubGrid}>
                <g-btn flat outlined>Sub grid</g-btn>
              </span>
              &nbsp;
              <span ref={refIdBtnCreateSubItem} vOn:click={() => onSubItemBtnClicked(grid)}>
                <g-btn flat outlined>Sub item</g-btn>
              </span>
              &nbsp;
              <span ref={refIdBtnCancel} vOn:click={onCancelBtnClick}>
                <g-btn flat outlined>Cancel</g-btn>
              </span>
            </div>
          </div>
        </g-dialog>
      }

      // 3) Settings
      function renderViewportSetting() {
        return [
          <div class="grid-gen__settings-section">Viewport</div>,
          <div class="grid-gen__settings-prop">
            <label>Width(px): </label>
            <g-inc-dec-number-input min={600} value={state.fieldWidth} vOn:input={v => state.fieldWidth = v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Height(px): </label>
            <g-inc-dec-number-input min={400} value={state.fieldHeight} vOn:input={v => state.fieldHeight = v}/>
          </div>
        ]
      }

      /**
       * @param grid {GridModel}
       */
      function renderGridSettings(grid) {
        return state.selectedSetting === selectedSettingEnum.grid ? [
          // columns number, rows number, gap pixel setting
          <div class="grid-gen__settings-section">Grid Settings</div>,
          <div class="grid-gen__settings-prop">
            <label>Columns: </label>
            <g-inc-dec-number-input min={1} value={grid.columns.length} vOn:input={v => grid.setColumnNumbers(v)}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Rows: </label>
            <g-inc-dec-number-input min={1} value={grid.rows.length} vOn:input={v => grid.setRowNumbers(v)}/>
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
            <select vOn:change={e => grid.alignItems = e.target.value}>
              {_.map(_gridItemOptions, value => <option key={value} selected={grid.alignItems === value} value={value}>{value}</option>)}
            </select>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Align content:</label>
            <select vOn:change={e => grid.alignContent = e.target.value}>
              {_.map(_gridContentOptions, value => <option key={value} selected={grid.alignContent === value} value={value}>{value}</option>)}
            </select>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Justify Items:</label>
            <select vOn:change={e => grid.justifyItems = e.target.value}>
              {_.map(_gridItemOptions, value => <option key={value} selected={grid.justifyItems === value} value={value}>{value}</option>)}
            </select>
          </div>,

          // justify/alignment contents
          <div class="grid-gen__settings-prop">
            <label>Justify content:</label>
            <select vOn:change={e => grid.justifyContent = e.target.value}>
              {_.map(_gridContentOptions, value => <option key={value} selected={grid.justifyContent === value} value={value}>{value}</option>)}
            </select>
          </div>,

          // Insert/delete row/column
          <div class="grid-gen__settings-section">Insert/Delete</div>,
          <div class="grid-gen__settings-prop">
            <label>Rows:</label>
            <div class="grid-gen__settings-prop__insert-delete">
              <g-icon vOn:click={() => grid.insertRowAbove(state.selectedRowId)}>mdi-table-row-plus-before</g-icon>
              <g-icon vOn:click={() => grid.insertRowBelow(state.selectedRowId)}>mdi-table-row-plus-after</g-icon>
              <g-icon vOn:click={() => grid.deleteRow(state.selectedRowId)}>mdi-table-row-remove</g-icon>
            </div>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Columns:</label>
            <div class="grid-gen__settings-prop__insert-delete">
              <g-icon vOn:click={() => grid.insertColumnLeft(state.selectedColumnId)}>mdi-table-column-plus-before</g-icon>
              <g-icon vOn:click={() => grid.insertColumnRight(state.selectedColumnId)}>mdi-table-column-plus-after</g-icon>
              <g-icon vOn:click={() => grid.deleteColumn(state.selectedColumnId)}>mdi-table-column-remove</g-icon>
            </div>
          </div>,
        ] : null
      }

      /**
       *
       * @param gridItem {GridModel}
       * @returns {*}
       */
      function renderAreaSettings(gridItem) {
        return gridItem != null && (gridItem._parent === state.selectedGrid) && state.selectedSetting === selectedSettingEnum.area ? [
          <div class="grid-gen__settings-section">Area Settings</div>,
          <div class="grid-gen__settings-prop">
            <label>Top: </label>
            <g-inc-dec-number-input min={1} value={gridItem.top} vOn:input={v => gridItem.top = v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Left: </label>
            <g-inc-dec-number-input min={1} value={gridItem.left} vOn:input={v => gridItem.left = v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Width: </label>
            <g-inc-dec-number-input min={1} value={gridItem.width} vOn:input={v => gridItem.width = v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Height: </label>
            <g-inc-dec-number-input min={1} value={gridItem.height} vOn:input={v => gridItem.height = v}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Align self:</label>
            <select vOn:change_stop={e => gridItem.alignSelf = e.target.value}>
              {_.map(_gridItemOptions, value => <option key={value} selected={gridItem.alignSelf === value} value={value}>{value}</option>)}
            </select>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Justify self:</label>
            <select vOn:change_stop={e => gridItem.justifySelf = e.target.value}>
              {_.map(_gridItemOptions, value => <option key={value} selected={gridItem.justifySelf === value} value={value}>{value}</option>)}
            </select>
          </div>,
          // padding/margin
          <div class="grid-gen__settings-section">Wrapper</div>,
          <div class="grid-gen__settings-prop">
            <label>Wrap in div:</label>
            <input type="checkbox" checked={gridItem.wrapInDiv} vOn:change={e => gridItem.wrapInDiv = e.target.checked}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Padding:</label>
            <input value={gridItem.padding} vOn:keyup={e => enterPressed(e) && (gridItem.padding = e.target.value)}/>
          </div>,
          <div class="grid-gen__settings-prop">
            <label>Margin:</label>
            <input value={gridItem.margin} vOn:keyup={e => enterPressed(e) && (gridItem.margin = e.target.value)}/>
          </div>,
          // flex
          <div vShow={gridItem.wrapInDiv}>
            <div class="grid-gen__settings-section">Flex</div>
            <div class="grid-gen__settings-prop">
              <label>Flex: </label>
              <input type="checkbox" checked={gridItem.displayFlex} vOn:change={e => gridItem.displayFlex = e.target.checked}/>
            </div>
            <div class="grid-gen__settings-prop">
              <label>Direction: </label>
              <select vOn:change_stop={e => gridItem.flexDirection = e.target.value}>
                {_.map(_flexDirection, direction =>
                    <option key={direction} selected={gridItem.flexDirection === direction} value={direction}>{direction}</option>)}
              </select>
            </div>
            <div class="grid-gen__settings-prop">
              <label>Wrap: </label>
              <select vOn:change_stop={e => gridItem.flexWrap = e.target.value}>
                {_.map(_flexWraps, v => <option key={v} selected={gridItem.flexWrap === v} value={v}>{v}</option>)}
              </select>
            </div>
            <div class="grid-gen__settings-prop">
              <label><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content">Justify content: </a></label>
              <select vOn:change_stop={e => gridItem.flexJustifyContent = e.target.value}>
                {_.map(_flexJustifyContentOptions, v => <option key={v} selected={gridItem.flexJustifyContent === v} value={v}>{v}</option>)}
              </select>
            </div>
            <div class="grid-gen__settings-prop">
              <label><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items">Align items:</a></label>
              <select vOn:change_stop={e => gridItem.flexAlignItems = e.target.value}>
                {_.map(_flexAlignItemOptions, v => <option key={v} selected={gridItem.flexAlignItems === v} value={v}>{v}</option>)}
              </select>
            </div>
            <div class="grid-gen__settings-prop">
              <label><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-content">Align content:</a></label>
              <select vOn:change_stop={e => gridItem.flexAlignContent = e.target.value}>
                {_.map(_flexAlignContentOptions, v => <option key={v} selected={gridItem.flexAlignContent === v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>,
        ] : null
      }

      // 4) Generate output
      function loadLayoutFile() {
        openFile({ multiple: false, mimeType: 'application/json' }, files => {
          files[0].text().then(content => {
            state.layout = fromJSON(JSON.parse(content))
            state.selectedGrid = state.layout
          })
        })
      }

      function saveLayoutFile() {
        saveFile('layout.json', toJSONStr(state.layout), 'application/json')
      }

      function copyLayoutStrToClipBoard() {
        copy(toJSONStr(state.layout))
      }

      function renderGridGenerateSaveCloseButton() {
        return [
          <div class="grid-gen__settings-section">Dialog Actions</div>,
          <g-btn flat outlined vOn:click_stop_prevent={e => {
            context.emit('json', toJSON(state.layout))
            context.emit('close')
          }}>Save</g-btn>,
          <span>&nbsp;</span>,
          <g-btn flat outlined vOn:click_stop_prevent={e => {
            state.layout = fromJSON(props.layout)
            state.selectedGrid = state.layout
            context.emit('close')
          }}>Cancel</g-btn>,
        ]
      }

      function renderGridGeneratorOutput() {
        return [
          <div class="grid-gen__settings-section">Files</div>,
          <g-btn flat outlined vOn:click_stop_prevent={loadLayoutFile}>Import</g-btn>,
          <span>&nbsp;</span>,
          <g-btn flat outlined vOn:click_stop_prevent={saveLayoutFile}>Export</g-btn>,
          <span>&nbsp;</span>,
          <g-btn flat outlined vOn:click_stop_prevent={copyLayoutStrToClipBoard}>Copy</g-btn>,
        ]
      }

      // 0) Entire render
      // event handler doesn't invoke
      function renderGridGenerator() {
        return (
            <div class="grid-gen" ref="el" tabIndex="0"
                 vOn:contextmenu_prevent={e => false}>
              <div class="grid-gen__list">
                {renderGridList()}
                {renderAreaList()}
                {renderDemoInputList()}
              </div>
              <div class="grid-gen__editor">
                <div style={{
                  position: 'relative',
                  width: `${state.fieldWidth}px`,
                  height: `${state.fieldHeight}px`,
                  backgroundColor: '#fff',
                }}>
                  {renderGridColumnWidthSetting(state.selectedGrid)}
                  {renderGridRowHeightSetting(state.selectedGrid)}
                  {renderGridContainer(state.selectedGrid)}
                </div>
                <div style={{
                  position: 'relative',
                  width: `${state.fieldWidth}px`,
                  height: `50px`,
                  backgroundColor: '#dee',
                  display: 'flex',
                }}>
                  <g-switch value={state.viewMode} vOn:change={v => state.viewMode = v} label="Preview"/>
                  <g-switch value={state.demoMode} vOn:change={v => {
                    state.demoMode = v
                    if (state.demoMode)
                      state.gridLayoutLazy = false
                  }} label="Demo"/>
                  <g-switch vShow={state.demoMode} value={state.displayPreviewColor} vOn:change={v => state.displayPreviewColor = v} label="Hint"/>
                </div>
                <div
                    vShow={state.viewMode || state.demoMode}
                    style={{
                      position: 'relative',
                      width: `${state.fieldWidth}px`,
                      height: `${state.fieldHeight}px`,
                      backgroundColor: '#dee',
                      transition: 'height 0.5s'
                    }}>
                  {state.viewMode && renderMiniMap()}
                  {state.demoMode && renderDemoLayout()}
                </div>
              </div>
              <div class="grid-gen__settings">
                {renderGridGenerateSaveCloseButton()}
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
    outline: none;

    &__list {
      background-color: #fff;
      border-right: 2px solid #888;
      padding: 0 15px;
    }

    &__sub-list {
      margin-bottom: 20px;

      &__section {
        position: relative;
        color: #888;
        overflow: hidden;

        &:after {
          width: 100%;
          height: 100%;
          content: "";
          border-top: 1px solid #888;
          margin-left: 5px;
          position: absolute;
          transform: translateY(50%);
        }
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
        border: 1px solid black;
        outline: none;
      }

      &--selected > input {
        border: 2px solid black;
      }
    }

    &__row-unit {
      margin: auto;
      text-align: center;

      & > input {
        width: 100%;
        border: 1px solid black;
        outline: none;
      }

      &--selected > input {
        border: 2px solid black;
      }
    }

    &__editor {
      flex: 1;
      overflow: auto;
      border: 1px solid #0003;
      background: #222;

      &__field {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='8' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0h1L0 6V5zm1 5v1H5z' fill='%239C92AC' fill-opacity='.4' fill-rule='evenodd'/%3E%3C/svg%3E");

        &__item {
          cursor: pointer;
          border: 1px dotted #666;

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
      padding: 0 15px;
      background-color: #fff;
      border-left: 2px solid #888;
      min-width: 220px;
      top: 0;
      right: 0;


      &-section {
        font-size: larger;
        color: #888;
        position: relative;
        overflow: hidden;

        &:after {
          width: 100%;
          height: 100%;
          content: "";
          border-top: 1px solid #888;
          margin-left: 5px;
          position: absolute;
          transform: translateY(50%);
        }

        &:nth-of-type(n+2) {
          margin-top: 20px;
        }
      }

      &-prop {
        display: flex;
        flex-direction: row;
        margin-top: 5px;
        align-items: center;

        &__insert-delete {
          display: flex;
          justify-content: space-between;

          & > * {
            color: #555;
            padding: 2px;
            border: 1px solid #0003;
            border-radius: 2px;

            &:hover {
              background: #ddd;
            }
          }
        }

        & > label {
          width: 110px;
          display: inline-block;
          font-size: small;
        }

        & > input, select, div {
          width: 102px;
        }

        & > select, input {
          border: solid 1px black;
          border-radius: 2px;
          padding-left: 5px;
          outline: none;
        }
      }
    }

    &__dialog {
      &__confirm {
        display: flex;
        flex-direction: column;
        height: 600px;
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

        &__error-msg {
          font-size: small;
          color: red;
          padding-left: 10px;
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
