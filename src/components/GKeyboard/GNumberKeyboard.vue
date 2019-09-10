<template>
	<div class="number-key">
		<slot name="screen">
			<div class="number-key-show ba-blue-9 ba-thin bg-lgray-5">
				<div class="number-key-screen col-6">
					<label for="number_key_output" class="number-key-text bg-lgray-3 ba-blue-9 ba-thin w-100 br-2 white fs-small-2 fw-400 pl-2">{{label}}</label>
				</div>
				<input id="number_key_output" class="number-key-text col-5 self-center ta-right bg-lgray-5 fs-large-2 fw-700" style="border: none; outline: none" v-model="computedNumber">
			</div>
		</slot>
		<div class="number-key-numpad">
			<div v-for="(item) in items" :class="item.classes" :style="item.style" @click="click(item.action, item.content)" v-html="item.content"></div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'GNumberKeyboard',
    props: {
      label: String,
      value: [String, Number],
			items: {
        type: null,
				default:() => [
          { content: '7', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '8', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '9', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '4', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '5', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '6', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '1', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '2', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '3', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '0', classes: 'key-number bg-white ba-blue-9 ba-thin' },
          { content: '00', classes: 'key-number bg-white ba-blue-9 ba-thin', },
          { content: 'x', classes: 'key-number bg-white ba-blue-9 ba-thin', action: 'delete' },
          { content: 'C', classes: 'key-number bg-white ba-blue-9 ba-thin', action: 'clear' },
          { content: '&crarr;', classes: 'key-number key-number__extra bg-black white', action: 'enter' }
          ]
			}
    },
    computed: {
      computedNumber: {
        get() {
          return this.value;
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
    },
    methods: {
      click(action, content) {
        if (action === 'enter') {
          this.$emit('submit', { label: this.label, number: this.computedNumber });
        } else {
          if (action === 'delete') {
            this.computedNumber = this.computedNumber.substring(0, this.computedNumber.length - 1);
          } else if (action === 'clear') {
            this.computedNumber = '0';
          } else {
            if (parseInt(content) || parseInt(content) === 0) {
              this.computedNumber += content;
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>