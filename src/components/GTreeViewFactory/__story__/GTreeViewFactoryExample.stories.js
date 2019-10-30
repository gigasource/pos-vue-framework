import { text, withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GTreeViewExample from '../GTreeViewExample'

//
export default {
  title: 'GTreeViewFactoryExample',
  decorators: [withKnobs],
}

export const playground = () => ({
  components: { GTreeViewExample },
  setup() {
    const data = {
      content: 'src',
      children: [
        {
          content: 'assets',
          children: [
            {
              content: 'config',
              children: [{ content: 'advance_printer.svg' }]
            },
            { content: 'delivery' }]
        }, { content: 'components' }]
    }
    return () => (
        <g-tree-view-example
            item-text={node => node.content}
            item-children='children'
            expand-level={0}
            data={data}>
        </g-tree-view-example>
    )
  }
})
