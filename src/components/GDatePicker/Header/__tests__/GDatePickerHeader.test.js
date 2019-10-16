import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import GDatePickerHeader from '../GDatePickerHeader';

describe('GDatePickerTitle.js', () => {
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
})
