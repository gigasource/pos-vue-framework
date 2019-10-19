<template>
    <div v-intersect:[intersectOptions].once="init" class="g-image" :style="containerStyles">
        <div v-if="loaded" class="g-image--content" :style="imageStyles">
            <slot></slot>
        </div>
        <template v-else>
            <slot name="placeholder">
                <div class="g-image--placeholder" :style="placeholderStyles">
                    <h3>Loading...</h3>
                </div>
            </slot>
        </template>
    </div>
</template>

<script>
  import {convertToUnit} from '../../utils/helpers';
  import {computed, onMounted, reactive, ref, watch} from '@vue/composition-api';
  import Intersect from "../../directives/intersect/intersect";

  export default {
    name: "GImg",

    directives: {
      Intersect
    },

    props: {
      src: [String, Object],
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
        calculatedAspectRatio: 0
      })

      const backgroundImage = computed(() => {
        if (!(normalizedSrc.value.src || normalizedSrc.value.lazySrc)) return []

        const backgroundImages = []
        const src = !loaded.value ? normalizedSrc.lazySrc : state.currentSrc

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
      }, { lazy: true })

      function init(entries, observer, isIntersecting) {
        if (!isIntersecting) return

        if (normalizedSrc.lazySrc) {
          const lazyImg = new Image()
          lazyImg.src = normalizedSrc.lazySrc
          pollForSize(lazyImg, null)
        }

        if (normalizedSrc.value.src) loadImage()
      }


      function loadImage() {
        //load image here
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
        // _image.onerror = onError()

        // bind src to image
        normalizedSrc.value.src && (_image.src = normalizedSrc.value.src)
        props.sizes && (_image.sizes = props.sizes)
        normalizedSrc.value.srcset && (_image.srcset = normalizedSrc.value.srcset)
        props.aspectRatio || pollForSize(_image)
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
            state.calculatedAspectRatio = naturalWidth / naturalHeight
          } else {
            timeout != null && setTimeout(poll, timeout)
          }
        }
        poll()
      }

      const containerStyles = computed(() => ({
        width: convertToUnit(props.width || (props.height * props.aspectRatio) || state.image.width),
        maxWidth: convertToUnit(props.maxWidth),
        minWidth: convertToUnit(props.minWidth),
        height: convertToUnit(props.height || (props.width / props.aspectRatio) || ((state.image.width / props.aspectRatio)) || state.image.height),
        maxHeight: convertToUnit(props.maxHeight),
        minHeight: convertToUnit(props.minHeight),
        aspectRatio: props.aspectRatio,
      }))

      const imageStyles = computed(() => {
        let contain = props.contain ? 'contain' : 'cover'
        return {
          backgroundImage: backgroundImage.value,
          backgroundSize: contain,
        }
      })

      const placeholderStyles = computed(() => {
        return {
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://picsum.photos/id/11/100/60)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center center'
        }
      })

      return {
        containerStyles,
        imageStyles,
        placeholderStyles,
        loaded,
        normalizedSrc,
        backgroundImage,
        init,
      }
    }
  }
</script>
