import { onMounted } from '@vue/composition-api';

export default function detachable(props, context) {
  onMounted(() => {
    attachToRoot()
  })

  function attachToRoot() {
    const content = context.refs.content
    if (!content) return

    const target = document.querySelector('[data-app]')
    if (!target) {
      console.warn('Unable to locate root element');
      return;
    }

    target.insertBefore(content, target.firstChild)
  }
}