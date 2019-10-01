<template>
	<div style="display: flex">
		<g-card outlined>
			<g-card-title>
				<p>I'm a title</p>
			</g-card-title>
			<g-card-text>
				<p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
					making
					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to
					find a way to escape.</p>
			</g-card-text>
			<g-card-actions>
				<g-button>DON'T CLICK!</g-button>
				<g-button>CLICK ME!</g-button>
			</g-card-actions>
		</g-card>

		<g-card disabled>
			<g-card-title>
				<p>I'm a title</p>
			</g-card-title>
			<g-card-text>
				<p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
					making
					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to
					find a way to escape.</p>
			</g-card-text>
			<g-card-actions>
				<g-button>DON'T CLICK!</g-button>
				<g-button>CLICK ME!</g-button>
			</g-card-actions>
		</g-card>
	</div>

</template>

<script>
  import GCard from '../components/GCard/GCard';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GCardText from '../components/GCard/GCardText';
  import GCardActions from '../components/GCard/GCardActions';
  import GButton from '../components/GButton/GButton';
  import GRadioGroup from '../components/GInput/GRadioGroup';
  import GRadio from '../components/GInput/GRadio';

  export default {
    name: 'CardDemo',
    components: { GRadio, GRadioGroup, GButton, GCardActions, GCardText, GCardTitle, GCard },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
