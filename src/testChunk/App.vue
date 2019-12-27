<template>
	<div>
		<g-icon-chooser-input-model label="Abc" :field="iconField" :model="model"/>
		<g-grid-generator-input label="grid" :field="gridField" :model="model"/>
		<g-color-picker-input-model label="color" :field="colorField" :model="model"/>
	</div>
</template>
<script>
  import GIconChooserInputModel from '../components/GIconChooser/GIconChooserInputModel';
	import GGridGeneratorInput from '../components/GGridGenerator/GGridGeneratorInput';
	import GColorPickerInputModel from '../components/GColorPicker/GColorPickerInputModel';
	export default {
    name: 'app',
    components: { GColorPickerInputModel, GGridGeneratorInput, GIconChooserInputModel },
		data() {
    	return {
				iconField: { key: 'icon' },
				gridField: { key: 'layout' },
				colorField: { key: 'color' },
				model: { icon: '', layout: null, color: '' }
			}
		}
  }
</script>
