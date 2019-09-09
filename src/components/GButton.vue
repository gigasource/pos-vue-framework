<template>
	<button :class="buttonClass" :style="buttonStyle" @click="onClick">
		<slot>{{text}}</slot>
	</button>
</template>

<script>
  export default {
    name: 'GButton',
    props: {
      raised: Boolean,
      depressed: Boolean,
      disabled: Boolean,
      flat: Boolean,
      icon: Boolean,
      outline: Boolean,
      dashed: Boolean,
      width: String,
      height: String,
      color: String,
      textColor: String,
      text: String
    },
    computed: {
      buttonClass() {
        return {
          'btn-raised': this.raised,
          'bs-0': this.depressed,
          'disabled': this.disabled,
          'br-100': this.icon,
					'pa-0': this.icon,
          'btn-outline': this.outline,
          'b-dashed': this.dashed
        }
      },
      buttonStyle() {
        let style = {};
        if (this.height) {
          Object.assign(style, { height: this.height });
        }
        if (this.width) {
          Object.assign(style, { width: this.width });
        }
        if (this.outline) {
          Object.assign(style, {
            'border-color': this.color,
            color: this.color
          });
        } else if (this.color) {
          Object.assign(style, { 'border-color': 'transparent', 'background-color': this.color });
        }
        if (this.flat) {
          Object.assign(style, {
            'border-color': 'transparent',
            'background-color': 'transparent'
          });
        }
        if (this.textColor) {
          Object.assign(style, { color: this.textColor });
        }
        return style;
      }
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      }
    }
  }
</script>

<style scoped>

</style>