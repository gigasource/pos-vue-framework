import {boolean, number, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GImg from '../GImg';

export default {
  title: 'GImg',
  decorators: [withKnobs],
};

export const imgBasic = () => ({
  components: {GImg},
  prop:{
    contain:{default: boolean('contain',false)}
  },
  template: `<g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg"
               gradient="to top right, rgba(100,115,201,.33), rgba(255,32,72,.7)"
               height="400" aspect-ratio="1" :contain="contain"></g-img>`,
})

export const withHeightContain = () => ({
  components: {GImg},
  props: {
    contain: {default: boolean('contain', false)},
    height: {default: number('height', 500)},
    width: {default: number('width', 500)},
    aspectRatio: {default: number('ratio', null)},
  },
  template: `<g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg" :width="width" :height="height" :aspectRatio="aspectRatio" :contain="contain"
              :gradient="gradient"></g-img>`,
})

export const gradient = () => ({
  components: {GImg},
  props: {
    gradient: {default: text('gradient', 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)')}
  },
  template: `<g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg" width="500" :height="500" contain :gradient="gradient"></g-img>`,
})

export const placeHolder = () => ({
  components: {GImg},
  props: {
    contain: {default: boolean('contain', false)},
    height: {default: number('height', 500)},
    width: {default: number('width', 500)},
  },
  template: `<div>
             <g-img src="http://www.effigis.com/wp-content/uploads/2015/02/Airbus_Pleiades_50cm_8bit_RGB_Yogyakarta.jpg" 
              lazy-src="https://picsum.photos/id/11/10/6"
              :width="width" :height="height" :aspectRatio="aspectRatio" :contain="contain">
               <template v-slot:placeholder><p>This is showed in loading time </p></template>
               <p style="background-color: #cccccc"> This is default placeholder </p>
             </g-img>
             <br>
             <g-img src="http://www.effigis.com/wp-_50cm_8bit_RGB_Yogyakarta.jpg" 
              lazy-src="https://picsum.photos/id/11/10/6"
              :width="width" :height="height" :aspectRatio="aspectRatio" :contain="contain">
               <template v-slot:placeholder><p>This is showed in loading time </p></template>
               <p style="background-color: #cccccc"> This is default placeholder </p>
             </g-img>
             </div>`,
})

export const lazyLoading = () => ({
  components: {GImg},
  props: {
    contain: {default: boolean('contain', false)},
    height: {default: number('height', 500)},
    width: {default: number('width', 500)},
  },
  template: `<div>
             <g-img src="http://www.effigis.com/wp-content/uploads/2015/02/Airbus_Pleiades_50cm_8bit_RGB_Yogyakarta.jpg" 
              lazy-src="https://picsum.photos/id/11/10/6"
              :width="width" :height="height" :aspectRatio="aspectRatio" :contain="contain">
               <template v-slot:placeholder><p>This is showed in loading time </p></template>
               <p style="background-color: #cccccc"> This is default placeholder </p>
             </g-img>
             <div style="height: 2000px; width: 500px"></div>
             <g-img src="http://www.effigis.com/wp-content/uploads/2015/02/Airbus_Pleiades_50cm_8bit_RGB_Yogyakarta.jpg" 
              lazy-src="https://picsum.photos/id/11/10/6"
              :width="width" :height="height" :aspectRatio="aspectRatio" :contain="contain">
               <template v-slot:placeholder><p>This is showed in loading time </p></template>
               <p style="background-color: #cccccc"> This is default placeholder </p>
             </g-img>
             </div>`,
})

export const srcset = () => ({
  components: {GImg},
  template: `<g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg"
                    srtset="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg 1000w,
                            https://picsum.photos/id/11/10/6 600w"
                    height="500px" width="500px"></g-img>`
})

// import Vue from 'vue/dist/vue.common.js'
// import {value} from "@vue/composition-api/dist/functions/state";
//
// describe('GImg', function () {
//   it('with width height', function () {
//     const vm = new Vue(imgWithWidthHeight()).$mount();
//     expect(vm.$el.outerHTML).toMatchSnapshot()
//   });
// })


