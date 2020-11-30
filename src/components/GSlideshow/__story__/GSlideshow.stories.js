import { withKnobs } from '@storybook/addon-knobs';
import GSlideshow from '../GSlideshow';
import { transitionList } from '../transition-utils';
import GBtn from '../../GBtn/GBtn';
import src1 from '../../../assets/slideshow/food1.jpeg'
import src2 from '../../../assets/slideshow/food2.jpeg'
import src3 from '../../../assets/slideshow/food3.jpeg'
import src4 from '../../../assets/slideshow/food4.jpeg'
import src5 from '../../../assets/slideshow/food5.jpeg'
import video from '../../../assets/slideshow/video.mp4'

export default {
  title: 'GSlideshow',
  decorators: [withKnobs],
};

export const Basic = () => ({
  components: { GSlideshow, GBtn },
  props: {},
  data() {
    return {
      slideItems: [],
      cur: 0
    }
  },
  methods: {
    start() {
      const slide = [[
        {
          src: 'https://images.wallpaperscraft.com/image/forest_trees_fog_110485_2560x1440.jpg',
          type: 'image',
          transition: transitionList.slideRightToLeft,
          duration: 5000
        },
        {
          src: 'https://images.wallpaperscraft.com/image/forest_trees_fog_175180_2560x1440.jpg',
          type: 'image',
          transition: transitionList.slideLeftToRight,
          duration: 5000
        },
        {
          src: 'https://images.wallpaperscraft.com/image/forest_trees_fog_168690_2560x1440.jpg',
          type: 'image',
          transition: transitionList.slideBottomToTop,
          duration: 5000
        },
        {
          src: 'https://images.wallpaperscraft.com/image/forest_trees_fog_161605_2560x1440.jpg',
          type: 'image',
          transition: transitionList.slideTopToBottom,
          duration: 5000
        },
      ],
        [
          {
            src: src1,
            type: 'image',
            transition: transitionList.slideLeftToRight,
            duration: 10000
          },
          {
            src: src2,
            type: 'image',
            transition: transitionList.slideTopToBottom,
            duration: 5000
          },
          {
            src: video,
            type: 'video',
            transition: transitionList.none,
            duration: 0
          },
          {
            src: src3,
            type: 'image',
            transition: transitionList.none,
            duration: 5000
          },
          {
            src: video,
            type: 'video',
            transition: transitionList.slideTopToBottom,
            duration: 0
          },
          {
            src: src4,
            type: 'image',
            transition: transitionList.slideTopToBottom,
            duration: 5000
          },
          {
            src: src5,
            type: 'image',
            transition: transitionList.slideTopToBottom,
            duration: 5000
          },
        ], []]
      this.slideItems = slide[this.cur]
      this.cur = (this.cur + 1) % slide.length

    }
  },
  template: `
    <div style="position: relative; width: 800px; height: 480px">
    <g-btn @click="start">Next</g-btn>
    <g-slideshow v-model="slideItems"/>
    </div>
  `,
  mounted() {

  }
})
