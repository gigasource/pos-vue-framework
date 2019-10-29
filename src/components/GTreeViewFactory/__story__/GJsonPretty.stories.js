import { text, withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GTreeViewJson from '../GTreeViewJson';
//
export default {
  title: 'GJsonPretty',
  decorators: [withKnobs],
}

export const playground = () => ({
  components: { GTreeViewJson },
  props: {
    expandLevel: {
      type: Number,
      default: number('expandLevel', 3, { min: 0, max: 999999})
    }
  },
  setup(props) {
    const jsonData = {
      a: 5,
      b: {
        c: 1,
        d: 1
      }

      // name: "TreeViewJson",
      // props: ["data", "expandLevel", "itemText"],
      // propsDescription: [
      //   {
      //     type: "Object | Array | any",
      //     propName: 'data',
      //     // defaultValue: null,
      //   }, {
      //     propName: 'expandLevel',
      //     type: "Number",
      //     // defaultValue: 0,
      //   }, {
      //     propName: 'itemText',
      //     type: "[String, Function]",
      //     // defaultValue: null,
      //   }
      // ],
    }

    return () => (
        <g-tree-view-json data={jsonData} expand-level={props.expandLevel}></g-tree-view-json>
    )
  }
})
