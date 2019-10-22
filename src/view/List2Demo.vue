<template>
  <g-list :items="items" selectable>
    <template v-slot:default="{item, isSelected}">
      <g-list-item :class="{'g-list-item__active': isSelected}">
        <g-list-item-content>
          <g-list-item-text >{{item.title}}</g-list-item-text>
        </g-list-item-content>
      </g-list-item>
    </template>
  </g-list>
</template>
<script>
  import GList from "../components/GList/GList";
  import GListItem from '../components/GList/GListItem';
  import GDivider from '../components/GLayout/GDivider';
  import { GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader} from '../components/GList/GListFunctionalComponent'

  export default {
    name: "List2Demo",
    components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
    data() {
      return {
        items: [
          {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
          {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
          {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
          {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},

        ]
      }
    }
  }
</script>

<style scoped>

</style>
