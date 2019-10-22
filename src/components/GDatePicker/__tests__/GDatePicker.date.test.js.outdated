import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import GDatePicker from '../GDatePicker';

describe('GDatePicker.date.js', () => {
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


  it('should display the correct date in title and header', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    const title = wrapper.findAll('.g-date-picker-title__date').at(0)
    const header = wrapper.findAll('.g-date-picker-header__value div').at(0)

    expect(title.text()).toBe('Tue, Nov 1')
    expect(header.text()).toBe('November 2005')
  })

  it('should work with year < 1000', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '0005-11-01',
      },
    })
  })

  it('should display the correct year when model is null', () => {
    const wrapper = mountFunction({
      propsData: {
        value: null,
      },
    })

    const year = wrapper.findAll('.g-date-picker-title__year').at(0)
    const now = new Date()
    expect(year.text()).toBe(`${now.getFullYear()}`)
  })

  it('should match snapshot with default settings', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly picker', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled picker', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event on date click', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('.g-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith('2013-05-05')
  })

  it('should not emit input event on month click if date is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-13',
        allowedDates: () => false,
        type: 'month'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.vm.$on('input', cb)
    wrapper.findAll('.g-date-picker-table--month button').at(0).trigger('click')
    expect(cb).not.toHaveBeenCalled()
  })

  it('should emit input event with selected dates after click', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: ['2013-05-07', '2013-05-08'],
      },
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.g-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(cb.mock.calls[0][0]).toHaveLength(3)
    expect(cb.mock.calls[0][0][2]).toBe('2013-05-05')
    expect(cb.mock.calls[0][0]).toEqual(
        expect.arrayContaining(['2013-05-07', '2013-05-08', '2013-05-05'])
    )
  })

  it('should display translated title', async () => {
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: ['2013-05-07'],
      },
    })

    expect(wrapper.find('.g-date-picker-title__date').text()).toBe('1 selected')

    wrapper.setProps({
      value: [],
    })
    expect(wrapper.find('.g-date-picker-title__date').text()).toBe('0 selected')

    wrapper.setProps({
      value: ['2013-05-07', '2013-05-08', '2013-05-09'],
    })
    expect(wrapper.find('.g-date-picker-title__date').text()).toBe('3 selected')
  })

  it('should emit input without unselected dates after click', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: ['2013-05-07', '2013-05-08', '2013-05-05'],
      },
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.g-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(cb.mock.calls[0][0]).toHaveLength(2)
    expect(cb.mock.calls[0][0]).toEqual(expect.arrayContaining(['2013-05-07', '2013-05-08']))
    expect(cb.mock.calls[0][0]).not.toEqual(expect.arrayContaining(['2013-05-05']))
  })

  it('should match snapshot with no title', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        noTitle: true,
      },
    })

    expect(wrapper.findAll('.g-picker__title').wrappers).toHaveLength(0)
  })

  it('should pass first day of week to v-date-picker-table component', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        firstDayOfWeek: 2,
      },
    })

    expect(wrapper.vm.$refs.table.firstDayOfWeek).toBe(2)
  })

  it('should match snapshot with title/header formatting functions', () => {
    const dateFormat = date => `(${date})`
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
        headerDateFormat: dateFormat,
        titleDateFormat: dateFormat,
        weekdayFormat: () => 'W',
      },
    })

    expect(wrapper.findAll('.g-date-picker-title__date').at(0).text()).toBe('(2005-11-01)')
    expect(wrapper.findAll('.g-date-picker-header__value').at(0).text()).toBe('(2005-11)')
    expect(wrapper.findAll('.g-date-picker-table--date th').at(1).text()).toBe('W')
  })

  it('should match snapshot with colored picker & header', () => {
    const wrapper = mountFunction({
      propsData: {
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
        value: '2005-11-01',
        color: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with year icon', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
        yearIcon: 'year',
      },
    })

    expect(wrapper.findAll('.g-picker__title').at(0).html()).toMatchSnapshot()
  })

  it('should match change month when clicked on prev header arrow buttons', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    const leftButton = wrapper.findAll('.g-date-picker-header__prev-button').at(0)

    leftButton.trigger('click')
    expect(wrapper.vm.state.tableDate).toBe('2005-10')
  })

  it('should match change month when clicked on next header arrow buttons', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    const rightButton = wrapper.findAll('.g-date-picker-header__next-button').at(0)

    rightButton.trigger('click')
    expect(wrapper.vm.state.tableDate).toBe('2005-12')
  })

  it('should match change active picker when clicked on month button', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    const button = wrapper.findAll('.g-date-picker-header__value button').at(0)

    button.trigger('click')
    expect(wrapper.vm.state.activePicker).toBe('month')
  })

  it('should match snapshot with slot', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'date',
        value: '2005-11-01',
      },
      scopedSlots: {
        default: '<div class="scoped-slot"></div>',
      },
    })
    expect(wrapper.findAll('.g-picker__actions .scoped-slot').wrappers).toHaveLength(1)
  })

  it('should set the table date when value has changed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: null,
      },
    })

    wrapper.setProps({ value: '2005-11-11' })
    expect(wrapper.vm.state.tableDate).toBe('2005-11')
  })

  it('should update the active picker if type has changed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '1999-12-13',
        type: 'date',
      },
    })

    wrapper.vm.$on('input', value => wrapper.setProps({ value }))

    wrapper.setProps({ type: 'month' })
    expect(wrapper.vm.state.activePicker).toBe('month')
    expect(wrapper.vm.value).toBe('1999-12')
    wrapper.setProps({ type: 'date' })
    expect(wrapper.vm.state.activePicker).toBe('date')
    expect(wrapper.vm.value).toBe('1999-12-01')
  })

  it('should emit update:picker-date event when tableDate changes', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2017-09',
      },
    })

    const pickerDate = jest.fn()
    wrapper.vm.$on('update:picker-date', pickerDate)
    wrapper.vm.state.tableDate = '2013-11'
    await wrapper.vm.$nextTick()
    expect(pickerDate).toHaveBeenCalledWith('2013-11')
  })

  it('should emit @input and not emit @change when month is clicked', (done) => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-02-07',
        reactive: true,
        type: 'month'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('tbody tr td button').at(0).trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(input).toHaveBeenCalledWith('2013-01')
      done()
    })
  })

  it('should emit click:date event', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-20',
        type: 'date',
      },
    })

    const click = jest.fn()
    wrapper.vm.$on(`click:date`, click)
    wrapper.findAll('.g-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(click).toHaveBeenCalledWith('2013-05-05')
  })

  it('should handle date range select', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        range: true,
        value: ['2019-01-01', '2019-01-02'],
      },
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.g-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(cb.mock.calls[0][0]).toEqual(
        expect.arrayContaining(['2019-01-06'])
    )

    wrapper.findAll('.g-date-picker-table--date tbody tr+tr td button').at(2).trigger('click')
    expect(cb.mock.calls[0][0][0]).toBe('2019-01-06')
    expect(cb.mock.calls[1][0][0]).toBe('2019-01-08')
  })
})
