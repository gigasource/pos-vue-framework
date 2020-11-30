import { computed, watch } from 'vue';

import { cloneDeep } from 'lodash'

const STATES = {
  'FREE': 0,
  'WORKING': 1
}

import {getTransitionDuration, getTransition } from './transition-utils'

export function createSlideNode() {
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

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function delay(duration) {
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
    this._display && this.item && this.item.type === 'video' && this.video.play()
  }

  setMedia(item) {
    if (!item) return
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

export default function GSlideshowFactory(props, slideContainer, NodeClass = Node, updateStatus) {
  const computedModel = computed(() => {
    if (props.modelValue.length === 1)
      return [
        Object.assign({}, ...props.modelValue),
        Object.assign({}, ...props.modelValue)
      ];
    return props.modelValue;
  });
  const slideNodes = [new NodeClass(0), new NodeClass(1)];

  watch(slideContainer, newVal => {
    if (newVal && newVal.childElementCount === 0) {
      newVal.appendChild(slideNodes[0].container)
      newVal.appendChild(slideNodes[1].container)
    }
    manager.initialized = newVal.childElementCount === 2
    manager.createTask()
  })

  const init = (currentItem, nextItem, flag) => {
    slideNodes[flag].setMedia(currentItem);
    slideNodes[flag].display = true
    slideNodes[flag].play()
    slideNodes[1 - flag].setMedia(nextItem);
    slideNodes[1 - flag].display = false
  }

  // perform transition between currentItem and nextItem, then invoke done callback when transition finish
  const performTransition = async (currentItem, nextItem, currentNode, nextNode, done) => {
    nextNode.setMedia(nextItem)
    let duration = await currentNode.getDuration()
    const transitionDuration = getTransitionDuration(currentItem.transition, props);
    setTimeout(() => {
      nextNode.display = true;
      let currentTransitionOut = currentNode.animate(...getTransition(currentItem.transition || props.defaultTransition, 'out', props));
      let currentTransitionIn = nextNode.animate(...getTransition(currentItem.transition || props.defaultTransition, 'in', props));
      nextNode.play();
      currentTransitionOut.onfinish = () => {
        currentNode.display = false;
        updateStatus && updateStatus({});
        done()
      };
    }, duration - transitionDuration);
  }

  class Manager {
    constructor() {
      this.needReset = true
      this.state = STATES.FREE
      this.initialized = false
      this.flag = 0
      this.onTaskDone = this.onTaskDone.bind(this)
    }

    setCollection(collection) {
      this.collection = collection
      this.needReset = true
      if (this.state === STATES.FREE) {
        this.createTask()
      }
    }

    createTask() {
      if (this.collection.length === 0) { // collection is empty
        this.state = STATES.FREE
      } else {
        if (this.initialized) { // slideContainer is ready
          const currentItem = this.collection[0]
          const nextItem = this.collection[1 % this.collection.length]
          this.state = STATES.WORKING
          if (this.needReset) { // need to reset when the collection is changed
            init(currentItem, nextItem, 0)
            this.flag = 0
            this.needReset = false
          }
          // move the first item in the collection to the last
          this.collection.shift()
          this.collection.push(currentItem)
          performTransition(currentItem, nextItem, slideNodes[this.flag], slideNodes[1 - this.flag], this.onTaskDone)
        }
      }
    }

    onTaskDone() {
      this.flag = 1 - this.flag
      this.createTask()
    }
  }

  const manager = new Manager()
  watch(computedModel, newVal => {
    manager.setCollection(cloneDeep(newVal))
  }, { deep: true, immediate: true })
}
