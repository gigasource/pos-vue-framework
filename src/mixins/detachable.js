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
      for (let childNode of context.refs.activator.childNodes){
        nodes.push(childNode)
      }
      context.refs.el.removeChild(context.refs.activator);
    } else {
      nodes = [node]
    }

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