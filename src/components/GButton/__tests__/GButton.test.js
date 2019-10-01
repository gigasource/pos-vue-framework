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

  it('has a button', () => {
    const wrapper = mountFunction()
    expect(wrapper.contains('button')).toBe(true)
  })
})