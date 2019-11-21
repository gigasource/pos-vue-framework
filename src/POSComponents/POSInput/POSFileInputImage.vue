<template>
  <g-file-input label="Upload file" accept="image/*">
    <template v-slot:selection="{file,index,amount}">
      <img id="img" :src="getImageSrc(file)"/>
    </template>
  </g-file-input>
</template>

<script>
  import GFileInput from "../../components/GFileInput/GFileInput";

  export default {
    name: "PosFileInputImage",
    components: {GFileInput},
    methods: {
      getImageSrc(file) {
        let reader = new FileReader()
        reader.onload = function () {
          let url = reader.result;

          let myImg = document.getElementById("img")
          myImg.src = url;
        }

        reader.readAsDataURL(file)
        return ''
      }
    },
  }
</script>

<style scoped lang="scss">
  .g-tf-wrapper::v-deep {
    display: inline-flex;
    width: auto;

    fieldset {
      width: auto;
    }

    .g-tf {
      height: 192px;
      width: 268px;
      margin-top: 30px;
      background-image: url("./FileInputImage.png");
      background-size: contain;
      cursor: pointer;
    }

    .g-tf::before, .g-tf::after {
      display: none;
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

    .g-tf-prepend__inner {
      display: none;
    }

    .g-tf-append__inner {
      position: absolute;
      right: 4px;
    }
  }
</style>