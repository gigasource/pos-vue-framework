<template>
  <div class="g-time-picker-title">
    <div v-if="showAmPm" class="g-time-picker-title__ampm">
      <div :class="amModel.class" v-on="amModel.events">{{ amModel.content }}</div>
      <div :class="pmModel.class" v-on="pmModel.events">{{ pmModel.content }}</div>
    </div>
    <div class="g-time-picker-title__time">
      <div :class="hourModel.class" v-on="hourModel.events">{{ hourModel.content }}</div>
      <span>:</span>
      <div :class="minuteModel.class" v-on="minuteModel.events">{{ minuteModel.content }}</div>
    </div>
  </div>
</template>
<script>
  import { computed } from '@vue/composition-api'
  import {
    getTitleAmPmDataModel, getTitleTimeDataModels, HourConvention,
    HourConventionValidator, Period, PeriodValidator, SelectingTime, SelectingTimeValidator
  } from './GTimePickerTitleUtil'

  export default {
    name: 'GTimePickerTitle',
    props: {
      // store current hour value
      hour: Number,
      // store current minute value
      minute: Number,
      // HourConvention { _12HRS: 12, _24HRS: 24 }
      hourConvention: {
        type: String,
        default: HourConvention._12HRS,
        validator: HourConventionValidator
      },
      // Period = { AM: 1, PM: 2}
      period: {
        type: String,
        default: Period.AM,
        validator: PeriodValidator,
      },
      // SelectingTime = { Hour: 1, Minute: 2 }
      selecting: {
        type: String,
        default: SelectingTime.Hour,
        validator: SelectingTimeValidator
      },
      disabled: Boolean,
    },
    setup(props, context) {
      const createPickerBtnData = (activeState, events, content) => {
        return {
          class: {
            'g-picker__title__btn': true,
            'g-picker__title__btn--active': activeState,
            'g-picker__title__btn--disabled': props.disabled
          },
          events,
          content
        }
      }

      // am-pm
      const { showAmPm, amActive, amEvent, pmActive, pmEvent } = getTitleAmPmDataModel(props, context)
      const amModel = computed(() => createPickerBtnData(amActive.value, amEvent.value, 'AM'))
      const pmModel = computed(() => createPickerBtnData(pmActive.value, pmEvent.value, 'PM'))

      // time
      const { hourEvent, hourContent, hourActive, minuteEvent, minuteContent, minuteActive } = getTitleTimeDataModels(props, context)
      const hourModel = computed(() => createPickerBtnData(hourActive.value, hourEvent.value, hourContent.value))
      const minuteModel = computed(() => createPickerBtnData(minuteActive.value, minuteEvent.value, minuteContent.value))

      return {
        showAmPm,
        amModel,
        pmModel,
        //
        hourModel,
        minuteModel
      }
    }
  }
</script>
<style scoped>
</style>
