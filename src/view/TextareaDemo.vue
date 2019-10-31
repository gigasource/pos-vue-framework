<template>
  <div style="width: 600px">
    <g-text-field v-model="value" solo outlined filled prependIcon="person" clearable></g-text-field>
    <g-textarea v-model="value"
                label="label"

                prependIcon="person"
                prependInnerIcon="person"
                appendIcon="person"
                appendOuterIcon="person"
                clearable></g-textarea>
    <form>
      <label for="textarea">Primitive textarea</label>
      <div>
        <textarea id="textarea"></textarea>
        <p>Message: {{value}}</p>
      </div>
    </form>
  </div>
</template>

<script>
  import GTextarea from "../components/GTextarea/GTextarea";
  import GIcon from "../components/GIcon/GIcon";
  import GTextField from "../components/GInput/GTextField";

  export default {
    name: "Textarea",
    components: {GTextarea, GTextField, GIcon},
    data: function () {
      return {
        value: 'attack'
      }
    }
  }
</script>

<style scoped>
</style>
