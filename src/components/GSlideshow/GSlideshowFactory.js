import { convertToUnit } from '../../utils/helpers';

export const transitionList = [
  'Fade In',
  'Slide Left To Right',
  'Slide Right To Left',
  'Slide Top To Bottom',
  'Slide Bottom To Top'
]

export function getTransition(name, type, props) {
  switch (name) {
    case 'Fade In':
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
    case 'Slide Left To Right':
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
    case 'Slide Right To Left':
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
    case 'Slide Top To Bottom':
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
    case 'Slide Bottom To Top':
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

export function setSrc(item, slideNode) {
  switch (item.type) {
    case 'image':
      slideNode.image.src = item.src
      slideNode.image.style.display = 'block'
      slideNode.video.style.display = 'none'
      break
    case 'video':
      slideNode.videoSource.src = item.src
      slideNode.video.style.display = 'block'
      slideNode.image.style.display = 'none'
      slideNode.video.load()
  }
}

export function clean(nodeList) {
  for (let node of nodeList) {
    node.container.style.display = 'none'
    node.image.style.display = 'none'
    node.video.style.display = 'none'
    node.image.src = ''
    node.videoSource.src = ''
  }
}