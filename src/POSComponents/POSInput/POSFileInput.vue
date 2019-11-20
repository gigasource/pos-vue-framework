<script>
  import GFileInput from "../../components/GFileInput/GFileInput";

  export default {
    name: "POSFileInput",
    mixins: [GFileInput],
  }
</script>

<style scoped lang="scss">
  @import "../../components/GFileInput/_GFileInput.scss";

  .g-tf::v-deep {
    height: 192px;
    width: 268px;
    margin-top: 30px;
    //border: 1px solid #C9C9C9;
    background-image: url("./FileInputImage.png");
    background-size: contain;
    cursor: pointer;

    .g-tf-label {
      top: -26px;
      left: 0 !important;
      font-size: 16px;
      line-height: 16px;
      color: #1D1D26;

      &__active {
        transform: none;
      }
    }
  }

  .g-tf::before, .g-tf::after {
    display: none;
  }

  .g-tf-wrapper {
    fieldset {
      width: auto;
    }
  }

  .g-file-input--text {
    position: absolute;
    width: 106px !important;
    border: 1px;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    top: 32px;
    left: 0;
    right: 0;
  }

  .g-tf-prepend__inner {
    display: none;
  }

  .g-tf-append__inner {
    position: absolute;
    right: 4px;
  }

</style>