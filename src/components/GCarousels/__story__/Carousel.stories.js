import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GCard from '../../GCard/GCard';
import GBtn from '../../GBtn/GBtn';
import GImg from '../../GImg/GImg';
import GCardTitle from '../../GCard/GCardTitle';
import { GCardText, GCardActions, GCardSubtitle } from '../../GCard/GCardFunctionalComponent'
import GCarousel from '../GCarousel';
import GCarouselItem from '../GCarouselItem';

export default {
  title: 'GCarousel',
  decorators: [withKnobs],
};

export const GCarouselDefault = () => ({
  components: { GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle, GCarousel, GCarouselItem, GImg },
  data: () => ({
    selectedItem: 0,
  }),
  props: {
    cycle: { type: Boolean, default: boolean('cycle', false) },
    reverse: { type: Boolean, default: boolean('reverse', undefined) },
    vertical: { type: Boolean, default: boolean('vertical', false) },
    verticalDelimiters: { type: String, default: text('verticalDelimiters', undefined) },
    showArrows: { type: Boolean, default: boolean('showArrows', false) },
    showArrowsOnHover: { type: Boolean, default: boolean('showArrowsOnHover', true) },
    prevIcon: { type: String, default: text('prevIcon', 'mdi-chevron-left') },
    nextIcon: { type: String, default: text('nextIcon', 'mdi-chevron-right') },
    delimiterIcon: { type: String, default: text('delimiterIcon', 'mdi-checkbox-blank-circle') },
    hideDelimiterBackground: { type: Boolean, default: boolean('hideDelimiterBackground', false) },
    hideDelimiters: { type: Boolean, default: boolean('hideDelimiters', false) },
    height: { type: Number, default: number('height', 500, { min: 300, max: 1000 }) },
    elevation: { type: Number, default: number('elevation', 2, { min: 1, max: 24 }) },
    interval: { type: Number, default: number('interval', 1000, { min: 1000, max: 10000000 }) },
  },
  template: `{{selectedItem}}
  <g-carousel v-model="selectedItem" :hide-delimiters="hideDelimiters" :vertical-delimiters="verticalDelimiters" :delimiter-icon="delimiterIcon" :elevation="elevation" :height="height" :reverse="reverse" :show-arrows-on-hover="showArrowsOnHover" :next-icon="nextIcon" :vertical="vertical" :show-arrows="showArrows" :prev-icon="prevIcon" :cycle="cycle" :interval="interval" :hide-delimiter-background="hideDelimiterBackground">
  <g-carousel-item>
    <g-card width="100%" height="500px" background-color="green">
      <div style="display: flex; justify-content: center; align-items: center; height: calc(100% - 50px);">
        <h1 style="color: white">SLIDE 1</h1>
      </div>
    </g-card>
  </g-carousel-item>
  <g-carousel-item>
    <g-card width="100%" height="500px" background-color="blue">
      <div style="display: flex; justify-content: center; align-items: center; height: calc(100% - 50px);">
        <h1 style="color: white">SLIDE 2</h1>
      </div>
    </g-card>
  </g-carousel-item>
  <g-carousel-item>
    <g-card width="100%" height="500px" background-color="red">
      <div style="display: flex; justify-content: center; align-items: center; height: calc(100% - 50px);">
        <h1 style="color: white">SLIDE 3</h1>
      </div>
    </g-card>
  </g-carousel-item>
  <g-carousel-item>
    <g-card width="100%" height="500px" background-color="orange">
      <div style="display: flex; justify-content: center; align-items: center; height: calc(100% - 50px);">
        <h1 style="color: white">SLIDE 4</h1>
      </div>
    </g-card>
  </g-carousel-item>
  <g-carousel-item>
    <g-card width="100%" height="500px" background-color="brown">
      <div style="display: flex; justify-content: center; align-items: center; height: calc(100% - 50px);">
        <h1 style="color: white">SLIDE 5</h1>
      </div>
    </g-card>
  </g-carousel-item>
  <g-carousel-item>
    <g-card width="100%" height="500px" background-color="purple">
      <div style="display: flex; justify-content: center; align-items: center; height: calc(100% - 50px);">
        <h1 style="color: white">SLIDE 6</h1>
      </div>
    </g-card>
  </g-carousel-item>
  </g-carousel>`,
});
