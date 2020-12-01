import { array, boolean, text, withKnobs } from '@storybook/addon-knobs';
import GStepper from '../../GStepper/GStepper';
import GStepperStep from '../../GStepper/GStepperStep';
import GDivider from '../../GLayout/GDivider';
import { GStepperHeader } from '../../GStepper/GStepperFunctionalComponent';
import GStepperContents from '../../GStepper/GStepperContents';
import GStepperContent from '../../GStepper/GStepperContent';
import GCard from '../../GCard/GCard';
import GCardTitle from '../../GCard/GCardTitle';
import { GCardActions, GCardText } from '../../GCard/GCardFunctionalComponent'
import GBtn from '../../GBtn/GBtn';

export default {
  title: 'Stepper',
  decorators: [withKnobs]
}

export const basic = () => ({
  components: { GBtn, GCardActions, GCardText, GCardTitle, GCard, GStepperContent, GStepperContents, GStepperHeader, GDivider, GStepperStep, GStepper },
  data: () => {
    return {
      vertical: false,
      activeStep: null,
      stepData: [
        {
          title: 'STEP 1',
          text: 'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behaviour arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected he me. Engaged its was evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began of cause an scale. Subjects he prospect elegance followed no overcame possible it on. ',
        }, {
          title: 'STEP 2',
          text: 'She wholly fat who window extent either formal. Removing welcomed civility or hastened is. Justice elderly but perhaps expense six her are another passage. Full her ten open fond walk not down. For request general express unknown are. He in just mr door body held john down he. So journey greatly or garrets. Draw door kept do so come on open mean. Estimating stimulated how reasonably precaution diminution she simplicity sir but. Questions am sincerity zealously concluded consisted or no gentleman it.',
        }, {
          title: 'STEP 3',
          text: 'Entire any had depend and figure winter. Change stairs and men likely wisdom new happen piqued six. Now taken him timed sex world get. Enjoyed married an feeling delight pursuit as offered. As admire roused length likely played pretty to no. Means had joy miles her merry solid order.',
        },
        {
          title: 'STEP 4',
          text: 'Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures. Conveying concluded newspaper rapturous oh at. Two indeed suffer saw beyond far former mrs remain. Occasional continuing possession we insensible an sentiments as is. Law but reasonably motionless principles she. Has six worse downs far blush rooms above stood.',
        }, {
          title: 'STEP 5',
          text: 'Neat own nor she said see walk. And charm add green you these. Sang busy in this drew ye fine. At greater prepare musical so attacks as on distant. Improving age our her cordially intention. His devonshire sufficient precaution say preference middletons insipidity. Since might water hence the her worse. Concluded it offending dejection do earnestly as me direction. Nature played thirty all him.',
        }
      ]
    }
  },
  methods: {
    onClickContinue() {
      let index = this.stepData.findIndex((i) => i === this.activeStep);
      if (index < this.stepData.length - 1) {
        this.activeStep = this.stepData[index + 1];
      } else {
        this.activeStep = this.stepData[0];
      }
    }
  },
  props: {
    nonLinear: {
      default: boolean('Non-linear', false)
    },
    editable: {
      default: boolean('Editable', true)
    },
    altLabels: {
      default: boolean('Alternate Labels', false)
    }
  },
  template: `
    <g-stepper :altLabels="altLabels" :non-linear="nonLinear" :vertical=true :editable="editable" :steps="stepData" v-model="activeStep">
    <g-stepper-contents v-model="activeStep" :steps="stepData">
      <g-stepper-content v-for="(step, index) in stepData" :key="index" :step="step">
        <g-card width="100%">
          <g-card-title>{{ step.title }}</g-card-title>
          <g-card-text>{{ step.text }}</g-card-text>
          <g-card-actions>
            <g-btn depressed @click="onClickContinue">CONTINUE</g-btn>
            <g-btn depressed>CANCEL</g-btn>
          </g-card-actions>
        </g-card>
      </g-stepper-content>
    </g-stepper-contents>
    </g-stepper>`
})

export const customDivider = () => ({
  components: { GBtn, GCardActions, GCardText, GCardTitle, GCard, GStepperContent, GStepperContents, GStepper },
  data: () => {
    return {
      vertical: false,
      activeStep: null,
      stepData: [
        {
          title: 'STEP 1',
          text: 'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behaviour arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected he me. Engaged its was evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began of cause an scale. Subjects he prospect elegance followed no overcame possible it on. ',
        }, {
          title: 'STEP 2',
          text: 'She wholly fat who window extent either formal. Removing welcomed civility or hastened is. Justice elderly but perhaps expense six her are another passage. Full her ten open fond walk not down. For request general express unknown are. He in just mr door body held john down he. So journey greatly or garrets. Draw door kept do so come on open mean. Estimating stimulated how reasonably precaution diminution she simplicity sir but. Questions am sincerity zealously concluded consisted or no gentleman it.',
        }, {
          title: 'STEP 3',
          text: 'Entire any had depend and figure winter. Change stairs and men likely wisdom new happen piqued six. Now taken him timed sex world get. Enjoyed married an feeling delight pursuit as offered. As admire roused length likely played pretty to no. Means had joy miles her merry solid order.',
        },
        {
          title: 'STEP 4',
          text: 'Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures. Conveying concluded newspaper rapturous oh at. Two indeed suffer saw beyond far former mrs remain. Occasional continuing possession we insensible an sentiments as is. Law but reasonably motionless principles she. Has six worse downs far blush rooms above stood.',
        }, {
          title: 'STEP 5',
          text: 'Neat own nor she said see walk. And charm add green you these. Sang busy in this drew ye fine. At greater prepare musical so attacks as on distant. Improving age our her cordially intention. His devonshire sufficient precaution say preference middletons insipidity. Since might water hence the her worse. Concluded it offending dejection do earnestly as me direction. Nature played thirty all him.',
        }
      ]
    }
  },
  methods: {
    onClickContinue() {
      let index = this.stepData.findIndex((i) => i === this.activeStep);
      if (index < this.stepData.length - 1) {
        this.activeStep = this.stepData[index + 1];
      } else {
        this.activeStep = this.stepData[0];
      }
    }
  },
  props: {
    nonLinear: {
      default: boolean('Non-linear', false)
    },
    editable: {
      default: boolean('Editable', false)
    },
    altLabels: {
      default: boolean('Alternate Labels', false)
    },
  },
  template: `
    <g-stepper :altLabels="altLabels" :non-linear="nonLinear" :vertical="vertical" :editable="editable" :steps="stepData" v-model="activeStep">
    <template v-slot:divider>
      <div style="align-self: center; flex: 1 1 auto" class="blue">
        <div style="display: inline-block; width: calc(100% - 6px);height: 6px; background: currentColor; margin-bottom: 3px; margin-right: -5px;"></div>
        <div style="display: inline-block; width: 0; height: 0; border: 6px solid transparent;border-right-width: 0; border-left-color: currentColor;"></div>
      </div>
    </template>
    <g-stepper-contents v-model="activeStep" :steps="stepData">
      <g-stepper-content v-for="(step, index) in stepData" :key="index" :step="step">
        <g-card width="100%">
          <g-card-title>{{ step.title }}</g-card-title>
          <g-card-text>{{ step.text }}</g-card-text>
          <g-card-actions>
            <g-btn depressed @click="onClickContinue">CONTINUE</g-btn>
            <g-btn depressed>CANCEL</g-btn>
          </g-card-actions>
        </g-card>
      </g-stepper-content>
    </g-stepper-contents>
    </g-stepper>`
})

export const customHeader = () => ({
  components: { GBtn, GCardActions, GCardText, GCardTitle, GCard, GStepperContent, GStepperContents, GStepperHeader, GDivider, GStepperStep, GStepper },
  data: () => {
    return {
      vertical: false,
      activeStep: null,
      stepData: [
        {
          title: 'STEP 1',
          text: 'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behaviour arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected he me. Engaged its was evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began of cause an scale. Subjects he prospect elegance followed no overcame possible it on. ',
        }, {
          title: 'STEP 2',
          text: 'She wholly fat who window extent either formal. Removing welcomed civility or hastened is. Justice elderly but perhaps expense six her are another passage. Full her ten open fond walk not down. For request general express unknown are. He in just mr door body held john down he. So journey greatly or garrets. Draw door kept do so come on open mean. Estimating stimulated how reasonably precaution diminution she simplicity sir but. Questions am sincerity zealously concluded consisted or no gentleman it.',
        }, {
          title: 'STEP 3',
          text: 'Entire any had depend and figure winter. Change stairs and men likely wisdom new happen piqued six. Now taken him timed sex world get. Enjoyed married an feeling delight pursuit as offered. As admire roused length likely played pretty to no. Means had joy miles her merry solid order.',
        },
        {
          title: 'STEP 4',
          text: 'Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures. Conveying concluded newspaper rapturous oh at. Two indeed suffer saw beyond far former mrs remain. Occasional continuing possession we insensible an sentiments as is. Law but reasonably motionless principles she. Has six worse downs far blush rooms above stood.',
        }, {
          title: 'STEP 5',
          text: 'Neat own nor she said see walk. And charm add green you these. Sang busy in this drew ye fine. At greater prepare musical so attacks as on distant. Improving age our her cordially intention. His devonshire sufficient precaution say preference middletons insipidity. Since might water hence the her worse. Concluded it offending dejection do earnestly as me direction. Nature played thirty all him.',
        }
      ]
    }
  },
  methods: {
    onClickContinue() {
      let index = this.stepData.findIndex((i) => i === this.activeStep);
      if (index < this.stepData.length - 1) {
        this.activeStep = this.stepData[index + 1];
      } else {
        this.activeStep = this.stepData[0];
      }
    }
  },
  props: {
    nonLinear: {
      default: boolean('Non-linear', false)
    },
    editable: {
      default: boolean('Editable', false)
    },
    altLabels: {
      default: boolean('Alternate Labels', false)
    },
    completeIcon: {
      default: text('Complete Icon', 'check')
    },
    editIcon: {
      default: text('Edit Icon', 'edit')
    },
  },
  template: `
    <g-stepper :altLabels="altLabels" :non-linear="nonLinear" :vertical="vertical" :editable="editable" :steps="stepData" v-model="activeStep">
    <template v-slot:header="{ isCompleted, isActiveItem, toggle }">
      <g-stepper-header>
        <template v-for="(step, i) in stepData">
          <g-stepper-step :key="i" :step="step" :error="i === 2" :index="i" :editable="editable" :complete="isCompleted(i)" :is-active="isActiveItem(step)" @click="toggle"
                          :completeIcon="completeIcon" :editIcon="editIcon">
            Step No.{{ i + 1 }}
          </g-stepper-step>
          <div style="align-self: center; flex: 1 1 auto" class="blue" v-if="i < stepData.length - 1">
            <div style="display: inline-block; width: calc(100% - 6px);height: 6px; background: currentColor; margin-bottom: 3px; margin-right: -5px;"></div>
            <div style="display: inline-block; width: 0; height: 0; border: 6px solid transparent;border-right-width: 0; border-left-color: currentColor;"></div>
          </div>
        </template>
      </g-stepper-header>
    </template>
    <g-stepper-contents v-model="activeStep" :steps="stepData">
      <g-stepper-content v-for="(step, index) in stepData" :key="index" :step="step">
        <g-card width="100%">
          <g-card-title>{{ step.title }}</g-card-title>
          <g-card-text>{{ step.text }}</g-card-text>
          <g-card-actions>
            <g-btn depressed @click="onClickContinue">CONTINUE</g-btn>
            <g-btn depressed>CANCEL</g-btn>
          </g-card-actions>
        </g-card>
      </g-stepper-content>
    </g-stepper-contents>
    </g-stepper>`
})
