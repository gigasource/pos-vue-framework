<template>
  <g-stepper :altLabels="altLabels" :non-linear="nonLinear" :steps="stepData" :vertical="vertical" v-model="activeStep">
    <g-stepper-contents v-model="activeStep" :steps="stepData">
      <g-stepper-content v-for="(step, index) in stepData" :step="step">
        <g-card width="100%">
          <g-card width="100%">
            <g-card-title>{{step.title}}</g-card-title>
            <g-card-text>{{step.text}}</g-card-text>
          </g-card>
          <g-card-actions>
            <g-btn depressed>CONTINUE</g-btn>
            <g-btn depressed>CANCEL</g-btn>
          </g-card-actions>
        </g-card>
      </g-stepper-content>
    </g-stepper-contents>

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
  // import GCardText from '../components/GCard/GCardText';
  // import GCardActions from '../components/GCard/GCardActions';
  import { GCardActions, GCardText } from '../components/GCard/GCardFunctionalComponent'
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
        activeStep: null,
        stepData: [
          {
            title: 'STEP 1',
            text: 'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behaviour arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected he me. Engaged its was evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began of cause an scale. Subjects he prospect elegance followed no overcame possible it on. ',
            editable: false
          }, {
            title: 'STEP 2',
            text: 'She wholly fat who window extent either formal. Removing welcomed civility or hastened is. Justice elderly but perhaps expense six her are another passage. Full her ten open fond walk not down. For request general express unknown are. He in just mr door body held john down he. So journey greatly or garrets. Draw door kept do so come on open mean. Estimating stimulated how reasonably precaution diminution she simplicity sir but. Questions am sincerity zealously concluded consisted or no gentleman it.',
            editable: false
          }, {
            title: 'STEP 3',
            text: 'Entire any had depend and figure winter. Change stairs and men likely wisdom new happen piqued six. Now taken him timed sex world get. Enjoyed married an feeling delight pursuit as offered. As admire roused length likely played pretty to no. Means had joy miles her merry solid order.',
            editable: false
          },
          {
            title: 'STEP 4',
            text: 'Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures. Conveying concluded newspaper rapturous oh at. Two indeed suffer saw beyond far former mrs remain. Occasional continuing possession we insensible an sentiments as is. Law but reasonably motionless principles she. Has six worse downs far blush rooms above stood.',
            editable: false
          }, {
            title: 'STEP 5',
            text: 'Neat own nor she said see walk. And charm add green you these. Sang busy in this drew ye fine. At greater prepare musical so attacks as on distant. Improving age our her cordially intention. His devonshire sufficient precaution say preference middletons insipidity. Since might water hence the her worse. Concluded it offending dejection do earnestly as me direction. Nature played thirty all him.',
            editable: false
          }
        ]
      }
    },
    methods: {
      onClickContinue(value) {
        console.log('value:', value);
      },
      isActiveContent(value) {
        return value
      }


    },
  }
</script>

<style scoped>

</style>
