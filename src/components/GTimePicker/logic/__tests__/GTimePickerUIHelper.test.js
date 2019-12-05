// Created at 2019-10-24 16:39 by Thinh Vu
import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import { _calcNumberPositionStyle, computedHandStyle, getSelectedIndex } from '../GTimePickerUIHelper'

describe('/GTimePickerUIHelper', () => {
  createLocalVue().use(plugin)

  describe('_calcNumberPositionStyle', () => {
    // reference equals
    it('Should pass the test', () => {
      // Simple test with only 4 number
      // these number will be place in 0, 3, 6, 9 position in a clock
      let numberOutput = _calcNumberPositionStyle(4, 1)
      expect(numberOutput[0]).toEqual({ top: '0%', left: '49.99999999999999%' })
      expect(numberOutput[1]).toEqual({ top: '49.99999999999999%', left: '100%' })
      expect(numberOutput[2]).toEqual({ top: '100%', left: '50.000000000000014%' })
      expect(numberOutput[3]).toEqual({ top: '50.000000000000014%', left: '0%' })

      // scale smaller
      numberOutput = _calcNumberPositionStyle(4, 0.6)
      expect(numberOutput[0]).toEqual({ top: '20%', left: '50%' })
      expect(numberOutput[1]).toEqual({ top: '49.99999999999999%', left: '80%' })
      expect(numberOutput[2]).toEqual({ top: '80%', left: '50%' })
      expect(numberOutput[3]).toEqual({ top: '50.000000000000014%', left: '20%' })
    })
  })

  describe('getSelectedIndex', () => {
    it ('Should pass the test case', () => {
      const clockContainer = { width: 200, height: 200 }
      const simpleTestCases = [
        // Part 1
        { targetPos: { x: 150, y: 50 }, item: 4, output: 0 },
        // Part 2
        { targetPos: { x: 150, y: 150 }, item: 4, output: 1 },
        // Part 3
        { targetPos: { x: 50, y: 150 }, item: 4, output: 2 },
        // Part 4
        { targetPos: { x: 50, y: 50 }, item: 4, output: 3 },
        // out of circle
        { targetPos: { x: 0, y: 0 }, item: 4, output: -1 },
      ]

      const realWorldTestcases = [
        // Part 1
        { targetPos: { x: 100, y: 50 }, item: 60, output: 0 },
        { targetPos: { x: 112, y: 0.73 }, item: 60, output: 1 },
        // Clicked to the origin, ignore
        { targetPos: { x: 100, y: 100 }, item: 60, output: -1 },
        // Part 3
        { targetPos: { x: 50, y: 150 }, item: 60, output: 37 },
        // Part 4
        { targetPos: { x: 50, y: 50 }, item: 60, output: 52 },
        // sensitive case
        { targetPos: { x: 99, y: 0 }, item: 60, output: -1 },
        //
        { targetPos: { x: 99, y: 10 }, item: 60, output: 59 },
      ]

      for(let i=0; i<simpleTestCases.length; ++i)
        expect(getSelectedIndex(clockContainer, simpleTestCases[i].targetPos, simpleTestCases[i].item)).toBe(simpleTestCases[i].output)

      for(let i=0; i<realWorldTestcases.length; ++i)
        expect(getSelectedIndex(clockContainer, realWorldTestcases[i].targetPos, realWorldTestcases[i].item)).toBe(realWorldTestcases[i].output)
    })
  })

  describe('computedHandStyle', () => {
    it('Should pass the test case', () => {
      // hours: hand in 24 hour convention, with hour >= 12
      let props = { use24Hours: true }
      let state = { activeTimePicker: { hour: true }, selectedTime: { hours: 15 } }
      let handStyle = computedHandStyle(props, state).value
      expect(handStyle.top).toBe('20%')
      expect(handStyle.height).toBe('30%')
      expect(handStyle.transform).toBe('rotate(90deg)')


      // hours: hand in 24 hour convention, with hour < 12
      props = { use24Hours: true }
      state = { activeTimePicker: { hour: true }, selectedTime: { hours: 6 } }
      handStyle = computedHandStyle(props, state).value
      expect(handStyle.top).toBe('2%')
      expect(handStyle.height).toBe('48%')
      expect(handStyle.transform).toBe('rotate(180deg)')


      // minutes: long hand, rotate = 6 * 13 = 78
      props = { use24Hours: true }
      state = { activeTimePicker: { minute: true }, selectedTime: { minutes: 13 } }
      handStyle = computedHandStyle(props, state).value
      expect(handStyle.top).toBe('2%')
      expect(handStyle.height).toBe('48%')
      expect(handStyle.transform).toBe('rotate(78deg)')
    })
  })
})
