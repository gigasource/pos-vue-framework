// requires template refs: activator, content, el
import { toRefs } from 'vue';
import {isSSR, ssrWarn} from '../utils/ssr';

export default function detachable(props, context, refs) {
  const { activator, content, el } = refs
  function attachToRoot(node = content && content.value) {
    if (isSSR) {
      ssrWarn('detachable.attachToRoot')
      return
    }

    const target = document.querySelector('[data-app]') || document.body
    if (!target) {
      console.warn('Unable to locate root element');
      return;
    }

    target.insertBefore(node, target.firstChild)
    return target
  }

  function attachToParent(node) {
    let attachNodes = [];

    if (!node && activator && activator.value) {
      attachNodes = [...activator.value.childNodes]

      // If element contain activator, remove the activator div
      if (activator.value.parentNode === el.value) {
        el.value.removeChild(activator.value);
      }
    } else {
      attachNodes = [node];
    }

    // Attach nodes to element's parent
    for (let node of attachNodes) {
      if (!el.value || !el.value.parentNode) {
        return;
      }

      const target = el.value === el.value.parentNode.firstChild ? el.value : el.value.nextSibling;
      el.value.parentNode.insertBefore(node, target);
    }
  }

  function detach(node, activatorNode = activator && activator.value) {
    if (node) {
      node.parentNode && node.parentNode.removeChild(node);
    } else {
      content.value && content.value.parentNode && content.value.parentNode.removeChild(content.value);
      activatorNode && activatorNode.parentNode.removeChild(activator.value);
    }
  }

  return {
    attachToRoot,
    attachToParent,
    detach,
  }
}
