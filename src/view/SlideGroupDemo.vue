<template>
  <div class="demo-wrapper" style="margin-left: auto; margin-right: auto; max-width: 900px; width: 100%; padding: 12px;">
    <g-slide-group
        :center-active="centerActive"
        :items="items"
        :mandatory="mandatory"
        :multiple="multiple"
        :show-arrows="showArrows"
        v-model="activeItems">

      <template v-slot:default="{toggle, active}">
        <g-btn :active="active"
               :class="[active ? activeClass : {}]"
               :key="index"
               @click="toggle(item)"
               v-for="(item, index) in items">
          {{item.text}}
        </g-btn>
      </template>

    </g-slide-group>
    <p>Active items: {{activeItems}}</p>

    <g-slide-group
        :center-active="centerActive"
        :dense="dense"
        :items="items2"
        :mandatory="mandatory"
        :multiple="multiple"
        :show-arrows="showArrows"
        v-model="activeItemCards">
      <template v-slot:prev>
        <g-icon>mdi-arrow-left</g-icon>
      </template>
      <template v-slot:default="{toggle, isActive}">
        <g-card :active="isActive(n)" :key="i" @click="toggle(n)" height="300px" v-for="(n, i) in items2" width="200px">
          <g-card-text>
            <p>
              {{n.cardText}}</p>
          </g-card-text>
        </g-card>
      </template>
      <template v-slot:next>
        <g-icon>mdi-arrow-right</g-icon>
      </template>
    </g-slide-group>
    <p>Active items: {{activeItemCards}}}</p>
  </div>
</template>

<script>
  import GSlideGroup from '../components/GSlideGroup/GSlideGroup';
  import GCard from '../components/GCard/GCard';
  import { GCardText } from '../components/GCard/GCardFunctionalComponent';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GBtn from '../components/GBtn/GBtn';
  import GIcon from '../components/GIcon/GIcon';

  export default {
    name: 'SlideGroupDemo',
    components: { GIcon, GBtn, GCardTitle, GCardText, GCard, GSlideGroup },
    data: () => ({
      model: null,
      dense: false,
      multiple: true,
      mandatory: true,
      showArrows: true,
      prevIcon: false,
      nextIcon: false,
      centerActive: true,
      activeItems: null,
      activeItemCards: null,
      activeClass: {
        'button-active': true
      },
      items: [
        { id: 1, text: 'BUTTON 1' },
        { id: 2, text: 'BUTTON 2' },
        { id: 3, text: 'BUTTON 3' },
        { id: 4, text: 'BUTTON 4' },
        { id: 5, text: 'BUTTON 5' },
        { id: 6, text: 'BUTTON 6' },
        { id: 7, text: 'BUTTON 7' },
        { id: 8, text: 'BUTTON 8' },
        { id: 9, text: 'BUTTON 9' },
        { id: 10, text: 'BUTTON 10' },
      ],
      items2: [{ id: 1, cardText: 'CARD 1' }, { id: 2, cardText: 'CARD 2' }, { id: 3, cardText: 'CARD 3' }, { id: 4, cardText: 'CARD 4' }, {
        id: 5,
        cardText: 'CARD 5'
      }, { id: 6, cardText: 'CARD 6' }]
    }),
    created() {
      //this.activeItem = this.items[0];
    }
  }
</script>

<style scoped>
  .button-active {
    background-color: red;
    color: white;
  }
</style>
