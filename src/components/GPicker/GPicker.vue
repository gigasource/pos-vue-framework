<template>
  <div class="g-picker" :class="gPickerClasses">
    <div class="g-picker__title" v-if="shouldGenTitleSlot" :class="titleData.class" :style="titleData.style">
      <slot name="title"></slot>
    </div>
    <div class="g-picker__body" :class="bodyClass" :style="bodyStyle">
      <slot></slot>
    </div>
    <div v-if="shouldGenActionsSlot" class="g-picker__actions" :class="actionClass">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  import { setBackgroundColor } from '../../mixins/colorable'
  import { computed, reactive } from 'vue';
  import { convertToUnit } from '../../utils/helpers'

  export default {
    name: 'GPicker',
    props: {
      // Colorable's props
      color: String,

      // GPicker's props
      fullWidth: Boolean,
      landscape: Boolean,
      noTitle: Boolean,
      transition: {
        type: String,
        default: 'fade-transition',
      },
      width: {
        type: [Number, String],
        default: 290,
      },
      disabled: Boolean
    },
    setup(props, context) {
      const titleColor = computed(() => {
        const defaultTitleColor = (props.color || 'primary')
        return props.color || defaultTitleColor
      })

      const titleData = computed(() => {
        let data = setBackgroundColor(titleColor.value, {
          staticClass: 'g-picker__title',
          class: {
            'g-picker__title--landscape': props.landscape,
          },
        });
        return data
      })

      const shouldGenTitleSlot = computed(() => {
        return context.slots.title != undefined && !props.noTitle
      })
      const shouldGenActionsSlot = computed(() => context.slots.actions !== undefined)

      const bodyClass = computed(() => ({
        'g-picker__body--no-title': props.noTitle
      }))
      const bodyStyle = computed(() => {
        return props.fullWidth ? undefined : { width: convertToUnit(props.width) }
      })
      const actionClass = reactive({
        'g-picker__actions--no-title': props.noTitle,
      })

      return {
        gPickerClasses: computed(() => {
          return {
            'g-picker--landscape': props.landscape,
            'g-picker--full-width': props.fullWidth,
            'g-picker--disabled': props.disabled
          }
        }),
        shouldGenTitleSlot,
        titleData,
        bodyClass,
        bodyStyle,
        shouldGenActionsSlot,
        actionClass
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/variables";

  $border-radius-root: 4px !default;
  $picker-border-radius: $border-radius-root !default;
  $picker-title-padding: 16px !default;
  $picker-inactive-btn-opacity: .6 !default;
  $picker-active-btn-opacity: 1 !default;
  $picker-landscape-title-width: 170px !default;

  .g-picker {
    border-radius: $picker-border-radius;
    contain: layout style;
    vertical-align: top;
    position: relative;
    background-color: #FFFFFF;
    max-width: 100%;
    min-width: 15%;
    outline: none;
    text-decoration: none;
    transition-property: box-shaow, opacity;
    overflow-wrap: break-word;
    white-space: normal;
    width: fit-content;
    height: fit-content;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    -webkit-transition: -webkit-box-shadow 0.25s;
    -moz-transition: box-shadow 0.25s;
    -o-transition: box-shadow 0.25s;
    transition: -webkit-box-shadow 0.25s;
    transition: box-shadow 0.25s, -webkit-box-shadow 0.25s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &--disabled {
      pointer-events: none;
    }

    &__title {
      color: #FFFFFF;
      border-top-left-radius: $picker-border-radius;
      border-top-right-radius: $picker-border-radius;
      padding: $picker-title-padding;

      &__btn {
        transition: $primary-transition;

        &--readonly {
          pointer-events: none;
        }

        &--active {
          opacity: $picker-active-btn-opacity;
          cursor: pointer;
        }
      }
    }
  
  
    &__body {
      height: auto;
      overflow: hidden;
      position: relative;
      z-index: 0;

      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;

      > div {
        width: 100%;

        &.fade-transition-leave-active {
          position: absolute;
        }
      }
    }
  }

  .g-picker--landscape {
    .g-picker__title {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      width: $picker-landscape-title-width;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 1;
    }

    .g-picker__body:not(.g-picker__body--no-title),
    .g-picker__actions:not(.g-picker__actions--no-title) {
      margin-left: $picker-landscape-title-width;
    }
  }

</style>
