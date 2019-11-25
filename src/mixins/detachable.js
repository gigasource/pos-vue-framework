// requires template refs: activator, content, el

export default function detachable(props, context) {
  let activatorChildNodes;

  function attachToRoot(node) {
    if (!node) {
      node = context.refs.content
    }
    const target = document.querySelector('[data-app]') || document.body
    if (!target) {
      console.warn('Unable to locate root element');
      return;
    }

    target.insertBefore(node, target.firstChild)
  }

  function attachToParent(node) {
    let attachNodes = [];

    if (!node && context.refs.activator) {
      attachNodes = [...context.refs.activator.childNodes]

      // If element contain activator, remove the activator div
      if (context.refs.activator.parentNode === context.refs.el) {
        context.refs.el.removeChild(context.refs.activator);
      }
    } else {
      attachNodes = [node];
    }

    // Attach nodes to element's parent
    for (let node of attachNodes) {
      if (!context.refs.el || !context.refs.el.parentNode) {
        return;
      }

      const target = context.refs.el === context.refs.el.parentNode.firstChild ? context.refs.el : context.refs.el.nextSibling;
      context.refs.el.parentNode.insertBefore(node, target);
    }
  }

  function detach(node, activator = context.refs.activator) {
    if (node) {
      node.parentNode.removeChild(node);
    } else {
      context.refs.content.parentNode.removeChild(context.refs.content);
      if (activatorChildNodes) {
        for (let node of activatorChildNodes)
          node.parentNode.removeChild(node);
      } else {
        activator.parentNode.removeChild(context.refs.activator);
      }
    }
  }

  return {
    attachToRoot,
    attachToParent,
    detach,
  }
}