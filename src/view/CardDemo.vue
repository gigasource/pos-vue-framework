<template>
  <div style="display: flex; flex-wrap: wrap;">
    <g-card-new style="padding-left: auto; padding-right: auto; max-width: 344px;">
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
    </g-card-new>
  </div>

</template>

<script>
  import GCardNew from '../components/GCard/GCardNew';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GButton from '../components/GButton/GButton';
  import GRadioGroup from '../components/GRadio/GRadioGroup';
  import GRadio from '../components/GRadio/GRadio';
  import GBtn from '../components/GBtn/GBtn';
  import { GCardText, GCardActions } from '../components/GCard/GCardFunctionalComponent'

  export default {
    name: 'CardDemo',
    components: { GCardNew, GBtn, GRadio, GRadioGroup, GButton, GCardActions, GCardText, GCardTitle },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
