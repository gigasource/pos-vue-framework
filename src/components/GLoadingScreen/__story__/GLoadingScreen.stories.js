import {withKnobs} from "@storybook/addon-knobs";
import GLoadingScreen from "../GLoadingScreen";

export default {
  title: 'GLoadingScreen',
  decorators: [withKnobs],
}

export const basicLoadingScreen = () => ({
  components: GLoadingScreen,
  template: `<g-loading-screen/>`
})
