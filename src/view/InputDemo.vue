<template>
  <div>
<!--    <fieldset>-->
<!--      <legend>Default</legend>-->
<!--      <g-text-field-functional label="Default" persistent hint="This is persistent hint">-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="Prepend outer && non presistent hint"-->
<!--                               hint="This is persistent hint">-->
<!--        <template v-slot:prepend-outer >-->
<!--          <img src="../assets/delivery/avatar.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="Prepend inner"-->
<!--                               persistent hint="This is persistent hint">-->
<!--        <template v-slot:prepend-inner >-->
<!--          <img src="../assets/delivery/avatar.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="Has prefix" prefix="prefix"-->
<!--                               persistent hint="This is persistent hint">-->
<!--        <template v-slot:prepend-inner >-->
<!--          <img src="../assets/delivery/avatar.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="Has suffix" suffix="###"></g-text-field-functional>-->
<!--      <g-text-field-functional label="Append inner">-->
<!--        <template v-slot:append-inner  >-->
<!--          <img src="../assets/delivery/cancel.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="Append outer">-->
<!--        <template v-slot:append-outer >-->
<!--          <img src="../assets/delivery/cancel.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="With counter" counter maxlength="25">-->

<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="With rule"-->
<!--                               hint="5 characters max!"-->
<!--                               persistent-->
<!--                               counter-->
<!--                               maxlength="5"-->
<!--                               :rules="rules"-->
<!--                               error-message="Exceeded!">-->

<!--      </g-text-field-functional>-->
<!--    </fieldset>-->
<!--    <fieldset>-->
<!--      <legend>Solo: placeholder instead of label</legend>-->
<!--      <g-text-field-functional placeholder="Solo"-->
<!--                               solo-->
<!--                               persistent-->
<!--                               hint="This is persistent hint">-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="Prepend outer && non presistent hint"-->
<!--                               solo-->
<!--                               hint="This is persistent hint">-->
<!--        <template v-slot:prepend-outer >-->
<!--          <img src="../assets/delivery/avatar.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="Prepend inner"-->
<!--                               solo-->
<!--                               persistent hint="This is persistent hint">-->
<!--        <template v-slot:prepend-inner >-->
<!--          <img src="../assets/delivery/avatar.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="Has prefix"-->
<!--                               solo-->
<!--                               prefix="prefix"-->
<!--                               persistent-->
<!--                               hint="This is persistent hint">-->
<!--        <template v-slot:prepend-inner >-->
<!--          <img src="../assets/delivery/avatar.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="Has suffix"-->
<!--                               solo-->
<!--                               suffix="###"></g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="Append inner">-->
<!--        <template v-slot:append-inner  >-->
<!--          <img src="../assets/delivery/cancel.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="Append outer"-->
<!--                               solo>-->
<!--        <template v-slot:append-outer >-->
<!--          <img src="../assets/delivery/cancel.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="With counter"-->
<!--                               solo-->
<!--                               counter-->
<!--                               maxlength="25">-->

<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="With rule"-->
<!--                               solo-->
<!--                               hint="5 characters max!"-->
<!--                               persistent-->
<!--                               counter-->
<!--                               maxlength="5"-->
<!--                               :rules="rules"-->
<!--                               error-message="Exceeded!">-->

<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="Solo outlined"-->
<!--                               solo-->
<!--                               outlined-->
<!--                               persistent-->
<!--                               hint="This is persistent hint">-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional placeholder="Solo flat"-->
<!--                               solo-->
<!--                               flat-->
<!--                               persistent-->
<!--                               hint="This is persistent hint">-->
<!--      </g-text-field-functional>-->
<!--    </fieldset>-->
    <fieldset>
<!--      <legend>Filled</legend>-->
<!--      <g-text-field-functional label="Filled"-->
<!--                               filled-->
<!--                               persistent-->
<!--                               hint="This is persistent hint">-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="Prepend outer && non presistent hint"-->
<!--                               filled-->
<!--                               hint="This is persistent hint">-->
<!--        <template v-slot:prepend-outer >-->
<!--          <img src="../assets/delivery/avatar.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="Prepend inner"-->
<!--                               filled-->
<!--                               persistent hint="This is persistent hint">-->
<!--        <template v-slot:prepend-inner >-->
<!--          <img src="../assets/delivery/avatar.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
      <g-text-field-functional label="Has prefix"
                               filled
                               clearable
                               counter="25"
                               prefix="prefix"
                               suffix="@gmail.com"
                               hint="This is persistent hint"
                               :rules="[rules.required, rules.counter]"
                               validate-on-blur
      >
        <template v-slot:prepend-inner >
          <img src="../assets/delivery/avatar.svg" alt="avatar">
        </template>
        <template v-slot:prepend-outer >
          <img src="../assets/delivery/avatar.svg" alt="avatar">
        </template>
        <template v-slot:append-inner >
          <img src="../assets/delivery/avatar.svg" alt="avatar">
        </template>
        <template v-slot:append-outer >
          <img src="../assets/delivery/avatar.svg" alt="avatar">
        </template>
      </g-text-field-functional>
<!--      <g-text-field-functional label="Has suffix"-->
<!--                               filled-->
<!--                               suffix="###"></g-text-field-functional>-->
<!--      <g-text-field-functional label="Append inner">-->
<!--        <template v-slot:append-inner  >-->
<!--          <img src="../assets/delivery/cancel.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="Append outer"-->
<!--                               filled>-->
<!--        <template v-slot:append-outer >-->
<!--          <img src="../assets/delivery/cancel.svg" alt="avatar">-->
<!--        </template>-->
<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="With counter"-->
<!--                               filled-->
<!--                               counter-->
<!--                               maxlength="25">-->

<!--      </g-text-field-functional>-->
<!--      <g-text-field-functional label="With rule"-->
<!--                               clearable-->
<!--                               filled-->
<!--                               hint="5 characters max!"-->
<!--                               persistent-->
<!--                               counter-->
<!--                               maxlength="5"-->
<!--                               :rules="[ rules.counter]"-->
<!--                               v-model="text1"-->
<!--                               error-message>-->

<!--      </g-text-field-functional>-->
    </fieldset>
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
        rules: {
          required: value => !!value || 'Required',
          counter: value => value.length > 4 || 'Min 5 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail'
          }
        }
      }
    },
    created() {
      document.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');
      });

      window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
      });

    }
  }

</script>

<style scoped>

</style>
