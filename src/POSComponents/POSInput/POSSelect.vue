<script>
    import GSelect from "../../components/GSelect/GSelect";

    export default {
        name: "POSSelect",
        mixins: [GSelect],
        props: {}
    }
</script>

<style scoped lang="scss">
  .g-select::v-deep {
    .g-menu--activator {
      span {
        margin: 3px
      }

      .g-tf-wrapper {
        margin: 16px 0px 24px;
      }

      .g-tf {
        background-color: #F0F0F0;
        border-radius: 2px;
      }


      .g-tf::before, .g-tf::after {
        display: none;
      }

      .g-tf-input {
        display: flex;
      }

      .input {
        height: 40px;
        display: flex;
        padding: 4px 16px;

        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
      }

      .g-tf-label {
        top: -28px;
        font-size: 13px;
        line-height: 16px;
        color: #1D1D26;
      }

      .g-tf-label__active {
        transform: none;
      }

      .g-tf-append__inner {
        display: flex;
        align-items: center;
        margin: 4px;
        transition: transform 0.4s;

        .g-icon {
          color: #000000 !important;
        }
      }

      .g-list-item {
        padding: 0;
      }

      input {
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: 0%;
        padding: 0;
      }

    }
  }

  .g-select__active::v-deep {
    .g-tf-append__inner .g-icon:last-child {
      transform: rotateZ(180deg);
    }
  }

  * {
    border: none;
  }

  .g-tf-wrapper::v-deep {

  }

  /*.g-tf__filled {*/
  /*  .g-tf-input::v-deep {*/
  /*    box-shadow: none !important;*/
  /*    padding: 11px 16px !important;*/
  /*  }*/
  /*}*/
</style>