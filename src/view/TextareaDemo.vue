<template>
  <div>
    <g-textarea v-model="value" auto-grow rows="5" autofocus></g-textarea>
    <p>{{value}}</p>
    <textarea></textarea>
  </div>
</template>

<script>
  import GTextarea from "../components/GTextarea/GTextarea";

  export default {
    name: "Textarea",
    components: {GTextarea},
    props: {
      value: 'Attack'
    }
  }
</script>

<style scoped>

</style>
