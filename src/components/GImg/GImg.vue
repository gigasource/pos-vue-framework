<template>
    <div>
        <div :class="classObj" :style="[sizeStyle,styleObj]"></div>
        <div :class="classObjPlaceholder" :style="sizeStyle">

        </div>
    </div>
</template>

<script>
  import {convertToUnit} from '../../utils/helpers';
  import {computed, createElement as h, onMounted, reactive, ref, watch} from '@vue/composition-api';

  const getSize = (props, context) => {
    return computed(() => {
      let contain = props.contain ? 'contain' : 'cover'
      let img = new Image()
      img.src = props.src
      let imgSize = {
        height: img.height,
        width: img.width
      }
      return {
        backgroundSize: contain,
        width: convertToUnit(props.width || imgSize.width),
        maxWidth: convertToUnit(props.maxwidth),
        minWidth: convertToUnit(props.minWidth),
        height: convertToUnit(props.height || imgSize.height),
        maxHeight: convertToUnit(props.maxHeight),
        minHeight: convertToUnit(props.minHeight)
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
      aspectRatio: [Number, String]
    },
    setup(props, context) {
      const sizeStyle = getSize(props, context)

      const styleObj = computed(() => {
        return {
          backgroundImage: 'url(' + props.src + ')'
        }
      })

      // watch(props.minHeight, (newVal, oldValue) => {
      //
      // }, { lazy: true, flush: "pre"})

      const classObj = computed(() => {
        return {
          'g-image': true,
        }
      })

      const classObjPlaceholder = computed(() => {
        return {
          'g-placeholder': true,
        }
      })

      return {
        sizeStyle,
        styleObj,
        classObj,
        classObjPlaceholder
      }
    }
  }
</script>
