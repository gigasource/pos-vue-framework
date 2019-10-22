<template>
	<div class="g-dnddialog3" :style="dialogStyles" ref="dialog">
		<div class="g-dnddialog3-header" ref="header">
			<span class="g-dnddialog3-title" ref="title">
				<slot name="title"></slot>
			</span>
			<div class="g-dnddialog3-action" ref="action">
				<g-btn small flat width="30" height="30" min-width="30" color="orange"><i class="material-icons">minimize</i></g-btn>
				<g-btn small flat width="30" height="30" min-width="30" color="green"><i class="material-icons">crop_din</i></g-btn>
				<g-btn small flat width="30" height="30" min-width="30" color="red"><i class="material-icons">close</i></g-btn>
			</div>
		</div>
		<div class="g-dnddialog3-content" ref="content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	import { getElementPosition, getElementDimension } from '../../utils/helpers';
  import { computed, ref, reactive, watch, onMounted, onBeforeUnmount } from '@vue/composition-api';
  import GBtn from '../GBtn/GBtn';

  export default {
    name: 'GDndDialog3',
    components: { GBtn },
    props: {
			minWidth: {
			  type: [Number, String],
				default: 200
			},
      minHeight: {
        type: [Number, String],
        default: 100
      }
		},
		setup (props, context) {
      const isDrag = ref(false)
      const isResize = ref(false)
			const resizeMode = ref('')
			const cursor = ref('')
			const resizeRegionSize = 5;

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

      const pageDimension = reactive({
        width: 0,
        height: 0
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

			onMounted(() => {
			  const initPosition = getElementPosition(context.refs.dialog);
			  const initDimension = getElementDimension(context.refs.dialog);
			  dialogPosition.top = initPosition.top;
			  dialogPosition.left = initPosition.left;
			  dialogDimension.width = initDimension.width;
			  dialogDimension.height = initDimension.height;
        context.refs.dialog.addEventListener('mousedown', dragStart);
        context.refs.dialog.addEventListener('mousedown', resizeStart);
			})

      const dialogStyles = computed(() => ({
        top: dialogPosition.top + 'px',
        left: dialogPosition.left + 'px',
        width: dialogDimension.width + 'px',
        height: dialogDimension.height + 'px',
        minWidth: minDialogDimension.width + 'px',
        minHeight: minDialogDimension.height + 'px',
        cursor: cursor.value
      }))

			function dragStart(e) {
        e.preventDefault();
        const target = e.target;

        if (!(target === context.refs.dialog || target === context.refs.header)) return;

				pageDimension.width = Math.max(
          document.documentElement["clientWidth"],
          document.body["scrollWidth"],
          document.documentElement["scrollWidth"],
          document.body["offsetWidth"],
          document.documentElement["offsetWidth"]
        );

				pageDimension.height = Math.max(
          document.documentElement["clientHeight"],
          document.body["scrollHeight"],
          document.documentElement["scrollHeight"],
          document.body["offsetHeight"],
          document.documentElement["offsetHeight"]
        );

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
        e.preventDefault()
        const target = e.target;
        if (!(target === context.refs.dialog || target === context.refs.header) && !isDrag.value) return;

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
        e.preventDefault()
				const target = e.target;
        if(isDrag.value) return;

        if (isResize.value) {
					const resizeDirections = resizeMode.value.split('');
					for (let resizeDirection of resizeDirections) {
					  resizeMethods[resizeDirection](e);
					}
				} else {
          let tempResizeMode = '';

          if (e.pageY >= dialogPosition.top && e.pageY < dialogPosition.top + resizeRegionSize)
						tempResizeMode = 'n';
					else if (e.pageY > dialogPosition.bottom - resizeRegionSize && e.pageY <= dialogPosition.bottom)
						tempResizeMode ='s';
					if (e.pageX >= dialogPosition.left && e.pageX < dialogPosition.left + resizeRegionSize)
						tempResizeMode += 'w';
					else if (e.pageX > dialogPosition.right - resizeRegionSize && e.pageX <= dialogPosition.right)
						tempResizeMode += 'e';

					resizeMode.value = tempResizeMode;

          switch (tempResizeMode) {
						case 'n':
						case 's':
						  cursor.value = 'ns-resize';
						  break;
						case 'e':
						case 'w':
						  cursor.value = 'ew-resize';
						  break;
						case 'ne':
						case 'sw':
						  cursor.value = 'nesw-resize';
							break;
						case 'nw':
						case 'se':
						  cursor.value = 'nwse-resize';
						  break;
						default:
						  cursor.value = '';
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

			document.addEventListener('mousemove', drag);
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', dragEnd);
      document.addEventListener('mouseup', resizeEnd);

			return {
        dialogPosition,
				dialogDimension,
        isDrag,
        dialogStyles,
        dragStart,
				resizeStart
			}
		}
  }
</script>
<style scoped>
</style>