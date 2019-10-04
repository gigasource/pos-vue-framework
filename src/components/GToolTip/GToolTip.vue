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
                fixed: {
                    type: Boolean,
                    default: false,
                },
                left: Boolean,
                right: Boolean,
                top: Boolean,
            },
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
        },
        setup(props, context) {
            const {
                updateDimensions, dimensions, computedTop, computedLeft, calcXOverflow, calcYOverFlow,
                menuableState,
            } = menuable(props, context);

            const { activator, content } = dimensions
            const state = reactive({
                isActive: true
            })

            /**
             * Calculate left position
             *
             */
            const calculatedLeft = computed(() => {
                const unknown = !props.bottom && !props.left && !props.top && !props.right
                const activatorLeft = props.attach !== false ? activator.offsetLeft : activator.left
                let left = 0
                if (props.top || props.bottom || unknown) {
                    left = activatorLeft + (activator.width / 2) -  (content.width / 2)
                } else if (props.left || props.right) {
                    left = (
                        activatorLeft +
                        (props.right ? activator.width : -content.width) +
                        (props.right ? 10 : -10)
                    )
                }
                if (props.nudgeLeft) left -= parseInt(props.nudgeLeft)
                if (props.nudgeRight) left += parseInt(props.nudgeRight)
                return `${calcXOverflow(left, dimensions.content.width)}px`
            })

            /**
             * Calculate top position of tooltip
             *
             */
            const calculatedTop = computed(() => {
                const activatorTop = props.attach !== false ? activator.offsetTop : activator.top
                let top = 0
                if (props.top || props.bottom) {
                    top = (
                        activatorTop +
                        (props.bottom ? activator.height : -content.height) +
                        (props.bottom ? 10 : -10)
                    )
                } else if (props.left || props.right) {
                    top = (
                        activatorTop +
                        (activator.height / 2) -
                        (content.height / 2)
                    )
                }
                if (props.nudgeTop) top -= parseInt(props.nudgeTop)
                if (props.nudgeBottom) top += parseInt(props.nudgeBottom)
                return `${calcYOverFlow(top + menuableState.pageYOffset)}px`
            })

            /**
             * Get tooltip classes
             * @type {Ref<any>}
             */
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
                // implement detachable
                // moving content & activator out of tooltip
                updateDimensions()

                context.root.$nextTick(() => {
                    context.refs.el.parentNode.insertBefore(context.refs.activator, context.refs.el)
                    context.refs.el.parentNode.insertBefore(context.refs.content, context.refs.el)
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
                        // runDelay('open')
                        updateDimensions()
                        state.isActive = true
                    }
                    listeners.mouseleave = (e/*: MouseEvent*/) => {
                        // getActivator(e)
                        // runDelay('close')
                        updateDimensions()
                        state.isActive = false
                    }
                } else {
                    listeners.click = (e/*: MouseEvent*/) => {
                        // e.target.focus()
                        updateDimensions()
                        state.isActive = !state.isActive
                    }
                }

                listeners.focus = (e /*: Event*/) => {
                    // getActivator(e)
                    // runDelay('open')
                }
                listeners.blur = (e/*: Event*/) => {
                    // getActivator(e)
                    // runDelay('close')
                }
                listeners.keydown = (e/*: KeyboardEvent*/) => {
                    if (e.keyCode === keyCodes.esc) {
                        // getActivator(e)
                        // runDelay('close')
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

            const computedContent = computed(() => {
                let content = state.isActive ? context.slots.default() : undefined
                return content
            })

            // RENDER
            return () => {
                const tooltip = h('div', /*props.setBackgroundColor(props.color,*/ {
                    staticClass: 'g-tooltip__content',
                    class: {
                        [props.contentClass]: true,
                        menuable__content__active: state.isActive,
                        'g-tooltip__content--fixed': props.fixed, // menuableState.activatorFixed
                    },
                    style: tooltipContentStyles.value,
                    // attrs: props.getScopeIdAttrs(),
                    // directives: [{
                    //     name: 'show',
                    //     value: menuableState.isContentActive,
                    // }],
                    ref: 'content',
                }, computedContent.value)

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
