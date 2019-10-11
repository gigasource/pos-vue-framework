import { onMounted } from '@vue/composition-api';

export default function detachable(props, context) {
  // const activatorChildNodes = [...context.refs.activator.childNodes];

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
    let attachNodes = [];

    if(!node) {
      attachNodes = [...context.refs.activator.childNodes];

      // If element contain activator, remove the activator div
      if(context.refs.activator.parentNode === context.refs.el) context.refs.el.removeChild(context.refs.activator);
    } else {
      attachNodes = [node];
    }

    // Attach nodes to element's parent
    for (let node of attachNodes) {
      if (!context.refs.el.parentNode) return;

      const target = context.refs.el === context.refs.el.parentNode.firstChild ? context.refs.el : context.refs.el.nextSibling;
      context.refs.el.parentNode.insertBefore(node, target);
    }
  }

  function detach(node) {
    if (node) {
      node.parentNode.removeChild(node);
    } else {
      context.refs.content.parentNode.removeChild(context.refs.content);
      for (let node of activatorChildNodes)
        node.parentNode.removeChild(node);
    }
  }

  return {
    attachToRoot,
    attachToParent,
    detach,
  }
}