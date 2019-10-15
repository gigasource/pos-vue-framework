import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import GDatePickerHeader from '../Header/GDatePickerHeader';

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
