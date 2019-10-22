// Created at 2019-10-17 18:05 by Thinh Vu
import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import GTimePickerTitle from '../../GTimePickerTitle'
import { HourConvention, Period, SelectingTime } from '../GTimePickerTitleUtil';

describe('GTimePicker/Title/GTimePickerTitle', () => {
  const localVue = createLocalVue()
  localVue.use(plugin)

  let mountFunction

  beforeEach(() => {
    mountFunction = (options) => {
      return mount(GTimePickerTitle, {
        localVue,
        ...options
      })
    }
  })

  describe('Render', () => {
    it('Should render empty props without any error', () => {
      let wrapper = mountFunction({})
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should not render ampm section if hour convention is not defined explicitly (default 12H)', () => {
      let wrapper = mountFunction()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should not render ampm section if hour convention is 12h', () => {
      let wrapper = mountFunction({ propsData: {hourConvention: HourConvention._12HRS } })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should not render ampm section if hour convention is 24h', () => {
      let wrapper = mountFunction({ propsData: {hourConvention: HourConvention._24HRS} })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Period', () => {
    it('Should make AM div active', () => {
      let wrapper = mountFunction({ propsData: {period: Period.AM} })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should make PM div active', () => {
      let wrapper = mountFunction({ propsData: {period: Period.PM} })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should re-render when period changed', () => {

    })
  })

  describe('Selecting', () => {
    it('Should make hour div active', () => {
      let wrapper = mountFunction({ propsData: {hour: 10, minute: 15, selecting: SelectingTime.Hour } })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should make minute div active', () => {
      let wrapper = mountFunction({ propsData: {hour: 10, minute: 15, selecting: SelectingTime.Minute } })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should re-render when selecting time changed', () => {

    })
  })
})
