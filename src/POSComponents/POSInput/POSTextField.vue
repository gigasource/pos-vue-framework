<script>
    import GTextFieldBs from "../../components/GInput/GTextFieldBs";

    export default {
        name: "POSTextField",
        mixins: [GTextFieldBs],
    }
</script>

<style scoped lang="scss">
  @import "../../components/GInput/GInputField";

  .bs-tf-wrapper {
    display: block;
    cursor: text;
    width: calc(100% - 10px);
    margin: 4px 5px 8px;
  }

  .bs-tf-label {
    display: inline-block;
    margin-bottom: 4px;
    font-weight: 400;
  }

  .bs-tf-input-group {
    display: flex;
    background-color: #F0F0F0;
    border: 1px solid;
    border-radius: 2px;
    color: #8e8e8e;
  }

  .bs-tf-inner-input-group {
    //todo move border from input group to inner input group
  }

  .bs-tf-inner-input-group__active {
    border: 2px solid #1471FF !important;
    box-shadow: none;
  }

  .bs-tf-input-prepend {
    border-right: 1px solid;
  }

  .bs-tf-input-append {
    border-left: 1px solid;
  }

  .bs-tf-input-text {
    display: flex;
    align-items: center;
    padding: 4px 10px;
    font-size: 20px;
    line-height: 1.5;
    font-weight: 400;
    color: #8e8e8e;
    background-color: #FFFFFF;
    white-space: nowrap;
    text-align: center;

  }

  .bs-tf-input {
    display: block;
    flex: 1 1 auto;
    padding: 4px 10px;
    line-height: 1.5;
    font-size: 20px;
    background-color: #F0F0F0;
    background-clip: padding-box;
    color: #000000;
  }

  /*.bs-tf-input:focus {*/
  /*  outline: 0;*/
  /*  border: 2px solid #1471FF !important;*/
  /*  box-shadow: none;*/
  /*}*/

  .bs-tf-message {
    display: block;
    font-size: 80%;
    font-weight: 400;
    margin-top: 2px;
    color: #6c757d;
  }

  .input-error {
    border-color: red !important;
  }

  .bs-tf-error-message {
    @extend .bs-tf-message;
    color: red;
  }

</style>