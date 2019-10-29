<template>
  <div>
    <g-file-input multiple counter readonly smallChips show-size label="label"></g-file-input>
    <g-file-input multiple
                  counter
                  readonly
                  smallChips
                  show-size
                  label="gau do"
                  placeholder="placeholder"
                  prepend-icon="person"
                  append-icon="home"
                  append-outer-icon="person"></g-file-input>
  </div>
</template>

<script>
  import GFileInput from "../components/GFileInput/GFileInput";

  export default {
    components: {GFileInput},
    data() {
      return {
        text: 'fileinput.zip'
      }
    },
    name: "FileInputDemo"
  }
</script>

<style scoped>

</style>
