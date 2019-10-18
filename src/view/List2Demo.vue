<template>
  <g-list :items="items" rounded dense subheader="subheader" divider=inset>
  </g-list>
</template>
<script>
  import GList from "../components/GList/GList";

  export default {
    name: "List2Demo",
    components: {GList},
    data() {
      return {
        items: [
          {subheader: 'User', type: 'subheader'},
          {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
          {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
          {type: 'divider'},
          {subheader: 'Admin', type:'subheader'},
          {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
          {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},

        ]
      }
    }
  }
</script>

<style scoped>

</style>
