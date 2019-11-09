<script>
  import _ from 'lodash'
  import {
    generateGridCSS,
    joinRefArrayValue,
    getGridAreaCss,
    addSubGridArea,
    addSubItemArea,
    deleteGridItem, createEmptyArea,
    getSelectedAreas, isGridAreaNameValid
  } from './logic/GGridGeneratorUtil'
  import { reactive, ref, computed } from '@vue/composition-api';
  import GDialog from '../GDialog/GDialog';
  import GIcon from '../GIcon/GIcon'
  import { enterPressed } from '../../utils/keyboardHelper';
  import { createRange } from '../../utils/helpers'
  import GIncDecNumberInput from './GIncDecNumberInput';
  import GEditViewInput from './GEditViewInput';

  export default {
    name: 'GGridGenerator',
    components: { GEditViewInput, GIncDecNumberInput, GDialog, GIcon },
    props: {
      layout: {
        type: Object,
      }
    },
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
      let initialLayout = props.layout || {
        name: 'app',
        isRoot: true,
        settings: {
          columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
          rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
          columnGap: 0,
          rowGap: 0,
        },
        subAreas: []
      }

      const state = reactive({
        grids: [initialLayout],

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
      let selectingArea = createEmptyArea()

      // 1) List
      // TODO: Validate new itemName
      function changeItemName(item, newName) {
        if (state.selectedGrid === item.name)
          state.selectedGrid = newName
        item.name = newName
      }

      function getGridListItemClass(grid) {
        return {
          'g-grid-generator__list__item': true,
          'g-grid-generator__list__item--selected': grid.name === state.selectedGrid
        }
      }

      // list all grid item is grid or sub-grid (not for single item)
      function renderGridList() {
        return <div class="g-grid-generator__list">
          <div class="g-grid-generator__list__header">GRID</div>
          <ul class="g-grid-generator__list__items">
            {_.map(state.grids, grid => !grid.settings ? null :
                <li class={getGridListItemClass(grid)}>
                  <g-edit-view-input
                      width="100%"
                      value={grid.name}
                      vOn:click={() => state.selectedGrid = grid.name}
                      vOn:input={newName => changeItemName(grid, newName)}
                  />
                </li>
            )}
          </ul>
        </div>
      }

      // show all area
      function renderAreaList() {
        return <div class="g-grid-generator__list">
          <div class="g-grid-generator__list__header">AREA</div>
          <ul class="g-grid-generator__list__items">
            {_.map(getSelectedAreas(state.grids, state.selectedGrid), area =>
                <li class="g-grid-generator__list__item">
                  <g-edit-view-input
                      width="100%"
                      value={area.name}
                      vOn:click={() => area.settings && (state.selectedGrid = area.name)}
                      vOn:input={newName => changeItemName(area, newName)}
                  />
                  <span style="line-height: 16px" vOn:click={() => area.hide = !area.hide}>
                    <g-icon small>{area.hide ? 'visibility' : 'visibility_off' }</g-icon>
                  </span>
                </li>
            )}
          </ul>
        </div>
      }

      // 2) Editor
      const heightUnitSettingRowWidth = '60px' // define the width of row height setting section
      const widthUnitSettingColumnHeight = '30px' // define the height of column width setting section
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
              <div class='g-grid-generator__column-unit'>
                <input value={col.value} vOn:keypress={e => enterPressed(e) && (grid.settings.columns[id].value = e.target.value)}/>
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
          _.map(grid.settings.rows, (row, id) =>
              <div class='g-grid-generator__row-unit'>
                <input value={row.value} vOn:keypress={e => enterPressed(e) && (grid.settings.rows[id].value = e.target.value)}/>
              </div>
          )
        }
        </div>
      }

      const cptGridContainerClass = computed(() => ({
        'g-grid-generator__editor__field__item' : true,
        'g-grid-generator__editor__field__item--view-only' : state.viewMode,
      }))
      function renderGridContainer(grid) {
        const gridItems = []
        for (let i = 0, rowLen = grid.settings.rows.length; i < rowLen; ++i) {
          for (let j = 0, colLen = grid.settings.columns.length; j < colLen; ++j) {
            gridItems.push(<div
                class={cptGridContainerClass.value}
                vOn:mousedown={(e) => {
                  if (state.viewMode) return
                  // check if mouse is down inside 'delete' area
                  // if User, then delete the area contain this delete area
                  let deleteHit = false
                  const deleteAreaElements = context.refs.el.getElementsByClassName('g-grid-generator__editor__field__area__delete')
                  for (let i = 0; i < deleteAreaElements.length; ++i) {
                    const el = deleteAreaElements[i]
                    const { top, left, width, height } = el.getBoundingClientRect()
                    const pageTop = top + window.scrollY
                    const pageLeft = left + window.scrollX
                    const pageBottom = pageTop + height
                    const pageRight = pageLeft + width
                    if ((pageLeft <= e.pageX && e.pageX <= pageRight) && (pageTop <= e.pageY && e.pageY <= pageBottom)) {
                      el.click()
                      if (!deleteHit) {
                        deleteHit = true
                      }
                    }
                  }

                  if (deleteHit) {
                    return
                  }

                  // start select an area
                  selectingArea = { ...selectingArea, rowStart: i, columnStart: j }
                  state.hoveringArea = { rowStart: i + 1, columnStart: j + 1, rowEnd: i + 2, columnEnd: j + 2 }
                  state.hovering = true
                }}
                vOn:mouseup={() => {
                  if (state.viewMode) return
                  if (state.hovering) {
                    selectingArea = { ...selectingArea, rowEnd: i, columnEnd: j }
                    state.hovering = false
                    state.showConfirmDialog = true
                  }
                }}
                vOn:mouseenter={() => {
                  if (state.viewMode) return
                  if (state.hovering) {
                    const rowStart = Math.min(selectingArea.rowStart, i) + 1
                    const rowEnd = Math.max(selectingArea.rowStart, i) + 2
                    const columnStart = Math.min(selectingArea.columnStart, j) + 1
                    const columnEnd = Math.max(selectingArea.columnStart, j) + 2
                    state.hoveringArea = { rowStart, rowEnd, columnStart, columnEnd }
                  }
                }}
            ></div>)
          }
        }

        const gridStyles = {
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
          //
        }
        const selectedAreaContainerStyle = {
          ...gridStyles,
          'pointer-events': 'none',
        }

        return ([
          <div style={gridStyles} class="g-grid-generator__editor__field">{gridItems}</div>,
          <div style={selectedAreaContainerStyle}>
            {renderGridAreas(grid)}
            {renderHoveringArea()}
          </div>
        ])
      }

      function renderGridAreaInEditMode(gridItem, index) {
        return <div
            class="g-grid-generator__editor__field__area"
            style={{ backgroundColor: gridItem.bgColor, gridArea: getGridAreaCss(gridItem) }}>
          <span class="g-grid-generator__editor__field__area__name">
            {gridItem.name}
          </span>
          <span
              class="g-grid-generator__editor__field__area__delete"
              vOn:click={() => deleteGridItem(state.grids, gridItem)}>x</span>
        </div>
      }

      function renderGridAreaInViewMode(gridItem) {
        if (gridItem.settings) {
          return <div
              class="g-grid-generator__editor__field__area"
              style={{
                border: '1px dashed #0008',
                backgroundColor: gridItem.bgColor,
                gridArea: getGridAreaCss(gridItem),
                display: 'grid',
                'grid-template-columns': joinRefArrayValue(gridItem.settings.columns),
                'grid-template-rows': joinRefArrayValue(gridItem.settings.rows),
                'gap': `${gridItem.settings.rowGap}px ${gridItem.settings.columnGap}px`,
              }}>
            {renderGridAreas(gridItem)}
          </div>
        } else {
          return <div
              class="g-grid-generator__editor__field__area"
              style={{
                border: '1px dashed #0008',
                backgroundColor: gridItem.bgColor,
                gridArea: getGridAreaCss(gridItem)
              }}>
            {gridItem.name}
          </div>
        }
      }

      function renderGridAreas(targetGrid) {
        return (targetGrid.subAreas || []).map((gridItem, index) =>
            gridItem.hide
                ? null
                : state.viewMode
                ? renderGridAreaInViewMode(gridItem, index)
                : renderGridAreaInEditMode(gridItem, index)
        )
      }

      function renderHoveringArea() {
        return state.hovering ? <div style={{
          border: '3px dashed #000',
          'grid-area': getGridAreaCss({ area: state.hoveringArea })
        }}></div> : null
      }

      const newItemNameInputRefStr = 'newItemNameInput'
      function renderConfirmDialog(grid) {
        return <g-dialog vModel={state.showConfirmDialog} width="500px" persistent>
          <div class="g-grid-generator__dialog__confirm">
            <h5>Create new grid item</h5>
            <div>
              Are you sure you want to create new grid item?<br/>
              If Yes, please set name for the grid item and click to either 'Single' or 'Sub Grid' button?<br/>
              <b>Single</b> create an atom item which can't be divided into smaller items<br/>
              <b>Sub-grid</b> create a sub grid item which can be divided into smaller items.
            </div>
            <div>Item name:&nbsp;
              <input class="g-grid-generator__dialog__confirm__item-name"
                     type="text"
                     ref={newItemNameInputRefStr}
                     vModel={selectingArea.name}/>
            </div>
            <div class="g-grid-generator__dialog__confirm__error-message">
              (*) Item name can contain only a-z, A-Z, -, _ characters
            </div>
            <div class="g-grid-generator__dialog__confirm__action-btn">
              <button type='button'
                      vOn:click={() => {
                        if (isGridAreaNameValid(selectingArea.name)) {
                          addSubGridArea(state.grids, grid, selectingArea)
                          state.showConfirmDialog = false
                          selectingArea = createEmptyArea()
                        }
                      }}>Sub Grid
              </button>
              &nbsp;
              <button type='button'
                      vOn:click={() => {
                        if (isGridAreaNameValid(selectingArea.name)) {
                          addSubItemArea(state.grids, grid, selectingArea)
                          state.showConfirmDialog = false
                          selectingArea = createEmptyArea()
                        }
                      }}>Single item
              </button>
              &nbsp;
              <button type='button'
                      vOn:click={() => {
                        state.showConfirmDialog = false
                        selectingArea = createEmptyArea()
                      }}>Cancel
              </button>
            </div>
          </div>
        </g-dialog>
      }

      // 3) Settings
      // a helper method adjust row, col number
      function adjustRowColNumbers(targetArr, newLen) {
        const oldLen = targetArr.length
        if (oldLen < newLen) {
          const newCols = createRange(newLen - oldLen, () => ref('1fr'))
          targetArr.push.apply(targetArr, newCols)
        } else if (oldLen > newLen) {
          targetArr.splice(newLen, oldLen - newLen)
        }
      }

      function renderGridSettings(grid) {
        return [
          <div class="g-grid-generator__editor__settings-prop">
            <label>Field width(px): </label>
            <g-inc-dec-number-input min={600} value={state.fieldWidth} vOn:input={v => state.fieldWidth = v}/>
          </div>,
          <div class="g-grid-generator__editor__settings-prop">
            <label>Field height(px): </label>
            <g-inc-dec-number-input min={400} value={state.fieldHeight} vOn:input={v => state.fieldHeight = v}/>
          </div>,
          <div class="g-grid-generator__editor__settings-prop">
            <label>Columns: </label>
            <g-inc-dec-number-input min={1} value={grid.settings.columns.length} vOn:input={v => adjustRowColNumbers(grid.settings.columns, v)}/>
          </div>,
          <div class="g-grid-generator__editor__settings-prop">
            <label>Rows: </label>
            <g-inc-dec-number-input min={1} value={grid.settings.rows.length} vOn:input={v => adjustRowColNumbers(grid.settings.rows, v)}
            />
          </div>,
          <div class="g-grid-generator__editor__settings-prop">
            <label>Column Gap(px): </label>
            <g-inc-dec-number-input min={0} value={grid.settings.columnGap} vOn:input={v => grid.settings.columnGap = v}/>
          </div>,
          <div class="g-grid-generator__editor__settings-prop">
            <label>Row Gap(px): </label>
            <g-inc-dec-number-input min={0} value={grid.settings.rowGap} vOn:input={v => grid.settings.rowGap = v}/>
          </div>,
          <div class="g-grid-generator__editor__settings-prop">
            <label>View mode: </label>
            <input type="checkbox" value={state.viewMode} vOn:change={() => state.viewMode = !state.viewMode}>Overview</input>
          </div>
        ]
      }

      // 4) Generate output
      function renderGenerateStyleBtn() {
        return <button
            type='button'
            vOn:click_stop_prevent={() => {
              state.showOutputDialog = true
              state.generatedCss = generateGridCSS(state.grids[0], props.uid)
              context.emit('cssgenerated', state.generatedCss)
            }}>Generate Css</button>
      }

      function renderExportLayoutBtn() {
        return <button
            type="button"
            vOn:click_stop_prevent={() => {
              context.emit('exportlayout', state.grids[0])
            }}>Export layout</button>
      }

      function renderOutputDialog() {
        return <g-dialog vModel={state.showOutputDialog} width="500px" persistent>
          <div class="g-grid-generator__dialog__output">
            <textarea>{state.generatedCss}</textarea>
            <button type="button" vOn:click_stop_prevent={() => state.showOutputDialog = false}>Close</button>
          </div>
        </g-dialog>
      }

      // 0) Entire render
      function renderGridGenerator() {
        return (
            <div class="g-grid-generator" ref="el">
              <div>
                {renderGridList()}
                {renderAreaList()}
              </div>

              <div class="g-grid-generator__editor">
                {_.map(state.grids, grid =>
                    grid.settings && grid.name === state.selectedGrid
                        ? [
                          <div style={{
                            display: 'inline-block',
                            position: 'relative',
                            width: `${state.fieldWidth}px`,
                            height: `${state.fieldHeight}px`
                          }}>
                            {renderGridColumnWidthSetting(grid)}
                            {renderGridRowHeightSetting(grid)}
                            {renderGridContainer(grid)}
                          </div>,
                          <div class="g-grid-generator__editor__settings">
                            {renderGridSettings(grid)}
                            {renderGenerateStyleBtn()}
                            {renderExportLayoutBtn()}
                          </div>,
                          renderConfirmDialog(grid)
                        ]
                        : undefined
                )}
              </div>

              {renderOutputDialog()}
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

    &__list {
      &__header {
        padding-top: 20px;
        color: #999;
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

      &>input {
        width: 80%;

        &:focus {
          border: 2px solid #000;
          outline: none;
        }
      }
    }

    &__row-unit {
      margin: auto;
      text-align: center;

      &>input {
        width: 80%;

        &:focus {
          border: 2px solid #000;
          outline: none;
        }
      }
    }

    &__editor {
      margin-left: 30px;
      display: flex;
      flex-direction: row;

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
          font-size: x-small;
          /* prevent overflow*/
          min-height: 3px;
          min-width: 3px;
          overflow: hidden;

          &__name {
            padding: 5px;
          }

          &__delete {
            position: absolute;
            right: 5px;
            width: 1.2em;
            height: 1.2em;
            text-align: center;
            vertical-align: middle;
          }
        }
      }

      &__settings {
        padding: 20px;

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
    }

    &__dialog {
      &__confirm {
        display: flex;
        flex-direction: column;
        height: 350px;
        border-radius: 10px;
        box-shadow: 0 2px 8px 4px #0003;
        background: #fff;
        padding: 20px;

        &__item-name {
          border: 1px solid #888;
          padding: 5px;
        }

        &__error-message {
          flex: 1;
          color: red;
          font-size: small;
        }

        &__action-btn {
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
