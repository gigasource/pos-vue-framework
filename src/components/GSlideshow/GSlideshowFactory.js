import {computed, ref, watch, onMounted} from '@vue/composition-api';

export const transitionList = {
  none: 'None',
  fadeIn: 'fadeIn',
  slideLeftToRight: 'slideLeftToRight',
  slideRightToLeft: 'slideRightToLeft',
  slideTopToBottom: 'slideTopToBottom',
  slideBottomToTop: 'slideBottomToTop'
}

function isValidTransition (inputTransition) {
  for (let transition in transitionList) {
    if (inputTransition === transitionList[transition]) return true
  }
}

export function getTransitionDuration(transition, props) {
  if (isValidTransition(transition) && transition !== transitionList.none) return props.transitionDuration
  return 0
}

export function getTransition(name, type, props) {
  switch (name) {
    case 'fadeIn':
      return [
        [
          { transform: 'translateZ(0) translate3d(0,0,0)', opacity: type === 'in' ? '0' : '1'},
          { transform: 'translateZ(0) translate3d(0,0,0)', opacity: type === 'in' ? '1' : '0' }
        ],
        {
          duration: props.transitionDuration,
          easing: 'linear'
        }
      ]
    case 'slideRightToLeft':
      return [
        [
          {transform: type === 'in' ? 'translateX(100%)' : 'translateX(0)' + ' translateZ(0) translate3d(0,0,0)'},
          {transform: type === 'in' ? 'translateX(0)' : 'translateX(-100%)' + ' translateZ(0) translate3d(0,0,0)'}
        ],
        {
          duration: props.transitionDuration,
          easing: 'ease-in-out'
        }
      ]
    case 'slideLeftToRight':
      return [
        [
          {transform: type === 'in' ? 'translateX(-100%)' : 'translateX(0)' + ' translateZ(0) translate3d(0,0,0)'},
          {transform: type === 'in' ? 'translateX(0)' : 'translateX(100%)' + ' translateZ(0) translate3d(0,0,0)'}
        ],
        {
          duration: props.transitionDuration,
          easing: 'ease-in-out'
        }
      ]
    case 'slideBottomToTop':
      return [
        [
          {transform: type === 'in' ? 'translateY(100%)' : 'translateY(0)' + ' translateZ(0) translate3d(0,0,0)'},
          {transform: type === 'in' ? 'translateY(0)' : 'translateY(-100%)' + ' translateZ(0) translate3d(0,0,0)'}
        ],
        {
          duration: props.transitionDuration,
          easing: 'ease-in-out'
        }
      ]
    case 'slideTopToBottom':
      return [
        [
          {transform: type === 'in' ? 'translateY(-100%)' : 'translateY(0)' + ' translateZ(0) translate3d(0,0,0)'},
          {transform: type === 'in' ? 'translateY(0)' : 'translateY(100%)' + ' translateZ(0) translate3d(0,0,0)'}
        ],
        {
          duration: props.transitionDuration,
          easing: 'ease-in-out'
        }
      ]
    default:
      return [
        [
          {transform: 'translateX(0)'},
          {transform: 'translateX(0)'}
        ],
        {
          duration: 0,
          easing: 'linear'
        }
      ]
  }
}

export function createSlideNode () {
  const slideNode = document.createElement('div')
  slideNode.className = 'g-slideshow-current'
  slideNode.style.position = 'absolute'
  slideNode.style.width = 'inherit'
  slideNode.style.height = 'inherit'

  const imgNode = document.createElement('img')

  const videoNode = document.createElement('video')
  const videoSourceNode = document.createElement('source')
  videoNode.appendChild(videoSourceNode)
  videoNode.muted = true

  slideNode.appendChild(imgNode)
  slideNode.appendChild(videoNode)

  return {
    container: slideNode,
    image: imgNode,
    video: videoNode,
    videoSource: videoSourceNode
  }
}

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function delay (duration) {
  while (duration > 2147483646) {
    await timeout(2147483646)
    duration -= 2147483646
  }
  await timeout(duration)
}

const defaultSlideDuration = 5000;

class Node {
  constructor(id, display) {
    this.id = id;
    this._display = display;
    this.item = undefined;
    Object.assign(this, createSlideNode());
  }

  get display() {
    return this._display;
  }

  set display(_display) {
    this._display = _display;
    this.container.style.display = _display ? 'block' : 'none'
  }

  play() {
    this._display && this.item.type === 'video' && this.video.play()
  }

  setMedia(item) {
    this.item = item
    switch (item.type) {
      case 'image':
        this.image.src = item.src
        this.image.style.display = 'block'
        this.video.style.display = 'none'
        break
      case 'video':
        this.videoSource.src = item.src
        this.video.style.display = 'block'
        this.image.style.display = 'none'
        this.video.load()
    }
  }

  async getDuration() {
    if (this.item.duration) return this.item.duration;
    let duration = this._display && this.item.type === 'video' ? Math.round(this.video.duration * 1000) : defaultSlideDuration
    while (isNaN(duration)) {
      await delay(10)
      duration = Math.round(this.video.duration * 1000)
    }
    return duration
  }

  animate() {
    return this.container.animate(...arguments)
  }
}

export default function GSlideshowFactory (props, context, NodeClass = Node, updateStatus) {
  const computedModel = computed(() => {
    if (props.value.length === 1)
      return [
        Object.assign({}, ...props.value),
        Object.assign({}, ...props.value)
      ];
    return props.value;
  });
  const count = ref(0);
  const currentItem = ref({});

  const nextCount = computed(() =>
      count.value === maxCount.value ? 0 : count.value + 1
  );
  const maxCount = computed(() => computedModel.value.length - 1);

  let nodeFlag = false

  watch(count, newVal => {
    currentItem.value = computedModel.value[newVal];
  }, {sync: true});

  const nextItem = computed(() => computedModel.value[nextCount.value]);

  const slideNodes = [new NodeClass(0), new NodeClass(1)];

  onMounted(async () => {
    slideNodes[0].setMedia(currentItem.value);
    slideNodes[0].display = true
    slideNodes[0].play()
    slideNodes[1].setMedia(nextItem.value);
    slideNodes[1].display = false
    context.refs.slideContainer && context.refs.slideContainer.appendChild(slideNodes[0].container)
    context.refs.slideContainer && context.refs.slideContainer.appendChild(slideNodes[1].container)
    count.value = count.value >= maxCount.value ? 0 : count.value + 1
    updateStatus && updateStatus(slideNodes.map(i => i.item.src));
  })

  watch(count, () => nodeFlag = !nodeFlag)

  watch(currentItem, async (_currentItem, _lastItem) => {
    if (_lastItem && _currentItem) {
      const currentNode = slideNodes[Number(nodeFlag)];
      const nextNode = slideNodes[Number(!nodeFlag)];

      let duration = await currentNode.getDuration()
      const transitionDuration = getTransitionDuration(_currentItem.transition, props);

      setTimeout(() => {
        nextNode.display = true;
        let currentTransitionOut = currentNode.animate(...getTransition(_currentItem.transition, "out", props));
        let currentTransitionIn = nextNode.animate(...getTransition(_currentItem.transition, "in", props));
        nextNode.play();
        currentTransitionOut.onfinish = () => {
          currentNode.display = false;
          currentNode.setMedia(nextItem.value);
          count.value = count.value >= maxCount.value ? 0 : count.value + 1;
          updateStatus && updateStatus(slideNodes.map(i => i.item.src));
        };
      }, duration - transitionDuration);
    }
  }, {lazy: true, sync: true});

  return {
    count,
    currentItem,
    nextItem
  };
}