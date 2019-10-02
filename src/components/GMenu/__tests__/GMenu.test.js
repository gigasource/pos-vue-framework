import { createLocalVue, mount } from '@vue/test-utils';
import VueCompositionApi from '@vue/composition-api';
import GMenu from '../GMenu';

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('Menu', () => {
  let mountFunction

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(GMenu, {
        localVue,
        ...options
      })
    }
  })

  it('should render', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })
})