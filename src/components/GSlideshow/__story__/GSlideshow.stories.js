import { withKnobs } from '@storybook/addon-knobs';
import GSlideshow from '../GSlideshow';
import { transitionList } from "../GSlideshowFactory";
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
      flag: false
    }
  },
  methods: {
    start() {
      const slide = [[
        {
          src: 'https://free4kwallpapers.com/uploads/wallpaper/fog-in-jungle-wallpaper-2560x1440-wallpaper.jpg',
          type: 'image',
          transition: transitionList.slideRightToLeft,
          duration: 0
        },
        // {
        //   src: 'https://free4kwallpapers.com/uploads/wallpaper/fog-in-jungle-wallpaper-2560x1440-wallpaper.jpg',
        //   type: 'image',
        //   transition: transitionList.slideBottomToTop,
        //   duration: 5000
        // },
        // {
        //   src: 'https://free4kwallpapers.com/uploads/wallpaper/sunset-summer-4k-wallpaper-2560x1440-wallpaper.jpg',
        //   type: 'image',
        //   transition: transitionList.slideBottomToTop,
        //   duration: 5000
        // },
        // {
        //   src: 'https://free4kwallpapers.com/uploads/originals/2015/09/06/beautiful-nature-images-with-quotes.jpg',
        //   type: 'image',
        //   transition: transitionList.slideBottomToTop,
        //   duration: 5000
        // },
      ], [
        {
          src: src1,
          type: 'image',
          transition: 'slideTopToBottom',
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
          duration : 0
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
          duration : 0
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
      ]]
      this.slideItems = slide[this.flag ? 1 : 0]
      this.flag = !this.flag
    }
  },
  template: `
		<div style="position: relative; width: 800px; height: 480px">
			<g-btn @click="start">Play</g-btn>
			<g-slideshow v-model="slideItems"/>
		</div>
`
})