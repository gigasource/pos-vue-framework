import {getHslColor} from "../utils/colors";

;(function (window) {
  'use strict';

  const Darken = window.Darken || {};

  const Effect = {
    //click
    elements: [],
    // Effect delay
    duration: 1500,

    show: function (e, element) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      const el = element || this;
      Effect.elements.push(el)

      const background = el.style.backgroundColor,
          border = el.style.borderColor,
          shadow = el.style.boxShadow

      let {h, s, l, a} = getHslColor(background)
      if (h === 0 && s === 0) {
        let hsla
        if (border)
          hsla = getHslColor(border)
        else
          hsla = {h: 0, s: 0, l: 0, a: 0}
        h = hsla.h
        s = hsla.s
        l = hsla.l
        a = hsla.a
      }
      el.style.background = `hsla(${h}, ${s - 5}%, ${l - 15}%, ${a})`
      el.style.borderColor = `hsla(${h + 2}, ${s - 10}%, ${l - 15}%, ${a})`
      el.style.boxShadow = `1px 0px 5px hsla(${h + 2}, ${s - 10}%, ${l - 15}%, ${a})`;

      setTimeout(() => {
        el.style.backgroundColor = background
        el.style.borderColor = border
        el.style.boxShadow = shadow
        const index = Effect.elements.findIndex(element => element === el)
        Effect.elements.splice(index, 1)
      }, Effect.duration)
    },

  };

  const TouchHandler = {
    touches: 0,
    allowEvent: function (e) {
      let allow = true;

      if (e.type === 'touchstart') {
        TouchHandler.touches += 1;
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1;
          }
        }, Effect.duration);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };

  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    let element = null;
    let target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('darken-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }

  function showEffect(e) {
    const element = getWavesEffectElement(e);

    if (element !== null && Effect.elements.findIndex(el => el === element) === -1) {
      Effect.show(e, element);
    }
  }

  Darken.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }


    if ('ontouchstart' in window) {
      document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
  };

  Darken.attach = function (element) {
    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
  };

  window.Darken = Darken;

  document.addEventListener('DOMContentLoaded', function () {
    Darken.displayEffect();
  }, false);

})(window);
