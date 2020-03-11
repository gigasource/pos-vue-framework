<script>
  import { getInternalValue } from '../../mixins/getVModel'
  import { convertToUnit, getZIndex } from '../../utils/helpers'
  import detachable from '../../mixins/detachable'
  import stackable from '../../mixins/stackable'
  import { computed, onBeforeUnmount, onMounted, ref, watch } from '@vue/composition-api'
  import ClickOutside from '../../directives/click-outside/click-outside'
  import GOverlay from '../GOverlay/GOverlay'
  import dependent from '../../mixins/dependent';

  export default {
    name: 'GDialogContent',
    components: {GOverlay},
    directives: {
      ClickOutside
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },

      // Dialog Sizing
      maxWidth: {
        type: [String, Number],
        default: 'none',
      },

      width: {
        type: [String, Number],
        default: 'auto',
      },

      // Dialog functionality
      persistent: Boolean,
      hideOverlay: Boolean,
      scrollable: Boolean,
      fullscreen: Boolean,

      // Overlay styling
      overlayColor: String,
      overlayOpacity: [Number, String],

      bottom: Boolean,

      //content class for styling
      contentClass: String,

      // dependent mixin
      ...{
        closeDependents: {
          type: Boolean,
          default: true,
        },
        isDependent: {
          type: Boolean,
          default: true,
        },
      },
    },
    setup(props, context) {
      const isActive = getInternalValue(props, context)
      const {attachToRoot, detach} = detachable(props, context)
      const {getMaxZIndex} = stackable(props, context)

      // Stacking
      const wrapperZIndex = computed(() => {
        return !isActive.value ? 6 : getMaxZIndex(context.refs.wrapper) + 2
      });
      const overlayZIndex = computed(() => wrapperZIndex.value - 1)

      // Show/hide overlay
      // TODO: convert to overlayable mixin
      const renderOverlay = computed(() => !props.hideOverlay && !props.fullscreen)
      const getOpenDependentElements = ref(null)
      function initComponent() {
        attachToRoot(context.refs.overlay.$el)
        attachToRoot(context.refs.wrapper)
        detach(context.refs.container)
      }

      onMounted(function () {
        initComponent()
        getOpenDependentElements.value = dependent(this)
      })

      // Close conditional for click outside directive
      const closeConditional = (e) => {
        if (!isActive.value) {
          return false;
        }
        if (!context.refs.content) return;
        const clickedInsideContent = context.refs.content.contains(e.target);
        if (clickedInsideContent) {
          return false;
        }
        if (props.persistent) {
          return false;
        }

        // If z-index of current element is lower than the current active z-index then do not close when click outside
        return getZIndex(context.refs.wrapper) >= getMaxZIndex(context.refs.wrapper);
      };

      // Set the wrapper div tabindex to 0 when active, to make wrapper div focusable
      const wrapperTabIndex = computed(() => isActive.value ? 0 : undefined);

      // Change active state when press ESC
      function onKeydown(e) {
        if (e.key === 'Escape') {
          if (props.persistent) {
            return;
          }
          isActive.value = !isActive.value;
          context.emit('keydown', e);
        }
      }

      // Scroll prevent
      const composedPath = function (e) {
        if (e.composedPath) return e.composedPath()

        const path = []
        let el = e.target

        while (el) {
          path.push(el)

          if (el.tagName === 'HTML') {
            path.push(document)
            path.push(window)

            return path
          }

          el = el.parentElement
        }
        return path
      }

      const hasScrollbar = function (el) {
        if (!el || el.nodeType !== Node.ELEMENT_NODE) return false
        const style = window.getComputedStyle(el)
        return ['auto', 'scroll'].includes(style.overflowY) && el.scrollHeight > el.clientHeight
      }

      const onEdge = function (el) {
        return el.scrollTop === 0 || el.scrollTop + el.clientHeight === el.scrollHeight
      }

      const shouldScroll = function (el, delta) {
        if (el.scrollTop === 0 && delta < 0) return true
        return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0
      }

      const isInside = function (el, parent) {
        if (el === parent) {
          return true
        } else if (el === null || el === document.body) {
          return false
        } else {
          return isInside(el.parentNode, parent)
        }
      }

      const checkPath = function (e) {
        const path = e.path || composedPath(e)
        let delta = e.deltaY

        if (e.type === 'keydown' && path[0] === document.body) {
          const dialog = context.refs.wrapper
          // getSelection returns null in firefox in some edge cases, can be ignored
          const selected = window.getSelection().anchorNode
          if (dialog && hasScrollbar(dialog) && isInside(selected, dialog)) {
            return shouldScroll(dialog, delta)
          }
          return true
        }

        for (let index = 0; index < path.length; index++) {
          const el = path[index]

          if (el === document) return true
          if (el === document.documentElement) return true
          if (el === context.refs.content) return true

          if (hasScrollbar(el)) {
            return shouldScroll(el, delta)
          }
        }

        return true
      }

      const onWheel = function (e) {
        if ((context.refs.overlay && e.target === context.refs.overlay.$el.firstChild) || checkPath(e)) e.preventDefault()
      }

      const checkPathTouch = function (e) {
        const path = e.path || composedPath(e)
        let delta = touchStartY - touchMoveY
        for (let index = 0; index < path.length; index++) {
          const el = path[index]

          if (el === document) return true
          if (el === document.documentElement) return true
          if (el === context.refs.content) return true

          if (hasScrollbar(el)) {
            if (!onEdge(el)) return false
            return shouldScroll(el, delta)
          }
        }

        return true
      }

      let touchStartY
      let touchMoveY
      let touchFlag = false
      let shouldScrollTouchMove = false


      const onTouchStart = function (e) {
        touchFlag = true
        touchStartY = e.touches[0].clientY
      }

      const onTouchMove = function (e) {
        if (touchFlag) {
          touchMoveY = e.touches[0].clientY
          shouldScrollTouchMove = checkPathTouch(e)
          touchFlag = false
        }
        if (((context.refs.overlay && e.target === context.refs.overlay.$el.firstChild) || shouldScrollTouchMove) && e.cancelable) {
          e.preventDefault()
        }
      }

      const disableOutsideScroll = () => {
        window.addEventListener('wheel', onWheel, {passive: false})
        window.addEventListener('touchstart', onTouchStart, {passive: false})
        window.addEventListener('touchmove', onTouchMove, {passive: false})
      }

      const enableOutsideScroll = () => {
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
      }

      const unwatch = watch(isActive, newVal => {
        if (newVal) {
          disableOutsideScroll()
          context.root.$nextTick(() => {
            context.refs.wrapper && context.refs.wrapper.focus()
          })
        } else {
          enableOutsideScroll()
        }
      })

      // Clean-up when destroy
      onBeforeUnmount(() => {
        unwatch()
        enableOutsideScroll()
        context.refs.wrapper && detach(context.refs.wrapper);
        context.refs.overlay && detach(context.refs.overlay.$el);
      });

      // Render functions
      function genContent() {
        const wrapperData = {
          ref: 'wrapper',
          staticClass: 'g-dialog-wrapper',
          class: {
            'g-dialog-wrapper__active': isActive.value,
            'g-dialog-wrapper__bottom': props.bottom,
          },
          style: {
            zIndex: wrapperZIndex.value
          },
          attrs: {
            tabindex: wrapperTabIndex.value
          },
          on: {
            keydown: onKeydown
          }
        }

        const contentData = {
          ref: 'content',
          staticClass: 'g-dialog-content',
          class: {
            'g-dialog-content__active': isActive.value,
            'g-dialog-content__scrollable': props.scrollable,
            'g-dialog-content__fullscreen': props.fullscreen,
            [props.contentClass]: !!props.contentClass,
          },
          style: {
            maxWidth: props.maxWidth === 'none' || props.fullscreen ? undefined : convertToUnit(props.maxWidth),
            width: props.width === 'auto' || props.fullscreen ? undefined : convertToUnit(props.width),
          },
          directives: [
            {
              name: 'clickOutside',
              value: () => {
                isActive.value = false
              },
              arg: {
                closeConditional,
                include: () => [...getOpenDependentElements.value()]
              }
            }
          ]
        }

        const transitionName = computed(() => props.bottom ? 'dialog-bottom-transition' : 'dialog-transition')

        return <div {...wrapperData}>
          <transition name={transitionName.value}>
            <div {...contentData} vShow={isActive.value}>
              {context.slots.default ? context.slots.default() : undefined}
            </div>
          </transition>
        </div>
      }

      function genOverlay() {
        const overlayData = {
          ref: 'overlay',
          props: {
            zIndex: overlayZIndex.value,
            color: props.overlayColor,
            opacity: props.overlayOpacity
          }
        }

        return <g-overlay vOn:input={e => isActive.value = e} value={isActive.value} {...overlayData}
                          vShow={renderOverlay.value}/>
      }

      function genDialog() {
        return <div ref="container">
          {genContent()}
          {genOverlay()}
        </div>
      }

      return {
        genDialog
      }
    },
    render() {
      return this.genDialog()
    }
  }
</script>
<style scoped lang="scss">
  .g-dialog {

    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      pointer-events: none;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 6;
      outline: none;
    }

    &-content {
      transition: .3s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
      width: 100%;
      display: flex;

      &:not(.g-dialog-content__fullscreen) {
        max-width: 90%;
        max-height: 90%;
      }

      > * {
        width: 100%
      }

      > ::v-deep.g-card {
        height: auto;
        overflow-y: auto;
        flex: 1 1 100%;

        > .g-card-title {
          font-size: 2em;
          font-weight: 500;
        }

        > .g-card-actions {
          justify-content: flex-end;
        }
      }
    }

    &-content__active {
      pointer-events: auto;
    }

    &-content__scrollable {
      > ::v-deep.g-card {
        display: flex;
        flex: 1 1 100%;
        flex-direction: column;
        max-height: 100%;
        max-width: 100%;

        > .g-card-title, .g-card-actions {
          flex: 0 0 auto
        }

        > .g-card-text {
          backface-visibility: hidden;
          flex: 1 1 auto;
          overflow-y: auto;
        }
      }
    }

    &-content__fullscreen {
      border-radius: 0;
      margin: 0;
      height: 100%;
      position: fixed;
      overflow-y: auto;
      top: 0;
      left: 0;
      right: 0;

      > ::v-deep .g-card {
        height: 100%;
        min-height: 100%;
        min-width: 100%;
        margin: 0 !important;
        padding: 0 !important;
      }
    }

    &-wrapper__bottom {
      align-items: flex-end;
    }
  }
</style>
