<template>
	<div>
		<div class="a">
			<div class="b">
				<onSelectIndex v-model="name" style="border: 1px solid black">
					<option disabled value="">Select an animation</option>
					<option v-for="(item, i) in list" :key="i" :value="item">{{item}}</option>
				</onSelectIndex>
				<button @click="show = !show">Toggle</button>
			</div>
			<transition :name="name">
				<p v-if="show">Transition</p>
			</transition>
		</div>
		<div class="a">
			<div class="b">
				<onSelectIndex v-model="classes" style="border: 1px solid black">
					<option disabled value="">Select an animation</option>
					<option v-for="(item, i) in list2" :key="i" :value="item">{{item}}</option>
				</onSelectIndex>
			</div>
			<p class="animated" :class="classes">Attention Seekers</p>
		</div>
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
				list2: ['bounce', 'flash', 'flip', 'heartBeat', 'jello', 'rubberBand', 'shake', 'swing', 'tada', 'wobble'],
				classes: null,
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
