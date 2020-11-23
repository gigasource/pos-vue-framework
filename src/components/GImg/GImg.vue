<template>
  <div v-intersect:[intersectOptions].once="init" class="g-image" :style="containerStyles">
    <div class="g-image-content" :style="imageStyles"></div>
    <slot></slot>
    <slot v-if="!loaded" name="placeholder" class="g-image-placeholder"></slot>
  </div>
</template>

<script>
  import {convertToUnit} from '../../utils/helpers';
  import {computed, reactive, ref, watch} from 'vue';
  import Intersect from "../../directives/intersect/intersect";

  export default {
    name: "GImg",

    directives: {
      Intersect
    },

    props: {
      src: [String, Object],
      srcset: [String],
      lazySrc: [String],
      width: [Number, String],
      maxWidth: [Number, String],
      minWidth: [Number, String],
      height: [Number, String],
      maxHeight: [Number, String],
      minHeight: [Number, String],
      contain: Boolean,
      aspectRatio: [Number, String],
      gradient: String,
      intersectOptions: {
        type: Object,
        default: () => ({
          root: undefined,
          rootMargin: undefined,
          threshold: 0,
        }),
      },
    },

    setup(props, context) {
      let loaded = ref(false)

      const state = reactive({
        currentSrc: null,
        image: null,
        naturalWidth: 0,
        naturalHeight: 0,
        calculatedAspectRatio: 0,
      })

      const normalizedSrc = computed(() => {
        return typeof props.src === 'string'
            ? {
              src: props.src,
              srcset: props.srcset,
              lazySrc: props.lazySrc,
              aspect: Number(props.aspectRatio),
            } : {
              src: props.src.src,
              srcset: props.srcset || props.src.srcset,
              lazySrc: props.lazySrc || props.src.lazySrc,
              aspect: Number(props.aspectRatio || props.src.aspect),
            }
      })

      watch(() => props.src, () => {
        // init again if src changes
        if (loaded.value) init(undefined, undefined, true)
        else loadImage()
      }, {lazy: true})

      /**
       * init image
       * @param entries instanceof IntersectionObserverEntry
       * @param observer instanceof IntersectionObserver
       * @param isIntersecting
       */
      function init(entries, observer, isIntersecting) {
        // do not init if image is not in viewport
        if (!isIntersecting) return

        if (normalizedSrc.value.lazySrc) {
          const lazyImg = new Image()
          lazyImg.src = normalizedSrc.value.lazySrc
          pollForSize(lazyImg, null)
        }

        if (normalizedSrc.value.src) loadImage()
      }

      function loadImage() {
        const _image = new Image()
        state.image = _image

        _image.onload = () => {
          if (_image.decode) {
            _image.decode().catch((err) => {
              console.warn(
                  `Failed to decode image, trying to render anyway\n\n` +
                  `src: ${normalizedSrc.value.src}`
              )
            }).then(onLoad)
          } else {
            onLoad()
          }
        }

        // bind src to image
        normalizedSrc.value.src && (_image.src = normalizedSrc.value.src)
        props.sizes && (_image.sizes = props.sizes)
        normalizedSrc.value.srcset && (_image.srcset = normalizedSrc.value.srcset)
        props.aspectRatio || pollForSize(_image)
        getSrc()
      }

      function onLoad() {
        getSrc()
        loaded.value = true
        context.emit('load', props.src)
      }

      function getSrc() {
        if (state.image) state.currentSrc = state.image.currentSrc || state.image.src
      }

      // poll to calculate aspect ratio based on image sizes
      function pollForSize(image, timeout = 100) {
        const poll = () => {
          const {naturalHeight, naturalWidth} = image

          if (naturalHeight || naturalWidth) {
            state.naturalWidth = naturalWidth
            state.naturalHeight = naturalHeight
            state.calculatedAspectRatio = naturalWidth / naturalHeight
          } else {
            timeout != null && setTimeout(poll, timeout)
          }
        }
        poll()
      }

      function calculateWidth(props, state) {
        //todo write unit tests
        if (props.width) return convertToUnit(props.width)
        if (props.height && props.aspectRatio) return convertToUnit(props.height * props.aspectRatio)
        // if (state.naturalWidth) return convertToUnit(state.naturalWidth)
        return 'auto'
      }

      function calculateHeight(props, state) {
        //todo write unit tests
        if (props.height) return convertToUnit(props.height)
        if (props.width && props.aspectRatio) return convertToUnit(props.width / props.aspectRatio)
        if (props.aspectRatio) return convertToUnit(state.naturalWidth / props.aspectRatio)
        // if (state.naturalHeight) return convertToUnit(state.naturalHeight)
        return 'auto'
      }

      const containerStyles = computed(() => ({
        width: calculateWidth(props, state),
        height: calculateHeight(props, state),
        aspectRatio: props.aspectRatio,
        ...props.maxWidth && {'max-width': convertToUnit(props.maxWidth)},
        ...props.minWidth && {'min-width': convertToUnit(props.minWidth)},
        ...props.maxHeight && {'max-height': convertToUnit(props.maxHeight)},
        ...props.minHeight && {'min-height': convertToUnit(props.minHeight)},
      }))

      const backgroundImage = computed(() => {
        if (!(normalizedSrc.value.src || normalizedSrc.value.lazySrc)) return []

        const backgroundImages = []
        const src = !loaded.value ? normalizedSrc.value.lazySrc : state.currentSrc

        if (props.gradient) backgroundImages.push(`linear-gradient(${props.gradient})`)
        if (src) backgroundImages.push(`url("${src}")`)

        return backgroundImages.join(', ')
      })

      const imageStyles = computed(() => {
        return {
          'background-image': backgroundImage.value,
          'background-size': props.contain ? 'contain' : 'cover',
        }
      })

      return {
        containerStyles,
        imageStyles,
        loaded,
        init,
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "GImg";
</style>
