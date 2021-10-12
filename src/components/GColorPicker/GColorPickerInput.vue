<template>
  <g-menu
      :model-value="showMenu"
      @update:modelValue="closeMenu"
      :min-width="320"
      :max-width="320"
      :content-fill-width="false"
      closeOnClick>
      <template #activator="gMenuScope">
        <div style='display: flex; align-items: center;'>
          <g-text-field
              prepend-icon="fas fa-palette"
              :label="label"
              :model-value="modelValue"
              :disabled="disabled"
              :filled="filled"
              :outlined="outlined"
              :solo="solo"
              :shaped="shaped"
              :rounded="rounded"
              :flat="flat"
              :dense="dense"
              @click="gMenuScope.toggleContent"/>
            <span :style="{ ...previewStyle, background: modelValue }"></span>
        </div>
      </template>
    <g-color-picker @update:color="updateColor"/>
  </g-menu>
</template>
<script>
  import { defineAsyncComponent } from 'vue'
  import GMenu from '../../components/GMenu/GMenu'
  import GTextField from '../GInput/GTextField'
  const GColorPicker = defineAsyncComponent(() => import('./GColorPicker'))

  GMenu.components['GTextField'] = GTextField

  export default {
    name: 'GColorPickerInput',
    components: { GMenu, GTextField, GColorPicker },
    props: {
      label: String,
      disabled: Boolean,
      filled: Boolean,
      outlined: Boolean,
      solo: Boolean,
      shaped: Boolean,
      rounded: Boolean,
      flat: Boolean,
      dense: Boolean,
      modelValue: String
    },
    emits: ['update:modelValue'],
    data() {
      return {
        internalValue: this.modelValue,
        showMenu: false,
        previewStyle: {
          width: '30px',
          height: '20px',
          margin: '16px 0px 24px -30px',
          border: '1px solid #0003'
        }
      }
    },
    watch: {
      value() {
        if (this.internalValue !== this.modelValue)
          this.internalValue = this.modelValue
      }
    },
    methods: {
      updateColor(color) {
        if (color.angle) {
          this.internalValue = `linear-gradient(${color.angle}, ${color.colorStop1}, ${color.colorStop2})`
        } else if (color.value) {
          this.internalValue = color.value
        } else {
          this.internalValue = color
        }
        this.$emit('update:modelValue', this.internalValue)
      },
      closeMenu(value) {
        this.showMenu = value
      }
    }
  }
</script>
