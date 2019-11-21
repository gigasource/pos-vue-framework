<template>
  <g-range-slider v-model="value" :min="min" :max="max" height="8px" track-fill-color="#1271FF" thumb-color="#1271FF" thumb-label="always">
    <template v-slot:thumb-label="props">
      <span>€{{props.value}}</span>
      <div class="arrow_down"/>
    </template>
  </g-range-slider>
</template>

<script>
  import GRangeSlider from "../../components/GRangeSlider/GRangeSlider";

  export default {
    name: "POSRangeSlider",
    components: {GRangeSlider},
    props: {
      min: [String,Number],
      max: [String,Number],
    },
    data() {
      return {
        value: [0, 20]
      }
    },
  }
</script>

<style scoped lang="scss">
  .g-slider::v-deep {
    margin: 30px 30px 0;

    .g-slider-track-background {
      border-radius: 98px;
    }

    .g-slider-thumb {
      height: 20px;
      width: 20px;
      background-color: #FFFFFF;
      box-shadow: 0px 2px 4px rgba(140, 140, 140, 0.3), 0px -2px 4px rgba(140, 140, 140, 0.2);
    }

    .g-slider-thumb-container {
      &:hover, &__focused {
        .g-slider-thumb:before {
          content: none;
        }
      }

      &__active {
        .g-slider-tick {
          content: none;
        }
      }
    }

    .g-slider-thumb-label-container {
      left: 4px;
    }

    .g-slider-thumb-label {
      transform: translateY(-20%) translateY(-12px) translateX(-50%) !important;
      display: flex;
      width: 58px !important;
      height: 30px !important;
      border-radius: 8px;
      position: absolute;
      transition: 0.3s;

      font-size: 15px;
      font-weight: normal;
      letter-spacing: 1px;

      > * {
        transform: none;
      }
    }
  }

  .arrow_down {
    height: 0;
    width: 0;
    border: 4px #1271FF solid;
    transform: rotate(-45deg);
    position: absolute;
    left: 24px;
    top: 26px;
  }
</style>