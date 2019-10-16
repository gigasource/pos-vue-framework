<template>
	<div :class="tableClasses">
		<div :class="wrapperClasses" :style="wrapperStyles">
			<table>
				<slot></slot>
			</table>
		</div>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GSimpleTable',
    props: {
      dense: Boolean,
      fixedHeader: Boolean,
			striped: Boolean,
			textCenter: Boolean,
      height: [Number, String],
      width: [Number, String],
    },
    setup(props, context) {
      let tableClasses = computed(() => {
        return {
          'g-table': true,
          'g-data-table__dense': !!props.dense,
          'g-data-table__fixed-height': !!props.height && !props.fixedHeader,
          'g-data-table__fixed-width': !!props.width,
          'g-data-table__fixed-header': props.fixedHeader,
          'g-data-table__striped': !!props.striped,
          'g-data-table__text-center': !!props.textCenter,
        }
      });

      let wrapperClasses = computed(() => {
        return { 'g-data-table__wrapper': true }
      });

      let wrapperStyles = computed(() => {
        return {
          height: props.height ? convertToUnit(props.height) : '100%',
        }
      });

      return {
        tableClasses,
        wrapperClasses,
				wrapperStyles
      }
    }
  }
</script>

<style scoped>

</style>
