<template>
	<div ref="el" class="dialog">
		<div ref="wrapper"
				 class="dialog-wrapper"
				 v-if="renderContent"
				 :class="wrapperClasses"
				 :style="wrapperStyles"
				 :tabindex="tabIndex"
				 @keydown="onKeydown">
			<div ref="content"
					 class="dialog-content"
					 :class="contentClasses"
					 :style="contentStyles"
					 v-click-outside:[clickOutsideDirective.arg]="clickOutsideDirective.value">
				<slot></slot>
			</div>
		</div>
		<g-overlay ref="overlay"
							 v-if="renderOverlay"
							 v-model="isActive"
							 :z-index="overlayZIndex"
							 :color="overlayColor"
							 :opacity="overlayOpacity">
		</g-overlay>
		<div ref="activator">
			<slot name="activator" :toggleDialog="toggleDialog"></slot>
		</div>
	</div>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import { getZIndex } from '../../utils/helpers';
  import detachable from '../../mixins/detachable';
  import stackable from '../../mixins/stackable';
  import { computed, onMounted, reactive, watch } from '@vue/composition-api';
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
			overlayOpacity: [Number, String]
		},
		setup (props, context) {
      const { model: isActive } = getVModel(props, context);
      const { attachToRoot, attachToParent } = detachable(props, context);
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
        if (renderOverlay.value) attachToRoot(context.refs.overlay.$el);
        attachToRoot(context.refs.wrapper);
        attachToParent();
			}

      onMounted(() => {
        if (props.lazy) return;
        initComponent();
			});

			watch(isActive, newVal => {
			  if (newVal) {
          if (props.lazy) {
            isBooted.value = true;
            context.root.$nextTick(() => {
              initComponent();
            })
          }
          context.root.$nextTick(() => {
            context.refs.wrapper.focus();
          });
				}
			})

      function toggleDialog() {
        isActive.value = !isActive.value;
			}


			// Dynamic Classes and Styles
			const contentClasses = computed(() => ({
				'dialog-content__active': isActive.value,
				'dialog-content__scrollable': props.scrollable,
				'dialog-content__fullscreen': props.fullscreen
			}));

      const contentStyles = computed(() => ({
        maxWidth: props.maxWidth === 'none' || props.fullscreen ? undefined : props.maxWidth,
        width: props.width === 'auto' || props.fullscreen ? undefined : props.width,
			}));

      const wrapperClasses = computed(() => ({
				'dialog-wrapper__active': isActive.value
			}));

      const wrapperStyles = computed(() => ({
				zIndex: wrapperZIndex.value
			}));


      // Close conditional for click outside directive
      const closeConditional = (e) => {
        if (!isActive.value) return false;
        const clickedInsideContent = context.refs.content.contains(e.target);
				if (clickedInsideContent) return false;

				// If z-index of current element is lower than the current active z-index then do not close when click outside
        return getZIndex(context.refs.wrapper) >= getMaxZIndex(context.refs.wrapper);
      };

      const clickOutsideDirective = {
				value: () => {
					if (!props.persistent) {
						isActive.value = false
					}
				},
				arg: {
					closeConditional,
					include: () => []
				}
			}

			// Set the wrapper div tabindex to 0 when active, to make wrapper div focusable
			const tabIndex = computed(() => isActive.value ? 0 : undefined);

			// Change active state when press ESC
			function onKeydown(e) {
				if (e.key === 'Escape') {
          isActive.value = !isActive.value;
				}
        context.emit('keydown', e);
			}

      return {
        isActive,
				renderOverlay,
				overlayZIndex,
				renderContent,
				toggleDialog,
				contentClasses,
				contentStyles,
				wrapperClasses,
				wrapperStyles,
				clickOutsideDirective,
				tabIndex,
				onKeydown
			}
		}
  }
</script>

<style scoped>

</style>