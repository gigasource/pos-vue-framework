const CONTENT_PADDING = 10;

/**
 * Calculate Left offset of Tooltip
 * @param props
 * @param dimensions
 * @param calcXOverflow
 * @returns {string}
 */
export const calcLeft = (props, dimensions, calcXOverflow) => {
  // absolute positioning
  if (props.absolute) {
    return (props.absoluteX || 0) + 'px'
  }

  // calculate base on activator and content
  const unknown = !props.bottom && !props.left && !props.top && !props.right
  const activatorLeft = props.attach !== false ? dimensions.activator.offsetLeft : dimensions.activator.left
  let left = 0
  if (props.top || props.bottom || unknown) {
    left = (
        activatorLeft +
        (dimensions.activator.width / 2) - (dimensions.content.width / 2)
    )
  } else if (props.left || props.right) {
    left = (
        activatorLeft +
        (props.right ? dimensions.activator.width : -dimensions.content.width) +
        (props.right ? CONTENT_PADDING : -CONTENT_PADDING)
    )
  }
  if (props.nudgeLeft) {
    left -= parseInt(props.nudgeLeft)
  }
  if (props.nudgeRight) {
    left += parseInt(props.nudgeRight)
  }
  return `${calcXOverflow(left, dimensions.content.width)}px`
}

/**
 * Calculate Top offset of Tooltip
 * @param props
 * @param dimensions
 * @param menuableState
 * @param calcYOverFlow
 * @returns {string}
 */
export const calcTop = (props, dimensions, menuableState, calcYOverFlow) => {
  // absolute positioning
  if (props.absolute) {
    return (props.absoluteY || 0) + 'px'
  }

  // calculate position base on activator and content
  const activatorTop = props.attach !== false ? dimensions.activator.offsetTop : dimensions.activator.top
  let top = 0
  if (props.top || props.bottom) {
    top = (
        activatorTop +
        (props.bottom ? dimensions.activator.height : -dimensions.content.height) +
        (props.bottom ? CONTENT_PADDING : -CONTENT_PADDING)
    )
  } else if (props.left || props.right) {
    top = (
        activatorTop +
        (dimensions.activator.height / 2) - (dimensions.content.height / 2)
    )
  } else {
    // if position is not set, tooltip will be shown on top by default
    top = (
        activatorTop - dimensions.content.height - CONTENT_PADDING)
  }
  if (props.nudgeTop) {
    top -= parseInt(props.nudgeTop)
  }
  if (props.nudgeBottom) {
    top += parseInt(props.nudgeBottom)
  }
  return `${calcYOverFlow(top + menuableState.pageYOffset)}px`
}
