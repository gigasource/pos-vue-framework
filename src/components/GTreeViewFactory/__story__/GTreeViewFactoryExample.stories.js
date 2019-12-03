import { withKnobs } from '@storybook/addon-knobs';
import GTreeViewExample from '../GTreeViewExample';
import { ref } from '@vue/composition-api';

//
export default {
  title: 'GTreeViewFactoryExample',
  decorators: [withKnobs],
}

export const playground = () => ({
  components: { GTreeViewExample },
  setup() {
    const data = ref({
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
    })

    const createData = () => {
      return {
        content: 'src ' + Math.random(),
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
    }

    return () => (
        <div>
          <button vOn:click={() => data.value = createData()}>Change data</button>
          <g-tree-view-example
              item-text={node => node.content}
              item-children='children'
              expand-level={0}
              data={data}/>
        </div>
    )
  }
})
