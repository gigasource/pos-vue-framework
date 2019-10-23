<template>
	<div>
<div>
	<p>Single select chip group</p>
	<g-chip-group :items="items" v-model="activeItem" column @click:close="removeItem">
		<template v-slot:item="{value, click, active, close}">{{value.text}}</template>
	</g-chip-group>
</div>

		<p>Multiple select chip group</p>
		<g-chip-group :items="items2" v-model="activeItems" multiple max-selection="3">
			<template v-slot:item="{value, click, active, close}">{{value.text}}</template>
		</g-chip-group>

	</div>

</template>

<script>
  import GChipGroup from '../components/GChipGroup/GChipGroup';
  import GChip from '../components/GChip/GChip';
  import GCard from '../components/GCard/GCard';
  import GCardText from '../components/GCard/GCardText';
  import _ from 'lodash'

  export default {
    name: 'GChipGroupDemo',
    components: { GCardText, GCard, GChip, GChipGroup },
    data: () => {
      return {
        items: [
          { id: 1, text: 'BMW', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 2, text: 'Toyota', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 3, text: 'Mercedes', prependIcon: '', appendIcon: '', disabled: true, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 4, text: 'Ford', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 5, text: 'Lexus', prependIcon: '', appendIcon: '', disabled: true, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 6, text: 'Audi', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 7, text: 'Maserati', prependIcon: '', appendIcon: '', disabled: true, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 8, text: 'Mazda', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
        ],
        items2: [
          { id: 1, text: 'Silver', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 2, text: 'Elite', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 3, text: 'Gold', prependIcon: '', appendIcon: '', disabled: true, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 4, text: 'Guardian', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 5, text: 'Nova', prependIcon: '', appendIcon: '', disabled: true, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 6, text: 'Legendary', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 7, text: 'Supreme', prependIcon: '', appendIcon: '', disabled: true, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
          { id: 8, text: 'Global', prependIcon: '', appendIcon: '', disabled: false, active: false, close: true, filter: true, color: 'bg-blue', textColor: 'white' },
        ],

        activeItem: null,
        activeItems: [],
      }
    },
    created() {
      this.activeItem = this.items[0];
    },
    methods: {
      removeItem(item) {
        console.log(item.id);
      }
    }
  }
</script>

<style scoped>

</style>
