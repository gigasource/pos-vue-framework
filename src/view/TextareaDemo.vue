<template>
  <div>
    <g-textarea rows="3" autofocus outlined auto-grow></g-textarea>
    <form>
      <label for="textarea">Primitive textarea</label>
      <div>
        <textarea v-model="value" id="textarea"></textarea>
        <p>Message: {{value}}</p>
      </div>
    </form>
  </div>
</template>

<script>
  import GTextarea from "../components/GTextarea/GTextarea";

  export default {
    name: "Textarea",
    components: {GTextarea},
    data: function () {
      return {
        value: 'attack'
      }
    }
  }
</script>

<style scoped>
</style>
