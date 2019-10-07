<template>
	<div ref="el" class="dialog2">
		<div ref="wrapper" class="dialog2-wrapper" v-if="lazyRender" :class="wrapperClasses" :style="wrapperStyles" :tabindex="tabIndex">
			<div class="dialog2-content" :class="contentClasses" :style="contentStyles" ref="content" v-click-outside:[directiveArgs]="directiveValue">
				<slot></slot>
			</div>
		</div>
		<g-overlay ref="overlay" class="dialog2-overlay" v-if="renderOverlay" v-model="isActive" :z-index="overlayZIndex"></g-overlay>
		<div ref="activator">
			<slot name="activator" :toggleOverlay="toggleDialog"></slot>
		</div>
	</div>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import { getZIndex } from '../../utils/helpers';
  import detachable from '../../mixins/detachable';
  import stackable from '../../mixins/stackable';
  import { computed, createElement as h, onMounted, reactive, ref, watch } from '@vue/composition-api';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import GOverlay from '../GOverlay/GOverlay';

  export default {
    name: 'GDialog2',
    components: { GOverlay },
    directives: {
      ClickOutside
    },
		props: {
			value: {
			  type: Boolean,
				default: false
			},

			// Sizing
      maxWidth: {
        type: [String, Number],
        default: 'none',
      },

      width: {
        type: [String, Number],
        default: 'auto',
      },

			// Styling
			persistent: Boolean,
      hideOverlay: Boolean,
      scrollable: Boolean,
			fullscreen: Boolean,

			// Lazy/Eager
			lazy: Boolean,
		},
		setup (props, context) {
      const { model: isActive } = getVModel(props, context);
      const { attachToRoot, attachToParent } = detachable(props, context);
      const { getMaxZIndex } = stackable(props, context);

      // Stacking
      const zIndex = computed(() => {
        return !isActive.value ? 6 : getMaxZIndex(context.refs.wrapper) + 2
			});
      const overlayZIndex = computed(() => zIndex.value - 1);


      // Show/hide overlay
			// TODO: convert to overlayable mixin
			const renderOverlay = computed(() => !props.hideOverlay && !props.fullscreen && lazyRender.value);



      // Lazy/Eager
      // TODO: convert to bootable mixin
      const isBooted = reactive({
        value: false
      });
      const lazyRender = computed(() => isBooted.value || !props.lazy);

      function initComponent() {
        context.refs.wrapper.addEventListener('keydown', onKeydown);
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
				'dialog2-content__active': isActive.value,
				'dialog2-content__scrollable': props.scrollable,
				'dialog2-content__fullscreen': props.fullscreen
			}));

      const contentStyles = computed(() => ({
        maxWidth: props.maxWidth === 'none' || props.fullscreen ? undefined : props.maxWidth,
        width: props.width === 'auto' || props.fullscreen ? undefined : props.width,
			}));

      const wrapperClasses = computed(() => ({
				'dialog2-wrapper__active': isActive.value
			}));

      const wrapperStyles = computed(() => ({
				zIndex: zIndex.value
			}));


      // Click outside
      const closeConditional = (e) => {
        if (!isActive.value) return false;
        const clickedInsideContent = context.refs.content.contains(e.target);
				if (clickedInsideContent) return false;

				// If z-index of current element is lower than the current active z-index then do not close when click outside
        return getZIndex(context.refs.wrapper) >= getMaxZIndex(context.refs.wrapper);
      };
      const directiveValue = () => {
        if (!props.persistent) {
          isActive.value = false
        }
      };
			const directiveArgs = {
        closeConditional,
				include: () => []
      };

			// Press ESC key
			const tabIndex = computed(() => isActive.value ? 0 : undefined);

			function onKeydown(e) {
				if (e.keyCode === 27) {
          isActive.value = !isActive.value;
				}
        context.root.$emit('keydown', e);
			}

      return {
        isActive,
				renderOverlay,
				overlayZIndex,
				toggleDialog,
				contentClasses,
				contentStyles,
				wrapperClasses,
				wrapperStyles,
        directiveValue,
				directiveArgs,
				tabIndex,
				lazyRender
			}
		}
  }
</script>

<style scoped>

</style>