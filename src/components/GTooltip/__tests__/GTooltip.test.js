import {createElement} from '../../../tests/setup'
const Vue = require('vue/dist/vue.common.js')
import plugin from 'vue'
Vue.use(plugin)

// Import your components after all of above import
import GTooltip from '../GTooltip'

describe('Tooltip', () => {
  function prepare(template) {
    return new Vue({
      template: template,
      components: { GTooltip },
    }).$mount(createElement())
  }

  describe('1) Render - ', () => {
    describe('Content - ', () => {
      it('Speech bubble content will be rendered if absolute is not exists', () => {
        let dom = prepare('<div><g-tooltip speech-bubble><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();

        dom = prepare('<div><g-tooltip absolute speech-bubble><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
      })
    })
  })

  describe('2) Position - ', () => {
    describe('Absolute - ', () => {
      it('Should set tooltip style with left: 0px, top: 0px', () => {
        // without unit
        let dom = prepare('<div><g-tooltip absolute><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();

        // with unit
        dom = prepare('<div><g-tooltip absolute><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
      })

      it('Should set tooltip style with left: 100px, top: 0px', () => {
        // without unit
        let dom = prepare('<div><g-tooltip absolute absolute-x="100"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();

        // with unit
        dom = prepare('<div><g-tooltip absolute absolute-x="100px"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
      })

      it('Should set tooltip style with left: 0px, top: 100px', () => {
        // wo unit
        let dom = prepare('<div><g-tooltip absolute absolute-y="100"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
        // w unit
        dom = prepare('<div><g-tooltip absolute absolute-y="100px"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
      })

      it('Should set tooltip style with left: 100px, top: 100px', () => {
        // wo unit
        let dom = prepare('<div><g-tooltip absolute absolute-x="100" absolute-y="100"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();

        // w unit
        dom = prepare('<div><g-tooltip absolute absolute-x="100px" absolute-y="100px"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
      })

      it('Should set tooltip style with left: 0px, top: 0px if absolute is not set', () => {
        const dom = prepare('<div><g-tooltip absolute-x="100" absolute-y="100"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
      })

      it('Should ignore all alignment setting if absolute is set', () => {
        let dom = prepare('<div style="padding-top: 500px; padding-left: 500px"><g-tooltip absolute top><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();

        dom = prepare('<div style="padding-top: 500px; padding-left: 500px"><g-tooltip absolute left><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();

        dom = prepare('<div style="padding-top: 500px; padding-left: 500px"><g-tooltip absolute right><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();

        dom = prepare('<div style="padding-top: 500px; padding-left: 500px"><g-tooltip absolute bottom><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
      })

      it('Should ignore all nudge setting if absolute is set', () => {
        const dom = prepare('<div style="padding-top: 500px; padding-left: 500px"><g-tooltip absolute nudge-top="200" nudge-right="200" nudge-bottom="200" nudge-left="200"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
        expect(dom.$el.outerHTML).toMatchSnapshot();
      })
    })

    describe('CalculatedLeft', () => {
      // TODO: calculatedLeftImplement
      // - Overflow
      // - Alignment Left, Right, NudgeLeft, NudgeRight

      // Pseudo
      // const props = {}
      // const dimensions = {}
      // const calculateXOverflow = {} // import fron menuable
      // expect(calculateLeftImplement(props, dimensions, calculateXOverflow)).toBe(100)
    })

    describe('CalculatedTop', () => {
      // TODO: calculatedTopImplement
      // - Overflow
      // - Alignment Top, Bottom, NudgeTop, NudgeBottom
    })
  })

  describe('3) Color - ', () => {
    const color = '#fafafa'
    it('Should be set for normal tooltip', () => {
      const dom = prepare(`<div><g-tooltip color="${color}"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>`);
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })

    it('Should be set - speech bubble tooltip with implicit position is top by default', () => {
      const dom = prepare(`<div><g-tooltip color="${color}" speech-bubble><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>`);
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })

    it('Should be set - speech bubble tooltip with explicit position is top by default', () => {
      const dom = prepare(`<div><g-tooltip color="${color}" speech-bubble top><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>`);
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })

    it('Should be set - speech bubble tooltip with explicit position is left by default', () => {
      const dom = prepare(`<div><g-tooltip color="${color}" speech-bubble left><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>`);
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })

    it('Should be set - speech bubble tooltip with explicit position is right by default', () => {
      const dom = prepare(`<div><g-tooltip color="${color}" speech-bubble right><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>`);
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })

    it('Should be set - speech bubble tooltip with explicit position is bottom by default', () => {
      const dom = prepare(`<div><g-tooltip color="${color}" speech-bubble bottom><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>`);
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })
  })

  describe('4) Behavior - ', () => {
    it('Should not toggle by click if open-on-hover is set', () => {
      const dom = prepare('<div><g-tooltip open-on-hover><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
      // if open-on-hover is not set, click event won't change display state of tooltip content
      dom.$el.querySelector('button').click()
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })

    it('Should be open by click if open-on-hover is not set while tooltip is close', (done) => {
      const dom = prepare('<div><g-tooltip><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
      // if open-on-hover is not set, click event won't change display state of tooltip content
      dom.$el.querySelector('button').click()
      setTimeout(() => {
        expect(dom.$el.outerHTML).toMatchSnapshot();
        done()
      }, 100);
    })

    it('Should be close by click if open-on-hover is not set while tooltip is open', (done) => {
      const dom = prepare('<div><g-tooltip><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
      // if open-on-hover is not set, click event won't change display state of tooltip content
      dom.$el.querySelector('button').click() // open
      dom.$el.querySelector('button').click() // close
      setTimeout(() => {
        expect(dom.$el.outerHTML).toMatchSnapshot();
        done()
      }, 100);
    })

    // Testing asynchronous code: https://jestjs.io/docs/en/asynchronous
    it('open-delay', (done) => {
      const delayTime = 1000 // 1s
      const dom = prepare(`<div><g-tooltip open-delay="${delayTime}"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>`);
      dom.$el.querySelector('button').click()
      expect(dom.$el.outerHTML).toMatchSnapshot();

      setTimeout(() => {
        expect(dom.$el.outerHTML).toMatchSnapshot();
        done()
      }, delayTime)
    })

    // Testing asynchronous code: https://jestjs.io/docs/en/asynchronous
    it('close-delay', (done) => {
      const delayTime = 1000 // 1s
      const dom = prepare(`<div><g-tooltip close-delay="${delayTime}"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>`);
      dom.$el.querySelector('button').click()
      expect(dom.$el.outerHTML).toMatchSnapshot();

      setTimeout(() => {
        expect(dom.$el.outerHTML).toMatchSnapshot();
        done()
      }, delayTime)
    })
  })

  describe('5) Max, min - ', () => {
    // max
    it('Should generate max-width: auto if max-width not set', () => {
      const dom = prepare('<div><g-tooltip><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })

    it('Should generate max-width: 100 if max-width=\"100\"', () => {
      const dom = prepare('<div><g-tooltip max-width="100"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })


    it('Should not generate min-width: (any) if min-width not set', () => {
      const dom = prepare('<div><g-tooltip><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })

    it('Should generate min-width: 100 if min-width=\"100\"', () => {
      const dom = prepare('<div><g-tooltip min-width="100"><template #activator="{on}"><button v-on="on">Click me</button></template><span>Tooltip content</span></g-tooltip></div>');
      expect(dom.$el.outerHTML).toMatchSnapshot();
    })
  })
})


