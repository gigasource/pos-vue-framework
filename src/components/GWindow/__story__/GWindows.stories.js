import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import GCard from '../../GCard/GCard';
import GBtn from '../../GBtn/GBtn';
import GImg from '../../GImg/GImg';
import GCardTitle from '../../GCard/GCardTitle';
import GIcon from '../../GIcon/GIcon';
import GSpacer from '../../GLayout/GSpacer';
import { GCardText, GCardActions, GCardSubtitle } from '../../GCard/GCardFunctionalComponent'
import GWindow from '../GWindow';
import GWindowItem from '../GWindowItem';
import GTextField from '../../GInput/GTextField';
import GChip from '../../GChip/GChip';
import GChipGroup from '../../GChipGroup/GChipGroup';
import GDivider from '../../GLayout/GDivider';
import GAvatar from '../../GAvatar/GAvatar';
import GScrollWindow from '../GScrollWindow';
import GScrollWindowItem from '../GScrollWindowItem';


export default {
  title: 'GWindow',
  decorators: [withKnobs],
};

export const GWindowDefault = () => ({
  components: { GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle, GWindowItem, GWindow, GImg, GIcon },
  data: () => ({
    selectedItem: 0,
  }),
  props: {
    continuous: { type: Boolean, default: boolean('continuous', false) },
    reverse: { type: Boolean, default: boolean('reverse', false) },
    vertical: { type: Boolean, default: boolean('vertical', false) },
    showArrows: { type: Boolean, default: boolean('showArrows', true) },
    prevIcon: { type: String, default: text('prevIcon', 'mdi-chevron-left') },
    nextIcon: { type: String, default: text('nextIcon', 'mdi-chevron-right') },
    showArrowsOnHover: { type: Boolean, default: boolean('showArrowsOnHover', false) },
    elevation: { type: Number, default: number('elevation', 2) },
    hideDelimiters: { type: Boolean, default: boolean('hideDelimiters', true) },

  },
  template: `<g-window :continuous="continuous"
                       :hide-delimiters="hideDelimiters"
                       :elevation="elevation" :vertical="vertical"
                       :show-arrows-on-hover="showArrowsOnHover"
                       :prev-icon="prevIcon" :next-icon="nextIcon"
                       :reverse="reverse" :show-arrows="showArrows"
                       v-model="selectedItem"
             >
               <g-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/image-photo/plitvice-lakes-croatia-beautiful-place-260nw-1050138794.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>DISCOVER</p>
                    </g-card-title>
                  </g-img>
                </g-window-item>
                <g-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/image-photo/scenic-view-vernazza-cinque-terre-260nw-1252453072.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>A</p>
                    </g-card-title>
                  </g-img>
                </g-window-item>
                <g-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/z/stock-photo-the-istrian-streets-in-croatia-1461805289.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>WHOLE</p>
                    </g-card-title>
                  </g-img>
                </g-window-item>
                <g-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/image-photo/view-over-colorful-buildings-riomaggiore-600w-1532937503.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>NEW</p>
                    </g-card-title>
                  </g-img>
                </g-window-item>
                <g-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/image-photo/lake-bled-autumn-600w-1463231747.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>WORLD</p>
                    </g-card-title>
                  </g-img>
                </g-window-item>
            </g-window>`,
});

export const GWindowWithCards = () => ({
  components: {
    GCard,
    GCardActions,
    GCardTitle,
    GDivider,
    GCardText,
    GBtn,
    GSpacer,
    GAvatar,
    GCardSubtitle,
    GWindowItem,
    GWindow,
    GImg,
    GTextField,
    GIcon,
    GChip,
    GChipGroup
  },
  data: () => ({
    selectedItem: 0,
    activeItems: null,
    username: '',
    password: ''
  }),
  props: {
    continuous: { type: Boolean, default: boolean('continuous', false) },
    reverse: { type: Boolean, default: boolean('reverse', undefined) },
    vertical: { type: Boolean, default: boolean('vertical', false) },
    showArrows: { type: Boolean, default: boolean('showArrows', false) },
    prevIcon: { type: String, default: text('prevIcon', 'mdi-chevron-left') },
    nextIcon: { type: String, default: text('nextIcon', 'mdi-chevron-right') },
    showArrowsOnHover: { type: Boolean, default: boolean('showArrowsOnHover', false) },
    elevation: { type: Number, default: number('elevation', 2) },
    items: {
      default: array('items', [
        { id: 1, text: 'BMW', prependIcon: '', appendIcon: '', active: false, close: true, },
        { id: 2, text: 'Toyota', prependIcon: '', appendIcon: '', active: false, close: true, },
        { id: 3, text: 'Mercedes', prependIcon: '', appendIcon: '', active: false, close: true, },
        { id: 4, text: 'Ford', prependIcon: '', appendIcon: '', active: false, close: true, },
        { id: 5, text: 'Lexus', prependIcon: '', appendIcon: '', active: false, close: true, },
        { id: 6, text: 'Audi', prependIcon: '', appendIcon: '', active: false, close: true, },
        { id: 7, text: 'Maserati', prependIcon: '', appendIcon: '', active: false, close: true, },
        { id: 8, text: 'Mazda', prependIcon: '', appendIcon: '', active: false, close: true, }])
    }
  },
  methods: {
    next() {
      this.selectedItem = (this.selectedItem + 1) % 4;
    },
    prev() {
      this.selectedItem = (this.selectedItem - 1) === -1 ? 3 : this.selectedItem - 1;
    },
  },
  template: `<g-window :continuous="continuous" :elevation="elevation" :vertical="vertical" :show-arrows-on-hover="showArrowsOnHover" :prev-icon="prevIcon" :next-icon="nextIcon" :reverse="reverse" :show-arrows="showArrows" v-model="selectedItem">
              <g-window-item>
                <g-card>
                  <g-card-title>TASK 01: WELCOME TO CAR DEALER<g-spacer/><g-avatar background-color="blue" text-color="white">1</g-avatar></g-card-title>
                  <div style="background-image: url('https://cdn.vuetifyjs.com/images/logos/v.svg'); background-position: center center; background-repeat: no-repeat; width: 100%; height: 300px;">
                    
                  </div>
                  <g-card-actions>
                    <g-btn depressed @click="prev">BACK</g-btn>
                    <g-spacer/>
                    <g-btn depressed @click="next" background-color="blue" text-color="white">CONTINUE</g-btn>
                  </g-card-actions>
                </g-card>
              </g-window-item>
              <g-window-item>
               <g-card>
                  <g-card-title>TASK 02: LOGIN FORM<g-spacer/><g-avatar background-color="blue" text-color="white">2</g-avatar></g-card-title>
                  <g-card-text>
                     <p>Please fill in the blank your name & password</p>
                     <g-text-field v-model="username" label="Name"> 
                        <template v-slot:prependOuter>
                           <g-icon>mdi-account</g-icon>
                        </template>
                      </g-text-field>
                     <g-text-field v-model="password" label="Password"> 
                        <template v-slot:prependOuter>
                           <g-icon>mdi-textbox-password</g-icon>
                        </template>
                     </g-text-field>
                  </g-card-text>
                  
                  <g-divider/>
                  
                  <g-card-actions>
                   <g-btn depressed @click="prev">BACK</g-btn>
                   <g-spacer/>
                   <g-btn depressed @click="next" background-color="blue" text-color="white" :disabled="!username || !password">CONTINUE</g-btn>
                  </g-card-actions>
                </g-card>
              </g-window-item>
              <g-window-item>
               <g-card>
                  <g-card-title>TASK 03: CHOOSE YOUR FAVOURITE CARS<g-spacer/><g-avatar background-color="blue" text-color="white">3</g-avatar></g-card-title>
                  <g-card-text>
                    <g-chip-group :items="items" v-model="activeItems" multiple>
                        <template v-slot:item="{value, click, active, close}">{{value.text}}</template>
                    </g-chip-group>
                    <p>
                      Please choose some of your favourite car brands so we know your preferences.
                    </p>
                  </g-card-text>
                  
                  <g-divider/>
                  
                  <g-card-actions>
                   <g-btn depressed @click="prev">BACK</g-btn>
                    <g-spacer/>                   
                   <g-btn depressed @click="next" background-color="blue"  text-color="white" :disabled="!activeItems || (activeItems && activeItems.length <= 0)">CONTINUE</g-btn>
                  </g-card-actions>
                </g-card>
              </g-window-item>
              <g-window-item>
               <g-card>
                  <g-card-title>TASK 04: CONFIRM YOUR CHOICES<g-spacer/><g-avatar background-color="blue" text-color="white">4</g-avatar></g-card-title>
                  <g-card-text>
                   <p>Please read through your choices:</p>
                   <p>- Your username: {{username}}</p>
                   <p>- Your password: {{password}}</p>
                   <p>- Your choices: </p>
                   <p v-for="(item, index) in activeItems" style="margin-left: 20px;">{{item.text}}</p>
                  </g-card-text>
                  
                  <g-divider/>
                  
                  <g-card-actions>
                    <g-btn depressed @click="prev">BACK</g-btn>
                    <g-spacer/>                    
                    <g-btn depressed background-color="blue" text-color="white">CONFIRM</g-btn>
                  </g-card-actions>
                </g-card>
              </g-window-item>
            </g-window>`,
});

export const GWindowInfiniteScrollTest = () => ({
  components: { GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle, GWindowItem, GWindow, GImg, GIcon, GScrollWindow, GScrollWindowItem },
  data: () => ({
    selectedItem: 0,
  }),
  props: {
    continuous: { type: Boolean, default: boolean('continuous', false) },
    reverse: { type: Boolean, default: boolean('reverse', false) },
    vertical: { type: Boolean, default: boolean('vertical', false) },
    showArrows: { type: Boolean, default: boolean('showArrows', true) },
    prevIcon: { type: String, default: text('prevIcon', 'mdi-chevron-left') },
    nextIcon: { type: String, default: text('nextIcon', 'mdi-chevron-right') },
    showArrowsOnHover: { type: Boolean, default: boolean('showArrowsOnHover', false) },
    elevation: { type: Number, default: number('elevation', 2) },
    hideDelimiters: { type: Boolean, default: boolean('hideDelimiters', false) },

  },
  template: `<g-scroll-window :continuous="continuous"
                       :hide-delimiters="hideDelimiters"
                       :elevation="elevation" :vertical="vertical"
                       :show-arrows-on-hover="showArrowsOnHover"
                       :prev-icon="prevIcon" :next-icon="nextIcon"
                       :reverse="reverse" :show-arrows="showArrows"
                       v-model="selectedItem"
             >
               <g-scroll-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/image-photo/plitvice-lakes-croatia-beautiful-place-260nw-1050138794.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>DISCOVER</p>
                    </g-card-title>
                  </g-img>
                </g-scroll-window-item>
                <g-scroll-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/image-photo/scenic-view-vernazza-cinque-terre-260nw-1252453072.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>A</p>
                    </g-card-title>
                  </g-img>
                </g-scroll-window-item>
                <g-scroll-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/z/stock-photo-the-istrian-streets-in-croatia-1461805289.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>WHOLE</p>
                    </g-card-title>
                  </g-img>
                </g-scroll-window-item>
                <g-scroll-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/image-photo/view-over-colorful-buildings-riomaggiore-600w-1532937503.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>NEW</p>
                    </g-card-title>
                  </g-img>
                </g-scroll-window-item>
                <g-scroll-window-item>
                  <g-img height="300" src="https://image.shutterstock.com/image-photo/lake-bled-autumn-600w-1463231747.jpg" width="100%">
                    <g-card-title absolute bottom left textColor="white">
                      <p>WORLD</p>
                    </g-card-title>
                  </g-img>
                </g-scroll-window-item>
            </g-scroll-window>`,
});
