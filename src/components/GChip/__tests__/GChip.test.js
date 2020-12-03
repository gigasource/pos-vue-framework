import GChip from '../GChip';
import {  mount } from '@vue/test-utils';

describe('GChip', () => {
  describe('1) Render - ', () => {
    describe('Style ', () => {
      it('should have a chip rendered ', () => {
        let wrapper = mount(GChip, {
        });
        expect(wrapper.findAll('span').length).toBeGreaterThanOrEqual(1);
        expect(wrapper.find('span').classes().includes('g-chip')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-size__default')).toBe(true);
      });

      it('should have a size small, draggable, filter chip rendered ', () => {
        let wrapper = mount(GChip, {
          propsData: {
            small: true,
            draggable: true,
            filter: true
          }
        });
        expect(wrapper.find('span').classes().includes('g-size__small')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-chip__draggable')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-chip__filter')).toBe(true);
      });

      it('should have a large, draggable, close, filter chip rendered ', () => {
        let wrapper = mount(GChip, {
          propsData: {
            large: true,
            draggable: true,
            close: true,
            filter: true
          }
        });
        expect(wrapper.find('span').classes().includes('g-chip')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-size__large')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-chip__close')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-chip__draggable')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-chip__filter')).toBe(true);
      });

      it('should have a disabled chip rendered ', () => {
        let wrapper = mount(GChip, {
          propsData: {
            large: true,
            disabled: true,
            close: true,
            filter: true
          }
        });
        expect(wrapper.find('span').classes().includes('g-chip__disabled')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-chip__filter')).toBe(true);
      });

      it('should have a label chip (border of g-cards) rendered ', () => {
        let wrapper = mount(GChip, {
          propsData: {
            large: true,
            label: true,
            close: true,
            ripple: true,
            backgroundColor: 'light-green',
            textColor: 'white'
          }
        });
        expect(wrapper.find('span').classes().includes('g-chip__label')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-chip__close')).toBe(true);
        expect(wrapper.find('span').classes().includes('text-white')).toBe(true);
        expect(wrapper.find('span').classes().includes('bg-light-green')).toBe(true);
        expect(wrapper.find('span').classes().includes('waves-effect')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-size__large')).toBe(true);
      });

      it('should have a outlined close chip rendered ', () => {
        let wrapper = mount(GChip, {
          propsData: {
            large: true,
            outlined: true,
            close: true,
            ripple: true,
            color: 'bg-light-green',
            textColor: 'white'
          }
        });
        expect(wrapper.find('span').classes().includes('g-chip__outlined')).toBe(true);
        expect(wrapper.find('span').classes().includes('waves-effect')).toBe(true);
        expect(wrapper.find('span').classes().includes('g-size__large')).toBe(true);
      });

    });
  });
});
