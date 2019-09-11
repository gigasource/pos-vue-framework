<template>
	<div class="keyboard__template" :style="template">
		<g-button v-for="item in items" :class="item.classes" class="key" :style="item.style" @click="click(item)">
			<template v-if="item.img">
				<img class="h-80" :src="getImg(item.img)">
			</template>
			<template v-if="item.content">
				<span v-if="item.content.length > 0 && item.content.length > index" v-html="item.content[index]"></span>
				<span v-else v-html="item.content[0]"></span>
			</template>
		</g-button>
	</div>
</template>

<script>
  import GButton from '../GButton';
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
          { content: ['q', 'Q'], img: '', classes: 'key-normal', style: 'grid-area: q', action: (value, append) => (value + append) },
          { content: ['w', 'W'], img: '', classes: 'key-normal', style: 'grid-area: w', action: (value, append) => (value + append) },
          { content: ['e', 'E'], img: '', classes: 'key-normal', style: 'grid-area: e', action: (value, append) => (value + append) },
          { content: ['r', 'R'], img: '', classes: 'key-normal', style: 'grid-area: r', action: (value, append) => (value + append) },
          { content: ['t', 'T'], img: '', classes: 'key-normal', style: 'grid-area: t', action: (value, append) => (value + append) },
          { content: ['y', 'Y'], img: '', classes: 'key-normal', style: 'grid-area: y', action: (value, append) => (value + append) },
          { content: ['u', 'U'], img: '', classes: 'key-normal', style: 'grid-area: u', action: (value, append) => (value + append) },
          { content: ['i', 'I'], img: '', classes: 'key-normal', style: 'grid-area: i', action: (value, append) => (value + append) },
          { content: ['o', 'O'], img: '', classes: 'key-normal', style: 'grid-area: o', action: (value, append) => (value + append) },
          { content: ['p', 'P'], img: '', classes: 'key-normal', style: 'grid-area: p', action: (value, append) => (value + append) },
          { content: [''], img: 'delivery/key_delete', classes: 'key-normal', style: 'grid-area: del; background-color: #e0e3e5', action: (value) => value.substring(0, value.length-1)},
          { content: ['a', 'A'], img: '', classes: 'key-normal', style: 'grid-area: a', action: (value, append) => (value + append) },
          { content: ['s', 'S'], img: '', classes: 'key-normal', style: 'grid-area: s', action: (value, append) => (value + append) },
          { content: ['d', 'D'], img: '', classes: 'key-normal', style: 'grid-area: d', action: (value, append) => (value + append) },
          { content: ['f', 'F'], img: '', classes: 'key-normal', style: 'grid-area: f', action: (value, append) => (value + append) },
          { content: ['g', 'G'], img: '', classes: 'key-normal', style: 'grid-area: g', action: (value, append) => (value + append) },
          { content: ['h', 'H'], img: '', classes: 'key-normal', style: 'grid-area: h', action: (value, append) => (value + append) },
          { content: ['j', 'J'], img: '', classes: 'key-normal', style: 'grid-area: j', action: (value, append) => (value + append) },
          { content: ['k', 'K'], img: '', classes: 'key-normal', style: 'grid-area: k', action: (value, append) => (value + append) },
          { content: ['l', 'L'], img: '', classes: 'key-normal', style: 'grid-area: l', action: (value, append) => (value + append) },
          { content: [], img: 'delivery/arrow', classes: 'key-large', style: 'grid-area: enter; background-color: #ff4452', type: 'enter'},
          { content: [], img: 'delivery/key_shift', classes: 'key-normal', style: 'grid-area: shift1; background-color: #e0e3e5', type: 'shift', action: (isShift) => (!isShift)},
          { content: ['z', 'Z'], img: '', classes: 'key-normal', style: 'grid-area: z', action: (value, append) => (value + append) },
          { content: ['x', 'X'], img: '', classes: 'key-normal', style: 'grid-area: x', action: (value, append) => (value + append) },
          { content: ['c', 'C'], img: '', classes: 'key-normal', style: 'grid-area: c', action: (value, append) => (value + append) },
          { content: ['v', 'V'], img: '', classes: 'key-normal', style: 'grid-area: v', action: (value, append) => (value + append) },
          { content: ['b', 'B'], img: '', classes: 'key-normal', style: 'grid-area: b', action: (value, append) => (value + append) },
          { content: ['n', 'N'], img: '', classes: 'key-normal', style: 'grid-area: n', action: (value, append) => (value + append) },
          { content: ['m', 'M'], img: '', classes: 'key-normal', style: 'grid-area: m', action: (value, append) => (value + append) },
          { content: ['!'], img: '', classes: 'key-normal', style: 'grid-area: ep', action: (value) => (value + '!') },
          { content: ['?'], img: '', classes: 'key-normal', style: 'grid-area: qm', action: (value) => (value + '?') },
          { content: [], img: 'delivery/key_shift', classes: 'key-normal', style: 'grid-area: shift2; background-color: #e0e3e5', type: 'shift', action: (isShift) => (!isShift)},
          { content: ['?123'], img: '', classes: 'key-normal', style: 'grid-area: num1; background-color: #e0e3e5', action: () => null },
          { content: ['/'], img: '', classes: 'key-normal', style: 'grid-area: splash; background-color: #e0e3e5', action: (value) => (value + '/') },
          { img: '', classes: 'key-space', style: 'grid-area: space', action: (value) => (value + ' ') },
          { content: ['.com'], img: '', classes: 'key-normal', style: 'grid-area: com; background-color: #e0e3e5', action: (value) => (value + '.com') },
          { content: ['.'], img: '', classes: 'key-normal', style: 'grid-area: dot; background-color: #e0e3e5', action: (value) => (value + '.') },
          { content: ['?123'], img: '', classes: 'key-normal', style: 'grid-area: num2; background-color: #e0e3e5', action: () => null },
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
	.keyboard__template {
		display: grid;
		grid-gap: 4px;
	}

	.key {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		border-radius: 4px;
		font-family: "Roboto", sans-serif;
	}

	.key-small {
		grid-area: span 1/ span 1;
		background-color: #eeeeee;
	}

	.key-normal {
		grid-area: span 1/ span 2;
	}

	.key-large {
		grid-area: span 1/ span 3;
	}

	.key-space {
		grid-area: span 1/span 12;
	}
</style>