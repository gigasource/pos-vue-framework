<template>
	<div class="a">
		<div class="b">
			<select v-model="name" style="border: 1px solid black">
				<option disabled value="">Select an animation</option>
				<option v-for="(item, i) in list" :key="i" :value="item">{{item}}</option>
			</select>
			<button @click="show = !show">Toggle</button>
		</div>
		<transition :name="name">
			<p v-if="show">Hihihehe</p>
		</transition>
	</div>
</template>

<script>
  export default {
    name: 'TransitionDemo',
    data() {
      return {
        name,
        list: ['bounceDown', 'bounceUp', 'bounceRight', 'bounceLeft', 'fadeDown', 'fadeUp', 'fadeRight', 'fadeLeft', 'flipX', 'flipY', 'lightSpeedRight', 'lightSpeedLeft', 'rotate', 'rotateDownLeft', 'rotateDownRight', 'rotateUpLeft', 'rotateUpRight', 'roll', 'zoom', 'zoomUp', 'zoomDown', 'zoomLeft', 'zoomRight'],
        show: false,
      }
    }
  }
</script>

<style scoped>
	.a {
		width: 50vh;
		height: 50vh;
		display: flex;
		flex-direction: column;
	}

	.b {
		display: flex;
		flex: 0 0 10%;
	}

	p {
		display: inline-block;
		margin: 25%;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		width: max-content;
	}
</style>