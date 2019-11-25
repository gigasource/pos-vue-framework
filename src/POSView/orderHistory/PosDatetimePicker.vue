<template>
  <g-date-picker no-title range range-color="#2979FF"></g-date-picker>
</template>

<script>
  import GDatePicker from '../../components/GDatePicker/GDatePicker';

  export default {
    name: 'PosDatetimePicker',
    components: { GDatePicker }
  }
</script>

<style lang="scss" scoped>
  .g-picker {
    box-shadow: none;
    margin: 0 2px 0 2px;
    width: 98%;

    ::v-deep .g-picker__body {
      width: 100% !important;

      .g-date-picker-table {
        border-spacing: 0 !important;

        tbody {
          border-spacing: 0;
          border-collapse: collapse;
        }

        .g-table-item--active {
          background-color: #2979FF !important;
          border-color: #2979FF !important;
        }

        .g-table-item__background--in-range {
          background-color: #2979FF !important;
          opacity: 0.14 !important;
        }

        .g-table-item--in-range {
          background-color: transparent !important;
        }

        .g-table-item__background--start-range {
          background-color: #2979FF !important;
          opacity: 0.24 !important;
        }

        .g-table-item__background--end-range {
          background-color: #2979FF !important;
          opacity: 0.24 !important;
        }

      }


    }
  }

</style>
