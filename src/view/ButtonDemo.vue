<template>
	<div class="container">
		<p>NORMAL BUTTON</p>
		<div class="wrapper">
			<g-btn outlined raised elevation='0' x-large active>XLARGE BUTTON</g-btn>
			<g-btn large>LARGE BUTTON</g-btn>
			<g-btn >DEFAULT BUTTON</g-btn>
			<g-btn small>SMALL BUTTON</g-btn>
			<g-btn disabled x-small>XSMALL BUTTON</g-btn>
		</div>
		<p>OUTLINED BUTTON</p>
		<div class="wrapper">
			<g-btn outlined raised x-large text-color="blue">XLARGE BUTTON</g-btn>
			<g-btn outlined tile large text-color="blue">LARGE BUTTON</g-btn>
			<g-btn outlined text-color="blue">DEFAULT BUTTON</g-btn>
			<g-btn outlined small text-color="blue">SMALL BUTTON</g-btn>
			<g-btn outlined disabled x-small text-color="blue">XSMALL BUTTON</g-btn>
		</div>

		<p>DEPRESSED BUTTON</p>
		<div class="wrapper">
			<g-btn depressed outlined rounded x-large text-color="orange">XLARGE BUTTON</g-btn>
			<g-btn depressed tile large text-color="orange">LARGE BUTTON</g-btn>
			<g-btn depressed rounded text-color="orange">DEFAULT BUTTON</g-btn>
			<g-btn depressed small text-color="orange">SMALL BUTTON</g-btn>
			<g-btn depressed disabled x-small text-color="orange">XSMALL BUTTON</g-btn>
		</div>

		<p>TEXT BUTTON</p>
		<div class="wrapper">
			<g-btn text tile text-color="green" x-large>XLARGE BUTTON</g-btn>
			<g-btn text rounded text-color="green" large>LARGE BUTTON</g-btn>
			<g-btn text text-color="green">DEFAULT BUTTON</g-btn>
			<g-btn text text-color="green" small>SMALL BUTTON</g-btn>
			<g-btn text disabled text-color="green" x-small>XSMALL BUTTON</g-btn>
		</div>

		<p>ROUNDED BUTTON</p>
		<div class="wrapper">
			<g-btn rounded gradient="yellow, green, blue" gradient-angle="120">GRADIENT BUTTON</g-btn>
			<g-btn rounded gradient="#aa00ff, #00bcd4, #ff4452" text-color="white">GRADIENT BUTTON</g-btn>
			<g-btn rounded gradient="gradient-45deg-red-pink" color="white">FIXED BUTTON</g-btn>
			<g-btn rounded tile depressed background-color="bg-blue" x-large>XLARGE BUTTON</g-btn>
			<g-btn rounded flat elevation='6' background-color="bg-blue" large>LARGE BUTTON</g-btn>
			<g-btn rounded elevation='12' outlined background-color="bg-blue">DEFAULT BUTTON</g-btn>
			<g-btn rounded elevation='16' background-color="bg-blue" small>SMALL BUTTON</g-btn>
			<g-btn rounded elevation='24' disabled background-color="bg-blue" x-small>XSMALL BUTTON</g-btn>
		</div>

		<p>Floating</p>
		<div class="wrapper">
			<g-btn fab flat background-color="bg-brown" x-large>
				<i class="material-icons g-icon">face</i>
			</g-btn>
			<g-btn fab depressed background-color="bg-brown" large>
				<i class="material-icons g-icon">face</i>
			</g-btn>
			<g-btn fab outlined elevation='6' background-color="bg-brown">
				<i class="material-icons g-icon">face</i>
			</g-btn>
			<g-btn fab small>
				<i class="material-icons g-icon">face</i>
			</g-btn>
			<g-btn fab disabled elevation='24' background-color="bg-brown" x-small>
				<i class="material-icons g-icon">face</i>
			</g-btn>
		</div>

		<p>Icon</p>
		<div class="wrapper">
			<g-btn icon color="brown" x-large>
				<i class="material-icons g-icon">face</i>
			</g-btn>
			<g-btn icon color="brown" large>
				<i class="material-icons g-icon">face</i>
			</g-btn>
			<g-btn icon color="brown">
				<i class="material-icons g-icon">face</i>
			</g-btn>
			<g-btn icon small>
				<i class="material-icons g-icon">face</i>
			</g-btn>
			<g-btn icon disabled elevation='24' color="brown" x-small>
				<i class="material-icons g-icon">face</i>
			</g-btn>
		</div>
	</div>
</template>

<script>
  import GBtn from '../components/GBtn/GBtn';

  export default {
    name: 'ButtonDemo',
    components: { GBtn }
  }
</script>

<style scoped>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.container {
		display: block;
	}

	.wrapper > * {
		margin: 10px 0 10px 10px;
	}
</style>
