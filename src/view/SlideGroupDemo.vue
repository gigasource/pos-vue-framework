<template>
	<div style="margin-left: auto; margin-right: auto; max-width: 900px; width: 100%; padding: 12px;" class="demo-wrapper">
		<g-slide-group
				v-model="model"
				:multiple="multiple"
				:mandatory="mandatory"
				:show-arrows="showArrows"
				:center-active="centerActive">
<!--			<g-btn v-for="n in 35"-->
			<!--						 :key="n">-->

			<!--				{{`BUTTON ${n}`}}-->
			<!--			</g-btn>-->
						<g-card v-for="n in 15"
										:key="n"
										height="200"
										width="100">
							<g-card-title>
								<p>GCard Outlined/Hover</p>
							</g-card-title>
							<g-card-text>
								<p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
									making
									you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got
									to
									find a way to escape.</p>
							</g-card-text>
						</g-card>
		</g-slide-group>
	</div>
</template>

<script>
  import GSlideGroup from '../components/GSlideGroup/GSlideGroup';
  import GCard from '../components/GCard/GCard';
  import GCardText from '../components/GCard/GCardText';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GBtn from '../components/GBtn/GBtn';

  export default {
    name: 'SlideGroupDemo',
    components: { GBtn, GCardTitle, GCardText, GCard, GSlideGroup },
    data: () => {
      return {
        model: null,
        multiple: false,
        mandatory: false,
        showArrows: true,
        prevIcon: false,
        nextIcon: false,
        centerActive: false,
      }
    }
  }
</script>

<style scoped>
.demo-wrapper *{
	margin: 16px;
}
</style>
