<template>
  <g-tree-view-json :data="data" :expand-level="1"></g-tree-view-json>
</template>
<script>

  import GTreeViewJson from '../components/GTreeViewFactory/GTreeViewJson';
  export default {
    name: 'TreeViewDemo',
    components: { GTreeViewJson },
    data() {
      return {
        data: {
          a: "abc",
          b: ["Hello there", 3],
          c: {
            e: 'asdasd',
            f: 1,
            d: true,
            gasdqweasvasd: '123asdsebrthse5ts56nsyrd5tbesawaraw45346546hsr5ytetse4vserfsversdrtbdrtydrtydrtybdrtydrtybdrtybdrty',
            gasdqweasvasd1: { x: 12, y: false } ,
            gasdqweasvasd2: 14,
            gasdqweasvasd123123asd: 12
          },
        }
      }
    }
  }
</script>
<style scoped>
</style>
