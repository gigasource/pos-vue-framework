import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GTreeViewJson from '../GTreeViewJson';
//
export default {
  title: 'GJsonPretty',
  decorators: [withKnobs],
}

/*export const playground = () => ({
  components: { GJsonPretty },
  setup() {
    const jsonData = {"status":200,"error":"","data":[{"news_id":51184,"title":"iPhone X Review: Innovative future with real black technology","source":"Netease phone"},{"news_id":51183,"title":"Traffic paradise: How to design streets for people and unmanned vehicles in the future?","source":"Netease smart"},{"news_id":51182,"title":"Teslamask's American Business Relations: The government does not pay billions to build factories","source":"AI Finance","members":["Daniel","Mike","John"]}]}
    const expandLevel = 0

    return () => (
        <g-json-pretty
            json-data={jsonData}
            expand-level={expandLevel}
            item-children-path='data'
            prop-icon=''
            method-icon=''
        ></g-json-pretty>
    )
  }
})*/

export const playground2 = () => ({
  components: { GTreeViewJson },
  setup() {
    //const jsonData = { a: { c: 2, d: 3 }, b: 1 }
    //const jsonData = [1, 2]
    //const jsonData = { a: [1, 2], b: 1 }
    // const jsonData = { a: [{ c: 2}, { c: 3}, 5], b: 1 }

    const jsonData = {
      a: 1,
      b: [2, 3],
      c: {
        d: 4,
        e: 5
      }
    }

    const expandLevel = 3

    return () => (
        <g-tree-view-json
            data={jsonData}
            expand-level={expandLevel}
            item-children-path='data'
            prop-icon=''
            method-icon=''
        ></g-tree-view-json>
    )
  }
})
