<script>
  import GSlideshowFactory from './GSlideshowFactory';

  export default {
    name: "GSlideshowContent",
    props: {
      value: Array,
      defaultTransition: {
        type: String,
        default: 'None'
      },
      transitionDuration: {
        type: Number,
        default: 1500,
      }
    },
    setup (props, context) {

      const {
        count,
        currentItem,
        nextItem
      } = GSlideshowFactory(props, context)

      const genSlideshow = () => {
        return <div class="g-slideshow-container" ref="slideContainer"/>
      }

      return {
        genSlideshow,
        count,
        currentItem,
        nextItem
      }
    },
    render() {
      return this.genSlideshow()
    }
  }
</script>

<style scoped lang="scss">
  .g-slideshow {
    &-container {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: black;
    }

    &-current {
      position: absolute;
      width: 500px;
      height: 500px;
    }

    &-next {
      position: absolute;
      width: 100%;
      display: none;
    }
  }

  ::v-deep img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ::v-deep video {
    width: 100%;
    height: 100%;
  }
</style>