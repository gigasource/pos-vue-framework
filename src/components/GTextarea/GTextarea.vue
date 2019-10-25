<template>
  <div id="wrapper" :class="tearClass">
    <!--    <div v-if="false" id="prepend-outer">-->
    <!--      <slot name="prepend-outer"></slot>-->
    <!--    </div>-->
    <div id="control" class="g-input__control">
      <div id="input-slot" class="g-input__slot">
        <!--        <div v-if="false" id="prepend-inner">-->
        <!--          <slot name="prepend"></slot>-->
        <!--        </div>-->
        <fieldset v-if="false">
          <legend><span></span></legend>
        </fieldset>
        <div id="tear-slot" class="g-tear--textarea-slot">
          <label for="core">
            <slot id="label-slot"></slot>
          </label>
          <textarea id="core" ref="input"
                    :value="tearAtt.value"
                    :rows="tearAtt.rows"
                    :placeholder="tearAtt.placeholder"
                    :autofocus="tearAtt.autofocus"
                    :disabled="tearAtt.disabled"
                    :readonly="tearAtt.readonly"
                    @blur="onBlur"
                    @input="onInput"
                    @focus="onFocus"
                    @keydown="onKeyDown">
          </textarea>
        </div>
        <div id="append-inner">
          <slot name="append"><i class="material-icon">cancel</i></slot>
        </div>
      </div>
      <div id="detail"></div>
    </div>
    <!--    <div v-if="false" id="append-outer">-->
    <!--      <slot name="append-outer"></slot>-->
    <!--    </div>-->
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
      value: String,
      placeholder: String,
      autofocus: Boolean,
      disabled: Boolean,
      readonly: Boolean,

      outlined: Boolean,

      appendOuterIcon: String,
      prependIcon: String,

      //input props
      loading: Boolean, //todo

      appendIcon: String,
      prependOuterIcon: String,

    },

    setup(props, context) {
      let noResizeHandle = computed(() => {
        return props.noResize || props.autoGrow
      })

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

      function onInput() {
        console.log('input event is emitted')
        props.autoGrow && calculateInputHeight()
      }

      function onBlur() {

      }

      function onFocus() {

      }

      function onKeyDown() {

      }

      function clearTextarea() {
        props.refs.input && props.refs.input.focus()
        props.nextTick(() => props.refs.input.internalValue = null)
      }

      // watch(props.rowHeight, () => {
      //   props.autoGrow && context.nextTick(calculateInputHeight)
      // })
      // lazyValue () {
      //   this.autoGrow && this.$nextTick(this.calculateInputHeight)
      // }


      // watch(context.refs.input.rows,()=>{
      //   props.autoGrow && calculateInputHeight()
      // })

      // onUpdated(() => {
      //   console.log('update height')
      //   props.autoGrow && calculateInputHeight()
      // })

      let tearClass = computed(() => {
        return {
          'g-tear': true,
          'g-tear--auto-grow': props.autoGrow,
          'g-tear--no-resize': noResizeHandle,
          'g-tear--outlined': props.outlined,
          'g-text-field': true,
          'g-input': true,
        }
      })

      let tearAtt = computed(() => {
        return {
          value: props.value,
          rows: props.rows,
          //rowHeight: props.rowHeight
          autofocus: props.autofocus && 'autofocus',
          placeholder: !!props.placeholder && props.placeholder,
          disabled: props.disabled,
          readonly: props.readonly,
        }
      })

      return {
        tearClass,
        tearAtt,
        onInput,
        onBlur,
        onFocus,
        onKeyDown,
        clearTextarea
      }
    }
  }


</script>

<style scoped>
</style>
