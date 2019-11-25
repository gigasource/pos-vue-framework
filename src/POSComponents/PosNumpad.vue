<template>
	<g-keyboard v-model="internalValue" :template="template" :items="numpad"/>
</template>

<script>
  import GKeyboard from '../components/GKeyboard/GKeyboard';
  export default {
    name: 'PosNumpad',
    components: { GKeyboard },
		data() {
			return {
        numpad: [
          { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key7' },
          { content: ['8'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key8' },
          { content: ['9'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key9' },
          { content: ['4'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key4' },
          { content: ['5'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key5' },
          { content: ['6'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key6' },
          { content: ['1'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key1' },
          { content: ['2'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key2' },
          { content: ['3'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key3' },
          { content: ['0'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key0' },
          { content: ['.'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: keyDot' },
          { content: [''], img: 'delivery/key_delete', classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value) => value.substring(0, value.length - 1), style: 'grid-area: keyX' },
        ],
        template: 'grid-template: "key7 key8 key9" "key4 key5 key6" "key1 key2 key3" "key0 keyDot keyX"/ 1fr 1fr 1fr',
			}
		},
    props: {
      value: null,
    },
    computed: {
      internalValue: {
        get () {
          return this.value;
        },
        set (val) {
          this.$emit('input', val);
        }
      }
    }
  }
</script>

<style scoped>

</style>