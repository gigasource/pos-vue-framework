// requires template refs: activator, content, el

export default function detachable(props, context) {
  let activatorChildNodes;

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
    activatorChildNodes = [...context.refs.activator.childNodes]
    let attachNodes = [];

    if (!node) {
      attachNodes = activatorChildNodes;

      // If element contain activator, remove the activator div
      if (context.refs.activator.parentNode === context.refs.el) {
        context.refs.el.removeChild(context.refs.activator);
      }
    } else {
      attachNodes = [node];
    }

    // Attach nodes to element's parent
    for (let node of attachNodes) {
      if (!context.refs.el.parentNode) {
        return;
      }

      const target = context.refs.el === context.refs.el.parentNode.firstChild ? context.refs.el : context.refs.el.nextSibling;
      context.refs.el.parentNode.insertBefore(node, target);
    }
  }

  function detach(node) {
    if (node) {
      node.parentNode.removeChild(node);
    } else {
      context.refs.content.parentNode.removeChild(context.refs.content);
      if (activatorChildNodes) {
        for (let node of activatorChildNodes)
          node.parentNode.removeChild(node);
      } else {
        context.refs.activator.parentNode.removeChild(context.refs.activator);
      }
    }
  }

  return {
    attachToRoot,
    attachToParent,
    detach,
  }
}