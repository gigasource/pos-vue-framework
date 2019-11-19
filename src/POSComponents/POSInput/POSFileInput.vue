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
    //todo fix border
    //todo fix height
    //todo fix background color
    .g-tf-label {
      top: -28px;
      font-size: 13px;
      line-height: 16px;
      color: #1D1D26;
    }
  }

  .g-file-input--text {

  }

</style>