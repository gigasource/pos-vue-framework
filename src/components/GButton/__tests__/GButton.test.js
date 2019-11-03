import GButton from '../GButton';
import { mount } from '@vue/test-utils';

describe('Button', () => {
  let mountFunction

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(GButton, {
        ...options
      })
    }
  })

  // match selector
  it('has a button', () => {
    const wrapper = mountFunction()
    expect(wrapper.contains('button')).toBe(true)
  })

  // match snapshot
  it('should have raised class', () => {
    const wrapper = mountFunction({
      propsData: {
        raised: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit click event', () => {
    const wrapper = mountFunction()
    wrapper.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  });

  it('should have correct bgStyle', function () {
    const wrapper = mountFunction({
      propsData: {
        height: 40,
        width: 100,
        color: 'blue'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  });
})
