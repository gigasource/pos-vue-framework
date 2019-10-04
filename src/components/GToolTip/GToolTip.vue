<template>
    <span class="v-tooltip" :class="classes">
        <transition :name="computedTransition">
            <div class="v-tooltip__content"
                 :class="tooltipClasses"
                 :styles="tooltipStyles"
                 v-show="meanuable.isContentActive"
                 ref="content">
                <div class="v-tooltip__content__speech-bubble">
                    <slot></slot>
                </div>
            </div>
        </transition>
        <div ref="activator">
            <slot name="activator" :listener="listener"></slot>
        </div>
    </span>
</template>

<script>
    import { onBeforeMount, computed, createElement as h, onMounted, reactive } from '@vue/composition-api'
    import menuable  from '../../mixins/menuable';
    import delayable from '../../mixins/delayable';
    import colorable from '../../mixins/colorable';
    import { convertToUnit } from '../../utils/helpers';

    export default {
        name: 'GToolTip',
        props: {
            /*detachable */           ...{
              contentClass: {
                  type: String,
                  default: ''
              }
            },
            /*toggleable*/            ...{
                value: { required: false }
            },
            /*positionable*/          ...{
                absolute: Boolean,
                bottom: Boolean,
                fixed: Boolean,
                left: Boolean,
                right: Boolean,
                top: Boolean,
            },
            /*menuable*/              ...{
                allowOverflow: Boolean,
                light: Boolean,
                dark: Boolean,
                maxWidth: {
                    type: [Number, String],
                    default: 'auto',
                },
                minWidth: [Number, String],
                nudgeBottom: {
                    type: [Number, String],
                    default: 0,
                },
                nudgeLeft: {
                    type: [Number, String],
                    default: 0,
                },
                nudgeRight: {
                    type: [Number, String],
                    default: 0,
                },
                nudgeTop: {
                    type: [Number, String],
                    default: 0,
                },
                nudgeWidth: {
                    type: [Number, String],
                    default: 0,
                },
                offsetOverflow: Boolean,
                openOnClick: Boolean,
                positionX: {
                    type: Number,
                    default: null,
                },
                positionY: {
                    type: Number,
                    default: null,
                },
                zIndex: {
                    type: [Number, String],
                    default: null,
                },
            },
            /*menuable extends*/      ...{
                attach: [Boolean, String, Object],
                offsetY: Boolean,
                offsetX: Boolean,
            },
            /*delayable*/             ...{
                closeDelay: {
                    type: [Number, String],
                    default: 0,
                },
                openDelay: {
                    type: [Number, String],
                    default: 0,
                },
            },
            /*tooltip*/               ...{
                tag: {
                    type: String,
                    default: 'span',
                },
                disabled: Boolean,
                openOnHover: {
                    type: Boolean,
                    default: false,
                },
                transition: String,
                zIndex: {
                    default: null,
                },
                color: {
                    type: String,
                    default: '#616161'
                },
                speechBubble: Boolean,
            },
        },
        setup(props, context) {
            // tool tip state
            const state = reactive({ isActive: false })
            const { runDelay } = delayable(props, state)
            const {
                updateDimensions,
                dimensions,
                calcXOverflow,
                calcYOverFlow,
                menuableState,
            } = menuable(props, context)

            //// TOOLTIP CONTENT ////
            // generate tooltip content component
            const computedTooltipContent = computed(() => {
                if (props.speechBubble)
                    return [generateSpeechBubble(context.slots.default())]
                else
                    return [context.slots.default()]
            })
            // generate tooltip style
            const tooltipContentStyles = computed(() => {
                return {
                    left: calculatedLeft.value,
                    maxWidth: convertToUnit(props.maxWidth),
                    minWidth: convertToUnit(props.minWidth),
                    opacity: state.isActive ? 1 : 0,
                    top: calculatedTop.value,
                    zIndex: props.zIndex || 999 // TODO: // props.activeZIndex,
                }
            })
            const contentPadding = 10;
            // Calculate x positon for tooltip content
            const calculatedLeft = computed(() => {
                const unknown = !props.bottom && !props.left && !props.top && !props.right
                const activatorLeft = props.attach !== false ? dimensions.activator.offsetLeft : dimensions.activator.left
                let left = 0
                if (props.top || props.bottom || unknown) {
                    left = activatorLeft + (dimensions.activator.width / 2) -  (dimensions.content.width / 2)
                } else if (props.left || props.right) {
                    left = (
                        activatorLeft +
                        (props.right ? dimensions.activator.width : -dimensions.content.width) +
                        (props.right ? contentPadding : -contentPadding)
                    )
                }
                if (props.nudgeLeft) left -= parseInt(props.nudgeLeft)
                if (props.nudgeRight) left += parseInt(props.nudgeRight)
                return `${calcXOverflow(left, dimensions.content.width)}px`
            })
            // Calculate y position for tooltip content
            const calculatedTop = computed(() => {
                const activatorTop = props.attach !== false ? dimensions.activator.offsetTop : dimensions.activator.top
                let top = 0
                if (props.top || props.bottom) {
                    top = (
                        activatorTop +
                        (props.bottom ? dimensions.activator.height : -dimensions.content.height) +
                        (props.bottom ? contentPadding : -contentPadding)
                    )
                } else if (props.left || props.right) {
                    top = activatorTop + (dimensions.activator.height / 2) - (dimensions.content.height / 2)
                } else {
                    top = activatorTop -dimensions.content.height - contentPadding
                }
                if (props.nudgeTop) top -= parseInt(props.nudgeTop)
                if (props.nudgeBottom) top += parseInt(props.nudgeBottom)
                return `${calcYOverFlow(top + menuableState.pageYOffset)}px`
            })


            //// SPEECH BUBBLE CONTENT ////
            // generate speech bubble content
            const generateSpeechBubble = (children) => {
                let speechBubbleClass = 'g-tooltip__content__speech-bubble'
                let speechBubbleData = {
                    staticClass: `${speechBubbleClass} ${speechBubbleClass}--${bubbleArrowDirection.value}`,
                    style: {
                        // Arrow color
                        [`border-${bubbleArrowBorderDirection.value}-color`]: props.color
                    }
                }
                return h('div', speechBubbleData, children)
            }
            // get speech bubble arrow position
            const bubbleArrowDirection =  computed(() => {
                if (props.top) return 'bottom'
                if (props.left) return 'right'
                if (props.right) return 'left'
                if (props.bottom) return 'top'
                return ''
            })
            // change color of arrow
            const bubbleArrowBorderDirection = computed(() => {
                if (props.top) return 'top'
                if (props.left) return 'left'
                if (props.right) return 'right'
                if (props.bottom) return 'bottom'
                return ''
            })


            //// ACTIVATOR ////
            // generate activator listener
            const genActivatorListeners = () => {
                let listeners = {}

                if (props.openOnHover) {
                    listeners.mouseenter = (e/*: MouseEvent*/) => {
                        updateDimensions()
                        runDelay('open')
                    }
                    listeners.mouseleave = (e/*: MouseEvent*/) => {
                        updateDimensions()
                        runDelay('close')
                    }
                } else {
                    listeners.click = (e/*: MouseEvent*/) => {
                        updateDimensions()
                        state.isActive = !state.isActive
                    }
                }

                return listeners
            }
            // generate activator component
            const genActivator = () => {
                return h('div',
                    { ref: 'activator', staticClass: 'g-tooltip__activator' },
                    context.slots.activator({
                        on: genActivatorListeners()
                    }))
            }


            //// LIFECYCLE HOOK ////
            onMounted(() => {
                // moving content & activator out of tooltip (detach)
                context.root.$nextTick(() => {
                    context.root.$el.insertBefore(context.refs.content, context.root.$el.firstChild)
                    context.refs.el.parentNode.insertBefore(context.refs.activator, context.refs.el)
                    updateDimensions()
                })
            })


            //// TRANSITION ////
            const computedTransition = computed(() => {
                if (props.transition) return props.transition
                return state.isActive ? 'scale-transition' : 'fade-transition'
            })


            //// RENDER FUNCTION ////
            return () => {
                const tooltip = h('div', colorable.setBackgroundColor(props.color, {
                    staticClass: 'g-tooltip__content',
                    class: {
                        [props.contentClass]: true,
                        menuable__content__active: state.isActive,
                        // 'g-tooltip__content--fixed': menuableState.activatorFixed
                    },
                    style: tooltipContentStyles.value,
                    // attrs: props.getScopeIdAttrs(),
                    directives: [{
                        name: 'show',
                        value: state.isActive,
                    }],
                    ref: 'content',
                }), computedTooltipContent.value);

                return h(props.tag, {
                    staticClass: 'g-tooltip',
                    //class: tooltipClasses.value,
                    ref: 'el'
                }, [
                    h('transition', {
                        props: {
                            name: computedTransition.value,
                        },
                    }, [tooltip]),
                    genActivator(),
                ])
            }
        }
    }
</script>
