<template>
	<div>
		<fieldset>
			<legend>Checkbox</legend>
			Value: {{cbvalue}}
			<g-checkbox label="checkbox 1&2" v-model="cbvalue" :value="allValue" multiple></g-checkbox>
			<g-checkbox label="check box 1" v-model="cbvalue" :value="cb1" color="#1271ff"></g-checkbox>
			<g-checkbox label="check box 2" v-model="cbvalue" :value="cb2" color="amber"></g-checkbox>
			State:
			<g-checkbox label="indeterminate" v-model="cbvalue2" color="#ff4452" indeterminate></g-checkbox>
			<g-checkbox label="required" v-model="cbvalue3" required></g-checkbox>
			<g-checkbox label="readonly off" color="cyan lighten 3" readonly></g-checkbox>
			<g-checkbox label="readonly on" v-model="cbvalue4" color="cyan lighten 3" readonly></g-checkbox>
			<g-checkbox label="disabled off" disabled></g-checkbox>
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
			State
			<g-radio label="Radio disabled off" disabled></g-radio>
			<g-radio label="Radio disabled on" value="a" input-value="a" disabled></g-radio>
			<g-radio label="Radio readonly off" readonly></g-radio>
			<g-radio label="Radio readonly on" value="a" input-value="a" readonly></g-radio>
		</fieldset>
		<fieldset>
			<legend>Switch</legend>
			Value: {{svalue}}
			<g-switch v-model="svalue" value="blue" label="Switch"></g-switch>
			<g-switch v-model="svalue" value="red" label="Switch Color Red" color="red"></g-switch>
			<g-switch v-model="svalue" value="flat" label="Flat Switch" flat></g-switch>
			<g-switch v-model="svalue" value="inset" label="Inset Switch" inset></g-switch>
			State
			<g-switch label="Switch disabled on" input-value="true" disabled></g-switch>
			<g-switch label="Switch disabled off"  disabled></g-switch>
			<g-switch label="Switch readonly on" input-value="true" readonly></g-switch>
			<g-switch label="Switch readonly off" readonly></g-switch>
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
        cbvalue: [],
				cbvalue2: null,
				cbvalue3: null,
				cbvalue4: 'true',
				cbvalue5: ['CB1', 'CB2'],
				rvalue: 'a',
				rvalue2: 'c',
        rvalue3: 'asdasd',
				svalue: [],
				cb1: {a: 'CB1'},
        cb2: {a: 'CB2'},
        allValue: []
      }
    },
		created() {
      this.allValue = [this.cb1, this.cb2]
		}
  }
</script>

<style scoped>

</style>