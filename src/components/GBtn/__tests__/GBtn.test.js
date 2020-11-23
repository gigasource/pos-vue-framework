import plugin from 'vue';
import GBtn from '../GBtn';
import { createLocalVue, mount } from '@vue/test-utils';


describe('GBtn', () => {
  const localVue = createLocalVue()
  localVue.use(plugin)

  describe('1) Render - ', () => {
    describe('Style ', () => {
      it('should have a button rendered ', () => {
        let wrapper = mount(GBtn, {
          localVue
        });
        expect(wrapper.contains('button')).toBe(true);
      });

      it('should have a correct markup (outlined, absolute, top)rendered ', () => {
        let wrapper = mount(GBtn, {
          localVue,
          propsData: {
            outlined: true,
            absolute: true,
            top: true
          },
          slots: {
            default: `Button`
          }
        });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('should have a correct markup (raised, height, width, textColor)rendered ', () => {
        const wrapper = mount(GBtn, {
          localVue,
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
        expect(wrapper.html()).toMatchSnapshot()
      });

      it('should have a correct markup (fab, flat)rendered', () => {
        const wrapper = mount(GBtn, {
          localVue,
          propsData: {
            fab: true,
            flat: true
          },
          slots: {
            default: `Button`
          }
        });
        expect(wrapper.html()).toMatchSnapshot()
      });

      it('should have a rounded corner', () => {
        const wrapper = mount(GBtn, {
          localVue,
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
        expect(wrapper.html()).toMatchSnapshot()
      });

      it('should have a tile corner', () => {
        const wrapper = mount(GBtn, {
          localVue,
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
        expect(wrapper.html()).toMatchSnapshot()
      });

      it('should have blue background, white color', () => {
        const wrapper = mount(GBtn, {
          localVue,
          propsData: {
            color: 'blue'
          },
          slots: {
            default: `Button`
          }
        });
        expect(wrapper.html()).toMatchSnapshot()
      });
    });

    describe('Positioning', () => {
      it('should have fixed, top, right position ', () => {
        let wrapper = mount(GBtn, {
          localVue,
          propsData: {
            fixed: true,
            top: true,
            right: true
          },
          slots: {
            default: `Button`
          }
        });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('should have absolute, bottom, left position ', () => {
        let wrapper = mount(GBtn, {
          localVue,
          propsData: {
            absolute: true,
            bottom: true,
            left: true
          },
          slots: {
            default: `Button`
          }
        });
        expect(wrapper.html()).toMatchSnapshot();
      });
    });

  });
  describe('2) Behavior - ', () => {
    const localVue = createLocalVue();
    localVue.use(plugin);
    let wrapper = mount(GBtn, {
      localVue
    });

    it('Should emit a click event', () => {
      wrapper.trigger('click');
      expect(wrapper.emitted()).toBeTruthy();
    })

  });
});
