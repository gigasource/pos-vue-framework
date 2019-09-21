import { onMounted, reactive } from '@vue/composition-api';

function detachable(props, context) {
  const detachableState = reactive({
    activatorNode: null
  })

  onMounted(() => {
    attachToRoot()
  })

  function attachToRoot() {
    const content = context.refs.content
    if (!content) return

    const target = document.querySelector('div.app')
    if (!target) console.warn('Unable to locate root element')

    target.insertBefore(content, target.firstChild)
  }

}