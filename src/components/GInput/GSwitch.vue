<template>
	<div class="col-flex">
		<p class="fw-400 fs-small-2">{{label}}</p>
		<label class="switch br-4 mt-2" :style="switchStyle">
			<input :id="id" class="switch-input" type="checkbox" :value="value">
			<span class="switch-round"></span>
		</label>
	</div>
</template>

<script>
  export default {
    name: 'GSwitch',
    props: {
      id: String,
      disabled: Boolean,
			readonly: Boolean,
			label: String,
      value: [String, Boolean, Number, Array, Object],
		},
		computed: {
      switchStyle() {
        let style = {width: '2.25rem', height: '0.875rem'};
        if(this.readonly) {
          Object.assign(style, {'pointer-events': 'none'});
				}
        if(this.disabled) {
          Object.assign(style, {'pointer-events': 'none', 'opacity': '0.2'});
				}
        return style;
			}
		}
  }
</script>

<style scoped>

</style>