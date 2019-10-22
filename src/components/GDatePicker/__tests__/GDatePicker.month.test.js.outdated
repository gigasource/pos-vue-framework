import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import GDatePicker from '../GDatePicker';

describe('GDatePicker.month.js', () => {
  let mountFunction

  const localVue = createLocalVue()
  localVue.use(plugin)

  beforeEach(() => {
    mountFunction = (options) => {
      return mount(GDatePicker, {
        localVue,
        ...options
      })
    }
  })

  it('should emit input event on month click', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05',
        type: 'month',
      },
    })

    wrapper.vm.$on('input', cb)

    const target = wrapper.findAll('.g-date-picker-table--month button').at(0)
    target.trigger('click')
    expect(cb).toHaveBeenCalledWith('2013-01')
  })

  it('should be scrollable', (done) => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05',
        type: 'month',
        scrollable: true,
      },
    })

    wrapper.findAll('.g-date-picker-table--month').at(0).trigger('wheel')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.state.tableDate).toBe('2014')
      done()
    })
  })

  it('should match snapshot with pick-month prop', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        type: 'month',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates as array', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: value => ['2013-01', '2013-03', '2013-05', '2013-07'].includes(value),
      },
    })

    expect(wrapper.findAll('.g-date-picker-table--month tbody').at(0).html()).toMatchSnapshot()
  })

  it('should match snapshot with month formatting functions', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
        type: 'month',
        monthFormat: date => `(${date.split('-')[1]})`,
      },
    })

    const target = wrapper.findAll('.g-date-picker-table--month tbody').at(0)
    expect(target.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker & header', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'month',
        value: '2005-11-01',
        color: 'primary',
        headerColor: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'month',
        value: '2005-11-01',
        color: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match change month when clicked on header arrow buttons', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        type: 'month',
      },
    })

    const leftButton = wrapper.findAll('.g-date-picker-header__prev-button').at(0)
    const rightButton = wrapper.findAll('.g-date-picker-header__next-button').at(0)

    leftButton.trigger('click')
    expect(wrapper.vm.state.tableDate).toBe('2004')

    rightButton.trigger('click')
    expect(wrapper.vm.state.tableDate).toBe('2005')
  })

  it('should match change active picker when clicked on month button', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
        type: 'month',
      },
    })

    const button = wrapper.findAll('.g-date-picker-header__value button').at(0)

    button.trigger('click')
    expect(wrapper.vm.state.activePicker).toBe('year')
  })

  it('should select year', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'month',
        value: '2005-11',
      },
    })

    wrapper.vm.state.activePicker = 'year'
    wrapper.findAll('.g-date-picker-years li.active + li').at(0).trigger('click')
    expect(wrapper.vm.state.activePicker).toBe('month')
    expect(wrapper.vm.state.tableDate).toBe('2004')
  })

  it('should set the table date when value has changed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: null,
        type: 'month',
      },
    })

    wrapper.setProps({ value: '2005-11' })
    expect(wrapper.vm.state.tableDate).toBe('2005')
  })

  it('should display translated title', async () => {
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        type: 'month',
        value: ['2013-05'],
      },
    })

    expect(wrapper.find('.g-date-picker-title__date').text()).toBe('1 selected')

    wrapper.setProps({ value: [] })
    expect(wrapper.find('.g-date-picker-title__date').text()).toBe('0 selected')

    wrapper.setProps({
      value: ['2013-05', '2013-06', '2013-07'],
    })
    expect(wrapper.find('.g-date-picker-title__date').text()).toBe('3 selected')
  })

  it('should emit click event', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05',
        type: 'month',
      },
    })

    const click = jest.fn()
    wrapper.vm.$on(`click:month`, click)
    wrapper.findAll('.g-date-picker-table--month tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(click).toHaveBeenCalledWith('2013-04')
  })

})
