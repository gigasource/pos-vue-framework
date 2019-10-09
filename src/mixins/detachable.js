import { onMounted } from '@vue/composition-api';

export default function detachable(props, context) {

  function attachToRoot(node) {
    if (!node) {
      node = context.refs.content
    }
    const target = document.querySelector('[data-app]')
    if (!target) {
      console.warn('Unable to locate root element');
      return;
    }

    target.insertBefore(node, target.firstChild)
  }

  function attachToParent(node) {
    let nodes = [];

    if(!node) {
      nodes = [...context.refs.activator.childNodes];

      // If element contain activator, remove the activator div
      if(context.refs.activator.parentNode === context.refs.el) context.refs.el.removeChild(context.refs.activator);
    } else {
      nodes = [node]
    }

    // Attach nodes to element's parent
    for (let childNode of nodes) {
      if (!context.refs.el.parentNode) return;

      const target = context.refs.el === context.refs.el.parentNode.firstChild ? context.refs.el : context.refs.el.nextSibling;
      context.refs.el.parentNode.insertBefore(childNode, target);
    }
  }

  return {
    attachToRoot,
    attachToParent,
  }
}