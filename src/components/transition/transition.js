import {
  createSimpleTransition,
  createJavaScriptTransition,
  ExpandTransitionGenerator,
} from './transitionHelper.js'


// Component specific transitions
export const GCarouselTransition = createSimpleTransition('carousel-transition');
export const GCarouselReverseTransition = createSimpleTransition('carousel-reverse-transition');
export const GTabTransition = createSimpleTransition('tab-transition');
export const GTabReverseTransition = createSimpleTransition('tab-reverse-transition');
export const GMenuTransition = createSimpleTransition('menu-transition');
export const GFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in');

// Generic transitions
export const GDialogTransition = createSimpleTransition('dialog-transition');
export const GDialogBottomTransition = createSimpleTransition('dialog-bottom-transition');
export const GFadeTransition = createSimpleTransition('fade-transition');
export const GScaleTransition = createSimpleTransition('scale-transition');
export const GScrollXTransition = createSimpleTransition('scroll-x-transition');
export const GScrollXReverseTransition = createSimpleTransition('scroll-x-reverse-transition');
export const GScrollYTransition = createSimpleTransition('scroll-y-transition');
export const GScrollYReverseTransition = createSimpleTransition('scroll-y-reverse-transition');
export const GSlideXTransition = createSimpleTransition('slide-x-transition');
export const GSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition');
export const GSlideYTransition = createSimpleTransition('slide-y-transition');
export const GSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition');

//Animation
export const GBounceDownAnimation = createSimpleTransition('bounceDown');
export const GBounceUpAnimation = createSimpleTransition('bounceUp');
export const GBounceRightAnimation = createSimpleTransition('bounceRight');
export const GBounceLeftAnimation = createSimpleTransition('bounceLeft');
export const GFadeDownAnimation = createSimpleTransition('fadeDown');
export const GFadeUpAnimation = createSimpleTransition('fadeUp');
export const GFadeRightAnimation = createSimpleTransition('fadeRight');
export const GFadeLeftAnimation = createSimpleTransition('fadeLeft');
export const GFlipXAnimation = createSimpleTransition('flipX');
export const GFlipYAnimation = createSimpleTransition('flipY');
export const GLightSpeedRightAnimation = createSimpleTransition('lightSpeedRight');
export const GLightSpeedLeftAnimation = createSimpleTransition('lightSpeedLeft');
export const GRollAnimation = createSimpleTransition('roll');
export const GRotateAnimation = createSimpleTransition('rotate');
export const GRotateDownAnimation = createSimpleTransition('rotateDown');
export const GRotateUpAnimation = createSimpleTransition('rotateUp');
export const GRotateRightAnimation = createSimpleTransition('rotateRight');
export const GRotateLeftAnimation = createSimpleTransition('rotateLeft');
export const GZoomAnimation = createSimpleTransition('zoom');
export const GZoomDownAnimation = createSimpleTransition('zoomDown');
export const GZoomUpAnimation = createSimpleTransition('zoomUp');
export const GZoomRightAnimation = createSimpleTransition('zoomRight');
export const GZoomLeftAnimation = createSimpleTransition('zoomLeft');


// JavaScript transitions
export const GExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionGenerator());
export const GExpandXTransition = createJavaScriptTransition('expand-x-transition', ExpandTransitionGenerator('', true));

export default {
  GCarouselTransition,
  GCarouselReverseTransition,
  GDialogTransition,
  GDialogBottomTransition,
  GFabTransition,
  GFadeTransition,
  GMenuTransition,
  GScaleTransition,
  GScrollXTransition,
  GScrollXReverseTransition,
  GScrollYTransition,
  GScrollYReverseTransition,
  GSlideXTransition,
  GSlideXReverseTransition,
  GSlideYTransition,
  GSlideYReverseTransition,
  GTabReverseTransition,
  GTabTransition,
  GBounceDownAnimation,
  GBounceUpAnimation,
  GBounceRightAnimation,
  GBounceLeftAnimation,
  GFadeDownAnimation,
  GFadeUpAnimation,
  GFadeRightAnimation,
  GFadeLeftAnimation,
  GFlipXAnimation,
  GFlipYAnimation,
  GLightSpeedRightAnimation,
  GLightSpeedLeftAnimation,
  GRollAnimation,
  GRotateAnimation,
  GRotateDownAnimation,
  GRotateUpAnimation,
  GRotateRightAnimation,
  GRotateLeftAnimation,
  GZoomAnimation,
  GZoomDownAnimation,
  GZoomUpAnimation,
  GZoomRightAnimation,
  GZoomLeftAnimation,
  GExpandTransition,
  GExpandXTransition,
}
