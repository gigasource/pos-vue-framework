<template>
	<div class="keyboard__template" :style="template">
		<g-button v-for="(item, i) in items" :key="i" :class="item.classes" class="key" :style="item.bgStyle" @click="click(item)">
			<!-- TODO: responsive height for img -->
			<img v-if="item.img" style="height: 16px" :src="getImg(item.img)">
			<template v-if="item.content">
				<span v-if="item.content.length > 0 && item.content.length > index" v-html="item.content[index]"></span>
				<span v-else v-html="item.content[0]"></span>
			</template>
		</g-button>
	</div>
</template>

<script>
  import GButton from '../GButton/GButton';
  export default {
    name: 'GKeyboard',
    components: { GButton },
    props: {
      value: String,
			template: {
        type: String,
				default: 'grid-template-areas: "q q w w e e r r t t y y u u i i o o p p del del" ' +
																			'". a a s s d d f f g g h h j j k k l l enter enter enter" ' +
																			'"shift1 shift1 z z x x c c v v b b n n m m ep ep qm qm shift2 shift2" ' +
																			'"num1 num1 splash splash space space space space space space space space space space space space com com dot dot num2 num2"'
			},
      items: {
        type: Array,
				default: () => [
          { content: ['q', 'Q'], img: '', bgStyle: 'grid-area: q', action: (value, append) => (value + append) },
          { content: ['w', 'W'], img: '', bgStyle: 'grid-area: w', action: (value, append) => (value + append) },
          { content: ['e', 'E'], img: '', bgStyle: 'grid-area: e', action: (value, append) => (value + append) },
          { content: ['r', 'R'], img: '', bgStyle: 'grid-area: r', action: (value, append) => (value + append) },
          { content: ['t', 'T'], img: '', bgStyle: 'grid-area: t', action: (value, append) => (value + append) },
          { content: ['y', 'Y'], img: '', bgStyle: 'grid-area: y', action: (value, append) => (value + append) },
          { content: ['u', 'U'], img: '', bgStyle: 'grid-area: u', action: (value, append) => (value + append) },
          { content: ['i', 'I'], img: '', bgStyle: 'grid-area: i', action: (value, append) => (value + append) },
          { content: ['o', 'O'], img: '', bgStyle: 'grid-area: o', action: (value, append) => (value + append) },
          { content: ['p', 'P'], img: '', bgStyle: 'grid-area: p', action: (value, append) => (value + append) },
          { content: [''], img: 'delivery/key_delete', bgStyle: 'grid-area: del; background-color: #e0e3e5', action: (value) => value.substring(0, value.length-1)},
          { content: ['a', 'A'], img: '', bgStyle: 'grid-area: a', action: (value, append) => (value + append) },
          { content: ['s', 'S'], img: '', bgStyle: 'grid-area: s', action: (value, append) => (value + append) },
          { content: ['d', 'D'], img: '', bgStyle: 'grid-area: d', action: (value, append) => (value + append) },
          { content: ['f', 'F'], img: '', bgStyle: 'grid-area: f', action: (value, append) => (value + append) },
          { content: ['g', 'G'], img: '', bgStyle: 'grid-area: g', action: (value, append) => (value + append) },
          { content: ['h', 'H'], img: '', bgStyle: 'grid-area: h', action: (value, append) => (value + append) },
          { content: ['j', 'J'], img: '', bgStyle: 'grid-area: j', action: (value, append) => (value + append) },
          { content: ['k', 'K'], img: '', bgStyle: 'grid-area: k', action: (value, append) => (value + append) },
          { content: ['l', 'L'], img: '', bgStyle: 'grid-area: l', action: (value, append) => (value + append) },
          { content: [], img: 'delivery/arrow', bgStyle: 'grid-area: enter; background-color: #ff4452', type: 'enter'},
          { content: [], img: 'delivery/key_shift', bgStyle: 'grid-area: shift1; background-color: #e0e3e5', type: 'shift', action: (isShift) => (!isShift)},
          { content: ['z', 'Z'], img: '', bgStyle: 'grid-area: z', action: (value, append) => (value + append) },
          { content: ['x', 'X'], img: '', bgStyle: 'grid-area: x', action: (value, append) => (value + append) },
          { content: ['c', 'C'], img: '', bgStyle: 'grid-area: c', action: (value, append) => (value + append) },
          { content: ['v', 'V'], img: '', bgStyle: 'grid-area: v', action: (value, append) => (value + append) },
          { content: ['b', 'B'], img: '', bgStyle: 'grid-area: b', action: (value, append) => (value + append) },
          { content: ['n', 'N'], img: '', bgStyle: 'grid-area: n', action: (value, append) => (value + append) },
          { content: ['m', 'M'], img: '', bgStyle: 'grid-area: m', action: (value, append) => (value + append) },
          { content: ['!'], img: '', bgStyle: 'grid-area: ep', action: (value) => (value + '!') },
          { content: ['?'], img: '', bgStyle: 'grid-area: qm', action: (value) => (value + '?') },
          { content: [], img: 'delivery/key_shift', bgStyle: 'grid-area: shift2; background-color: #e0e3e5', type: 'shift', action: (isShift) => (!isShift)},
          { content: ['?123'], img: '', bgStyle: 'grid-area: num1; background-color: #e0e3e5', action: () => null },
          { content: ['/'], img: '', bgStyle: 'grid-area: splash; background-color: #e0e3e5', action: (value) => (value + '/') },
          { bgStyle: 'grid-area: space', action: (value) => (value + ' ') },
          { content: ['.com'], img: '', bgStyle: 'grid-area: com; background-color: #e0e3e5', action: (value) => (value + '.com') },
          { content: ['.'], img: '', bgStyle: 'grid-area: dot; background-color: #e0e3e5', action: (value) => (value + '.') },
          { content: ['?123'], img: '', bgStyle: 'grid-area: num2; background-color: #e0e3e5', action: () => null },
        ]
			},
    },
    data() {
      return {
        isShift: false,
      }
    },
		computed: {
      computedValue: {
        get() {
          return this.value;
				},
				set(value) {
          this.$emit('input', value);
				}
			},
			index() {
          return this.isShift ? '1' : '0';
			}
		},
    methods: {
      getImg(name) {
        return require('../../assets/' + name + '.svg');
      },
      click(item) {
        if(item.type === 'shift'){
          this.isShift = item.action(this.isShift);
				} else if(item.type === 'enter') {
          this.$emit('submit', this.value);
				} else {
          this.computedValue = item.content ? item.action(this.computedValue, item.content[this.index]) : item.action(this.computedValue);
				}
      },
    }
  }
</script>

<style scoped>

</style>
