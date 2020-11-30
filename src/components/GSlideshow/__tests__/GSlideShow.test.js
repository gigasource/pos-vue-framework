import { mount } from '@vue/test-utils'
import { h, onMounted, ref } from 'vue';
import GSlideshowFactory from '../GSlideshowFactory';
import moment from 'moment';
import _ from 'lodash';

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

class Node {
  constructor(id, display, opts) {
    this.id = id;
    this._display = display;
    Object.assign(this, opts);
    Object.assign(this, { container: document.createElement('image') })
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

  setMedia(item) {
    this.item = item;
    /*context.emit("update:status", _.cloneDeep({
      count: count.value,
      //currentItem: currentItem.value,
      //nextItem: nextItem.value,
      slideNodes
    }));*/
    //
  }

  getDuration() {
    return 50;
  }

  animate(_, opt) {
    const _animate = {};
    setTimeout(() => {
      _animate.onfinish && _animate.onfinish();
    }, opt.duration);
    return _animate;
  }
}

const child = {
  props: {
    modelValue: Array,
    defaultTransition: {
      type: String,
      default: 'slide'
    },
    transitionDuration: {
      type: Number,
      default: 15
    }
  },
  setup(props, context) {
    let cb = function (_lastItem) {
      context.emit('update:status', {});
    };
    const slideContainer = ref(null)
    GSlideshowFactory(props, slideContainer, Node, (_lastItem) => cb && cb(_lastItem))

    onMounted(() => {
      resetStartTime()
      slideContainer.value = document.createElement('div')
    })
  },
  render() {
    return <div></div>;
  }
};

const wrapper = {
  props: {
    modelValue: Array,
    defaultTransition: {
      type: String,
      default: 'slide'
    },
    transitionDuration: {
      type: Number,
      default: 15
    }
  },
  components: { child },
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
  setup(props) {
    return () => h(child, props)
  }
}

const parentVmFactory = attrs => {
  const protocols = [];
  const vm = {
    components: { wrapper },
    data() {
      return {
        ...attrs
      };
    },
    setup(props) {
      return () => h(wrapper, {
        ...props,
        'onUpdate:status': function (status) {
          const duration = moment.duration(moment().diff(startTime));
          startTime = moment();
          protocols.push({
            time: duration.asMilliseconds(),
            ...status
          });
        },
      })
    }
  }
  return { protocols, vm };
};

describe('GSlideShow', function () {
  it('should render wrapper', function (next) {
    const { vm, protocols } = parentVmFactory();

    const wrapper = mount(vm, {
      propsData: {
        modelValue: [
          { src: 'src1', type: 'image', transition: 'None', duration: 50 },
          { src: 'src2', type: 'image', transition: 'None', duration: 50 },
          { src: 'src3', type: 'image', transition: 'None', duration: 50 },
          { src: 'src4', type: 'image', transition: 'None', duration: 50 },
          { src: 'src5', type: 'image', transition: 'None', duration: 50 },
        ]
      }
    })

    // setTimeout(() => {
    //   vm.value.push({src: "src4", type: "image", transition: "None", duration: 50});
    // }, 150)

    setTimeout(() => {
      expect(protocols).toMatchSnapshot();
      next();
    }, 1000);
  });
});
