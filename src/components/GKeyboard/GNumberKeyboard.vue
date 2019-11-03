<template>
	<div class="number-key">
		<slot name="screen">
			<div class="number-key-show ba-dgray-4 ba-thin bg-grey-lighten-3" style="height: calc(16.6667% - 4px)">
				<input id="number_key_output" class="number-key-text col-12 self-center bg-transparent fs-large-2 fw-700 pr-2" style="border: none; outline: none; direction: rtl" v-model="computedNumber">
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
          { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key9"'},
          { content: ['8'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key8"' },
          { content: ['9'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key9"' },
          { content: ['4'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key4"' },
          { content: ['5'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key5"' },
          { content: ['6'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key6"' },
          { content: ['1'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key1"' },
          { content: ['2'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key2"' },
          { content: ['3'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key3"' },
          { content: ['0'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key0"' },
          { content: ['00'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), bgStyle: 'grid-area: "key0"0' },
          { content: ['x'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value) => value.substring(0, value.length - 1), bgStyle: 'grid-area: "keyX"' },
          { content: ['C'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: () => '0', bgStyle: 'grid-area: "keyC"' },
          { content: ['&crarr;'], classes: 'key-number white', type: 'enter', action: () => null, bgStyle: 'grid-area: "Enter"; background-color: #000000' }
        ]
      },
      template: {
        type: String,
        default: 'grid-template: "key7 key8 key9" "key4 key5 key6" "key1 key2 key3" "key0 key00 keyX" "keyC Enter Enter"/ 1fr 1fr 1fr; grid-template-monthData: repeat(5, 1fr)'
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
