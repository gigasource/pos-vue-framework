<script>
  import _ from 'lodash'
  import { getIconSources } from './logic/Utils'
  import { reactive, computed } from '@vue/composition-api'
  import GIcon from '../GIcon/GIcon';
  import GPagination from '../GPagination/GPagination'
  import GIconSearch from './GIconSearch'
  import GBtn from '../GBtn/GBtn'

  GPagination.components['GIcon'] = GIcon
  GIconSearch.components['GIcon'] = GIcon

  const viewStateEnum = {
    sourceList: 0,
    sourceDetail: 1,
    iconDetail: 2,
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
        selectedCategories: [],
        selectedIcon: null,
        iconSearchText: '',
        iconInCategorySearchText: ''
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
        if (state.selectedCategories.length == 0) {
          _.each(state.selectedIconSource.categories, category => icons.push(...category.icons))
        } else {
          _.each(state.selectedCategories, category => icons.push(...category.icons))
        }
        return _.uniqBy(icons, icon => icon.name)
      })

      function selectSource(src) {
        state.selectedIconSource = src
        state.selectedCategories = []
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
        const idOfNewCate = state.selectedCategories.indexOf(category)
        if (idOfNewCate >= 0) {
          state.selectedCategories.splice(idOfNewCate, 1)
        } else {
          state.selectedCategories.push(category)
        }
        state.selectedIcon = null
      }

      function getCategoryNameClass(category) {
        return {
          'category-name': true,
          'category-name--selected': (state.selectedCategories && state.selectedCategories.indexOf(category) >= 0)
        }
      }

      function renderCategoryName(category) {
        return (category.icons.length == 0 ? null :
            <span class={getCategoryNameClass(category)}
                  vOn:click={() => addRemoveCategory(category)}>
              {category.name}
            </span>)
      }

      function renderIcon(icon) {
        return (
            <span class="icon" key={icon.value} vOn:click={() => state.selectedIcon = icon}>
              <g-icon large>{icon.value}</g-icon>
              <div class="icon-name">{icon.name}</div>
            </span>)
      }

      // icon detail view
      function renderIconDetail() {
        console.log(state.selectedIcon.value)
        return <div>
          <g-icon large>{state.selectedIcon.value}</g-icon>
          <div>
            <span>{state.selectedIcon.name}</span>
            <div>
              <span>Flip Icon</span>
              <div>
                <g-btn outlined>Horizontal</g-btn>
                <g-btn outlined>Vertical</g-btn>
              </div>
            </div>
            <div>
              <span>Rotate Icon</span>
              <div>
                <g-btn outlined>0</g-btn>
                <g-btn outlined>90</g-btn>
                <g-btn outlined>180</g-btn>
                <g-btn outlined>270</g-btn>
              </div>
            </div>
            <div>
              <span>Color</span>
              <input/>
            </div>
          </div>

          <div>
            <g-btn outlined>Add</g-btn>
            <g-btn outlined>Add and Close</g-btn>
            <g-btn outlined>Close</g-btn>
          </div>
        </div>
      }

      // render function
      return () => {
        return (
            <div class="g-icon-chooser">
              <g-icon-search
                  icons={cptAllIcons.value}
                  renderResultItem={renderIcon}
                  value={state.iconSearchText}
                  vOn:input={v => state.iconSearchText = v}
              />

              <div vShow={state.iconSearchText === '' && state.currentView === viewStateEnum.sourceList}
                   class="g-icon-source-list">
                {_.map(iconSources, renderIconSrc)}
              </div>

              <div vShow={state.iconSearchText === '' && state.currentView === viewStateEnum.sourceDetail}
                   class="g-icon-source-detail">

                <button vOn:click={() => state.currentView = viewStateEnum.sourceList}>
                  &lt; {state.selectedIconSource.name}
                </button>

                <div class="category-names">
                  {_.map(state.selectedIconSource.categories, renderCategoryName)}
                </div>

                <g-icon-search
                  icons={cptIcons.value}
                  renderResultItem={renderIcon}
                  value={state.iconInCategorySearchText}
                  vOn:input={v => state.iconInCategorySearchText = v}/>

                  <g-pagination
                    vShow={state.iconInCategorySearchText === ''}
                    class="category-icons"
                    dataSrc={cptIcons.value}
                    itemsPerPage={30}
                    pageIndexesShowInView={7}
                    renderItems={renderIcon}/>
              </div>

              { state.selectedIcon != null && renderIconDetail() }
            </div>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-icon-chooser {
    width: 600px;
    background-color: rgb(242, 242, 242);
  }

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
    width: 290px;
    padding: 10px;
    background-color: rgb(248, 248, 248);
    border: 1px solid transparent;
    transition: background-color 0.5s;

    &:hover {
      cursor: pointer;
      border: 1px solid #0003;
    }

    &__icon-info {
      width: 46px;

      & > div {
        padding: 3px;
        color: #fff;
        line-height: 1;
      }
    }

    &__name-author {
      flex: 1;
      text-align: right;
    }
  }

  .icon-src-tab-content {
    width: 100%;
  }

  .category-names {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    max-height: 200px;
    overflow-y: auto;
  }

  .category-name {
    border: 1px solid #333;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;

    &--selected {
      background-color: #333;
      color: #aaa;
    }

    &:hover {
      cursor: pointer;
      background-color: #555;
      color: #ccc;
    }
  }

  $size: 80px;

  ::v-deep .icon {
    display: inline-block;
    margin: 5px;
    padding: 5px;
    width: $size;
    min-width: $size;
    max-width: $size;
    text-align: center;
    border: 1px solid #aaa;
    transition: background-color 0.25s;

    &:hover {
      background-color: #ccc;
      cursor: pointer;
    }
  }

  ::v-deep .icon-name {
    white-space: nowrap;
    overflow: hidden;
    font-size: x-small;
    text-overflow: ellipsis;
  }
</style>
