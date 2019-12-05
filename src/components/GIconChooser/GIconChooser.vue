<script>
  import _ from 'lodash'
  import { getIconSources } from './logic/Utils'
  import { reactive, computed } from '@vue/composition-api'
  import GIcon from '../GIcon/GIcon';
  import GPagination from './GIconPagination'
  import GIconSearch from './GIconSearch'
  import GBtn from '../GBtn/GBtn'
  import GDndDialog from '../GDndDialog/GDndDialog';
  import GTextField from '../GInput/GTextField'

  GPagination.components['GIcon'] = GIcon
  GIconSearch.components['GIcon'] = GIcon

  const viewStateEnum = {
    sourceList: 0,
    sourceDetail: 1,
    iconDetail: 2,
  }
  const rotateEnum = {
    _0: 0,
    _90: 90,
    _180: 180,
    _270: 270
  }

  export default {
    name: 'GIconChooser',
    components: { GTextField, GDndDialog, GPagination, GIcon, GIconSearch, GBtn },
    props: {
      label: String
    },
    setup(props, context) {
      const state = reactive({
        // dialog state
        showDialog: false,
        // dialog content
        currentView: null,
        selectedIconSource: null,
        selectedCategory: null,
        selectedIcon: null,
        iconSearchText: null,
        iconInCategorySearchText: null,
        flipHorizontal: false,
        rotate: 0,
        flipVertical: false,
        color: null,
        //
        value: ''
      })

      const iconSources = getIconSources()
      function initIconPickerDialogState() {
        state.currentView = viewStateEnum.sourceList
        state.selectedIconSource = iconSources[0]
        state.selectedCategory = []
        state.selectedIcon = null
        state.iconSearchText = ''
        state.iconInCategorySearchText = ''
        state.flipHorizontal = false
        state.flipVertical = false
        state.rotate = rotateEnum._0
        state.color = '#000'
      }

      initIconPickerDialogState()

      const cptAllIcons = computed(() => {
        let icons = []
        _.each(iconSources, iconSource => _.each(iconSource.categories, category => icons.push(...category.icons)))
        return _.uniqBy(icons, icon => icon.name)
      })
      const cptIcons = computed(() => {
        let icons = []
        if (state.selectedCategory == null) {
          _.each(state.selectedIconSource.categories, category => icons.push(...category.icons))
        } else {
          icons = state.selectedCategory.icons
        }
        return _.uniqBy(icons, icon => icon.name)
      })

      // source list view
      const iconSrcColors = [{
        color: 'rgb(27, 105, 168)',
        shadeColor: 'rgb(21, 84, 134)',
      }, {
        color: 'rgb(151, 42, 169)',
        shadeColor: 'rgb(119, 33, 133)',
      }, {
        color: 'rgb(8, 144, 103)',
        shadeColor: 'rgb(5, 90, 82)',
      }]
      function getIconSrcColor(index) {
        return iconSrcColors[index % iconSrcColors.length]
      }
      function renderIconSrc(iconSrc, id) {
        const color = getIconSrcColor(id)
        return (
            <span class='g-icon-source'
                  vOn:click={() => {
                    state.selectedIconSource = iconSrc
                    state.selectedCategory = null
                    state.selectedIcon = null
                    state.currentView = viewStateEnum.sourceDetail
                  }}>
              <div class="g-icon-source__icon-info">
                <div style={{ backgroundColor: color.color }}>
                  <g-icon small>{iconSrc.categories[0].icons[0].value}</g-icon>
                  <g-icon small>{iconSrc.categories[0].icons[1].value}</g-icon>
                  <g-icon small>{iconSrc.categories[0].icons[0].value}</g-icon>
                </div>
                <div style={{ backgroundColor: color.shadeColor }}>
                  <small>{iconSrc.totalIcons}</small>
                </div>
              </div>
              <div class="g-icon-source__name-author">
                <div style={{ color: color.color }}>{iconSrc.name}</div>
                <div>
                  <small style={{ color: '#999' }}> by {iconSrc.source.substr(0, 30)}...</small>
                </div>
              </div>
            </span>)
      }

      // source detail view
      const getCategoryClass = category => ({
        "category-name" : true,
        "category-name--selected": state.selectedCategory == category
      })
      const addRemoveCategory = cate => state.selectedCategory = (state.selectedCategory == cate) ? null : cate
      function renderCategoryName(category) {
        return (category.icons.length == 0 ? null :
            <span class={getCategoryClass(category)}
                  vOn:click={() => addRemoveCategory(category)}>
              {_.startCase(category.name)}
            </span>)
      }

      /*render icon*/
      const toggleIcon = icon => state.selectedIcon = (state.selectedIcon == icon) ? null : icon
      const getIconClass = (icon) => ({
        "icon": true,
        "icon--selected": icon == state.selectedIcon
      })
      function renderIconInGrid(icon) {
        return <span class={getIconClass(icon)} key={icon.value} vOn:click={() => toggleIcon(icon)}>
          <g-icon>{icon.value}</g-icon>
        </span>
      }
      function renderIconInList(icon) {
        return <div class="icon-wrapper" key={icon.value} vOn:click={() => toggleIcon(icon)}>
          {renderIconInGrid(icon)}
          <span class="icon-name">{icon.value}</span>
        </div>
      }

      // icon detail view
      const createIconModel = () => ({
        name: state.selectedIcon.name,
        value: state.selectedIcon.value,
        flipHorizontal: state.flipHorizontal,
        flipVertical: state.flipVertical,
        rotate: state.rotate,
        color: state.color
      })

      function renderIconDetailSimple() {
        return <div class="icon-detail">
          <div class="icon-detail__content">
            <div class="icon-detail__content__preview">
              <g-icon>{state.selectedIcon.value}</g-icon>
            </div>
            <div class="icon-detail__content__custom-panel">
              <span class="icon-detail__content__value">{state.selectedIcon.name}</span>
              <div class="icon-detail__action-btn">
                <g-btn outlined vOn:click={() => {
                  state.value = state.selectedIcon.value
                  context.emit('input', state.selectedIcon.value)
                  context.emit('value', createIconModel())
                  state.showDialog = false
                }}>Add
                </g-btn>
              </div>
            </div>
          </div>
        </div>
      }

      // render function
      function renderIconChooserDialogContent() {
        return (
            <div class="g-icon-chooser__dialog-content">
              <g-icon-search
                  icons={cptAllIcons.value}
                  renderItems={renderIconInGrid}
                  renderItemsList={renderIconInList}
                  value={state.iconSearchText}
                  placeHolder="Search all icons..."
                  vOn:input={v => {
                    if (state.iconSearchText != v) {
                      state.selectedIcon = null
                      state.iconSearchText = v
                    }
                  }}/>

              <div vShow={state.iconSearchText === '' && state.currentView === viewStateEnum.sourceList}
                   class="g-icon-source-list">
                {_.map(iconSources, renderIconSrc)}
              </div>

              <div vShow={state.iconSearchText === '' && state.currentView === viewStateEnum.sourceDetail}
                   class="g-icon-source-detail">

                <span class="g-icon-source-detail__back-btn"
                      vOn:click={() => {
                        state.currentView = viewStateEnum.sourceList
                        state.selectedIcon = null
                      }}>
                  <g-icon color="rgb(21, 105, 168)">navigate_before</g-icon>
                  Displaying collection: {state.selectedIconSource.name}
                </span>

                <div class="category-list">
                  {_.map(state.selectedIconSource.categories, renderCategoryName)}
                </div>

                <g-icon-search
                    icons={cptIcons.value}
                    renderItems={renderIconInGrid}
                    renderItemsList={renderIconInList}
                    value={state.iconInCategorySearchText}
                    placeHolder={`Search ${state.selectedIconSource.name}...`}
                    vOn:input={v => {
                      if (state.iconInCategorySearchText != v) {
                        state.iconInCategorySearchText = v
                        state.selectedIcon = null
                      }
                    }}
                />

                <g-pagination
                    vShow={state.iconInCategorySearchText === ''}
                    dataSrc={cptIcons.value}
                    itemsPerPage={30}
                    pageIndexesShowInView={7}
                    renderItems={renderIconInGrid}
                    renderItemsList={renderIconInList}/>
              </div>

              {state.selectedIcon && renderIconDetailSimple()}
            </div>
        )
      }
      return () => {
        return <div class="g-icon-chooser">
          <g-text-field
              label={props.label}
              placeholder="select icon"
              prependIcon="search"
              value={state.value}
              appendInnerIcon={state.value}
              vOn:click={() => {
                state.showDialog = true
                initIconPickerDialogState()
              }}/>
          <g-dnd-dialog
              value={state.showDialog} vOn:input={v => state.showDialog = v}
              scopedSlots={{ title: () => 'Icon Picker' }}
              minHeight={710} height={710}
              minWidth={630} width={630}
              lazy>
            {renderIconChooserDialogContent()}
          </g-dnd-dialog>
        </div>
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-icon-chooser {
    &__activator {
      height: 40px;
      display: inline-flex;
      border: 1px solid #0003;
      border-radius: 5px;
      padding-left: 5px;

      &:hover {
        cursor: pointer;
        border-color: #0006;
      }

      &__input {
        padding: 5px;
        border: none;
        outline: none;
        text-overflow: ellipsis;
        border-right: 1px solid #0003;
      }

      &__preview {
        padding: 0 5px;
        min-width: 30px;
        max-width: 30px;

        &:hover {
          background-color: #aaa;
        }
      }
    }
  }

  .g-icon-chooser__dialog-content {
    padding: 5px 5px;
    width: calc(100%);
  }

  /* source list view */
  .g-icon-source-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .g-icon-source {
    display: flex;
    flex-direction: row;
    margin: 5px;
    width: 300px;
    background-color: rgb(248, 248, 248);
    border: 1px solid #0003;

    &:hover {
      cursor: pointer;
      border: 1px solid #0006;
    }

    &__icon-info {
      width: 63px;

      & > div {
        height: 50%;
        padding: 3px;
        color: #fff;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > small {
          font-size: 10px;
        }
      }
    }

    &__name-author {
      flex: 1;
      text-align: right;
      padding: 5px;
    }

    &-detail {
      &__back-btn {
        display: inline-flex;

        &:hover {
          cursor: pointer;
        }
      }

    }
  }

  /* source detail view */
  .category-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    max-height: 150px;
    overflow-y: auto;
  }

  .category-name {
    $categoryNameColor: rgb(62, 62, 62);
    margin: 5px;
    padding: 5px 10px;
    border: 1px solid $categoryNameColor;
    color: $categoryNameColor;
    background-color: transparent;

    &:hover {
      cursor: pointer;
    }

    &--selected {
      background-color: $categoryNameColor;
      color: #fff;
    }
  }

  /* icon paging */
  $size: 40px;

  ::v-deep .icon {
    display: flex;
    justify-content: center;
    margin: 4px;
    padding: 3px;
    width: 42px;
    height: 42px;
    text-align: center;

    &:hover {
      cursor: pointer;
    }

    &--selected {
      background-color: rgb(62, 62, 62);
      color: #aaa;
    }
  }

  ::v-deep .icon-wrapper {
    display: flex;
    width: 100%;
    text-align: left;
    align-items: center;

    & > .icon-name {
      flex: 1;
    }

    &:hover {
      cursor: pointer;
    }
  }

  /*icon detail*/
  .icon-detail {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    border: 1px dashed #aaa;
    border-radius: 5px;

    & button {
      margin: 3px;
    }

    &__content {
      display: flex;
      flex-direction: row;
      padding: 5px;

      &__preview {
        width: 80px;
        height: 80px;
        border: 1px dashed #888;
        border-radius: 5px;
        background-color: #eee;
        text-align: center;
        margin-right: 5px;
        display: flex;
        justify-content: center;
      }

      &__value {
        width: 100%;
        border: 1px dashed #888;
        border-radius: 5px;
        background-color: #eee;
        padding: 5px;
      }

      &__shape-setting {
        display: flex;
        flex-direction: row;

        & > div {
          margin-right: 5px;
          margin-bottom: 5px;
        }
      }

      .setting-prop--active {
        color: #fff;
        background-color: rgb(62, 62, 62);
      }

      &__custom-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }

    &__action-btn {
      display: flex;
      flex-direction: row-reverse;
      padding: 5px;
    }
  }
</style>
