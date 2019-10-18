<template>
	<!--	<div :class="tableClasses" :style="tableStyles">-->
	<!--		<div :class="wrapperClasses" :style="wrapperStyles">-->
	<!--			<table>-->
	<!--				<slot></slot>-->
	<!--			</table>-->
	<!--		</div>-->
	<!--		<div>-->
	<!--			<slot name="data-table-footer"></slot>-->
	<!--		</div>-->
	<!--	</div>-->
	<div :class="tableClasses">
		<div class="g-data-table_wrapper">
			<table class="g-data-table-content display">
				<slot></slot>
			</table>
		</div>
		<div>
			<slot name="data-table-footer"></slot>
		</div>
	</div>

</template>

<script>
  import { computed } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GDataTable',
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
          'g-data-table': true,
          'g-data-table__dense': !!props.dense,
          'g-data-table__fixed-height': !!props.height && !props.fixedHeader,
          'g-data-table__fixed-width': !!props.width,
          'g-data-table__fixed-header': props.fixedHeader,
          'g-data-table__striped': !!props.striped,
          'g-data-table__text-center': !!props.textCenter,
        }
      });
      let tableStyles = computed(() => {
        return {
          height: props.height ? convertToUnit(props.height) : '100%',
          width: props.height ? convertToUnit(props.width) : '100%',
        }
      });

      let wrapperClasses = computed(() => {
        return { 'g-data-table__wrapper': true }
      });
      let wrapperStyles = computed(() => {
        return {
          height: props.height ? convertToUnit(props.height) : '100%',
          width: props.height ? convertToUnit(props.width) : '100%',
        }
      });
      return {
        tableClasses,
        wrapperClasses,
        wrapperStyles,
        tableStyles
      }
    }
  }
</script>

<style scoped>
</style>
