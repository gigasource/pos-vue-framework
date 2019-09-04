<template>
  <div id="app">
    <g-text-field v-model="text">
      <template v-slot:label>
        <span>DM tuns</span>
        <span class="red-1">*</span>
      </template>
      <template v-slot:append>
        <img src="./assets/config/filter.svg">
      </template>
    </g-text-field>
    <g-button :color="color" :raised="true" :height="`100px`" :width="`100px`">
      <template v-slot:content>
        <img src="./assets/config/setting.svg">
        Setting
      </template>
    </g-button>
    <g-divider :inset="true" :dotted="true"></g-divider>
  </div>
</template>

<script>
// Todo: functional API: v-input default props, basic events

import GTextField from './components/GInput/GTextField';
import GButton from './components/GButton';
import GDivider from './components/GDivider';
export default {
  name: 'app',
  components: { GDivider, GButton, GTextField },
  data() {
    return {
      text: 'OK',
      color: '#eeeeee'
    }
  }
}
</script>

<style>
#app {
}
</style>
