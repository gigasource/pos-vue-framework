import plugin from '@vue/composition-api';
import GChip from '../GChip';
import { createLocalVue, mount } from '@vue/test-utils';


describe('GChip', () => {
  const localVue = createLocalVue()
  localVue.use(plugin)

  describe('1) Render - ', () => {
    describe('Style ', () => {
      it('should have a chip rendered ', () => {
        let wrapper = mount(GChip, {
          localVue
        });
        expect(wrapper.contains('div')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-size__default')).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('should have a size small, draggable, filter chip rendered ', () => {
        let wrapper = mount(GChip, {
          localVue,
          propsData: {
            small: true,
            draggable: true,
            filter: true
          }
        });

        expect(wrapper.find('div').classes().includes('g-size__small')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__draggable')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__filter')).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('should have a large, draggable, close, filter chip rendered ', () => {
        let wrapper = mount(GChip, {
          localVue,
          propsData: {
            large: true,
            draggable: true,
            close: true,
            filter: true
          }
        });

        expect(wrapper.find('div').contains('span')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-size__large')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__close')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__draggable')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__filter')).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('should have a disabled chip rendered ', () => {
        let wrapper = mount(GChip, {
          localVue,
          propsData: {
            large: true,
            disabled: true,
            close: true,
            filter: true
          }
        });

        expect(wrapper.find('div').contains('span')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__disabled')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__filter')).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('should have a label chip (border of g-cards) rendered ', () => {
        let wrapper = mount(GChip, {
          localVue,
          propsData: {
            large: true,
            label: true,
            close: true,
            ripple: true,
            color: 'bg-light-green',
            textColor: 'white'
          }
        });

        expect(wrapper.find('div').contains('span')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__label')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-chip__close')).toBe(true);
        expect(wrapper.find('div').classes().includes('white--text')).toBe(true);
        expect(wrapper.find('div').classes().includes('bg-light-green')).toBe(true);
        expect(wrapper.find('div').classes().includes('waves-effect')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-size__large')).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
      });


      it('should have a outlined close chip rendered ', () => {
        let wrapper = mount(GChip, {
          localVue,
          propsData: {
            large: true,
            outlined: true,
            close: true,
            ripple: true,
            color: 'bg-light-green',
            textColor: 'white'
          }
        });


        expect(wrapper.find('div').contains('span')).toBe(true);
        console.log(wrapper.find('div').vm);
        expect(wrapper.find('div').classes().includes('g-chip__outlined')).toBe(true);
        expect(wrapper.find('div').classes().includes('waves-effect')).toBe(true);
        expect(wrapper.find('div').classes().includes('g-size__large')).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
      });

    });
  });
});
