<template>
  <div>
    <div style="padding: 30px">
      <h2>Date Picker</h2>
      <div style="display:flex">
        <div>
          <h4>Single select</h4>
          <g-date-picker v-model="singleSelect"></g-date-picker>
        </div>
        <div>
          <h4>Multiple select</h4>
          <g-date-picker multiple v-model="multipleSelect"></g-date-picker>
        </div>
        <div>
          <h4>Range select</h4>
          <g-date-picker range v-model="rangeSelect"></g-date-picker>
        </div>
      </div>

      <div>
        <h4>Another Options: </h4>
        <span>
          <label for="Landscape">Landscape</label>
          <input type="checkbox" id="Landscape" v-model="landscape" class="ma-4"/>
        </span>
        <span>
          <label for="Fullwidth">Full width</label>
          <input type="checkbox" id="Fullwidth" v-model="fullWidth" class="ma-4"/>
        </span>
        <span>
          <label for="ShowCurrentDate">Show _currentDateMonth date</label>
          <input type="checkbox" id="ShowCurrentDate" v-model="showCurrent" class="ma-4"/>
        </span>
        <span>
          <label for="Readonly">Readonly</label>
          <input type="checkbox" id="Readonly" v-model="readonly" class="ma-4"/>
        </span>
        <span>
          <label for="Disabled">Disabled</label>
          <input type="checkbox" id="Disabled" v-model="disabled" class="ma-4"/>
        </span>
        <span>
          <label for="Events">Events</label>
          <input type="checkbox" id="Events" v-model="enableEvents" class="ma-4"/>
        </span>
        <span>
          <label for="Color">Color</label>
          <input style="border: 1px solid black" type="text" id="Color" v-model="color" class="ma-4"/>
        </span>
        <span>
          <label for="HeaderColor">Header Color</label>
          <input style="border: 1px solid black" type="text" id="HeaderColor" v-model="headerColor" class="ma-4"/>
        </span>
      </div>
      <div style="width: 100%">
        <g-date-picker
            v-model="anotherOptionsModel"
            :landscape="landscape"
            :full-width="fullWidth"
            :show-current="showCurrent"
            :type="month ? 'month' : 'date'"
            :readonly="readonly"
            :disabled="disabled"
            :events="enableEvents ? functionEvents : null"
            :color="color"
            :header-color="headerColor"
        >
          <div style="height: 40px; flex-direction: row-reverse; display: flex; margin-bottom: 10px; margin-right: 10px;">
            <button style="width: 80px; background-color: #fff" @click="log('Cancel clicked')">Cancel</button>&nbsp;
            <button style="width: 80px; background-color: #fff" @click="log('OK Clicked')">OK</button>
          </div>
        </g-date-picker>
      </div>
      <div>
        <h4>No Title</h4>
        <g-date-picker no-title v-model="anotherOptionsModel"></g-date-picker>
      </div>
    </div>
    <div  style="padding: 30px">
      <h2>Month picker</h2>
      <div style="display: flex">
        <div>
          <h4>Single select</h4>
          <g-date-picker type="month" v-model="monthSelect" scrollable></g-date-picker>
        </div>

        <div>
          <h4>Multiple select</h4>
          <g-date-picker type="month" v-model="monthMultipleSelect" multiple landscape show-current></g-date-picker>
        </div>
      </div>
    </div>

    <div style="padding: 30px">
      <h3>Range picker</h3>
      <g-date-range-picker></g-date-range-picker>
    </div>
  </div>
</template>
<script>
  import GDatePicker from '../components/GDatePicker/GDatePicker';
  import GDateRangePicker from '../components/GDateRangePicker/GDateRangePicker';

  export default {
    name: 'DatePickerDemo',
    components: { GDatePicker, GDateRangePicker },
    props: {},
    data: function () {
      return {
        // dates
        singleSelect: new Date().toISOString().substr(0, 10),
        multipleSelect: [new Date().toISOString().substr(0, 10)],
        rangeSelect: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
        anotherOptionsModel: new Date(2020, 4, 6).toISOString().substr(0, 10),
        // months
        monthSelect: new Date().toISOString().substr(0, 10),
        monthMultipleSelect: [],
        //
        landscape: false,
        reactive: false,
        fullWidth: false,
        showCurrent: false,
        month: false,
        multiple: false,
        readonly: false,
        disabled: false,
        enableEvents: false,
        range: true,
        color: '#66BB6A',
        headerColor: '#1867c0',
        noTitle: false
      }
    },
    computed: {
      functionEvents() {
        return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
      },
    },

    methods: {
      dateFunctionEvents(date) {
        const [, , day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) {
          return true
        }
        if ([1, 19, 22].includes(parseInt(day, 10))) {
          return ['red', '#00f']
        }
        return false
      },
      monthFunctionEvents(date) {
        const month = parseInt(date.split('-')[1], 10)
        if ([1, 3, 7].includes(month)) {
          return true
        }
        if ([2, 5, 12].includes(month)) {
          return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
        }
        return false
      },
      log(msg) {
        console.log(msg)
      }
    },
  }
</script>
<style scoped>
</style>
