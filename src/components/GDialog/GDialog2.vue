<template>
	<div ref="el" class="dialog2">
		<div ref="wrapper" class="dialog2-wrapper">
			<div class="dialog2-content" :class="contentClasses" :style="contentStyles" ref="content" v-click-outside:[directiveArgs]="directiveValue">
				<slot></slot>
			</div>
		</div>
		<g-overlay ref="overlay" class="dialog2-overlay" v-if="renderOverlay" v-model="isActive"></g-overlay>
		<div ref="activator">
			<slot name="activator" :toggleOverlay="toggleDialog"></slot>
		</div>
	</div>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import detachable from '../../mixins/detachable';
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

      maxWidth: {
        type: [String, Number],
        default: 'none',
      },

      width: {
        type: [String, Number],
        default: 'auto',
      },

      hideOverlay: Boolean,
      scrollable: Boolean,
			fullscreen: Boolean,
		},
		setup (props, context) {
      const { model: isActive } = getVModel(props, context);
      const { attachToRoot, attachToParent } = detachable(props, context);

			const renderOverlay = ref(!props.hideOverlay && !props.fullscreen);

      onMounted(() => {
        if (renderOverlay.value) attachToRoot(context.refs.overlay.$el);
        attachToRoot(context.refs.wrapper);
        attachToParent();
			});

      function toggleDialog() {
        isActive.value = !isActive.value;
			}

			const contentClasses = computed(() => ({
				'dialog2-content__active': isActive.value,
				'dialog2-content__scrollable': props.scrollable,
				'dialog2-content__fullscreen': props.fullscreen
			}));

      const contentStyles = computed(() => ({
        maxWidth: props.maxWidth === 'none' || props.fullscreen ? undefined : props.maxWidth,
        width: props.width === 'auto' || props.fullscreen ? undefined : props.width,
			}));

      // Click outside
      const closeConditional = (e) => {
        const target = e.target;
        return isActive.value && context.refs.content && !context.refs.content.contains(target)
      };
      const directiveValue = () => {
        isActive.value = false
      };
			const directiveArgs = {
        closeConditional,
				include: () => []
      };

      return {
        isActive,
				renderOverlay,
				toggleDialog,
				contentClasses,
				contentStyles,
        directiveValue,
				directiveArgs
			}
		}
  }
</script>

<style scoped>

</style>