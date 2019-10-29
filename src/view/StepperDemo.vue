<template>
  <g-stepper :altLabels="altLabels" :non-linear="nonLinear" :steps="steps" :vertical="vertical" v-model="activeStep">
    <template v-slot:steps="{toggle, active}">
      <g-stepper-step v-for="(step, index) in steps" :step="step" :active="active" @click="toggle(step)" :editable="true" :complete="true">
        STEP {{step}}
      </g-stepper-step>
    </template>

    <template v-slot:content="{model}">
      <g-card>
        <g-card-title>CARD {{model}}</g-card-title>
        <g-card-text>I DONT KNOW WHAT TO WRITE HERE</g-card-text>
      </g-card>
      <g-layout horizontal>
        <g-btn @click="onClickContinue(model)">CONTINUE</g-btn>
        <g-btn>CANCEL</g-btn>
      </g-layout>
    </template>

  </g-stepper>
</template>

<script>
  import GStepper from '../components/GStepper/GStepper';
  import GStepperStep from '../components/GStepper/GStepperStep';
  import GDivider from '../components/GLayout/GDivider';
  import GStepperHeader from '../components/GStepper/GStepperHeader';
  import GStepperContents from '../components/GStepper/GStepperContents';
  import GStepperContent from '../components/GStepper/GStepperContent';
  import GCard from '../components/GCard/GCard';
  import GButton from '../components/GButton/GButton';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GCardText from '../components/GCard/GCardText';
  import GCardActions from '../components/GCard/GCardActions';
  import GBtn from '../components/GBtn/GBtn';
  import GLayout from '../components/GLayout/GLayout';

  export default {
    name: 'StepperDemo',
    components: { GLayout, GBtn, GCardActions, GCardText, GCardTitle, GButton, GCard, GStepperContent, GStepperContents, GStepperHeader, GDivider, GStepperStep, GStepper },
    data: () => {
      return {
        el: 1,
        steps: 10,
        altLabels: '',
        nonLinear: false,
        vertical: true,
        editable: true,
        activeStep: null
      }
    },
		methods: {
    	onClickContinue(value) {
    		if(this.steps === value) {
					this.activeStep = 1;
				} else {
					this.activeStep = value + 1;
				}
			}
		}
  }
</script>

<style scoped>

</style>
