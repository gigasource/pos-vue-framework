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
  import { computed, reactive } from '@vue/composition-api';
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
    },
    setup(props, context) {
      const computedTitleColor = computed(() => {
        const defaultTitleColor = (props.color || 'primary')
        return props.color || defaultTitleColor
      })

      const titleData = computed(() => {
        let data = setBackgroundColor(computedTitleColor.value, {
          staticClass: 'g-picker__title',
          class: {
            'g-picker__title--landscape': props.landscape,
          },
        });
        return data
      })

      const shouldGenTitleSlot = computed(() => {
        let result = context.slots.title !== undefined
        return !!context.slots.title
      })
      const shouldGenActionsSlot = computed(() => context.slots.actions !== undefined)

      const bodyClass = reactive({
        'g-picker__body--no-title': props.noTitle
      })
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
