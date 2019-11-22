<template>

  <g-dialog v-model="dialog">
    <template v-slot:activator="{ toggleDialog }">
      <g-btn @click="toggleDialog" flat text-color="#1271FF">
        <p>Date Time</p>
        <g-icon right size="10" svg>icon-path-filter</g-icon>
      </g-btn>
    </template>
    <g-card height="100%" width="100%">

      <g-grid-layout :layout="layout">
        <div area="header" style="padding: 16px 16px 12px 16px; border-bottom: 1px solid #E0E0E0;">
          <p>Datetime Selection</p>
          <g-grid-select :grid="false" :items="items" v-model="selectedDatetime">
            <template #default="{toggleSelect, item, index}">
              <g-btn @click="toggleSelect(item)" class="date-time-button" outlined text-color="#2979FF" width="105">{{item.text}}</g-btn>
            </template>
            <template #selected="{toggleSelect, item, index}">
              <g-btn @click="toggleSelect(item)" background-color="#2979FF" class="date-time-button" text-color="white" width="105">{{item.text}}</g-btn>
            </template>
          </g-grid-select>

        </div>
        <div area="header-left" style="padding: 21px 21px 0 21px; font-weight: normal; font-size: 14px; line-height: 18px; color: #9E9E9E">
          <p>End Date</p>
          <div style="display: flex">
            <p-o-s-select :items="startDays" v-model="selectedStartDay"></p-o-s-select>
            <p-o-s-select :items="startMonths" v-model="selectedStartMonth"></p-o-s-select>
            <p-o-s-select :items="startYears" v-model="selectedStartYear"></p-o-s-select>
          </div>
        </div>
        <div area="picker-left" style="border: 1px solid #DFE4E8; border-radius: 8px 0 0 8px; margin-left: 21px; border-right: none">
          <pos-datetime-picker></pos-datetime-picker>
        </div>
        <div area="header-right" style="padding: 21px 21px 0 21px; font-weight: normal; font-size: 14px; line-height: 18px; color: #9E9E9E">
          <p>End Date</p>
          <div style="display: flex">
            <p-o-s-select :items="endDays" v-model="selectedEndDay"></p-o-s-select>
            <p-o-s-select :items="endMonths" v-model="selectedEndMonth"></p-o-s-select>
            <p-o-s-select :items="endYears" v-model="selectedEndYear"></p-o-s-select>
          </div>
        </div>
        <div area="picker-right" style="border: 1px solid #DFE4E8; border-radius: 0 8px 8px 0; margin-right: 21px">
          <pos-datetime-picker></pos-datetime-picker>
        </div>

        <div area="button-control" style="display: flex; justify-content: flex-end; padding: 16px 22px 16px 22px">
          <g-btn @click="dialog = false" background-color="#EFEFEF" flat style="margin-right: 16px" width="120">Cancel</g-btn>
          <g-btn @click="dialog = false" background-color="#2979FF" flat text-color="white" width="120">OK</g-btn>
        </div>
      </g-grid-layout>
    </g-card>

  </g-dialog>
</template>

<script>
  import { ref } from '@vue/composition-api';
  import GDialog from '../../components/GDialog/GDialog';
  import GDatePicker from '../../components/GDatePicker/GDatePicker';
  import GBtn from '../../components/GBtn/GBtn';
  import GIcon from '../../components/GIcon/GIcon';
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';
  import datepickerLayout from './datepickerLayout'
  import GCard from '../../components/GCard/GCard';
  import POSSelect from '../../POSComponents/POSInput/POSSelect';
  import PosDatetimePicker from './PosDatetimePicker';
  import GSpacer from '../../components/GLayout/GSpacer';
  import GGridSelect from '../../components/GGridSelect/GGridSelect';


  export default {
    name: 'DatePickerDialog',
    components: { GGridSelect, GSpacer, PosDatetimePicker, POSSelect, GCard, GGridLayout, GDialog, GDatePicker, GBtn, GIcon },
    data: () => ({
      layout: datepickerLayout,
      items: [
        { text: 'Custom', value: 'Custom', style: '', outlined: true, textColor: '#2979FF', width: '105' },
        { text: 'Today', value: 'Today', style: '', outlined: true, textColor: '#2979FF', width: '94' },
        { text: 'Yesterday', value: 'Yesterday', style: '', outlined: true, textColor: '#2979FF', width: '118' },
        { text: 'This week', value: 'This week', style: '', outlined: true, textColor: '#2979FF', width: '120' },
        { text: 'This month', value: 'This month', style: '', outlined: true, textColor: '#2979FF', width: '127' }
      ],
      startDate: null,
      selectedStartDay: null,
      selectedStartMonth: null,
      selectedStartYear: null,
      startDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      startMonths: [{ text: 'Jan', value: 'Jan' }, { text: 'Feb', value: 'Feb' }, { text: 'Mar', value: 'Mar' }, { text: 'Apr', value: 'Apr' }, { text: 'May', value: 'May' }, { text: 'Jun', value: 'Jun' }, { text: 'Jul', value: 'Jul' }, { text: 'Aug', value: 'Aug' }, { text: 'Sep', value: 'Sep' }, { text: 'Oct', value: 'Oct' }, { text: 'Nov', value: 'Nov' }, { text: 'Dec', value: 'Dec' }],
      startYears: ['2018', '2019', '2020', '2021', '2022'],
      endDate: null,
      selectedEndDay: null,
      selectedEndMonth: null,
      selectedEndYear: null,
      endDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      endMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      endYears: ['2018', '2019', '2020', '2021', '2022'],
      selectedDatetime: null
    }),
    created() {
      this.selectedDatetime = this.items[0]
    }
    ,
    setup() {
      const dialog = ref(false)

      return {
        dialog
      }
    }
  }
</script>

<style lang="scss" scoped>
  .date-time-button {
    margin: 8px;
  }
</style>
