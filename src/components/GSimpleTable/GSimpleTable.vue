<template>
  <div :class="tableClasses" :style="tableStyles">
    <div class="g-data-table__wrapper" :style="wrapperStyles">
      <table>
        <slot></slot>
      </table>
    </div>
  </div>
</template>

<script>
  import {computed} from '@vue/composition-api';
  import {convertToUnit} from '../../utils/helpers';

  export default {
    name: 'GSimpleTable',
    props: {
      dense: Boolean,
      fixedHeader: Boolean,
      bordered: Boolean,
      borderless: Boolean,
      hover: Boolean,
      striped: Boolean,
      textCenter: Boolean,
      height: {type: [Number, String], default: '100%'},
      width: {type: [Number, String], default: '100%'},
    },
    setup(props) {
      let tableClasses = computed(() => {
        return {
          'g-table': true,
          'g-data-table__dense': props.dense,
          'g-data-table__fixed-height': !!props.height && !props.fixedHeader,
          'g-data-table__fixed-width': !!props.width,
          'g-data-table__fixed-header': props.fixedHeader,
          'g-data-table__striped': props.striped,
          'g-data-table__text-center': props.textCenter,
          'g-data-table__bordered': props.bordered,
          'g-data-table__borderless': props.borderless,
          'g-data-table__hover': props.hover
        }
      });

      let tableStyles = computed(() => {
        return {
          width: convertToUnit(props.width)
        }
      });

      let wrapperStyles = computed(() => {
        return {
          height: convertToUnit(props.height),
          width: convertToUnit(props.width)
        }
      });

      return {
        tableClasses,
        tableStyles,
        wrapperStyles
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "GSimpleTable";
</style>
