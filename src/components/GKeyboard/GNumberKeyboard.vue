<template>
	<div class="number-key">
		<slot name="screen">
			<div class="number-key-show ba-dgray-4 ba-thin bg-lgray-2" style="height: calc(16.6667% - 4px)">
				<div class="number-key-screen col-6">
					<label for="number_key_output" class="number-key-text bg-dgray-9 ba-blue-9 ba-thin w-100 br-2 white fs-small-2 fw-400 pl-2">{{label}}</label>
				</div>
				<input id="number_key_output" class="number-key-text col-6 self-center ta-right bg-dgray-9 fs-large-2 fw-700 pr-2" style="border: none; outline: none; direction: rtl" v-model="computedNumber">
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
        default: () => [
          { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key9"'},
          { content: ['8'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key8"' },
          { content: ['9'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key9"' },
          { content: ['4'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key4"' },
          { content: ['5'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key5"' },
          { content: ['6'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key6"' },
          { content: ['1'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key1"' },
          { content: ['2'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key2"' },
          { content: ['3'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key3"' },
          { content: ['0'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key0"' },
          { content: ['00'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: "key0"0' },
          { content: ['x'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value) => value.substring(0, value.length - 1), style: 'grid-area: "keyX"' },
          { content: ['C'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: () => '0', style: 'grid-area: "keyC"' },
          { content: ['&crarr;'], classes: 'key-number white', type: 'enter', action: () => null, style: 'grid-area: "Enter"; background-color: #000000' }
        ]
      },
      template: {
        type: String,
        default: 'grid-template-areas: "key7 key8 key9" "key4 key5 key6" "key1 key2 key3" "key0 key00 keyX" "keyC Enter Enter"'
      }
    },
    computed: {
      computedNumber: {
        get() {
          return '' + this.value;
        },
        set(value) {
          if (value.length === 0) {
            value = '0';
          } else {
            //TODO: bigint > 2^53
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