import {createElement, setInputValue} from "../../../tests/setup";

const Vue = require("vue/dist/vue.common.js");
import plugin, {computed, ref, watch, onMounted, onBeforeUnmount} from "@vue/composition-api";
import GSlideshowFactory from "../GSlideshowFactory";
import moment from "moment";
import _ from 'lodash';

Vue.use(plugin);

// Import your components after all of above import

// Maximum setTimeout delay is 2147483647 ms
/*function customSetTimeout(callback, delay) {
  if (delay > 2147483646) {
    setTimeout(
        () => customSetTimeout(callback, delay - 2147483646),
        2147483646
    );
  } else {
    setTimeout(callback, delay);
  }
}*/

let startTime = moment();
const _setTimeout = setTimeout;
global.setTimeout = (cb, timeout) => {
  let _startTime = moment();
  _setTimeout(() => {
    const _duration = moment.duration(moment().diff(_startTime)) - timeout;
    startTime = startTime + _duration;
    cb();
  }, timeout);
}
const resetStartTime = _.once(function () {
  startTime = moment();
})

const parentVmFactory = attrs => {
  const child = {
    props: {
      value: Array,
      defaultTransition: {
        type: String,
        default: "slide"
      },
      transitionDuration: {
        type: Number,
        default: 15
      }
    },
    setup(props, context) {
      class Node {
        constructor(id, display, opts) {
          this.id = id;
          this._display = display;
          Object.assign(this, opts);
        }

        get display() {
          return this._display;
        }

        set display(_display) {
          this._display = _display;
          //mutate dom
        }

        play() {
          //play video here
        }

        setSrc(src) {
          this.src = src.src;
          /*context.emit("update:status", _.cloneDeep({
            count: count.value,
            //currentItem: currentItem.value,
            //nextItem: nextItem.value,
            slideNodes
          }));*/
          //
        }

        getDuration() {
          return 2;
        }

        animate(_, opt) {
          const _animate = {};
          setTimeout(() => {
            _animate.onfinish && _animate.onfinish();
          }, opt.duration);
          return _animate;
        }
      }

      async function updateStatus() {
        await context.root.$nextTick() && await context.root.$nextTick();
        context.emit("update:status", _.cloneDeep({
          count: count.value,
          currentItem: currentItem.value,
          nextItem: nextItem.value,
        }));
      }

      let cb;

      const {
        count,
        currentItem,
        nextItem
      } = GSlideshowFactory(props, context, Node, () => cb && cb())

      cb = async function () {
        await context.root.$nextTick() && await context.root.$nextTick();
        context.emit("update:status", _.cloneDeep({
          count: count.value,
          currentItem: currentItem.value,
          nextItem: nextItem.value,
        }));
      }
    },
    render() {
      return <div></div>;
    }
  };

  const wrapper = {
    props: {
      value: Array,
      defaultTransition: {
        type: String,
        default: "slide"
      },
      transitionDuration: {
        type: Number,
        default: 15
      }
    },
    components: {child},
    data() {
      return {
        count: 0
      }
    },
    watch: {
      value() {
        this.count++;
      }
    },
    render(h, context) {
      return h('child', {props: this.$props, key: this.count, on: this.$listeners})
    }
  }

  const protocols = [];
  const vm = new Vue({
    components: {wrapper},
    data() {
      return {
        externalValueNormalize: null,
        selection: null,
        ...attrs
      };
    },
    render(h) {
      //return <child vModel={this.parentValue}/>
      return (
          <wrapper
              {...{
                props: this.$data,
                on: {
                  "update:status": function (status) {
                    //resetStartTime();
                    const duration = moment.duration(moment().diff(startTime));
                    //startTime = moment();
                    protocols.push({
                      time: duration.asMilliseconds(),
                      ...status
                    });
                  }
                }
              }}
              ref={"child"}
              vOn:input={val => (this.value = val)}
          />
      );
      // return <div>test</div>;
    },
    mounted() {
      this.child = this.$refs.child;
    }
  }).$mount();
  return {protocols, vm};
};

describe("GSlideShow", function () {
  it("should render wrapper", function (next) {
    const {vm, protocols} = parentVmFactory({
      value: [
        {src: "src1", type: "image", transition: "None", duration: 50},
        {src: "src2", type: "image", transition: "None", duration: 50},
        {src: "src3", type: "image", transition: "None", duration: 50},
      ]
    });

    setTimeout(() => {
      vm.value.push({src: "src4", type: "image", transition: "None", duration: 50});
    }, 150)

    setTimeout(() => {
      expect(protocols).toMatchSnapshot();
      next();
    }, 1000);
  });
});
