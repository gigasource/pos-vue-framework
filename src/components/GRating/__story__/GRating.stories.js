import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import GRating from '../GRating';

export default {
  title: 'Rating',
  decorators: [withKnobs]
}

export const rating = () => ({
  components: { GRating },
  data() {
    return {
      value: 0
    }
  },
  props: {
    backgroundColor: {type: String, default: text('background color','blue lighten-4')},
    color: { type: String, default: text('color','blue') },
    clearable: { type: Boolean, default: boolean('clearable', false)},
    dense: { type: Boolean, default: boolean('dense', false)},
    emptyIcon: { type: String, default: text('empty icon', 'far fa-star'), },
    fullIcon: { type: String, default: text('full icon','fas fa-star'), },
    halfIcon: { type: String, default: text('half icon','fas fa-star-half'), },
    halfIncrements: { type: Boolean, default: boolean('half increments', false)},
    length: { type: [Number, String], default: number('length', 5), },
    readonly: { type: Boolean, default: boolean('readonly', false)},
    size: { type: Number, default: number('size', 24), },
  },
  template: `<g-rating v-model="value"
                       :background-color="backgroundColor"
                       :color="color"
                       :clearable="clearable"
                       :dense="dense"
                       :empty-icon="emptyIcon"
                       :full-icon="fullIcon"
                       :half-icon="halfIcon"
                       :half-increments="halfIncrements"
                       :length="length"
                       :readonly="readonly"
                       :size="size"
    ></g-rating>`
})
