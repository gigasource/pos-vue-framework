import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import GExpansionPanel3 from '../GExpansionPanel3';
import GIcon from '../../GIcon/GIcon';

export default {
  title: 'Expansion panel',
  decorators: [withKnobs]
}

export const test1 = () => ({
  components: { GExpansionPanel3, GIcon },
  template: `
  <div style="background-color: #e6e9ec; height: 100%">
    <g-expansion-panel-group3 v-model="activeItem">
      <template v-slot:default="{ toggle, isActive }">
        <g-expansion-panel3 v-for="(item, index) in items" :item="item" :is-active="isActive(item)" @toggle="toggle" :key="index">
          <template v-slot:prepend>
            <g-icon small>fas fa-caret-right</g-icon>
          </template>
          <template v-slot:header>{{ item.name }}</template>
            {{ item.message }}
        </g-expansion-panel3>
      </template>
    </g-expansion-panel-group3>
  </div>
  `
})