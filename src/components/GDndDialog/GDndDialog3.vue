<template>
	<transition name="dialog-transition">
		<div v-if="isActive" class="g-dnddialog3" :class="dialogClasses" :style="dialogStyles" ref="dialog" @mousedown="dragStart">
			<div class="g-dnddialog3-header" ref="header">
				<span class="g-dnddialog3-title" ref="title">
					<slot name="title"></slot>
				</span>
				<div class="g-dnddialog3-action" ref="action">
					<g-btn v-if="!(isMinimize || isMaximize)" small flat width="30" height="30" min-width="30" color="orange">
						<i class="material-icons" @click="toggleMinimize">minimize</i></g-btn>
					<g-btn small flat width="30" height="30" min-width="30" color="green"><i class="material-icons" @click="toggleMaximize">crop_din</i></g-btn>
					<g-btn small flat width="30" height="30" min-width="30" color="red"><i class="material-icons" @click="toggleDialog">close</i></g-btn>
				</div>
			</div>
			<div v-show="!isMinimize" class="g-dnddialog3-content" ref="content">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>
<script>
	import { getElementPosition, getElementDimension } from '../../utils/helpers';
	import detachable from '../../mixins/detachable';
	import getVModel from '../../mixins/getVModel';
  import { computed, ref, reactive, watch, onMounted, onBeforeUnmount } from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn';

  export default {
    name: 'GDndDialog3',
    components: { GBtn },
    props: {
      value: Boolean,
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
		setup (props, context) {
      const { model: isActive } = getVModel(props, context)
      const { attachToRoot, detach } = detachable(props, context);
      const isMinimize = ref(false)
			const isMaximize = ref(false)
      const isDrag = ref(false)
      const isResize = ref(false)
			const resizeMode = ref('')
			const cursor = ref('')
			const resizeRegionSize = 8;

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

			const minDialogDimension = reactive({
				width: props.minWidth,
				height: props.minHeight,
			})

			const dialogStartPosition = reactive({
				top: 0,
				left: 0,
			})

			const dialogStartDimension = reactive({
        width: 0,
        height: 0
			})

			const mouseStartPosition = reactive({
				pageX: 0,
				pageY: 0
			})

			watch([() => dialogPosition, () => dialogDimension], () => {
			  dialogPosition.bottom = dialogPosition.top + dialogDimension.height;
        dialogPosition.right = dialogPosition.left + dialogDimension.width;
			}, { deep: true })

			watch(isActive, (newVal) => {
			  if (newVal) {
			    context.root.$nextTick(() => {
            attachToRoot(context.refs.dialog);
					})
				}
			})

			onMounted(() => {
				dialogDimension.width = props.width ? +props.width : minDialogDimension.width;
				dialogDimension.height = props.height ? +props.height :minDialogDimension.height;
				dialogPosition.top = (window.innerHeight - dialogDimension.height) / 2;
				dialogPosition.left = (window.innerWidth - dialogDimension.width) / 2;
				//attachToRoot(context.refs.dialog);
			})

			const dialogClasses = computed(() => ({
				'g-dnddialog3__minimize': isMinimize.value,
				'g-dnddialog3__maximize': isMaximize.value
			}))

      const dialogStyles = computed(() => ({
        top: isMaximize.value ? undefined : dialogPosition.top + 'px',
        left: isMaximize.value ? undefined : dialogPosition.left + 'px',
        width: isMaximize.value ? undefined : dialogDimension.width + 'px',
        height: isMinimize.value || isMaximize.value ? undefined : dialogDimension.height + 'px',
        minWidth: isMaximize.value ? undefined : minDialogDimension.width + 'px',
        minHeight: isMinimize.value || isMaximize.value ? undefined : minDialogDimension.height + 'px',
        cursor: cursor.value
      }))

      function toggleDialog() {
        isActive.value = !isActive.value;
      }

      function toggleMinimize() {
        isMinimize.value = true;
			}

			function toggleMaximize() {
        if (isMinimize.value) isMinimize.value = false
				else {
				  isMaximize.value = !isMaximize.value
				}
			}

			function dragStart(e) {
        e.preventDefault();
        const target = e.target;

				dialogStartPosition.top = dialogPosition.top;
        dialogStartPosition.left = dialogPosition.left;
				mouseStartPosition.pageX = e.pageX;
        mouseStartPosition.pageY = e.pageY;

        if ((target === context.refs.header || target === context.refs.title) && resizeMode.value === '') {
          isDrag.value = true;
          cursor.value = 'move';
				}
			}

			function drag(e) {
        //e.preventDefault()

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

        if(isDrag.value) {
          isDrag.value = false;
          cursor.value = '';
				}
			}

			function resizeStart(e) {
        e.preventDefault()

        mouseStartPosition.pageX = e.pageX;
        mouseStartPosition.pageY = e.pageY;
        dialogStartPosition.top = dialogPosition.top;
        dialogStartPosition.left = dialogPosition.left;
        dialogStartDimension.width = dialogDimension.width;
        dialogStartDimension.height = dialogDimension.height;

				if (resizeMode.value !== '') {
				  isResize.value = true;
				}
			}

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
          if (newWidth >= minDialogDimension.width  && newLeft >= 0) {
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
        //e.preventDefault()
        if(isDrag.value || isMinimize.value) return;

        if (isResize.value) {
					const resizeDirections = resizeMode.value.split('');
					for (let resizeDirection of resizeDirections) {
					  resizeMethods[resizeDirection](e);
					}
				} else {
          let tempResizeMode = '';

          if (e.pageY >= dialogPosition.top - resizeRegionSize && e.pageY <= dialogPosition.top + resizeRegionSize)
						tempResizeMode = 'n';
					else if (e.pageY >= dialogPosition.bottom - resizeRegionSize && e.pageY <= dialogPosition.bottom + resizeRegionSize)
						tempResizeMode ='s';
					if (e.pageX >= dialogPosition.left - resizeRegionSize && e.pageX <= dialogPosition.left + resizeRegionSize)
						tempResizeMode += 'w';
					else if (e.pageX >= dialogPosition.right - resizeRegionSize && e.pageX <= dialogPosition.right + resizeRegionSize)
						tempResizeMode += 'e';

					resizeMode.value = tempResizeMode;

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

        if(isResize.value) {
          isResize.value = false;
          resizeMode.value = '';
          cursor.value = '';
				}
			}

      document.addEventListener('mousedown', resizeStart);
			document.addEventListener('mousemove', drag);
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', dragEnd);
      document.addEventListener('mouseup', resizeEnd);

      onBeforeUnmount(() => {
        document.removeEventListener('mousedown', resizeStart);
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('mouseup', resizeEnd);
			})

			return {
        isActive,
				toggleDialog,
				isMinimize,
				toggleMinimize,
				isMaximize,
				toggleMaximize,
        dialogPosition,
				dialogDimension,
        isDrag,
				dialogClasses,
        dialogStyles,
				resizeMode,
				isResize,
				dragStart
			}
		}
  }
</script>
<style scoped>
</style>