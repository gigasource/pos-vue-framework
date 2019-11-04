import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GAvatar from '../GAvatar';
import GImg from '../../GImg/GImg';

export default {
  title: 'GAvatar',
  decorators: [withKnobs],
};

export const GAvatarDefault = () => ({
  components: { GAvatar },
  props: {
    textValue: { type: String, default: text('textValue', 'P') },
    textColor: { type: String, default: text('textColor', 'white') },
    backgroundColor: { type: String, default: text('backgroundColor', 'bg-red') },
  },
  template: `<g-avatar :text-color="textColor" :background-color="backgroundColor">{{textValue}}</g-avatar>`,
})

export const GAvatarImage = () => ({
  components: { GAvatar, GImg },
  props: {
    textValue: { type: String, default: text('textValue', 'P') },
  },
  template: `<g-avatar><g-img src="https://image.shutterstock.com/image-photo/plitvice-lakes-croatia-beautiful-place-260nw-1050138794.jpg"> </g-img></g-avatar>`,
})

export const GAvatarSvg = () => ({
  components: { GAvatar },
  props: {
    textValue: { type: String, default: text('textValue', 'P') },
  },
  template: `<g-avatar>{{textValue}}</g-avatar>`,
})


