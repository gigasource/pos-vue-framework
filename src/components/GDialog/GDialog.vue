<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import detachable from '../../mixins/detachable';
  import { computed, reactive, watch, onMounted, onBeforeUnmount } from '@vue/composition-api';
  import ClickOutside from '../../directives/click-outside/click-outside';
	import GDialogContent from './GDialogContent';

  export default {
    name: 'GDialog',
    components: { GDialogContent  },
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
      eager: Boolean,

      // Overlay styling
      overlayColor: String,
      overlayOpacity: [Number, String],

      bottom: Boolean,
    },
    setup(props, context) {
      const isActive = getInternalValue(props, context);
      const { attachToParent, detach } = detachable(props, context)

      // Lazy/Eager
      // TODO: convert to bootable mixin
      const isBooted = reactive({
        value: false
      });
      const renderContent = computed(() => isBooted.value || props.eager);

      onMounted(() => {
        attachToParent(context.refs.activator)
      });

      const unwatch = watch(isActive, newVal => {
        if (newVal) {
          if (!props.eager) {
            isBooted.value = true;
          }
        }
      })

      function toggleDialog() {
        isActive.value = !isActive.value;
      }

      // Clean-up when destroy
      onBeforeUnmount(() => {
        unwatch()
        context.refs.activator && detach(context.refs.activator)
      })

      // Render functions
			function genDialogContent() {
        const dialogContentData = {
          props: {
            ...props
					},
					on: {
            input: (value) => {
              isActive.value = value
						}
					}
				}

				return <g-dialog-content {...dialogContentData}>
          {context.slots.default ? context.slots.default() : undefined}
				</g-dialog-content>
			}

      function genActivator() {
        return <div ref="activator" class="g-dialog-activator">
          {context.slots.activator ? context.slots.activator({ toggleDialog }) : undefined}
        </div>
      }

      function genDialog() {
        return <div ref="el" class="g-dialog">
          {genActivator()}
					{renderContent.value && genDialogContent()}
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
	}
</style>
