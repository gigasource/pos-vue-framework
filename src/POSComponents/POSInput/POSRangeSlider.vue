<script>
  import GRangeSlider from "../../components/GRangeSlider/GRangeSlider.vue";

  export default {
    name: "POSRangeSlider",
    mixins: [GRangeSlider],
    props: {
      height: {default: '8px'},
      trackFillColor: {default: '#1271FF'},
      thumbLabel: {default: 'always'},
      //thumbSize: {default: 40},
      thumbColor: {default: '#1271FF'}
    }
  }
</script>

<style scoped lang="scss">
  @import "../../components/GSliderRemake/_GSlider.scss";

  .g-slider::v-deep {
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
      align-items: center;
      justify-content: center;
      flex-direction: row;
      width: 58px !important;
      height: 30px !important;
      font-size: 15px;
      font-weight: normal;
      letter-spacing: 1px;
      border-radius: 8px;
      position: absolute;
      left: 0;
      bottom: 100%;
      user-select: none;
      transition: 0.3s;

      > * {
        transform: none;
      }
    }

  }
</style>