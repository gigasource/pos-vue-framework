<template>
  <div>
    <g-text-field-functional clearable
                             prefix="prefix"
                             suffix="?"
                             type="password"
                             outlined
                             shaped
                             hint="Hey I'm nonsense hint!"
                             label="Text field"
                             counter
                             maxlength="3"
                             v-model="text1"
                             :rules="rules"
                             error-message="Exceeded!"></g-text-field-functional>
  </div>
</template>

<script>
  import GTextFieldFunctional from "../components/GInput/GTextFieldFunctional";

  export default {
    name: "InputDemo",
    components: {GTextFieldFunctional},
    data() {
      return {
        text1: '',
        rules: function (text) {
          return text.length < this.maxlength
        }
      }
    }
  }
</script>

<style scoped>

</style>
