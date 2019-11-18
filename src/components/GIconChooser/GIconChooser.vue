<script>
  import _ from 'lodash'
  import { getIconSources } from './logic/Utils'
  import { reactive, computed } from '@vue/composition-api'
  import GIcon from '../GIcon/GIcon';
  import paging from './logic/pagingUtil';

  const pagingOptions = { itemsPerPage: 30, pageEntriesShowInView: 7 }

  export default {
    name: 'GIconChooser',
    components: { GIcon },
    props: {},
    setup(props, context) {
      const iconSources = getIconSources()
      const state = reactive({
        selectedIconSource: iconSources[0],
        selectedCategories: []
      })
      const cptPagingModel = computed(() => {
        let icons = []
        // if no category selected, return all icons
        if (state.selectedCategories.length == 0) {
          _.each(state.selectedIconSource.categories, category => icons.push(...category.icons))
        } else {
          _.each(state.selectedCategories, category => icons.push(...category.icons))
        }
        return paging(icons, pagingOptions)
      })

      // render source
      function selectSource(src) {
        state.selectedIconSource = src
        state.selectedCategories = []
      }

      function getIconSrcTabClass(src) {
        return {
          'icon-src-tabs__name': true,
          'icon-src-tabs__name--selected': src == state.selectedIconSource
        }
      }

      function renderIconSource() {
        return (
            <div class="icon-src-tabs">
              {
                _.map(iconSources, iconSrc =>
                    <span class={getIconSrcTabClass(iconSrc)} vOn:click={() => selectSource(iconSrc)}>
                      <div>{iconSrc.name}</div>
                      <div>
                        <small>{iconSrc.source.substr(0, 30)}...</small>
                      </div>
                    </span>
                )
              }
            </div>
        )
      }

      // category names
      function addRemoveCategory(category) {
        const idOfNewCate = state.selectedCategories.indexOf(category)
        if (idOfNewCate > 0) {
          state.selectedCategories.splice(idOfNewCate, 1)
        } else {
          state.selectedCategories.push(category)
        }
      }

      function getCategoryNameClass(category) {
        return {
          'category-name': true,
          'category-name--selected': (state.selectedCategories && state.selectedCategories.indexOf(category) >= 0)
        }
      }

      function renderCategoryName() {
        return <div class="category-names">
          {
            _.map(state.selectedIconSource.categories, category =>
                <span class={getCategoryNameClass(category)}
                      vOn:click={() => addRemoveCategory(category)}>
                  {category.name}
                </span>
            )
          }
        </div>
      }

      // category icons
      // -> render icon
      function renderIcon(icon) {
        return <span class="icon" key={icon.value}>
          <g-icon large>{icon.value}</g-icon>
          <div class="icon-name">{icon.name}</div>
        </span>
      }

      function renderCategoryIcons() {
        return <div class="icons">
          {
            _.map(_.filter(cptPagingModel.value.pages, page => page != null),
                page => page.selected
                    ? _.map(page.items, renderIcon)
                    : null
            )
          }
        </div>
      }

      // render page entries
      function renderPageEntries() {
        return <div class="page-entries">
          <button>|&lt;</button>
          <button>&lt;</button>
          {
            _.map(cptPagingModel.value.pages, page => page
                ? <button vOn:click={() => page.select()}>
                    {page.index}
                  </button>
                : '...'
            )
          }
          <button>&gt;</button>
          <button>&gt;|</button>
        </div>
      }

      // render function
      return () => {
        return (
            <div class="g-icon-chooser">
              {renderIconSource()}
              <div class="icon-src-tab-content">
                {renderCategoryName()}
                <div class="category-icons">
                  {renderCategoryIcons()}
                  {renderPageEntries()}
                </div>
              </div>
            </div>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-icon-chooser {
    width: 600px;
  }

  .icon-src-tabs {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    &__name {
      margin: 5px;
      width: 290px;
      padding: 10px;
      border: 1px solid #333;
      transition: background-color 0.5s;

      &:hover {
        background-color: #333;
        color: #aaa;
        cursor: pointer;
      }

      &--selected {
        background-color: #333;
        color: #aaa;
      }
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
    border: 1px solid black;
    margin: 5px;
    padding: 5px;

    &--selected {
      background-color: #333;
      color: #aaa;
    }

    &:hover {
      cursor: pointer;
      background-color: black;
      color: whitesmoke;
    }
  }

  .icons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  $size: 80px;

  .icon {
    margin: 5px;
    padding: 5px;
    width: $size;
    min-width: $size;
    max-width: $size;
    text-align: center;
    box-shadow: 0 2px 4px 0 #0003;
    transition: box-shadow 0.5s;

    &:hover {
      box-shadow: 0 2px 8px 0 #0006;
      cursor: pointer;
    }
  }

  .icon-name {
    white-space: nowrap;
    overflow: hidden;
    font-size: x-small;
    text-overflow: ellipsis;
  }
</style>
