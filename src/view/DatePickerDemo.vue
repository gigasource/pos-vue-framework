<template>
  <div>
    <div>
      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="Landscape">Landscape</label>
        <input type="checkbox" id="Landscape" v-model="landscape" class="ma-4"/>
      </span>

      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="Reactive">Reactive</label>
        <input type="checkbox" id="Reactive" v-model="reactive" class="ma-4" label="Reactive"/>
      </span>

      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="Fullwidth">Full width</label>
        <input type="checkbox" id="Fullwidth" v-model="fullWidth" class="ma-4" label="Fullwidth"/>
      </span>

      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="ShowCurrentDate">Show current date</label>
        <input type="checkbox" id="ShowCurrentDate" v-model="showCurrent" class="ma-4" label="Show current date"/>
      </span>

      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="MonthPicker">Month picker</label>
        <input type="checkbox" id="MonthPicker" v-model="month" class="ma-4" label="Month picker"/>
      </span>

      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="Multiple">Multiple</label>
        <input type="checkbox" id="Multiple" v-model="multiple" class="ma-4" label="Multiple"/>
      </span>

      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="Readonly">Readonly</label>
        <input type="checkbox" id="Readonly" v-model="readonly" class="ma-4" label="Readonly"/>
      </span>

      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="Disabled">Disabled</label>
        <input type="checkbox" id="Disabled" v-model="disabled" class="ma-4" label="Disabled"/>
      </span>

      <span style="border: 1px solid black; margin-left: 5px; display: inline-block;">
        <label for="Events">Events</label>
        <input type="checkbox" id="Events" v-model="enableEvents" class="ma-4" label="Events"/>
      </span>
    </div>

    <div style="width: 100%">
      <g-date-picker
          v-model="picker"
          :landscape="landscape"
          :reactive="reactive"
          :full-width="fullWidth"
          :show-current="showCurrent"
          :type="month ? 'month' : 'date'"
          :multiple="multiple"
          :readonly="readonly"
          :disabled="disabled"
          :events="enableEvents ? functionEvents : null"
      >
      </g-date-picker>
    </div>
  </div>
</template>
<script>
  import GDatePicker from '../components/GDatePicker/GDatePicker';

  export default {
    name: 'DatePickerDemo',
    components: { GDatePicker },
    props: {},
    data: function () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false,
        fullWidth: false,
        showCurrent: true,
        month: false,
        multiple: false,
        readonly: false,
        disabled: false,
        enableEvents: false,
      }
    },
    computed: {
      functionEvents () {
        return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
      },
    },

    methods: {
      dateFunctionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
      monthFunctionEvents (date) {
        const month = parseInt(date.split('-')[1], 10)
        if ([1, 3, 7].includes(month)) return true
        if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
        return false
      },
    },
  }
</script>
<style scoped>
</style>
