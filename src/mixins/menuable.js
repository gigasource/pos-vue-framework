import { computed, reactive } from 'vue';

// calculate top/left and activator/content dimensions
// requires template refs: activator, content
// todo: rename
export default function menuable(props, context) {
  let contentRef
  const menuableState = reactive({
    pageYOffset: 0,
    pageWidth: 0
  })

  const dimensions = reactive({
    activator: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      offsetTop: 0,
      scrollHeight: 0,
      offsetLeft: 0,
    },
    content: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      offsetTop: 0,
      scrollHeight: 0,
      offsetLeft: 0,
    }
  });

  const computedTop = computed(() => {
    const activatorDimensions = dimensions.activator;
    const contentDimensions = dimensions.content;
    let top = 0;

    if (props.absolute) return props.clientY
    if (props.top) top += activatorDimensions.height - contentDimensions.height
    if (props.offsetY) top += props.top ? -activatorDimensions.height : activatorDimensions.height
    if (props.nudgeTop) top -= parseInt(props.nudgeTop)
    if (props.nudgeBottom) top += parseInt(props.nudgeBottom)
    top += activatorDimensions.top + menuableState.pageYOffset;

    return top;
  });

  const computedLeft = computed(() => {
    const activatorDimensions = dimensions.activator;
    const contentDimensions = dimensions.content;

    const activatorLeft = activatorDimensions.left || 0
    const minWidth = Math.max(activatorDimensions.width, contentDimensions.width);
    let left = 0;

    if (props.absolute) return props.clientX
    left += props.left ? activatorLeft - (minWidth - activatorDimensions.width) : activatorLeft;
    if (props.offsetX) {
      //todo calc maxWidth using prop
      const maxWidth = isNaN(Number(props.maxWidth))
        ? activatorDimensions.width
        : Math.min(activatorDimensions.width, Number(props.maxWidth))

      left += props.left ? -maxWidth : activatorDimensions.width
    }
    if (props.nudgeLeft) left -= parseInt(props.nudgeLeft)
    if (props.nudgeRight) left += parseInt(props.nudgeRight)

    return left;
  });

  function calcXOverflow(left, menuWidth) {
    const xOverflow = left + menuWidth - menuableState.pageWidth;

    if ((!props.left || props.right) && xOverflow > 0) {
      left = Math.max(left - xOverflow, 0)
    } else {
      left = Math.max(left, 0)
    }
    return left
  }

  function calcYOverFlow(top) {
    const { pageYOffset } = menuableState
    const documentHeight = window.innerHeight || document.documentElement.clientHeight
    const toTop = pageYOffset + documentHeight
    const activator = dimensions.activator
    const contentHeight = dimensions.content.height
    const totalHeight = top + contentHeight
    const isOverflowing = toTop < totalHeight

    if (isOverflowing && props.offsetOverflow && activator.top > contentHeight) {
      top = pageYOffset + (activator.top - contentHeight)
    } else if (isOverflowing && !props.allowOverflow) {
      top = toTop - contentHeight
    } else if (top < pageYOffset && !props.allowOverflow) {
      top = pageYOffset
    }

    return top
  }

  function updateDimensions(activator = context.refs.activator, content) {
    if (content) contentRef = content
    menuableState.pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
    menuableState.pageWidth = document.documentElement.clientWidth
    //measure activator
    if (activator) {
      dimensions.activator = {
        ...measure(activator),
        offsetLeft: activator.offsetLeft,
        offsetTop: activator.offsetTop
      }
    }
    //measure content
    sneakPeek(() => {
      if (!contentRef && !contentRef.value) return
      dimensions.content = measure(contentRef.value);
    })
  }

  function sneakPeek(cb) {
    requestAnimationFrame(() => {
      if (!contentRef && !contentRef.value) return
      const contentElement = contentRef.value;
      if (!contentElement || contentElement.style.display !== 'none') {
        // maybe this ugly code using to force re-render
        const hasContentStyle = contentElement && contentElement.style
        let left
        if (hasContentStyle) {
          left = contentElement.style.left
          contentElement.style.left = '0'
        }
        cb();
        if (hasContentStyle) {
          contentElement.style.left = left
        }
        return;
      }
      contentElement.style.display = 'inline-block';
      cb();
      contentElement.style.display = 'none';
    })
  }

  function measure(el) {
    if (!el) return
    const rect = getRoundedBoundedClientRect(el);

    if (props.attach) {
      const style = window.getComputedStyle(el);
      rect.left = parseInt(style.marginLeft);
      rect.top = parseInt(style.marginTop);
    }

    return rect
  }

  function getRoundedBoundedClientRect(el) {
    let rect

    try {
      rect = el.getBoundingClientRect()
    } catch (e) {
      console.error(e)
      rect = { top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 }
    }

    return {
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      bottom: Math.round(rect.bottom),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    }
  }

  return {
    computedLeft,
    computedTop,
    calcXOverflow,
    calcYOverFlow,
    updateDimensions,
    dimensions,
    menuableState,
  }
}
