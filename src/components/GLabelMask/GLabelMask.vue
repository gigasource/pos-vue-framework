<template>
  <span>{{display}}</span>
</template>
<script setup>
import {computed} from 'vue';
import tokens from '../../directives/mask/tokens'
import masker from '../../directives/mask/masker'
const props = defineProps({
  modelValue: [String, Number],
  mask: {
    type: [String, Array],
    required: true
  },
  tokens: {
    type: Object,
    default: () => tokens
  }
})
const display = computed(() => masker(props.modelValue, props.mask, true, tokens))
</script>
