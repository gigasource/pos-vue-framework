<template>
  <div style="width: 600px">
    <g-text-field-functional></g-text-field-functional>
    <g-tear no-resize rows="3" outlined></g-tear>
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
  import GTear from "../components/GTextarea/GTextarea2";
  import GIcon from "../components/GIcon/GIcon";
  import GTextField from "../components/GInput/GTextField";
  import GTextFieldFunctional from "../components/GInput/GTextFieldFunctional";

  export default {
    name: "Textarea",
    components: {GTextFieldFunctional, GTextField, GIcon, GTear},
    data: function () {
      return {
        value: 'attack'
      }
    }
  }
</script>

<style scoped>
</style>
