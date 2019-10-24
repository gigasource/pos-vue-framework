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
				<g-btn v-for="item in items"
							 @click="toggle(item)"
							 :active="active(item)">
					{{item.text}}
				</g-btn>
			</template>

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
        multiple: true,
        mandatory: false,
        showArrows: true,
        prevIcon: false,
        nextIcon: false,
        centerActive: false,
        activeItem: null,
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
        ]
      }
    }
  }
</script>

<style scoped>
	.demo-wrapper * {
		margin: 16px;
	}
</style>
