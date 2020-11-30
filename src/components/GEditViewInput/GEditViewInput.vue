<template>
  <div class="g-edit-view-input">
    <input v-if="mode === 'edit'"
           :key="mode"
           :value="internalValue"
           :class="inputClasses"
           :readonly="readonly"
           ref="input"
           @input="oninput"
           @keydown.enter="applyChange"/>
    <div ref="span" v-if="mode !== 'edit'" class="g-edit-view-input__span">{{ internalValue }}</div>
    <slot name="action" v-bind="{mode, switchToEditMode, applyChange, resetValue}">
      <g-icon v-if="!readonly && mode !== 'edit'" @click="switchToEditMode" size="18" class="ml-1">mdi-pencil-outline</g-icon>
      <g-icon v-if="!readonly && mode === 'edit'" @click="applyChange" class="ml-1">mdi-check</g-icon>
      <g-icon v-if="!readonly && mode === 'edit'" @click="resetValue" class="ml-1">mdi-close</g-icon>
    </slot>
  </div>
</template>
<script>
  export default {
    name: 'GEditViewInput',
    props: {
      modelValue: {
        type: String,
        default: ''
      },
      readonly: Boolean,
    },
    data() {
      return {
        // In EVI view mode, input isn't show, so calling focus, select from input element will not work (because input is not display)
        // to know whether user just switch from view -> edit mode, we need to store EVI previous view mode
        // when VDOM updated, we will check if EVI just switch from view -> edit mode, then we will focus to input and highlight it's content
        previousMode: 'view',
        mode: 'view',
        internalValue: this.modelValue || ''
      }
    },
    emits: ['update:modelValue'],
    computed: {
      inputClasses() {
        return {
          'g-edit-view-input__input': true,
          'g-edit-view-input__input--edit': this.mode === 'edit',
        }
      }
    },
    watch: {
      modelValue(val) {
        this.internalValue = val
      }
    },
    updated() {
      // check if EVI just switch from view -> edit mode then select all input content
      if (this.mode === 'edit' && this.previousMode === 'view') {
        this.$refs.input.focus()
        this.$refs.input.select()
      }
    },
    methods: {
      switchToEditMode() {
        this.previousMode = this.mode
        this.mode = 'edit'
      },
      oninput(e) {
        if (this.previousMode !== this.mode)
          this.previousMode = this.mode
        this.internalValue = e.target.value
      },
      applyChange() {
        this.mode = 'view'
        this.$emit('update:modelValue', this.internalValue, changeApplied => {
          if (!changeApplied)
            this.internalValue = this.modelValue
        })
      },
      resetValue() {
        this.mode = 'view'
        this.internalValue = this.modelValue
        this.$emit('update:modelValue', this.modelValue)
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-edit-view-input {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    &__input {
      outline: none;
      background-color: transparent;
      border-bottom: 2px solid transparent;
      font-weight: inherit;
      font-size: inherit;
      font-family: inherit;
      width: 100%;
      user-select: text !important;

      &--edit {
        border-bottom: 2px solid #536DFE;
        pointer-events: initial;
      }
    }

    &__span {
      cursor: default;
      word-break: break-all;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .g-icon {
      cursor: pointer;
    }
  }

  .edit-btn {
    width: 14px;
    height: 14px;
    cursor: pointer;
    margin-left: 4px;
  }
</style>
