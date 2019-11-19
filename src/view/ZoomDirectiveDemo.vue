<template>
	<div id="container" v-zoom>
		<img src="https://wallpaperplay.com/walls/full/5/e/0/12876.jpg"/>
	</div>
</template>
<script>
	import Zoom from '../directives/zoom/zoom';
  import GImg from '../components/GImg/GImg';

  export default {
    name: 'ZoomDirectiveDemo',
    components: { GImg },
    directives: {
      Zoom
		}
  }
</script>
<style scoped lang="scss">
	@import "../style/elevation";

	#container {
		position: absolute;
		width: 80%;
		height: 400px;
		top: 100px;
		left: 10%;
		border: 1px solid green;
		overflow: scroll;
		@include elevation(4)
	}
</style>