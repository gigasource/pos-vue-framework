<script>
  import _ from 'lodash'
  import { getIconSources } from './logic/Utils'
  import { reactive, computed } from '@vue/composition-api'
  import GIcon from '../GIcon/GIcon';
  import GPagination, { viewModeEnum as pagingViewModeEnum } from '../GPagination/GPagination'
  import GIconSearch from './GIconSearch'
  import GBtn from '../GBtn/GBtn'

  GPagination.components['GIcon'] = GIcon
  GIconSearch.components['GIcon'] = GIcon

  const viewStateEnum = {
    sourceList: 0,
    sourceDetail: 1,
    iconDetail: 2,
  }

  const rotateEnum = {
    _0: 0,
    _90: 1,
    _180: 2,
    _270: 3
  }

  export default {
    name: 'GIconChooser',
    components: { GPagination, GIcon, GIconSearch, GBtn },
    props: {},
    setup() {
      const iconSources = getIconSources()
      const state = reactive({
        currentView: viewStateEnum.sourceList,
        selectedIconSource: iconSources[0],
        pagingViewMode: pagingViewModeEnum.grid,
        selectedCategory: [],
        selectedIcon: null,
        iconSearchText: '',
        iconInCategorySearchText: '',
        // icon-detail-setting
        flipHozirontal: false,
        flipVertical: false,
        rotate: rotateEnum._0
      })
      const cptAllIcons = computed(() => {
        let icons = []
        _.each(iconSources, iconSource => {
          _.each(iconSource.categories, category => {
            icons.push(...category.icons)
          })
        })
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

      function selectSource(src) {
        state.selectedIconSource = src
        state.selectedCategory = null
        state.selectedIcon = null
        state.currentView = viewStateEnum.sourceDetail
      }

      // source list view
      function renderIconSrc(iconSrc) {
        return (
            <span class='g-icon-source' vOn:click={() => selectSource(iconSrc)}>
              <div class="g-icon-source__icon-info">
                <div style={{ backgroundColor: iconSrc.color }}>
                  <g-icon small>{iconSrc.categories[0].icons[0].value}</g-icon>
                  <g-icon small>{iconSrc.categories[0].icons[1].value}</g-icon>
                  <g-icon small>{iconSrc.categories[0].icons[0].value}</g-icon>
                </div>
                <div style={{ backgroundColor: iconSrc.shadeColor }}>
                  <small>{iconSrc.totalIcons}</small>
                </div>
              </div>
              <div class="g-icon-source__name-author">
                <div style={{ color: iconSrc.color }}>{iconSrc.name}</div>
                <div>
                  <small style={{ color: '#999' }}> by {iconSrc.source.substr(0, 30)}...</small>
                </div>
              </div>
            </span>)
      }

      // source detail view
      function addRemoveCategory(category) {
        state.selectedIcon = null
        if (state.selectedCategory == category) {
          state.selectedCategory = null
        } else {
          state.selectedCategory = category
        }
      }

      const categoryColorSet = ['rgb(151, 42, 169)', 'rgb(8, 114, 103)', 'rgb(147, 89, 18)', 'rgb(81, 104, 116)', 'rgb(52, 115, 55)', 'rgb(62, 79, 173)',
        'rgb(115, 82, 70)', 'rgb(102, 58, 179)', 'rgb(195, 33, 68)', 'rgb(9, 113, 126)', 'rgb(81, 112, 46)', 'rgb(11, 108, 154)']

      function pickColor(category, index) {
        if (state.selectedCategory == category) {
          return categoryColorSet[index % categoryColorSet.length]
        } else {
          return 'rgb(175, 175, 175)'
        }
      }

      function renderCategoryName(category, index) {
        return (category.icons.length == 0 ? null :
            <span class="category-name" style={{ backgroundColor: pickColor(category, index) }}
                  vOn:click={() => addRemoveCategory(category)}>
              {_.startCase(category.name)}
            </span>)
      }

      /*render icon*/
      function toggleIcon(icon) {
        if (state.selectedIcon == icon)
          state.selectedIcon = null
        else
          state.selectedIcon = icon
      }
      function renderIcon(icon) {
        return (
            state.pagingViewMode == pagingViewModeEnum.grid
                ? <span class="icon" key={icon.value} vOn:click={() => toggleIcon(icon)}>
                    <g-icon>{icon.value}</g-icon>
                  </span>
                : <div class="icon-wrapper" key={icon.value} vOn:click={() => toggleIcon(icon)}>
                    <span class="icon">
                      <g-icon>{icon.value}</g-icon>
                    </span>
                    <span class="icon-name">{icon.value}</span>
                  </div>
        )
      }

      // icon detail view
      function renderIconDetail() {
        return <div class="icon-detail">
         <div class="icon-detail__content">
           <div class="icon-detail__content__preview">
             <g-icon large>{state.selectedIcon.value}</g-icon>
           </div>

           <div class="icon-detail__content__custom-panel">
             <span class="icon-detail__content__value">{state.selectedIcon.name}</span>
             <div class="icon-detail__content__shape-setting">
               <div>
                 <span>Flip Icon</span>
                 <div>
                   <g-btn outlined class={{ 'setting-prop--active': state.flipHozirontal }} vOn:click={ () => state.flipHozirontal = !state.flipHozirontal }>Horizontal</g-btn>
                   <g-btn outlined class={{ 'setting-prop--active': state.flipVertical }} vOn:click={ () => state.flipVertical = !state.flipVertical }>Vertical</g-btn>
                 </div>
               </div>
               <div>
                 <span>Rotate Icon</span>
                 <div>
                   <g-btn outlined class={{ 'setting-prop--active': state.rotate === rotateEnum._0 }} vOn:click={ () => state.rotate = rotateEnum._0 }>0</g-btn>
                   <g-btn outlined class={{ 'setting-prop--active': state.rotate === rotateEnum._90 }} vOn:click={() => state.rotate = rotateEnum._90}>90</g-btn>
                   <g-btn outlined class={{ 'setting-prop--active': state.rotate === rotateEnum._180 }} vOn:click={() => state.rotate = rotateEnum._180}>180</g-btn>
                   <g-btn outlined class={{ 'setting-prop--active': state.rotate === rotateEnum._270 }} vOn:click={() => state.rotate = rotateEnum._270}>270</g-btn>
                 </div>
               </div>
             </div>
             <div>
               <span>Color</span>
               <input/>
             </div>
           </div>
         </div>
          <div class="icon-detail__action-btn">
            <g-btn outlined>Close</g-btn>
            <g-btn outlined>Add and Close</g-btn>
            <g-btn outlined>Add</g-btn>
          </div>
        </div>
      }

      const cptShowIconDetail = computed(() => {
        return state.selectedIcon != null
      })

      // render function
      return () => {
        return (
            <div class="g-icon-chooser">
              <g-icon-search
                  class="g-icon-chooser__search-box"
                  icons={cptAllIcons.value}
                  renderResultItem={renderIcon}
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
                    class="g-icon-chooser__search-box"
                    icons={cptIcons.value}
                    renderResultItem={renderIcon}
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
                    class="category-icons"
                    dataSrc={cptIcons.value}
                    itemsPerPage={30}
                    pageIndexesShowInView={7}
                    renderItems={renderIcon}
                    vOn:viewmode={viewMode => state.pagingViewMode = viewMode}/>
              </div>

              {cptShowIconDetail.value && renderIconDetail()}
            </div>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-icon-chooser {
    min-height: 400px;
    padding: 15px 5px;
    width: 630px;
    background-color: rgb(230, 230, 230);

    &__search-box {
      margin: 10px 5px;
    }
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
        padding: 0 5px;

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
    max-height: 200px;
    overflow-y: auto;
  }

  .category-name {
    margin: 5px;
    padding: 5px 10px;
    color: #fff;

    &:hover {
      cursor: pointer;
    }
  }

  /* icon paging */
  $size: 40px;
  .category-icons {
    padding: 10px;
  }
  ::v-deep .icon {
    display: inline-block;
    margin: 4px;
    padding: 3px;
    width: 42px;
    height: 42px;
    text-align: center;
    transition: background-color 0.25s;

    &:hover {
      background-color: #ccc;
      cursor: pointer;
    }
  }
  ::v-deep .icon-wrapper {
    display: flex;
    width: 100%;
    text-align: left;

    &>.icon-name {
      flex: 1;
    }

    &:hover {
      background-color: #ccc;
      cursor: pointer;
    }
  }

  /*icon detail*/
  .icon-detail {
    display: flex;
    flex-direction: column;
    border: 1px dashed #aaa;
    border-radius: 5px;
    background-color: #fff;

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
        padding: 20px;
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

        &>div {
          margin-right: 5px;
          margin-bottom: 5px;
        }
      }

      .setting-prop--active {
        color: #fff;
        background-color: #0D47A1;
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
