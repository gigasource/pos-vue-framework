<template>
  <div id="wrapper" :class="tearClass">
    <slot name="prepend-outer"></slot>
    <div id="control" class="g-textarea--control">
      <div id="slot">
        <slot name="prepend"></slot>
        <div id="textarea-slot">
          <label for="core"></label>
          <textarea id="core" ref="input" :rows="tearAtt.rows" :autofocus="tearAtt.autofocus"></textarea>
        </div>
        <slot name="append"></slot>
      </div>
      <div id="detail"></div>
    </div>
    <slot name="append-outer"></slot>
  </div>
</template>

<script>
  import {ref, computed, onMounted, onUpdated, watch} from '@vue/composition-api';

  export default {
    name: "GTextarea",
    props: {
      //textarea props
      autoGrow: Boolean,
      noResize: Boolean,
      rowHeight: {
        type: [Number, String],
        default: 24,
        //validator: (v) => !isNaN(parseFloat(v)),
      },
      rows: {
        type: [Number, String],
        default: 5,
        //validator: (v) => !isNaN(parseInt(v, 10)),
      },
      //text field props

      //input props
      autofocus: Boolean,
    },
    setup(props, context) {
      let noResizeHandle = computed(() => {
        return props.noResize || props.autoGrow
      })
      console.log(context.refs)

      function calculateInputHeight() {
        const input = context.refs.input
        if (!input) return

        input.style.height = '0'
        const height = input.scrollHeight
        const minHeight = parseInt(props.rows, 10) * parseFloat(props.rowHeight)
        // This has to be done ASAP, waiting for Vue
        // to update the DOM causes ugly layout jumping
        input.style.height = Math.max(minHeight, height) + 'px'
      }

      onMounted(() => {
        console.log(context.refs.input.rows)
        setTimeout(() => {
          props.autoGrow && calculateInputHeight()
        }, 0)
      })

      // watch(context.refs.input.rows,()=>{
      //   props.autoGrow && calculateInputHeight()
      // })

      onUpdated(() => {
        console.log('update height')
        props.autoGrow && calculateInputHeight()
      })

      let tearClass = computed(() => {
        return {
          'g-textarea': true,
          'g-textarea__auto-grow': props.autoGrow,
          'g-textarea__no-resize': noResizeHandle,
        }
      })

      let tearAtt = computed(() => {
        return {
          rows: props.rows,
          //rowHeight: props.rowHeight
          autofocus: props.autofocus && 'autofocus',
        }
      })

      return {
        tearClass,
        tearAtt
      }
    }
  }
</script>

<style scoped>
</style>
