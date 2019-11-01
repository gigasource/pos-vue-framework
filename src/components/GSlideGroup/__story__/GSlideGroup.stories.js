import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GCard from '../../GCard/GCard';
import GBtn from '../../GBtn/GBtn';
import GImg from '../../GImg/GImg';
import GIcon from '../../GIcon/GIcon';
import GCardTitle from '../../GCard/GCardTitle';
import GSlideGroup from '../GSlideGroup';
import { GCardText, GCardActions, GCardSubtitle } from '../../GCard/GCardFunctionalComponent';

export default {
  title: 'GSlideGroup',
  decorators: [withKnobs],
};


export const GSlideGroupSingleSelect = () => ({
  components: { GSlideGroup, GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle },
  props: {
    multiple: { type: Boolean, default: boolean('multiple', false) },
    mandatory: { type: Boolean, default: boolean('mandatory', false) },
    showArrows: { type: Boolean, default: boolean('showArrows', false) },
    prevIcon: { type: String },
    nextIcon: { type: String },
    centerActive: { type: Boolean, default: boolean('centerActive', false) },
  },
  data: () => ({
    model: null,
    activeItems: null,
    items: [
      { id: 1, text: 'BUTTON 1' },
      { id: 2, text: 'BUTTON 2' },
      { id: 3, text: 'BUTTON 3' },
      { id: 4, text: 'BUTTON 4' },
      { id: 5, text: 'BUTTON 5' },
      { id: 6, text: 'BUTTON 6' },
      { id: 7, text: 'BUTTON 7' },
      { id: 8, text: 'BUTTON 8' },
      { id: 9, text: 'BUTTON 9' },
      { id: 10, text: 'BUTTON 10' },
    ]
  }),
  template: `<div>
                <g-slide-group
                        :items="items"
                        v-model="activeItems"
                        :multiple="multiple"
                        :mandatory="mandatory"
                        :show-arrows="showArrows"
                        :center-active="centerActive">
                
                      <template v-slot:default="{toggle, active}">
                        <g-btn v-for="(item, index) in items"
                               :key="index"
                               @click="toggle(item)"
                               :active="active"
                               outlined
                               :class="[active ? activeClass : {}]">
                          {{item.text}}
                        </g-btn>
                      </template>
                </g-slide-group>
                <p>Active items: {{ activeItems}}</p>
              </div>`
})

export const GSlideGroupMultipleSelect = () => ({
  components: { GSlideGroup, GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle },
  props: {
    multiple: { type: Boolean, default: boolean('multiple', true) },
    mandatory: { type: Boolean, default: boolean('mandatory', false) },
    showArrows: { type: Boolean, default: boolean('showArrows', false) },
    prevIcon: { type: String },
    nextIcon: { type: String },
    centerActive: { type: Boolean, default: boolean('centerActive', false) },
  },
  data: () => ({
    model: null,
    activeItems: null,
    items: [
      { id: 1, text: 'BUTTON 1' },
      { id: 2, text: 'BUTTON 2' },
      { id: 3, text: 'BUTTON 3' },
      { id: 4, text: 'BUTTON 4' },
      { id: 5, text: 'BUTTON 5' },
      { id: 6, text: 'BUTTON 6' },
      { id: 7, text: 'BUTTON 7' },
      { id: 8, text: 'BUTTON 8' },
      { id: 9, text: 'BUTTON 9' },
      { id: 10, text: 'BUTTON 10' },
    ]
  }),
  template: `<div>
                <g-slide-group
                        :items="items"
                        v-model="activeItems"
                        :multiple="multiple"
                        :mandatory="mandatory"
                        :show-arrows="showArrows"
                        :center-active="centerActive">
                
                      <template v-slot:default="{toggle, active}">
                        <g-btn v-for="(item, index) in items"
                               :key="index"
                               @click="toggle(item)"
                               :active="active"
                               outlined
                               :class="[active ? activeClass : {}]">
                          {{item.text}}
                        </g-btn>
                      </template>
                </g-slide-group>
                <p>Active items: {{ activeItems}}</p>
              </div>`
})

export const GSlideGroupSingleMandatorySelect = () => ({
  components: { GSlideGroup, GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle },
  props: {
    multiple: { type: Boolean, default: boolean('multiple', false) },
    mandatory: { type: Boolean, default: boolean('mandatory', true) },
    showArrows: { type: Boolean, default: boolean('showArrows', false) },
    prevIcon: { type: String },
    nextIcon: { type: String },
    centerActive: { type: Boolean, default: boolean('centerActive', false) },
  },
  data: () => ({
    model: null,
    activeItems: null,
    items: [
      { id: 1, text: 'BUTTON 1' },
      { id: 2, text: 'BUTTON 2' },
      { id: 3, text: 'BUTTON 3' },
      { id: 4, text: 'BUTTON 4' },
      { id: 5, text: 'BUTTON 5' },
      { id: 6, text: 'BUTTON 6' },
      { id: 7, text: 'BUTTON 7' },
      { id: 8, text: 'BUTTON 8' },
      { id: 9, text: 'BUTTON 9' },
      { id: 10, text: 'BUTTON 10' },
    ]
  }),
  template: `<div>
                <g-slide-group
                        :items="items"
                        v-model="activeItems"
                        :multiple="multiple"
                        :mandatory="mandatory"
                        :show-arrows="showArrows"
                        :center-active="centerActive">
                
                      <template v-slot:default="{toggle, active}">
                        <g-btn v-for="(item, index) in items"
                               :key="index"
                               @click="toggle(item)"
                               :active="active"
                               outlined
                               :class="[active ? activeClass : {}]">
                          {{item.text}}
                        </g-btn>
                      </template>
                </g-slide-group>
                <p>Active items: {{ activeItems}}</p>
              </div>`
})

export const GSlideGroupMultipleMandatorySelect = () => ({
  components: { GSlideGroup, GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle },
  props: {
    multiple: { type: Boolean, default: boolean('multiple', true) },
    mandatory: { type: Boolean, default: boolean('mandatory', true) },
    showArrows: { type: Boolean, default: boolean('showArrows', false) },
    prevIcon: { type: String },
    nextIcon: { type: String },
    centerActive: { type: Boolean, default: boolean('centerActive', false) },
  },
  data: () => ({
    model: null,
    activeItems: null,
    items: [
      { id: 1, text: 'BUTTON 1' },
      { id: 2, text: 'BUTTON 2' },
      { id: 3, text: 'BUTTON 3' },
      { id: 4, text: 'BUTTON 4' },
      { id: 5, text: 'BUTTON 5' },
      { id: 6, text: 'BUTTON 6' },
      { id: 7, text: 'BUTTON 7' },
      { id: 8, text: 'BUTTON 8' },
      { id: 9, text: 'BUTTON 9' },
      { id: 10, text: 'BUTTON 10' },
    ]
  }),
  template: `<div>
                <g-slide-group
                        :items="items"
                        v-model="activeItems"
                        :multiple="multiple"
                        :mandatory="mandatory"
                        :show-arrows="showArrows"
                        :center-active="centerActive">
                
                      <template v-slot:default="{toggle, active}">
                        <g-btn v-for="(item, index) in items"
                               :key="index"
                               @click="toggle(item)"
                               :active="active"
                               outlined
                               :class="[active ? activeClass : {}]">
                          {{item.text}}
                        </g-btn>
                      </template>
                </g-slide-group>
                <p>Active items: {{ activeItems}}</p>
              </div>`
})

export const GSlideGroupCard = () => ({
  components: { GSlideGroup, GCard, GCardActions, GCardTitle, GCardText, GCardSubtitle, GIcon },
  props: {
    multiple: { type: Boolean, default: boolean('multiple //Not reactive', true) },
    mandatory: { type: Boolean, default: boolean('mandatory', false) },
    showArrows: { type: Boolean, default: boolean('showArrows', false) },
    prevIcon: { type: String, default: text('prevIcon', ' mdi-arrow-left') },
    nextIcon: { type: String, default: text('nextIcon', ' mdi-arrow-right') },
    centerActive: { type: Boolean, default: boolean('centerActive', false) },
    dense: { type: Boolean, default: boolean('dense', false) },
  },
  data: () => ({
    model: null,
    activeItems: null,
    items: [{ id: 1, cardText: 'CARD 1' }, { id: 2, cardText: 'CARD 2' }, { id: 3, cardText: 'CARD 3' }, { id: 4, cardText: 'CARD 4' }, {
      id: 5,
      cardText: 'CARD 5'
    }, { id: 6, cardText: 'CARD 6' }],
  }),
  template: `<div>
            <g-slide-group
                    :center-active="centerActive"
                    :dense="dense"
                    :items="items"
                    :mandatory="mandatory"
                    :multiple="multiple"
                    :show-arrows="showArrows"
                    v-model="activeItems">
                  <template v-slot:prev>
                    <g-icon>{{prevIcon}}</g-icon>
                  </template>
                  <template v-slot:default="{toggle, isActive}">
                    <g-card :active="isActive(n)" :key="i" @click="toggle(n)" height="300px" v-for="(n, i) in items" width="200px">
                      <g-card-text>
                        <p>
                          {{n.cardText}}</p>
                      </g-card-text>
                    </g-card>
                  </template>
                  <template v-slot:next>
                    <g-icon>{{nextIcon}}</g-icon>
                  </template>
                </g-slide-group>
                <p>Active items: {{ activeItems}}</p>
            </div>`
})

