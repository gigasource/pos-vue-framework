<script>
  import _ from 'lodash'
  import { getIconSources } from './logic/Utils'
  import { reactive, computed } from '@vue/composition-api'
  import GIcon from '../GIcon/GIcon';
  import Paging from './Paging';

  export default {
    name: 'GIconChooser',
    components: { Paging, GIcon },
    props: {},
    setup() {
      const iconSources = getIconSources()
      const state = reactive({
        selectedIconSource: iconSources[0],
        selectedCategories: []
      })

      const cptIcons = computed(() => {
        let icons = []
        // if no category selected, return all icons
        if (state.selectedCategories.length == 0) {
          _.each(state.selectedIconSource.categories, category => icons.push(...category.icons))
        } else {
          _.each(state.selectedCategories, category => icons.push(...category.icons))
        }
        return icons
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

      function renderIconSrc(iconSrc) {
        return <span class={getIconSrcTabClass(iconSrc)} vOn:click={() => selectSource(iconSrc)}>
          <div>{iconSrc.name}</div>
          <div>
            <small>{iconSrc.source.substr(0, 30)}...</small>
          </div>
        </span>
      }

      // category names
      function addRemoveCategory(category) {
        const idOfNewCate = state.selectedCategories.indexOf(category)
        if (idOfNewCate >= 0) {
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

      function renderCategoryName(category) {
        return <span class={getCategoryNameClass(category)}
                     vOn:click={() => addRemoveCategory(category)}>
          {category.name}
        </span>
      }

      // category icons
      // -> render icon
      function renderIcon(icon) {
        return <span class="icon" key={icon.value}>
                <g-icon large>{icon.value}</g-icon>
                <div class="icon-name">{icon.name}</div>
               </span>
      }

      // render function
      return () => {
        return (
            <div class="g-icon-chooser">
              <div class="icon-src-tabs">{_.map(iconSources, renderIconSrc)}</div>
              <div class="icon-src-tab-content">
                <div class="category-names">{_.map(state.selectedIconSource.categories, renderCategoryName)} </div>
                <div class="category-icons">
                  <paging
                      dataSrc={cptIcons.value}
                      itemsPerPage={30}
                      pageIndexesShowInView={7}
                      renderItems={renderIcon}>
                  </paging>
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
    border: 1px solid #888;
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

  .icons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  $size: 80px;

  >>> .icon {
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

  >>> .icon-name {
    white-space: nowrap;
    overflow: hidden;
    font-size: x-small;
    text-overflow: ellipsis;
  }
</style>
