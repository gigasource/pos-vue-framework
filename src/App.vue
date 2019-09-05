<template>
  <div id="app" class="vertical-body-responsive-wrapper">
    <g-text-field v-model="text">
      <template v-slot:label>
        <span>DM tuns</span>
        <span class="red-1">*</span>
      </template>
      <template v-slot:append>
        <img src="./assets/config/filter.svg">
      </template>
    </g-text-field>
		<g-text-field :clearable="true" class="mt-2"></g-text-field>
    <g-divider :inset="true" :dotted="true"></g-divider>
		<g-list :width="`200px`" :height="`50px`">
			<g-list-item>aaaa</g-list-item>
			<g-divider :inset="true" :color="`#891237`"></g-divider>
			<g-list-item>bbbb</g-list-item>
			<g-list-item>
				<img src="./assets/delivery/avatar.svg">
				<span>Admin</span>
			</g-list-item>
		</g-list>
		<g-switch :label="`hello`"></g-switch>
		<g-radio-group>
			<g-radio :label="`ads`" :name="`asd`"></g-radio>
			<g-radio :label="`adsasd`" :name="`asd`"></g-radio>
		</g-radio-group>
    <g-toolbar :tile="true" :height="`10%`" :dark="true">
        <g-button :color="color" :raised="true" :width="`100px`">
            <img src="./assets/config/setting.svg">
            Setting
        </g-button>
    </g-toolbar>
  </div>
</template>

<script>
// Todo: functional API: v-input default props, basic events

import GTextField from './components/GInput/GTextField';
import GButton from './components/GButton';
import GDivider from './components/GDivider';
import GToolbar from './components/GToolbar';
import GList from './components/GList/GList';
import GSwitch from './components/GInput/GSwitch';
import GListItem from './components/GList/GListItem';
import GRadioGroup from './components/GInput/GRadioGroup';
import GRadio from './components/GInput/GRadio';
export default {
  name: 'app',
  components: { GRadio, GRadioGroup, GListItem, GSwitch, GList, GToolbar, GDivider, GButton, GTextField },
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
