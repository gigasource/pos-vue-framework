<script>
  import getVModel, { getInternalValue } from '../../mixins/getVModel';
  import { getZIndex, convertToUnit } from '../../utils/helpers';
  import detachable from '../../mixins/detachable';
  import stackable from '../../mixins/stackable';
  import { computed, reactive, watch, onMounted, onBeforeUnmount } from '@vue/composition-api';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import GOverlay from '../GOverlay/GOverlay';

  export default {
    name: 'GDialog',
    components: { GOverlay },
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

      // Lazy/Eager
      lazy: Boolean,

      // Overlay styling
      overlayColor: String,
      overlayOpacity: [Number, String],

			bottom: Boolean,
    },
    setup(props, context) {
      const isActive = getInternalValue(props, context);
      const { attachToRoot, attachToParent, detach } = detachable(props, context);
      const { getMaxZIndex } = stackable(props, context);

      // Stacking
      const wrapperZIndex = computed(() => {
        return !isActive.value ? 6 : getMaxZIndex(context.refs.wrapper) + 2
      });
      const overlayZIndex = computed(() => wrapperZIndex.value - 1);

      // Show/hide overlay
      // TODO: convert to overlayable mixin
      const renderOverlay = computed(() => !props.hideOverlay && !props.fullscreen && renderContent.value);

      // Lazy/Eager
      // TODO: convert to bootable mixin
      const isBooted = reactive({
        value: false
      });
      const renderContent = computed(() => isBooted.value || !props.lazy);

      function initComponent() {
				attachToRoot(context.refs.overlay.$el);
        attachToRoot(context.refs.wrapper);
      }

      onMounted(() => {
        attachToParent(context.refs.activator)
        if (props.lazy) return
        initComponent()
      });

      const unwatch = watch(isActive, newVal => {
        if (newVal) {
          if (props.lazy) {
            isBooted.value = true;
            context.root.$nextTick(() => {
              initComponent();
              context.refs.wrapper.focus();
            })
          }
          context.refs.wrapper && context.refs.wrapper.focus();
        }
      })

      function toggleDialog() {
        isActive.value = !isActive.value;
      }

      // Close conditional for click outside directive
      const closeConditional = (e) => {
        if (!isActive.value) {
          return false;
        }
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

      // Clean-up when destroy
      onBeforeUnmount(() => {
        unwatch();
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
            'g-dialog-content__fullscreen': props.fullscreen
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
                include: () => []
              }
            }
          ]
        }

        return <div {...wrapperData}>
          <transition name="dialog-transition">
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

        return <g-overlay vOn:input={e => isActive.value = e} value={isActive.value} {...overlayData} vShow={renderOverlay.value}/>
      }

      function genActivator() {
        return <div ref="activator" class="g-dialog-activator">
          {context.slots.activator ? context.slots.activator({ toggleDialog }) : undefined}
        </div>
      }

      function genDialog() {
        return <div ref="el" class="g-dialog">
          {renderContent.value && genContent()}
          {genOverlay()}
          {genActivator()}
        </div>
      }

      function open() {
        isActive.value = true;
      }

      function close() {
        isActive.value = false;
      }

      return {
        open,
        close,
        isActive,
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
		pointer-events: auto;
		overflow-y: hidden;
		display: inline;
		position: relative;

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
			display: flex;
			transition: .3s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;

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

			> .g-card {
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
