<template>
  <g-file-input multiple counter readonly smallChips show-size></g-file-input>
</template>

<script>
  import GFileInput from "../components/GFileInput/GFileInput";
  import GTextField from "../components/GInput/GTextField";

  export default {
    components: {GFileInput,GTextField},
    data() {
      return{
        text:'file input'
      }
    },
    name: "FileInputDemo"
  }
</script>

<style scoped>

</style>
