export const transitionList = {
  none: 'None',
  fadeIn: 'fadeIn',
  slideLeftToRight: 'slideLeftToRight',
  slideRightToLeft: 'slideRightToLeft',
  slideTopToBottom: 'slideTopToBottom',
  slideBottomToTop: 'slideBottomToTop'
}

function isValidTransition(inputTransition) {
  for (let transition in transitionList) {
    if (inputTransition === transitionList[transition]) return true
  }
}

export function getTransitionDuration(transition, props) {
  if (isValidTransition(transition) && transition !== transitionList.none) return props.transitionDuration
  return 0
}

export function getTransition(name, type, props) {
  switch (name) {
    case 'fadeIn':
      return [
        [
          { transform: 'translateZ(0) translate3d(0,0,0)', opacity: type === 'in' ? '0' : '1' },
          { transform: 'translateZ(0) translate3d(0,0,0)', opacity: type === 'in' ? '1' : '0' }
        ],
        {
          duration: props.transitionDuration,
          easing: 'linear'
        }
      ]
    case 'slideRightToLeft':
      return [
        [
          { transform: type === 'in' ? 'translateX(100%)' : 'translateX(0)' + ' translateZ(0) translate3d(0,0,0)' },
          { transform: type === 'in' ? 'translateX(0)' : 'translateX(-100%)' + ' translateZ(0) translate3d(0,0,0)' }
        ],
        {
          duration: props.transitionDuration,
          easing: 'ease-in-out'
        }
      ]
    case 'slideLeftToRight':
      return [
        [
          { transform: type === 'in' ? 'translateX(-100%)' : 'translateX(0)' + ' translateZ(0) translate3d(0,0,0)' },
          { transform: type === 'in' ? 'translateX(0)' : 'translateX(100%)' + ' translateZ(0) translate3d(0,0,0)' }
        ],
        {
          duration: props.transitionDuration,
          easing: 'ease-in-out'
        }
      ]
    case 'slideBottomToTop':
      return [
        [
          { transform: type === 'in' ? 'translateY(100%)' : 'translateY(0)' + ' translateZ(0) translate3d(0,0,0)' },
          { transform: type === 'in' ? 'translateY(0)' : 'translateY(-100%)' + ' translateZ(0) translate3d(0,0,0)' }
        ],
        {
          duration: props.transitionDuration,
          easing: 'ease-in-out'
        }
      ]
    case 'slideTopToBottom':
      return [
        [
          { transform: type === 'in' ? 'translateY(-100%)' : 'translateY(0)' + ' translateZ(0) translate3d(0,0,0)' },
          { transform: type === 'in' ? 'translateY(0)' : 'translateY(100%)' + ' translateZ(0) translate3d(0,0,0)' }
        ],
        {
          duration: props.transitionDuration,
          easing: 'ease-in-out'
        }
      ]
    default:
      return [
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(0)' }
        ],
        {
          duration: 0,
          easing: 'linear'
        }
      ]
  }
}
