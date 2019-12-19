<template>
  <g-color-picker-input
      :label="label"
      :disabled="disabled"
      :filled="filled"
      :outlined="outlined"
      :solo="solo"
      :shaped="shaped"
      :rounded="rounded"
      :flat="flat"
      :dense="dense"
      :value="model[field.key]"
      @input="v => model[field.key] = v"/>
</template>
<script>
  import GColorPickerInput from './GColorPickerInput';
  export default {
    name: 'GColorPickerInputModel',
    components: { GColorPickerInput },
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
      model: Object,
      field: Object
    },
  }
</script>
