import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import GSnackbar from '../GSnackbar';
import GBtn from '../../GBtn/GBtn';

export default {
  title: 'GSnackbar',
  decorators: [withKnobs],
};

export const Basic = () => ({
  components: { GSnackbar, GBtn },
  props: {
    top: {default: boolean('Top', false)},
    bottom: {default: boolean('Bottom', false)},
    left: {default: boolean('Left', false)},
    right: {default: boolean('Right', false)},
    color: {default: text('Color', '#0ab')},
    timeout: {default: number('timeout', 2000)}
  },
  data() {
    return {
      snackbar: false
    }
  },
  template:
  `
    <div>
			<g-btn color="black" @click="snackbar = true">
				OPEN SNACKBAR
			</g-btn>
			<g-snackbar v-model="snackbar" :timeout=timeout :color="color" :top="top" :bottom="bottom" :left="left" :right="right">
				Hello I'm Snackbar
				<g-btn text text-color="pink" @click="snackbar = false">
					Close
				</g-btn>
			</g-snackbar>
    </div>
  `
})