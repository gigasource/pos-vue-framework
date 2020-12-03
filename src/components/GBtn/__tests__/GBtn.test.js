import plugin from 'vue';
import GBtn from '../GBtn';
import { mount } from '@vue/test-utils';


describe('GBtn', () => {
  describe('1) Render - ', () => {
    describe('Style ', () => {
      it('should have a button rendered ', () => {
        let wrapper = mount(GBtn, {
          slots: {
            default: `Button`
          }
        });
        expect(wrapper.findAll('div').length).toBeGreaterThanOrEqual(1);
        expect(wrapper.text()).toContain('Button')
      });

      it('should have a correct markup (outlined, absolute, top)rendered ', () => {
        let wrapper = mount(GBtn, {
          propsData: {
            outlined: true,
            absolute: true,
            top: true
          },
          slots: {
            default: `Button`
          }
        });
        const classList = wrapper.classes()
        expect(classList).toContain('g-btn__outlined');
        expect(classList).toContain('g-btn__absolute')
        expect(classList).toContain('g-btn__top')
      });

      it('should have a correct markup (raised, height, width, textColor)rendered ', () => {
        const wrapper = mount(GBtn, {
          propsData: {
            raised: true,
            height: '40px',
            width: '100px',
            textColor: 'blue'
          },
          slots: {
            default: `Button`
          }
        });
        const classList = wrapper.classes()
        expect(classList).toContain('g-btn__raised');
        expect(classList).toContain('text-blue')
        const style = wrapper.attributes().style
        expect(style).toBe("width: 100px; height: 40px;")
      });

      it('should have a correct markup (fab, flat)rendered', () => {
        const wrapper = mount(GBtn, {
          propsData: {
            fab: true,
            flat: true
          },
          slots: {
            default: `Button`
          }
        });
        const classList = wrapper.classes()
        expect(classList).toContain('g-btn__fab');
        expect(classList).toContain('g-btn__flat')
      });

      it('should have a rounded corner', () => {
        const wrapper = mount(GBtn, {
          propsData: {
            rounded: true,
            minWidth: '90px',
            minHeight: '50px',
            color: 'green'
          },
          slots: {
            default: `Button`
          }
        });
        const classList = wrapper.classes()
        expect(classList).toContain('g-btn__rounded');
        const style = wrapper.attributes().style
        expect(style).toBe("min-width: 90px; min-height: 50px;")
        const color = wrapper.attributes().color
        expect(color).toBe('green')
      });

      it('should have a tile corner', () => {
        const wrapper = mount(GBtn, {
          propsData: {
            tile: true,
            maxWidth: '90px',
            maxHeight: '90px',
            color: 'red'
          },
          slots: {
            default: `Button`
          }
        });
        const classList = wrapper.classes()
        expect(classList).toContain('g-btn__tile');
      });

      it('should have blue background, white color', () => {
        const wrapper = mount(GBtn, {
          propsData: {
            color: 'blue'
          },
          slots: {
            default: `Button`
          }
        });
        const color = wrapper.attributes().color
        expect(color).toBe('blue')

      });
    });

    describe('Positioning', () => {
      it('should have fixed, top, right position ', () => {
        let wrapper = mount(GBtn, {
          propsData: {
            fixed: true,
            top: true,
            right: true
          },
          slots: {
            default: `Button`
          }
        });
        const classList = wrapper.classes()
        expect(classList).toContain('g-btn__fixed')
        expect(classList).toContain('g-btn__top')
        expect(classList).toContain('g-btn__right')
      });

      it('should have absolute, bottom, left position ', () => {
        let wrapper = mount(GBtn, {
          propsData: {
            absolute: true,
            bottom: true,
            left: true
          },
          slots: {
            default: `Button`
          }
        });
        const classList = wrapper.classes()
        expect(classList).toContain('g-btn__absolute')
        expect(classList).toContain('g-btn__bottom')
        expect(classList).toContain('g-btn__left')
      });
    });

  });
  describe('2) Behavior - ', () => {
    let wrapper = mount(GBtn);
    it('Should emit a click event', () => {
      wrapper.trigger('click');
      expect(wrapper.emitted()).toBeTruthy();
    })

  });
});
