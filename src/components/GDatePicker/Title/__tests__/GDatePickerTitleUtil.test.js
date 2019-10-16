import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'

import { getYearButtonClickHandler, EVENT_NAMES } from '../GDatePickerTitleUtil'


describe('GDatePicker/GDatePickerTitle/GDatePickerTitleUtil.js', ()=>{
  createLocalVue().use(plugin)
  const updateSelectingYear = true

  it(`Should emit event ${EVENT_NAMES.UPDATE_SELECTING_YEAR} with value is ${updateSelectingYear}`, () => {
    const mockEvent = {
      stopPropagation: jest.fn()
    }
    const mockContext = {
      emit: jest.fn(v => v)
    }
    const clickHandler = getYearButtonClickHandler({}, mockContext)
    clickHandler(mockEvent)
    expect(mockEvent.stopPropagation).toBeCalledTimes(1)
    expect(mockContext.emit.mock.calls.length).toBe(1)
    expect(mockContext.emit.mock.calls[0][0]).toEqual(EVENT_NAMES.UPDATE_SELECTING_YEAR)
    expect(mockContext.emit.mock.calls[0][1]).toEqual(updateSelectingYear)
  })

  it('Should not emit if props.selectingYear is true', () => {
    const mockEvent = {
      stopPropagation: jest.fn()
    }
    const mockContext = {
      emit: jest.fn(v => v)
    }
    const clickHandler = getYearButtonClickHandler({ selectingYear: true }, mockContext)
    clickHandler(mockEvent)
    expect(mockEvent.stopPropagation).toBeCalledTimes(1)
    expect(mockContext.emit).toBeCalledTimes(0)
  })

  it('Should not emit if props.readonly is true', () => {
    const mockEvent = {
      stopPropagation: jest.fn()
    }
    const mockContext = {
      emit: jest.fn(v => v)
    }
    const clickHandler = getYearButtonClickHandler({ readonly: true }, mockContext)
    clickHandler(mockEvent)
    expect(mockEvent.stopPropagation).toBeCalledTimes(1)
    expect(mockContext.emit).toBeCalledTimes(0)
  })
})
