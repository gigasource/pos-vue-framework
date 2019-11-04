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
    size: { type: Number, default: number('size', 48, { min: 48, max: 999, step: 1 }) },
    textValue: { type: String, default: text('textValue', 'P') },
    textColor: { type: String, default: text('textColor', 'white' ) },
    left: {type: Boolean, default: boolean('left', true)},
    right:{type: Boolean, default: boolean('right', true)},
    maxWidth: { type: Number, default: number('maxWidth', 48, { min: 48, max: 999, step: 1 }) },
    maxHeight: { type: Number, default: number('maxHeight', 48, { min: 48, max: 999, step: 1 }) },
    minHeight: { type: Number, default: number('minHeight', 48, { min: 48, max: 999, step: 1 }) },
    backgroundColor: { type: String, default: text('backgroundColor', 'bg-red') },
  },
  template: `<g-avatar :left="left" :right="right" :min-height="minHeight" :max-width="maxWidth" :max-height="maxHeight" :text-color="textColor" :size="size" :background-color="backgroundColor">{{textValue}}</g-avatar>`,
})

export const GAvatarImage = () => ({
  components: { GAvatar, GImg },
  props: {
    textValue: { type: String, default: text('textValue', 'P') },
    size: { type: Number, default: number('size', 48, { min: 48, max: 999, step: 1 }) },
  },
  template: `<g-avatar><g-img :size="size" src="https://image.shutterstock.com/image-photo/plitvice-lakes-croatia-beautiful-place-260nw-1050138794.jpg"> </g-img></g-avatar>`,
})



