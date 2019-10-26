import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GCard from '../GCard';
import GBtn from '../../GBtn/GBtn';
import GImg from '../../GImg/GImg';
import GCardText from '../GCardText';
import GCardTitle from '../GCardTitle';
import GCardSubtitle from '../GCardSubtitle';
import GIcon from '../../GIcon/GIcon';
import GCardActions from '../GCardActions';

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
                      <g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg" width="342" height="200" contain>
                         <g-card-title textColor="white" absolute left bottom>
                          <p>Lionel Messi, a legend</p>
                         </g-card-title>
                      </g-img>
                      <g-card-text>
                      <p>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed
                      making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to
                      find a way to escape.</p>
                    </g-card-text>
            <g-card-actions>
                <g-btn depressed>CONFIRM</g-btn>
                <g-btn depressed>CANCEL</g-btn>
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
    subTitle: { type: Boolean, default: boolean('subtitle', false) },
    width: { type: Number, default: number('width', 250) },
    height: { type: Number, default: number('height', 270) },
    maxWidth: { type: Number, default: number('maxWidth', 342) },
    minWidth: { type: Number, default: number('minWidth', 200) },
  },
  template: `<g-card :min-width="minWidth" :width="width" :height="height" :max-width="maxWidth" :shaped="shaped" :ripple="ripple" :outlined="outlined" :hover="hover" :raised="raised" :tile="tile" :disabled="disabled" style="padding-left: auto; padding-right: auto;">
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

export const GCardGrid = () => ({
  components: { GCard, GCardActions, GCardTitle, GCardText, GBtn, GCardSubtitle, GImg, GIcon },
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
                <g-btn icon >
                  <g-icon color="blue">
                  share
                  </g-icon>
                </g-btn>
            </g-card-actions>
            </g-card>`
});

