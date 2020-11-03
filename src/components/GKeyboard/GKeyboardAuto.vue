<template>
  <div class="keyboard__template" :style="template">
    <div v-for="(item, i) in items" :key="i" :class="[item.classes, ripple ? 'waves-effect' : '']" class="key"
         :style="item.style" @click="click(item)" @mousedown="onMouseDown(item)" @mouseup="onMouseUp(item)">
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
  import './jsCaret'; // this must be import only once
  const queue = require('queue')
  /*
      action: null -> insert
      action: String , ex: action: 'delete', action: 'shift'
   */

  const actionMap = {
    delete() {
      if (!this.caret) return;
      this.caret.get().start !== this.caret.get().end ?
          this.caret.set(this.caret.get().start, this.caret.get().end).insert('') :
          this.caret.get().end > 0 ? this.caret.set(this.caret.get().end - 1, this.caret.get().end).insert('') : null;
    },
    shift() {
      this.isShift = !this.isShift;
    },
    insert(append) {
      if (!this.caret) return;
      this.caret.insert(append);
    },
    enter() {
      if (!this.caret) this.$emit('submit');
      else this.$emit('submit', this.caret.element.value);
    }
  }

  export default {
    name: 'GKeyboardAuto',
    components: {GIcon},
    props: {
      value: String,
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
          {content: ['q', 'Q'], style: 'grid-area: q'},
          {content: ['w', 'W'], style: 'grid-area: w'},
          {content: ['e', 'E'], style: 'grid-area: e'},
          {content: ['r', 'R'], style: 'grid-area: r'},
          {content: ['t', 'T'], style: 'grid-area: t'},
          {content: ['y', 'Y'], style: 'grid-area: y'},
          {content: ['u', 'U'], style: 'grid-area: u'},
          {content: ['i', 'I'], style: 'grid-area: i'},
          {content: ['o', 'O'], style: 'grid-area: o'},
          {content: ['p', 'P'], style: 'grid-area: p'},
          {
            content: [],
            img: 'delivery/key_delete',
            style: 'grid-area: del; background-color: #e0e3e5',
            action: 'delete'
          },
          {content: ['a', 'A'], style: 'grid-area: a'},
          {content: ['s', 'S'], style: 'grid-area: s'},
          {content: ['d', 'D'], style: 'grid-area: d'},
          {content: ['f', 'F'], style: 'grid-area: f'},
          {content: ['g', 'G'], style: 'grid-area: g'},
          {content: ['h', 'H'], style: 'grid-area: h'},
          {content: ['j', 'J'], style: 'grid-area: j'},
          {content: ['k', 'K'], style: 'grid-area: k'},
          {content: ['l', 'L'], style: 'grid-area: l'},
          {content: [], img: 'delivery/arrow', style: 'grid-area: enter; background-color: #ff4452', action: 'enter'},
          {
            content: [],
            img: 'delivery/key_shift',
            style: 'grid-area: shift1; background-color: #e0e3e5',
            action: 'shift'
          },
          {content: ['z', 'Z'], style: 'grid-area: z'},
          {content: ['x', 'X'], style: 'grid-area: x'},
          {content: ['c', 'C'], style: 'grid-area: c'},
          {content: ['v', 'V'], style: 'grid-area: v'},
          {content: ['b', 'B'], style: 'grid-area: b'},
          {content: ['n', 'N'], style: 'grid-area: n'},
          {content: ['m', 'M'], style: 'grid-area: m'},
          {content: ['!'], style: 'grid-area: ep'},
          {content: ['?'], style: 'grid-area: qm'},
          {
            content: [],
            img: 'delivery/key_shift',
            style: 'grid-area: shift2; background-color: #e0e3e5',
            action: 'shift'
          },
          {content: ['?123'], style: 'grid-area: num1; background-color: #e0e3e5', action: () => null},
          {
            content: ['/'],
            style: 'grid-area: splash; background-color: #e0e3e5'
          },
          {style: 'grid-area: space', action: (caret) => (caret.insert(' '))},
          {
            content: ['.com'],
            style: 'grid-area: com; background-color: #e0e3e5'
          },
          {
            content: ['.'],
            style: 'grid-area: dot; background-color: #e0e3e5'
          },
          {content: ['?123'], style: 'grid-area: num2; background-color: #e0e3e5', action: () => null},
        ]
      },
    },
    data() {
      return {
        isShift: false,
        preEle: null,
        caret: null,
        queue: null,
        deleteHoldTime: null
      }
    },
    created() {
      this.queue = queue()
    },
    computed: {
      index() {
        return this.isShift ? '1' : '0';
      }
    },
    methods: {
      getImg(name) {
        return require('../../assets/' + name + '.svg');
      },
      click(item) {
        if (typeof item.action === 'string') {
          this.queue.push(actionMap[item.action].bind(this)());
        } else if (item.content && item.content.length) {
          if (item.action) {
            if (this.caret) {
              this.queue.push(item.action(this.caret, item.content));
            }
          } else {
            const value = item.content[item.content.length > 1 ? this.index : 0]
            this.queue.push(actionMap.insert.bind(this)(value));
            if(this.isShift) this.isShift = false
          }
        } else {
          if (this.caret && item.action) {
            this.queue.push(item.action(this.caret));
          }
        }
        //set caret to the next position
        if (this.caret) {
          this.caret.set(this.caret.get().end);
          this.caret.element.dispatchEvent(new Event('input'));
        }
      },
      onMouseDown(item) {
        if (document.caretElement && this.preEle !== document.caretElement.element) {
          this.preEle = document.caretElement.element
          this.caret = document.caretElement
        }
        if ((document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') && this.preEle !== document.activeElement && !document.activeElement.readOnly) {
          this.preEle = document.activeElement;
          this.caret = new Caret(document.activeElement);
        }
        if(this.caret) {
          const scrollLeft = this.caret.element.scrollLeft
          setTimeout(() => {
            this.caret.element.scrollLeft = scrollLeft
          }, 1)
        }
        if(item.action === 'delete') { //remove whole caret value after holding delete btn 300ms
          this.deleteHoldTime = new Date()
          setTimeout(() => {
            if(this.deleteHoldTime) {
              this.caret.set(0, this.caret.get().end).insert('');
              this.caret.element.dispatchEvent(new Event('input'));
            }
          }, 300)
        }
      },
      onMouseUp(item) {
        if(item.action === 'delete') {
          this.deleteHoldTime = null
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "GKeyboard";
</style>
