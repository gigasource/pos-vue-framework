<template>
	<div class="dialog2">
		<div class="dialog2-wrapper">
			<div class="dialog2-content" :class="contentClasses" v-click-outside ref="content" v-click-outside:[directiveArgs]="directiveValue">
				<slot></slot>
			</div>
		</div>
		<g-overlay class="dialog2-overlay" v-if="!hideOverlay" v-model="isActive"></g-overlay>
	<div>
		<slot class="dialog2-activator" name="activator" :toggleOverlay="toggleDialog"></slot>
	</div>
	</div>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
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
      hideOverlay: Boolean,
		},
		setup (props, context) {
      const { model: isActive } = getVModel(props, context);

      function toggleDialog() {
        isActive.value = !isActive.value;
			}

			const contentClasses = computed(() => ({
				'dialog2-content__active': isActive.value
			}));

      const closeConditional = (e) => {
        const target = e.target;
        return isActive.value && context.refs.content && !context.refs.content.contains(target)
      }
      const directiveValue = () => {
        isActive.value = false
      }
			const directiveArgs = {
        closeConditional,
				include: () => []
      }

      return {
        isActive,
				toggleDialog,
				contentClasses,
        directiveValue,
				directiveArgs
			}
		}
  }
</script>

<style scoped>

</style>