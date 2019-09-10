<template>
	<div class="keyboard__template">
		<div v-for="item in items" :class="item.type" class="key" :style="item.style" @click="click(item.action, item.content)">
			<template v-if="item.content">
				<span v-html="item.content"></span>
			</template>
			<template v-if="item.img">
				<img class="h-80" :src="getImg(item.img)">
			</template>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'GKeyboard',
    props: {
      value: String,
    },
    data() {
      return {
        items: [
          { content: 'q', img: '', type: 'key-normal', style: 'grid-area: q' },
          { content: 'w', img: '', type: 'key-normal', style: 'grid-area: w' },
          { content: 'e', img: '', type: 'key-normal', style: 'grid-area: e' },
          { content: 'r', img: '', type: 'key-normal', style: 'grid-area: r' },
          { content: 't', img: '', type: 'key-normal', style: 'grid-area: t' },
          { content: 'y', img: '', type: 'key-normal', style: 'grid-area: y' },
          { content: 'u', img: '', type: 'key-normal', style: 'grid-area: u' },
          { content: 'i', img: '', type: 'key-normal', style: 'grid-area: i' },
          { content: 'o', img: '', type: 'key-normal', style: 'grid-area: o' },
          { content: 'p', img: '', type: 'key-normal', style: 'grid-area: p' },
          { content: '', img: 'delivery/key_delete', type: 'key-normal', style: 'grid-area: del; background-color: #e0e3e5', action: 'delete' },
          // {content: '', img: '', type: 'key-small'},
          { content: 'a', img: '', type: 'key-normal', style: 'grid-area: a' },
          { content: 's', img: '', type: 'key-normal', style: 'grid-area: s' },
          { content: 'd', img: '', type: 'key-normal', style: 'grid-area: d' },
          { content: 'f', img: '', type: 'key-normal', style: 'grid-area: f' },
          { content: 'g', img: '', type: 'key-normal', style: 'grid-area: g' },
          { content: 'h', img: '', type: 'key-normal', style: 'grid-area: h' },
          { content: 'j', img: '', type: 'key-normal', style: 'grid-area: j' },
          { content: 'k', img: '', type: 'key-normal', style: 'grid-area: k' },
          { content: 'l', img: '', type: 'key-normal', style: 'grid-area: l' },
          { content: '', img: 'delivery/arrow', type: 'key-large', style: 'grid-area: enter; background-color: #ff4452', action: 'enter' },
          { content: '', img: 'delivery/key_shift', type: 'key-normal', style: 'grid-area: shift1; background-color: #e0e3e5', action: 'shift' },
          { content: 'z', img: '', type: 'key-normal', style: 'grid-area: z' },
          { content: 'x', img: '', type: 'key-normal', style: 'grid-area: x' },
          { content: 'c', img: '', type: 'key-normal', style: 'grid-area: c' },
          { content: 'v', img: '', type: 'key-normal', style: 'grid-area: v' },
          { content: 'b', img: '', type: 'key-normal', style: 'grid-area: b' },
          { content: 'n', img: '', type: 'key-normal', style: 'grid-area: n' },
          { content: 'm', img: '', type: 'key-normal', style: 'grid-area: m' },
          { content: '!', img: '', type: 'key-normal', style: 'grid-area: ep', action: 'symbol' },
          { content: '?', img: '', type: 'key-normal', style: 'grid-area: qm', action: 'symbol' },
          { content: '', img: 'delivery/key_shift', type: 'key-normal', style: 'grid-area: shift2; background-color: #e0e3e5', action: 'shift' },
          { content: '?123', img: '', type: 'key-normal', style: 'grid-area: num1; background-color: #e0e3e5', action: 'number' },
          { content: '/', img: '', type: 'key-normal', style: 'grid-area: splash; background-color: #e0e3e5', action: 'symbol' },
          { content: '', img: '', type: 'key-space', style: 'grid-area: space', action: 'space' },
          { content: '.com', img: '', type: 'key-normal', style: 'grid-area: com; background-color: #e0e3e5', action: 'symbol' },
          { content: '.', img: '', type: 'key-normal', style: 'grid-area: dot; background-color: #e0e3e5', action: 'symbol' },
          { content: '?123', img: '', type: 'key-normal', style: 'grid-area: num2; background-color: #e0e3e5', action: 'number' },
        ],
        text: '',
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
			}
		},
    methods: {
      getImg(name) {
        return require('../../assets/' + name + '.svg');
      },
      click(action, content) {
        if (action === 'space') {
          this.computedValue += ' ';
        } else if (action === 'delete') {
          this.computedValue = this.computedValue.substring(0, this.computedValue.length - 1);
        } else if (action === 'shift') {
          this.isShift = !this.isShift;
          this.swapItemContentCase(this.isShift);
        } else if (action === 'enter') {
          this.$emit('submit', this.computedValue);
        } else if (action === 'number') {

        } else if (action === 'symbol') {
          this.computedValue += content;
        } else {
          this.computedValue += content;
          if (this.isShift) {
            this.isShift = false;
            this.swapItemContentCase(this.isShift);
          }
        }
      },
      swapItemContentCase(isShift) {
        for (let item of this.items) {
          if (isShift) {
            item.content = item.content.toUpperCase();
          } else {
            item.content = item.content.toLowerCase();
          }
        }
      }
    }
  }
</script>

<style scoped>
	.keyboard {
		display: grid;
		grid-template-columns: repeat(22, 1fr);
		grid-auto-columns: 1fr;
		grid-auto-rows: 1fr;
		grid-gap: 4px;
		background-color: #ebeff0;
		padding: 4px;
	}

	.keyboard__template {
		display: grid;
		grid-template-areas: "q q w w e e r r t t y y u u i i o o p p del del"
												". a a s s d d f f g g h h j j k k l l enter enter enter"
												"shift1 shift1 z z x x c c v v b b n n m m ep ep qm qm shift2 shift2"
												"num1 num1 splash splash space space space space space space space space space space space space com com dot dot num2 num2";
		grid-gap: 4px;
		padding: 4px;
		background-color: #ebeff0;
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