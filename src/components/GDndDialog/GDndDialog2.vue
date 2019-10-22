<template>
	<div class="g-dnddialog2" :style="dialogStyles" ref="dialog">
		<div class="g-dnddialog2-header" @mousedown="dragStart">

		</div>
		<div class="g-dnddialog2-content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
  import { computed, reactive, watch, onMounted, onBeforeUnmount } from '@vue/composition-api';

  export default {
    name: 'GDndDialog2',
    props: {},
    setup(props, context) {
      const dialogPosition = reactive({
        top: 50,
        left: 50,
        clientX: 0,
        clientY: 0
      })

			const dialogDimension = reactive({
				width: 0,
				height: 0
			})

			const clientDimension = reactive({
				width: 0,
				height: 0
			})

			const maxDialogPosition = computed(() =>  {
			  return {
			    top: clientDimension.height - dialogDimension.height,
					left: clientDimension.width - dialogDimension.width
				}
			})

			const dialogStyles = computed(() => ({
			  top: dialogPosition.top + 'px',
				left: dialogPosition.left + 'px'
			}))

			onMounted(() => {
			  dialogDimension.width = context.refs.dialog.offsetWidth;
        dialogDimension.height = context.refs.dialog.offsetHeight;
        clientDimension.width = document.body.clientWidth;
        clientDimension.height = document.body.clientHeight;
			})

      function dragStart(e) {
        e.preventDefault();
        dialogPosition.clientX = e.clientX;
        dialogPosition.clientY = e.clientY;
        document.addEventListener('mousemove', drag, false)
        document.addEventListener('mouseup', dragEnd)
      }

      function drag(e) {
        e.preventDefault();
        const newTop = dialogPosition.top -  dialogPosition.clientY + e.clientY;
        const newLeft = dialogPosition.left -  dialogPosition.clientX + e.clientX;

        if (newTop < 0) {
          dialogPosition.top = 0;
				} else if (newTop > maxDialogPosition.value.top) {
          dialogPosition.top = maxDialogPosition.value.top
				} else {
          dialogPosition.top = newTop;
				}

        if (newLeft < 0) {
          dialogPosition.left = 0;
        } else if (newLeft > maxDialogPosition.value.left) {
          dialogPosition.left = maxDialogPosition.value.left
        } else {
          dialogPosition.left = newLeft;
        }

        dialogPosition.clientX = e.clientX;
        dialogPosition.clientY = e.clientY;
			}

      function dragEnd() {
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', dragEnd)
      }

      function getClientDimension() {}

      window.addEventListener('resize', () => {
        clientDimension.width = document.body.clientWidth;
        clientDimension.height = document.body.clientHeight;
        console.log(clientDimension.width, clientDimension.height)
			})

			watch(() => maxDialogPosition.value, () => {
			  if (dialogPosition.top > maxDialogPosition.value.top) {
          dialogPosition.top = maxDialogPosition.value.top
				}
        if (dialogPosition.left > maxDialogPosition.value.left) {
          dialogPosition.left = maxDialogPosition.value.left
        }
			})

      return {
				dialogPosition,
				dialogDimension,
				clientDimension,
				dialogStyles,
				dragStart
			}
    }
  }

</script>
<style scoped>
</style>