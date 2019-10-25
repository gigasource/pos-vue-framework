<template>
	<transition name="dialog-transition">
		<div v-if="isRender" v-show="isActive" class="g-dnddialog-wrapper" :class="wrapperClasses" :style="wrapperStyles" ref="wrapper" @mousedown="dragStart">
			<div class="g-dnddialog-header" ref="header">
				<span class="g-dnddialog-title" ref="title">
					<slot name="title"></slot>
				</span>
				<div class="g-dnddialog-action" ref="action">
					<g-btn v-if="!(isMinimize || isMaximize)" small flat width="30" height="30" min-width="30" color="orange" @click="toggleMinimize">
						<i class="material-icons">minimize</i>
					</g-btn>
					<g-btn small flat width="30" height="30" min-width="30" color="green" @click="toggleMaximize">
						<i class="material-icons">crop_din</i>
					</g-btn>
					<g-btn small flat width="30" height="30" min-width="30" color="red" @click="toggleDialog">
						<i class="material-icons">close</i>
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
  import { getTransitionDuration } from '../../utils/helpers';
  import detachable from '../../mixins/detachable';
  import getVModel from '../../mixins/getVModel';
  import { computed, ref, reactive, watch, onMounted, onBeforeUnmount } from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn';

  export default {
    name: 'GDndDialog',
    components: { GBtn },
    props: {
      value: {
        type: Boolean,
        default: false
      },

      // Render Options
      lazy: Boolean,
      destroyOnClose: Boolean,

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
    setup(props, context) {
      const { model: isActive } = getVModel(props, context)
      const { attachToRoot, detach } = detachable(props, context);

      // Render Options Handling
      const isRender = ref(!props.lazy)
			const isBooted = ref(false)

      watch(isActive, (newVal) => {
        if (props.destroyOnClose) {
          if (newVal) {
            isRender.value = isActive.value;
          } else {
            context.refs.wrapper && setTimeout(() => {
              isRender.value = isActive.value;
            }, getTransitionDuration(context.refs.wrapper))
          }
        }

        if (props.lazy && !isBooted.value) {
          if (newVal) {
            isRender.value = true;
            context.root.$nextTick(() => {
              attachToRoot(context.refs.wrapper);
            })
						isBooted.value = !props.destroyOnClose
          }
        }
      })

      onMounted(() => {
				!props.lazy && attachToRoot(context.refs.wrapper);
      })

      onBeforeUnmount(() => {
        if (isRender.value) {
          detach(context.refs.wrapper);
        }
      })

      // Dynamic classes and styles
      const wrapperClasses = computed(() => ({
        'g-dnddialog__minimize': isMinimize.value,
        'g-dnddialog__maximize': isMaximize.value
      }))

      const wrapperStyles = computed(() => ({
        top: isMaximize.value ? undefined : dialogPosition.top + 'px',
        left: isMaximize.value ? undefined : dialogPosition.left + 'px',
        width: isMaximize.value ? undefined : dialogDimension.width + 'px',
        height: isMinimize.value || isMaximize.value ? undefined : dialogDimension.height + 'px',
        minWidth: isMaximize.value ? undefined : minDialogDimension.width + 'px',
        minHeight: isMinimize.value || isMaximize.value ? undefined : minDialogDimension.height + 'px',
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
        e.preventDefault();
        if (isMaximize.value) {
          return;
        }

        const target = e.target;
        if ((target === context.refs.header || target === context.refs.title) && resizeMode.value === '') {
          dialogStartPosition.top = dialogPosition.top;
          dialogStartPosition.left = dialogPosition.left;
          mouseStartPosition.pageX = e.pageX;
          mouseStartPosition.pageY = e.pageY;
          isDrag.value = true;
          cursor.value = 'move';
        }
      }

      function drag(e) {
        e.preventDefault()

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
        e.preventDefault()

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
        e.preventDefault()
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
        e.preventDefault()
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
              cursor.value = '';
              document.body.style.cursor = '';
              break;
          }
        }
      }

      function resizeEnd(e) {
        e.preventDefault();

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
        dragStart
      }
    }
  }
</script>
<style scoped>
</style>