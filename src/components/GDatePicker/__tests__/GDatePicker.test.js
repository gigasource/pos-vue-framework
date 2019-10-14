import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import GDatePicker from '../GDatePicker';


describe('GDatePickerTitle.js', () => {
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
})
