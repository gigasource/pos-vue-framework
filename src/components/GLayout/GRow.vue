<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api'

  export default {
    name: 'GRow',
    props: {
      alignItems: String,
      alignContent: String,
      justifyContent: String,
      nowrap: Boolean,
      reverse: Boolean,
      noGutters: Boolean,
      dense: Boolean,
    },
    setup(props) {
      const classes = computed(() => ({
        'g-row': true,
        'g-row__dense': props.dense,
        'no-gutters': props.noGutters,
      }));

      const styles = computed(() => ({
        ...props.alignItems && { 'align-items': props.alignItems },
        ...props.alignContent && { 'align-content': props.alignContent },
        ...props.justifyContent && { 'justify-content': props.justifyContent },
        ...props.nowrap && { 'flex-wrap': 'nowrap' },
        ...!props.nowrap && props.reverse && { 'flex-wrap': 'wrap-reverse' },
        ...props.reverse && { 'flex-direction': 'row-reverse' },
      }));

      return {
        classes,
        styles
      }
    },
  }
</script>

<style scoped lang="scss">
	@import "../../style/variables";

	.g-row {
		display: flex;
		flex: 1 1 auto;
		flex-wrap: wrap;

		> .g-col,
		> [class*=col-] {
			padding: 12px;
		}

		&__dense {
			> .g-col,
			> [class*=col-] {
				padding: 4px;
			}
		}

		&.no-gutters {
			margin: 0;

			> .g-col,
			> [class*=col-] {
				padding: 0;
			}
		}

		@for $i from 1 through $grid-columns {
			::v-deep .offset-#{$i} {
				margin-left: percentage($i/$grid-columns);
			}
		}
	}
</style>