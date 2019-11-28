import { computed } from '@vue/composition-api'

export const TOOLTIP_CONTENT_SPEECH_BUBBLE_STATIC_CLASS = 'g-tooltip__content__speech-bubble'

export default (props, context) => {
  const speechBubbleStyle = computed(() => {
    return {
      [getBubbleBorderColorProp.value]: props.color
    }
  })
  const showSpeechBubble = computed(() => {
    return props.speechBubble && !props.absolute
  })
  const getBubbleBorderColorProp = computed(() => {
    // if position is not set, tooltip will be shown on top by default
    let direction = 'top'
    if (props.top) {
      direction = 'top'
    } else if (props.left) {
      direction = 'left'
    } else if (props.right) {
      direction = 'right'
    } else if (props.bottom) {
      direction = 'bottom'
    }
    return `border-${direction}-color`
  })
  const speechBubbleClass = computed(() => {
    return {
      [TOOLTIP_CONTENT_SPEECH_BUBBLE_STATIC_CLASS]: true,
      [`${TOOLTIP_CONTENT_SPEECH_BUBBLE_STATIC_CLASS}--${getBubbleArrowPosition.value}`]: true
    }
  })
  const getBubbleArrowPosition = computed(() => {
    if (props.top) {
      return 'bottom'
    }
    if (props.left) {
      return 'right'
    }
    if (props.right) {
      return 'left'
    }
    if (props.bottom) {
      return 'top'
    }
    return 'bottom' // if position is not set, tooltip will be shown on top by default
  })

  return {
    speechBubbleStyle,
    showSpeechBubble,
    getBubbleBorderColorProp,
    speechBubbleClass,
    getBubbleArrowPosition
  }
}
