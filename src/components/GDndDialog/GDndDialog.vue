<template>
	<div class="g-dnddialog" @dragover="allowDrop" @drop="onDrop">
		<div id="div1" @dragover="allowDrop" @drop="onDrop">
			<img id="image" src="https://upload.wikimedia.org/wikipedia/vi/thumb/1/14/Windows_logo_-_2006.svg/242px-Windows_logo_-_2006.svg.png" alt="ads" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd"/>
		</div>
		<div id="div2" @dragover="allowDrop" @drop="onDropCopy">

		</div>
		<div id="div3" @dragover="allowDrop" @drop="onDropMove">

		</div>
	</div>
</template>

<script>
  export default {
    name: 'GDndDialog',
		props: {

		},
  	setup(props, context) {
      function allowDrop(e) {
        e.preventDefault();
			}

      function onDragStart(e) {
        e.target.style.opacity = '0';
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.effectAllowed = 'copyMove'
			}

			function onDropCopy(e) {
        const data = e.dataTransfer.getData("text");
        const dropElement = document.getElementById(data);
        e.dataTransfer.dropEffect ='copy';
        e.target.appendChild(dropElement);
        e.preventDefault();
			}

      function onDropMove(e) {
        const data = e.dataTransfer.getData("text");
        const dropElement = document.getElementById(data);
        e.dataTransfer.dropEffect ='move';
        e.target.appendChild(dropElement);
        e.preventDefault();
      }


      function onDragEnd(e) {
        e.target.style.opacity = '1';
			}

			return {
        onDragStart,
				onDragEnd,
				allowDrop,
				onDropCopy,
				onDropMove
			}
		}
  }
</script>

<style scoped>

</style>