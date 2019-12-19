<template>
	<g-icon-chooser-input-model label="Abc" :field="field" :model="model"/>
</template>
<script>
  import GIconChooserInputModel from '../components/GIconChooser/GIconChooserInputModel';
	export default {
    name: 'app',
    components: { GIconChooserInputModel },
		data() {
    	return {
				field: { key: 'icon' },
				model: { icon: '' }
			}
		}
  }
</script>
