<template>
	<transition name="dialog-transition">
		<div v-if="isRender" v-show="isActive" class="g-dnddialog-wrapper" :class="wrapperClasses" :style="wrapperStyles" ref="wrapper" @mousedown="dragStart">
			<div class="g-dnddialog-header" ref="header">
				<span class="g-dnddialog-title" ref="title">
					<slot name="title"></slot>
				</span>
				<div class="g-dnddialog-action" ref="action">
					<g-btn v-if="!(isMinimize || isMaximize) && showMinimize" x-small flat tile width="16" height="16" min-width="16" @click="toggleMinimize">
						<g-icon size="16" svg>icon-minimize</g-icon>
					</g-btn>
					<g-btn v-if="showMaximize" x-small flat tile width="16" height="16" min-width="16" @click="toggleMaximize">
						<g-icon size="16" svg>{{ maximizeIcon }}</g-icon>
					</g-btn>
					<g-btn x-small flat tile width="16" height="16" min-width="16" @click="toggleDialog">
						<g-icon size="16" svg>icon-close2</g-icon>
					</g-btn>
				</div>
			</div>
			<div v-show="!isMinimize" class="g-dnddialog-content" ref="content">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>
<script>
  import { convertToUnit, getTransitionDuration } from '../../utils/helpers';
  import detachable from '../../mixins/detachable';
  import getVModel from '../../mixins/getVModel';
  import { computed, ref, reactive, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import GBtn from '../GBtn/GBtn';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GDndDialog',
    components: { GIcon, GBtn },
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },

      // Render Options
      lazy: Boolean,
      destroyOnClose: Boolean,
      showMinimize: {
        type: Boolean,
        default: true
      },
      showMaximize: {
        type: Boolean,
        default: true
      },

      // Start styles
      minWidth: {
        type: [Number, String],
        default: 200
      },
      minHeight: {
        type: [Number, String],
        default: 100
      },
      width: [Number, String],
      height: [Number, String]
    },
    emits: ['close', 'dragStart', 'dragEnd', 'resizeStart', 'resizeEnd', 'update:modelValue'],
    setup(props, context) {
      const wrapper = ref(null)
      const header = ref(null)
      const title = ref(null)
      const action = ref(null)
      const content = ref(null)

      const isActive = getVModel(props, context)
      const { attachToRoot, detach } = detachable(props, context, { content });

      // Render Options Handling
      const isRender = ref(!props.lazy)
			const isBooted = ref(false)

			function renderAndAttachDialog() {
        isRender.value = true
        nextTick(() => {
          attachToRoot(wrapper.value)
        })
			}

      watch(isActive, (newVal) => {
        if (props.destroyOnClose) {
          if (newVal) {
            renderAndAttachDialog()
          } else {
            wrapper.value && setTimeout(() => {
              isRender.value = newVal;
            }, getTransitionDuration(wrapper.value))
          }
        }

        if (props.lazy && !isBooted.value) {
          if (newVal) {
            renderAndAttachDialog()
						isBooted.value = !props.destroyOnClose
          }
        }

        if (!newVal) context.emit('close')
        context.emit('update:modelValue', newVal)
      })

      onMounted(() => {
				!props.lazy && attachToRoot(wrapper.value);
      })

      onBeforeUnmount(() => {
        if (isRender.value) {
          wrapper.value && detach(wrapper.value);
        }
      })

      // Dynamic classes and styles
      const wrapperClasses = computed(() => ({
        'g-dnddialog__minimize': isMinimize.value,
        'g-dnddialog__maximize': isMaximize.value
      }))

      const wrapperStyles = computed(() => ({
        top: isMaximize.value ? undefined : convertToUnit(dialogPosition.top),
        left: isMaximize.value ? undefined : convertToUnit(dialogPosition.left),
        width: isMaximize.value ? undefined : convertToUnit(dialogDimension.width),
        height: isMinimize.value || isMaximize.value ? undefined : convertToUnit(dialogDimension.height),
        minWidth: isMaximize.value ? undefined : convertToUnit(minDialogDimension.width),
        minHeight: isMinimize.value || isMaximize.value ? undefined : convertToUnit(minDialogDimension.height),
        cursor: cursor.value
      }))

      // Windows actions
      const isMinimize = ref(false)
      const isMaximize = ref(false)

      function toggleDialog() {
        isActive.value = !isActive.value;
      }

      function toggleMinimize() {
        isMinimize.value = true;
      }

      function toggleMaximize() {
        if (isMinimize.value) {
          isMinimize.value = false
        } else {
          isMaximize.value = !isMaximize.value
        }
      }

      const maximizeIcon = computed(() => isMaximize.value ? 'icon-maximize2' : 'icon-maximize1')

      // Dialog Positions and Dimensions
      const dialogPosition = reactive({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      })

      const dialogDimension = reactive({
        width: 0,
        height: 0
      })

      const minDialogDimension = {
        width: +props.minWidth,
        height: +props.minHeight,
      }

      const dialogStartPosition = {
        top: 0,
        left: 0,
      }

      const dialogStartDimension = {
        width: 0,
        height: 0
      }

      const mouseStartPosition = {
        pageX: 0,
        pageY: 0
      }

      watch([() => dialogPosition, () => dialogDimension], () => {
        dialogPosition.bottom = dialogPosition.top + dialogDimension.height;
        dialogPosition.right = dialogPosition.left + dialogDimension.width;
      }, { deep: true })

      // Update start position and dimension on mounted
      onMounted(() => {
        dialogDimension.width = props.width ? Math.max(+props.width, minDialogDimension.width) : minDialogDimension.width;
        dialogDimension.height = props.height ? Math.max(+props.height, minDialogDimension.height) : minDialogDimension.height;
        dialogPosition.top = (window.innerHeight - dialogDimension.height) / 2;
        dialogPosition.left = (window.innerWidth - dialogDimension.width) / 2;
      })

      //  Drag handlers
      const isDrag = ref(false)

      function dragStart(e) {
        context.emit('dragStart')
        if (isMaximize.value) {
          return;
        }

        const target = e.target;
        if ((target === header.value || target === title.value) && resizeMode.value === '') {
          dialogStartPosition.top = dialogPosition.top;
          dialogStartPosition.left = dialogPosition.left;
          mouseStartPosition.pageX = e.pageX;
          mouseStartPosition.pageY = e.pageY;
          isDrag.value = true;
          cursor.value = 'move';
        }
      }

      function drag(e) {
        if (isDrag.value) {
          const newTop = dialogStartPosition.top - mouseStartPosition.pageY + e.pageY;
          const newLeft = dialogStartPosition.left - mouseStartPosition.pageX + e.pageX;

          if (newTop < 0) {
            dialogPosition.top = 0;
          } else {
            dialogPosition.top = newTop;
          }

          if (newLeft < 0) {
            dialogPosition.left = 0;
          } else {
            dialogPosition.left = newLeft;
          }
        }
      }

      function dragEnd(e) {
        context.emit('dragEnd')
        if (isDrag.value) {
          isDrag.value = false;
          cursor.value = '';
        }
      }

      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', dragEnd);

      onBeforeUnmount(() => {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
      })

      // Resize handlers
      const isResize = ref(false)

      /** Resize Mode : 8 modes
       * n: North | s: South | e: East | w: West
       * ne: North-East | nw: North-West | se: South-East | sw: South-West
       */

      const resizeMode = ref('')
      const cursor = ref('')
      const resizeRegionSize = 8;

      function resizeStart(e) {
        context.emit('resizeStart')
        if (resizeMode.value !== '') {
          dialogStartPosition.top = dialogPosition.top;
          dialogStartPosition.left = dialogPosition.left;
          dialogStartDimension.width = dialogDimension.width;
          dialogStartDimension.height = dialogDimension.height;
          mouseStartPosition.pageX = e.pageX;
          mouseStartPosition.pageY = e.pageY;
          isResize.value = true;
        }
      }

      // Methods for handling single resize direction (n,s,e,w)
      const resizeMethods = {
        n: function (e) {
          const newHeight = dialogStartDimension.height + mouseStartPosition.pageY - e.pageY
          const newTop = dialogStartPosition.top - mouseStartPosition.pageY + e.pageY
          if (newHeight >= minDialogDimension.height && newTop >= 0) {
            dialogDimension.height = newHeight;
            dialogPosition.top = newTop;
          }
        },

        s: function (e) {
          const newHeight = dialogStartDimension.height - mouseStartPosition.pageY + e.pageY
          if (newHeight >= minDialogDimension.height) {
            dialogDimension.height = newHeight;
          }
        },

        w: function (e) {
          const newWidth = dialogStartDimension.width + mouseStartPosition.pageX - e.pageX
          const newLeft = dialogStartPosition.left - mouseStartPosition.pageX + e.pageX
          if (newWidth >= minDialogDimension.width && newLeft >= 0) {
            dialogDimension.width = newWidth;
            dialogPosition.left = newLeft;
          }
        },

        e: function (e) {
          const newWidth = dialogStartDimension.width - mouseStartPosition.pageX + e.pageX
          if (newWidth >= minDialogDimension.width) {
            dialogDimension.width = newWidth;
          }
        }
      }

      function resize(e) {
        if (isDrag.value || isMinimize.value || isMaximize.value) {
          return;
        }

        if (isResize.value) {
          // Split resize mode into separated resize direction then handle individual resize direction
          const resizeDirections = resizeMode.value.split('');
          for (let resizeDirection of resizeDirections) {
            resizeMethods[resizeDirection](e);
          }
        } else {
          // Set resize mode for each edge region of the dialog
          let tempResizeMode = '';

          if (e.pageY >= dialogPosition.top - resizeRegionSize && e.pageY <= dialogPosition.top + resizeRegionSize) {
            tempResizeMode = 'n';
          } else if (e.pageY >= dialogPosition.bottom - resizeRegionSize && e.pageY <= dialogPosition.bottom + resizeRegionSize) {
            tempResizeMode = 's';
          }
          if (e.pageX >= dialogPosition.left - resizeRegionSize && e.pageX <= dialogPosition.left + resizeRegionSize) {
            tempResizeMode += 'w';
          } else if (e.pageX >= dialogPosition.right - resizeRegionSize && e.pageX <= dialogPosition.right + resizeRegionSize) {
            tempResizeMode += 'e';
          }

          resizeMode.value = tempResizeMode;

          // Set cursor value according to resize mode
          switch (tempResizeMode) {
            case 'n':
            case 's':
              cursor.value = 'ns-resize';
              document.body.style.cursor = 'ns-resize';
              break;
            case 'e':
            case 'w':
              cursor.value = 'ew-resize';
              document.body.style.cursor = 'ew-resize';
              break;
            case 'ne':
            case 'sw':
              cursor.value = 'nesw-resize';
              document.body.style.cursor = 'nesw-resize';
              break;
            case 'nw':
            case 'se':
              cursor.value = 'nwse-resize';
              document.body.style.cursor = 'nwse-resize';
              break;
            default:
              if (e.target === header.value || e.target === title.value) {
                cursor.value = 'move';
                document.body.style.cursor = 'move';
							} else {
                cursor.value = '';
                document.body.style.cursor = '';
              }
              break;
          }
        }
      }

      function resizeEnd(e) {
        context.emit('resizeEnd')
        if (isResize.value) {
          isResize.value = false;
          resizeMode.value = '';
          cursor.value = '';
        }
      }

      document.addEventListener('mousedown', resizeStart);
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', resizeEnd);

      onBeforeUnmount(() => {
        document.removeEventListener('mousedown', resizeStart);
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', resizeEnd);
      })

      return {
        isActive,
        isRender,
        toggleDialog,
        isMinimize,
        toggleMinimize,
        isMaximize,
        toggleMaximize,
        wrapperClasses,
        wrapperStyles,
        dragStart,
				maximizeIcon,

        wrapper,
        header,
        title,
        action,
        content,
      }
    }
  }
</script>

<style scoped lang="scss">
	@import "../../style/elevation";

	.g-dnddialog {
		&-wrapper{
			display: flex;
			flex: 1 1 100%;
			flex-direction: column;
			position: absolute;
			z-index: 10000;
			transition: .3s cubic-bezier(0.25, 0.8, 0.25, 1);
			transition-property: transform, opacity;
			box-shadow: 0 0 9px rgba(0, 0, 0, 0.24);
			border-radius: 4px;
		}

		&-header {
			box-sizing: border-box;
			flex: 0 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 32px;
			background-color: #f5f5f5;
			border-bottom: 1px solid #E0E0E0;
			padding: 8px 8px 7px 16px;
			border-radius: 4px 4px 0 0;
		}

		&-title {
			font-size: 12px;
			line-height: 22px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		&-action {
			display: flex;
			align-items: center;

			::v-deep.g-btn {
				padding: 0 !important;

				&:not(:last-child) {
					margin-right: 4px
				}
			}
		}

		&-content {
			flex: 1 1 auto;
			font-size: 12px;
			line-height: 22px;
			backface-visibility: hidden;
			overflow-y: auto;
			background-color: #FFFFFF;
			border-radius: 0 0 4px 4px;
		}

		&__minimize {
			height: auto;
		}

		&__maximize {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
