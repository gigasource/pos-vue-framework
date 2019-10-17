import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import GDatePickerHeader from '../GDatePickerHeader';

describe('GDatePickerHeader.js', () => {
  let mountFunction

  const localVue = createLocalVue()
  localVue.use(plugin)

  beforeEach(() => {
    mountFunction = (options) => {
      return mount(GDatePickerHeader, {
        localVue,
        ...options
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with year value and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005',
      },
    })

    expect(wrapper.findAll('.g-date-picker-header__value div').at(0).element.textContent.trim()).toBe('2005')
  })

  it('should render component with own formatter and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        format: value => `(${value})`,
      },
    })

    expect(wrapper.findAll('.g-date-picker-header__value div').at(0).element.textContent.trim()).toBe('(2005-11)')
  })

  it('should render component with default slot and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
      },
      slots: {
        default: '<span>foo</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should trigger event on selector click', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
      },
    })

    const toggle = jest.fn()
    wrapper.vm.$on('toggle', toggle)

    wrapper.findAll('.g-date-picker-header__value button').at(0).trigger('click')
    expect(toggle).toHaveBeenCalled()
  })
})
