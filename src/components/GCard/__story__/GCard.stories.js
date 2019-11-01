import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GCard from '../GCard';
import GBtn from '../../GBtn/GBtn';
import GImg from '../../GImg/GImg';
import GCardTitle from '../GCardTitle';
import GIcon from '../../GIcon/GIcon';
import GSpacer from '../../GLayout/GSpacer';
import { GExpandTransition } from '../../transition/transition';
import {GCardText, GCardActions, GCardSubtitle} from '../GCardFunctionalComponent'

export default {
  title: 'Card',
  decorators: [withKnobs],
};


export const GCardDefault = () => ({
  components: { GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle },
  props: {
    outlined: { type: Boolean, default: boolean('outlined', false) },
    hover: { type: Boolean, default: boolean('hover', false) },
    raised: { type: Boolean, default: boolean('raised', false) },
    tile: { type: Boolean, default: boolean('tile', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    shaped: { type: Boolean, default: boolean('shaped', false) },
    ripple: { type: Boolean, default: boolean('ripple', false) },
    subTitle: { type: Boolean, default: boolean('subtitle', false) },

  },
  template: `<g-card :shaped="shaped" :ripple="ripple" :outlined="outlined" :hover="hover" :raised="raised" :tile="tile" :disabled="disabled" style="padding-left: auto; padding-right: auto; max-width: 344px;">
                    <g-card-title>
                      <p>GCard Title</p>
                    </g-card-title>
                      <g-card-subtitle v-if="subTitle">
                      <p>GCard Sub Title</p>
                    </g-card-subtitle>
                    <g-card-text>
                      <p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
                      making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to
                      find a way to escape.</p>
                    </g-card-text>
            <g-card-actions>
                <g-btn depressed>CONFIRM</g-btn>
                <g-btn depressed>CANCEL</g-btn>
            </g-card-actions>
            </g-card>`,
});

export const GCardImage = () => ({
  components: { GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle, GImg },
  props: {
    outlined: { type: Boolean, default: boolean('outlined', true) },
    hover: { type: Boolean, default: boolean('hover', false) },
    raised: { type: Boolean, default: boolean('raised', false) },
    tile: { type: Boolean, default: boolean('tile', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    shaped: { type: Boolean, default: boolean('shaped', false) },
    subtitle: { type: Boolean, default: boolean('subtitle', false) },
  },
  template: `<g-card :shaped="shaped" :outlined="outlined" :hover="hover" :raised="raised" :tile="tile" :disabled="disabled" style="padding-left: auto; padding-right: auto; max-width: 344px;">
                      <g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg" width="342" height="200">
                         <g-card-title textColor="white" absolute left bottom>
                          <p>Lionel Messi, a legend</p>
                         </g-card-title>
                      </g-img>
                      <g-card-text>
                      <p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
                      making you'll be doing.</p>
                    </g-card-text>
            <g-card-actions>
                <g-btn depressed text-color="green">CONFIRM</g-btn>
                <g-btn depressed text-color="red">CANCEL</g-btn>
            </g-card-actions>
            </g-card>`
});

export const GCardInformation = () => ({
  components: { GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle },
  props: {
    outlined: { type: Boolean, default: boolean('outlined', false) },
    hover: { type: Boolean, default: boolean('hover', false) },
    raised: { type: Boolean, default: boolean('raised', false) },
    tile: { type: Boolean, default: boolean('tile', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    shaped: { type: Boolean, default: boolean('shaped', false) },
    ripple: { type: Boolean, default: boolean('ripple', false) },
    subTitle: { type: Boolean, default: boolean('subtitle', true) },
    maxWidth: { type: Number, default: number('maxWidth', 342) },
    width: { type: [Number, String], default: text('width', 'fit-content') },
  },
  template: `<g-card :width="width" :max-width="maxWidth" :shaped="shaped" :ripple="ripple" :outlined="outlined" :hover="hover" :raised="raised" :tile="tile" :disabled="disabled" style="padding-left: auto; padding-right: auto;">
                    <g-card-subtitle>
                      <p>Word of the day</p>
                    </g-card-subtitle>
                    <g-card-title>
                      <p>be•nev•o•lent</p>
                    </g-card-title>
                     <g-card-subtitle v-if="subTitle">
                      <p>adjective</p>
                    </g-card-subtitle>
                    <g-card-text>
                      <p>well meaning and kindly.</p>
                      <p>"a benevolent smile"</p>
                    </g-card-text>
            <g-card-actions>
                <g-btn depressed text-color="violet">LEARN MORE</g-btn>
            </g-card-actions>
            </g-card>`,
});

export const GCardExpand = () => ({
  components: { GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle, GImg, GIcon, GExpandTransition, GSpacer },
  data: () => {
    return { showExpand: false }
  },
  props: {
    outlined: { type: Boolean, default: boolean('outlined', true) },
    hover: { type: Boolean, default: boolean('hover', false) },
    raised: { type: Boolean, default: boolean('raised', false) },
    tile: { type: Boolean, default: boolean('tile', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    shaped: { type: Boolean, default: boolean('shaped', false) },
    subtitle: { type: Boolean, default: boolean('subtitle', false) },
  },
  template: `<g-card :shaped="shaped" :outlined="outlined" :hover="hover" :raised="raised" :tile="tile" :disabled="disabled" style="padding-left: auto; padding-right: auto; max-width: 344px;">
                      <g-img src="https://image.shutterstock.com/image-photo/plitvice-lakes-croatia-beautiful-place-260nw-1050138794.jpg" width="342" height="200" >
                         <g-card-title textColor="white" absolute left bottom>
                          <p>DISCOVER</p>
                         </g-card-title>
                      </g-img>
                      <g-card-text>
                      <p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
                      making you'll be doing.</p>
                    </g-card-text>
                    <div>
            <g-card-actions>
                <g-btn icon>
                  <g-icon color="red">
                    favorite
                  </g-icon>
                </g-btn>
                <g-btn icon>
                  <g-icon color="yellow">
                  star
                  </g-icon>
                </g-btn>
                <g-btn icon>
                  <g-icon color="blue">
                  share
                  </g-icon>
                </g-btn>
                <g-spacer> </g-spacer>
                 <g-btn icon @click="showExpand = !showExpand">
                  <g-icon color="blue" v-if="!showExpand">
                  keyboard_arrow_down
                  </g-icon>
                  <g-icon color="blue" v-else="showExpand">
                  keyboard_arrow_up
                  </g-icon>
                </g-btn>
            </g-card-actions>
                </div>
                <g-expand-transition>
                  <div v-show="showExpand" style="border-top: 1px solid rgba(0, 0, 0, 0.12); padding: 8px; font-weight: 400; font-size: .875rem; ">
                        <p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
                        making you'll be doing.</p>
                  </div>
                </g-expand-transition>
            
            </g-card>`
});

