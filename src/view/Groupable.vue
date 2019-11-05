<template>
	<g-container>
		<g-item-group :items="items" v-model="activeItem">
			<template v-slot:item="{item, toggle, active}">
				<g-button width="200px" height="30px" @click="toggle(item)" :class="[active ? activeClass : {}]">{{item.foo}}</g-button>
			</template>
		</g-item-group>

		<g-window :items="items" v-model="activeItem">
			<template v-slot:item="{item}">
				<p style="outline: solid 1px black">
					{{item}}
				</p>
			</template>
		</g-window>
		<g-divider></g-divider>

		<g-item-group :items="items" v-model="activeItems" multiple mandatory>
			<template v-slot:item="{item, toggle, active}">
				<g-button width="200px" height="30px" @click="toggle(item)" :class="[active ? activeClass : {}]">{{item.foo}}</g-button>
			</template>
		</g-item-group>
		<p>
			active items: {{activeItems}}
		</p>
		<g-divider></g-divider>

		<g-tabs v-model="activeItem">
			<template v-slot:tabs="{toggle, isActive}">
				<g-tab v-for="(item, index) in items" :item="item" :key="index">
					<g-button width="200px"
										@click="toggle(item)"
										:key="index"
										:class="{'button-active': isActive(item)}"
					>
						{{index}}
					</g-button>
				</g-tab>
			</template>

			<template v-slot:default="{isActive}">
				<g-tab-item v-for="(item, index) in items" :key="index" v-if="isActive(item)">
					{{item}}
					<g-radio-group>
						<g-radio label="111"></g-radio>
						<g-radio label="222"></g-radio>
					</g-radio-group>
				</g-tab-item>
			</template>
		</g-tabs>
	</g-container>
</template>

<script>

  import GButton from '../components/GButton/GButton';
  import GDivider from '../components/GLayout/GDivider';
  import GRadioGroup from '../components/GRadio/GRadioGroup';
  import GRadio from '../components/GRadio/GRadio';
  import GItemGroup from '../components/GItemGroup/GItemGroup';
  import GItem from '../components/GItemGroup/GItem';
  import GContainer from '../components/GLayout/GContainer';
  import GWindow from '../components/GWindow/GWindow';
  import GTabs from '../components/GTabs/GTabs';
  import GTab from '../components/GTabs/GTab';
  import GTabItem from '../components/GTabs/GTabItem';
  import GTabItems from '../components/GTabs/GTabItems';
  import GLayout from '../components/GLayout/GLayout';

  export default {
    name: 'Groupable',
    components: { GLayout, GTabItems, GTabItem, GTab, GTabs, GWindow, GContainer, GItem, GItemGroup, GRadio, GRadioGroup, GDivider, GButton },
    data() {
      return {
        text: 'OK',
        color: '#eeeeee',
        items: [
          { id: 1, foo: 'bar1' },
          { id: 2, foo: 'bar2' },
          { id: 3, foo: 'bar3' },
          { id: 4, foo: 'bar4' },
        ],
        activeItem: null,
        activeItems: [],
        activeClass: {
          'button-active': true
        }
      }
    },
    created() {
      this.activeItem = this.items[0];
    }
  }
</script>

<style>
	.button-active {
		background-color: red;
		color: white;
	}
</style>
