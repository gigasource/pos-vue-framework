<script>
import GSlideshowFactory from './GSlideshowFactory';

const { ref, onMounted } = require('vue')
export default {
  name: 'GSlideshowContent',
  props: {
    modelValue: Array,
    defaultTransition: {
      type: String,
      default: 'None'
    },
    transitionDuration: {
      type: Number,
      default: 1500,
    }
  },
  setup(props) {
    const slideContainer = ref(null)
    GSlideshowFactory(props, slideContainer)
    return {
      slideContainer
    }
  }
}
</script>
<template>
  <div ref="slideContainer" class="g-slideshow-container"/>
</template>
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
