<template>
    <div class="g-container" :style="styleSize">
        <div v-show="loaded.value" :class="classImage" :style="styleImage"></div>
        <slot v-if="!loaded.value">
            <div :class="classPlaceholder" :style="stylePlaceholder">
                <h3>Loading...</h3>
            </div>
        </slot>
    </div>
</template>

<script>
  import {convertToUnit} from '../../utils/helpers';
  import {computed, createElement as h, onMounted, reactive, ref, watch} from '@vue/composition-api';

  const getSize = (props, img) => {
    return computed(() => {
      // let imgSize = {
      //   width : props.width || (props.height * props.aspectRatio) || img.width,
      //   height: props.height || (props.width/props.aspectRatio) || img.height
      // }
      return {
        width: convertToUnit(props.width || (props.height * props.aspectRatio) || img.width),
        maxWidth: convertToUnit(props.maxWidth),
        minWidth: convertToUnit(props.minWidth),
        height: convertToUnit(props.height || (props.width / props.aspectRatio) || ((img.width / props.aspectRatio)) || img.height),
        maxHeight: convertToUnit(props.maxHeight),
        minHeight: convertToUnit(props.minHeight),
        aspectRatio: props.aspectRatio,
        //paddingBottom: (props.width && props.height) ? null : `${1 / props.aspectRatio * 100}%`
      }
    })
  }

  export default {
    name: "GImg",
    props: {
      src: String,
      width: [Number, String],
      maxWidth: [Number, String],
      minWidth: [Number, String],
      height: [Number, String],
      maxHeight: [Number, String],
      minHeight: [Number, String],
      contain: Boolean,
      aspectRatio: [Number, String],
      gradient: String
    },

    setup(props, context) {
      let loaded = reactive({value: false})
      let img = new Image()
      img.onload = () => {
        loaded.value = true
      }
      img.src = props.src


      const styleSize = getSize(props, img)
      //   size.paddingBottom = `${1 / props.aspectRatio * 100}%`


      const styleImage = computed(() => {
        let contain = props.contain ? 'contain' : 'cover'
        return {
          backgroundImage: `linear-gradient(${props.gradient}),url(${props.src})`,
          backgroundSize: contain,
        }
      })

      const classImage = computed(() => {
        return {
          'g-image': true,
        }
      })

      const stylePlaceholder = computed(() => {
        return {
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://picsum.photos/id/11/100/60)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center center'
        }
      })

      const classPlaceholder = computed(() => {
        return {
          'g-placeholder': true
        }
      })

      return {
        styleSize,
        styleImage,
        classImage,
        stylePlaceholder,
        classPlaceholder,
        loaded
      }
    }
  }
</script>
