import { withKnobs } from '@storybook/addon-knobs';
import GSlideshow from '../GSlideshow';
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
  components: { GSlideshow },
  props: {},
  data() {
    return {
      slideItems: [
        {
          src: src1,
          type: 'image',
          transition: 'slide',
          duration: 5000
        },
        {
          src: src2,
          type: 'image',
          transition: 'slide',
          duration: 5000
        },
        {
          src: video,
          type: 'video',
          transition: 'none',
          duration : 8000
        },
        {
          src: src3,
          type: 'image',
          transition: 'none',
          duration: 5000
        },
        {
          src: video,
          type: 'video',
          transition: 'none',
          duration : 8000
        },
        {
          src: src4,
          type: 'image',
          transition: 'none',
          duration: 5000
        },
        {
          src: src5,
          type: 'image',
          transition: 'slide',
          duration: 5000
        },
      ]
    }
  },
  template: `
		<div style="position: relative; width: 800px; height: 480px">
			<g-slideshow v-model="slideItems"/>
		</div>
  `
})