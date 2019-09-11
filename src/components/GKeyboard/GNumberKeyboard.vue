<template>
	<div class="number-key">
		<slot name="screen">
			<div class="number-key-show ba-blue-9 ba-thin bg-lgray-5" style="height: calc(16.6667% - 3px)">
				<div class="number-key-screen col-6">
					<label for="number_key_output" class="number-key-text bg-lgray-3 ba-blue-9 ba-thin w-100 br-2 white fs-small-2 fw-400 pl-2">{{label}}</label>
				</div>
				<input id="number_key_output" class="number-key-text col-5 self-center ta-right bg-lgray-5 fs-large-2 fw-700" style="border: none; outline: none" v-model="computedNumber">
			</div>
		</slot>
		<g-keyboard :items="items" v-model="computedNumber" :template="template" class="flex-grow-1"></g-keyboard>
	</div>
</template>

<script>
  import GKeyboard from './GKeyboard';
  export default {
    name: 'GNumberKeyboard',
    components: { GKeyboard },
    props: {
      label: String,
      value: [String, Number],
			items: {
        type: null,
				default:() => [
          { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['8'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['9'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['4'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['5'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['6'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['1'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['2'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['3'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['0'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value, append) => (value + append) },
          { content: ['00'], classes: 'key-number bg-white ba-blue-9 ba-thin',action: (value, append) => (value + append) },
          { content: ['x'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: (value) => value.substring(0, value.length-1)},
          { content: ['C'], classes: 'key-number bg-white ba-blue-9 ba-thin' ,action: () => '0' },
          { content: ['&crarr;'], classes: 'key-number key-number__extra white', type: 'enter', action: () => null, style:'background-color: #000000' }
        ]
			},
			template: {
        type: String,
				default: 'grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1ft; grid-auto-columns: 1fr'
			}
    },
    computed: {
      computedNumber: {
        get() {
          return '' + this.value;
        },
        set(value) {
          if(value.length === 0){
            value = '0';
					} else {
            value = '' + parseInt(value);
					}
          this.$emit('input', value);
        }
      }
    }
  }
</script>

<style scoped>

</style>