<template>
  <div style="height: 100%">
    <g-btn @click="switchDashboard">Switch Dashboard</g-btn>
    <dashboard :style="dashboardStyle"/>
    <dashboard2 :style="dashboardStyle2"/>
  </div>
</template>

<script>
  import Dashboard from "../POSView/Dashboard";
  import Dashboard2 from "../POSView/Dashboard2";
  import {reactive, computed} from "@vue/composition-api"
  import GBtn from "../components/GBtn/GBtn";

  export default {
    name: "DashboardDemo",
    components: {GBtn, Dashboard, Dashboard2},
    setup() {
      const state = reactive({
        display: true
      })

      function switchDashboard() {
        state.display = !state.display
      }

      const dashboardStyle = computed(() => ({'display': state.display ? '' : 'none'}))

      const dashboardStyle2 = computed(() => ({'display': state.display ? 'none' : ''}))


      return {
        switchDashboard,
        dashboardStyle,
        dashboardStyle2
      }
    }
  }
</script>

<style scoped>

</style>