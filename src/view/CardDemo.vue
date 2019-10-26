<template>
	<div style="display: flex; flex-wrap: wrap;">
		<g-card style="padding-left: auto; padding-right: auto; max-width: 344px;">
			<g-card-title>
				<p>GCard Title</p>
			</g-card-title>
			<g-card-text>
				<p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
					making
					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to
					find a way to escape.</p>
			</g-card-text>
			<g-card-actions>
				<g-btn depressed>CONFIRM</g-btn>
				<g-btn depressed>CANCEL</g-btn>
			</g-card-actions>
		</g-card>

<!--		<g-card outlined img="https://picsum.photos/200/300" color="white" hover>-->
<!--			<g-card-title>-->
<!--				<p>GCard Outlined/Image Background/Hover</p>-->
<!--			</g-card-title>-->
<!--			<g-card-text>-->
<!--				<p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed-->
<!--					making-->
<!--					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to-->
<!--					find a way to escape.</p>-->
<!--			</g-card-text>-->
<!--			<g-card-actions>-->
<!--				<g-button>DON'T CLICK!</g-button>-->
<!--				<g-button>CLICK ME!</g-button>-->
<!--			</g-card-actions>-->
<!--		</g-card>-->

<!--		<g-card disabled background-color="#ffc107" color="white" tile>-->
<!--			<g-card-title>-->
<!--				<p>GCard Disabled</p>-->
<!--			</g-card-title>-->
<!--			<g-card-text>-->
<!--				<p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed-->
<!--					making-->
<!--					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to-->
<!--					find a way to escape.</p>-->
<!--			</g-card-text>-->
<!--			<g-card-actions>-->
<!--				<g-button>DON'T CLICK!</g-button>-->
<!--				<g-button>CLICK ME!</g-button>-->
<!--			</g-card-actions>-->
<!--		</g-card>-->

<!--		<g-card flat elevation="24" border-radius="20px">-->
<!--			<g-card-title>-->
<!--				<p>GCard Flat/Elevation=24</p>-->
<!--			</g-card-title>-->
<!--			<g-card-text>-->
<!--				<p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed-->
<!--					making-->
<!--					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to-->
<!--					find a way to escape.</p>-->
<!--			</g-card-text>-->
<!--			<g-card-actions>-->
<!--				<g-button>DON'T CLICK!</g-button>-->
<!--				<g-button>CLICK ME!</g-button>-->
<!--			</g-card-actions>-->
<!--		</g-card>-->

<!--		<g-card raised  background-color="#009688">-->
<!--			<g-card-title>-->
<!--				<p>GCard Raised</p>-->
<!--			</g-card-title>-->
<!--			<g-card-text>-->
<!--				<p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed-->
<!--					making-->
<!--					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to-->
<!--					find a way to escape. I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed-->
<!--					making-->
<!--					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to-->
<!--					find a way to escape. I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed-->
<!--					making-->
<!--					you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to-->
<!--					find a way to escape.</p>-->
<!--			</g-card-text>-->
<!--			<g-card-actions>-->
<!--				<g-button>DON'T CLICK!</g-button>-->
<!--				<g-button>CLICK ME!</g-button>-->
<!--				<g-button>CLICK ME!</g-button>-->
<!--				<g-button>CLICK ME!</g-button>-->
<!--			</g-card-actions>-->
		</g-card>
	</div>

</template>

<script>
  import GCard from '../components/GCard/GCard';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GCardText from '../components/GCard/GCardText';
  import GCardActions from '../components/GCard/GCardActions';
  import GButton from '../components/GButton/GButton';
  import GRadioGroup from '../components/GRadio/GRadioGroup';
  import GRadio from '../components/GRadio/GRadio';
  import GBtn from '../components/GBtn/GBtn';

  export default {
    name: 'CardDemo',
    components: { GBtn, GRadio, GRadioGroup, GButton, GCardActions, GCardText, GCardTitle, GCard },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
