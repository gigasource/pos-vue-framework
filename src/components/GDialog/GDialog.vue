<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { computed, reactive, watch, onMounted, onBeforeUnmount, ref, Teleport } from 'vue';
  import ClickOutside from '../../directives/click-outside/click-outside';
	import GDialogContent from './GDialogContent';
  import {getScopeIdRender} from "../../utils/helpers";

  export default {
    name: 'GDialog',
    components: { GDialogContent, Teleport },
    directives: {
      ClickOutside
    },
    props: {
      modelValue: {
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
      eager: Boolean,

      // Overlay styling
      overlayColor: String,
      overlayOpacity: [Number, String],

      bottom: Boolean,

      //content class for styling
      contentClass: String,
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      const isActive = getInternalValue(props, context);
      // Lazy/Eager
      // TODO: convert to bootable mixin
      const isBooted = reactive({
        value: false
      });
      const renderContent = computed(() => isBooted.value || props.eager);

      const unwatch = watch(isActive, newVal => {
        if (newVal) {
          if (!props.eager) {
            isBooted.value = true;
          }
        }
      }, { immediate: true })

      function toggleDialog() {
        isActive.value = !isActive.value;
      }

      // Clean-up when destroy
      onBeforeUnmount(() => {
        unwatch()
      })

      // Render functions
			function genDialogContent() {
        const dialogContentData = {
          ...{ // props
            ...Object.assign({}, props, {
              value: isActive.value
            })
          },
          'onUpdate:modelValue': (value) => isActive.value = value
        }

				return <g-dialog-content {...dialogContentData}>
          {context.slots.default && context.slots.default()}
				</g-dialog-content>
			}

      function genActivator() {
        return <div class="g-dialog-activator">
          {context.slots.activator && context.slots.activator({ toggleDialog })}
        </div>
      }

      function genDialog() {
        const target = document.getElementById('root') ? 'body': 'div[data-app]';
        return <div class="g-dialog">
          {genActivator()}
          <teleport to={target}>
            {renderContent.value && genDialogContent()}
          </teleport>
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
        genDialog,
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
	}
</style>
