<template>
  <div>
    <g-dialog v-model="dialog">
      <template v-slot:activator="{ toggleDialog }">
        <g-btn flat text-color="#1271FF" @click="toggleDialog">
          <p>Date Time</p>
          <g-icon svg size="10" right>icon-path-filter</g-icon>
        </g-btn>
      </template>
      <div style="background-color: #FFFFFF">
        <g-date-picker range no-title range-color="#87CEFA" color="#2979FF"/>
        <div>
          <g-btn flat right @click="dialog = false">Cancel</g-btn>
          <g-btn flat right @click="dialog = false">OK</g-btn>
        </div>
      </div>
    </g-dialog>
  </div>
</template>

<script>
    import {ref} from "@vue/composition-api";
    import GDialog from "../../components/GDialog/GDialog";
    import GDatePicker from "../../components/GDatePicker/GDatePicker";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";

    export default {
        name: "DialogPicker",
        components: {GDialog, GDatePicker, GBtn, GIcon},
        setup() {
            const dialog = ref(false)

            return {
                dialog
            }
        }
    }
</script>