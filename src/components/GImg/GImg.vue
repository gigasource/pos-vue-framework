<template>
    <div v-intersect:[intersectOptions].once="init" class="g-image" :style="containerStyles">
        <div class="g-image-content" :style="imageStyles"></div>
        <slot></slot>
        <slot v-if="!loaded" name="placeholder" class="g-image-placeholder"></slot>
    </div>
</template>

<script>
  import {convertToUnit} from '../../utils/helpers';
  import {computed, reactive, ref, watch} from '@vue/composition-api';
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

      const backgroundImage = computed(() => {
        if (!(normalizedSrc.value.src || normalizedSrc.value.lazySrc)) return []

        const backgroundImages = []
        const src = !loaded.value ? normalizedSrc.value.lazySrc : state.currentSrc

        if (props.gradient) backgroundImages.push(`linear-gradient(${props.gradient})`)
        if (src) backgroundImages.push(`url("${src}")`)

        return backgroundImages.join(', ')
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

      watch(() => props.src, (newVal) => {
        // init again if src changes
        if (loaded.value) init(undefined, undefined, true)
        else loadImage()
      }, {lazy: true})

      function init(entries, observer, isIntersecting) {
        if (!isIntersecting) return

        if (normalizedSrc.value.lazySrc) {
          const lazyImg = new Image()
          lazyImg.src = normalizedSrc.value.lazySrc
          pollForSize(lazyImg, null)
        }

        if (normalizedSrc.value.src) loadImage()
      }

      const _image = new Image()

      function loadImage() {
        //load image here

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
        // _image.onerror = onError

        // bind src to image
        normalizedSrc.value.src && (_image.src = normalizedSrc.value.src)
        props.sizes && (_image.sizes = props.sizes)
        normalizedSrc.value.srcset && (_image.srcset = normalizedSrc.value.srcset)
        props.aspectRatio || pollForSize(_image)
        console.log(normalizedSrc.value.srcset)
        console.log(_image)
      }

      function onLoad() {
        getSrc()
        loaded.value = true
        context.emit('load', props.src)
      }

      function onError() {
        //fires error on Image() constructor
        console.error(`Image load failed\n\n` +
            `src: ${normalizedSrc.src}`)
        context.emit('error', props.src)
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
        if (props.width) return convertToUnit(props.width)
        if (!!props.height && props.aspectRatio) return convertToUnit(props.height * props.aspectRatio)
        if (state.naturalWidth) return convertToUnit(state.naturalWidth)
        if (state.image) return convertToUnit(state.img.width)
      }

      function calculateHeight(props, state) {
        if (props.height) return convertToUnit(props.height)
        if (!!props.width && props.aspectRatio) return convertToUnit(props.width / props.aspectRatio)
        if (!!props.aspectRatio) return convertToUnit(state.naturalWidth / props.aspectRatio)
        if (state.naturalHeight) return convertToUnit(state.naturalHeight)
        if (state.image) return convertToUnit(state.image.height)
      }

      const containerStyles = computed(() => ({
        width: calculateWidth(props, state),
        maxWidth: !!props.maxWidth && convertToUnit(props.maxWidth),
        minWidth: !!props.maxWidth && convertToUnit(props.minWidth),
        height: calculateHeight(props, state),
        maxHeight: !!props.maxHeight && convertToUnit(props.maxHeight),
        minHeight: !!props.minHeight && convertToUnit(props.minHeight),
        aspectRatio: props.aspectRatio,
      }))

      const imageStyles = computed(() => {
        let contain = props.contain ? 'contain' : 'cover'

        return {
          backgroundImage: backgroundImage.value,
          backgroundSize: contain,
        }
      })

      return {
        containerStyles,
        imageStyles,
        loaded,
        normalizedSrc,
        backgroundImage,
        init,
      }
    }
  }
</script>
