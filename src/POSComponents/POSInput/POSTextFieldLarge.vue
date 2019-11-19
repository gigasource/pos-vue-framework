<script>
    import POSTextField from "./POSTextField";

    export default {
        name: "POSTextFieldLarge",
        mixins: [POSTextField],
    }
</script>

<style scoped>
  @import "__POSTextField.scss";
  .bs-tf-input {
    display: block;
    flex: 1 1 auto;
    padding: 14px 11px;
    line-height: 25px;
    font-size: 20px;
    font-weight: bold;
    background-color: #F0F0F0;
    background-clip: padding-box;
    color: #000000;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .bs-tf-inner-input-group {
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
  }

  .bs-tf-input-prepend,
  .bs-tf-input-prepend > *:first-child {
    border-radius: 4px;
  }

  .bs-tf-input-append,
  .bs-tf-input-append > *:last-child {
    border-radius: 4px;
  }
</style>