<template>
	<div>
		<fieldset>
			<legend>Checkbox</legend>
			Value: {{cbvalue}}
			<g-checkbox label="checkbox 1&2" v-model="cbvalue" :value="cbvalue5"></g-checkbox>
			<g-checkbox label="check box 1" v-model="cbvalue" value="CB1" color="#1271ff"></g-checkbox>
			<g-checkbox label="check box 2" v-model="cbvalue" value="CB2" color="amber"></g-checkbox>
			State:
			<g-checkbox label="indeterminate" v-model="cbvalue2" color="#ff4452" indeterminate></g-checkbox>
			<g-checkbox label="required" v-model="cbvalue3" required></g-checkbox>
			<g-checkbox label="readonly off" v-model="cbvalue3" color="cyan lighten 3" readonly></g-checkbox>
			<g-checkbox label="readonly on" v-model="cbvalue4" color="cyan lighten 3" readonly></g-checkbox>
			<g-checkbox label="disabled off" v-model="cbvalue3" disabled></g-checkbox>
			<g-checkbox label="disabled on" v-model="cbvalue4" disabled></g-checkbox>
		</fieldset>
		<fieldset>
			<legend>Radio</legend>
			 Value: {{rvalue}}
			<g-radio-group v-model="rvalue" name="radio" label="Vertical Group">
				<g-radio label="Radio a" value="a"></g-radio>
				<g-radio label="Radio b" value="b" color="#1271ff"></g-radio>
			</g-radio-group>
			 Value: {{rvalue2}}
			<g-radio-group v-model="rvalue2" name="radio2" label="Horizontal Group" row>
				<g-radio label="Radio c" value="c" color="amber accent 3"></g-radio>
				<g-radio label="Radio d" value="d" color="rgba(242, 29, 97, 0.8)"></g-radio>
			</g-radio-group>
		</fieldset>
		<fieldset>
			<legend>Switch</legend>
			Value: {{svalue}}
			<g-switch v-model="svalue" value="blue" label="Switch"></g-switch>
			<g-switch v-model="svalue" value="red" label="Switch Color Red" color="red"></g-switch>
			<g-switch v-model="svalue" value="flat" label="Flat Switch" flat></g-switch>
			<g-switch v-model="svalue" value="inset" label="Inset Switch" inset></g-switch>
		</fieldset>
	</div>
</template>

<script>
  import GCheckbox from '../components/GCheckbox/GCheckbox';
  import GRadioGroup from '../components/GRadio/GRadioGroup';
  import GRadio from '../components/GRadio/GRadio';
  import GSwitch from '../components/GSwitch/GSwitch';

  export default {
    name: 'Demo',
    components: { GSwitch, GRadio, GRadioGroup, GCheckbox },
    data() {
      return {
        cbvalue: ['CB1'],
				cbvalue2: null,
				cbvalue3: null,
				cbvalue4: 'true',
				cbvalue5: ['CB1', 'CB2'],
				rvalue: 'a',
				rvalue2: 'c',
				svalue: [],
      }
    }
  }
</script>

<style scoped>

</style>