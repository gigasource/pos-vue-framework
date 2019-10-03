<template>
  <div>
    <g-text-field-functional clearable bordered v-model="text1" label="label" :rules="rules" error-message="error"></g-text-field-functional>
  </div>
</template>

<script>
  import GTextFieldFunctional from "../components/GInput/GTextFieldFunctional";
  import GTextField from "../components/GInput/GTextField";

  export default {
    name: "InputDemo",
    components: {GTextFieldFunctional},
    data() {
      return {
        text1: '123',
        rules: function (text) {
          return text.length < 5
        }
      }
    }
  }
</script>

<style scoped>

</style>
