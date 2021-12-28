<template>
	<div class="keyboard__template" :style="template">
		<div v-for="(item, i) in items"
         :key="i" :class="[item.classes]"
         class="key"
         :style="item.style"
         @click="click(item)"
         v-ripple="ripple"
    >
			<!-- TODO: responsive height for img -->
			<img v-if="item.img" style="height: 16px" :src="getImg(item.img)">
      <g-icon v-if="item.icon" :svg="item.svg">{{item.icon}}</g-icon>
			<template v-if="item.content">
				<span v-if="item.content.length > 0 && item.content.length > index" v-html="item.content[index]"></span>
				<span v-else v-html="item.content[0]"></span>
			</template>
		</div>
	</div>
</template>

<script>
  import GIcon from '../GIcon/GIcon';
  import Ripple from '../../directives/ripple/ripple'
  export default {
    name: 'GKeyboard',
    components: { GIcon },
    directives: {Ripple},
    props: {
      modelValue: String,
      emits: ['update:modelValue', 'submit', 'edit'],
			ripple: {
				type: Boolean,
				default: true
			},
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
          { content: ['q', 'Q'], img: '', style: 'grid-area: q', action: (value, append) => (value + append) },
          { content: ['w', 'W'], img: '', style: 'grid-area: w', action: (value, append) => (value + append) },
          { content: ['e', 'E'], img: '', style: 'grid-area: e', action: (value, append) => (value + append) },
          { content: ['r', 'R'], img: '', style: 'grid-area: r', action: (value, append) => (value + append) },
          { content: ['t', 'T'], img: '', style: 'grid-area: t', action: (value, append) => (value + append) },
          { content: ['y', 'Y'], img: '', style: 'grid-area: y', action: (value, append) => (value + append) },
          { content: ['u', 'U'], img: '', style: 'grid-area: u', action: (value, append) => (value + append) },
          { content: ['i', 'I'], img: '', style: 'grid-area: i', action: (value, append) => (value + append) },
          { content: ['o', 'O'], img: '', style: 'grid-area: o', action: (value, append) => (value + append) },
          { content: ['p', 'P'], img: '', style: 'grid-area: p', action: (value, append) => (value + append) },
          { content: [''], img: 'delivery/key_delete', style: 'grid-area: del; background-color: #e0e3e5', action: (value) => value.substring(0, value.length-1)},
          { content: ['a', 'A'], img: '', style: 'grid-area: a', action: (value, append) => (value + append) },
          { content: ['s', 'S'], img: '', style: 'grid-area: s', action: (value, append) => (value + append) },
          { content: ['d', 'D'], img: '', style: 'grid-area: d', action: (value, append) => (value + append) },
          { content: ['f', 'F'], img: '', style: 'grid-area: f', action: (value, append) => (value + append) },
          { content: ['g', 'G'], img: '', style: 'grid-area: g', action: (value, append) => (value + append) },
          { content: ['h', 'H'], img: '', style: 'grid-area: h', action: (value, append) => (value + append) },
          { content: ['j', 'J'], img: '', style: 'grid-area: j', action: (value, append) => (value + append) },
          { content: ['k', 'K'], img: '', style: 'grid-area: k', action: (value, append) => (value + append) },
          { content: ['l', 'L'], img: '', style: 'grid-area: l', action: (value, append) => (value + append) },
          { content: [], img: 'delivery/arrow', style: 'grid-area: enter; background-color: #ff4452', type: 'enter'},
          { content: [], img: 'delivery/key_shift', style: 'grid-area: shift1; background-color: #e0e3e5', type: 'shift', action: (isShift) => (!isShift)},
          { content: ['z', 'Z'], img: '', style: 'grid-area: z', action: (value, append) => (value + append) },
          { content: ['x', 'X'], img: '', style: 'grid-area: x', action: (value, append) => (value + append) },
          { content: ['c', 'C'], img: '', style: 'grid-area: c', action: (value, append) => (value + append) },
          { content: ['v', 'V'], img: '', style: 'grid-area: v', action: (value, append) => (value + append) },
          { content: ['b', 'B'], img: '', style: 'grid-area: b', action: (value, append) => (value + append) },
          { content: ['n', 'N'], img: '', style: 'grid-area: n', action: (value, append) => (value + append) },
          { content: ['m', 'M'], img: '', style: 'grid-area: m', action: (value, append) => (value + append) },
          { content: ['!'], img: '', style: 'grid-area: ep', action: (value) => (value + '!') },
          { content: ['?'], img: '', style: 'grid-area: qm', action: (value) => (value + '?') },
          { content: [], img: 'delivery/key_shift', style: 'grid-area: shift2; background-color: #e0e3e5', type: 'shift', action: (isShift) => (!isShift)},
          { content: ['?123'], img: '', style: 'grid-area: num1; background-color: #e0e3e5', action: () => null },
          { content: ['/'], img: '', style: 'grid-area: splash; background-color: #e0e3e5', action: (value) => (value + '/') },
          { style: 'grid-area: space', action: (value) => (value + ' ') },
          { content: ['.com'], img: '', style: 'grid-area: com; background-color: #e0e3e5', action: (value) => (value + '.com') },
          { content: ['.'], img: '', style: 'grid-area: dot; background-color: #e0e3e5', action: (value) => (value + '.') },
          { content: ['?123'], img: '', style: 'grid-area: num2; background-color: #e0e3e5', action: () => null },
        ]
			},
    },
    data() {
      return {
        isShift: false,
      }
    },
		emits: ['update:modelValue', 'submit', 'edit'],
		computed: {
      computedValue: {
        get() {
          return this.modelValue || '';
				},
				set(value) {
          this.$emit('update:modelValue', value);
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
				} else if(item.type === 'edit') {
					this.$emit('edit', item.position);
				} else {
          this.computedValue = item.content ? item.action(this.computedValue, item.content[this.index]) : item.action(this.computedValue);
				}

      },
    }
  }
</script>

<style scoped lang="scss">
	@import "GKeyboard";
</style>
