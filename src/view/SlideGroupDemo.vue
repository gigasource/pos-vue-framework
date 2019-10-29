<template>
	<div style="margin-left: auto; margin-right: auto; max-width: 900px; width: 100%; padding: 12px;" class="demo-wrapper">
		<g-slide-group
				:items="items"
				v-model="activeItem"
				:multiple="multiple"
				:mandatory="mandatory"
				:show-arrows="showArrows"
				:center-active="centerActive">

			<template v-slot:content="{toggle, active}">
				<g-btn v-for="(item, index) in items"
							 :key="index"
							 @click="toggle(item)"
							 :active="active(item)"
							 :class="[active(item) ? activeClass : {}]">
					{{item.text}}
				</g-btn>
			</template>

		</g-slide-group>

		<g-slide-group
				:items="items2"
				v-model="activeItemCard"
				:multiple="multiple"
				:mandatory="mandatory"
				:show-arrows="showArrows"
				:center-active="centerActive">
			<template v-slot:prev>
				<i class="material-icons">remove</i>
			</template>
			<template v-slot:content="{toggle, active}">
				<g-card v-for="n in items2" width="200px" height="300px" @click="toggle(n)" :active="active(n)">
					<g-card-text>
						<p>
							{{n.cardText}}</p>
					</g-card-text>
				</g-card>
			</template>
			<template v-slot:next>
				<i class="material-icons">add</i>
			</template>
		</g-slide-group>
	</div>
</template>

<script>
  import GSlideGroup from '../components/GSlideGroup/GSlideGroup';
  import GCard from '../components/GCard/GCard';
  import {GCardText} from '../components/GCard/GCardFunctionalComponent';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GBtn from '../components/GBtn/GBtn';

  export default {
    name: 'SlideGroupDemo',
    components: { GBtn, GCardTitle, GCardText, GCard, GSlideGroup },
    data: () => {
      return {
        model: null,
        multiple: true,
        mandatory: true,
        showArrows: true,
        prevIcon: false,
        nextIcon: false,
        centerActive: true,
        activeItem: null,
        activeItemCard: null,
				activeItemCards: [],
        activeItems: [],
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
        items2: [{ id: 1, cardText: 'CARD 1' }, { id: 2, cardText: 'CARD 2' }, { id: 3, cardText: 'CARD 3' }, { id: 4, cardText: 'CARD 4' }, { id: 5, cardText: 'CARD 5' }, { id: 6, cardText: 'CARD 6' }]
      }
    }, created() {
      //this.activeItem = this.items[0];
    }
  }
</script>

<style scoped>
	.demo-wrapper * {
		margin: 16px;
	}
	.button-active {
		background-color: red;
		color: white;
	}
</style>
