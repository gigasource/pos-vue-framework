<!--<template>-->
<!--    <span class="v-tooltip" :class="classes">-->
<!--        <transition :name="computedTransition">-->
<!--            <div class="v-tooltip__content"-->
<!--                 :class="tooltipClasses"-->
<!--                 :styles="tooltipStyles"-->
<!--                 v-show="meanuable.isContentActive"-->
<!--                 ref="content">-->
<!--                <slot></slot>-->
<!--            </div>-->
<!--        </transition>-->
<!--        <div ref="activator">-->
<!--            <slot name="activator" :listener="listener"></slot>-->
<!--        </div>-->
<!--    </span>-->
<!--</template>-->

<script>
    import { onBeforeMount, computed, createElement as h, onMounted, reactive } from '@vue/composition-api'
    import menuable  from '../../mixins/menuable';
    import delayable from '../../mixins/delayable';
    import colorable from '../../mixins/colorable';
    import { convertToUnit } from '../../utils/helpers';

    export default {
        name: 'GToolTip',
        props: {
            ...{
              // detachable
              contentClass: {
                  type: String,
                  default: ''
              }
            },
            ...{
                // toggleable props
                value: { required: false }
            },
            ...{
                // menuable extends options
                attach: [Boolean, String, Object],
                offsetY: Boolean,
                offsetX: Boolean,
                // menuable
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
                // positionable
                absolute: Boolean,
                bottom: Boolean,
                fixed: Boolean,
                left: Boolean,
                right: Boolean,
                top: Boolean,
            },
            // tooltip
            closeDelay: {
                type: [Number, String],
                default: 0,
            },
            disabled: Boolean,
            openDelay: {
                type: [Number, String],
                default: 0,
            },
            openOnHover: {
                type: Boolean,
                default: false,
            },
            tag: {
                type: String,
                default: 'span',
            },
            transition: String,
            zIndex: {
                default: null,
            },
            color: [String],
        },
        setup(props, context) {
            // tool tip state
            const state = reactive({
                isActive: false
            })

            // composition api
            const {
                updateDimensions, dimensions, calcXOverflow, calcYOverFlow, menuableState,
            } = menuable(props, context);
            const { runDelay } = delayable(props, state)
            // Positioning
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
                        (props.right ? 10 : -10)
                    )
                }
                if (props.nudgeLeft) left -= parseInt(props.nudgeLeft)
                if (props.nudgeRight) left += parseInt(props.nudgeRight)
                return `${calcXOverflow(left, dimensions.content.width)}px`
            })

            const calculatedTop = computed(() => {
                const activatorTop = props.attach !== false ? dimensions.activator.offsetTop : dimensions.activator.top
                console.log(`activatorTop: ${activatorTop}`)
                let top = 0
                if (props.top || props.bottom) {
                    top = (
                        activatorTop +
                        (props.bottom ? dimensions.activator.height : -dimensions.content.height) +
                        (props.bottom ? 10 : -10)
                    )
                } else if (props.left || props.right) {
                    top = activatorTop + (dimensions.activator.height / 2) - (dimensions.content.height / 2)
                } else {
                    top = activatorTop -dimensions.content.height - 10
                }
                if (props.nudgeTop) top -= parseInt(props.nudgeTop)
                if (props.nudgeBottom) top += parseInt(props.nudgeBottom)
                return `${calcYOverFlow(top + menuableState.pageYOffset)}px`
            })

            const tooltipClasses = computed(() => {
                return {
                    'g-tooltip--top': props.top,
                    'g-tooltip--right': props.right,
                    'g-tooltip--bottom': props.bottom,
                    'g-tooltip--left': props.left,
                    'g-tooltip--attached':
                        props.attach === '' ||
                        props.attach === true ||
                        props.attach === 'attach',
                }
            })

            const computedTransition = computed(() => {
                if (props.transition) return props.transition
                return state.isActive ? 'scale-transition' : 'fade-transition'
            })

            const tooltipContentStyles = computed(() => {
                return {
                    left: calculatedLeft.value,
                    maxWidth: convertToUnit(props.maxWidth),
                    minWidth: convertToUnit(props.minWidth),
                    opacity: state.isActive ? 0.9 : 0,
                    top: calculatedTop.value,
                    zIndex: props.zIndex || 999 // TODO: // props.activeZIndex,
                }
            })

            // Lifecycle Hook
            onBeforeMount(() => {
                // context.root.$nextTick(() => {
                //     props.value && props.callActivate()
                // })
            })

            onMounted(() => {
                // if (getSlotType(props, 'activator', true) === 'v-slot') {
                //     console.error(`v-tooltip's activator slot must be bound, try '<template #activator="data"><v-btn v-on="data.on>'`, props)
                // }


                // moving content & activator out of tooltip (detach)
                context.root.$nextTick(() => {
                    context.root.$el.insertBefore(context.refs.content, context.root.$el.firstChild)
                    context.refs.el.parentNode.insertBefore(context.refs.activator, context.refs.el)
                    updateDimensions()
                })
            })

            // Methods == WHERE TO EXPOSE METHODS ==
            const activate = () => {
                // Update coordinates and dimensions of menu
                // and its activator
                updateDimensions()
                // Start the transition
                // requestAnimationFrame(startTransition)
            }

            const deactivate = () => {
                // runDelay('close')
            }

            const genActivatorListeners = () => {
                // const listeners = Activatable.options.methods.genActivatorListeners.call(this)

                let listeners = {}

                if (props.openOnHover) {
                    listeners.mouseenter = (e/*: MouseEvent*/) => {
                        // getActivator(e)
                        updateDimensions()
                        runDelay('open')
                    }
                    listeners.mouseleave = (e/*: MouseEvent*/) => {
                        // getActivator(e)
                        updateDimensions()
                        runDelay('close')
                    }
                } else {
                    listeners.click = (e/*: MouseEvent*/) => {
                        // e.target.focus()
                        updateDimensions()
                        state.isActive = !state.isActive
                    }
                }

                // listeners.focus = (e /*: Event*/) => {
                //     // getActivator(e)
                //     runDelay('open')
                // }
                // listeners.blur = (e/*: Event*/) => {
                //     // getActivator(e)
                //     runDelay('close')
                // }

                listeners.keydown = (e/*: KeyboardEvent*/) => {
                    if (e.keyCode === keyCodes.esc) {
                        // getActivator(e)
                        runDelay('close')
                    }
                }
                return listeners
            }

            /**
             * Generate activator component
             */
            const genActivator = () => {
                return h('div',
                    { ref: 'activator', staticClass: 'g-tooltip__activator' },
                    context.slots.activator({
                        on: genActivatorListeners()
                    }))
            }

            /**
             * Return Default Slot if state.isActive, otherwise, undefined
             * @type {Ref<any>}
             */
            // const computedContent = computed(() => {
            //     return state.isActive ? context.slots.default() : undefined
            // })

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
                }), context.slots.default());

                return h(props.tag, {
                    staticClass: 'g-tooltip',
                    class: tooltipClasses.value,
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
