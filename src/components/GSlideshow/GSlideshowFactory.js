import { convertToUnit } from '../../utils/helpers';

export function getTransition(name, type, props) {
  switch (name) {
    case 'fade-in':
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
    case 'slide':
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

export function createSlideNode (containerDimension) {
  const slideNode = document.createElement('div')
  slideNode.className = 'g-slideshow-current'
  slideNode.style.position = 'absolute'
  slideNode.style.width = convertToUnit(containerDimension.width)
  slideNode.style.height = convertToUnit(containerDimension.height)

  const imgNode = document.createElement('img')
  imgNode.style.position = 'absolute'
  imgNode.style.width = convertToUnit(containerDimension.width)
  imgNode.style.height = convertToUnit(containerDimension.height)

  const videoNode = document.createElement('video')
  const videoSourceNode = document.createElement('source')
  videoNode.appendChild(videoSourceNode)
  videoNode.muted = true
  videoNode.style.position = 'absolute'
  videoNode.style.width = convertToUnit(containerDimension.width)
  videoNode.style.height = convertToUnit(containerDimension.height)

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