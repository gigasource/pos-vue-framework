<script>
    import GSelect from "../../components/GSelect/GSelect";

    export default {
        name: "POSSelect",
        mixins: [GSelect],
        props: {

        }
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

      .g-tf-append__inner {
        transition: transform 0.4s
      }

      .g-tf-input {
        display: flex;
      }

      .input {
        display: flex;
      }

      input {
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: 0%;
      }

    }
  }

  .g-select__active::v-deep {
    .g-tf-append__inner .g-icon:last-child {
      transform: rotateZ(180deg);
    }
  }

  /*.g-tf__filled {*/
  /*  .g-tf-input::v-deep {*/
  /*    box-shadow: none !important;*/
  /*    padding: 11px 16px !important;*/
  /*  }*/
  /*}*/
</style>