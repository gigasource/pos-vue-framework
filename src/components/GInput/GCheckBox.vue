<template>
	<label :class="checkBoxClass" @click.prevent="activate">
		<input type="checkbox">
		<span :class="checkmarkClass"></span>
		{{label}}
	</label>
</template>

<script>
  import { computed, ref } from '@vue/composition-api';

  export default {
    name: 'GCheckBox',
    props: {
      label: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      value: [String, Boolean, Number, Array, Object],
      activeClass: {
        type: String,
        default: 'check-box__active'
      }
    },
    setup(props, { emit }) {
      let isActive = ref(false);
      const computedValue = computed({
        get: () => props.value,
        set: (value) => {
          emit('input', value);
        }
      });
      const checkBoxClass = computed(() => {
        const defaultClasses = { 'fs-small-2': true, 'mb-2': true, 'check-box-square': true };
        return {
          readonly: props.readonly,
          disabled: props.disabled,
          ...defaultClasses
        };
      });
      const checkmarkClass = computed(() => ({
          checkmark: !isActive.value,
          [props.activeClass]: isActive.value
        })
      );

      function activate() {
        isActive.value = !isActive.value;
      };

      return {
        computedValue,
        checkBoxClass,
        checkmarkClass,
        activate
      }
    },
  }
</script>

<style scoped>

</style>