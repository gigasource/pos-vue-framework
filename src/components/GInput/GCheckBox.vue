<template>
	<label :class="checkBoxClass" class="fs-small-2 mb-2 check-box-square" @click.prevent="activate">
		<input type="checkbox">
		<span :class="checkmarkClass"></span>
		{{label}}
	</label>
</template>

<script>
  import { computed, ref } from '@vue/composition-api';
  import getVModel from '../../mixins/getVModel';

  export default {
    name: 'GCheckBox',
    props: {
      label: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      value: null,
      activeClass: {
        type: String,
        default: 'check-box__active'
      }
    },
    setup(props, context) {
      let isActive = ref(false);
      const { vModel } = getVModel(props, context);

      const checkBoxClass = computed(() => ({
        readonly: props.readonly,
        disabled: props.disabled,
      }));

      const checkmarkClass = computed(() => ({
          checkmark: !isActive.value,
          [props.activeClass]: isActive.value
        })
      );

      function activate() {
        isActive.value = !isActive.value;
      }

      return {
        vModel,
        checkBoxClass,
        checkmarkClass,
        activate
      }
    },
  }
</script>

<style scoped>

</style>