<script>
  import _ from 'lodash'
  import { getIconSources } from './logic/Utils'
  import { reactive } from '@vue/composition-api'
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GIconChooser',
    components: { GIcon },
    props: {},
    setup(props, context) {
      const iconSources = getIconSources()

      console.log(iconSources)

      const state = reactive({
        selectedIconSource: 0,
        selectedCategory: 0
      })

      return () => {
        let output = (
            <div class="g-icon-chooser">
              <div class="iconTabs">
                {
                  _.map(iconSources, (iconSource, id) =>
                      <span class="iconSource" vOn:click={() => {
                        state.selectedIconSource = id
                        state.selectedCategory = 0
                      }}>
                        <div>{iconSource.name}</div>
                        <div>{iconSource.source}</div>
                      </span>
                  )
                }
              </div>
              <div class="iconTabsContent">
                <div class="category-names">
                  {
                    _.map(iconSources[state.selectedIconSource].categories, (cate, id) =>
                        <span class='category-name' vOn:click={ () => state.selectedCategory = id }>
                          {cate.name}
                        </span>
                    )
                  }
                </div>
                {
                  _.map(iconSources[state.selectedIconSource].categories, (category, id) => id === state.selectedCategory ?
                    <div class="icons">
                      {
                        _.map(_.take(category.icons, 30), icon => <span class="icon" key={icon.value}>
                          <g-icon large>{icon.value}</g-icon>
                          <div class="icon-name">{icon.name}</div>
                        </span>)
                      }
                    </div> : null)
                }
              </div>
            </div>
        )

        return output
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-icon-chooser {
    width: 600px;
  }

  .iconTabs {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .iconSource {
    margin: 5px;
    width: 290px;
    padding: 10px;
    border: 1px solid black;
    transition: background-color 0.5s;

    &:hover {
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }

  .iconTabsContent {
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
