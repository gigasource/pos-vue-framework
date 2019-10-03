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
    let nodes;

    if(!node) {
      nodes = context.refs.activator.childNodes;
    } else {
      nodes = [node]
    }

    while (nodes.length > 0) {
      const childNode = nodes[0];
      if (!context.refs.el.parentNode) return;

      const target = context.refs.el === context.refs.el.parentNode.firstChild ? context.refs.el : context.refs.el.nextSibling;
      //const target = context.refs.el;
      context.refs.el.parentNode.insertBefore(childNode, target);
    }
  }

  return {
    attachToRoot,
    attachToParent,
  }
}