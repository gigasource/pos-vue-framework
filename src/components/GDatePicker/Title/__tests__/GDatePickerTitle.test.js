import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@vue/composition-api'

import GDatePickerTitle from '../GDatePickerTitle'
import {EVENT_NAMES} from '../GDatePickerTitleUtil'
import {TRANSITION_NAMES} from '../../utils'

describe('GDatePickerTitle.js', () => {
  let mountFunction

  const localVue = createLocalVue()
  localVue.use(plugin)

  beforeEach(() => {
    mountFunction = (options) => {
      return mount(GDatePickerTitle, {
        localVue,
        ...options
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component when selecting year and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
        selectingYear: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event on year click', (done) => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
      },
    })

    const input = jest.fn(value => wrapper.setProps({ selectingYear: value }))
    wrapper.vm.$on(EVENT_NAMES.UPDATE_SELECTING_YEAR, input)
    wrapper.findAll('.g-date-picker-title__year').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith(true)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.selectingYear).toBe(true)
      done()
    })
  })

  it('should have the correct transition', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '2018',
        date: 'Tue, Mar 3',
        value: '2018-03-03',
      },
    })

    expect(wrapper.vm.transitionName).toEqual(TRANSITION_NAMES.PICKER)
  })
})
