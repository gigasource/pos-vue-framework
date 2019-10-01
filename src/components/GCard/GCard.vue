<template>
	<div :class="classes" :style="styles">
		<div class="g-card-content">
			<slot name="default"></slot>
			<slot name="progress"></slot>
		</div>
	</div>
</template>

<script>
  import GCardText from './GCardText';
  import GCardTitle from './GCardTitle';
  import GCardActions from './GCardActions';
  import GTextField from '../GInput/GTextField';

  export default {
    name: 'GCard',
    components: { GTextField, GCardActions, GCardTitle, GCardText },
    props: {
      disabled: Boolean,
      isClickable: Boolean,
      loading: Boolean,
      flat: Boolean,
      hover: Boolean,
			minWidth: String,
      maxWidth: String,
      minHeight: String,
      maxHeight: String,
      width: String,
      height: String,
      img: String,
      link: Boolean,
      loaderHeight: {
        type: [Number, String],
        default: 4,
      },
      outlined: Boolean,
      raised: Boolean,
    },
    computed: {
      classes() {
        return {
          'g-card': true,
          'g-card-flat': this.flat,
          'g-card-hover': this.hover,
          'g-card-link': this.isClickable,
          'g-card-loading': this.loading,
          'g-card-disabled': this.loading || this.disabled,
          'g-card-outlined': this.outlined,
          'g-card-raised': this.raised,
        }
      },
			styles() {
        let style = {};
				if(this.minWidth) {
					Object.assign(style, {'min-width': this.minWidth});
				}
				if(this.minHeight) {
          Object.assign(style, {'min-height': this.minHeight});
				}

				if(this.maxWidth) {
          Object.assign(style, {'max-width': this.maxWidth});
				}

				if(this.maxHeight) {
          Object.assign(style, {'max-height': this.maxHeight});
				}
				return style;
			}
    }


  }
</script>

<style scoped></style>
